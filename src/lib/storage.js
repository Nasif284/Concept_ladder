const STORAGE_KEY = "concept-ladder-data";

const initialData = {
  topics: [],
  user: {
    name: "Alex Lee",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuB-NibvDhgS5-pr7LQi3sRf25riQ_HHqUMa7ymZ6z20syfLWfks-czXBLvOrRO_odSx4FtFu6CAoVjdkWhBat5OBtutS0Jy5g5XwV889DICBn7j9ZtqBVhqmqhewabKi5vrT2LWpfBijGZJTTwnYlg149DJrXzMmAfpOuYwBOtUEU859SQLvicBvfwta0-MXyNi-BiCQch2Q4zz_CqYb7G7DBm13g2cvDJUJZWSW2mcqDrwU_woqEqV_CdrYxJBGb1TrvpO7B5izh5Y",
  }
};

export const storage = {
  get: () => {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : initialData;
    } catch (error) {
      console.error("Error reading from storage", error);
      return initialData;
    }
  },
  set: (data) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
      console.error("Error writing to storage", error);
    }
  },
  // Helper to get specific topic
  getTopic: (id) => {
    const data = storage.get();
    return data.topics.find(t => t.id === id || t.slug === id);
  }
};
