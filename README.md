# NAVADA Nexus Landing Page

A comprehensive React-based landing page for NAVADA Nexus, a UK-Africa venture capital fund focused on AI, robotics, and emerging technologies. *Connecting talent, technology, and capital for tomorrow.*

## Features

- **Interactive Sections**: Overview, Strategy, Financials, Portfolio, Market, Team, Transparency, AI Advisor, FAQ, and Contact
- **Financial Visualizations**: Interactive charts showing fund growth, sector allocation, team compensation models, and SWOT analysis
- **AI Investment Advisor**: Powered by OpenAI with LangChain integration for VC and finance questions
- **Portfolio Application**: Submit startup applications with localStorage database
- **Investor Relations Portal**: LP access and quarterly reporting
- **Support This Initiative**: Community supporter registration
- **3D Visualizations**: Spline 3D scene integration
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Dark Theme**: Professional dark color scheme with emerald, blue, and purple accents
- **LangChain Tracing**: Optional LangSmith integration for AI debugging

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
4. Create a `.env` file in the root directory with your OpenAI API key:
   ```
   REACT_APP_OPENAI_API_KEY=your_openai_api_key_here
   REACT_APP_CONTACT_EMAIL=leeakpareva@gmail.com
   ```

## Optional: Enable LangChain Tracing

To enable LangSmith tracing for AI debugging:

1. Sign up for a LangSmith account at https://smith.langchain.com/
2. Get your API key from the LangSmith dashboard
3. Add to your `.env` file:
   ```
   LANGCHAIN_TRACING_V2=true
   LANGCHAIN_API_KEY=your_langsmith_api_key_here
   LANGCHAIN_PROJECT=navada-nexus
   ```

This will enable detailed tracing of all AI interactions in the LangSmith dashboard for debugging and optimization.

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

1. **Overview** - Hero section with 3D Spline integration, key metrics, and Support This Initiative form
2. **Strategy** - Investment thesis, sector allocation, and SME-focused philosophy
3. **Financials** - Interactive 10-year fund projections, NPV calculators, and scenario analysis
4. **Portfolio** - About the Fund, investment process, and treasury management strategy
5. **Market** - African tech ecosystem analysis and competitive landscape
6. **Team** - Leadership structure, SWOT analysis, fund financial model with profit distribution across Bear/Base/Bull scenarios
7. **Transparency** - Public ledger and governance framework
8. **AI Advisor** - Interactive investment advisor with OpenAI integration
9. **FAQ** - 24+ corporate finance terms with definitions and examples
10. **Contact** - Contact form and office information

## Technologies Used

- **React 18** - Frontend framework
- **Framer Motion** - Animation library
- **Recharts** - Data visualization library
- **Lucide React** - Icon library
- **OpenAI API** - AI-powered investment advisor
- **Spline** - 3D scene integration
- **Tailwind CSS** - Utility-first CSS framework (via inline styles)
- **localStorage** - Client-side data persistence for applications and supporters

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

## Key Features

### Portfolio Application System
- Submit startup applications with company details, funding requirements, and pitch decks
- Data stored in localStorage for persistence
- Automated thank you modal with application tracking ID

### Team Financial Model
- Interactive visualization of fund economics across 3 scenarios (Bear/Base/Bull)
- Transparent breakdown of team compensation (base salary, carry, capital gains)
- Clear demonstration of LP alignment with 80/20 profit split
- Recharts visualizations for team income and investor returns

### AI Investment Advisor
- Powered by OpenAI GPT models
- Specialized in African tech markets, VC analysis, and financial modeling
- Optional LangChain tracing integration for debugging
- Real-time interactive chat interface

### Support This Initiative
- Community supporter registration with localStorage database
- Live supporter count tracking
- Email and message capture for community building

## Environment Variables

Create a `.env` file with the following variables:

```env
# Required
REACT_APP_OPENAI_API_KEY=your_openai_api_key_here
REACT_APP_CONTACT_EMAIL=leeakpareva@gmail.com

# Optional - LangChain Tracing
LANGCHAIN_TRACING_V2=true
LANGCHAIN_API_KEY=your_langsmith_api_key_here
LANGCHAIN_PROJECT=navada-nexus
```

## License

This project is created for NAVADA Nexus demonstration purposes.

## Contact

For inquiries about NAVADA Nexus:
- **Email**: leeakpareva@gmail.com
- **GitHub**: https://github.com/leeakpareva/Navada_VC