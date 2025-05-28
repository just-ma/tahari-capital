# Tahari Capital

## Tech Stack

- **Frontend**: React 18 with TypeScript
- **Build Tool**: Vite
- **CMS**: Sanity.io
- **Deployment**: GitHub Pages

## Getting Started

### Installation

1. Clone the repository:
```bash
git clone git@github.com:just-ma/tahari-capital.git
cd tahari-capital
```

2. Install dependencies:
```bash
npm install
```

### Development

Start the development server:
```bash
npm run dev
```

The application will be available at [http://localhost:5173/](http://localhost:5173/)

## Deployment

Deploy to GitHub Pages:
```bash
npm run deploy
```

This command will:
- Build the application for production
- Deploy to the `gh-pages` branch
- Automatically publish to GitHub Pages

## Content Management

This application uses Sanity CMS for content management. Only a few assests are hosted locally including fonts, videos, and logos. Everything else should be coming from Sanity.

### Sanity Configuration

The Sanity client is configured to use:
- Read-only access for public content
- CDN for optimized content delivery
