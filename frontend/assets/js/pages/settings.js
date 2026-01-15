document.addEventListener('DOMContentLoaded', async () => {
    // 1. Initialize App & Auth
    await App.init();
    await App.requireAuth();

    // 2. Load Layout
    await Layout.load('nav-settings');

    // 3. Load Content
    await Layout.loadContent('partials/settings.html');

    // 4. Page Specific Logic
    // Populate User Profile
    if (App.user) {
        // We wait a tick for DOM to be ready after injection
        setTimeout(async () => {
            const emailInput = document.getElementById('email');
            if (emailInput) {
                emailInput.value = App.user.email || '';
                if (App.user.user_metadata) {
                    const fname = document.getElementById('first-name');
                    const lname = document.getElementById('last-name');
                    if (fname) fname.value = App.user.user_metadata.first_name || '';
                    if (lname) lname.value = App.user.user_metadata.last_name || '';
                }
            }

            // Populate Usage Stats
            try {
                const audits = await App.audits.getAll();
                const count = audits.length;
                const limit = 50;
                const percent = Math.min((count / limit) * 100, 100);

                const txt = document.getElementById('stat-usage-text');
                const bar = document.getElementById('stat-usage-bar');

                if (txt) txt.innerText = `${count} / ${limit}`;
                if (bar) bar.style.width = `${percent}%`;
            } catch (e) {
                console.error("Failed to fetch usage stats", e);
            }
        }, 50);
    }
});
