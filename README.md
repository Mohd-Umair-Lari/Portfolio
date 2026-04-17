# Mohd Umair Lari - Professional Portfolio

A clean, fast, and production-ready portfolio built with vanilla HTML/CSS.

## Features

✨ **Zero Build Process** - Just pure HTML & CSS
⚡ **Ultra Fast** - Loads in < 1 second
🎨 **Modern Design** - Professional dark theme with smooth animations
📱 **Fully Responsive** - Works on all devices
🔒 **Production Ready** - Deployed on Vercel

## Quick Start

Just open `index.html` in your browser, or deploy to Vercel directly.

## Customization

Before deploying, update these values:

1. **Social Links** - Replace all `yourusername` with your actual usernames
2. **Email** - Update `your.email@example.com`
3. **Resume Link** - Update Google Drive link
4. **Formspree ID** - Replace `YOUR_FORM_ID` with your Formspree form ID

## Deployment

### On Vercel
1. Push this folder to GitHub
2. Go to vercel.com and import the repository
3. Vercel will auto-detect and deploy (no build step needed)
4. Add your custom domain

### Local Testing
```bash
# Simple Python server
python -m http.server 8000

# Or Node.js
npx http-server
```

Then open `http://localhost:8000`

## File Size

- **Total Size**: ~50 KB uncompressed
- **No External Dependencies**
- **No JavaScript Framework**
- **No Build Tool Needed**

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

Free to use and modify for your portfolio.
# Professional Portfolio - Mohd Umair Lari

A modern, aesthetically pleasing portfolio website built with **React 18**, **TypeScript**, **Tailwind CSS**, and **Framer Motion** animations.

## 🎨 Features

- **Modern Design**: Clean, professional UI with dark theme and glassmorphism elements
- **Smooth Animations**: Framer Motion animations for enhanced user experience
- **Responsive**: Fully responsive design that works on all devices
- **Fast Performance**: Built with Vite for instant HMR and optimized builds
- **Type-Safe**: TypeScript for better code quality and IDE support
- **Accessibility**: Semantic HTML and WCAG-compliant interactive elements

## 📋 Sections

- **Hero**: Striking landing section with call-to-action
- **About**: Personal overview and key statistics
- **Skills**: Categorized tech stack and expertise areas
- **Experience**: Professional timeline with achievements
- **Projects**: Showcase of featured projects with tech stack
- **Contact**: Contact form and multiple ways to reach out
- **Footer**: Social links and navigation

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```
src/
├── components/
│   ├── Header.tsx        # Navigation header
│   ├── Hero.tsx          # Hero section
│   ├── About.tsx         # About section
│   ├── Skills.tsx        # Skills section
│   ├── Experience.tsx    # Experience timeline
│   ├── Projects.tsx      # Projects showcase
│   ├── Contact.tsx       # Contact form
│   └── Footer.tsx        # Footer
├── App.tsx               # Main app component
├── main.tsx              # React entry point
└── index.css             # Global styles with Tailwind
```

## 🛠 Tech Stack

- **React 18**: UI library
- **TypeScript**: Type-safe development
- **Vite**: Build tool and dev server
- **Tailwind CSS**: Utility-first CSS framework
- **Framer Motion**: Animation library
- **Lucide React**: Icon library

## 🎯 Customization

### Update Personal Information

Edit the content in respective components:
- Hero section title/subtitle
- About section description
- Skills categories
- Experience entries
- Projects showcase
- Contact information

### Modify Colors

Edit `tailwind.config.js` to customize the color scheme:

```javascript
colors: {
  primary: {
    400: '#38bdf8',  // Modify these values
    500: '#0ea5e9',
    600: '#0284c7',
  },
  // ...
}
```

### Add New Sections

Create new components in `src/components/` following the existing pattern and add them to `App.tsx`.

## 📱 Responsive Breakpoints

- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

## 🚢 Deployment

### Deploy to GitHub Pages

```bash
# Build the project
npm run build

# Push dist folder to gh-pages branch
```

### Deploy to Vercel

```bash
# Login to Vercel
vercel login

# Deploy
vercel
```

### Deploy to Netlify

```bash
# Build
npm run build

# Drag and drop dist folder to Netlify
```

## 🔗 Links to Update

Update these in the components:
- Social media links (GitHub, LinkedIn, Twitter)
- Email address in contact section
- Resume download link
- Project links and live demos

## 📄 License

This portfolio template is open source. Feel free to use it for your own portfolio!

## 👨‍💻 Author

Mohd Umair Lari - Senior Software Development Engineer