export const GoogleSheetService = {
    getUrl: () => localStorage.getItem('sheet_url'),

    // Save specific widget data (e.g. type="tasks_left")
    async saveByType(type, data) {
        const url = this.getUrl();
        if (!url) return false;

        try {
            await fetch(url, {
                method: 'POST',
                mode: 'no-cors',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action: 'save', type, data }),
            });
            return true;
        } catch (error) {
            console.error(`Save failed for ${type}:`, error);
            return false;
        }
    },


    // Fetch all data and return as a map: { "tasks_left": [...], "bills_right": [...] }
    async fetchAll() {
        const url = this.getUrl();
        if (!url) return null;

        try {
            const response = await fetch(url);
            const data = await response.json();
            // The new script returns an object { "key": [data] } directly
            return data;
        } catch (error) {
            console.error('Fetch failed:', error);
            return null;
        }
    }
};
