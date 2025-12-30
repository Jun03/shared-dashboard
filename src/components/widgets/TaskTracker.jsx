import React, { useState, useEffect } from 'react';
import WidgetCard from './WidgetCard';
import { Plus, Trash2, CheckCircle2, Circle, RefreshCw } from 'lucide-react';
import { GoogleSheetService } from '../../services/GoogleSheetService';

const TaskTracker = ({ dashboardId, colorTheme }) => {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');

    const STORAGE_KEY = `tasks_${dashboardId}`;

    // Load local cache immediately, then sync from cloud
    useEffect(() => {
        const loadData = async () => {
            const saved = localStorage.getItem(STORAGE_KEY);
            if (saved) {
                setTasks(JSON.parse(saved));
            }

            // Always fetch latest from cloud to ensure valid state
            const cloudData = await GoogleSheetService.fetchAll();
            if (cloudData && cloudData[STORAGE_KEY]) {
                const cloudTasks = cloudData[STORAGE_KEY];
                setTasks(cloudTasks);
                localStorage.setItem(STORAGE_KEY, JSON.stringify(cloudTasks));
            }
        };
        loadData();
    }, [dashboardId]);

    const saveToCloud = (updatedTasks) => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedTasks));
        GoogleSheetService.saveByType(STORAGE_KEY, updatedTasks);
    };

    const addTask = (e) => {
        e.preventDefault();
        if (!newTask.trim()) return;
        const updated = [...tasks, { id: Date.now(), text: newTask, done: false }];
        setTasks(updated);
        saveToCloud(updated);
        setNewTask('');
    };

    const toggleTask = (id) => {
        const updated = tasks.map(t => t.id === id ? { ...t, done: !t.done } : t);
        setTasks(updated);
        saveToCloud(updated);
    };

    const removeTask = (id) => {
        const updated = tasks.filter(t => t.id !== id);
        setTasks(updated);
        saveToCloud(updated);
    };

    const accentText = colorTheme === 'violet' ? 'text-violet-400' : 'text-emerald-400';

    return (
        <WidgetCard title="To-Do List">
            <div className="flex flex-col gap-2 h-[200px] overflow-y-auto custom-scrollbar pr-2">
                {tasks.map(task => (
                    <div
                        key={task.id}
                        className="group flex items-center gap-3 p-2 rounded-lg hover:bg-slate-700/30 transition-colors"
                    >
                        <button onClick={() => toggleTask(task.id)} className={`${task.done ? accentText : 'text-gray-500'}`}>
                            {task.done ? <CheckCircle2 size={20} /> : <Circle size={20} />}
                        </button>
                        <span className={`flex-1 text-sm ${task.done ? 'line-through text-gray-600' : 'text-gray-200'}`}>
                            {task.text}
                        </span>
                        <button
                            onClick={() => removeTask(task.id)}
                            className="opacity-0 group-hover:opacity-100 text-gray-500 hover:text-red-400 transition-opacity"
                        >
                            <Trash2 size={16} />
                        </button>
                    </div>
                ))}
                {tasks.length === 0 && <div className="text-center text-gray-600 text-sm py-4">No pending tasks</div>}
            </div>

            <form onSubmit={addTask} className="mt-4 flex gap-2">
                <input
                    type="text"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    placeholder="New task..."
                    className="text-sm bg-slate-900/50 border-slate-700 focus:border-slate-500"
                />
                <button type="submit" className={`btn btn-icon ${colorTheme === 'violet' ? 'bg-violet-600' : 'bg-emerald-600'} text-white`}>
                    <Plus size={20} />
                </button>
            </form>
        </WidgetCard>
    );
};

export default TaskTracker;
