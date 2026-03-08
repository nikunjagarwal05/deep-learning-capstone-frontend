import { Link, useLocation } from 'react-router-dom';
import { Camera, LayoutDashboard, Activity, Settings, Bell, User } from 'lucide-react';
import clsx from 'clsx';

const navItems = [
  { name: 'Overview', path: '/', icon: LayoutDashboard },
  { name: 'Analytics', path: '/analytics', icon: Activity },
  { name: 'Training', path: '/training', icon: Settings },
];

export const TopNav = () => {
  const location = useLocation();

  return (
    <header className="flex items-center justify-between px-6 py-4 md:px-8 bg-dark-bg">
      <div className="flex items-center gap-12">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-brand-yellow text-black rounded-xl">
            <Camera className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white/90">SmartPark</h1>
        </div>

        {/* Navigation Pills */}
        <nav className="hidden md:flex items-center gap-1 bg-[#1A1A1A] p-1.5 rounded-full mt-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                className={clsx(
                  'pill-nav',
                  isActive ? 'pill-nav-active shadow-md' : 'pill-nav-inactive'
                )}
              >
                <item.icon className="w-4 h-4" />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Right side Profile / Actions */}
      <div className="flex items-center gap-4 mt-1">
        <button className="p-3 rounded-full bg-dark-card hover:bg-white/10 transition-colors text-white">
          <Bell className="w-5 h-5" />
        </button>
        <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-brand-yellow to-[#FFC163] overflow-hidden border-2 border-dark-card flex items-center justify-center">
           <User className="text-black w-6 h-6" />
        </div>
      </div>
    </header>
  );
};
