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
        // Fetch fresh profile data
        const profile = await App.getProfile();

        // We wait a tick for DOM to be ready after injection
        setTimeout(async () => {
            const emailInput = document.getElementById('email');
            if (emailInput) {
                emailInput.value = profile.email || '';
                if (profile.user_metadata) {
                    const fname = document.getElementById('first-name');
                    const lname = document.getElementById('last-name');
                    if (fname) fname.value = profile.user_metadata.first_name || '';
                    if (lname) lname.value = profile.user_metadata.last_name || '';
                }
            }

            // Populate Usage Stats
            try {
                // Fetch Usage & Subscription from API
                const usage = await App.getUsage(); // { allowed, plan, used, pageLimit, reason }
                // We'll mock the 'limit' based on plan for now as checkUsage returns allowed/reason but maybe we should expose limit in checkUsage.
                // Assuming checkUsage returns { limit: 50, used: 12 } if we updated it, but for now we'll stick to what we know or infer.
                // Actually usage.js usually returns object. Let's assume we get { count, limit } or similar.
                // Wait, checkUsage in backend returns { allowed: boolean, reason: string, plan: string, pageLimit: number }.
                // It DOES NOT return the count of used audits.
                // We need to fetch audits count or update backend/usage.js to return count.
                // For MVP, we can still fetch all audits to get count.

                const audits = await App.audits.getAll();
                const count = audits.length;
                let limit = 50;
                if (usage.plan === 'pro') limit = 1000;

                const subscription = await App.getSubscription(); // { plan, status, renewal_date }

                const percent = Math.min((count / limit) * 100, 100);

                const txt = document.getElementById('stat-usage-text');
                const bar = document.getElementById('stat-usage-bar');
                const planLabel = document.getElementById('plan-label'); // If we had one

                if (txt) txt.innerText = `${count} / ${limit} Audits`;
                if (bar) bar.style.width = `${percent}%`;

                // Update Plan UI if elements exist
                if (document.getElementById('current-plan')) document.getElementById('current-plan').innerText = subscription.plan.toUpperCase();

            } catch (e) {
                console.error("Failed to fetch usage stats", e);
            }
        }, 50);
    }
});
