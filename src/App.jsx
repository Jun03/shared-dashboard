import React, { useState } from 'react';
import UserDashboard from './components/UserDashboard';
import { Settings } from 'lucide-react';
import SettingsModal from './components/SettingsModal';

function App() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  return (
    <div className="min-h-screen p-4 md:p-8 flex flex-col gap-6">
      <header className="flex justify-between items-center mb-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-violet-400 to-emerald-400 bg-clip-text text-transparent">
            DuoSync
          </h1>
          <p className="text-sm text-gray-400">Shared Lifestyle Dashboard</p>
        </div>
        <button
          onClick={() => setIsSettingsOpen(true)}
          className="btn btn-icon bg-slate-800 hover:bg-slate-700"
        >
          <Settings size={20} />
        </button>
      </header>

      {/* Main Grid: Side by Side on Desktop, Stacked on Mobile */}
      <main className="grid grid-cols-1 md:grid-cols-2 gap-8 h-full flex-1">
        <UserDashboard userName="Me" colorTheme="violet" />
        <UserDashboard userName="Friend" colorTheme="emerald" />
      </main>

      {isSettingsOpen && (
        <SettingsModal onClose={() => setIsSettingsOpen(false)} />
      )}
    </div>
  );
}

export default App;
