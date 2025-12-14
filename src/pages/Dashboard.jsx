import { Header } from "../components/layout/Header";
import { Card } from "../components/ui/Card";
import { useData } from "../context/DataContext";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';

export function Dashboard() {
  const { topics } = useData();

  // Calculate Stats
  const totalTopics = topics.length;
  const completedTopics = topics.filter(t => t.progress === 'completed').length;
  const inProgressTopics = topics.filter(t => t.progress !== 'kid' && t.progress !== 'completed').length;
  const favoriteTopics = topics.filter(t => t.isFavorite).length;

  // Prepare Chart Data
  const statusData = [
    { name: 'Kid Level', value: topics.filter(t => t.progress === 'kid').length, color: '#4ade80' },
    { name: 'Beginner', value: topics.filter(t => t.progress === 'beginner').length, color: '#60a5fa' },
    { name: 'Advanced', value: topics.filter(t => t.progress === 'advanced').length, color: '#f87171' },
    { name: 'Completed', value: topics.filter(t => t.progress === 'completed').length, color: '#c084fc' },
  ].filter(d => d.value > 0);

  // Calculate Weekly Activity (Last 7 days)
  const activityData = [];
  const today = new Date();
  
  for (let i = 6; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    const dateString = date.toLocaleDateString('en-US', { weekday: 'short' });
    
    // Count topics accessed on this day
    const count = topics.filter(t => {
      if (!t.lastAccessed) return false;
      const topicDate = new Date(t.lastAccessed);
      return topicDate.toDateString() === date.toDateString();
    }).length;

    activityData.push({ name: dateString, topics: count });
  }

  const StatCard = ({ title, value, icon, color }) => (
    <Card className="p-6 flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
        <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">{value}</p>
      </div>
      <div className={`p-3 rounded-full ${color} bg-opacity-20`}>
        <span className={`material-symbols-outlined text-2xl ${color.replace('bg-', 'text-')}`}>{icon}</span>
      </div>
    </Card>
  );

  if (!topics) {
    return <div className="p-8 text-center">Loading dashboard...</div>;
  }

  return (
    <div className="flex flex-col h-full bg-background-light dark:bg-background-dark overflow-y-auto">
      <Header title="Dashboard" />
      <main className="flex-1 px-4 py-8 sm:px-6 md:px-10">
        <div className="flex flex-col gap-8">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Learning Overview</h1>
            
            {/* Stats Grid */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <StatCard title="Total Topics" value={totalTopics} icon="library_books" color="bg-blue-500 text-blue-600" />
                <StatCard title="Completed" value={completedTopics} icon="trophy" color="bg-purple-500 text-purple-600" />
                <StatCard title="In Progress" value={inProgressTopics} icon="trending_up" color="bg-orange-500 text-orange-600" />
                <StatCard title="Favorites" value={favoriteTopics} icon="favorite" color="bg-red-500 text-red-600" />
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Status Distribution */}
                <Card className="p-6 flex flex-col h-[400px] items-center justify-center">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 w-full">Topic Status Distribution</h3>
                    {statusData.length > 0 ? (
                        <PieChart width={300} height={300}>
                            <Pie
                                data={statusData}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={100}
                                paddingAngle={5}
                                dataKey="value"
                            >
                                {statusData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip 
                                contentStyle={{ backgroundColor: '#1f2937', borderColor: '#374151', color: '#fff' }}
                                itemStyle={{ color: '#fff' }}
                            />
                            <Legend />
                        </PieChart>
                    ) : (
                        <div className="text-gray-500">No data available yet</div>
                    )}
                </Card>

                {/* Learning Activity */}
                <Card className="p-6 flex flex-col h-[400px] items-center justify-center">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 w-full">Weekly Activity</h3>
                    <BarChart width={300} height={300} data={activityData}>
                        <XAxis dataKey="name" stroke="#9ca3af" />
                        <YAxis stroke="#9ca3af" />
                        <Tooltip 
                            cursor={{ fill: 'rgba(255, 255, 255, 0.1)' }}
                            contentStyle={{ backgroundColor: '#1f2937', borderColor: '#374151', color: '#fff' }}
                        />
                        <Bar dataKey="topics" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                    </BarChart>
                </Card>
            </div>
        </div>
      </main>
    </div>
  );
}
