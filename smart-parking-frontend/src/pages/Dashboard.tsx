import { useEffect } from 'react';
import { useStore } from '../store/useStore';
import { Clock, Maximize2, Sparkles, Activity } from 'lucide-react';
import clsx from 'clsx';

export default function Dashboard() {
  const { slots, updateSlots, totalCapacity, addActivityLog, activityLogs } = useStore();
  
  const occupiedCount = slots.filter((s) => s.isOccupied).length;
  const availableCount = totalCapacity - occupiedCount;

  const handleFullscreen = (e: React.MouseEvent<HTMLButtonElement>) => {
    const card = e.currentTarget.closest('.glass-card');
    if (card) {
      if (!document.fullscreenElement) {
        card.requestFullscreen().catch(() => {});
      } else {
        document.exitFullscreen();
      }
    }
  };

  // Simulate live camera inference
  useEffect(() => {
    const interval = setInterval(() => {
      const slotsCopy = [...slots];
      const numToToggle = Math.floor(Math.random() * 3) + 1;
      
      for(let i=0; i<numToToggle; i++) {
        const idx = Math.floor(Math.random() * slotsCopy.length);
        const slot = slotsCopy[idx];
        const newStatus = !slot.isOccupied;
        
        if (Math.random() > 0.8) {
           slot.isOccupied = newStatus;
           addActivityLog({
             slotId: slot.id,
             timestamp: new Date(),
             action: newStatus ? 'entry' : 'exit',
           });
        }
      }
      
      updateSlots(slotsCopy);
    }, 5000);

    return () => clearInterval(interval);
  }, [slots, updateSlots, addActivityLog]);

  return (
    <div className="flex flex-col gap-8 w-full max-w-[1400px] mx-auto pb-8">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4 mt-2">
        <div>
          <h2 className="text-4xl font-medium text-white tracking-tight mb-2">Live System Oversight</h2>
          <p className="text-gray-400 text-sm">Real-time object detection inference via YOLOv10 spatial models</p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-5 py-2.5 glass-panel border-[#333] rounded-full shadow-md">
            <div className="w-2.5 h-2.5 rounded-full bg-brand-yellow animate-pulse" />
            <span className="text-sm font-semibold text-white">System Active & Recording</span>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Main Video Feed (Spans 8 cols) */}
        <div className="lg:col-span-8 glass-card p-6 flex flex-col min-h-[580px] relative">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2 text-white font-medium bg-white/5 py-2 px-4 rounded-xl border border-white/5">
               <Sparkles className="w-4 h-4 text-brand-yellow" />
               AI Spatial Analysis
            </div>
            <button onClick={handleFullscreen} className="text-gray-400 hover:text-brand-yellow transition p-2 bg-dark-bg rounded-lg">
              <Maximize2 className="w-4 h-4" />
            </button>
          </div>

          <div className="flex-1 relative bg-[#080808] rounded-2xl overflow-hidden border border-white/5 shadow-inner">
            {/* Mock Camera Background */}
            <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1573348722427-f1d6819fdf98?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center mix-blend-luminosity grayscale" />
            
            {/* Overlay Grid lines for tech feel */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:40px_40px]" />

            {/* Render Bounding Boxes */}
            {slots.map((slot) => (
              <div
                key={slot.id}
                className={clsx(
                  'absolute border transition-all duration-300 ease-in-out flex flex-col items-center justify-center rounded-md',
                  slot.isOccupied 
                    ? 'border-white/20 bg-white/5' 
                    : 'border-brand-yellow bg-brand-yellow/10 shadow-[inset_0_0_20px_rgba(212,255,0,0.1)]'
                )}
                style={{
                  left: `${slot.x}%`,
                  top: `${slot.y}%`,
                  width: `${slot.width}%`,
                  height: `${slot.height}%`,
                }}
              >
                <div className={clsx(
                  "absolute -top-3 left-1/2 -translate-x-1/2 text-[9px] font-sans font-bold px-1.5 py-0.5 rounded backdrop-blur-md whitespace-nowrap",
                  slot.isOccupied ? "bg-white/10 text-gray-300 border border-white/10" : "bg-brand-yellow text-black"
                )}>
                  {slot.id} {slot.isOccupied ? 'OCC' : 'FREE'}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Sidebar (Spans 4 cols) */}
        <div className="lg:col-span-4 flex flex-col gap-6 h-full">
          
          <div className="grid grid-cols-2 gap-6">
            <StatCard 
              title="Available Slots" 
              value={availableCount} 
              highlightColor="text-brand-yellow" 
              badge="+8% Capacity"
              badgeColor="bg-brand-yellow text-black"
              onFullscreen={handleFullscreen}
            />
            <StatCard 
              title="Currently Occupied" 
              value={occupiedCount} 
              badge="Stable"
              badgeColor="bg-white/10 text-gray-300"
              onFullscreen={handleFullscreen}
            />
          </div>

          <div className="glass-card flex-1 p-6 flex flex-col relative overflow-hidden min-h-[380px]">
            <div className="absolute top-0 right-0 p-32 w-full h-full bg-gradient-to-bl from-white/5 to-transparent pointer-events-none" />
            
            <div className="flex justify-between items-start mb-6 relative z-10">
               <div className="flex items-center gap-2 text-white font-medium bg-white/5 py-2 px-4 rounded-xl border border-white/5">
                  <Activity className="w-4 h-4 text-brand-yellow" />
                  Live Activity Feed
               </div>
               <button onClick={handleFullscreen} className="text-gray-400 hover:text-brand-yellow transition p-2 bg-dark-bg rounded-lg">
                  <Maximize2 className="w-4 h-4" />
               </button>
            </div>
            
            <div className="flex-1 overflow-y-auto space-y-3 custom-scrollbar pr-2 relative z-10">
              {activityLogs.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-sm text-gray-500">Waiting for activity logs...</div>
              ) : (
                activityLogs.map((log) => (
                  <div key={log.id} className="flex items-center gap-4 p-4 rounded-2xl bg-dark-bg/50 border border-white/5 hover:bg-white/5 transition-colors group">
                    <div className={clsx(
                      "w-10 h-10 rounded-full flex items-center justify-center shrink-0 border",
                      log.action === 'entry' ? 'bg-white/5 border-white/10' : 'bg-brand-yellow/20 border-brand-yellow/30'
                    )}>
                       <Clock className={clsx("w-4 h-4", log.action === 'entry' ? 'text-gray-400' : 'text-brand-yellow')} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-100 truncate">
                        Vehicle {log.action === 'entry' ? 'entered' : 'exited'}
                      </p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-xs text-gray-500 font-mono">
                          {log.timestamp.toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                        </span>
                        <span className="w-1 h-1 rounded-full bg-brand-yellow/50" />
                        <span className="text-xs text-brand-yellow/80">Slot {log.id}</span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const StatCard = ({ title, value, highlightColor = 'text-white', badge, badgeColor, onFullscreen }: any) => (
  <div className="glass-card p-6 flex flex-col justify-between border-dark-border/40 relative overflow-hidden group min-h-[160px]">
    <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
    
    <div className="flex justify-between items-start w-full relative z-10">
      <div className="p-2.5 rounded-xl bg-dark-bg border border-white/5 shadow-sm text-gray-400">
        <Activity className="w-5 h-5 text-brand-yellow/80" />
      </div>
      <button onClick={onFullscreen} className="text-gray-500 hover:text-brand-yellow transition">
         <Maximize2 className="w-3.5 h-3.5" />
      </button>
    </div>
    
    <div className="relative z-10 mt-6 flex flex-col gap-2">
      <p className="text-gray-400 text-sm font-medium">{title}</p>
      <h3 className={clsx("text-4xl font-bold tracking-tight", highlightColor)}>{value}</h3>
      {badge && (
        <span className={clsx("text-xs font-semibold px-2.5 py-1 rounded-full w-fit mt-1 shadow-sm", badgeColor)}>
          {badge}
        </span>
      )}
    </div>
  </div>
);
