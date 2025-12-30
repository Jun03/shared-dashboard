export const GoogleSheetService = {
    getUrl: () => localStorage.getItem('sheet_url'),

    async sync(action, payload = {}) {
        const url = this.getUrl();
        if (!url) {
            console.warn('Google Sheet URL not set in Settings');
            return null;
        }

        try {
            const response = await fetch(url, {
                method: 'POST',
                mode: 'no-cors', // standard for Google Apps Script Web Apps
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ action, ...payload }),
            });
            // specific to no-cors: we can't read response, so we optimistically return true
            return true;
        } catch (error) {
            console.error('Sync failed:', error);
            return false;
        }
    },

    async fetchAll() {
        const url = this.getUrl();
        if (!url) return null;

        try {
            const response = await fetch(url);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Fetch failed:', error);
            return null;
        }
    }
};
