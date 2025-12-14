import { Header } from "../components/layout/Header";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { Link } from "react-router-dom";
import { useData } from "../context/DataContext";
import { cn } from "../lib/utils";

export function Favorites() {
  const { topics, toggleFavorite } = useData();
  const favorites = topics.filter(t => t.isFavorite);

  const getProgressColor = (level) => {
    switch (level) {
      case 'kid': return "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300";
      case 'beginner': return "bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300";
      case 'advanced': return "bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300";
      case 'completed': return "bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-300";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="flex flex-col h-full bg-background-light dark:bg-background-dark overflow-y-auto">
      <Header title="Favorites" />
      <main className="flex-1 px-4 py-8 sm:px-6 md:px-10">
        <div className="flex flex-col gap-6">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Favorites</h1>
            
            {favorites.length === 0 ? (
                <div className="text-center py-12">
                    <p className="text-gray-500 dark:text-gray-400 mb-4">No favorites yet. Mark topics as favorite to see them here.</p>
                    <Link to="/topics">
                        <Button variant="outline">Browse My Topics</Button>
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {favorites.map((topic) => (
                        <Card key={topic.id} className="flex flex-col gap-4 p-4 transition-shadow hover:shadow-lg relative group">
                            <div className="flex justify-between items-start">
                                <Link to={`/ladder/${topic.slug}`} className="flex-1">
                                    <h3 className="font-semibold text-[#111418] dark:text-white line-clamp-2 pr-8 hover:text-primary transition-colors">
                                        {topic.title}
                                    </h3>
                                </Link>
                                <button 
                                    onClick={() => toggleFavorite(topic.id)}
                                    className="text-red-500 hover:text-red-600 transition-colors"
                                >
                                    <span className="material-symbols-outlined filled">favorite</span>
                                </button>
                            </div>
                            
                            <div className="flex items-center justify-between mt-auto">
                                <span className={cn("rounded-full px-3 py-1 text-xs font-medium capitalize", getProgressColor(topic.progress))}>
                                    {topic.progress}
                                </span>
                            </div>
                        </Card>
                    ))}
                </div>
            )}
        </div>
      </main>
    </div>
  );
}
