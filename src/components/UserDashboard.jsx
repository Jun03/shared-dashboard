import React from 'react';
import TaskTracker from './widgets/TaskTracker';
import BillTracker from './widgets/BillTracker';
import HabitTracker from './widgets/HabitTracker';
import NotesPanel from './widgets/NotesPanel';
import { motion } from 'framer-motion';

const UserDashboard = ({ userName, colorTheme }) => {
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
                <h2 className={`text-xl font-bold text-${colorTheme}-400`}>
                    {userName}'s Space
                </h2>
                <span className="text-xs px-2 py-1 rounded-full bg-slate-800 text-slate-400">
                    Last sync: Just now
                </span>
            </div>

            <div className="flex flex-col gap-6 overflow-y-auto pr-2 custom-scrollbar">
                {/* Top Section: Habits & Tasks */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <HabitTracker colorTheme={colorTheme} />
                    <TaskTracker colorTheme={colorTheme} />
                </div>

                {/* Bottom Section: Bills & Notes */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <BillTracker colorTheme={colorTheme} />
                    <NotesPanel colorTheme={colorTheme} />
                </div>
            </div>
        </motion.div>
    );
};

export default UserDashboard;
