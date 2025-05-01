// === Scroll Animations ===
const faders = document.querySelectorAll('.animate-slide-in-left, .animate-slide-in-right, .animate-pop');
const appearOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
    });
}, { threshold: 0.1 });

faders.forEach(fader => {
    appearOnScroll.observe(fader);
});

// === RSS News Feed ===
async function fetchRSSFeed(url) {
    const proxy = 'https://api.rss2json.com/v1/api.json?rss_url=';
    try {
        const res = await fetch(proxy + encodeURIComponent(url));
        const data = await res.json();
        const items = data.items.slice(0, 5);
        const list = document.getElementById('rss-news') || document.createElement('ul');

        items.forEach(item => {
            const li = document.createElement('li');
            li.innerHTML = `<a href="${item.link}" target="_blank">${item.title}</a>`;
            list.appendChild(li);
        });

        if (!document.getElementById('rss-news')) {
            const newsSection = document.querySelector('.news-feed');
            if (newsSection) {
                const ul = document.createElement('ul');
                ul.id = "rss-news";
                ul.innerHTML = list.innerHTML;
                newsSection.appendChild(ul);
            }
        }

    } catch (err) {
        console.error("Error fetching RSS feed:", err);
    }
}

// Fetch from top car blogs
if (document.getElementById('rss-news')) {
    fetchRSSFeed('https://www.motortrend.com/rss/');
}

// === Dark Mode Toggle ===
function toggleTheme() {
    document.body.classList.toggle("dark-theme");
    localStorage.setItem("theme", document.body.classList.contains("dark-theme") ? "dark" : "light");
}

// Load saved theme
window.addEventListener("DOMContentLoaded", () => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
        document.body.classList.add("dark-theme");
    }
});