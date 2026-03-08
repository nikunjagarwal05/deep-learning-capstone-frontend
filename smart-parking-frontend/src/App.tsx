import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout/Layout';

// Lazy loading pages for better performance
const Dashboard = React.lazy(() => import('./pages/Dashboard'));
const Analytics = React.lazy(() => import('./pages/Analytics'));
const TrainingPortal = React.lazy(() => import('./pages/TrainingPortal'));

function App() {
  return (
    <BrowserRouter>
      <React.Suspense fallback={<div className="flex items-center justify-center h-screen w-screen bg-dark-bg text-brand-green animate-pulse">Loading System...</div>}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="training" element={<TrainingPortal />} />
          </Route>
        </Routes>
      </React.Suspense>
    </BrowserRouter>
  );
}

export default App;
