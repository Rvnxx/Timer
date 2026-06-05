const CLIENT_ID = '1512550372755898622';
const REDIRECT_URI = window.location.origin + window.location.pathname;

const loginBtn = document.getElementById('loginBtn');
const loginSection = document.getElementById('loginSection');
const dashboard = document.getElementById('dashboard');

// Check for token in URL after Discord redirect
const params = new URLSearchParams(window.location.hash.substring(1));
const token = params.get('access_token');

if (token) {
    localStorage.setItem('discord_token', token);
    window.history.replaceState(null, null, window.location.pathname);
}

// UI State Logic
if (localStorage.getItem('discord_token')) {
    loginSection.style.display = 'none';
    dashboard.style.display = 'block';
}

loginBtn.onclick = () => {
    window.location.href = `https://discord.com/oauth2/authorize?client_id=${CLIENT_ID}&response_type=token&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&scope=identify+guilds.join`;
};

document.getElementById('startBtn').onclick = () => {
    alert("Session started! Your Discord bot will be notified.");
};