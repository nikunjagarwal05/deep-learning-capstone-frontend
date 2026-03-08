import { Outlet } from 'react-router-dom';
import { TopNav } from './TopNav';
import { Footer } from './Footer';

export const Layout = () => {
  return (
    <div className="flex flex-col h-screen bg-dark-bg overflow-hidden text-gray-100 selection:bg-brand-yellow/30 selection:text-brand-yellow">
      <TopNav />
      <main className="flex-1 overflow-auto px-4 md:px-8 py-6 custom-scrollbar">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
