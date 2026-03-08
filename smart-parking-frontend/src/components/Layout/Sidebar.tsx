import { Link, useLocation } from 'react-router-dom';
import { Camera, LayoutDashboard, Settings, Activity } from 'lucide-react';
import clsx from 'clsx';

const navItems = [
  { name: 'Dashboard', path: '/', icon: LayoutDashboard },
  { name: 'Analytics', path: '/analytics', icon: Activity },
  { name: 'Training', path: '/training', icon: Settings },
];

export const Sidebar = () => {
  const location = useLocation();

  return (
    <aside className="w-64 glass-card h-full flex flex-col m-4 mr-0 p-4 border-r border-dark-border/50">
      <div className="flex items-center gap-3 px-2 mb-8 mt-2">
        <div className="p-2 bg-brand-green/20 rounded-lg">
          <Camera className="w-6 h-6 text-brand-green neon-text-green" />
        </div>
        <h1 className="text-xl font-bold tracking-tight text-white/90">SmartPark</h1>
      </div>

      <nav className="flex-1 space-y-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.name}
              to={item.path}
              className={clsx(
                'flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300',
                isActive
                  ? 'bg-brand-green/10 text-brand-green font-medium neon-border-green'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              )}
            >
              <item.icon className={clsx('w-5 h-5', isActive && 'neon-text-green')} />
              {item.name}
            </Link>
          );
        })}
      </nav>
      
      <div className="mt-auto pt-4 border-t border-dark-border/50 px-2 text-xs text-gray-500 text-center">
        Monitoring AI System v1.2.0
      </div>
    </aside>
  );
};
