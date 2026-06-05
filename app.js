// Configuration
const CLIENT_ID = '1512550372755898622';
const REDIRECT_URI = window.location.origin + window.location.pathname;

// 1. View Switcher
function showView(view) {
    document.querySelectorAll('.view').forEach(v => v.style.display = 'none');
    document.getElementById(view + 'View').style.display = 'block';
}

// 2. Main Initialization
async function init() {
    const params = new URLSearchParams(window.location.hash.substring(1));
    const token = params.get('access_token');

    // Handle incoming login
    if (token) {
        localStorage.setItem('discord_token', token);
        window.history.replaceState(null, null, window.location.pathname);
    }

    const savedToken = localStorage.getItem('discord_token');
    
    if (savedToken) {
        document.getElementById('loginOverlay').style.display = 'none';
        document.getElementById('app').style.display = 'flex';
        await verifyUser(savedToken);
    }
}

// 3. User & Premium Verification
async function verifyUser(token) {
    try {
        // Fetch user identity
        const userRes = await fetch('https://discord.com/api/users/@me', {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const userData = await userRes.json();
        
        // Fetch premium list
        const premiumRes = await fetch('users.json');
        const premiumList = await premiumRes.json();

        // Check if premium
        if (premiumList.includes(userData.id)) {
            document.getElementById('premiumStatus').innerText = "Status: Pro Member";
            document.getElementById('upgradeBtn').style.display = "none";
        }
    } catch (err) {
        console.error("Verification failed", err);
    }
}

// 4. Listeners
document.getElementById('loginBtn').onclick = () => {
    window.location.href = `https://discord.com/oauth2/authorize?client_id=${CLIENT_ID}&response_type=token&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&scope=identify+guilds.join`;
};

function saveSettings() {
    const settings = { 
        notif: document.getElementById('notifToggle').checked, 
        status: document.getElementById('statusInput').value 
    };
    localStorage.setItem('settings', JSON.stringify(settings));
    alert("Preferences saved!");
}

// Run on load
init();
