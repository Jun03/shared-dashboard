import React, { useState } from 'react';
import UserDashboard from './components/UserDashboard';
import { Settings } from 'lucide-react';
import SettingsModal from './components/SettingsModal';

function App() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [names, setNames] = useState(() => {
    try {
      const saved = localStorage.getItem('dashboard_names');
      return saved ? JSON.parse(saved) : { left: "Me", right: "Friend" };
    } catch {
      return { left: "Me", right: "Friend" };
    }
  });
  const [editingName, setEditingName] = useState(null); // 'left' or 'right'

  const saveName = (key, newName) => {
    const updated = { ...names, [key]: newName };
    setNames(updated);
    localStorage.setItem('dashboard_names', JSON.stringify(updated));
    setEditingName(null);
  };

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
        <UserDashboard
          dashboardId="left"
          userName={names.left}
          colorTheme="violet"
          onEditName={() => setEditingName('left')}
          isEditing={editingName === 'left'}
          onSaveName={(n) => saveName('left', n)}
        />
        <UserDashboard
          dashboardId="right"
          userName={names.right}
          colorTheme="emerald"
          onEditName={() => setEditingName('right')}
          isEditing={editingName === 'right'}
          onSaveName={(n) => saveName('right', n)}
        />
      </main>

      {isSettingsOpen && (
        <SettingsModal onClose={() => setIsSettingsOpen(false)} />
      )}
    </div>
  );
}

export default App;
