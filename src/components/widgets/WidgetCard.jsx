import React from 'react';

const WidgetCard = ({ title, children, actions, className = '' }) => {
    return (
        <div className={`bg-slate-800/40 rounded-xl p-4 border border-slate-700/50 flex flex-col gap-3 ${className}`}>
            <div className="flex justify-between items-center mb-2">
                <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider">{title}</h3>
                <div className="flex gap-2">{actions}</div>
            </div>
            <div className="flex-1">
                {children}
            </div>
        </div>
    );
};

export default WidgetCard;
