
import { Share2, Music } from 'lucide-react';
import { Tab } from '../types';

interface SidebarProps {
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
}

export default function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  return (
    <div className="w-48 h-screen bg-[#0c0d12]/60 border-r border-[#1c1e26] flex flex-col p-4 backdrop-blur-md">
      <div className="mb-8 mt-2">
        <h1 className="text-white font-bold text-2xl tracking-wide select-none">
          NEVERLOSE
        </h1>
      </div>
      
      <div className="mb-2">
        <span className="text-[#606b7d] text-xs font-semibold uppercase tracking-wider select-none px-2">
          Tabs
        </span>
      </div>
      
      <div className="flex flex-col gap-1">
        <button
          onClick={() => setActiveTab('socials')}
          className={`flex items-center gap-3 px-3 py-2 rounded-md transition-all duration-200 select-none ${
            activeTab === 'socials'
              ? 'bg-[#0E4BBF] text-white shadow-[0_0_10px_rgba(14,75,191,0.5)]'
              : 'text-[#99a5b5] hover:bg-[#151720] hover:text-white'
          }`}
        >
          <Share2 size={16} />
          <span className="font-medium text-sm">Socials</span>
        </button>

        <button
          onClick={() => setActiveTab('music')}
          className={`flex items-center gap-3 px-3 py-2 rounded-md transition-all duration-200 select-none ${
            activeTab === 'music'
              ? 'bg-[#0E4BBF] text-white shadow-[0_0_10px_rgba(14,75,191,0.5)]'
              : 'text-[#99a5b5] hover:bg-[#151720] hover:text-white'
          }`}
        >
          <Music size={16} />
          <span className="font-medium text-sm">Music</span>
        </button>
      </div>
    </div>
  );
}
