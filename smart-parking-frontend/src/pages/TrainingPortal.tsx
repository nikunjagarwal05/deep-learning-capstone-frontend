import { useState, useRef } from 'react';
import { useStore } from '../store/useStore';
import { Database, FolderOpen, Play, Terminal, Settings2, ShieldCheck, Maximize2, ChevronUp, ChevronDown, CheckCircle2 } from 'lucide-react';
import clsx from 'clsx';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const NumberInput = ({ label, value, onChange, min = 1, disabled }: any) => (
  <div className="space-y-2">
    <label className="text-sm font-medium text-gray-400">{label}</label>
    <div className="flex bg-[#0A0A0A] border border-[#333] rounded-2xl overflow-hidden focus-within:border-brand-yellow focus-within:ring-1 focus-within:ring-brand-yellow transition-all">
      <input 
        type="number" 
        value={value} 
        onChange={(e) => onChange(Number(e.target.value))}
        min={min}
        disabled={disabled}
        className="flex-1 w-full bg-transparent px-5 py-3 text-white focus:outline-none font-mono"
      />
      <div className="flex flex-col border-l border-[#333] w-12 shrink-0 bg-[#141414]">
        <button 
          onClick={() => onChange(value + 1)} 
          disabled={disabled}
          className="flex-1 flex items-center justify-center text-gray-400 hover:text-brand-yellow hover:bg-brand-yellow/10 transition-colors disabled:opacity-50 border-b border-[#333]"
        ><ChevronUp className="w-4 h-4" /></button>
        <button 
          onClick={() => onChange(Math.max(min, value - 1))} 
          disabled={disabled || value <= min}
          className="flex-1 flex items-center justify-center text-gray-400 hover:text-brand-yellow hover:bg-brand-yellow/10 transition-colors disabled:opacity-50"
        ><ChevronDown className="w-4 h-4" /></button>
      </div>
    </div>
  </div>
);

