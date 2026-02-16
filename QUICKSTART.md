# Quick Start Guide

## 🚀 Launch Your Portfolio in 3 Steps

### Step 1: Open Terminal/Command Prompt
Navigate to your portfolio folder:
```bash
cd f:\learning-projects\abdullah-portfolio
```

### Step 2: Start a Local Server

Choose ONE of these methods:

**Method A - Python (Easiest)**
```bash
python -m http.server 8000
```

**Method B - Node.js**
```bash
npx http-server -p 8000
```

**Method C - PHP**
```bash
php -S localhost:8000
```

### Step 3: Open in Browser
Visit: http://localhost:8000

---

## ✏️ Quick Customization Checklist

### Before Going Live:

- [ ] Replace `pic.png` with your photo
- [ ] Update name in `index.html` (line 45)
- [ ] Update social media links (lines 90-110)
- [ ] Update contact email/phone (lines 285-300)
- [ ] Add your real projects to `data/projects.json`
- [ ] Update education in `data/education.json`
- [ ] Add your certifications to `data/achievements.json`
- [ ] Update technologies you know in `data/technologies.json`
- [ ] Add your blog posts to `data/blogs.json`

---

## 🎨 Quick Color Change

Want a different color scheme? Edit `styles.css` line 6:

```css
/* Purple (default) */
--primary-hue: 250;

/* Blue */
--primary-hue: 210;

/* Green */
--primary-hue: 150;

/* Red */
--primary-hue: 0;

/* Cyan */
--primary-hue: 180;
```

---

## 📝 Adding New Content

### Add a Project
Open `data/projects.json` and add:
```json
{
    "title": "My New Project",
    "description": "What this project does...",
    "image": "https://images.unsplash.com/photo-xxxxx?w=800",
    "link": "https://github.com/yourusername/project",
    "tags": ["React", "Node.js", "MongoDB"]
}
```

### Add a Blog Post
Open `data/blogs.json` and add:
```json
{
    "title": "My Blog Post Title",
    "excerpt": "Short description...",
    "date": "Feb 16, 2026",
    "readTime": "5 min read",
    "image": "https://images.unsplash.com/photo-xxxxx?w=800",
    "link": "https://yourblog.com/post"
}
```

---

## 🐛 Troubleshooting

**Problem: JSON not loading**
- Make sure you're using a local server (not opening file directly)
- Check browser console for errors (F12)

**Problem: 3D background not showing**
- Check internet connection (Three.js loads from CDN)
- Try a different browser

**Problem: Images not loading**
- Check image URLs are correct
- For local images, place in root folder

---

## 📱 Test on Mobile

1. Find your computer's IP address:
   - Windows: `ipconfig`
   - Mac/Linux: `ifconfig`

2. On your phone, visit:
   `http://YOUR_IP_ADDRESS:8000`

---

## 🚀 Deploy for Free

### GitHub Pages (Recommended)
1. Create GitHub account
2. Create new repository
3. Upload all files
4. Settings > Pages > Deploy from main branch
5. Done! Your site is live

### Netlify
1. Go to netlify.com
2. Drag and drop your folder
3. Done! Your site is live

---

Need help? Check README.md for detailed instructions!
