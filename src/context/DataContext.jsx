import { createContext, useContext, useState, useEffect, useRef } from "react";
import { storage } from "../lib/storage";
import { generateTopicContent } from "../lib/generator";

const DataContext = createContext({
  topics: [],
  addTopic: () => {},
  getTopic: () => {},
  unlockLevel: () => {},
  isLoading: false,
});

export function DataProvider({ children }) {
  const [data, setData] = useState(() => {
    const storedData = storage.get();
    // Deduplicate topics on load
    const uniqueTopics = [];
    const seenTitles = new Set();
    
    for (const topic of storedData.topics) {
      const normalizedTitle = topic.title.toLowerCase();
      if (!seenTitles.has(normalizedTitle)) {
        seenTitles.add(normalizedTitle);
        uniqueTopics.push(topic);
      }
    }
    
    return { ...storedData, topics: uniqueTopics };
  });
  const [isLoading, setIsLoading] = useState(false);
  const processingRef = useRef(new Set());

  // Save to storage whenever data changes
  useEffect(() => {
    storage.set(data);
  }, [data]);

  const addTopic = async (topicName) => {
    const normalizedName = topicName.toLowerCase();
    
    // Prevent concurrent processing of the same topic
    if (processingRef.current.has(normalizedName)) {
        return data.topics.find(t => t.title.toLowerCase() === normalizedName);
    }

    setIsLoading(true);
    processingRef.current.add(normalizedName);
    
    try {
        // Check if topic already exists (case-insensitive)
        const existingTopic = data.topics.find(t => t.title.toLowerCase() === normalizedName);
        
        if (existingTopic) {
            // Move to top (most recent) and remove ANY other duplicates
            setData(prev => ({
                ...prev,
                topics: [existingTopic, ...prev.topics.filter(t => t.title.toLowerCase() !== normalizedName)]
            }));
            return existingTopic;
        }

        // Simulate network delay for "AI Generation" if using mock, but real AI takes time too
        // await new Promise(resolve => setTimeout(resolve, 1500));
        
        const newTopic = await generateTopicContent(topicName);
        
        setData(prev => {
            // Double check in case it was added while waiting
            const exists = prev.topics.find(t => t.title.toLowerCase() === normalizedName);
            if (exists) return prev;
            
            return {
                ...prev,
                topics: [newTopic, ...prev.topics]
            };
        });
        
        return newTopic;
    } finally {
        processingRef.current.delete(normalizedName);
        setIsLoading(false);
    }
  };

  const getTopic = (identifier) => {
    return data.topics.find(t => t.id === identifier || t.slug === identifier);
  };

  const unlockLevel = (topicId, levelId) => {
    setData(prev => {
      const topicIndex = prev.topics.findIndex(t => t.id === topicId);
      if (topicIndex === -1) return prev;

      const updatedTopics = [...prev.topics];
      const topic = { ...updatedTopics[topicIndex] };
      
      // Update specific level
      if (topic.levels[levelId]) {
        topic.levels[levelId] = { ...topic.levels[levelId], unlocked: true };
      }
      
      // Update overall progress label if needed
      if (levelId === 'beginner' && topic.progress === 'kid') topic.progress = 'beginner';
      if (levelId === 'advanced' && topic.progress === 'beginner') topic.progress = 'advanced';
      
      // Update timestamp
      topic.lastAccessed = new Date().toISOString();

      updatedTopics[topicIndex] = topic;
      return { ...prev, topics: updatedTopics };
    });
  };

  const completeLevel = (topicId, levelId) => {
    setData(prev => {
      const topicIndex = prev.topics.findIndex(t => t.id === topicId);
      if (topicIndex === -1) return prev;

      const updatedTopics = [...prev.topics];
      const topic = { ...updatedTopics[topicIndex] };
      
      if (topic.levels[levelId]) {
        topic.levels[levelId] = { ...topic.levels[levelId], completed: true };
      }

      if (levelId === 'advanced') {
        topic.progress = 'completed';
      }

      updatedTopics[topicIndex] = topic;
      return { ...prev, topics: updatedTopics };
    });
  };

  const deleteTopic = (id) => {
    setData(prev => ({
      ...prev,
      topics: prev.topics.filter(t => t.id !== id)
    }));
  };

  const toggleFavorite = (id) => {
    setData(prev => {
      const updatedTopics = prev.topics.map(t => {
        if (t.id === id) {
          return { ...t, isFavorite: !t.isFavorite };
        }
        return t;
      });
      return { ...prev, topics: updatedTopics };
    });
  };

  return (
    <DataContext.Provider value={{ 
      topics: data.topics, 
      user: data.user,
      addTopic, 
      getTopic, 
      unlockLevel,
      completeLevel,
      deleteTopic,
      toggleFavorite,
      isLoading 
    }}>
      {children}
    </DataContext.Provider>
  );
}

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined)
    throw new Error("useData must be used within a DataProvider");
  return context;
};
