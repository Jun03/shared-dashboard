import React, { useState } from 'react';
import WidgetCard from './WidgetCard';
import { Plus } from 'lucide-react';
import { format } from 'date-fns';

const BillTracker = ({ colorTheme }) => {
    const [bills, setBills] = useState([
        { id: 1, name: 'Rent', amount: 1200, due: '2025-01-01', paid: false },
        { id: 2, name: 'Internet', amount: 60, due: '2025-01-15', paid: true },
    ]);

    const togglePaid = (id) => {
        setBills(bills.map(b => b.id === id ? { ...b, paid: !b.paid } : b));
    };

    const statusColor = (paid) => paid
        ? (colorTheme === 'violet' ? 'bg-violet-500/10 text-violet-400' : 'bg-emerald-500/10 text-emerald-400')
        : 'bg-red-500/10 text-red-400';

    return (
        <WidgetCard
            title="Upcoming Bills"
            actions={<button className="text-xs text-gray-500 hover:text-white flex items-center gap-1"><Plus size={12} /> Add</button>}
        >
            <div className="flex flex-col gap-2">
                {bills.map(bill => (
                    <div key={bill.id} className="flex items-center justify-between p-2 rounded-lg bg-slate-900/30 border border-slate-800">
                        <div className="flex flex-col">
                            <span className="text-sm font-medium text-gray-200">{bill.name}</span>
                            <span className="text-xs text-gray-500">Due {format(new Date(bill.due), 'MMM d')}</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="text-sm font-bold text-gray-300">
                                ${bill.amount}
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