export default function TrainingPortal() {
  const { 
    epochs, setEpochs, 
    batchSize, setBatchSize,
    isTraining, setIsTraining,
    trainingProgress, setTrainingProgress,
    terminalLogs, addTerminalLog, clearTerminalLogs
  } = useStore();
  
  const [datasetType, setDatasetType] = useState<'folder' | 'csv' | null>(null);
  const [selectedPath, setSelectedPath] = useState<string>('');
  
  const folderInputRef = useRef<HTMLInputElement>(null);
  const csvInputRef = useRef<HTMLInputElement>(null);

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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const isFolder = e.target.hasAttribute('webkitdirectory');
      if (isFolder) {
        setDatasetType('folder');
        const path = e.target.files[0].webkitRelativePath.split('/')[0] || e.target.files[0].name;
        setSelectedPath(`📁 ${path} (${e.target.files.length} items)`);
        addTerminalLog(`[SYSTEM] Loaded dataset folder: ${path} with ${e.target.files.length} items.`);
      } else {
        setDatasetType('csv');
        setSelectedPath(`📄 ${e.target.files[0].name}`);
        addTerminalLog(`[SYSTEM] Loaded dataset file: ${e.target.files[0].name}`);
      }
    }
  };

  const triggerInput = (type: 'folder' | 'csv') => {
    if (type === 'folder' && folderInputRef.current) {
      folderInputRef.current.click();
    }
    if (type === 'csv' && csvInputRef.current) {
      csvInputRef.current.click();
    }
  };

  const startTraining = () => {
    if (isTraining) return;
    setIsTraining(true);
    setTrainingProgress(0);
    clearTerminalLogs();
    
    addTerminalLog(`[SYSTEM] Initializing model ResNet18 + Bi-LSTM...`);
    addTerminalLog(`[SYSTEM] Loading YOLOv10 spatial weights...`);
    addTerminalLog(`[CONFIG] Epochs: ${epochs} | Batch Size: ${batchSize}`);
    if (selectedPath) {
      addTerminalLog(`[CONFIG] Dataset: ${selectedPath}`);
    }
    
    let currentEpoch = 1;
    let step = 0;
    const totalSteps = epochs * 5;
    
    const interval = setInterval(() => {
      step++;
      const progress = (step / totalSteps) * 100;
      setTrainingProgress(progress);
      
      if (step % 5 === 0) {
        const loss = (Math.random() * 0.5 + 0.1).toFixed(4);
        const acc = Math.min((0.70 + (currentEpoch * 0.02) + Math.random() * 0.05), 0.99).toFixed(4);
        addTerminalLog(`Epoch ${currentEpoch}/${epochs} [=======>..] - Loss: ${loss}, Acc: ${acc}`);
        currentEpoch++;
      }
      
      if (progress >= 100) {
        clearInterval(interval);
        setIsTraining(false);
        addTerminalLog(`[SUCCESS] Model training completed. Weights saved to ./weights/best.pt`);
      }
    }, (10000 / totalSteps));
  };

  return (
    <div className="flex flex-col gap-8 w-full max-w-[1400px] mx-auto pb-8">
      {/* Hidden Inputs */}
      {/* @ts-expect-error - webkitdirectory is non-standard but required for folder selection */}
      <input type="file" ref={folderInputRef} onChange={handleFileChange} webkitdirectory="" directory="" className="hidden" />
      <input type="file" ref={csvInputRef} onChange={handleFileChange} accept=".csv" className="hidden" />

      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4 mt-2 mb-2">
        <div>
          <h2 className="text-4xl font-medium text-white tracking-tight mb-2">Model Training Portal</h2>
          <p className="text-gray-400 text-sm">Configure and fine-tune spatial models locally</p>
        </div>
        
        {/* Status Badge */}
        <div className={clsx(
          "px-5 py-2.5 rounded-full text-sm font-semibold border flex items-center gap-2 transition-all shadow-md",
          isTraining ? "bg-brand-yellow text-black border-brand-yellow/50" : 
          trainingProgress === 100 ? "bg-white text-black border-white/50" : 
          "bg-dark-card border-[#333] text-gray-300"
        )}>
          {isTraining ? (
            <><div className="w-2.5 h-2.5 bg-black rounded-full animate-pulse" /> Training in Progress...</>
          ) : trainingProgress === 100 ? (
            <><ShieldCheck className="w-4 h-4" /> Training Completed</>
          ) : (
            <><div className="w-2.5 h-2.5 bg-gray-500 rounded-full" /> System Idle</>
          )}
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column Controls */}
        <div className="lg:col-span-4 space-y-6">
          <div className="glass-card p-6 relative">
            <button onClick={handleFullscreen} className="absolute top-6 right-6 text-gray-500 hover:text-brand-yellow transition">
               <Maximize2 className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-3 mb-6">
               <div className="p-2.5 rounded-xl bg-dark-bg border border-white/5 shadow-sm text-gray-400">
                 <Settings2 className="w-5 h-5 text-brand-yellow/80" />
               </div>
               <h3 className="text-lg font-semibold text-white">Hyperparameters</h3>
            </div>
            
            <div className="space-y-4">
              <NumberInput 
                label="Epochs" 
                value={epochs} 
                onChange={setEpochs} 
                disabled={isTraining} 
              />
              <NumberInput 
                label="Batch Size" 
                value={batchSize} 
                onChange={setBatchSize} 
                disabled={isTraining} 
              />
            </div>
          </div>

          <div className="glass-card p-6 relative">
            <button onClick={handleFullscreen} className="absolute top-6 right-6 text-gray-500 hover:text-brand-yellow transition">
               <Maximize2 className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-3 mb-6">
               <div className="p-2.5 rounded-xl bg-dark-bg border border-white/5 shadow-sm text-gray-400">
                 <Database className="w-5 h-5 text-brand-yellow/80" />
               </div>
               <h3 className="text-lg font-semibold text-white">Dataset Selection</h3>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <button 
                onClick={() => triggerInput('folder')}
                disabled={isTraining}
                className={clsx(
                  "flex flex-col items-center gap-2 py-6 px-4 rounded-2xl border transition-all text-sm font-medium relative overflow-hidden",
                  datasetType === 'folder' 
                    ? "bg-brand-yellow text-black border-brand-yellow" 
                    : "bg-[#0A0A0A] border-[#333] text-gray-400 hover:border-gray-500 hover:text-white"
                )}
              >
                {datasetType === 'folder' && <CheckCircle2 className="absolute top-2 right-2 w-4 h-4 shadow-sm" />}
                <FolderOpen className="w-6 h-6 mb-1" />
                Select Folder
              </button>
              
              <button 
                onClick={() => triggerInput('csv')}
                disabled={isTraining}
                className={clsx(
                  "flex flex-col items-center gap-2 py-6 px-4 rounded-2xl border transition-all text-sm font-medium relative overflow-hidden",
                  datasetType === 'csv' 
                    ? "bg-brand-yellow text-black border-brand-yellow" 
                    : "bg-[#0A0A0A] border-[#333] text-gray-400 hover:border-gray-500 hover:text-white"
                )}
              >
                {datasetType === 'csv' && <CheckCircle2 className="absolute top-2 right-2 w-4 h-4 shadow-sm" />}
                <Database className="w-6 h-6 mb-1" />
                Upload CSV
              </button>
            </div>
            {selectedPath && (
              <div className="mt-4 p-3 bg-white/5 border border-white/10 rounded-xl text-sm text-gray-300 font-mono truncate">
                {selectedPath}
              </div>
            )}
          </div>
          
          <button 
            onClick={startTraining}
            disabled={isTraining || !datasetType}
            className="w-full py-5 rounded-full font-bold tracking-wide flex justify-center items-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed bg-brand-yellow text-black hover:bg-brand-yellow/90 shadow-[0_0_15px_rgba(212,255,0,0.3)]"
          >
            <Play className="w-5 h-5 fill-current" />
            {isTraining ? 'TRAINING IN PROGRESS...' : 'START TRAINING'}
          </button>
        </div>

        {/* Right Column Terminal */}
        <div className="lg:col-span-8 glass-card p-0 flex flex-col min-h-[640px] h-full overflow-hidden relative border-dark-border/60">
          <div className="bg-[#141414] px-6 py-4 border-b border-[#2A2A2A] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Terminal className="w-5 h-5 text-gray-400" />
              <span className="text-sm font-mono font-medium text-gray-300">training_console_output</span>
            </div>
            <button onClick={handleFullscreen} className="text-gray-400 hover:text-brand-yellow transition p-2 bg-dark-bg rounded-lg">
                <Maximize2 className="w-4 h-4" />
            </button>
          </div>
          
          <div className="flex-1 bg-[#050505] p-6 overflow-y-auto custom-scrollbar font-mono text-[13px] whitespace-pre-wrap flex flex-col gap-2 shadow-inner">
            {terminalLogs.length === 0 ? (
              <span className="text-gray-600 italic">No output. Configure and start training to view logs.</span>
            ) : (
                terminalLogs.map((log, idx) => (
                  <div key={idx} className={
                    log.includes('[SUCCESS]') ? 'text-brand-yellow font-bold' :
                    log.includes('[SYSTEM]') ? 'text-white font-medium' :
                    log.includes('[CONFIG]') ? 'text-blue-300' :
                    'text-gray-400'
                  }>
                    {log}
                  </div>
                ))
            )}
            
            {/* Blinking cursor if training */}
            {isTraining && (
               <div className="w-2.5 h-4 bg-brand-yellow animate-pulse mt-1" />
            )}
            {/* Auto-scroll anchor */}
            <div style={{ float:"left", clear: "both" }}
                 ref={(el) => { if(el) el.scrollIntoView({ behavior: 'smooth' }) }}>
            </div>
          </div>

          {/* Progress Bar Area Container */}
          <div className="p-6 bg-[#141414] border-t border-[#2A2A2A] relative">
             <div className="flex justify-between text-xs text-gray-400 mb-3 font-sans font-medium uppercase tracking-wider">
               <span>Training Progress</span>
               <span className="text-white bg-white/10 px-2 py-0.5 rounded-md">{Math.round(trainingProgress)}%</span>
             </div>
             <div className="w-full h-3 bg-[#0A0A0A] rounded-full overflow-hidden border border-[#222]">
               <div 
                 className="h-full bg-brand-yellow rounded-full transition-all duration-300 ease-linear shadow-[0_0_10px_rgba(212,255,0,0.4)]"
                 style={{ width: `${trainingProgress}%` }}
               />
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
