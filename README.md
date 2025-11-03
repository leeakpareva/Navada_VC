# NAVADA VC Landing Page

A comprehensive React-based landing page for NAVADA VC, a UK-Africa venture capital fund focused on AI, robotics, and emerging technologies.

## Features

- **12 Interactive Sections**: Home, About, Team, Strategy, Portfolio, Financials, Transparency, Marketing, Mind Map, AI Assistant, Impact, and Contact
- **Financial Visualizations**: Charts and graphs showing fund growth, sector allocation, and transparency metrics
- **AI Chat Assistant**: Interactive AI assistant for VC and finance questions
- **Blockchain Transparency**: Public ledger showing all fund transactions
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Dark Theme**: Professional dark color scheme with emerald accents

## Installation

1. Make sure you have Node.js installed (version 14 or higher)
2. Navigate to the project directory:
   ```bash
   cd C:\Users\leeak\Navada_VC
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

## Running the Application

Start the development server:
```bash
npm start
```

The application will open in your browser at `http://localhost:3000`

## Project Structure

```
Navada_VC/
├── public/
│   └── index.html          # Main HTML template
├── src/
│   ├── NavadaVCLanding.jsx # Main component with all sections
│   ├── index.js            # React entry point
│   └── index.css           # Global styles
├── package.json            # Dependencies and scripts
└── README.md              # This file
```

## Key Sections

1. **Home** - Hero section with key metrics and mission
2. **About** - Vision, mission, and core values
3. **Team** - Team structure and key personnel
4. **Strategy** - Investment thesis and sector allocation
5. **Portfolio** - Current investments and growth projections
6. **Financials** - Capital allocation and financial metrics
7. **Transparency** - Public ledger and blockchain integration
8. **Marketing** - Brand strategy and marketing channels
9. **Mind Map** - Strategic overview visualization
10. **AI Assistant** - Interactive finance assistant chat
11. **Impact** - Social impact metrics and SDG alignment
12. **Contact** - Contact information and office locations

## Technologies Used

- **React 18** - Frontend framework
- **Recharts** - Data visualization library
- **Tailwind CSS** - Utility-first CSS framework
- **Inter Font** - Professional typography

## Customization

To customize the content:
1. Edit the data arrays in `NavadaVCLanding.jsx`
2. Modify colors and styling by updating the Tailwind classes
3. Add new sections by creating new render functions

## Building for Production

```bash
npm run build
```

This creates an optimized production build in the `build` folder.

## License

This project is created for NAVADA VC demonstration purposes.