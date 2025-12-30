import React, { useState, useEffect } from 'react';
import WidgetCard from './WidgetCard';
import { ExternalLink } from 'lucide-react';

import { GoogleSheetService } from '../../services/GoogleSheetService';

const NotesPanel = ({ dashboardId, colorTheme }) => {
    const [activeTab, setActiveTab] = useState('notes'); // 'notes' or 'links'
    const [note, setNote] = useState('Grocery list:\n- Milk\n- Eggs\n\nIdeas:\n- New project theme?');

    const [links, setLinks] = useState([
        { id: 1, title: 'Design Inspiration', url: 'https://dribbble.com' },
        { id: 2, title: 'React Docs', url: 'https://react.dev' },
    ]);

    const STORAGE_KEY_NOTE = `notes_${dashboardId}`;

    useEffect(() => {
        const savedNote = localStorage.getItem(STORAGE_KEY_NOTE);
        if (savedNote) setNote(savedNote);
    }, [dashboardId]);

    const handleNoteChange = (e) => {
        const val = e.target.value;
        setNote(val);
        localStorage.setItem(STORAGE_KEY_NOTE, val);
        // Debounce this in real life, but for now direct call
        // GoogleSheetService.saveByType(STORAGE_KEY_NOTE, val);
    };

    // Note: Saving every keystroke to Google Sheet is bad.
    // We'll add a "Save" button or save on blur.
    const saveNoteToCloud = () => {
        GoogleSheetService.saveByType(STORAGE_KEY_NOTE, note);
    };

    const activeClass = colorTheme === 'violet' ? 'text-violet-400 border-violet-400' : 'text-emerald-400 border-emerald-400';

    return (
        <WidgetCard title="Quick Notes">
            <div className="flex gap-4 mb-3 border-b border-gray-700">
                <button
                    onClick={() => setActiveTab('notes')}
                    className={`pb-2 text-sm font-medium transition-colors border-b-2 ${activeTab === 'notes' ? activeClass : 'text-gray-500 border-transparent hover:text-gray-300'}`}
                >
                    Notepad
                </button>
                <button
                    onClick={() => setActiveTab('links')}
                    className={`pb-2 text-sm font-medium transition-colors border-b-2 ${activeTab === 'links' ? activeClass : 'text-gray-500 border-transparent hover:text-gray-300'}`}
                >
                    Links
                </button>
            </div>

            {activeTab === 'notes' ? (
                <textarea
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    className="w-full h-[150px] resize-none bg-slate-900/50 border-none focus:ring-1 focus:ring-slate-600 text-sm text-gray-300 leading-relaxed custom-scrollbar"
                />
            ) : (
                <div className="flex flex-col gap-2 h-[150px] overflow-y-auto">
                    {links.map(link => (
                        <a
                            key={link.id}
                            href={link.url}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center justify-between p-2 rounded-md hover:bg-slate-700/50 group transition-colors"
                        >
                            <span className="text-sm text-blue-400 hover:underline">{link.title}</span>
                            <ExternalLink size={14} className="text-gray-600 group-hover:text-gray-300" />
                        </a>
                    ))}
                </div>
            )}
        </WidgetCard>
    );
};

export default NotesPanel;
