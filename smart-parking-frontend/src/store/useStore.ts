import { create } from 'zustand';

export interface ParkingSlot {
  id: string;
  isOccupied: boolean;
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface ActivityLog {
  id: string;
  timestamp: Date;
  slotId: string;
  action: 'entry' | 'exit';
}

interface AppState {
  // Parking State
  totalCapacity: number;
  slots: ParkingSlot[];
  activityLogs: ActivityLog[];
  updateSlots: (newSlots: ParkingSlot[]) => void;
  addActivityLog: (log: Omit<ActivityLog, 'id'>) => void;
  
  // Training State
  epochs: number;
  batchSize: number;
  setEpochs: (n: number) => void;
  setBatchSize: (n: number) => void;
  isTraining: boolean;
  setIsTraining: (training: boolean) => void;
  trainingProgress: number;
  setTrainingProgress: (progress: number) => void;
  terminalLogs: string[];
  addTerminalLog: (log: string) => void;
  clearTerminalLogs: () => void;
}

export const useStore = create<AppState>((set) => ({
  totalCapacity: 24,
  slots: Array.from({ length: 24 }).map((_, i) => ({
    id: `A${i + 1}`,
    isOccupied: Math.random() > 0.5,
    x: (i % 6) * 15 + 5, // mock positions
    y: Math.floor(i / 6) * 20 + 10,
    width: 12,
    height: 15,
  })),
  activityLogs: [],
  updateSlots: (slots) => set({ slots }),
  addActivityLog: (log) => set((state) => ({ 
    activityLogs: [{ ...log, id: Math.random().toString(36).substr(2, 9) }, ...state.activityLogs].slice(0, 50) 
  })),
  
  epochs: 10,
  batchSize: 16,
  setEpochs: (epochs) => set({ epochs }),
  setBatchSize: (batchSize) => set({ batchSize }),
  isTraining: false,
  setIsTraining: (isTraining) => set({ isTraining }),
  trainingProgress: 0,
  setTrainingProgress: (trainingProgress) => set({ trainingProgress }),
  terminalLogs: [],
  addTerminalLog: (log) => set((state) => ({ terminalLogs: [...state.terminalLogs, log] })),
  clearTerminalLogs: () => set({ terminalLogs: [] }),
}));
