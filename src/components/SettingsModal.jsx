import React, { useState } from 'react';
import { X, Save } from 'lucide-react';

const SettingsModal = ({ onClose }) => {
    const [sheetUrl, setSheetUrl] = useState(localStorage.getItem('sheet_url') || '');

    const saveSettings = () => {
        localStorage.setItem('sheet_url', sheetUrl);
        alert('Settings saved! Data sync will use this URL.');
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <div className="bg-slate-800 border border-slate-700 p-6 rounded-2xl w-full max-w-md shadow-2xl">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-white">Connection Settings</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-white">
                        <X size={24} />
                    </button>
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">
                            Google Apps Script Web App URL
                        </label>
                        <input
                            type="text"
                            value={sheetUrl}
                            onChange={(e) => setSheetUrl(e.target.value)}
                            placeholder="https://script.google.com/macros/s/..."
                            className="w-full text-sm"
                        />
                        <p className="text-xs text-gray-500 mt-2">
                            Deploy your Google Sheet script as a Web App and paste the URL here.
                        </p>
                    </div>

                    <button
                        onClick={saveSettings}
                        className="w-full btn btn-primary py-3 mt-4"
                    >
                        <Save size={18} />
                        Save Configuration
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SettingsModal;
