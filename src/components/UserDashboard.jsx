import React from 'react';
import TaskTracker from './widgets/TaskTracker';
import BillTracker from './widgets/BillTracker';
import HabitTracker from './widgets/HabitTracker';
import NotesPanel from './widgets/NotesPanel';
import { motion } from 'framer-motion';

import { Edit2, Check } from 'lucide-react';
import { useState, useEffect } from 'react';

const UserDashboard = ({ dashboardId, userName, colorTheme, onEditName, isEditing, onSaveName }) => {
    // Dynamic border color based on theme
    const borderColor = colorTheme === 'violet' ? 'border-violet-500/20' : 'border-emerald-500/20';
    const shadowColor = colorTheme === 'violet' ? 'shadow-violet-500/5' : 'shadow-emerald-500/5';

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`glass-panel p-6 flex flex-col gap-6 border-2 ${borderColor} ${shadowColor} shadow-xl h-full`}
        >
            <div className="flex items-center justify-between pb-4 border-b border-gray-700/50">
                <div className="flex items-center gap-2">
                    {isEditing ? (
                        <div className="flex items-center gap-2">
                            <input
                                autoFocus
                                defaultValue={userName}
                                className={`text-xl font-bold bg-slate-800 border-none rounded px-2 w-[150px] text-${colorTheme}-400`}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') onSaveName(e.currentTarget.value);
                                }}
                                onBlur={(e) => onSaveName(e.currentTarget.value)}
                            />
                        </div>
                    ) : (
                        <h2 className={`text-xl font-bold text-${colorTheme}-400 flex items-center gap-2 group`}>
                            {userName}'s Space
                            <button onClick={onEditName} className="opacity-0 group-hover:opacity-100 transition-opacity text-slate-500 hover:text-white">
                                <Edit2 size={14} />
                            </button>
                        </h2>
                    )}
                </div>
                <span className="text-xs px-2 py-1 rounded-full bg-slate-800 text-slate-400">
                    Last sync: Just now
                </span>
            </div>

            <div className="flex flex-col gap-6 overflow-y-auto pr-2 custom-scrollbar">
                {/* Top Section: Habits & Tasks */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <HabitTracker dashboardId={dashboardId} colorTheme={colorTheme} />
                    <TaskTracker dashboardId={dashboardId} colorTheme={colorTheme} />
                </div>

                {/* Bottom Section: Bills & Notes */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <BillTracker dashboardId={dashboardId} colorTheme={colorTheme} />
                    <NotesPanel dashboardId={dashboardId} colorTheme={colorTheme} />
                </div>
            </div>
        </motion.div>
    );
};

export default UserDashboard;
