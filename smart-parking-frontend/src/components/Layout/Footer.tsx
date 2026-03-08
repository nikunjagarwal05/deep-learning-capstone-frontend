import { Heart } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="h-16 flex items-center justify-between px-8 text-sm text-gray-400 border-t border-dark-border/50 glass-card m-4 mt-0 ml-0 rounded-tl-none rounded-tr-none">
      <div className="flex items-center gap-1">
        <span>Developed with</span>
        <Heart className="w-4 h-4 text-brand-red animate-pulse" />
        <span>for Smart City Capstone</span>
      </div>
      <div className="flex items-center gap-6">
        <span className="font-medium text-white/70">Project Team:</span>
        <div className="flex gap-4 border-l border-dark-border/50 pl-4">
          <span className="hover:text-brand-green cursor-default transition-colors">Nikunj Agarwal</span>
          <span className="hover:text-brand-green cursor-default transition-colors">Om Ojha</span>
          <span className="hover:text-brand-green cursor-default transition-colors">Palash Chawre</span>
        </div>
      </div>
    </footer>
  );
};
