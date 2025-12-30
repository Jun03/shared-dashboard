import React, { useState, useEffect } from 'react';
import WidgetCard from './WidgetCard';
import { Check } from 'lucide-react';
import { format, subDays } from 'date-fns';

import { GoogleSheetService } from '../../services/GoogleSheetService';

const HabitTracker = ({ dashboardId, colorTheme }) => {
    const [habits, setHabits] = useState([
        { id: 1, name: 'Read 30m', history: { '2023-10-27': true } },
        { id: 2, name: 'Workout', history: {} },
        { id: 3, name: 'Water 2L', history: {} },
    ]);

    const STORAGE_KEY = `habits_${dashboardId}`;

    useEffect(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) setHabits(JSON.parse(saved));
    }, [dashboardId]);

    const saveToCloud = (data) => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        GoogleSheetService.saveByType(STORAGE_KEY, data);
    };

    const days = Array.from({ length: 5 }).map((_, i) => subDays(new Date(), 4 - i));

    const toggleHabit = (habitId, dateStr) => {
        const updated = habits.map(h => {
            if (h.id === habitId) {
                const newHistory = { ...h.history };
                if (newHistory[dateStr]) delete newHistory[dateStr];
                else newHistory[dateStr] = true;
                return { ...h, history: newHistory };
            }
            return h;
        });
        setHabits(updated);
        saveToCloud(updated);
    };

    const accentColor = colorTheme === 'violet' ? 'bg-violet-500' : 'bg-emerald-500';

    return (
        <WidgetCard title="Daily Habits">
            <div className="overflow-x-auto">
                <div className="grid grid-cols-[auto_repeat(5,1fr)] gap-2 min-w-[300px]">
                    {/* Header Row */}
                    <div className="h-8"></div>
                    {days.map(d => (
                        <div key={d.toString()} className="flex flex-col items-center justify-center text-xs text-gray-500">
                            <span>{format(d, 'EE')}</span>
                            <span className="font-bold">{format(d, 'd')}</span>
                        </div>
                    ))}

                    {/* Rows */}
                    {habits.map(habit => (
                        <React.Fragment key={habit.id}>
                            <div className="text-sm text-gray-300 py-2 truncate">{habit.name}</div>
                            {days.map(d => {
                                const dateStr = format(d, 'yyyy-MM-dd');
                                const isCompleted = habit.history[dateStr];
                                return (
                                    <button
                                        key={dateStr}
                                        onClick={() => toggleHabit(habit.id, dateStr)}
                                        className={`h-8 rounded-md flex items-center justify-center transition-all ${isCompleted ? accentColor + ' text-white' : 'bg-slate-700/50 hover:bg-slate-700'
                                            }`}
                                    >
                                        {isCompleted && <Check size={14} strokeWidth={4} />}
                                    </button>
                                );
                            })}
                        </React.Fragment>
                    ))}
                </div>
            </div>
        </WidgetCard>
    );
};

export default HabitTracker;
