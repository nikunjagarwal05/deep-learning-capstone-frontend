import { useMemo } from 'react';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { TrendingUp, CalendarDays, Maximize2 } from 'lucide-react';

// Generate mock data for the last 24 hours
const generateUsageTrends = () => {
  const data = [];
  const now = new Date();
  for (let i = 24; i >= 0; i--) {
    const time = new Date(now.getTime() - i * 60 * 60 * 1000);
    const hour = time.getHours();
    
    // Create realistic occupancy pattern
    let baseOccupancy = 20; 
    if (hour >= 8 && hour <= 18) baseOccupancy = 70 + Math.random() * 25; 
    else if (hour > 18 && hour <= 22) baseOccupancy = 40 + Math.random() * 30; 
    else baseOccupancy = 10 + Math.random() * 15;

    data.push({
      time: `${hour}:00`,
      fullHour: time.toLocaleString('default', { hour: 'numeric', hour12: true }),
      occupancy: Math.min(100, Math.round(baseOccupancy)),
    });
  }
  return data;
};

// Generate mock data for peak hours
const peakHoursData = [
  { name: '6 AM - 9 AM', avgOccupancy: 35 },
  { name: '9 AM - 12 PM', avgOccupancy: 85 },
  { name: '12 PM - 3 PM', avgOccupancy: 95 },
  { name: '3 PM - 6 PM', avgOccupancy: 70 },
  { name: '6 PM - 9 PM', avgOccupancy: 45 },
  { name: '9 PM - 6 AM', avgOccupancy: 15 },
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#1A1A1A] border border-[#333] p-3 rounded-2xl shadow-xl shrink-0 backdrop-blur-md">
        <p className="text-gray-400 font-medium mb-1 text-sm">{label}</p>
        <p className="text-brand-yellow font-bold text-lg">{payload[0].value}% Occupied</p>
      </div>
    );
  }
  return null;
};

export default function Analytics() {
  const usageData = useMemo(() => generateUsageTrends(), []);

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

  return (
    <div className="flex flex-col gap-8 w-full max-w-[1400px] mx-auto pb-8">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4 mt-2 mb-2">
        <div>
          <h2 className="text-4xl font-medium text-white tracking-tight mb-2">Analytics & History</h2>
          <p className="text-gray-400 text-sm">Historical parking patterns and capacity analysis</p>
        </div>
      </header>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 items-start">
        
        {/* Usage Trends Chart */}
        <div className="xl:col-span-2 glass-card p-6 flex flex-col relative overflow-hidden min-h-[460px]">
          <div className="absolute top-0 right-0 p-40 w-full h-full bg-gradient-to-full from-brand-yellow/[0.02] to-transparent pointer-events-none" />
          
          <div className="flex items-center justify-between mb-8 relative z-10 w-full">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-dark-bg border border-white/5 shadow-sm text-gray-400">
                 <TrendingUp className="w-5 h-5 text-brand-yellow/80" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Usage Trends (Last 24h)</h3>
                <p className="text-xs text-gray-500 mt-0.5">Total capacity utilization percentage</p>
              </div>
            </div>
            <button onClick={handleFullscreen} className="text-gray-400 hover:text-brand-yellow transition p-2 bg-dark-bg rounded-lg">
              <Maximize2 className="w-4 h-4" />
            </button>
          </div>
          
          <div className="flex-1 w-full relative z-10 -ml-4 mt-2 min-h-[300px]">
            <div className="absolute inset-0">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={usageData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <defs>
                    <linearGradient id="colorOccupancy" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#D4FF00" stopOpacity={0.5}/>
                      <stop offset="95%" stopColor="#D4FF00" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                  <XAxis 
                    dataKey="fullHour" 
                    stroke="#888" 
                    fontSize={11} 
                    tickLine={false}
                    minTickGap={30}
                    axisLine={false}
                    dy={10}
                  />
                  <YAxis 
                    stroke="#888" 
                    fontSize={11} 
                    tickLine={false} 
                    axisLine={false}
                    domain={[0, 100]}
                    tickFormatter={(val) => `${val}%`}
                    dx={-10}
                  />
                  <Tooltip content={<CustomTooltip />} cursor={{stroke: '#ffffff20', strokeWidth: 1}} />
                  <Area 
                    type="monotone" 
                    dataKey="occupancy" 
                    stroke="#D4FF00" 
                    fill="url(#colorOccupancy)"
                    strokeWidth={4}
                    activeDot={{ r: 6, fill: '#D4FF00', stroke: '#141414', strokeWidth: 4 }}
                    style={{ filter: 'drop-shadow(0px 8px 16px rgba(212, 255, 0, 0.3))' }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Peak Hours Chart */}
        <div className="glass-card p-6 flex flex-col relative min-h-[460px] h-full">
          <div className="flex justify-between items-start mb-8 w-full relative z-10">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-dark-bg border border-white/5 shadow-sm text-gray-400">
                 <CalendarDays className="w-5 h-5 text-brand-yellow/80" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Peak Hours Analysis</h3>
                <p className="text-xs text-gray-500 mt-0.5">Average daily distribution</p>
              </div>
            </div>
            <button onClick={handleFullscreen} className="text-gray-400 hover:text-brand-yellow transition p-2 bg-dark-bg rounded-lg">
              <Maximize2 className="w-4 h-4" />
            </button>
          </div>
          
          <div className="flex-1 w-full relative -ml-8 mt-2 min-h-[300px]">
            <div className="absolute inset-0">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={peakHoursData} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
                   <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" horizontal={false} />
                   <XAxis type="number" stroke="#666" fontSize={11} hide />
                   <YAxis 
                      dataKey="name" 
                      type="category" 
                      stroke="#bbb" 
                      fontSize={11} 
                      axisLine={false}
                      tickLine={false}
                      width={90}
                   />
                   <Tooltip cursor={{ fill: '#ffffff05' }} content={<CustomTooltip />} />
                   <Bar 
                      dataKey="avgOccupancy" 
                      radius={[0, 8, 8, 0]}
                      barSize={24}
                   >
                     {
                       peakHoursData.map((entry, index) => (
                         <Cell key={`cell-${index}`} fill={entry.avgOccupancy > 80 ? '#D4FF00' : '#2A2A2A'} />
                       ))
                     }
                   </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
}
