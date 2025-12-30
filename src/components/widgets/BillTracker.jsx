import React, { useState, useEffect } from 'react';
import WidgetCard from './WidgetCard';
import { Plus, X } from 'lucide-react';
import { format } from 'date-fns';

import { GoogleSheetService } from '../../services/GoogleSheetService';

const BillTracker = ({ dashboardId, colorTheme }) => {
    const [bills, setBills] = useState([]);
    const [isAdding, setIsAdding] = useState(false);
    const [newBill, setNewBill] = useState({ name: '', amount: '', due: '' });

    const STORAGE_KEY = `bills_${dashboardId}`;

    // Load local cache immediately, then sync from cloud
    useEffect(() => {
        const loadData = async () => {
            const saved = localStorage.getItem(STORAGE_KEY);
            if (saved) {
                setBills(JSON.parse(saved));
            }
            // Sync with cloud
            const cloudData = await GoogleSheetService.fetchAll();
            if (cloudData && cloudData[STORAGE_KEY]) {
                setBills(cloudData[STORAGE_KEY]);
                localStorage.setItem(STORAGE_KEY, JSON.stringify(cloudData[STORAGE_KEY]));
            }
        };
        loadData();
    }, [dashboardId]);

    const saveToCloud = (data) => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        GoogleSheetService.saveByType(STORAGE_KEY, data);
    };

    const togglePaid = (id) => {
        const updated = bills.map(b => b.id === id ? { ...b, paid: !b.paid } : b);
        setBills(updated);
        saveToCloud(updated);
    };

    const statusColor = (paid) => paid
        ? (colorTheme === 'violet' ? 'bg-violet-500/10 text-violet-400' : 'bg-emerald-500/10 text-emerald-400')
        : 'bg-red-500/10 text-red-400';

    const handleAdd = (e) => {
        e.preventDefault();
        if (!newBill.name || !newBill.amount) return;
        const updated = [...bills, { ...newBill, id: Date.now(), paid: false }];
        setBills(updated);
        saveToCloud(updated);
        setNewBill({ name: '', amount: '', due: '' });
        setIsAdding(false);
    };

    return (
        <WidgetCard
            title="Upcoming Bills"
            actions={
                <button
                    onClick={() => setIsAdding(!isAdding)}
                    className="text-xs text-gray-500 hover:text-white flex items-center gap-1"
                >
                    {isAdding ? <X size={12} /> : <Plus size={12} />}
                    {isAdding ? 'Cancel' : 'Add'}
                </button>
            }
        >
            <div className="flex flex-col gap-2 max-h-[250px] overflow-y-auto pr-1 custom-scrollbar">
                {isAdding && (
                    <form onSubmit={handleAdd} className="flex flex-col gap-2 p-2 bg-slate-800 rounded-lg mb-2 border border-slate-600">
                        <input
                            type="text"
                            placeholder="Bill Name"
                            className="text-xs p-1 bg-slate-900 border-none rounded"
                            value={newBill.name}
                            onChange={e => setNewBill({ ...newBill, name: e.target.value })}
                        />
                        <div className="flex gap-2">
                            <input
                                type="number"
                                placeholder="Amount (₹)"
                                className="text-xs p-1 bg-slate-900 border-none rounded w-1/2"
                                value={newBill.amount}
                                onChange={e => setNewBill({ ...newBill, amount: e.target.value })}
                            />
                            <input
                                type="date"
                                className="text-xs p-1 bg-slate-900 border-none rounded w-1/2 text-gray-400"
                                value={newBill.due}
                                onChange={e => setNewBill({ ...newBill, due: e.target.value })}
                            />
                        </div>
                        <button type="submit" className="text-xs bg-slate-700 hover:bg-slate-600 p-1 rounded text-white">Save Bill</button>
                    </form>
                )}

                {bills.map(bill => (
                    <div key={bill.id} className="flex items-center justify-between p-2 rounded-lg bg-slate-900/30 border border-slate-800">
                        <div className="flex flex-col">
                            <span className="text-sm font-medium text-gray-200">{bill.name}</span>
                            <span className="text-xs text-gray-500">
                                {bill.due ? `Due ${format(new Date(bill.due), 'MMM d')}` : 'No date'}
                            </span>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="text-sm font-bold text-gray-300">
                                ₹{bill.amount}
                            </span>
                            <button
                                onClick={() => togglePaid(bill.id)}
                                className={`text-xs px-2 py-1 rounded-md font-medium transition-colors ${statusColor(bill.paid)}`}
                            >
                                {bill.paid ? 'PAID' : 'UNPAID'}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </WidgetCard>
    );
};

export default BillTracker;
