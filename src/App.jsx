import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Layout } from "./components/layout/Layout";
import { Home } from "./pages/Home";
import { TopicInput } from "./pages/TopicInput";
import { Ladder } from "./pages/Ladder";
import { ThemeProvider } from "./components/theme-provider";
import { DataProvider } from "./context/DataContext";

import { MyTopics } from "./pages/MyTopics";
import { Favorites } from "./pages/Favorites";
import { Settings } from "./pages/Settings";
import { Dashboard } from "./pages/Dashboard";

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="concept-ladder-theme">
      <DataProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/topics" element={<MyTopics />} />
              <Route path="/favorites" element={<Favorites />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/input" element={<TopicInput />} />
              <Route path="/ladder/:topic" element={<Ladder />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </DataProvider>
    </ThemeProvider>
  );
}

export default App;
