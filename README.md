
# Visionary Vector Website

A modern web application built with Next.js and TypeScript, designed to showcase personal portfolios for Ayushi and Shreya. The site features custom components, timelines, and a clean, responsive UI.

## Features
- Next.js 13+ app directory structure
- TypeScript for type safety
- Custom components for content and timelines
- Responsive design
- SVG assets for branding

## Project Structure
```
visionaryvectorwebsite-main/
├── public/                # Static assets (SVGs, icons)
├── src/
│   ├── app/               # Next.js app directory
│   │   ├── (routes)/      # Dynamic routes (ayushi, shreya)
│   │   ├── globals.css    # Global styles
│   │   ├── layout.tsx     # Root layout
│   │   └── page.tsx       # Home page
│   ├── components/
│   │   ├── common/        # Shared components (Header, Button, PageContent)
│   │   └── timeline/      # Timeline components
│   └── lib/               # Type definitions
├── package.json           # Project metadata and scripts
├── tsconfig.json          # TypeScript configuration
├── next.config.ts         # Next.js configuration
├── eslint.config.mjs      # ESLint configuration
├── postcss.config.mjs     # PostCSS configuration
└── README.md              # Project documentation
```

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm or yarn

### Installation
1. Clone the repository:
	```powershell
	git clone https://github.com/ayushisahu222/visionaryvectorwebsite.git
	cd visionaryvectorwebsite-main
	```
2. Install dependencies:
	```powershell
	npm install
	# or
	yarn install
	```
3. Run the development server:
	```powershell
	npm run dev
	# or
	yarn dev
	```
4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Scripts
- `dev`    : Start development server
- `build`  : Build for production
- `start`  : Start production server
- `lint`   : Run ESLint

## Customization
- Add new routes in `src/app/(routes)/`
- Update components in `src/components/`
- Modify global styles in `src/app/globals.css`

## License
MIT

## Authors
- Ayushi Sahu
- Shreya
