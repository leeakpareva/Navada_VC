import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SplineScene } from './SplineScene';
import { Spotlight } from './components/Spotlight';
import { Card } from './components/Card';
import { Footer } from './components/Footer';
import { IRRProjection3D, PortfolioAllocation3D, MarketGrowth3D, InvestmentAllocation3D, InvestmentProcess3D, AIAdoptionAfrica3D, FundDeployment3D, GeographicDistribution3D, RiskReturnMatrix3D, ExitTimeline3D } from './components/Chart3D';
import {
  Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import {
  TrendingUp, DollarSign, Globe, Users, Target, Shield,
  Brain, Send, ChevronDown, Menu, X, Maximize2, Heart,
  BarChart3, MapPin, Mail, Phone, Zap, Cpu, Database, AlertTriangle
} from 'lucide-react';
import OpenAI from 'openai';

const NavadaVCLanding = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedYear, setSelectedYear] = useState(0);
  const [expandedChart, setExpandedChart] = useState(null);
  const [supportCount, setSupportCount] = useState(0);
  const [showLegalPopup, setShowLegalPopup] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [showPortfolioApp, setShowPortfolioApp] = useState(false);
  const [showInvestorPortal, setShowInvestorPortal] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const [portfolioFormData, setPortfolioFormData] = useState({
    companyName: '',
    founderName: '',
    email: '',
    phone: '',
    country: '',
    sector: '',
    stage: '',
    fundingNeeded: '',
    pitchDeck: '',
    website: ''
  });

  // Portfolio calculator states
  const [gbpToNaira] = useState(1950);
  const [npvInitialInvestment, setNpvInitialInvestment] = useState(200000);
  const [npvDiscountRate, setNpvDiscountRate] = useState(15);
  const [npvYears, setNpvYears] = useState(10);
  const [npvAnnualReturn, setNpvAnnualReturn] = useState(35);
  const [robotUnits, setRobotUnits] = useState(100);
  const [robotUnitCost, setRobotUnitCost] = useState(300);
  const [robotRetailPrice, setRobotRetailPrice] = useState(3000);
  const [operatingCostPercent, setOperatingCostPercent] = useState(25);
  const [investmentHorizon, setInvestmentHorizon] = useState(5);

  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Welcome to NAVADA Nexus. I\'m your AI investment advisor specializing in African tech markets, venture capital analysis, and financial modeling. Connecting talent, technology, and capital for tomorrow. How can I assist you with your investment inquiries today?'
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedDocs, setUploadedDocs] = useState([]);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  // Initialize OpenAI
  const openai = new OpenAI({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true
  });

  // Enhanced Financial Data with Real Market Research
  // Market data available for future analysis and reporting
  // eslint-disable-next-line no-unused-vars
  const marketData = {
    africanTechMarket: {
      size2024: 8.5, // billion USD
      projectedSize2030: 30.0, // billion USD
      cagr: 23.5, // %
      startupFunding2023: 2.4, // billion USD
      unicorns: 7,
      countries: 54
    },
    vcLandscape: {
      totalFunds: 124,
      aum: 15.2, // billion USD
      avgTicketSize: 2.5, // million USD
      successRate: 18, // %
      avgExitTime: 6.2 // years
    }
  };

  const comprehensiveFinancialModel = {
    fundStructure: {
      targetSize: 200000, // GBP
      managementFee: 2.0, // %
      carriedInterest: 20, // %
      fundLife: 10, // years
      investmentPeriod: 5, // years
    },
    projectedReturns: [
      { year: 2026, netReturns: -50000, grossReturns: -30000, irr: -15.0 },
      { year: 2027, netReturns: -25000, grossReturns: 10000, irr: -8.2 },
      { year: 2028, netReturns: 75000, grossReturns: 120000, irr: 12.5 },
      { year: 2029, netReturns: 180000, grossReturns: 240000, irr: 28.3 },
      { year: 2030, netReturns: 320000, grossReturns: 420000, irr: 35.7 },
      { year: 2031, netReturns: 520000, grossReturns: 680000, irr: 42.1 },
      { year: 2032, netReturns: 750000, grossReturns: 980000, irr: 38.9 },
      { year: 2033, netReturns: 920000, grossReturns: 1200000, irr: 36.2 },
      { year: 2034, netReturns: 1100000, grossReturns: 1450000, irr: 34.8 },
      { year: 2035, netReturns: 1250000, grossReturns: 1650000, irr: 33.1 }
    ],
    portfolioAllocation: [
      { sector: 'AI & Cloud Solutions', allocation: 25, avgTicket: 16000, companies: 6, description: 'Cloud infrastructure, AI platforms, MLOps' },
      { sector: 'Robotics & Automation', allocation: 20, avgTicket: 18000, companies: 4, description: 'Industrial robotics, AgriTech automation, logistics' },
      { sector: 'FinTech', allocation: 20, avgTicket: 14000, companies: 6, description: 'Digital payments, banking solutions' },
      { sector: 'AgriTech', allocation: 15, avgTicket: 12000, companies: 4, description: 'Smart farming, supply chain tech' },
      { sector: 'HealthTech', allocation: 12, avgTicket: 15000, companies: 3, description: 'Telemedicine, diagnostics' },
      { sector: 'EdTech', allocation: 8, avgTicket: 10000, companies: 2, description: 'Online learning, skills development' }
    ],
    keyMetrics: {
      targetIRR: 35,
      targetMultiple: 4.5,
      portfolioSize: 25,
      followOnReserve: 30, // %
      managementFeeRate: 2.0,
      hurdleRate: 8.0
    }
  };

  const detailedPortfolioData = [
    {
      company: 'FlutterWave',
      sector: 'FinTech',
      country: 'Nigeria',
      stage: 'Series C',
      valuation: 3000000000,
      lastRoundSize: 250000000,
      growth: 340,
      status: 'Unicorn'
    },
    {
      company: 'Andela',
      sector: 'EdTech',
      country: 'Nigeria',
      stage: 'Series E',
      valuation: 1500000000,
      lastRoundSize: 200000000,
      growth: 280,
      status: 'Unicorn'
    },
    {
      company: 'Jumia',
      sector: 'E-commerce',
      country: 'Multi-country',
      stage: 'Public',
      valuation: 800000000,
      lastRoundSize: 0,
      growth: 125,
      status: 'Public'
    }
  ];

  const riskAnalysis = {
    marketRisks: [
      { risk: 'Currency Volatility', probability: 'High', impact: 'Medium', mitigation: 'Multi-currency hedging' },
      { risk: 'Regulatory Changes', probability: 'Medium', impact: 'High', mitigation: 'Local legal partnerships' },
      { risk: 'Political Instability', probability: 'Medium', impact: 'High', mitigation: 'Diversified portfolio' },
      { risk: 'Economic Recession', probability: 'Low', impact: 'High', mitigation: 'Counter-cyclical investments' }
    ],
    dueDiligence: {
      financialAnalysis: 95,
      marketValidation: 90,
      teamAssessment: 88,
      technicalReview: 92,
      legalCompliance: 94
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    // Load support count from localStorage
    const supporters = JSON.parse(localStorage.getItem('navada_supporters') || '[]');
    setSupportCount(supporters.length);
  }, []);

  useEffect(() => {
    // Check if user has accepted legal declaration
    const hasAccepted = localStorage.getItem('navadaAccepted');
    if (!hasAccepted) {
      setShowLegalPopup(true);
    }
  }, []);

  const handleAcceptLegal = () => {
    localStorage.setItem('navadaAccepted', 'true');
    setShowLegalPopup(false);
  };

  const handleDownloadDeck = (e) => {
    e.preventDefault();
    setIsDownloading(true);

    // Simulate download preparation
    setTimeout(() => {
      const link = document.createElement('a');
      link.href = '/assets/NAVADA_VC_Business_Plan_Interactive.pdf';
      link.download = 'NAVADA_VC_Business_Plan_Interactive.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setTimeout(() => {
        setIsDownloading(false);
      }, 500);
    }, 800);
  };

  const handlePortfolioSubmit = (e) => {
    e.preventDefault();

    // Save to localStorage
    const applications = JSON.parse(localStorage.getItem('navada_portfolio_applications') || '[]');
    const newApplication = {
      ...portfolioFormData,
      submittedAt: new Date().toISOString(),
      id: Date.now()
    };
    applications.push(newApplication);
    localStorage.setItem('navada_portfolio_applications', JSON.stringify(applications));

    // Show thank you message
    setShowPortfolioApp(false);
    setShowThankYou(true);

    // Reset form
    setPortfolioFormData({
      companyName: '',
      founderName: '',
      email: '',
      phone: '',
      country: '',
      sector: '',
      stage: '',
      fundingNeeded: '',
      pitchDeck: '',
      website: ''
    });

    // Hide thank you after 4 seconds
    setTimeout(() => {
      setShowThankYou(false);
    }, 4000);
  };

  const handlePortfolioInputChange = (field, value) => {
    setPortfolioFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // AI Assistant Handler with OpenAI Integration
  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = { role: 'user', content: inputMessage };
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      let contextDocs = '';
      if (uploadedDocs.length > 0) {
        contextDocs = '\n\nUploaded Documents Context:\n' + uploadedDocs.map(doc =>
          `Document: ${doc.name}\nContent: ${doc.content}\n---`
        ).join('\n');
      }

      const systemPrompt = `You are a senior investment advisor for NAVADA Nexus, a UK-Africa venture capital fund launching in Q4 2026.

Fund Details:
- Target Size: £200,000 (initial seed round)
- Target IRR: 35%+
- Focus: AI & Cloud Solutions (25%), Robotics & Automation (20%), FinTech (20%), AgriTech (15%), HealthTech (12%), EdTech (8%)
- Led by robotics engineer with expertise in automation, AI, and cloud infrastructure
- Regions: Nigeria (30%), Kenya (25%), Ghana (20%), South Africa (25%)
- Structure: Limited Partnership with 2% management fee, 20% carry

Key Investment Areas:
- AI & Cloud Solutions: Cloud infrastructure, AI/ML platforms, MLOps, DevOps tools
- Robotics & Automation: Industrial robotics, AgriTech automation, logistics automation
- Technical mentorship and founder support in robotics engineering and cloud architecture

Market Context:
- African tech market: $8.5B (2024) → $30B (2030 projected)
- 23.5% CAGR expected
- 7 current unicorns, 124 VC funds active

${contextDocs}

Provide expert, data-driven advice on venture capital, robotics, automation, cloud solutions, AI/ML, financial modeling, African tech markets, and investment strategies. Be professional, specific, and reference real market data when possible. Format code in markdown code blocks with language tags (e.g. \`\`\`python). When referencing uploaded documents, cite the document name.`;

      if (!process.env.REACT_APP_OPENAI_API_KEY || process.env.REACT_APP_OPENAI_API_KEY === 'your_openai_api_key_here') {
        // Fallback response if API key not configured
        const fallbackResponses = [
          "Based on our analysis, the African tech market presents compelling opportunities with a projected 23.5% CAGR through 2030. Our target IRR of 35% aligns with top-quartile VC performance in emerging markets.",
          "AI & Cloud Solutions represents our largest allocation at 25%, leveraging our expertise in cloud infrastructure and AI/ML platforms to support scalable African tech startups.",
          "Robotics & Automation accounts for 20% of our portfolio, focusing on industrial robotics, AgriTech automation, and logistics solutions. Our robotics engineering expertise enables deep technical due diligence and founder mentorship.",
          "Our technical leadership brings hands-on robotics engineering experience, providing portfolio companies with guidance in automation, cloud architecture, and AI implementation.",
          "Our due diligence process includes comprehensive market validation, with 90%+ scores across financial analysis, team assessment, and technical review.",
          "The fund's 2% management fee and 20% carry structure is competitive with industry standards while ensuring proper alignment with our Limited Partners."
        ];

        setTimeout(() => {
          const randomResponse = fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
          setMessages(prev => [...prev, { role: 'assistant', content: randomResponse }]);
          setIsLoading(false);
        }, 1500);
        return;
      }

      const response = await openai.chat.completions.create({
        model: 'gpt-4',
        messages: [
          { role: 'system', content: systemPrompt },
          ...messages.slice(-5), // Keep last 5 messages for context
          userMessage
        ],
        temperature: 0.7,
        max_tokens: 500
      });

      const assistantMessage = {
        role: 'assistant',
        content: response.choices[0].message.content
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('OpenAI API Error:', error);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'I apologize for the technical difficulty. Our fund targets a 35% IRR through strategic investments in African tech. Would you like to discuss our investment thesis or portfolio allocation strategy?'
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileUpload = async (e) => {
    const files = Array.from(e.target.files);
    const newDocs = [];

    for (const file of files) {
      if (file.type === 'application/pdf' || file.type === 'text/plain' || file.type.includes('document')) {
        const reader = new FileReader();
        reader.onload = async (event) => {
          const text = event.target.result;
          newDocs.push({
            name: file.name,
            content: text.substring(0, 10000), // Limit to first 10k chars for RAG
            type: file.type
          });

          setUploadedDocs(prev => [...prev, ...newDocs]);
          setMessages(prev => [...prev, {
            role: 'assistant',
            content: `Document "${file.name}" uploaded successfully. I can now answer questions about this document.`
          }]);
        };
        reader.readAsText(file);
      }
    }
  };

  const tabs = [
    { id: 'home', label: 'Overview', icon: TrendingUp },
    { id: 'strategy', label: 'Strategy', icon: Target },
    { id: 'financials', label: 'Financials', icon: DollarSign },
    { id: 'portfolio', label: 'Portfolio', icon: BarChart3 },
    { id: 'market', label: 'Market', icon: Globe },
    { id: 'team', label: 'Team', icon: Users },
    { id: 'transparency', label: 'Transparency', icon: Shield },
    { id: 'ai-assistant', label: 'AI Advisor', icon: Brain },
    { id: 'faq', label: 'FAQ', icon: Shield },
    { id: 'contact', label: 'Contact', icon: Mail }
  ];


  const renderHome = () => (
    <div className="space-y-20">
      {/* Hero Section with Spline */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative"
      >
        <Card className="w-full h-[600px] bg-black/[0.96] relative overflow-hidden">
          <Spotlight
            className="-top-40 left-0 md:left-60 md:-top-20"
            fill="white"
          />

          <div className="flex flex-col lg:flex-row h-full">
            {/* Left content */}
            <div className="flex-1 p-8 lg:p-16 relative z-10 flex flex-col justify-center">
              <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 mb-6">
                NAVADA <span className="text-3xl md:text-5xl italic font-light">Nexus</span>
              </h1>
              <p className="text-2xl md:text-3xl font-light text-gray-300 mb-4">
                Connecting talent, technology, and capital for tomorrow.
              </p>
              <p className="mt-4 text-neutral-300 text-lg max-w-2xl leading-relaxed mb-8">
                Deploying £200,000 in seed capital to accelerate African tech innovation.
                Targeting 35%+ IRR through strategic investments in AI & Cloud Solutions, Robotics & Automation, FinTech, and emerging technologies.
              </p>
              <div className="flex gap-6">
                <motion.button
                  onClick={handleDownloadDeck}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={isDownloading}
                  className="relative inline-flex items-center justify-center bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg disabled:opacity-70 disabled:cursor-not-allowed min-w-[180px]"
                >
                  {isDownloading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Preparing...</span>
                    </div>
                  ) : (
                    'Investment Deck'
                  )}
                </motion.button>
                <motion.button
                  onClick={() => setShowCalendar(true)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="border border-gray-600 hover:border-gray-500 text-gray-300 hover:text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300"
                >
                  Schedule Meeting
                </motion.button>
              </div>
            </div>

            {/* Right content - Spline 3D Scene */}
            <div className="flex-1 relative min-h-[400px] lg:min-h-0">
              <SplineScene
                scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                className="w-full h-full"
              />
            </div>
          </div>
        </Card>
      </motion.section>

      {/* Key Metrics Grid */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6"
      >
        {[
          {
            label: 'Target Fund Size',
            value: '£200K',
            sublabel: 'Initial Seed Round',
            change: '+15% vs peers',
            icon: DollarSign,
            color: 'emerald'
          },
          {
            label: 'Target IRR',
            value: '35%+',
            sublabel: 'Annual Returns',
            change: 'Top quartile',
            icon: TrendingUp,
            color: 'blue'
          },
          {
            label: 'Portfolio Companies',
            value: '25',
            sublabel: 'Strategic Investments',
            change: '5-year timeline',
            icon: Users,
            color: 'purple'
          },
          {
            label: 'Market Size',
            value: '$30B',
            sublabel: 'African Tech 2030',
            change: '23.5% CAGR',
            icon: Globe,
            color: 'amber'
          },
          {
            label: 'Initiative Supporters',
            value: supportCount.toString(),
            sublabel: 'Community Members',
            change: 'Growing daily',
            icon: Heart,
            color: 'red',
            isLive: true
          }
        ].map((metric, idx) => {
          const colorClasses = {
            emerald: { bg: 'bg-emerald-500/10', text: 'text-emerald-400' },
            blue: { bg: 'bg-blue-500/10', text: 'text-blue-400' },
            purple: { bg: 'bg-purple-500/10', text: 'text-purple-400' },
            amber: { bg: 'bg-amber-500/10', text: 'text-amber-400' },
            red: { bg: 'bg-red-500/10', text: 'text-red-400' }
          };
          const colors = colorClasses[metric.color];

          const glowColors = {
            emerald: 'shadow-emerald-500/20 hover:shadow-emerald-500/40',
            red: 'shadow-red-500/20 hover:shadow-red-500/40',
            blue: 'shadow-blue-500/20 hover:shadow-blue-500/40',
            purple: 'shadow-purple-500/20 hover:shadow-purple-500/40',
            amber: 'shadow-amber-500/20 hover:shadow-amber-500/40'
          };
          const glow = glowColors[metric.color];

          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + idx * 0.1, duration: 0.6 }}
              className={`bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300 shadow-2xl ${glow}`}
            >
              <div className="text-sm font-medium text-gray-400 mb-4">{metric.label}</div>
              <div className="text-4xl font-bold text-white mb-2">{metric.value}</div>
              <div className="text-sm text-gray-500 mb-2">{metric.sublabel}</div>
              <div className={`text-xs font-medium ${colors.text}`}>{metric.change}</div>
            </motion.div>
          );
        })}
      </motion.section>

      {/* Investment Thesis */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.8 }}
        className="bg-gray-800/30 backdrop-blur-sm rounded-3xl p-12 border border-gray-700/30 shadow-2xl shadow-emerald-500/10 hover:shadow-emerald-500/20 transition-all duration-300"
      >
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center rounded-full bg-emerald-500/10 px-6 py-2 text-sm font-medium text-emerald-400 mb-6">
            <TrendingUp className="mr-2 h-4 w-4" />
            Launching Q4 2026
          </div>
          <h2 className="text-4xl font-bold text-white mb-6">Investment Thesis</h2>
          <p className="text-lg text-gray-300 mb-8 leading-relaxed">
            Africa's tech ecosystem is experiencing unprecedented growth, with startup funding reaching $2.4B in 2023.
            Our data-driven approach targets high-growth sectors with proven scalability and strong founding teams.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { metric: 'Market Opportunity', value: '$30B by 2030' },
              { metric: 'Investment Focus', value: 'Series A & B rounds' },
              { metric: 'Geographic Coverage', value: '4 key markets' },
              { metric: 'Expected Multiple', value: '4.5x return' }
            ].map((item, idx) => (
              <div key={idx} className="flex justify-between items-center py-3 border-b border-gray-700/50">
                <span className="text-gray-400">{item.metric}</span>
                <span className="text-white font-semibold">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Market Validation */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.0, duration: 0.8 }}
        className="text-center"
      >
        <h2 className="text-4xl font-bold text-white mb-6">Market Validation</h2>
        <p className="text-xl text-gray-400 mb-12 max-w-3xl mx-auto">
          Backed by comprehensive market research and validated investment models
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: 'Market Research',
              description: 'In-depth analysis of 54 African markets with focus on tech adoption rates and regulatory frameworks',
              stat: '18 months research'
            },
            {
              title: 'Due Diligence',
              description: 'Rigorous 95% financial analysis score with comprehensive team and technical assessments',
              stat: '95% DD score'
            },
            {
              title: 'Risk Management',
              description: 'Multi-currency hedging and diversified portfolio approach to mitigate regional risks',
              stat: '4 risk categories'
            }
          ].map((item, idx) => {
            const glowColors = ['shadow-blue-500/20 hover:shadow-blue-500/40', 'shadow-emerald-500/20 hover:shadow-emerald-500/40', 'shadow-purple-500/20 hover:shadow-purple-500/40'];
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 + idx * 0.1, duration: 0.6 }}
                className={`bg-gray-800/40 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/40 shadow-2xl ${glowColors[idx]} transition-all duration-300`}
              >
                <div className="text-3xl font-bold text-emerald-400 mb-4">{item.stat}</div>
                <h3 className="text-xl font-semibold text-white mb-4">{item.title}</h3>
                <p className="text-gray-400 leading-relaxed">{item.description}</p>
              </motion.div>
            );
          })}
        </div>
      </motion.section>

      {/* Support Register Form */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <div className="bg-gradient-to-br from-emerald-500/10 via-blue-500/10 to-purple-500/10 backdrop-blur-sm rounded-3xl p-12 border border-emerald-500/30 shadow-2xl shadow-emerald-500/20">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-white mb-4">Support This Initiative</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Join our growing community of supporters who believe in empowering African tech innovation.
              Your support helps us reach our £200,000 goal faster.
            </p>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.target);
              const supporter = {
                name: formData.get('name'),
                email: formData.get('email'),
                message: formData.get('message'),
                timestamp: new Date().toISOString()
              };

              // Save to localStorage
              const supporters = JSON.parse(localStorage.getItem('navada_supporters') || '[]');
              supporters.push(supporter);
              localStorage.setItem('navada_supporters', JSON.stringify(supporters));

              // Update count
              setSupportCount(supporters.length);

              // Show success message
              alert('Thank you for your support! You are supporter #' + supporters.length);

              // Reset form
              e.target.reset();
            }}
            className="max-w-2xl mx-auto space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">Your Name *</label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="John Doe"
                  className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500 transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">Email Address *</label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="john@example.com"
                  className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">Message (Optional)</label>
              <textarea
                name="message"
                rows="4"
                placeholder="Why do you support NAVADA Nexus's mission?"
                className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500 transition-colors resize-none"
              ></textarea>
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className="px-8 py-4 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-emerald-500/50 transition-all duration-300 transform hover:scale-105"
              >
                Register Support
              </button>
            </div>

            <p className="text-center text-sm text-gray-400 mt-4">
              Current Supporters: <span className="font-bold text-emerald-400">{supportCount}</span>
            </p>
          </form>
        </div>
      </motion.section>
    </div>
  );

  const renderStrategy = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="space-y-16"
    >
      <div className="text-center">
        <h1 className="text-5xl font-bold text-white mb-6">Investment Strategy</h1>
        <p className="text-xl text-gray-400 max-w-3xl mx-auto">
          Data-driven approach to African tech investment with focus on scalable, high-growth opportunities
        </p>
      </div>

      {/* Strategy Overview & Real-Life Example */}
      <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-sm rounded-3xl p-12 border border-blue-500/20">
        <h2 className="text-3xl font-bold text-white mb-6">Understanding Our Investment Strategy</h2>

        <div className="space-y-8">
          <div className="bg-gray-900/50 rounded-xl p-8 border border-gray-700/50">
            <h3 className="text-2xl font-bold text-emerald-400 mb-4">In Simple Terms</h3>
            <p className="text-lg text-gray-300 leading-relaxed mb-4">
              Our investment strategy is like being a talent scout and coach for Africa's tech future. We seek out <strong className="text-white">subject matter experts (SMEs)</strong> —
              founders who are deeply passionate about technology, AI, robotics, and data, and who possess the discipline to execute their vision.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed mb-4">
              We don't just invest in good ideas; we invest in <strong className="text-emerald-400">exceptional people</strong> who have already proven their expertise in their field
              and demonstrated that their solution works (like a restaurant that's packed every night). We give them capital to expand (open more locations),
              and most importantly, provide hands-on mentorship to help them build better technology using AI, robotics, and cloud computing.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed">
              We spread our £200,000 across 25 different companies, ensuring that if some fail, the successful ones — led by passionate,
              disciplined experts — make up for it and more. <strong className="text-white">Success requires SMEs with passion and discipline</strong>, not just great technology.
            </p>
          </div>

          <div className="bg-gray-900/50 rounded-xl p-8 border border-gray-700/50">
            <h3 className="text-2xl font-bold text-blue-400 mb-4">Real-Life Example: The Flutterwave Story</h3>
            <p className="text-lg text-gray-300 leading-relaxed mb-4">
              Imagine a Nigerian company called Flutterwave that helps businesses accept payments online (like PayPal for Africa).
              In 2017, they were processing $10 million in payments per month and had 100 customers. An investor like us would:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div className="bg-gray-800/50 rounded-lg p-6">
                <div className="text-emerald-400 font-semibold mb-2">What We Invest:</div>
                <p className="text-gray-300 text-sm">£15,000 for a 7% stake (valuation: £215,000)</p>
                <div className="text-emerald-400 font-semibold mt-4 mb-2">What They Do With It:</div>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>• Hire 5 engineers to improve the platform</li>
                  <li>• Expand to Kenya and Ghana</li>
                  <li>• Integrate AI for fraud detection</li>
                </ul>
              </div>
              <div className="bg-gray-800/50 rounded-lg p-6">
                <div className="text-blue-400 font-semibold mb-2">Our Value-Add:</div>
                <ul className="text-gray-300 text-sm space-y-2">
                  <li>• Monthly technical workshops on cloud security</li>
                  <li>• Intro to AWS and Google Cloud partners</li>
                  <li>• Help recruit senior engineers</li>
                  <li>• Connect with potential customers</li>
                </ul>
                <div className="text-blue-400 font-semibold mt-4 mb-2">The Outcome (5 years):</div>
                <p className="text-gray-300 text-sm">Company grows to £10M valuation → Our £15K is now worth £700K (46x return!)</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-900/50 rounded-xl p-8 border border-gray-700/50">
            <h3 className="text-2xl font-bold text-purple-400 mb-4">Why This Matters for Africa</h3>
            <p className="text-lg text-gray-300 leading-relaxed">
              Africa has 1.4 billion people, 600 million with smartphones, but tech infrastructure (banking, healthcare, education)
              is decades behind. This creates massive opportunities. By funding and educating talented African founders, we're not
              just making money. We're helping build the infrastructure that will power Africa's digital economy for the next 50 years.
              Every company we fund creates jobs, solves real problems, and trains the next generation of tech leaders.
            </p>
          </div>
        </div>
      </div>

      {/* Sector Allocation - Enhanced 3D */}
      <div className="bg-gray-800/30 backdrop-blur-sm rounded-3xl p-12 border border-gray-700/30 shadow-2xl shadow-purple-500/10 hover:shadow-purple-500/20 transition-all duration-300">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 bg-purple-500/10 rounded-lg">
            <Database className="h-6 w-6 text-purple-400" />
          </div>
          <h2 className="text-3xl font-bold text-white">Portfolio Allocation</h2>
          <span className="ml-auto px-3 py-1 bg-purple-500/10 text-purple-400 rounded-full text-sm font-semibold">3D Interactive</span>
        </div>

        {/* Understanding Portfolio Allocation - Educational Section */}
        <div className="mb-8 space-y-6">
          <div className="bg-gradient-to-br from-purple-500/10 to-blue-500/10 backdrop-blur-sm rounded-xl p-8 border border-purple-500/20">
            <h3 className="text-2xl font-bold text-emerald-400 mb-4">In Simple Terms: How We Split Our £200K Fund</h3>
            <p className="text-lg text-gray-300 leading-relaxed">
              Portfolio allocation is like deciding how to spend your weekly grocery budget. You don't spend it all on fruit; you allocate some
              to vegetables, meat, dairy, and snacks to have a balanced diet. Similarly, we split our £200,000 fund across 6 different tech sectors
              (FinTech, AgriTech, HealthTech, etc.) so that if one sector struggles, the others keep the fund healthy. The chart below shows exactly
              how many pounds go to each sector, how big each investment is (average ticket), and how many startups we back in each area.
            </p>
          </div>

          <div className="bg-gradient-to-br from-blue-500/10 to-emerald-500/10 backdrop-blur-sm rounded-xl p-8 border border-blue-500/20">
            <h3 className="text-2xl font-bold text-blue-400 mb-4">Real-Life Example: Why We Don't Put All £200K into One Sector</h3>
            <p className="text-lg text-gray-300 leading-relaxed mb-6">
              Imagine two investors, Sarah and David, each with £200,000 to invest in African tech in 2020. They both want to invest in 15 startups
              over 5 years. Here's what they decided:
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-gray-900/50 rounded-lg p-6 border-2 border-red-500/30">
                <div className="text-red-400 font-bold text-lg mb-4">❌ Sarah: All In on FinTech</div>
                <div className="bg-gray-800/50 rounded-lg p-4 mb-4">
                  <div className="text-red-400 font-semibold mb-2">Her Allocation:</div>
                  <p className="text-gray-300 text-sm mb-1">• 100% FinTech (15 companies)</p>
                  <p className="text-gray-300 text-sm mb-1">• £13,333 per company</p>
                  <p className="text-gray-300 text-sm mb-3">• All in mobile payments and digital banking</p>
                  <div className="text-gray-400 text-xs italic">"FinTech is hot! Everyone needs payments!"</div>
                </div>
                <div className="bg-red-500/10 rounded-lg p-4 border border-red-500/30">
                  <div className="text-red-400 font-semibold mb-2">What Happened (2020-2025):</div>
                  <p className="text-gray-300 text-sm mb-3">
                    In 2023-2024, multiple African countries tightened FinTech regulations, raised compliance costs, and restricted cross-border
                    payments. 11 of Sarah's 15 companies failed or scaled back dramatically. Only 4 survived.
                  </p>
                  <div className="flex justify-between items-center pt-3 border-t border-gray-700">
                    <span className="text-gray-400 text-sm font-semibold">5-Year Result:</span>
                    <span className="text-red-400 font-bold text-lg">£200K → £95K</span>
                  </div>
                  <p className="text-red-400 text-xs mt-2">Lost £105,000 (52.5% loss) because all eggs in one basket</p>
                </div>
              </div>

              <div className="bg-gray-900/50 rounded-lg p-6 border-2 border-emerald-500/30">
                <div className="text-emerald-400 font-bold text-lg mb-4">✓ David: Balanced Allocation</div>
                <div className="bg-gray-800/50 rounded-lg p-4 mb-4">
                  <div className="text-emerald-400 font-semibold mb-2">His Allocation (like NAVADA):</div>
                  <p className="text-gray-300 text-sm mb-1">• FinTech: 20% (£40K, 3 companies)</p>
                  <p className="text-gray-300 text-sm mb-1">• AgriTech: 18% (£36K, 3 companies)</p>
                  <p className="text-gray-300 text-sm mb-1">• HealthTech: 17% (£34K, 3 companies)</p>
                  <p className="text-gray-300 text-sm mb-1">• EdTech: 15% (£30K, 2 companies)</p>
                  <p className="text-gray-300 text-sm mb-1">• Robotics: 15% (£30K, 2 companies)</p>
                  <p className="text-gray-300 text-sm mb-3">• Cloud: 15% (£30K, 2 companies)</p>
                  <div className="text-gray-400 text-xs italic">"I'll spread risk and capture multiple growth trends"</div>
                </div>
                <div className="bg-emerald-500/10 rounded-lg p-4 border border-emerald-500/30">
                  <div className="text-emerald-400 font-semibold mb-2">What Happened (2020-2025):</div>
                  <p className="text-gray-300 text-sm mb-3">
                    Same FinTech regulations hit—2 of his 3 FinTech companies failed (£18K lost). BUT: His AgriTech companies thrived (3x average),
                    HealthTech grew with post-COVID demand (4x), EdTech benefited from online learning boom (3x), and 1 Robotics company became a unicorn (50x).
                  </p>
                  <div className="flex justify-between items-center pt-3 border-t border-gray-700">
                    <span className="text-gray-400 text-sm font-semibold">5-Year Result:</span>
                    <span className="text-emerald-400 font-bold text-lg">£200K → £820K</span>
                  </div>
                  <p className="text-emerald-400 text-xs mt-2">Made £620,000 (310% gain) because diversification captured winners across sectors</p>
                </div>
              </div>
            </div>

            <div className="mt-6 bg-gradient-to-br from-emerald-500/20 to-blue-500/20 rounded-lg p-6 border border-emerald-500/30">
              <div className="text-white font-bold text-lg mb-3">The £725K Lesson</div>
              <p className="text-gray-300 text-sm">
                Sarah ended with £95K. David ended with £820K. The difference? £725,000. That's why portfolio allocation matters: it's not about
                predicting the future, it's about protecting yourself when you're wrong and capturing opportunities when you're right. David lost
                money in FinTech too, but his other sectors compensated and then some.
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-amber-500/10 to-purple-500/10 backdrop-blur-sm rounded-xl p-8 border border-amber-500/20">
            <h3 className="text-2xl font-bold text-purple-400 mb-4">Why This Matters: NAVADA's Sector Strategy</h3>
            <p className="text-lg text-gray-300 leading-relaxed mb-4">
              Our 6-sector allocation isn't random—it's designed to capture the biggest opportunities in African tech while managing risk:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-900/50 rounded-lg p-4 border border-emerald-500/20">
                <div className="text-emerald-400 font-semibold mb-2">FinTech (20%): Largest but Not Dominant</div>
                <p className="text-gray-300 text-sm">Africa's most proven sector, but we cap it at 20% to avoid over-concentration in a highly regulated industry</p>
              </div>
              <div className="bg-gray-900/50 rounded-lg p-4 border border-blue-500/20">
                <div className="text-blue-400 font-semibold mb-2">AgriTech + HealthTech (35%): Essential Services</div>
                <p className="text-gray-300 text-sm">70% of Africans depend on agriculture, 400M lack healthcare access—massive TAM, recession-resistant</p>
              </div>
              <div className="bg-gray-900/50 rounded-lg p-4 border border-purple-500/20">
                <div className="text-purple-400 font-semibold mb-2">AI/Robotics/Cloud (45%): Future Bets</div>
                <p className="text-gray-300 text-sm">These emerging sectors will define Africa's next decade—we're early, but the upside is 10-50x if we're right</p>
              </div>
            </div>
          </div>
        </div>

        <div className="h-[600px] bg-gray-900/50 rounded-xl border border-gray-700/50 p-4">
          <PortfolioAllocation3D data={comprehensiveFinancialModel.portfolioAllocation} />
        </div>
      </div>

      {/* Investment Process - Enhanced 3D */}
      <div className="bg-gray-800/30 backdrop-blur-sm rounded-3xl p-12 border border-gray-700/30 shadow-2xl shadow-emerald-500/10 hover:shadow-emerald-500/20 transition-all duration-300">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 bg-emerald-500/10 rounded-lg">
            <TrendingUp className="h-6 w-6 text-emerald-400" />
          </div>
          <h2 className="text-3xl font-bold text-white">Investment Process & Funnel</h2>
          <span className="ml-auto px-3 py-1 bg-emerald-500/10 text-emerald-400 rounded-full text-sm font-semibold">3D Interactive</span>
        </div>

        {/* Understanding Investment Process - Educational Section */}
        <div className="mb-8 space-y-6">
          <div className="bg-gradient-to-br from-emerald-500/10 to-blue-500/10 backdrop-blur-sm rounded-xl p-8 border border-emerald-500/20">
            <h3 className="text-2xl font-bold text-emerald-400 mb-4">In Simple Terms: From 100 Applications to 8 Investments</h3>
            <p className="text-lg text-gray-300 leading-relaxed">
              The investment funnel is like a university admissions process. Thousands of students apply, but only a few get accepted. Our funnel
              has 6 stages, and at each stage, we eliminate startups that don't meet our standards. We start with 100+ startup applications per year,
              but only 8 make it through to become investments. This rigorous filtering process ensures we only back the absolute best opportunities—protecting
              investor capital and maximizing returns. The 3D chart below shows how many startups pass each stage, how long each stage takes, and the
              final 8% conversion rate from application to investment.
            </p>
          </div>

          <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-sm rounded-xl p-8 border border-blue-500/20">
            <h3 className="text-2xl font-bold text-blue-400 mb-4">Real-Life Example: Following One Startup Through Our Funnel</h3>
            <p className="text-lg text-gray-300 leading-relaxed mb-6">
              Let's follow "MediConnect Ghana," a HealthTech startup, as they apply for investment. Here's their journey through our 6-stage process:
            </p>

            <div className="space-y-4">
              <div className="bg-gray-900/50 rounded-lg p-5 border-l-4 border-blue-500">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <div className="text-blue-400 font-bold text-lg">Stage 1: Sourcing (Week 1-2)</div>
                    <div className="text-gray-400 text-sm">100 startups enter</div>
                  </div>
                  <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-xs font-bold">100 → 40</span>
                </div>
                <p className="text-gray-300 text-sm mb-2">
                  <strong>What happened:</strong> MediConnect applied through our website after being referred by an accelerator. We received their
                  pitch deck and founder bios. Out of 100 applications this quarter, we filtered for: African focus, tech-enabled, Series A stage,
                  revenue traction. MediConnect passed—they had $400K ARR and were solving real healthcare access problems.
                </p>
                <div className="text-emerald-400 text-sm font-semibold">→ MediConnect advances to Screening</div>
              </div>

              <div className="bg-gray-900/50 rounded-lg p-5 border-l-4 border-emerald-500">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <div className="text-emerald-400 font-bold text-lg">Stage 2: Screening (Week 3-5)</div>
                    <div className="text-gray-400 text-sm">40 startups reviewed</div>
                  </div>
                  <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 rounded-full text-xs font-bold">40 → 10</span>
                </div>
                <p className="text-gray-300 text-sm mb-2">
                  <strong>What happened:</strong> We scheduled a 45-minute Zoom call with the founders. Reviewed their pitch deck in detail, checked
                  their market size (Ghana has 32M people, only 4M with health insurance—huge TAM), and did initial competitive analysis. They scored
                  7.5/10 in our screening rubric. 30 companies didn't make the cut—weak founders, small markets, or no clear differentiation.
                </p>
                <div className="text-emerald-400 text-sm font-semibold">→ MediConnect advances to Due Diligence</div>
              </div>

              <div className="bg-gray-900/50 rounded-lg p-5 border-l-4 border-purple-500">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <div className="text-purple-400 font-bold text-lg">Stage 3: Due Diligence (Week 6-9)</div>
                    <div className="text-gray-400 text-sm">10 startups deeply analyzed</div>
                  </div>
                  <span className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-xs font-bold">10 → 6</span>
                </div>
                <p className="text-gray-300 text-sm mb-2">
                  <strong>What happened:</strong> This is the hard part. We spent 4 weeks investigating everything: called 5 customers (hospitals using
                  their platform), reviewed their financial statements (verified $400K ARR claim), talked to 2 competitors, had our technical advisor
                  review their code architecture, and checked founder backgrounds (CEO was ex-Philips Healthcare engineer). 4 companies failed—one had
                  fraudulent revenue claims, two had terrible unit economics, one had a toxic founder.
                </p>
                <div className="text-emerald-400 text-sm font-semibold">→ MediConnect passes—everything checks out</div>
              </div>

              <div className="bg-gray-900/50 rounded-lg p-5 border-l-4 border-amber-500">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <div className="text-amber-400 font-bold text-lg">Stage 4: Investment Committee (Week 10)</div>
                    <div className="text-gray-400 text-sm">6 startups presented</div>
                  </div>
                  <span className="px-3 py-1 bg-amber-500/20 text-amber-400 rounded-full text-xs font-bold">6 → 4</span>
                </div>
                <p className="text-gray-300 text-sm mb-2">
                  <strong>What happened:</strong> We presented MediConnect to our investment committee (3 partners + 2 advisors). The vote: 4 YES, 1 NO
                  (one partner worried about Ghana's regulatory environment). Overall score: 8.2/10—above our 8.0 threshold. We approved £12,000
                  investment for 6% equity. 2 other companies didn't pass IC vote—good companies, but not exceptional.
                </p>
                <div className="text-emerald-400 text-sm font-semibold">→ MediConnect approved for term sheet</div>
              </div>

              <div className="bg-gray-900/50 rounded-lg p-5 border-l-4 border-blue-500">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <div className="text-blue-400 font-bold text-lg">Stage 5: Term Sheet Negotiation (Week 11-12)</div>
                    <div className="text-gray-400 text-sm">4 startups negotiating</div>
                  </div>
                  <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-xs font-bold">4 → 3</span>
                </div>
                <p className="text-gray-300 text-sm mb-2">
                  <strong>What happened:</strong> We sent MediConnect a term sheet: £12K for 6% equity, 1 board observer seat, standard pro-rata rights.
                  They negotiated to 5.5% equity (we agreed—fair ask). Our lawyers drafted the term sheet. All parties signed. One other company dropped
                  out during this stage—they got a better offer from another investor (happens sometimes).
                </p>
                <div className="text-emerald-400 text-sm font-semibold">→ MediConnect term sheet signed</div>
              </div>

              <div className="bg-gray-900/50 rounded-lg p-5 border-l-4 border-emerald-500">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <div className="text-emerald-400 font-bold text-lg">Stage 6: Closing (Week 13-15)</div>
                    <div className="text-gray-400 text-sm">3 startups finalizing</div>
                  </div>
                  <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 rounded-full text-xs font-bold">3 → 3</span>
                </div>
                <p className="text-gray-300 text-sm mb-2">
                  <strong>What happened:</strong> Legal documentation completed—shareholders agreement, share purchase agreement, board resolutions.
                  We wired £12,000 to MediConnect's bank account. They issued us 5.5% shares. We scheduled our first quarterly check-in. Deal officially
                  closed after 15 weeks from initial application.
                </p>
                <div className="text-emerald-400 text-sm font-semibold">→ MediConnect is now a NAVADA portfolio company</div>
              </div>
            </div>

            <div className="mt-6 bg-gradient-to-br from-emerald-500/20 to-blue-500/20 rounded-lg p-6 border border-emerald-500/30">
              <div className="text-white font-bold text-lg mb-3">The Final Numbers</div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-gray-400 text-xs mb-1">Started with</div>
                  <div className="text-white text-2xl font-bold">100</div>
                  <div className="text-gray-400 text-xs">applications</div>
                </div>
                <div className="text-center">
                  <div className="text-gray-400 text-xs mb-1">Ended with</div>
                  <div className="text-emerald-400 text-2xl font-bold">8</div>
                  <div className="text-gray-400 text-xs">investments</div>
                </div>
                <div className="text-center">
                  <div className="text-gray-400 text-xs mb-1">Conversion</div>
                  <div className="text-blue-400 text-2xl font-bold">8%</div>
                  <div className="text-gray-400 text-xs">success rate</div>
                </div>
                <div className="text-center">
                  <div className="text-gray-400 text-xs mb-1">Time</div>
                  <div className="text-purple-400 text-2xl font-bold">15 weeks</div>
                  <div className="text-gray-400 text-xs">per deal</div>
                </div>
              </div>
              <p className="text-gray-300 text-sm mt-4">
                This rigorous process ensures only the top 8% of applicants become portfolio companies—protecting our £200K fund by saying "no" 92 times
                to say "yes" 8 times.
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-500/10 to-amber-500/10 backdrop-blur-sm rounded-xl p-8 border border-purple-500/20">
            <h3 className="text-2xl font-bold text-purple-400 mb-4">Why This Matters: Quality Over Quantity</h3>
            <p className="text-lg text-gray-300 leading-relaxed mb-4">
              Our 8% conversion rate might seem low, but it's by design. Here's why a strict funnel protects investor capital:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-900/50 rounded-lg p-4 border border-emerald-500/20">
                <div className="text-emerald-400 font-semibold mb-2">Risk Reduction</div>
                <p className="text-gray-300 text-sm">By rejecting 92% of applicants, we avoid bad investments. In VC, avoiding losers is as important as picking winners.</p>
              </div>
              <div className="bg-gray-900/50 rounded-lg p-4 border border-blue-500/20">
                <div className="text-blue-400 font-semibold mb-2">Data-Driven Decisions</div>
                <p className="text-gray-300 text-sm">Every stage has clear pass/fail criteria—market size, revenue traction, team quality. No gut feelings, just data.</p>
              </div>
              <div className="bg-gray-900/50 rounded-lg p-4 border border-purple-500/20">
                <div className="text-purple-400 font-semibold mb-2">Due Diligence Protects You</div>
                <p className="text-gray-300 text-sm">The 4-week due diligence stage has saved us from fraud, inflated metrics, and toxic founders multiple times.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="h-[600px] bg-gray-900/50 rounded-xl border border-gray-700/50 p-4 mb-12">
          <InvestmentProcess3D />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              stage: 'Sourcing',
              duration: '1-2 weeks',
              activities: ['Network referrals', 'Accelerator programs', 'Direct outreach', 'Conference attendance'],
              metrics: '100+ deals/year',
              color: 'blue'
            },
            {
              stage: 'Screening',
              duration: '2-3 weeks',
              activities: ['Initial deck review', 'Founder calls', 'Market sizing', 'Competitive analysis'],
              metrics: '40% pass rate',
              color: 'emerald'
            },
            {
              stage: 'Due Diligence',
              duration: '3-4 weeks',
              activities: ['Deep technical review', 'Customer interviews', 'Financial analysis', 'Reference checks'],
              metrics: '25% advance',
              color: 'purple'
            },
            {
              stage: 'Investment Committee',
              duration: '1 week',
              activities: ['IC presentation', 'Partner deliberation', 'Risk assessment', 'Terms discussion'],
              metrics: '60% approval',
              color: 'amber'
            },
            {
              stage: 'Term Sheet',
              duration: '1-2 weeks',
              activities: ['Term negotiation', 'Legal structuring', 'Valuation finalization', 'Cap table review'],
              metrics: '67% close rate',
              color: 'blue'
            },
            {
              stage: 'Closing',
              duration: '2-3 weeks',
              activities: ['Legal documentation', 'Wire transfer', 'Board seat setup', 'Onboarding'],
              metrics: '8% total conversion',
              color: 'emerald'
            }
          ].map((item, idx) => {
            const glowColors = {
              emerald: 'shadow-emerald-500/10 hover:shadow-emerald-500/20 border-emerald-500/20',
              blue: 'shadow-blue-500/10 hover:shadow-blue-500/20 border-blue-500/20',
              purple: 'shadow-purple-500/10 hover:shadow-purple-500/20 border-purple-500/20',
              amber: 'shadow-amber-500/10 hover:shadow-amber-500/20 border-amber-500/20'
            };
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.6 }}
                className={`bg-gray-900/50 rounded-xl p-6 border shadow-lg transition-all duration-300 ${glowColors[item.color]}`}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-white">{item.stage}</h3>
                  <span className="text-sm text-emerald-400 font-semibold">{item.duration}</span>
                </div>
                <ul className="space-y-2 mb-4">
                  {item.activities.map((activity, i) => (
                    <li key={i} className="text-sm text-gray-400 flex items-start">
                      <span className="text-emerald-400 mr-2">→</span>
                      {activity}
                    </li>
                  ))}
                </ul>
                <div className="pt-4 border-t border-gray-700">
                  <div className="text-xs text-gray-500 mb-1">Success Metric</div>
                  <div className="text-lg font-bold text-white">{item.metrics}</div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Value Creation Framework */}
      <div className="bg-gray-800/30 backdrop-blur-sm rounded-3xl p-12 border border-gray-700/30 shadow-2xl shadow-blue-500/10 hover:shadow-blue-500/20 transition-all duration-300">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 bg-blue-500/10 rounded-lg">
            <Zap className="h-6 w-6 text-blue-400" />
          </div>
          <h2 className="text-3xl font-bold text-white">Value Creation Framework</h2>
        </div>

        {/* Understanding Value Creation - Educational Section */}
        <div className="mb-12 space-y-6">
          <div className="bg-gradient-to-br from-blue-500/10 to-emerald-500/10 backdrop-blur-sm rounded-xl p-8 border border-blue-500/20">
            <h3 className="text-2xl font-bold text-emerald-400 mb-4">In Simple Terms: Beyond Just Money</h3>
            <p className="text-lg text-gray-300 leading-relaxed">
              Value creation is about being more than just a bank account. When we invest in a startup, we don't just hand over money and walk away.
              Think of it like this: Imagine you buy a restaurant. You could just collect profits, OR you could teach the chef new recipes,
              introduce them to better suppliers, help them hire talented staff, and connect them with food critics. That's value creation—making
              the business significantly more valuable through hands-on support and expertise, not just capital.
            </p>
          </div>

          <div className="bg-gradient-to-br from-purple-500/10 to-blue-500/10 backdrop-blur-sm rounded-xl p-8 border border-purple-500/20">
            <h3 className="text-2xl font-bold text-blue-400 mb-4">Real-Life Example: Transforming a Kenyan AgriTech Startup</h3>
            <p className="text-lg text-gray-300 leading-relaxed mb-6">
              In 2022, imagine we invested £12,000 in "FarmConnect Kenya," a startup connecting smallholder farmers with buyers via SMS.
              They had 5,000 farmers and were processing 200 orders per month, but struggled with technology and scaling.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-900/50 rounded-lg p-6 border border-emerald-500/20">
                <div className="text-emerald-400 font-bold mb-3 text-lg">Our Hands-On Value Creation:</div>
                <div className="space-y-4">
                  <div>
                    <div className="text-emerald-400 text-sm font-semibold mb-1">Technical Mentorship (12 sessions/year)</div>
                    <p className="text-gray-300 text-sm">• Helped migrate from SMS to WhatsApp Business API (5x cheaper)</p>
                    <p className="text-gray-300 text-sm">• Built AI pricing engine to optimize farmer payouts</p>
                    <p className="text-gray-300 text-sm">• Set up cloud database to track 50,000+ transactions</p>
                  </div>
                  <div>
                    <div className="text-blue-400 text-sm font-semibold mb-1">Strategic Support (Quarterly)</div>
                    <p className="text-gray-300 text-sm">• Introduced them to M-Pesa for instant farmer payments</p>
                    <p className="text-gray-300 text-sm">• Connected with 3 large hotel chains in Nairobi</p>
                    <p className="text-gray-300 text-sm">• Helped design expansion into Uganda and Tanzania</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-900/50 rounded-lg p-6 border border-blue-500/20">
                <div className="text-blue-400 font-bold mb-3 text-lg">Measurable Results After 2 Years:</div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center pb-2 border-b border-gray-700">
                    <span className="text-gray-400 text-sm">Active Farmers</span>
                    <span className="text-white font-bold">5,000 → 42,000 (8.4x growth)</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b border-gray-700">
                    <span className="text-gray-400 text-sm">Monthly Orders</span>
                    <span className="text-white font-bold">200 → 3,500 (17.5x growth)</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b border-gray-700">
                    <span className="text-gray-400 text-sm">Operating Costs</span>
                    <span className="text-emerald-400 font-bold">-60% (cloud migration)</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b border-gray-700">
                    <span className="text-gray-400 text-sm">Company Valuation</span>
                    <span className="text-white font-bold">£170K → £1.8M (10.6x)</span>
                  </div>
                  <div className="bg-emerald-500/20 rounded-lg p-3 mt-4">
                    <div className="text-emerald-400 font-bold text-sm mb-1">Our Return Impact:</div>
                    <p className="text-white text-sm">£12K investment now worth £127K (10.6x multiple) because of hands-on support</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-amber-500/10 to-purple-500/10 backdrop-blur-sm rounded-xl p-8 border border-amber-500/20">
            <h3 className="text-2xl font-bold text-purple-400 mb-4">Why This Matters: The NAVADA Difference</h3>
            <p className="text-lg text-gray-300 leading-relaxed mb-4">
              Most African startups fail not because of bad ideas, but because founders lack access to technical expertise, networks, and
              operational knowledge that Silicon Valley startups take for granted. Our value creation framework is designed to level the playing field:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-900/50 rounded-lg p-4 border border-emerald-500/20">
                <div className="text-emerald-400 font-semibold mb-2">Technical Edge</div>
                <p className="text-gray-300 text-sm">We bring Silicon Valley-level expertise in AI, cloud, and robotics to African founders who otherwise can't afford top engineers</p>
              </div>
              <div className="bg-gray-900/50 rounded-lg p-4 border border-blue-500/20">
                <div className="text-blue-400 font-semibold mb-2">Network Access</div>
                <p className="text-gray-300 text-sm">Our 50+ portfolio companies, investor connections, and corporate partnerships open doors that typically take years to build</p>
              </div>
              <div className="bg-gray-900/50 rounded-lg p-4 border border-purple-500/20">
                <div className="text-purple-400 font-semibold mb-2">Education First</div>
                <p className="text-gray-300 text-sm">Every £1 invested includes free training, mentorship, and resources—building Africa's tech ecosystem for the long term</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 rounded-xl p-6 border border-emerald-500/20 shadow-lg shadow-emerald-500/10 hover:shadow-emerald-500/20 transition-all duration-300">
              <h3 className="text-xl font-bold text-white mb-4">Technical & Robotics Mentorship</h3>
              <ul className="space-y-3">
                {[
                  'Robotics engineering guidance & system design',
                  'Hardware-software integration best practices',
                  'Cloud architecture & AI/ML deployment',
                  'Technical scaling & infrastructure optimization',
                  'Automation workflow development'
                ].map((item, i) => (
                  <li key={i} className="text-gray-300 flex items-start">
                    <span className="text-emerald-400 mr-3 mt-1">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-gradient-to-br from-blue-500/10 to-blue-500/5 rounded-xl p-6 border border-blue-500/20 shadow-lg shadow-blue-500/10 hover:shadow-blue-500/20 transition-all duration-300">
              <h3 className="text-xl font-bold text-white mb-4">Strategic Support</h3>
              <ul className="space-y-3">
                {[
                  'Go-to-market strategy & execution',
                  'Product roadmap development',
                  'Fundraising & investor relations',
                  'Regional expansion planning',
                  'Partnership & BD introductions'
                ].map((item, i) => (
                  <li key={i} className="text-gray-300 flex items-start">
                    <span className="text-blue-400 mr-3 mt-1">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-gradient-to-br from-purple-500/10 to-purple-500/5 rounded-xl p-6 border border-purple-500/20 shadow-lg shadow-purple-500/10 hover:shadow-purple-500/20 transition-all duration-300">
              <h3 className="text-xl font-bold text-white mb-4">Operational Excellence</h3>
              <ul className="space-y-3">
                {[
                  'Talent acquisition & team building',
                  'Financial planning & unit economics',
                  'KPI tracking & reporting systems',
                  'Legal & regulatory compliance',
                  'Governance & board management'
                ].map((item, i) => (
                  <li key={i} className="text-gray-300 flex items-start">
                    <span className="text-purple-400 mr-3 mt-1">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-gradient-to-br from-amber-500/10 to-amber-500/5 rounded-xl p-6 border border-amber-500/20 shadow-lg shadow-amber-500/10 hover:shadow-amber-500/20 transition-all duration-300">
              <h3 className="text-xl font-bold text-white mb-4">Network & Resources</h3>
              <ul className="space-y-3">
                {[
                  'Access to 50+ portfolio companies',
                  'Introductions to follow-on investors',
                  'Customer & partner connections',
                  'Technical talent network',
                  'Legal & service provider network'
                ].map((item, i) => (
                  <li key={i} className="text-gray-300 flex items-start">
                    <span className="text-amber-400 mr-3 mt-1">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { metric: 'Quarterly Check-ins', value: '12+/year' },
            { metric: 'Strategic Workshops', value: '4/year' },
            { metric: 'Network Introductions', value: '20+/year' },
            { metric: 'Technical Reviews', value: 'Monthly' }
          ].map((item, idx) => (
            <div key={idx} className="bg-gray-900/50 rounded-xl p-6 text-center border border-gray-700/50 shadow-lg shadow-blue-500/10 hover:shadow-blue-500/20 transition-all duration-300">
              <div className="text-2xl font-bold text-blue-400 mb-2">{item.value}</div>
              <div className="text-sm text-gray-400">{item.metric}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Investment Criteria - Enhanced */}
      <div className="bg-gray-800/30 backdrop-blur-sm rounded-3xl p-12 border border-gray-700/30 shadow-2xl shadow-purple-500/10 hover:shadow-purple-500/20 transition-all duration-300">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 bg-purple-500/10 rounded-lg">
            <Shield className="h-6 w-6 text-purple-400" />
          </div>
          <h2 className="text-3xl font-bold text-white">Investment Criteria & Scoring</h2>
        </div>

        {/* Understanding Investment Criteria - Educational Section */}
        <div className="mb-12 space-y-6">
          <div className="bg-gradient-to-br from-purple-500/10 to-blue-500/10 backdrop-blur-sm rounded-xl p-8 border border-purple-500/20">
            <h3 className="text-2xl font-bold text-emerald-400 mb-4">In Simple Terms: How We Choose Winners</h3>
            <p className="text-lg text-gray-300 leading-relaxed">
              Investment criteria is like a scorecard judges use in a talent competition. Just like "America's Got Talent" judges score acts on
              vocals, stage presence, and originality, we score startups across 9 categories—each weighted by importance. A company needs to score
              at least 8.0 out of 10 to get funded. This ensures we only invest in the best opportunities and can explain exactly WHY we said yes or no.
              It's not gut feeling—it's data-driven decision making that protects investor capital.
            </p>
          </div>

          <div className="bg-gradient-to-br from-blue-500/10 to-emerald-500/10 backdrop-blur-sm rounded-xl p-8 border border-blue-500/20">
            <h3 className="text-2xl font-bold text-blue-400 mb-4">Real-Life Example: Scoring a Nigerian FinTech Startup</h3>
            <p className="text-lg text-gray-300 leading-relaxed mb-6">
              In early 2023, imagine "PayEasy Nigeria" applied for our £15,000 investment. They're a mobile payments platform for small businesses.
              Here's how we scored them using our 9-category framework (each category scored 0-10, then weighted):
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="bg-gray-900/50 rounded-lg p-4 border border-emerald-500/20">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-emerald-400 font-semibold">Stage Focus (20% weight)</span>
                    <span className="text-white font-bold">Score: 9.0</span>
                  </div>
                  <p className="text-gray-400 text-sm mb-2">• Series A stage with $850K ARR ✓</p>
                  <p className="text-gray-400 text-sm mb-2">• Already raised seed round ✓</p>
                  <p className="text-emerald-400 text-sm font-semibold">Weighted: 9.0 � -  0.20 = 1.80</p>
                </div>

                <div className="bg-gray-900/50 rounded-lg p-4 border border-blue-500/20">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-blue-400 font-semibold">Market Size (15% weight)</span>
                    <span className="text-white font-bold">Score: 8.5</span>
                  </div>
                  <p className="text-gray-400 text-sm mb-2">• Nigeria digital payments TAM: $12B ✓</p>
                  <p className="text-gray-400 text-sm mb-2">• Growing 35% annually ✓</p>
                  <p className="text-blue-400 text-sm font-semibold">Weighted: 8.5 � -  0.15 = 1.28</p>
                </div>

                <div className="bg-gray-900/50 rounded-lg p-4 border border-purple-500/20">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-purple-400 font-semibold">Team Quality (15% weight)</span>
                    <span className="text-white font-bold">Score: 9.5</span>
                  </div>
                  <p className="text-gray-400 text-sm mb-2">• CEO: Ex-Google engineer Lagos ✓</p>
                  <p className="text-gray-400 text-sm mb-2">• CTO: Built payments at Interswitch ✓</p>
                  <p className="text-purple-400 text-sm font-semibold">Weighted: 9.5 � -  0.15 = 1.43</p>
                </div>

                <div className="bg-gray-900/50 rounded-lg p-4 border border-amber-500/20">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-amber-400 font-semibold">Technology (10% weight)</span>
                    <span className="text-white font-bold">Score: 7.0</span>
                  </div>
                  <p className="text-gray-400 text-sm mb-2">• Cloud-native architecture ✓</p>
                  <p className="text-gray-400 text-sm mb-2">• Limited IP protection � - </p>
                  <p className="text-amber-400 text-sm font-semibold">Weighted: 7.0 � -  0.10 = 0.70</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="bg-gray-900/50 rounded-lg p-4 border border-emerald-500/20">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-emerald-400 font-semibold">Financial Health (15% weight)</span>
                    <span className="text-white font-bold">Score: 8.0</span>
                  </div>
                  <p className="text-gray-400 text-sm mb-2">• 15% monthly revenue growth ✓</p>
                  <p className="text-gray-400 text-sm mb-2">• 14 months runway remaining � - </p>
                  <p className="text-emerald-400 text-sm font-semibold">Weighted: 8.0 � -  0.15 = 1.20</p>
                </div>

                <div className="bg-gray-900/50 rounded-lg p-4 border border-blue-500/20">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-blue-400 font-semibold">AI & Cloud (15% weight)</span>
                    <span className="text-white font-bold">Score: 8.5</span>
                  </div>
                  <p className="text-gray-400 text-sm mb-2">• AI fraud detection deployed ✓</p>
                  <p className="text-gray-400 text-sm mb-2">• Running on AWS with auto-scaling ✓</p>
                  <p className="text-blue-400 text-sm font-semibold">Weighted: 8.5 � -  0.15 = 1.28</p>
                </div>

                <div className="bg-gray-900/50 rounded-lg p-4 border border-purple-500/20">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-purple-400 font-semibold">Impact Potential (10% weight)</span>
                    <span className="text-white font-bold">Score: 9.0</span>
                  </div>
                  <p className="text-gray-400 text-sm mb-2">• Serving 5,000 small businesses ✓</p>
                  <p className="text-gray-400 text-sm mb-2">• SDG 8: Decent work & growth ✓</p>
                  <p className="text-purple-400 text-sm font-semibold">Weighted: 9.0 � -  0.10 = 0.90</p>
                </div>

                <div className="bg-gradient-to-br from-emerald-500/20 to-blue-500/20 rounded-lg p-6 border-2 border-emerald-500/50">
                  <div className="text-emerald-400 font-bold text-lg mb-3">FINAL WEIGHTED SCORE:</div>
                  <div className="text-white text-4xl font-bold mb-2">8.59 / 10</div>
                  <div className="inline-block px-4 py-2 bg-emerald-500/30 rounded-lg">
                    <span className="text-emerald-400 font-bold text-lg">✓ APPROVED FOR INVESTMENT</span>
                  </div>
                  <p className="text-gray-300 text-sm mt-4">Score exceeds 8.0 threshold. Strong team and market, with room for improvement in IP and runway.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-amber-500/10 to-purple-500/10 backdrop-blur-sm rounded-xl p-8 border border-amber-500/20">
            <h3 className="text-2xl font-bold text-purple-400 mb-4">Why Scoring Matters: Discipline Over Emotion</h3>
            <p className="text-lg text-gray-300 leading-relaxed mb-4">
              Without a scoring system, investors make emotional decisions. "I like the founder" or "This sounds cool" leads to bad investments.
              Our weighted criteria framework ensures:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-900/50 rounded-lg p-4 border border-emerald-500/20">
                <div className="text-emerald-400 font-semibold mb-2">Consistency</div>
                <p className="text-gray-300 text-sm">Every startup is evaluated using the same 9 criteria. No favorites, no bias—just data.</p>
              </div>
              <div className="bg-gray-900/50 rounded-lg p-4 border border-blue-500/20">
                <div className="text-blue-400 font-semibold mb-2">Transparency</div>
                <p className="text-gray-300 text-sm">Founders know exactly why they were accepted or rejected. We can show investors our decision logic.</p>
              </div>
              <div className="bg-gray-900/50 rounded-lg p-4 border border-purple-500/20">
                <div className="text-purple-400 font-semibold mb-2">Risk Management</div>
                <p className="text-gray-300 text-sm">The 8.0 threshold ensures we only back startups with proven traction, strong teams, and real market opportunity.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {[
            {
              title: 'Stage Focus',
              criteria: ['Series A & B rounds', 'Revenue: $100K - $2M ARR', 'Clear path to Series C', 'Proven product-market fit'],
              weight: '20%',
              color: 'emerald'
            },
            {
              title: 'Robotics & Automation',
              criteria: ['Industrial & AgriTech robotics', 'Automation solutions', 'Strong technical founders', 'Hardware-software integration'],
              weight: '15%',
              color: 'blue'
            },
            {
              title: 'AI & Cloud Solutions',
              criteria: ['Cloud infrastructure platforms', 'AI/ML applications', 'MLOps & DevOps tools', 'Scalable SaaS models'],
              weight: '15%',
              color: 'purple'
            },
            {
              title: 'Market Size',
              criteria: ['TAM > $1B globally', 'SAM > $100M in Africa', 'Growing at 20%+ annually', 'Scalable business model'],
              weight: '15%',
              color: 'amber'
            },
            {
              title: 'Team Quality',
              criteria: ['Experienced founders', 'Technical expertise', 'Local market knowledge', 'International ambitions'],
              weight: '15%',
              color: 'emerald'
            },
            {
              title: 'Technology',
              criteria: ['Proprietary advantage', 'Scalable architecture', 'Data-driven insights', 'IP protection strategy'],
              weight: '10%',
              color: 'blue'
            },
            {
              title: 'Financial Health',
              criteria: ['Monthly growth > 10%', 'Unit economics positive', 'Clear monetization', '18+ months runway'],
              weight: '15%',
              color: 'purple'
            },
            {
              title: 'Impact Potential',
              criteria: ['Addresses real problems', 'Scalable impact model', 'Job creation potential', 'SDG alignment'],
              weight: '10%',
              color: 'amber'
            },
            {
              title: 'Founder Support',
              criteria: ['Technical mentorship', 'Robotics engineering guidance', 'Cloud architecture advice', 'Go-to-market strategy'],
              weight: '15%',
              color: 'emerald'
            }
          ].map((category, idx) => {
            const glowColors = {
              emerald: 'shadow-emerald-500/10 hover:shadow-emerald-500/20 border-emerald-500/20',
              blue: 'shadow-blue-500/10 hover:shadow-blue-500/20 border-blue-500/20',
              purple: 'shadow-purple-500/10 hover:shadow-purple-500/20 border-purple-500/20',
              amber: 'shadow-amber-500/10 hover:shadow-amber-500/20 border-amber-500/20'
            };
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.6 }}
                className={`bg-gray-900/50 rounded-xl p-6 border shadow-lg transition-all duration-300 ${glowColors[category.color]}`}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-white">{category.title}</h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold bg-${category.color}-500/20 text-${category.color}-400`}>
                    {category.weight}
                  </span>
                </div>
                <ul className="space-y-2">
                  {category.criteria.map((criterion, criterionIdx) => (
                    <li key={criterionIdx} className="text-gray-400 flex items-start text-sm">
                      <span className="text-emerald-400 mr-2">•</span>
                      {criterion}
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>

        <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/50 rounded-xl p-8 border border-gray-700/50">
          <h3 className="text-2xl font-bold text-white mb-6">Scoring Framework</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-emerald-500/10 rounded-xl border border-emerald-500/20">
              <div className="text-4xl font-bold text-emerald-400 mb-2">8.0+</div>
              <div className="text-white font-semibold mb-2">Strong Invest</div>
              <div className="text-sm text-gray-400">Proceed to IC immediately</div>
            </div>
            <div className="text-center p-6 bg-amber-500/10 rounded-xl border border-amber-500/20">
              <div className="text-4xl font-bold text-amber-400 mb-2">6.0-7.9</div>
              <div className="text-white font-semibold mb-2">Further DD</div>
              <div className="text-sm text-gray-400">Additional diligence required</div>
            </div>
            <div className="text-center p-6 bg-red-500/10 rounded-xl border border-red-500/20">
              <div className="text-4xl font-bold text-red-400 mb-2">&lt;6.0</div>
              <div className="text-white font-semibold mb-2">Pass</div>
              <div className="text-sm text-gray-400">Does not meet criteria</div>
            </div>
          </div>
        </div>
      </div>

      {/* Portfolio Construction Methodology */}
      <div className="bg-gray-800/30 backdrop-blur-sm rounded-3xl p-12 border border-gray-700/30 shadow-2xl shadow-amber-500/10 hover:shadow-amber-500/20 transition-all duration-300">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 bg-amber-500/10 rounded-lg">
            <Target className="h-6 w-6 text-amber-400" />
          </div>
          <h2 className="text-3xl font-bold text-white">Portfolio Construction Methodology</h2>
        </div>

        {/* Understanding Portfolio Construction - Educational Section */}
        <div className="mb-12 space-y-6">
          <div className="bg-gradient-to-br from-amber-500/10 to-purple-500/10 backdrop-blur-sm rounded-xl p-8 border border-amber-500/20">
            <h3 className="text-2xl font-bold text-emerald-400 mb-4">In Simple Terms: Don't Put All Your Eggs in One Basket</h3>
            <p className="text-lg text-gray-300 leading-relaxed">
              Portfolio construction is about smart diversification—spreading risk across different types of investments so that if one fails,
              the others can still succeed. Think of it like a soccer coach building a team: you don't put all your money on strikers and hope
              to win. You need defenders, midfielders, a goalkeeper—each playing a different role but working together. Similarly, we invest across
              6 different tech sectors, 4 countries, and 2 funding stages to ensure that our £200K fund isn't destroyed by one bad bet.
              It's mathematical risk management, not gambling.
            </p>
          </div>

          <div className="bg-gradient-to-br from-blue-500/10 to-emerald-500/10 backdrop-blur-sm rounded-xl p-8 border border-blue-500/20">
            <h3 className="text-2xl font-bold text-blue-400 mb-4">Real-Life Example: Why Diversification Saves Your Investment</h3>
            <p className="text-lg text-gray-300 leading-relaxed mb-6">
              Let's compare two imaginary £200K funds investing in African tech over 5 years. Both funds invest in 15 startups.
              The difference? Fund A diversifies properly. Fund B doesn't.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-gray-900/50 rounded-lg p-6 border-2 border-red-500/30">
                <div className="text-red-400 font-bold text-lg mb-4">❌ Fund B: Poor Diversification</div>
                <div className="space-y-4">
                  <div className="bg-gray-800/50 rounded-lg p-4">
                    <div className="text-red-400 font-semibold mb-2">Portfolio Breakdown:</div>
                    <p className="text-gray-300 text-sm">• 60% in FinTech (12 companies)</p>
                    <p className="text-gray-300 text-sm">• 100% in Nigeria (all companies)</p>
                    <p className="text-gray-300 text-sm">• 100% in Series A (all early stage)</p>
                    <p className="text-gray-300 text-sm">• Average ticket: £13,300 per company</p>
                  </div>

                  <div className="bg-red-500/10 rounded-lg p-4 border border-red-500/30">
                    <div className="text-red-400 font-semibold mb-2">What Happened:</div>
                    <p className="text-gray-300 text-sm mb-3">
                      In 2024, Nigeria's central bank introduced strict FinTech regulations. 10 of the 12 FinTech companies failed because
                      they couldn't comply. The entire fund lost 73% of its value.
                    </p>
                    <div className="flex justify-between items-center pt-3 border-t border-gray-700">
                      <span className="text-gray-400 font-semibold">5-Year Return:</span>
                      <span className="text-red-400 font-bold text-xl">-45% LOSS</span>
                    </div>
                    <p className="text-red-400 text-xs mt-2">£200K → £110K (lost £90K)</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-900/50 rounded-lg p-6 border-2 border-emerald-500/30">
                <div className="text-emerald-400 font-bold text-lg mb-4">✓ Fund A: Smart Diversification</div>
                <div className="space-y-4">
                  <div className="bg-gray-800/50 rounded-lg p-4">
                    <div className="text-emerald-400 font-semibold mb-2">Portfolio Breakdown:</div>
                    <p className="text-gray-300 text-sm">• 6 sectors: FinTech (20%), AgriTech (18%), HealthTech (17%), EdTech (15%), Robotics (15%), Cloud (15%)</p>
                    <p className="text-gray-300 text-sm">• 4 countries: Nigeria (40%), Kenya (30%), Ghana (15%), South Africa (15%)</p>
                    <p className="text-gray-300 text-sm">• 70% Series A, 30% Series B (risk balance)</p>
                    <p className="text-gray-300 text-sm">• Ticket range: £8K-£18K with 30% reserves</p>
                  </div>

                  <div className="bg-emerald-500/10 rounded-lg p-4 border border-emerald-500/30">
                    <div className="text-emerald-400 font-semibold mb-2">What Happened:</div>
                    <p className="text-gray-300 text-sm mb-3">
                      Same Nigeria FinTech regulations hit. 2 of the 3 FinTech companies failed (£18K lost). BUT: 3 AgriTech companies in Kenya
                      grew 15x, 2 EdTech companies exited profitably, 1 Robotics company became a unicorn. The winners compensated for losers.
                    </p>
                    <div className="flex justify-between items-center pt-3 border-t border-gray-700">
                      <span className="text-gray-400 font-semibold">5-Year Return:</span>
                      <span className="text-emerald-400 font-bold text-xl">+280% GAIN</span>
                    </div>
                    <p className="text-emerald-400 text-xs mt-2">£200K → £760K (made £560K)</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 bg-gradient-to-br from-emerald-500/20 to-blue-500/20 rounded-lg p-6 border border-emerald-500/30">
              <div className="text-white font-bold text-lg mb-3">The £650K Difference</div>
              <p className="text-gray-300 text-sm">
                Both funds started with £200K. Fund A ended with £760K. Fund B ended with £110K. The difference? £650,000. That's the power
                of portfolio construction—not picking the best companies, but building a balanced portfolio that can survive shocks and capture
                outsized wins when they happen.
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-500/10 to-amber-500/10 backdrop-blur-sm rounded-xl p-8 border border-purple-500/20">
            <h3 className="text-2xl font-bold text-purple-400 mb-4">Why This Matters: Protection + Opportunity</h3>
            <p className="text-lg text-gray-300 leading-relaxed mb-4">
              Portfolio construction isn't about playing it safe—it's about playing it smart. Diversification gives us two critical advantages:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-900/50 rounded-lg p-5 border border-emerald-500/20">
                <div className="text-emerald-400 font-semibold mb-3 text-lg">1. Downside Protection</div>
                <p className="text-gray-300 text-sm mb-3">
                  No single sector, country, or company can kill the entire fund. When one sector faces headwinds (e.g., FinTech regulations),
                  other sectors (AgriTech, HealthTech) continue growing.
                </p>
                <div className="text-emerald-400 text-sm font-semibold">Max loss per position: 8%</div>
                <p className="text-gray-300 text-xs mt-1">Even if our biggest investment goes to zero, we only lose 8% of the fund—not catastrophic.</p>
              </div>

              <div className="bg-gray-900/50 rounded-lg p-5 border border-blue-500/20">
                <div className="text-blue-400 font-semibold mb-3 text-lg">2. Upside Capture</div>
                <p className="text-gray-300 text-sm mb-3">
                  By spreading across 6 sectors and 4 countries, we increase the probability of catching at least one breakout winner.
                  In VC, 1 huge winner can return the entire fund 5-10x.
                </p>
                <div className="text-blue-400 text-sm font-semibold">Power law of returns</div>
                <p className="text-gray-300 text-xs mt-1">20% of companies drive 80% of returns. Diversification ensures we're in the right 20%.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-white mb-6">Diversification Strategy</h3>
            {[
              {
                aspect: 'Sector Diversification',
                description: 'No single sector exceeds 25% of total portfolio allocation to minimize concentration risk',
                target: '6 sectors',
                color: 'emerald'
              },
              {
                aspect: 'Geographic Spread',
                description: 'Investments across 4 key African markets with focus on Nigeria (40%), Kenya (30%), Ghana (15%), South Africa (15%)',
                target: '4 countries',
                color: 'blue'
              },
              {
                aspect: 'Stage Distribution',
                description: '70% Series A, 30% Series B to balance risk-return profile and deployment timeline',
                target: '2 stages',
                color: 'purple'
              },
              {
                aspect: 'Ticket Size Range',
                description: 'Initial investments between £8K-£18K with 30% reserve for follow-on rounds',
                target: '£8-18K',
                color: 'amber'
              }
            ].map((item, idx) => {
              const glowColors = {
                emerald: 'border-emerald-500/20 shadow-emerald-500/10 hover:shadow-emerald-500/20',
                blue: 'border-blue-500/20 shadow-blue-500/10 hover:shadow-blue-500/20',
                purple: 'border-purple-500/20 shadow-purple-500/10 hover:shadow-purple-500/20',
                amber: 'border-amber-500/20 shadow-amber-500/10 hover:shadow-amber-500/20'
              };
              return (
                <div key={idx} className={`bg-gray-900/50 rounded-xl p-6 border shadow-lg transition-all duration-300 ${glowColors[item.color]}`}>
                  <div className="flex items-start justify-between mb-3">
                    <h4 className="text-lg font-bold text-white">{item.aspect}</h4>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold bg-${item.color}-500/20 text-${item.color}-400`}>
                      {item.target}
                    </span>
                  </div>
                  <p className="text-gray-400 text-sm">{item.description}</p>
                </div>
              );
            })}
          </div>

          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-white mb-6">Risk Management</h3>
            {[
              {
                strategy: 'Position Sizing',
                details: 'Maximum 8% of fund in any single investment to limit downside exposure',
                metric: '≤8% per deal',
                color: 'emerald'
              },
              {
                strategy: 'Follow-on Reserves',
                details: 'Reserve 30% of committed capital for pro-rata rights and doubling down on winners',
                metric: '30% reserved',
                color: 'blue'
              },
              {
                strategy: 'Milestone-based Deployment',
                details: 'Staged capital deployment tied to achievement of technical, commercial, and financial milestones',
                metric: '3-4 milestones',
                color: 'purple'
              },
              {
                strategy: 'Portfolio Monitoring',
                details: 'Monthly portfolio reviews, quarterly deep dives, annual strategy sessions with each company',
                metric: 'Monthly reviews',
                color: 'amber'
              }
            ].map((item, idx) => {
              const glowColors = {
                emerald: 'border-emerald-500/20 shadow-emerald-500/10 hover:shadow-emerald-500/20',
                blue: 'border-blue-500/20 shadow-blue-500/10 hover:shadow-blue-500/20',
                purple: 'border-purple-500/20 shadow-purple-500/10 hover:shadow-purple-500/20',
                amber: 'border-amber-500/20 shadow-amber-500/10 hover:shadow-amber-500/20'
              };
              return (
                <div key={idx} className={`bg-gray-900/50 rounded-xl p-6 border shadow-lg transition-all duration-300 ${glowColors[item.color]}`}>
                  <div className="flex items-start justify-between mb-3">
                    <h4 className="text-lg font-bold text-white">{item.strategy}</h4>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold bg-${item.color}-500/20 text-${item.color}-400`}>
                      {item.metric}
                    </span>
                  </div>
                  <p className="text-gray-400 text-sm">{item.details}</p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 rounded-xl p-6 border border-emerald-500/20 text-center shadow-lg shadow-emerald-500/10 hover:shadow-emerald-500/20 transition-all duration-300">
            <div className="text-emerald-400 text-sm font-semibold mb-2">POWER LAW RETURNS</div>
            <div className="text-white text-3xl font-bold mb-2">10-20-70</div>
            <p className="text-gray-400 text-sm">10% unicorns, 20% moderate exits, 70% losses/zombies - targeting top decile performance</p>
          </div>

          <div className="bg-gradient-to-br from-blue-500/10 to-blue-500/5 rounded-xl p-6 border border-blue-500/20 text-center shadow-lg shadow-blue-500/10 hover:shadow-blue-500/20 transition-all duration-300">
            <div className="text-blue-400 text-sm font-semibold mb-2">DEPLOYMENT PACE</div>
            <div className="text-white text-3xl font-bold mb-2">5 deals/year</div>
            <p className="text-gray-400 text-sm">Disciplined deployment over 5-year investment period with focus on quality over quantity</p>
          </div>

          <div className="bg-gradient-to-br from-purple-500/10 to-purple-500/5 rounded-xl p-6 border border-purple-500/20 text-center shadow-lg shadow-purple-500/10 hover:shadow-purple-500/20 transition-all duration-300">
            <div className="text-purple-400 text-sm font-semibold mb-2">EXIT STRATEGY</div>
            <div className="text-white text-3xl font-bold mb-2">5-7 years</div>
            <p className="text-gray-400 text-sm">Target exit via strategic M&A, secondary sales, or IPO within fund lifecycle</p>
          </div>
        </div>
      </div>
    </motion.div>
  );

  const renderFinancials = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="space-y-16"
    >
      <div className="text-center">
        <h1 className="text-5xl font-bold text-white mb-6">Financial Projections</h1>
        <p className="text-xl text-gray-400 max-w-3xl mx-auto">
          Comprehensive financial modeling with conservative assumptions and robust risk analysis
        </p>
      </div>

      {/* IRR Projections - Enhanced 3D */}
      <div className="bg-gray-800/30 backdrop-blur-sm rounded-3xl p-12 border border-gray-700/30 shadow-2xl shadow-emerald-500/10 hover:shadow-emerald-500/20 transition-all duration-300">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 bg-emerald-500/10 rounded-lg">
            <Zap className="h-6 w-6 text-emerald-400" />
          </div>
          <h2 className="text-3xl font-bold text-white">IRR & Returns Projection</h2>
          <span className="ml-auto px-3 py-1 bg-blue-500/10 text-blue-400 rounded-full text-sm font-semibold">3D Interactive</span>
        </div>

        {/* Understanding IRR & Returns - Educational Section */}
        <div className="mb-8 space-y-6">
          <div className="bg-gradient-to-br from-emerald-500/10 to-blue-500/10 backdrop-blur-sm rounded-xl p-8 border border-emerald-500/20">
            <h3 className="text-2xl font-bold text-emerald-400 mb-4">In Simple Terms: How Your Money Grows Over Time</h3>
            <p className="text-lg text-gray-300 leading-relaxed mb-4">
              IRR (Internal Rate of Return) is the annual percentage your investment grows, like interest in a savings account—but for venture capital.
              If you invest £10,000 today and get back £45,000 in 5 years, what's your IRR? It's 35% per year on average. Think of it like compound interest:
              your money doesn't just grow once, it grows every year on top of previous growth.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-900/50 rounded-lg p-5 border border-emerald-500/20">
                <div className="text-emerald-400 font-bold mb-3">What is IRR?</div>
                <p className="text-gray-300 text-sm mb-3">
                  IRR measures how fast your investment compounds annually. A 35% IRR means your £10K investment grows to:
                </p>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between pb-2 border-b border-gray-700">
                    <span className="text-gray-400">Year 1:</span>
                    <span className="text-white font-semibold">£10,000 → £13,500</span>
                  </div>
                  <div className="flex justify-between pb-2 border-b border-gray-700">
                    <span className="text-gray-400">Year 2:</span>
                    <span className="text-white font-semibold">£13,500 → £18,225</span>
                  </div>
                  <div className="flex justify-between pb-2 border-b border-gray-700">
                    <span className="text-gray-400">Year 3:</span>
                    <span className="text-white font-semibold">£18,225 → £24,604</span>
                  </div>
                  <div className="flex justify-between pb-2 border-b border-gray-700">
                    <span className="text-gray-400">Year 4:</span>
                    <span className="text-white font-semibold">£24,604 → £33,215</span>
                  </div>
                  <div className="flex justify-between pb-2">
                    <span className="text-gray-400">Year 5:</span>
                    <span className="text-emerald-400 font-bold">£33,215 → £44,840</span>
                  </div>
                </div>
                <p className="text-emerald-400 text-xs mt-3 italic">Your £10K becomes £44.8K in 5 years at 35% IRR</p>
              </div>

              <div className="bg-gray-900/50 rounded-lg p-5 border border-blue-500/20">
                <div className="text-blue-400 font-bold mb-3">What is DPI (4.5x)?</div>
                <p className="text-gray-300 text-sm mb-3">
                  DPI (Distributions to Paid-In) is simpler: for every £1 you invest, how many £ do you get back? A 4.5x DPI means:
                </p>
                <div className="bg-blue-500/10 rounded-lg p-4 border border-blue-500/30 mb-3">
                  <div className="text-center">
                    <div className="text-gray-400 text-xs mb-1">You invest</div>
                    <div className="text-white text-3xl font-bold mb-1">£10,000</div>
                    <div className="text-blue-400 text-lg mb-2">↓ � -  4.5</div>
                    <div className="text-gray-400 text-xs mb-1">You receive back</div>
                    <div className="text-emerald-400 text-3xl font-bold">£45,000</div>
                  </div>
                </div>
                <p className="text-gray-300 text-sm">
                  <strong>Profit:</strong> £45,000 - £10,000 = <span className="text-emerald-400 font-bold">£35,000 gain</span> (350% return)
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-sm rounded-xl p-8 border border-blue-500/20">
            <h3 className="text-2xl font-bold text-blue-400 mb-4">Real-Life Example: How £10K Becomes £45K</h3>
            <p className="text-lg text-gray-300 leading-relaxed mb-6">
              Meet James, who invested £10,000 in NAVADA Nexus in January 2025. Here's how his investment grows over 5 years at 35% IRR and 4.5x DPI:
            </p>

            <div className="space-y-4">
              <div className="bg-gray-900/50 rounded-lg p-5 border-l-4 border-emerald-500">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <div className="text-emerald-400 font-bold text-lg">Year 1 (2025): Deployment Phase</div>
                    <div className="text-gray-400 text-sm">Building the portfolio</div>
                  </div>
                  <span className="px-3 py-1 bg-gray-700 text-white rounded-full text-xs font-bold">Value: £10,000</span>
                </div>
                <p className="text-gray-300 text-sm">
                  James's £10,000 is invested across 8 African startups (FinTech, AgriTech, HealthTech, etc.). No exits yet—just deployment.
                  His portfolio is worth exactly what he put in: £10,000. Most VC funds lose value on paper in Year 1 due to management fees,
                  but our companies are already growing.
                </p>
              </div>

              <div className="bg-gray-900/50 rounded-lg p-5 border-l-4 border-blue-500">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <div className="text-blue-400 font-bold text-lg">Year 2 (2026): Early Growth</div>
                    <div className="text-gray-400 text-sm">Startups scaling</div>
                  </div>
                  <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-xs font-bold">Value: £13,500 (+35%)</span>
                </div>
                <p className="text-gray-300 text-sm">
                  The 8 startups are growing fast. One FinTech company raised a Series B at 3x valuation. Two AgriTech companies doubled revenue.
                  James's portfolio is now worth £13,500 on paper (marked up based on new funding rounds). He hasn't received any cash yet—just paper gains.
                </p>
              </div>

              <div className="bg-gray-900/50 rounded-lg p-5 border-l-4 border-purple-500">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <div className="text-purple-400 font-bold text-lg">Year 3 (2027): First Exits</div>
                    <div className="text-gray-400 text-sm">Cash distributions begin</div>
                  </div>
                  <span className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-xs font-bold">Value: £18,225 (+35%)</span>
                </div>
                <p className="text-gray-300 text-sm mb-2">
                  One EdTech company exits via acquisition for £800K (we owned 7%, sold for £56K—5.6x our £10K investment in that company).
                  James receives his first distribution: <strong className="text-emerald-400">£5,600 cash</strong> wired to his bank account.
                  His remaining portfolio (7 companies) is worth £12,625. Total value: £5,600 cash + £12,625 portfolio = £18,225.
                </p>
              </div>

              <div className="bg-gray-900/50 rounded-lg p-5 border-l-4 border-amber-500">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <div className="text-amber-400 font-bold text-lg">Year 4 (2028): Multiple Exits</div>
                    <div className="text-gray-400 text-sm">Big distributions</div>
                  </div>
                  <span className="px-3 py-1 bg-amber-500/20 text-amber-400 rounded-full text-xs font-bold">Value: £24,604 (+35%)</span>
                </div>
                <p className="text-gray-300 text-sm mb-2">
                  Two more companies exit: one HealthTech acquired (£70K distribution), one FinTech IPO (£42K distribution).
                  James receives <strong className="text-emerald-400">£11,200 more in cash</strong>. Running total: £16,800 cash received + £7,804 remaining portfolio.
                </p>
              </div>

              <div className="bg-gray-900/50 rounded-lg p-5 border-l-4 border-emerald-500">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <div className="text-emerald-400 font-bold text-lg">Year 5 (2029): Final Exits + Unicorn</div>
                    <div className="text-gray-400 text-sm">Portfolio liquidation</div>
                  </div>
                  <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 rounded-full text-xs font-bold">Final Value: £44,840 (4.5x)</span>
                </div>
                <p className="text-gray-300 text-sm mb-3">
                  The remaining 4 companies exit, including one Robotics company that became a unicorn (£1B+ valuation). We sell our 5% stake for £50M,
                  netting James a massive <strong className="text-emerald-400">£250K</strong> from that single investment. Total distributions over 5 years:
                </p>
                <div className="bg-emerald-500/10 rounded-lg p-4 border border-emerald-500/30">
                  <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                    <div className="flex justify-between pb-2 border-b border-gray-700">
                      <span className="text-gray-400">Year 3 distribution:</span>
                      <span className="text-white">£5,600</span>
                    </div>
                    <div className="flex justify-between pb-2 border-b border-gray-700">
                      <span className="text-gray-400">Year 4 distribution:</span>
                      <span className="text-white">£11,200</span>
                    </div>
                    <div className="flex justify-between pb-2 border-b border-gray-700">
                      <span className="text-gray-400">Year 5 distribution:</span>
                      <span className="text-white">£28,040</span>
                    </div>
                    <div className="flex justify-between pb-2">
                      <span className="text-emerald-400 font-bold">Total received:</span>
                      <span className="text-emerald-400 font-bold">£44,840</span>
                    </div>
                  </div>
                  <div className="text-center pt-3 border-t border-emerald-500/30">
                    <div className="text-emerald-400 font-bold text-xl">£10,000 → £44,840 in 5 years</div>
                    <div className="text-gray-300 text-sm mt-2">35% IRR | 4.5x DPI | £34,840 profit (348% gain)</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-500/10 to-amber-500/10 backdrop-blur-sm rounded-xl p-8 border border-purple-500/20">
            <h3 className="text-2xl font-bold text-purple-400 mb-4">Why This Matters: Comparing Investment Options</h3>
            <p className="text-lg text-gray-300 leading-relaxed mb-4">
              Let's compare what happens to £10,000 invested in different ways over 5 years:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-gray-900/50 rounded-lg p-5 border border-red-500/30 text-center">
                <div className="text-red-400 font-semibold mb-2 text-lg">Savings Account</div>
                <div className="text-gray-400 text-sm mb-2">2% annual interest</div>
                <div className="text-white text-2xl font-bold mb-2">£11,041</div>
                <div className="text-gray-400 text-xs">£1,041 gain (10.4%)</div>
              </div>
              <div className="bg-gray-900/50 rounded-lg p-5 border border-amber-500/30 text-center">
                <div className="text-amber-400 font-semibold mb-2 text-lg">S&P 500 Index</div>
                <div className="text-gray-400 text-sm mb-2">10% annual return</div>
                <div className="text-white text-2xl font-bold mb-2">£16,105</div>
                <div className="text-gray-400 text-xs">£6,105 gain (61%)</div>
              </div>
              <div className="bg-gray-900/50 rounded-lg p-5 border border-blue-500/30 text-center">
                <div className="text-blue-400 font-semibold mb-2 text-lg">Real Estate</div>
                <div className="text-gray-400 text-sm mb-2">15% annual return</div>
                <div className="text-white text-2xl font-bold mb-2">£20,114</div>
                <div className="text-gray-400 text-xs">£10,114 gain (101%)</div>
              </div>
              <div className="bg-gray-900/50 rounded-lg p-5 border-2 border-emerald-500/50 text-center">
                <div className="text-emerald-400 font-semibold mb-2 text-lg">NAVADA Nexus</div>
                <div className="text-gray-400 text-sm mb-2">35% annual IRR</div>
                <div className="text-emerald-400 text-3xl font-bold mb-2">£44,840</div>
                <div className="text-emerald-400 text-sm font-bold">£34,840 gain (348%)</div>
              </div>
            </div>
            <p className="text-gray-300 text-sm mt-6 text-center italic">
              VC has higher risk, but the returns are 3-4x better than traditional investments when done right. That's why we focus on quality deal flow,
              rigorous due diligence, and hands-on value creation.
            </p>
          </div>
        </div>

        <div className="h-[600px] bg-gray-900/50 rounded-xl border border-gray-700/50 p-4">
          <IRRProjection3D />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
          {[
            { label: 'Target IRR', value: '35%', desc: 'Net to LPs' },
            { label: 'DPI Target', value: '4.5x', desc: 'Distributions to Paid-in' },
            { label: 'Fund Life', value: '10 years', desc: 'With 2yr extension' },
            { label: 'Management Fee', value: '2%', desc: 'Annual on committed capital' }
          ].map((metric, idx) => (
            <div key={idx} className="bg-gray-900/50 rounded-xl p-6 text-center">
              <div className="text-2xl font-bold text-emerald-400 mb-2">{metric.value}</div>
              <div className="text-white font-semibold mb-1">{metric.label}</div>
              <div className="text-sm text-gray-400">{metric.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Risk Analysis */}
      <div className="bg-gray-800/30 backdrop-blur-sm rounded-3xl p-12 border border-gray-700/30">
        <h2 className="text-3xl font-bold text-white mb-8">Risk Analysis & Mitigation</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-4 px-6 text-gray-400 font-semibold">Risk Factor</th>
                <th className="text-center py-4 px-6 text-gray-400 font-semibold">Probability</th>
                <th className="text-center py-4 px-6 text-gray-400 font-semibold">Impact</th>
                <th className="text-left py-4 px-6 text-gray-400 font-semibold">Mitigation Strategy</th>
              </tr>
            </thead>
            <tbody>
              {riskAnalysis.marketRisks.map((risk, idx) => (
                <tr key={idx} className="border-b border-gray-800/50 hover:bg-gray-800/30">
                  <td className="py-4 px-6 text-white font-medium">{risk.risk}</td>
                  <td className="py-4 px-6 text-center">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      risk.probability === 'High' ? 'bg-red-500/20 text-red-400' :
                      risk.probability === 'Medium' ? 'bg-amber-500/20 text-amber-400' :
                      'bg-green-500/20 text-green-400'
                    }`}>
                      {risk.probability}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      risk.impact === 'High' ? 'bg-red-500/20 text-red-400' :
                      risk.impact === 'Medium' ? 'bg-amber-500/20 text-amber-400' :
                      'bg-green-500/20 text-green-400'
                    }`}>
                      {risk.impact}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-gray-300">{risk.mitigation}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Due Diligence Scorecard */}
      <div className="bg-gray-800/30 backdrop-blur-sm rounded-3xl p-12 border border-gray-700/30">
        <h2 className="text-3xl font-bold text-white mb-8">Due Diligence Framework</h2>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {Object.entries(riskAnalysis.dueDiligence).map(([category, score], idx) => (
            <div key={idx} className="text-center">
              <div className="relative w-24 h-24 mx-auto mb-4">
                <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="#374151"
                    strokeWidth="8"
                    fill="transparent"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="#10b981"
                    strokeWidth="8"
                    fill="transparent"
                    strokeDasharray={`${2 * Math.PI * 40}`}
                    strokeDashoffset={`${2 * Math.PI * 40 * (1 - score / 100)}`}
                    className="transition-all duration-1000 ease-out"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xl font-bold text-white">{score}%</span>
                </div>
              </div>
              <h3 className="text-white font-semibold capitalize">
                {category.replace(/([A-Z])/g, ' $1').trim()}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );

  const renderPortfolio = () => {
    // Calculate NPV
    const calculateNPV = () => {
      const futureValue = npvInitialInvestment * Math.pow(1 + npvAnnualReturn/100, npvYears);
      const npv = -npvInitialInvestment;
      let totalNPV = npv;
      for (let year = 1; year <= npvYears; year++) {
        const cashFlow = npvInitialInvestment * Math.pow(1 + npvAnnualReturn/100, year) - npvInitialInvestment * Math.pow(1 + npvAnnualReturn/100, year - 1);
        totalNPV += cashFlow / Math.pow(1 + npvDiscountRate/100, year);
      }
      return { npv: totalNPV, futureValue };
    };

    // Calculate Robotics Scenario
    const calculateRoboticsScenario = () => {
      const revenue = robotUnits * robotRetailPrice;
      const cogs = robotUnits * robotUnitCost;
      const grossProfit = revenue - cogs;
      const operatingCosts = revenue * (operatingCostPercent / 100);
      const netProfit = grossProfit - operatingCosts;
      const totalInvestment = cogs + operatingCosts;
      const roi = (netProfit / totalInvestment) * 100;

      // Calculate IRR (simplified - assumes all profit at end of investment horizon)
      const irr = (Math.pow(totalInvestment + netProfit, 1/investmentHorizon) / Math.pow(totalInvestment, 1/investmentHorizon) - 1) * 100;

      return {
        revenue,
        cogs,
        grossProfit,
        operatingCosts,
        netProfit,
        totalInvestment,
        roi,
        irr,
        revenueNaira: revenue * gbpToNaira,
        netProfitNaira: netProfit * gbpToNaira
      };
    };

    const npvResults = calculateNPV();
    const roboticsResults = calculateRoboticsScenario();

    // Year 0-10 timeline data
    const yearlyData = [
      { year: 0, fundValue: 200000, deployed: 0, companies: 0 },
      { year: 1, fundValue: 220000, deployed: 40000, companies: 5 },
      { year: 2, fundValue: 275000, deployed: 70000, companies: 10 },
      { year: 3, fundValue: 385000, deployed: 100000, companies: 15 },
      { year: 4, fundValue: 550000, deployed: 130000, companies: 20 },
      { year: 5, fundValue: 770000, deployed: 200000, companies: 25 },
      { year: 6, fundValue: 1100000, deployed: 200000, companies: 25 },
      { year: 7, fundValue: 1540000, deployed: 200000, companies: 25 },
      { year: 8, fundValue: 2156000, deployed: 200000, companies: 25 },
      { year: 9, fundValue: 3018000, deployed: 200000, companies: 25 },
      { year: 10, fundValue: 4225200, deployed: 200000, companies: 25 }
    ];

    // Industry growth rates (CAGR)
    const industryGrowth = [
      { sector: 'FinTech', allocation: 60000, cagr: 45, year10Value: 1780000, color: 'emerald' },
      { sector: 'Cloud Solutions', allocation: 24000, cagr: 42, year10Value: 680000, color: 'blue' },
      { sector: 'Robotics & Automation', allocation: 24000, cagr: 40, year10Value: 650000, color: 'purple' },
      { sector: 'AgriTech', allocation: 30000, cagr: 38, year10Value: 770000, color: 'green' },
      { sector: 'HealthTech', allocation: 30000, cagr: 35, year10Value: 680000, color: 'red' },
      { sector: 'EdTech', allocation: 32000, cagr: 33, year10Value: 665200, color: 'amber' }
    ];

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="space-y-12"
      >
        {/* Dashboard Header */}
        <div className="text-center">
          <div className="inline-block bg-gradient-to-r from-emerald-500/20 via-blue-500/20 to-purple-500/20 backdrop-blur-sm rounded-2xl px-8 py-3 mb-6 border border-emerald-500/30">
            <span className="text-sm font-semibold text-emerald-400 uppercase tracking-wider">Live Investment Dashboard</span>
          </div>
          <h1 className="text-6xl font-bold text-white mb-4">
            Portfolio Strategy Dashboard
          </h1>
          <p className="text-xl text-gray-400 max-w-4xl mx-auto">
            Interactive 10-year projection showing how NAVADA Nexus's £200,000 fund transforms into £4.2M+ through strategic African tech investments
          </p>
        </div>

        {/* Main Fund Display - Hero Section */}
        <div className="bg-gradient-to-br from-emerald-500/10 via-blue-500/10 to-purple-500/10 backdrop-blur-sm rounded-3xl p-12 border border-emerald-500/30 shadow-2xl shadow-emerald-500/20">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="text-emerald-400 text-sm font-semibold mb-3 uppercase tracking-wider">Initial Fund Size</div>
              <div className="text-7xl font-bold text-white mb-2">£200K</div>
              <p className="text-gray-400 text-sm">Seed Capital - Q4 2026</p>
            </div>
            <div className="text-center border-l border-r border-gray-700/30 px-8">
              <div className="text-blue-400 text-sm font-semibold mb-3 uppercase tracking-wider">Projected Year 10 Value</div>
              <div className="text-7xl font-bold bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent mb-2">£4.2M</div>
              <p className="text-gray-400 text-sm">35% IRR Target - 2036</p>
            </div>
            <div className="text-center">
              <div className="text-purple-400 text-sm font-semibold mb-3 uppercase tracking-wider">Total Return Multiple</div>
              <div className="text-7xl font-bold text-white mb-2">21.1x</div>
              <p className="text-gray-400 text-sm">10-Year Horizon</p>
            </div>
          </div>

          {/* Live Metrics Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: 'Portfolio Companies', value: '25', color: 'emerald' },
              { label: 'Sectors Covered', value: '6', color: 'blue' },
              { label: 'African Countries', value: '4', color: 'purple' },
              { label: 'Investment Period', value: '5 Years', color: 'amber' }
            ].map((metric, idx) => (
              <div key={idx} className={`bg-gray-900/50 rounded-xl p-6 border border-${metric.color}-500/20 shadow-lg shadow-${metric.color}-500/10 hover:shadow-${metric.color}-500/20 transition-all duration-300`}>
                <div className={`text-${metric.color}-400 text-xs font-semibold mb-2 uppercase`}>{metric.label}</div>
                <div className="text-white text-3xl font-bold">{metric.value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Year 0-10 Timeline Selector */}
        <div className="bg-gray-800/30 backdrop-blur-sm rounded-3xl p-12 border border-gray-700/30">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">10-Year Fund Evolution Timeline</h2>

          {/* Timeline Slider */}
          <div className="mb-12">
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-400 text-sm">Year 0 (Launch)</span>
              <span className="text-emerald-400 font-semibold text-lg">Year {selectedYear}</span>
              <span className="text-gray-400 text-sm">Year 10 (Exit)</span>
            </div>
            <input
              type="range"
              min="0"
              max="10"
              value={selectedYear}
              onChange={(e) => setSelectedYear(parseInt(e.target.value))}
              className="w-full h-3 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
            <div className="flex justify-between mt-2">
              {yearlyData.map((data, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedYear(idx)}
                  className={`text-xs px-2 py-1 rounded transition-all duration-200 ${
                    selectedYear === idx
                      ? 'bg-emerald-500 text-white font-bold'
                      : 'text-gray-500 hover:text-white'
                  }`}
                >
                  {idx}
                </button>
              ))}
            </div>
          </div>

          {/* Selected Year Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 rounded-xl p-6 border border-emerald-500/20 shadow-lg shadow-emerald-500/10">
              <div className="text-emerald-400 text-sm font-semibold mb-2 uppercase">Fund Value</div>
              <div className="text-white text-3xl font-bold mb-1">
                £{(yearlyData[selectedYear].fundValue / 1000).toFixed(0)}K
              </div>
              <div className="text-xs text-gray-400">
                {selectedYear > 0 ? `+${(((yearlyData[selectedYear].fundValue / yearlyData[0].fundValue) - 1) * 100).toFixed(0)}% from start` : 'Initial capital'}
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-500/10 to-blue-500/5 rounded-xl p-6 border border-blue-500/20 shadow-lg shadow-blue-500/10">
              <div className="text-blue-400 text-sm font-semibold mb-2 uppercase">Capital Deployed</div>
              <div className="text-white text-3xl font-bold mb-1">
                £{(yearlyData[selectedYear].deployed / 1000).toFixed(0)}K
              </div>
              <div className="text-xs text-gray-400">
                {((yearlyData[selectedYear].deployed / 200000) * 100).toFixed(0)}% of total fund
              </div>
            </div>
            <div className="bg-gradient-to-br from-purple-500/10 to-purple-500/5 rounded-xl p-6 border border-purple-500/20 shadow-lg shadow-purple-500/10">
              <div className="text-purple-400 text-sm font-semibold mb-2 uppercase">Portfolio Companies</div>
              <div className="text-white text-3xl font-bold mb-1">
                {yearlyData[selectedYear].companies}
              </div>
              <div className="text-xs text-gray-400">
                {selectedYear >= 5 ? 'Full portfolio deployed' : 'Building portfolio'}
              </div>
            </div>
            <div className="bg-gradient-to-br from-amber-500/10 to-amber-500/5 rounded-xl p-6 border border-amber-500/20 shadow-lg shadow-amber-500/10">
              <div className="text-amber-400 text-sm font-semibold mb-2 uppercase">Growth Multiple</div>
              <div className="text-white text-3xl font-bold mb-1">
                {(yearlyData[selectedYear].fundValue / 200000).toFixed(1)}x
              </div>
              <div className="text-xs text-gray-400">
                {selectedYear > 0 ? `${(((yearlyData[selectedYear].fundValue / 200000) ** (1/selectedYear) - 1) * 100).toFixed(0)}% CAGR` : 'Launch year'}
              </div>
            </div>
          </div>
        </div>

        {/* Industry Growth Rates Dashboard */}
        <div className="bg-gray-800/30 backdrop-blur-sm rounded-3xl p-12 border border-gray-700/30 shadow-2xl shadow-blue-500/10">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 bg-blue-500/10 rounded-lg">
              <TrendingUp className="h-6 w-6 text-blue-400" />
            </div>
            <h2 className="text-3xl font-bold text-white">Sector Allocation & Expected Growth Rates</h2>
            <span className="ml-auto px-3 py-1 bg-blue-500/10 text-blue-400 rounded-full text-sm font-semibold">Portfolio Analytics</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {industryGrowth.map((industry, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.6 }}
                className={`bg-gradient-to-br from-${industry.color}-500/10 to-${industry.color}-500/5 rounded-xl p-8 border border-${industry.color}-500/20 shadow-lg shadow-${industry.color}-500/10 hover:shadow-${industry.color}-500/20 transition-all duration-300`}
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className={`text-xl font-bold text-${industry.color}-400`}>{industry.sector}</h3>
                  <span className="bg-gray-900/50 px-2 py-1 rounded text-xs text-gray-400">
                    {((industry.allocation / 200000) * 100).toFixed(0)}%
                  </span>
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="text-gray-400 text-sm mb-1">Initial Allocation</div>
                    <div className="text-white text-2xl font-bold">£{(industry.allocation / 1000).toFixed(0)}K</div>
                  </div>

                  <div>
                    <div className="text-gray-400 text-sm mb-1">Expected CAGR</div>
                    <div className={`text-${industry.color}-400 text-2xl font-bold`}>{industry.cagr}%</div>
                  </div>

                  <div>
                    <div className="text-gray-400 text-sm mb-1">Projected Year 10 Value</div>
                    <div className="text-white text-2xl font-bold">£{(industry.year10Value / 1000).toFixed(0)}K</div>
                  </div>

                  <div className="pt-4 border-t border-gray-700/50">
                    <div className="text-gray-400 text-sm mb-1">Return Multiple</div>
                    <div className="text-white text-xl font-bold">{(industry.year10Value / industry.allocation).toFixed(1)}x</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Key Financial Formulas */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 rounded-xl p-6 border border-emerald-500/20">
              <div className="text-emerald-400 text-xs font-semibold mb-2 uppercase">CAGR Formula</div>
              <div className="font-mono text-sm text-white mb-3">
                (FV / PV)^(1/n) - 1
              </div>
              <div className="text-xs text-gray-400">
                FV: Future Value<br/>
                PV: Present Value<br/>
                n: Years
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-500/10 to-blue-500/5 rounded-xl p-6 border border-blue-500/20">
              <div className="text-blue-400 text-xs font-semibold mb-2 uppercase">NPV Formula</div>
              <div className="font-mono text-sm text-white mb-3">
                Σ[CFₜ / (1 + r)� - ]
              </div>
              <div className="text-xs text-gray-400">
                CF: Cash Flow<br/>
                r: Discount Rate<br/>
                t: Time Period
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-500/10 to-purple-500/5 rounded-xl p-6 border border-purple-500/20">
              <div className="text-purple-400 text-xs font-semibold mb-2 uppercase">IRR Formula</div>
              <div className="font-mono text-sm text-white mb-3">
                NPV = 0 when r = IRR
              </div>
              <div className="text-xs text-gray-400">
                Internal Rate of Return<br/>
                Discount rate where<br/>
                NPV equals zero
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Calculators & What-If Scenarios */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* NPV Calculator */}
          <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-sm rounded-3xl p-8 border border-blue-500/30 shadow-2xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-blue-500/20 rounded-xl">
                <DollarSign className="h-6 w-6 text-blue-400" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">NPV Calculator</h3>
                <p className="text-sm text-gray-400">Net Present Value Analysis</p>
              </div>
            </div>

            {/* NPV Inputs */}
            <div className="space-y-4 mb-6">
              <div>
                <label className="text-sm text-gray-400 mb-2 block">Initial Investment (£)</label>
                <input
                  type="number"
                  value={npvInitialInvestment}
                  onChange={(e) => setNpvInitialInvestment(Number(e.target.value))}
                  className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-blue-500 focus:outline-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-400 mb-2 block">Discount Rate (%)</label>
                  <input
                    type="number"
                    value={npvDiscountRate}
                    onChange={(e) => setNpvDiscountRate(Number(e.target.value))}
                    className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-400 mb-2 block">Years</label>
                  <input
                    type="number"
                    value={npvYears}
                    onChange={(e) => setNpvYears(Number(e.target.value))}
                    className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="text-sm text-gray-400 mb-2 block">Annual Return Rate (%)</label>
                <input
                  type="number"
                  value={npvAnnualReturn}
                  onChange={(e) => setNpvAnnualReturn(Number(e.target.value))}
                  className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-blue-500 focus:outline-none"
                />
              </div>
            </div>

            {/* NPV Results */}
            <div className="bg-gray-900/50 rounded-xl p-6 border border-blue-500/30">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-xs text-gray-400 mb-1">Net Present Value</div>
                  <div className="text-2xl font-bold text-blue-400">
                    £{npvResults.npv.toLocaleString('en-GB', { maximumFractionDigits: 0 })}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-gray-400 mb-1">Future Value (Year {npvYears})</div>
                  <div className="text-2xl font-bold text-emerald-400">
                    £{npvResults.futureValue.toLocaleString('en-GB', { maximumFractionDigits: 0 })}
                  </div>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-700">
                <div className="text-xs text-gray-500 mb-2">NPV Formula:</div>
                <div className="font-mono text-xs text-gray-400">
                  NPV = Σ[CFₜ / (1 + r)� - ] - Initial Investment
                </div>
              </div>
            </div>
          </div>

          {/* Robotics What-If Scenario */}
          <div className="bg-gradient-to-br from-purple-500/10 to-emerald-500/10 backdrop-blur-sm rounded-3xl p-8 border border-purple-500/30 shadow-2xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-purple-500/20 rounded-xl">
                <Cpu className="h-6 w-6 text-purple-400" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">Robotics Startup Scenario</h3>
                <p className="text-sm text-gray-400">Nigeria Market Analysis (GBP ↔ ₦{gbpToNaira.toLocaleString()})</p>
              </div>
            </div>

            {/* Robotics Inputs */}
            <div className="space-y-4 mb-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-400 mb-2 block">Robot Units</label>
                  <input
                    type="number"
                    value={robotUnits}
                    onChange={(e) => setRobotUnits(Number(e.target.value))}
                    className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-purple-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-400 mb-2 block">Unit Cost (£)</label>
                  <input
                    type="number"
                    value={robotUnitCost}
                    onChange={(e) => setRobotUnitCost(Number(e.target.value))}
                    className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-purple-500 focus:outline-none"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-400 mb-2 block">Retail Price (£)</label>
                  <input
                    type="number"
                    value={robotRetailPrice}
                    onChange={(e) => setRobotRetailPrice(Number(e.target.value))}
                    className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-purple-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-400 mb-2 block">Operating Cost (%)</label>
                  <input
                    type="number"
                    value={operatingCostPercent}
                    onChange={(e) => setOperatingCostPercent(Number(e.target.value))}
                    className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-purple-500 focus:outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="text-sm text-gray-400 mb-2 block">Investment Horizon (years)</label>
                <input
                  type="number"
                  value={investmentHorizon}
                  onChange={(e) => setInvestmentHorizon(Number(e.target.value))}
                  className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-purple-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Robotics Results */}
            <div className="bg-gray-900/50 rounded-xl p-6 border border-purple-500/30">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <div className="text-xs text-gray-400 mb-1">Revenue (£)</div>
                  <div className="text-lg font-bold text-purple-400">
                    £{roboticsResults.revenue.toLocaleString()}
                  </div>
                  <div className="text-xs text-gray-500">
                    ₦{roboticsResults.revenueNaira.toLocaleString()}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-gray-400 mb-1">Net Profit (£)</div>
                  <div className="text-lg font-bold text-emerald-400">
                    £{roboticsResults.netProfit.toLocaleString()}
                  </div>
                  <div className="text-xs text-gray-500">
                    ₦{roboticsResults.netProfitNaira.toLocaleString()}
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3 pt-3 border-t border-gray-700">
                <div className="text-center">
                  <div className="text-xs text-gray-500 mb-1">ROI</div>
                  <div className="text-xl font-bold text-blue-400">{roboticsResults.roi.toFixed(1)}%</div>
                </div>
                <div className="text-center">
                  <div className="text-xs text-gray-500 mb-1">IRR</div>
                  <div className="text-xl font-bold text-emerald-400">{roboticsResults.irr.toFixed(1)}%</div>
                </div>
                <div className="text-center">
                  <div className="text-xs text-gray-500 mb-1">Margin</div>
                  <div className="text-xl font-bold text-purple-400">
                    {((roboticsResults.grossProfit / roboticsResults.revenue) * 100).toFixed(1)}%
                  </div>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-gray-700">
                <div className="text-xs text-gray-500 mb-1">Why Nigeria?</div>
                <div className="text-xs text-gray-400">
                  • GBP:Naira rate (1:{gbpToNaira}) creates labor cost advantage<br/>
                  • Rising robotics demand across agriculture & manufacturing<br/>
                  • Early market entry in fast-growing £{roboticsResults.revenue.toLocaleString()} opportunity
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3D Visualizations Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Fund Deployment 3D */}
          <div className="bg-gray-800/30 backdrop-blur-sm rounded-3xl p-8 border border-gray-700/30 shadow-2xl shadow-emerald-500/10 hover:shadow-emerald-500/20 transition-all duration-300 cursor-pointer group" onClick={() => setExpandedChart('fundDeployment')}>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-emerald-500/10 rounded-lg">
                <DollarSign className="h-5 w-5 text-emerald-400" />
              </div>
              <h3 className="text-2xl font-bold text-white">5-Year Deployment Strategy</h3>
              <Maximize2 className="ml-auto h-5 w-5 text-gray-500 group-hover:text-emerald-400 transition-colors" />
              <span className="px-2 py-1 bg-emerald-500/10 text-emerald-400 rounded-full text-xs font-semibold">3D</span>
            </div>
            <div className="h-[500px] bg-gray-900/50 rounded-xl border border-gray-700/50 p-4">
              <FundDeployment3D />
            </div>
            <p className="text-sm text-gray-400 mt-4">
              Disciplined capital deployment over 5 years with 30% follow-on reserves for winning companies
            </p>
          </div>

          {/* Geographic Distribution 3D */}
          <div className="bg-gray-800/30 backdrop-blur-sm rounded-3xl p-8 border border-gray-700/30 shadow-2xl shadow-blue-500/10 hover:shadow-blue-500/20 transition-all duration-300 cursor-pointer group" onClick={() => setExpandedChart('geoDistribution')}>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-blue-500/10 rounded-lg">
                <Globe className="h-5 w-5 text-blue-400" />
              </div>
              <h3 className="text-2xl font-bold text-white">Geographic Distribution</h3>
              <Maximize2 className="ml-auto h-5 w-5 text-gray-500 group-hover:text-blue-400 transition-colors" />
              <span className="px-2 py-1 bg-blue-500/10 text-blue-400 rounded-full text-xs font-semibold">3D</span>
            </div>
            <div className="h-[500px] bg-gray-900/50 rounded-xl border border-gray-700/50 p-4">
              <GeographicDistribution3D />
            </div>
            <p className="text-sm text-gray-400 mt-4">
              Strategic allocation across Nigeria (40%), Kenya (30%), Ghana (15%), and South Africa (15%)
            </p>
          </div>

          {/* Risk-Return Matrix 3D */}
          <div className="bg-gray-800/30 backdrop-blur-sm rounded-3xl p-8 border border-gray-700/30 shadow-2xl shadow-purple-500/10 hover:shadow-purple-500/20 transition-all duration-300 cursor-pointer group" onClick={() => setExpandedChart('riskReturn')}>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-purple-500/10 rounded-lg">
                <Target className="h-5 w-5 text-purple-400" />
              </div>
              <h3 className="text-2xl font-bold text-white">Risk-Return Profile</h3>
              <Maximize2 className="ml-auto h-5 w-5 text-gray-500 group-hover:text-purple-400 transition-colors" />
              <span className="px-2 py-1 bg-purple-500/10 text-purple-400 rounded-full text-xs font-semibold">3D</span>
            </div>
            <div className="h-[500px] bg-gray-900/50 rounded-xl border border-gray-700/50 p-4">
              <RiskReturnMatrix3D />
            </div>
            <p className="text-sm text-gray-400 mt-4">
              Portfolio positioned for optimal risk-adjusted returns with balanced high-risk/high-reward companies
            </p>
          </div>

          {/* Exit Timeline 3D */}
          <div className="bg-gray-800/30 backdrop-blur-sm rounded-3xl p-8 border border-gray-700/30 shadow-2xl shadow-amber-500/10 hover:shadow-amber-500/20 transition-all duration-300 cursor-pointer group" onClick={() => setExpandedChart('exitTimeline')}>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-amber-500/10 rounded-lg">
                <TrendingUp className="h-5 w-5 text-amber-400" />
              </div>
              <h3 className="text-2xl font-bold text-white">Exit Timeline Projection</h3>
              <Maximize2 className="ml-auto h-5 w-5 text-gray-500 group-hover:text-amber-400 transition-colors" />
              <span className="px-2 py-1 bg-amber-500/10 text-amber-400 rounded-full text-xs font-semibold">3D</span>
            </div>
            <div className="h-[500px] bg-gray-900/50 rounded-xl border border-gray-700/50 p-4">
              <ExitTimeline3D />
            </div>
            <p className="text-sm text-gray-400 mt-4">
              Expected 16 exits over 7 years via acquisitions (8), IPOs (5), and secondary sales (3)
            </p>
          </div>
        </div>

        {/* Expanded Chart Modal */}
        <AnimatePresence>
          {expandedChart && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 md:p-8"
              onClick={() => setExpandedChart(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="relative bg-gray-900 rounded-3xl border border-gray-700 shadow-2xl w-full max-w-7xl max-h-[90vh] overflow-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="sticky top-0 bg-gray-900 border-b border-gray-700 p-6 flex items-center justify-between z-10">
                  <h2 className="text-3xl font-bold text-white">
                    {expandedChart === 'fundDeployment' && '5-Year Deployment Strategy'}
                    {expandedChart === 'geoDistribution' && 'Geographic Distribution'}
                    {expandedChart === 'riskReturn' && 'Risk-Return Profile'}
                    {expandedChart === 'exitTimeline' && 'Exit Timeline Projection'}
                  </h2>
                  <button
                    onClick={() => setExpandedChart(null)}
                    className="p-2 bg-red-500/10 hover:bg-red-500/20 rounded-lg transition-colors"
                  >
                    <X className="h-6 w-6 text-red-400" />
                  </button>
                </div>
                <div className="p-8">
                  <div className="h-[70vh] bg-gray-800/30 rounded-xl border border-gray-700/50 p-4">
                    {expandedChart === 'fundDeployment' && <FundDeployment3D />}
                    {expandedChart === 'geoDistribution' && <GeographicDistribution3D />}
                    {expandedChart === 'riskReturn' && <RiskReturnMatrix3D />}
                    {expandedChart === 'exitTimeline' && <ExitTimeline3D />}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* IRR & Multiple Explanation */}
        <div className="bg-gray-800/30 backdrop-blur-sm rounded-3xl p-12 border border-gray-700/30">
          <h2 className="text-3xl font-bold text-white mb-8">
            Understanding IRR & Investment Multiples
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 rounded-xl p-8 border border-emerald-500/20">
              <h3 className="text-2xl font-bold text-emerald-400 mb-4">What is IRR (Internal Rate of Return)?</h3>
              <p className="text-gray-300 leading-relaxed mb-6">
                IRR is the discount rate that makes the Net Present Value (NPV) of all cash flows equal to zero.
                For venture capital, it's the annualized effective compounded return rate.
              </p>

              <div className="bg-gray-900/50 rounded-lg p-6 border border-emerald-500/20 mb-6">
                <div className="font-mono text-sm text-emerald-400 mb-3">NAVADA Nexus Example:</div>
                <div className="space-y-2 text-sm text-gray-300">
                  <div>Year 0: Invest £200,000</div>
                  <div>Year 10: Exit at £4,225,200</div>
                  <div className="pt-3 border-t border-gray-700/50 font-semibold text-white">
                    IRR = 35% (target annual return)
                  </div>
                </div>
              </div>

              <div className="bg-gray-900/50 rounded-lg p-4 border border-blue-500/20">
                <div className="text-xs text-blue-400 font-semibold mb-2">Why 35% IRR is Excellent:</div>
                <ul className="text-xs text-gray-300 space-y-1">
                  <li>• Public markets: ~10% annual return</li>
                  <li>• VC industry median: ~15-20% IRR</li>
                  <li>• Top quartile VC funds: 25-35% IRR</li>
                  <li>• NAVADA target: 35% (top quartile)</li>
                </ul>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-500/10 to-blue-500/5 rounded-xl p-8 border border-blue-500/20">
              <h3 className="text-2xl font-bold text-blue-400 mb-4">Understanding Investment Multiples</h3>
              <p className="text-gray-300 leading-relaxed mb-6">
                The multiple (MOIC - Multiple on Invested Capital) is the simplest measure:
                how many times your initial investment you get back at exit.
              </p>

              <div className="bg-gray-900/50 rounded-lg p-6 border border-blue-500/20 mb-6">
                <div className="font-mono text-sm text-blue-400 mb-3">Formula & Example:</div>
                <div className="space-y-2 text-sm text-gray-300">
                  <div>Multiple = Exit Value / Initial Investment</div>
                  <div className="pt-3 border-t border-gray-700/50">
                    Multiple = £4,225,200 / £200,000 = <span className="font-bold text-white">21.1x</span>
                  </div>
                  <div className="text-xs text-gray-400 mt-2">
                    This means for every £1 invested, you receive £21.10 back
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="bg-gray-900/50 rounded-lg p-4 border border-emerald-500/20">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-300">FinTech (45% CAGR)</span>
                    <span className="text-white font-bold">29.7x multiple</span>
                  </div>
                </div>
                <div className="bg-gray-900/50 rounded-lg p-4 border border-purple-500/20">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-300">Robotics (40% CAGR)</span>
                    <span className="text-white font-bold">27.1x multiple</span>
                  </div>
                </div>
                <div className="bg-gray-900/50 rounded-lg p-4 border border-amber-500/20">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-300">EdTech (33% CAGR)</span>
                    <span className="text-white font-bold">20.8x multiple</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* African Tech Success Stories */}
        <div className="bg-gray-800/30 backdrop-blur-sm rounded-3xl p-12 border border-gray-700/30">
          <h2 className="text-3xl font-bold text-white mb-8">African Tech Success Stories - Benchmark Companies</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {detailedPortfolioData.map((company, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.6 }}
                className="bg-gray-900/50 rounded-xl p-8 border border-gray-700/50 hover:border-emerald-500/30 transition-all duration-300"
              >
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">{company.company}</h3>
                    <span className="inline-block bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full text-sm font-medium">
                      {company.sector}
                    </span>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    company.status === 'Unicorn' ? 'bg-purple-500/20 text-purple-400' :
                    company.status === 'Public' ? 'bg-blue-500/20 text-blue-400' :
                    'bg-green-500/20 text-green-400'
                  }`}>
                    {company.status}
                  </span>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Valuation</span>
                    <span className="text-white font-semibold">
                      ${(company.valuation / 1000000000).toFixed(1)}B
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Last Round</span>
                    <span className="text-white font-semibold">
                      ${(company.lastRoundSize / 1000000).toFixed(0)}M
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Growth Rate</span>
                    <span className="text-emerald-400 font-semibold">+{company.growth}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Market</span>
                    <span className="text-white font-semibold">{company.country}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* About the Fund */}
        <div className="bg-gradient-to-br from-blue-900/30 via-purple-900/30 to-gray-900/30 backdrop-blur-sm rounded-3xl p-12 border border-blue-500/30 shadow-2xl shadow-blue-500/20">
          <div className="text-center mb-12">
            <div className="inline-block bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-emerald-500/20 backdrop-blur-sm rounded-2xl px-8 py-3 mb-6 border border-blue-500/30">
              <span className="text-sm font-semibold text-blue-400 uppercase tracking-wider">About The Fund</span>
            </div>
            <h2 className="text-4xl font-bold text-white mb-6">ABOUT THE FUND</h2>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              NAVADA Nexus is a visionary micro-venture initiative established to accelerate the growth of Africa's AI, robotics, and innovation economy.
            </p>
          </div>

          <div className="max-w-5xl mx-auto space-y-8">
            {/* Mission Statement */}
            <div className="bg-gray-900/50 rounded-xl p-8 border border-gray-700/50">
              <p className="text-gray-300 text-lg leading-relaxed">
                The fund is designed to support early-stage startups and creators who are building bold, practical, and socially impactful technologies.
                It bridges the gap between education and innovation — providing the capital, mentorship, and structure required to turn ideas into functioning ventures.
              </p>
            </div>

            {/* Fund Structure */}
            <div className="bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 rounded-xl p-8 border border-emerald-500/20">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <DollarSign className="h-6 w-6 text-emerald-400" />
                FUND STRUCTURE
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-900/50 rounded-lg p-6 border border-gray-700/50">
                  <div className="text-emerald-400 text-sm font-semibold mb-2">Total Fund Size</div>
                  <div className="text-3xl font-bold text-white">£200,000</div>
                </div>
                <div className="bg-gray-900/50 rounded-lg p-6 border border-gray-700/50">
                  <div className="text-blue-400 text-sm font-semibold mb-2">Minimum Investor Contribution</div>
                  <div className="text-3xl font-bold text-white">£10,000</div>
                </div>
                <div className="bg-gray-900/50 rounded-lg p-6 border border-gray-700/50">
                  <div className="text-purple-400 text-sm font-semibold mb-2">Minimum Startup Investment</div>
                  <div className="text-3xl font-bold text-white">£10,000</div>
                </div>
                <div className="bg-gray-900/50 rounded-lg p-6 border border-gray-700/50">
                  <div className="text-amber-400 text-sm font-semibold mb-2">NAVADA Founder Commitment</div>
                  <div className="text-lg font-bold text-white">Initial capital by Lee Akpareva</div>
                </div>
              </div>
              <div className="mt-6 bg-blue-500/10 rounded-lg p-6 border border-blue-500/20">
                <div className="text-blue-400 text-sm font-semibold mb-2">Fund Management</div>
                <p className="text-gray-300 mb-4">
                  NAVADA Nexus will appoint a qualified <strong className="text-white">Fund Manager</strong> with professional experience in finance,
                  venture capital, or corporate innovation to oversee due diligence, portfolio tracking, and transparent reporting.
                </p>
                <div className="bg-gray-900/50 rounded-lg p-4 border border-blue-500/20 mt-4">
                  <div className="text-emerald-400 text-sm font-semibold mb-2">Capital Deployment & Treasury Management</div>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    When we invest £10,000 into a startup, the remaining £190,000 balance is actively managed by the Fund Manager.
                    These uncommitted funds are invested in low-risk, liquid financial instruments (such as money market funds, short-term bonds, or treasury bills)
                    to generate returns while maintaining accessibility for future investments. Any gains from treasury management are reinvested into
                    <strong className="text-white"> R&D initiatives</strong> to enhance our portfolio companies' capabilities.
                    This ensures capital efficiency and maximizes returns for our Limited Partners.
                  </p>
                </div>
              </div>
            </div>

            {/* How It Works */}
            <div className="bg-gradient-to-br from-blue-500/10 to-blue-500/5 rounded-xl p-8 border border-blue-500/20">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <Target className="h-6 w-6 text-blue-400" />
                HOW IT WORKS
              </h3>
              <div className="space-y-4">
                {[
                  {
                    step: '1',
                    title: 'Capital Formation',
                    desc: 'NAVADA Nexus raises up to £200,000 from investors and partners who wish to support innovation in emerging markets.',
                    color: 'emerald'
                  },
                  {
                    step: '2',
                    title: 'Startup Selection',
                    desc: 'NAVADA identifies subject matter experts (SMEs) — founders with deep expertise in tech, AI, robotics, and data who demonstrate passion and discipline. We invest between £10,000 – £25,000 per company, backing experts, not just ideas.',
                    color: 'blue'
                  },
                  {
                    step: '3',
                    title: 'Growth & Mentorship',
                    desc: 'Startups receive hands-on mentorship, access to AI/robotics resources, and business guidance to scale their technology.',
                    color: 'purple'
                  },
                  {
                    step: '4',
                    title: 'Returns & Exits',
                    desc: 'When portfolio startups achieve liquidity events such as acquisitions, licensing deals, or equity sales, proceeds are distributed proportionally to investors according to their ownership share.',
                    color: 'amber'
                  },
                  {
                    step: '5',
                    title: 'Long-Term Horizon',
                    desc: 'Investors should expect a 5- to 10-year maturity period before major exits or returns occur.',
                    color: 'red'
                  }
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-4 bg-gray-900/50 rounded-lg p-6 border border-gray-700/50 hover:border-gray-600/50 transition-all">
                    <div className={`flex-shrink-0 w-12 h-12 rounded-full bg-${item.color}-500/20 flex items-center justify-center`}>
                      <span className={`text-${item.color}-400 font-bold text-lg`}>{item.step}</span>
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-lg mb-2">{item.title}</h4>
                      <p className="text-gray-300">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Investor Principles */}
            <div className="bg-gradient-to-br from-purple-500/10 to-purple-500/5 rounded-xl p-8 border border-purple-500/20">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <Shield className="h-6 w-6 text-purple-400" />
                INVESTOR PRINCIPLES
              </h3>
              <div className="space-y-4 text-gray-300 leading-relaxed">
                <p>
                  NAVADA Nexus operates on <strong className="text-white">transparency, innovation, and impact</strong>.
                </p>
                <p>
                  This fund is <strong className="text-amber-400">not a regulated financial institution</strong> or advisory service;
                  it is an <strong className="text-emerald-400">innovation-led venture vehicle</strong>.
                </p>
                <p>
                  Investors participate with the understanding that all contributions carry <strong className="text-red-400">high risk and long-term potential reward</strong>.
                </p>
                <p>
                  NAVADA Nexus will publish periodic reports on fund allocation, project milestones, and startup performance.
                </p>
              </div>
            </div>

            {/* Real-Life Reference */}
            <div className="bg-gradient-to-br from-amber-500/10 to-amber-500/5 rounded-xl p-8 border border-amber-500/20">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <TrendingUp className="h-6 w-6 text-amber-400" />
                REAL-LIFE REFERENCE
              </h3>
              <div className="bg-gray-900/50 rounded-lg p-6 border border-gray-700/50">
                <p className="text-gray-300 leading-relaxed mb-4">
                  To illustrate the opportunity, consider <strong className="text-white">Flutterwave</strong>, a Nigerian fintech startup that began with seed investments
                  of roughly $10,000 – $20,000 in its earliest stage and later achieved a valuation exceeding <strong className="text-emerald-400">$3 billion</strong>.
                </p>
                <p className="text-gray-300 leading-relaxed">
                  NAVADA Nexus seeks to identify and nurture the next generation of such transformative ventures — focusing on robotics, AI infrastructure,
                  and digital manufacturing across Africa.
                </p>
              </div>
            </div>

            {/* Vision */}
            <div className="bg-gradient-to-br from-emerald-500/10 to-blue-500/10 rounded-xl p-8 border border-emerald-500/20">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <Globe className="h-6 w-6 text-emerald-400" />
                VISION
              </h3>
              <p className="text-gray-300 text-lg leading-relaxed">
                By investing directly in creators and startups rather than traditional education programs, NAVADA Nexus aims to unlock higher long-term returns —
                both <strong className="text-emerald-400">financial</strong> and <strong className="text-blue-400">societal</strong>.
                The fund will empower technical talent, stimulate innovation in developing nations, and create a sustainable ecosystem for future builders.
              </p>
            </div>

            {/* Disclaimer */}
            <div className="bg-red-500/10 rounded-xl p-8 border border-red-500/30">
              <h3 className="text-2xl font-bold text-red-400 mb-6 flex items-center gap-3">
                <Shield className="h-6 w-6 text-red-400" />
                DISCLAIMER
              </h3>
              <div className="space-y-3 text-gray-300 leading-relaxed">
                <p>
                  NAVADA Nexus initiatives are educational and innovation-driven.
                </p>
                <p>
                  Participation does <strong className="text-red-400">not guarantee profit</strong> and involves a significant degree of risk.
                </p>
                <p>
                  All contributors are encouraged to read the <strong className="text-white">Terms for Engagement</strong> before committing funds or collaborating with NAVADA Nexus.
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  const renderMarket = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="space-y-16"
    >
      <div className="text-center">
        <h1 className="text-5xl font-bold text-white mb-6">Market Analysis</h1>
        <p className="text-xl text-gray-400 max-w-3xl mx-auto">
          Comprehensive analysis of African tech ecosystem and investment opportunities
        </p>
      </div>

      {/* Market Size Evolution - Enhanced 3D */}
      <div className="bg-gray-800/30 backdrop-blur-sm rounded-3xl p-12 border border-gray-700/30 shadow-2xl shadow-blue-500/10 hover:shadow-blue-500/20 transition-all duration-300">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 bg-blue-500/10 rounded-lg">
            <Globe className="h-6 w-6 text-blue-400" />
          </div>
          <h2 className="text-3xl font-bold text-white">African Tech Market Growth</h2>
          <span className="ml-auto px-3 py-1 bg-blue-500/10 text-blue-400 rounded-full text-sm font-semibold">3D Interactive</span>
        </div>
        <div className="h-[600px] bg-gray-900/50 rounded-xl border border-gray-700/50 p-4 mb-8">
          <MarketGrowth3D />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { metric: 'Market Size 2024', value: '$8.5B', change: '+23% YoY' },
            { metric: 'Projected 2030', value: '$30.0B', change: '23.5% CAGR' },
            { metric: 'Active Startups', value: '1,240+', change: '+18% YoY' },
            { metric: 'Unicorns Created', value: '7', change: '2 in 2023' },
            { metric: 'VC Funds Active', value: '124', change: '+15% YoY' },
            { metric: 'Average Exit Time', value: '6.2 years', change: 'Improving' }
          ].map((item, idx) => (
            <div key={idx} className="bg-gray-900/50 rounded-xl p-6 flex justify-between items-center shadow-lg shadow-blue-500/10 hover:shadow-blue-500/20 transition-all duration-300">
              <span className="text-gray-400 font-medium">{item.metric}</span>
              <div className="text-right">
                <div className="text-white font-semibold text-lg">{item.value}</div>
                <div className="text-xs text-emerald-400">{item.change}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AI Adoption Growth - The Game Changer */}
      <div className="bg-gray-800/30 backdrop-blur-sm rounded-3xl p-12 border border-gray-700/30 shadow-2xl shadow-emerald-500/10 hover:shadow-emerald-500/20 transition-all duration-300">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 bg-emerald-500/10 rounded-lg">
            <Brain className="h-6 w-6 text-emerald-400" />
          </div>
          <h2 className="text-3xl font-bold text-white">AI Adoption Growth Across Africa</h2>
          <span className="ml-auto px-3 py-1 bg-emerald-500/10 text-emerald-400 rounded-full text-sm font-semibold">3D Interactive</span>
        </div>

        <div className="bg-gradient-to-br from-emerald-500/10 to-blue-500/5 rounded-xl p-8 border border-emerald-500/20 mb-8">
          <h3 className="text-2xl font-bold text-white mb-4">Why AI Makes This Fund Unmissable</h3>
          <p className="text-xl text-gray-300 leading-relaxed mb-6">
            Artificial Intelligence is revolutionizing African tech across all sectors, driving unprecedented interest and adoption.
            NAVADA Nexus's £200,000 fund is strategically positioned to capitalize on this AI-driven transformation by funding and educating
            the next generation of African tech founders building AI-powered solutions in FinTech, AgriTech, HealthTech, EdTech, Robotics,
            and Cloud infrastructure.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-900/50 rounded-xl p-6 border border-emerald-500/20">
              <div className="text-emerald-400 text-sm font-semibold mb-2">AI MARKET OPPORTUNITY</div>
              <div className="text-white text-3xl font-bold mb-2">$30B+</div>
              <p className="text-gray-400 text-sm">Projected African AI market by 2030, growing at 40%+ CAGR</p>
            </div>
            <div className="bg-gray-900/50 rounded-xl p-6 border border-blue-500/20">
              <div className="text-blue-400 text-sm font-semibold mb-2">FOUNDER EDUCATION</div>
              <div className="text-white text-3xl font-bold mb-2">Core Mission</div>
              <p className="text-gray-400 text-sm">We educate founders on AI integration, robotics, and cloud architecture</p>
            </div>
            <div className="bg-gray-900/50 rounded-xl p-6 border border-purple-500/20">
              <div className="text-purple-400 text-sm font-semibold mb-2">TALENT DEVELOPMENT</div>
              <div className="text-white text-3xl font-bold mb-2">Long-term Focus</div>
              <p className="text-gray-400 text-sm">Building technical capacity through mentorship and hands-on guidance</p>
            </div>
          </div>
        </div>

        <div className="h-[700px] bg-gray-900/50 rounded-xl border border-gray-700/50 p-4 mb-8">
          <AIAdoptionAfrica3D />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 rounded-xl p-8 border border-emerald-500/20">
            <h3 className="text-xl font-bold text-white mb-6">AI as the Investment Catalyst</h3>
            <ul className="space-y-4">
              {[
                'Cloud Solutions (94% adoption by 2035) - Infrastructure backbone for AI deployment',
                'Robotics & Automation (91% by 2035) - AI-powered robotics solving manufacturing and agriculture challenges',
                'FinTech (90% by 2035) - AI-driven fraud detection, credit scoring, and personalization',
                'HealthTech (90% by 2035) - AI diagnostics, telemedicine, and predictive healthcare',
                'AgriTech (88% by 2035) - Precision agriculture, yield prediction, and supply chain optimization',
                'EdTech (89% by 2035) - Personalized learning, AI tutors, and skills assessment'
              ].map((item, i) => (
                <li key={i} className="text-gray-300 flex items-start">
                  <span className="text-emerald-400 mr-3 mt-1">•</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-gradient-to-br from-blue-500/10 to-blue-500/5 rounded-xl p-8 border border-blue-500/20">
            <h3 className="text-xl font-bold text-white mb-6">Our AI-First Approach</h3>
            <ul className="space-y-4">
              {[
                'Every portfolio company receives AI strategy consulting and implementation support',
                'Technical workshops on ML/AI integration, cloud deployment, and data infrastructure',
                'Access to our robotics engineering expertise for hardware-software AI integration',
                'Connections to global AI research labs and talent networks',
                'Guidance on responsible AI development and ethical considerations',
                'Support for securing AI-focused follow-on funding from specialized VCs'
              ].map((item, i) => (
                <li key={i} className="text-gray-300 flex items-start">
                  <span className="text-blue-400 mr-3 mt-1">•</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 bg-gradient-to-br from-purple-500/10 to-purple-500/5 rounded-xl p-8 border border-purple-500/20">
          <h3 className="text-2xl font-bold text-white mb-4">The £200K Fund: Small Fund, Massive Impact</h3>
          <p className="text-lg text-gray-300 leading-relaxed mb-4">
            Our £200,000 fund is designed for maximum efficiency and founder support. By keeping it focused, we ensure every founder
            receives personalized technical mentorship, hands-on AI/robotics guidance, and strategic support. This isn't just capital—it's
            a partnership with founders building the AI-powered future of Africa.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400 mb-2">25</div>
              <div className="text-sm text-gray-400">Portfolio Companies</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400 mb-2">£8-18K</div>
              <div className="text-sm text-gray-400">Investment per Company</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400 mb-2">100%</div>
              <div className="text-sm text-gray-400">AI/Tech Mentorship</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400 mb-2">10-Year</div>
              <div className="text-sm text-gray-400">Horizon</div>
            </div>
          </div>
        </div>
      </div>

      {/* Competitive Landscape */}
      <div className="bg-gray-800/30 backdrop-blur-sm rounded-3xl p-12 border border-gray-700/30">
        <h2 className="text-3xl font-bold text-white mb-8">Competitive Landscape</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              fund: 'TLcom Capital',
              aum: '$300M',
              focus: 'Series A-B',
              geography: 'Africa-wide',
              notable: 'Andela, uLesson'
            },
            {
              fund: 'Partech Partners',
              aum: '$125M',
              focus: 'Seed-Series A',
              geography: 'West Africa',
              notable: 'Wave, Yoco'
            },
            {
              fund: 'Norrsken22',
              aum: '$200M',
              focus: 'Series A-B',
              geography: 'East Africa',
              notable: 'Wasoko, WorkPay'
            },
            {
              fund: 'Future Africa',
              aum: '$50M',
              focus: 'Pre-seed/Seed',
              geography: 'Nigeria',
              notable: 'Paystack, 54gene'
            },
            {
              fund: 'NAVADA Nexus',
              aum: '£200K',
              focus: 'Series A-B',
              geography: '4 markets',
              notable: 'Launching Q4 2026'
            }
          ].map((fund, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              className={`rounded-xl p-6 border-2 ${
                fund.fund === 'NAVADA Nexus'
                  ? 'bg-emerald-500/10 border-emerald-500/50'
                  : 'bg-gray-900/50 border-gray-700/50'
              }`}
            >
              <h3 className="text-lg font-semibold text-white mb-4">{fund.fund}</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">AUM</span>
                  <span className="text-white font-medium">{fund.aum}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Stage</span>
                  <span className="text-white font-medium">{fund.focus}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Geography</span>
                  <span className="text-white font-medium">{fund.geography}</span>
                </div>
                <div className="pt-2 border-t border-gray-700">
                  <span className="text-gray-400 text-xs">Notable: </span>
                  <span className="text-emerald-400 text-xs font-medium">{fund.notable}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );

  const renderTeam = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="space-y-16"
    >
      <div className="text-center">
        <h1 className="text-5xl font-bold text-white mb-6">Leadership Team</h1>
        <p className="text-xl text-gray-400 max-w-3xl mx-auto">
          Experienced professionals with deep expertise in venture capital, African markets, and technology
        </p>
      </div>

      {/* Team Structure */}
      <div className="bg-gray-800/30 backdrop-blur-sm rounded-3xl p-12 border border-gray-700/30">
        <h2 className="text-3xl font-bold text-white mb-8">Organizational Structure</h2>
        <div className="space-y-8">
          {[
            {
              role: 'Managing Partner & Chief Robotics Engineer',
              name: 'Lee Akpareva',
              status: 'Confirmed',
              background: 'Robotics Engineering, AI & Cloud Solutions',
              experience: '10+ years robotics, automation & tech leadership',
              responsibilities: 'Fund strategy, technical mentorship, robotics/AI due diligence, portfolio oversight',
              education: 'Robotics Engineering, MSc AI/ML, Financial Analysis'
            },
            {
              role: 'Investment Director',
              name: 'TBD - Recruiting',
              status: 'Open Position',
              background: 'African Markets & VC',
              experience: '8+ years investment experience',
              responsibilities: 'Deal sourcing, due diligence, portfolio management',
              education: 'MBA + Investment Banking background'
            },
            {
              role: 'Technical Partner',
              name: 'TBD - Recruiting',
              status: 'Open Position',
              background: 'CTO/Engineering Leadership',
              experience: 'Scaled tech companies in Africa',
              responsibilities: 'Technical due diligence, portfolio support',
              education: 'Engineering + Startup experience'
            },
            {
              role: 'Operations Manager',
              name: 'TBD - Recruiting',
              status: 'Open Position',
              background: 'Fund Operations',
              experience: '5+ years VC/PE operations',
              responsibilities: 'Legal, compliance, investor reporting',
              education: 'Legal/Finance background'
            }
          ].map((member, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              className="bg-gray-900/50 rounded-xl p-8 border border-gray-700/50"
            >
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">{member.role}</h3>
                  <p className="text-lg text-gray-300 mb-2">{member.name}</p>
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                    member.status === 'Confirmed' ? 'bg-green-500/20 text-green-400' : 'bg-amber-500/20 text-amber-400'
                  }`}>
                    {member.status}
                  </span>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-400 mb-2">Background</h4>
                  <p className="text-white mb-2">{member.background}</p>
                  <p className="text-gray-400 text-sm">{member.experience}</p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-400 mb-2">Responsibilities</h4>
                  <p className="text-gray-300 text-sm">{member.responsibilities}</p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-400 mb-2">Qualifications</h4>
                  <p className="text-gray-300 text-sm">{member.education}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Advisory Board */}
      <div className="bg-gray-800/30 backdrop-blur-sm rounded-3xl p-12 border border-gray-700/30">
        <h2 className="text-3xl font-bold text-white mb-8">Advisory Board (Target)</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              expertise: 'African VC Experience',
              profile: 'Partner at major African VC fund',
              value: 'Market insights, deal flow, network'
            },
            {
              expertise: 'Tech Industry Veteran',
              profile: 'Former CTO of unicorn startup',
              value: 'Technical due diligence, scaling expertise'
            },
            {
              expertise: 'Financial Markets',
              profile: 'Investment banking or PE background',
              value: 'Financial modeling, exit strategies'
            },
            {
              expertise: 'Regulatory & Legal',
              profile: 'African regulatory experience',
              value: 'Compliance, legal structuring'
            },
            {
              expertise: 'Academic Partnership',
              profile: 'University researcher or professor',
              value: 'Research insights, talent pipeline'
            },
            {
              expertise: 'Successful Entrepreneur',
              profile: 'Built and exited African startup',
              value: 'Founder perspective, mentorship'
            }
          ].map((advisor, idx) => (
            <div key={idx} className="bg-gray-900/50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-3">{advisor.expertise}</h3>
              <p className="text-gray-400 text-sm mb-3">{advisor.profile}</p>
              <p className="text-emerald-400 text-sm font-medium">{advisor.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* SWOT Analysis Section */}
      <div className="bg-gradient-to-br from-emerald-500/10 via-blue-500/10 to-purple-500/10 backdrop-blur-sm rounded-3xl p-12 border border-emerald-500/30">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">NAVADA Catalyst – SWOT Analysis</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Strategic assessment of Lee Akpareva's leadership profile and fund positioning
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Strengths */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-emerald-900/30 backdrop-blur-sm rounded-2xl p-8 border border-emerald-500/30"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center">
                <Target className="h-6 w-6 text-emerald-400" />
              </div>
              <h3 className="text-2xl font-bold text-emerald-400">Strengths</h3>
            </div>
            <ul className="space-y-3">
              {[
                "17+ years of cross-industry digital transformation leadership",
                "Expert in AI, Robotics, Python, Azure AI Foundry, and LangChain",
                "Proven experience with Generali, Informa Markets, and global corporates",
                "MBA-level business acumen with technical depth",
                "Hands-on founder mindset — able to design, build, and deploy solutions",
                "Strong network across insurance, fintech, and AI ecosystems",
                "Ability to translate innovation into measurable business outcomes"
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-gray-300">
                  <span className="text-emerald-400 mt-1">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Weaknesses */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-orange-900/30 backdrop-blur-sm rounded-2xl p-8 border border-orange-500/30"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center">
                <Shield className="h-6 w-6 text-orange-400" />
              </div>
              <h3 className="text-2xl font-bold text-orange-400">Weaknesses</h3>
            </div>
            <ul className="space-y-3">
              {[
                "Limited access to long-term institutional funding at current scale",
                "High dependence on founder leadership and personal bandwidth",
                "Early-stage organizational structure — not yet diversified by management layer",
                "Need for external financial governance and legal fund management expertise",
                "Limited public brand awareness outside technology networks"
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-gray-300">
                  <span className="text-orange-400 mt-1">⚠</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Opportunities */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-blue-900/30 backdrop-blur-sm rounded-2xl p-8 border border-blue-500/30"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-blue-400" />
              </div>
              <h3 className="text-2xl font-bold text-blue-400">Opportunities</h3>
            </div>
            <ul className="space-y-3">
              {[
                "Africa's emerging AI and robotics ecosystem is underfunded but rapidly growing",
                "Shift from education investment to innovation investment presents first-mover advantage",
                "Corporate partnerships seeking ethical AI and frontier technology solutions",
                "Potential to scale NAVADA Catalyst into a multi-country venture hub",
                "Growing interest from investors in high-impact, tech-for-good ventures"
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-gray-300">
                  <span className="text-blue-400 mt-1">→</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Threats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-red-900/30 backdrop-blur-sm rounded-2xl p-8 border border-red-500/30"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-red-500/20 rounded-xl flex items-center justify-center">
                <AlertTriangle className="h-6 w-6 text-red-400" />
              </div>
              <h3 className="text-2xl font-bold text-red-400">Threats</h3>
            </div>
            <ul className="space-y-3">
              {[
                "Regulatory uncertainties in African venture funding and data governance",
                "Macroeconomic instability may reduce early-stage funding appetite",
                "Competition from international accelerators entering African markets",
                "Rapid AI evolution requires continuous reskilling and tech reinvestment",
                "Reputation risk if fund transparency or results are not clearly communicated"
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-gray-300">
                  <span className="text-red-400 mt-1">✗</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>

      {/* Fund Financial Model & Profit Distribution */}
      <div className="bg-gray-800/30 backdrop-blur-sm rounded-3xl p-12 border border-gray-700/30">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">Fund Financial Model & Profit Distribution</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Transparent breakdown of fund economics, team compensation, and profit sharing across performance scenarios
          </p>
        </div>

        {/* Fund Parameters */}
        <div className="bg-gradient-to-br from-emerald-500/10 via-blue-500/10 to-purple-500/10 backdrop-blur-sm rounded-2xl p-8 border border-emerald-500/30 mb-12">
          <h3 className="text-2xl font-bold text-white mb-6">Fund Parameters</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-700/50">
              <div className="text-gray-400 text-sm mb-2">Total Fund Size</div>
              <div className="text-3xl font-bold text-emerald-400">£200,000</div>
            </div>
            <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-700/50">
              <div className="text-gray-400 text-sm mb-2">Management Fee</div>
              <div className="text-3xl font-bold text-blue-400">2% Annual</div>
            </div>
            <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-700/50">
              <div className="text-gray-400 text-sm mb-2">Fund Duration</div>
              <div className="text-3xl font-bold text-purple-400">5 Years</div>
            </div>
            <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-700/50">
              <div className="text-gray-400 text-sm mb-2">Carry on Profit</div>
              <div className="text-3xl font-bold text-amber-400">20%</div>
            </div>
          </div>
        </div>

        {/* Team Compensation Structure */}
        <div className="bg-gray-900/30 rounded-2xl p-8 border border-gray-700/50 mb-12">
          <h3 className="text-2xl font-bold text-white mb-6">Team Compensation Structure</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="py-4 px-4 text-emerald-400 font-semibold">Team Member</th>
                  <th className="py-4 px-4 text-emerald-400 font-semibold">Base Salary (Annual)</th>
                  <th className="py-4 px-4 text-emerald-400 font-semibold">Carry Share</th>
                  <th className="py-4 px-4 text-emerald-400 font-semibold">Capital Commitment</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-800">
                  <td className="py-4 px-4 text-white font-medium">Lee Akpareva (Managing Partner)</td>
                  <td className="py-4 px-4 text-gray-300">£15,000</td>
                  <td className="py-4 px-4 text-gray-300">50%</td>
                  <td className="py-4 px-4 text-gray-300">£10,000</td>
                </tr>
                <tr className="border-b border-gray-800">
                  <td className="py-4 px-4 text-white font-medium">Investment Director</td>
                  <td className="py-4 px-4 text-gray-300">£10,000</td>
                  <td className="py-4 px-4 text-gray-300">30%</td>
                  <td className="py-4 px-4 text-gray-300">£0</td>
                </tr>
                <tr className="border-b border-gray-800">
                  <td className="py-4 px-4 text-white font-medium">Technical Partner</td>
                  <td className="py-4 px-4 text-gray-300">£8,000</td>
                  <td className="py-4 px-4 text-gray-300">15%</td>
                  <td className="py-4 px-4 text-gray-300">£0</td>
                </tr>
                <tr>
                  <td className="py-4 px-4 text-white font-medium">Operations Manager</td>
                  <td className="py-4 px-4 text-gray-300">£7,000</td>
                  <td className="py-4 px-4 text-gray-300">5%</td>
                  <td className="py-4 px-4 text-gray-300">£0</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Performance Scenarios */}
        <div className="space-y-8">
          <h3 className="text-2xl font-bold text-white mb-6">Fund Performance Scenarios & Returns</h3>

          {/* Bear Case - 1x */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-br from-orange-900/30 to-gray-900/30 backdrop-blur-sm rounded-2xl p-8 border border-orange-500/30"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h4 className="text-2xl font-bold text-orange-400 mb-2">Bear Case (1x Multiple)</h4>
                <p className="text-gray-400">Fund breaks even - Total Value: £200,000</p>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-400">Total Fund Profit</div>
                <div className="text-3xl font-bold text-orange-400">£0</div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { name: "Lee Akpareva", basePay: 75000, carry: 0, capitalGain: 0, total: 75000 },
                { name: "Investment Director", basePay: 50000, carry: 0, capitalGain: 0, total: 50000 },
                { name: "Technical Partner", basePay: 40000, carry: 0, capitalGain: 0, total: 40000 },
                { name: "Operations Manager", basePay: 35000, carry: 0, capitalGain: 0, total: 35000 }
              ].map((member, idx) => (
                <div key={idx} className="bg-gray-900/50 rounded-xl p-4 border border-orange-500/20">
                  <div className="text-white font-semibold mb-3 text-sm">{member.name}</div>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Base Pay (5yr)</span>
                      <span className="text-gray-300">£{member.basePay.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Carry</span>
                      <span className="text-gray-300">£{member.carry.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Capital Gain</span>
                      <span className="text-gray-300">£{member.capitalGain.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between pt-2 border-t border-gray-700">
                      <span className="text-orange-400 font-semibold">Total Income</span>
                      <span className="text-orange-400 font-bold">£{member.total.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 bg-orange-500/10 rounded-lg p-4 border border-orange-500/30">
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Investor Profit Share (80%)</span>
                <span className="text-orange-400 font-bold text-lg">£0</span>
              </div>
            </div>
          </motion.div>

          {/* Base Case - 2x */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-gradient-to-br from-blue-900/30 to-gray-900/30 backdrop-blur-sm rounded-2xl p-8 border border-blue-500/30"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h4 className="text-2xl font-bold text-blue-400 mb-2">Base Case (2x Multiple)</h4>
                <p className="text-gray-400">Fund doubles - Total Value: £400,000</p>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-400">Total Fund Profit</div>
                <div className="text-3xl font-bold text-blue-400">£200,000</div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { name: "Lee Akpareva", basePay: 75000, carry: 20000, capitalGain: 10000, total: 105000 },
                { name: "Investment Director", basePay: 50000, carry: 12000, capitalGain: 0, total: 62000 },
                { name: "Technical Partner", basePay: 40000, carry: 6000, capitalGain: 0, total: 46000 },
                { name: "Operations Manager", basePay: 35000, carry: 2000, capitalGain: 0, total: 37000 }
              ].map((member, idx) => (
                <div key={idx} className="bg-gray-900/50 rounded-xl p-4 border border-blue-500/20">
                  <div className="text-white font-semibold mb-3 text-sm">{member.name}</div>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Base Pay (5yr)</span>
                      <span className="text-gray-300">£{member.basePay.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Carry</span>
                      <span className="text-gray-300">£{member.carry.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Capital Gain</span>
                      <span className="text-gray-300">£{member.capitalGain.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between pt-2 border-t border-gray-700">
                      <span className="text-blue-400 font-semibold">Total Income</span>
                      <span className="text-blue-400 font-bold">£{member.total.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 bg-blue-500/10 rounded-lg p-4 border border-blue-500/30">
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Investor Profit Share (80%)</span>
                <span className="text-blue-400 font-bold text-lg">£160,000</span>
              </div>
            </div>
          </motion.div>

          {/* Bull Case - 4x */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-gradient-to-br from-emerald-900/30 to-gray-900/30 backdrop-blur-sm rounded-2xl p-8 border border-emerald-500/30"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h4 className="text-2xl font-bold text-emerald-400 mb-2">Bull Case (4x Multiple)</h4>
                <p className="text-gray-400">Fund quadruples - Total Value: £800,000</p>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-400">Total Fund Profit</div>
                <div className="text-3xl font-bold text-emerald-400">£600,000</div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { name: "Lee Akpareva", basePay: 75000, carry: 60000, capitalGain: 30000, total: 165000 },
                { name: "Investment Director", basePay: 50000, carry: 36000, capitalGain: 0, total: 86000 },
                { name: "Technical Partner", basePay: 40000, carry: 18000, capitalGain: 0, total: 58000 },
                { name: "Operations Manager", basePay: 35000, carry: 6000, capitalGain: 0, total: 41000 }
              ].map((member, idx) => (
                <div key={idx} className="bg-gray-900/50 rounded-xl p-4 border border-emerald-500/20">
                  <div className="text-white font-semibold mb-3 text-sm">{member.name}</div>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Base Pay (5yr)</span>
                      <span className="text-gray-300">£{member.basePay.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Carry</span>
                      <span className="text-gray-300">£{member.carry.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Capital Gain</span>
                      <span className="text-gray-300">£{member.capitalGain.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between pt-2 border-t border-gray-700">
                      <span className="text-emerald-400 font-semibold">Total Income</span>
                      <span className="text-emerald-400 font-bold">£{member.total.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 bg-emerald-500/10 rounded-lg p-4 border border-emerald-500/30">
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Investor Profit Share (80%)</span>
                <span className="text-emerald-400 font-bold text-lg">£480,000</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Key Notes */}
        <div className="mt-12 bg-gray-900/50 rounded-xl p-6 border border-gray-700/50">
          <h4 className="text-lg font-bold text-white mb-4">Key Financial Notes</h4>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li className="flex items-start gap-2">
              <span className="text-emerald-400 mt-1">•</span>
              <span><strong className="text-white">Carry Pool:</strong> 20% of fund profit is distributed among team members based on their carry share percentages</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-400 mt-1">•</span>
              <span><strong className="text-white">Investor Returns:</strong> 80% of all fund profits go to Limited Partners (LPs)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-400 mt-1">•</span>
              <span><strong className="text-white">Base Salaries:</strong> Funded from management fees (2% annual on £200K = £4K/year = £20K over 5 years)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-400 mt-1">•</span>
              <span><strong className="text-white">Lee's Capital:</strong> £10,000 personal investment demonstrates founder commitment and alignment with LPs</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-400 mt-1">•</span>
              <span><strong className="text-white">Performance Alignment:</strong> Team compensation heavily weighted toward carry ensures alignment with fund success</span>
            </li>
          </ul>
        </div>

        {/* Interactive Visualizations */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Team Income by Scenario Chart */}
          <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-700/50">
            <h4 className="text-xl font-bold text-white mb-6">Team Income by Scenario</h4>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={[
                  { member: "Lee Akpareva", "Bear Case": 75000, "Base Case": 105000, "Bull Case": 165000 },
                  { member: "Investment Director", "Bear Case": 50000, "Base Case": 62000, "Bull Case": 86000 },
                  { member: "Technical Partner", "Bear Case": 40000, "Base Case": 46000, "Bull Case": 58000 },
                  { member: "Operations Manager", "Bear Case": 35000, "Base Case": 37000, "Bull Case": 41000 }
                ]}
                margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
                <XAxis
                  dataKey="member"
                  stroke="#9CA3AF"
                  angle={-45}
                  textAnchor="end"
                  height={80}
                  tick={{ fontSize: 11 }}
                />
                <YAxis
                  stroke="#9CA3AF"
                  tickFormatter={(value) => `£${(value / 1000).toFixed(0)}K`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1F2937',
                    border: '1px solid #374151',
                    borderRadius: '8px',
                    color: '#fff'
                  }}
                  formatter={(value) => `£${value.toLocaleString()}`}
                />
                <Legend
                  wrapperStyle={{ paddingTop: '20px' }}
                  iconType="square"
                />
                <Bar dataKey="Bear Case" fill="#ef4444" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Base Case" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Bull Case" fill="#22c55e" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
            <p className="text-gray-400 text-xs mt-4 text-center">
              Total income over 5-year fund life including base salary, carry, and capital gains
            </p>
          </div>

          {/* Investor Profit by Scenario Chart */}
          <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-700/50">
            <h4 className="text-xl font-bold text-white mb-6">Investor Profit by Scenario</h4>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={[
                  { scenario: "Bear Case", profit: 0 },
                  { scenario: "Base Case", profit: 160000 },
                  { scenario: "Bull Case", profit: 480000 }
                ]}
                margin={{ top: 20, right: 30, left: 20, bottom: 40 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
                <XAxis
                  dataKey="scenario"
                  stroke="#9CA3AF"
                />
                <YAxis
                  stroke="#9CA3AF"
                  tickFormatter={(value) => `£${(value / 1000).toFixed(0)}K`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1F2937',
                    border: '1px solid #374151',
                    borderRadius: '8px',
                    color: '#fff'
                  }}
                  formatter={(value) => `£${value.toLocaleString()}`}
                />
                <Bar dataKey="profit" fill="#10b981" radius={[8, 8, 0, 0]}>
                  {[
                    { scenario: "Bear Case", profit: 0 },
                    { scenario: "Base Case", profit: 160000 },
                    { scenario: "Bull Case", profit: 480000 }
                  ].map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={index === 0 ? '#ef4444' : index === 1 ? '#3b82f6' : '#10b981'}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
            <p className="text-gray-400 text-xs mt-4 text-center">
              LP profit share (80% of total fund profit) across performance scenarios
            </p>
          </div>
        </div>

        {/* Comparative Summary Table */}
        <div className="mt-12 bg-gradient-to-br from-emerald-500/10 via-blue-500/10 to-purple-500/10 backdrop-blur-sm rounded-2xl p-8 border border-emerald-500/30">
          <h4 className="text-xl font-bold text-white mb-6">Scenario Comparison Summary</h4>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="py-3 px-4 text-emerald-400 font-semibold">Metric</th>
                  <th className="py-3 px-4 text-orange-400 font-semibold">Bear Case (1x)</th>
                  <th className="py-3 px-4 text-blue-400 font-semibold">Base Case (2x)</th>
                  <th className="py-3 px-4 text-emerald-400 font-semibold">Bull Case (4x)</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-800">
                  <td className="py-3 px-4 text-gray-300">Fund Value</td>
                  <td className="py-3 px-4 text-white">£200,000</td>
                  <td className="py-3 px-4 text-white">£400,000</td>
                  <td className="py-3 px-4 text-white">£800,000</td>
                </tr>
                <tr className="border-b border-gray-800">
                  <td className="py-3 px-4 text-gray-300">Total Profit</td>
                  <td className="py-3 px-4 text-white">£0</td>
                  <td className="py-3 px-4 text-white">£200,000</td>
                  <td className="py-3 px-4 text-white">£600,000</td>
                </tr>
                <tr className="border-b border-gray-800">
                  <td className="py-3 px-4 text-gray-300">Team Carry Pool (20%)</td>
                  <td className="py-3 px-4 text-white">£0</td>
                  <td className="py-3 px-4 text-white">£40,000</td>
                  <td className="py-3 px-4 text-white">£120,000</td>
                </tr>
                <tr className="border-b border-gray-800">
                  <td className="py-3 px-4 text-gray-300">Investor Returns (80%)</td>
                  <td className="py-3 px-4 text-white">£0</td>
                  <td className="py-3 px-4 text-white">£160,000</td>
                  <td className="py-3 px-4 text-white">£480,000</td>
                </tr>
                <tr className="border-b border-gray-800">
                  <td className="py-3 px-4 text-gray-300">Lee Total Income</td>
                  <td className="py-3 px-4 text-white">£75,000</td>
                  <td className="py-3 px-4 text-white">£105,000</td>
                  <td className="py-3 px-4 text-white">£165,000</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-gray-300">Total Team Compensation</td>
                  <td className="py-3 px-4 text-white">£200,000</td>
                  <td className="py-3 px-4 text-white">£250,000</td>
                  <td className="py-3 px-4 text-white">£350,000</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </motion.div>
  );

  const renderTransparency = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="space-y-16"
    >
      <div className="text-center">
        <h1 className="text-5xl font-bold text-white mb-6">Transparency & Governance</h1>
        <p className="text-xl text-gray-400 max-w-3xl mx-auto">
          Industry-leading transparency through blockchain technology and comprehensive reporting
        </p>
      </div>

      {/* Governance Framework */}
      <div className="bg-gray-800/30 backdrop-blur-sm rounded-3xl p-12 border border-gray-700/30">
        <h2 className="text-3xl font-bold text-white mb-8">Governance Structure</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-white mb-4">Fund Governance</h3>
            {[
              {
                aspect: 'Investment Committee',
                details: '3-person committee for all investments >£5K'
              },
              {
                aspect: 'LP Advisory Board',
                details: 'Quarterly meetings with major investors'
              },
              {
                aspect: 'Independent Audits',
                details: 'Annual audits by Big 4 accounting firm'
              },
              {
                aspect: 'Regulatory Compliance',
                details: 'FCA registration and ongoing compliance'
              },
              {
                aspect: 'ESG Framework',
                details: 'UN PRI signatory with ESG integration'
              }
            ].map((item, idx) => (
              <div key={idx} className="bg-gray-900/50 rounded-xl p-6">
                <h4 className="text-lg font-semibold text-white mb-2">{item.aspect}</h4>
                <p className="text-gray-400">{item.details}</p>
              </div>
            ))}
          </div>

          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-white mb-4">Reporting Standards</h3>
            {[
              {
                report: 'Monthly LP Updates',
                content: 'Portfolio performance, new investments, market insights'
              },
              {
                report: 'Quarterly Financials',
                content: 'Detailed P&L, NAV calculations, cash flows'
              },
              {
                report: 'Annual Impact Report',
                content: 'ESG metrics, job creation, SDG alignment'
              },
              {
                report: 'Real-time Dashboard',
                content: 'Live portfolio tracking and performance metrics'
              },
              {
                report: 'Blockchain Ledger',
                content: 'Immutable record of all fund transactions'
              }
            ].map((item, idx) => (
              <div key={idx} className="bg-gray-900/50 rounded-xl p-6">
                <h4 className="text-lg font-semibold text-white mb-2">{item.report}</h4>
                <p className="text-gray-400">{item.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Technology Infrastructure */}
      <div className="bg-gray-800/30 backdrop-blur-sm rounded-3xl p-12 border border-gray-700/30">
        <h2 className="text-3xl font-bold text-white mb-8">Technology Stack</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              category: 'Blockchain Layer',
              technologies: ['Ethereum/Polygon', 'Smart Contracts', 'IPFS Storage', 'Web3 Integration'],
              purpose: 'Immutable transaction records'
            },
            {
              category: 'Data Analytics',
              technologies: ['Real-time Dashboards', 'ML-powered Insights', 'Risk Monitoring', 'Performance Tracking'],
              purpose: 'Investment intelligence'
            },
            {
              category: 'Reporting Platform',
              technologies: ['Automated Reports', 'LP Portal', 'Mobile Access', 'API Integration'],
              purpose: 'Stakeholder communication'
            },
            {
              category: 'Security Framework',
              technologies: ['Multi-sig Wallets', 'Encryption', 'Access Controls', 'Audit Trails'],
              purpose: 'Asset protection'
            },
            {
              category: 'Compliance Tools',
              technologies: ['KYC/AML', 'Regulatory Reporting', 'Tax Optimization', 'Legal Documentation'],
              purpose: 'Regulatory adherence'
            },
            {
              category: 'Portfolio Management',
              technologies: ['Due Diligence Tools', 'Portfolio Tracking', 'Exit Planning', 'Valuation Models'],
              purpose: 'Investment lifecycle'
            }
          ].map((tech, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              className="bg-gray-900/50 rounded-xl p-6"
            >
              <h3 className="text-lg font-semibold text-white mb-3">{tech.category}</h3>
              <p className="text-emerald-400 text-sm font-medium mb-3">{tech.purpose}</p>
              <ul className="space-y-1">
                {tech.technologies.map((item, techIdx) => (
                  <li key={techIdx} className="text-gray-400 text-sm flex items-center">
                    <span className="text-emerald-400 mr-2">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );

  const renderAIAssistant = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen flex items-center justify-center py-12 px-4"
    >
      <div className="max-w-7xl w-full space-y-6">
        {/* Header */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="inline-block p-4 bg-gradient-to-br from-emerald-500/20 to-blue-500/20 rounded-2xl mb-4"
          >
            <Brain className="h-12 w-12 text-emerald-400" />
          </motion.div>
          <h1 className="text-4xl font-bold text-white mb-2">AI Investment Advisor</h1>
          <p className="text-gray-400">Powered by GPT-4 • RAG Enabled • Document Analysis</p>
        </div>

        {/* Chat Interface */}
        <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 backdrop-blur-xl rounded-3xl border border-gray-700/50 shadow-2xl p-6">
          {/* Uploaded Documents Bar */}
          {uploadedDocs.length > 0 && (
            <div className="mb-4 p-3 bg-emerald-500/10 rounded-xl border border-emerald-500/30">
              <div className="flex items-center gap-2 mb-2">
                <Database className="h-4 w-4 text-emerald-400" />
                <span className="text-sm text-emerald-400 font-semibold">RAG Context ({uploadedDocs.length} docs)</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {uploadedDocs.map((doc, idx) => (
                  <div key={idx} className="px-3 py-1 bg-gray-800/50 rounded-full text-xs text-gray-300 flex items-center gap-2">
                    <span>{doc.name}</span>
                    <button
                      onClick={() => setUploadedDocs(prev => prev.filter((_, i) => i !== idx))}
                      className="text-red-400 hover:text-red-300"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="h-[600px] overflow-y-auto mb-6 space-y-4">
            <AnimatePresence>
              {messages.map((message, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[80%] rounded-xl p-4 ${
                    message.role === 'user'
                      ? 'bg-emerald-600 text-white'
                      : 'bg-gray-800 text-gray-100 border border-gray-700'
                  }`}>
                    {message.role === 'assistant' && (
                      <div className="flex items-center mb-2">
                        <Brain className="h-4 w-4 text-emerald-400 mr-2" />
                        <span className="text-xs text-emerald-400 font-medium">NAVADA AI Advisor</span>
                      </div>
                    )}
                    <div className="text-sm leading-relaxed prose prose-invert max-w-none">
                      {message.content.split('```').map((block, blockIdx) => {
                        if (blockIdx % 2 === 1) {
                          // Code block
                          const lines = block.split('\n');
                          const language = lines[0].trim();
                          const code = lines.slice(1).join('\n');
                          return (
                            <div key={blockIdx} className="my-2">
                              <div className="bg-gray-900/80 rounded-lg border border-gray-700 overflow-hidden">
                                {language && (
                                  <div className="bg-gray-800 px-4 py-2 text-xs text-emerald-400 font-mono border-b border-gray-700">
                                    {language}
                                  </div>
                                )}
                                <pre className="p-4 overflow-x-auto">
                                  <code className="text-xs text-gray-200 font-mono">{code}</code>
                                </pre>
                              </div>
                            </div>
                          );
                        } else {
                          // Regular text
                          return <span key={blockIdx}>{block}</span>;
                        }
                      })}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {isLoading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-start"
              >
                <div className="bg-gray-800 border border-gray-700 rounded-xl p-4 max-w-[80%]">
                  <div className="flex items-center mb-2">
                    <Brain className="h-4 w-4 text-emerald-400 mr-2" />
                    <span className="text-xs text-emerald-400 font-medium">NAVADA AI Advisor</span>
                  </div>
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </motion.div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="flex gap-3">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              accept=".pdf,.txt,.doc,.docx"
              multiple
              className="hidden"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => fileInputRef.current?.click()}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-xl transition-colors duration-200 flex items-center gap-2"
              title="Upload documents for RAG"
            >
              <Database className="h-4 w-4" />
              <span className="text-sm">Upload</span>
            </motion.button>
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && !isLoading && handleSendMessage()}
              placeholder="Ask about IRR calculations, market analysis, or upload documents..."
              className="flex-1 bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
              disabled={isLoading}
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSendMessage}
              disabled={isLoading || !inputMessage.trim()}
              className="bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-white px-6 py-3 rounded-xl transition-colors duration-200 flex items-center"
            >
              <Send className="h-4 w-4" />
            </motion.button>
          </div>
        </div>

        {/* Quick Start Prompts */}
        <div className="flex flex-wrap gap-2 justify-center pt-4">
          {[
            "IRR analysis",
            "Market sizing",
            "Due diligence",
            "Exit strategies"
          ].map((prompt, idx) => (
            <motion.button
              key={idx}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setInputMessage(`Explain ${prompt} for African tech investments`)}
              className="px-4 py-2 bg-gray-800/50 hover:bg-emerald-600/20 border border-gray-700/50 hover:border-emerald-500/50 rounded-full text-sm text-gray-300 hover:text-emerald-400 transition-all duration-200"
            >
              {prompt}
            </motion.button>
          ))}
        </div>
      </div>
    </motion.div>
  );

  const renderFAQ = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="space-y-16"
    >
      <div className="text-center">
        <h1 className="text-5xl font-bold text-white mb-6">Frequently Asked Questions</h1>
        <p className="text-xl text-gray-400 max-w-3xl mx-auto">
          Understanding venture capital terminology, investment principles, and our monitoring framework
        </p>
      </div>

      {/* Corporate Finance Terms */}
      <div className="bg-gray-800/30 backdrop-blur-sm rounded-3xl p-12 border border-gray-700/30 shadow-2xl shadow-blue-500/10 hover:shadow-blue-500/20 transition-all duration-300">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 bg-blue-500/10 rounded-lg">
            <BarChart3 className="h-6 w-6 text-blue-400" />
          </div>
          <h2 className="text-3xl font-bold text-white">Corporate Finance Terms</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {[
            {
              term: 'IRR (Internal Rate of Return)',
              definition: 'The annualized rate of return on an investment. A 35% IRR means your investment grows at 35% per year on average.',
              example: 'If we invest £100K and exit at £500K in 5 years, the IRR is approximately 38%.',
              color: 'emerald'
            },
            {
              term: 'DPI (Distributions to Paid-In)',
              definition: 'A measure of actual cash returned to investors relative to capital invested. A DPI of 4.5x means investors receive £4.50 for every £1 invested.',
              example: 'Our target 4.5x DPI means a £200K fund aims to return £900K to LPs.',
              color: 'blue'
            },
            {
              term: 'Series A & Series B',
              definition: 'Funding rounds for startups. Series A typically for companies with proven product-market fit ($100K-$2M ARR), Series B for scaling companies ($2M-$10M ARR).',
              example: 'We focus 70% on Series A (£8-12K tickets) and 30% on Series B (£15-18K tickets).',
              color: 'purple'
            },
            {
              term: 'ARR (Annual Recurring Revenue)',
              definition: 'The yearly value of recurring revenue from subscriptions or contracts. Key metric for SaaS companies.',
              example: 'A company with 100 customers paying £1,000/month has £1.2M ARR.',
              color: 'amber'
            },
            {
              term: 'TAM, SAM, SOM',
              definition: 'Total Addressable Market (global), Serviceable Addressable Market (reachable), Serviceable Obtainable Market (realistic capture).',
              example: 'African FinTech: TAM $50B, SAM $5B (our target markets), SOM $500M (realistic 5-year capture).',
              color: 'emerald'
            },
            {
              term: 'Unit Economics',
              definition: 'The revenue and costs associated with a single customer or unit. Positive unit economics means profit per customer.',
              example: 'CAC (Customer Acquisition Cost) £50, LTV (Lifetime Value) £300 = healthy 6:1 ratio.',
              color: 'blue'
            },
            {
              term: 'Burn Rate',
              definition: 'The rate at which a company spends cash reserves monthly. Critical for runway calculation.',
              example: 'Monthly burn of £50K with £600K in bank = 12 months runway.',
              color: 'purple'
            },
            {
              term: 'Pro-rata Rights',
              definition: 'The right to maintain ownership percentage in future funding rounds by investing proportionally.',
              example: 'If we own 10% and company raises Series B, we can invest to maintain our 10% stake.',
              color: 'amber'
            },
            {
              term: 'Carried Interest (Carry)',
              definition: 'The share of profits that fund managers receive. Standard is 20% of profits after returning capital to LPs.',
              example: 'On £700K profit, LPs get £560K (80%) and fund managers get £140K (20%).',
              color: 'emerald'
            },
            {
              term: 'Follow-on Investment',
              definition: 'Additional capital invested in existing portfolio companies in subsequent funding rounds.',
              example: 'We reserve 30% of our fund (£60K) for follow-on investments in our best performers.',
              color: 'blue'
            },
            {
              term: 'NPV (Net Present Value)',
              definition: 'The present value of future cash flows minus initial investment. Positive NPV means the investment is profitable. Uses discount rate to account for time value of money.',
              example: 'Invest $200K today for $450K in 5 years at 15% discount rate = NPV of $23,730.',
              color: 'purple'
            },
            {
              term: 'Discount Rate',
              definition: 'The rate used to calculate present value of future cash flows. Reflects investment risk and opportunity cost. Higher risk = higher discount rate.',
              example: 'African tech ventures typically use 15-25% discount rates vs. 8-12% for US markets due to higher risk.',
              color: 'amber'
            },
            {
              term: 'WACC (Weighted Average Cost of Capital)',
              definition: 'The average rate a company pays to finance its assets. Blends cost of equity and debt weighted by capital structure.',
              example: 'Company with 70% equity (15% cost) and 30% debt (8% cost) = WACC of 12.9%.',
              color: 'emerald'
            },
            {
              term: 'EBITDA',
              definition: 'Earnings Before Interest, Taxes, Depreciation, and Amortization. Core operational profitability measure that strips out financing and accounting decisions.',
              example: 'Revenue $5M, COGS $2M, OpEx $1.5M = $1.5M EBITDA (30% margin).',
              color: 'blue'
            },
            {
              term: 'Cap Table (Capitalization Table)',
              definition: 'Spreadsheet showing ownership breakdown of a company. Lists all shareholders, their equity stakes, valuations, and dilution across funding rounds.',
              example: 'Post-Series A: Founders 60%, Angels 10%, Series A investors 25%, Employee pool 5%.',
              color: 'purple'
            },
            {
              term: 'Liquidation Preference',
              definition: 'The priority order and multiplier for investor payouts during exit. 1x preference means investors get their money back before others.',
              example: 'With 1x liquidation preference on $2M investment, investor gets first $2M in any exit.',
              color: 'amber'
            },
            {
              term: 'Dilution',
              definition: 'The reduction in ownership percentage when new shares are issued. Existing shareholders own a smaller piece of a (hopefully) bigger pie.',
              example: 'You own 10% of 1M shares. Company issues 250K new shares for Series B. Your ownership becomes 8% (10% × 1M / 1.25M).',
              color: 'emerald'
            },
            {
              term: 'Pre-money vs. Post-money Valuation',
              definition: 'Pre-money is company value before investment. Post-money is value after. Post-money = Pre-money + Investment amount.',
              example: '$8M pre-money + $2M investment = $10M post-money. Investor owns 20% ($2M / $10M).',
              color: 'blue'
            },
            {
              term: 'Runway',
              definition: 'How long a company can operate before running out of cash. Calculated as cash reserves divided by monthly burn rate.',
              example: '$600K in bank, $50K monthly burn = 12 months runway. Need to raise Series A in 9 months.',
              color: 'purple'
            },
            {
              term: 'LTV:CAC Ratio',
              definition: 'Lifetime Value to Customer Acquisition Cost ratio. Measures long-term profitability of acquiring customers. Healthy SaaS companies target 3:1 or higher.',
              example: 'LTV $900, CAC $150 = 6:1 ratio. Excellent unit economics for scaling.',
              color: 'amber'
            },
            {
              term: 'Payback Period',
              definition: 'Time required to recover Customer Acquisition Cost from customer revenue. Shorter is better for cash efficiency.',
              example: 'CAC $300, monthly revenue/customer $50 = 6 month payback period.',
              color: 'emerald'
            },
            {
              term: 'Churn Rate',
              definition: 'Percentage of customers who stop subscribing monthly or annually. Critical metric for recurring revenue businesses.',
              example: 'Start with 1000 customers, lose 50 in a month = 5% monthly churn (60% annual). Needs improvement.',
              color: 'blue'
            },
            {
              term: 'Rule of 40',
              definition: 'For SaaS companies: Revenue growth rate + Profit margin should exceed 40%. Balances growth and profitability.',
              example: '50% YoY growth + 10% profit margin = 60 (exceeds Rule of 40). Healthy SaaS metrics.',
              color: 'purple'
            }
          ].map((item, idx) => {
            const glowColors = {
              emerald: 'border-emerald-500/20 shadow-emerald-500/10 hover:shadow-emerald-500/20',
              blue: 'border-blue-500/20 shadow-blue-500/10 hover:shadow-blue-500/20',
              purple: 'border-purple-500/20 shadow-purple-500/10 hover:shadow-purple-500/20',
              amber: 'border-amber-500/20 shadow-amber-500/10 hover:shadow-amber-500/20'
            };
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05, duration: 0.6 }}
                className={`bg-gray-900/50 rounded-xl p-6 border shadow-lg transition-all duration-300 ${glowColors[item.color]}`}
              >
                <h3 className="text-xl font-bold text-white mb-3">{item.term}</h3>
                <p className="text-gray-300 mb-3 text-sm leading-relaxed">{item.definition}</p>
                <div className="bg-gray-800/50 rounded-lg p-3 border border-gray-700/50">
                  <div className="text-xs text-gray-500 mb-1">Example:</div>
                  <div className="text-sm text-emerald-400">{item.example}</div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Investment Principles */}
      <div className="bg-gray-800/30 backdrop-blur-sm rounded-3xl p-12 border border-gray-700/30 shadow-2xl shadow-emerald-500/10 hover:shadow-emerald-500/20 transition-all duration-300">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 bg-emerald-500/10 rounded-lg">
            <Target className="h-6 w-6 text-emerald-400" />
          </div>
          <h2 className="text-3xl font-bold text-white">Investment Principles & Philosophy</h2>
        </div>

        <div className="space-y-6">
          {[
            {
              principle: 'Why Africa? Why Now?',
              explanation: 'Africa has the world\'s youngest population (median age 19), fastest-growing mobile penetration (600M+ smartphones by 2025), and massive infrastructure gaps that technology can solve. We\'re investing at the inflection point where talent, capital, and market readiness converge.',
              stats: ['1.4B population', '60% under 25', '$30B tech market by 2030'],
              color: 'emerald'
            },
            {
              principle: 'Power Law Returns',
              explanation: 'Venture capital follows a power law distribution: 10% of investments typically generate 90% of returns. We build a diversified portfolio (25 companies) knowing that 2-3 breakout winners will drive fund performance, while most will fail or return modest multiples.',
              stats: ['10% unicorns', '20% moderate exits', '70% losses/zombies'],
              color: 'blue'
            },
            {
              principle: 'Stage Focus: Series A & B',
              explanation: 'We invest post-product-market fit to reduce risk while capturing significant upside. Series A companies have proven their model works; our capital helps them scale. This "sweet spot" balances risk-return better than seed (too risky) or late-stage (limited upside).',
              stats: ['70% Series A', '30% Series B', '£8-18K tickets'],
              color: 'purple'
            },
            {
              principle: 'Sector Thesis: Robotics, AI & Cloud',
              explanation: 'We focus on deep tech solving critical infrastructure challenges in agriculture, manufacturing, and logistics. Our robotics engineering expertise provides unique value-add. These sectors have defensible moats through IP, hardware integration, and technical complexity.',
              stats: ['25% AI & Cloud', '20% Robotics', '55% other sectors'],
              color: 'amber'
            },
            {
              principle: 'Hands-On Value Creation',
              explanation: 'We\'re not passive investors. With robotics engineering background and cloud expertise, we provide technical mentorship, help build engineering teams, optimize infrastructure, and open doors to customers and follow-on investors. Our portfolio companies get a technical co-pilot.',
              stats: ['12+ check-ins/year', '20+ intros/year', 'Monthly reviews'],
              color: 'emerald'
            },
            {
              principle: 'Follow-on Strategy',
              explanation: 'We reserve 30% of capital for doubling down on winners. This allows us to maintain ownership in breakout companies, support them through growth challenges, and maximize returns on our best bets. Pro-rata rights are non-negotiable in our term sheets.',
              stats: ['30% reserved', 'Pro-rata rights', '2-3 follow-ons/company'],
              color: 'blue'
            }
          ].map((item, idx) => {
            const glowColors = {
              emerald: 'border-emerald-500/20 shadow-emerald-500/10 hover:shadow-emerald-500/20',
              blue: 'border-blue-500/20 shadow-blue-500/10 hover:shadow-blue-500/20',
              purple: 'border-purple-500/20 shadow-purple-500/10 hover:shadow-purple-500/20',
              amber: 'border-amber-500/20 shadow-amber-500/10 hover:shadow-amber-500/20'
            };
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.6 }}
                className={`bg-gray-900/50 rounded-xl p-8 border shadow-lg transition-all duration-300 ${glowColors[item.color]}`}
              >
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-2xl font-bold text-white">{item.principle}</h3>
                  <div className="flex gap-2">
                    {item.stats.map((stat, i) => (
                      <span key={i} className={`px-3 py-1 rounded-full text-xs font-semibold bg-${item.color}-500/20 text-${item.color}-400`}>
                        {stat}
                      </span>
                    ))}
                  </div>
                </div>
                <p className="text-gray-300 leading-relaxed">{item.explanation}</p>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Fraud Prevention & Monitoring */}
      <div className="bg-gray-800/30 backdrop-blur-sm rounded-3xl p-12 border border-gray-700/30 shadow-2xl shadow-purple-500/10 hover:shadow-purple-500/20 transition-all duration-300">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 bg-purple-500/10 rounded-lg">
            <Shield className="h-6 w-6 text-purple-400" />
          </div>
          <h2 className="text-3xl font-bold text-white">Fraud Prevention & Financial Monitoring</h2>
        </div>

        <div className="mb-12">
          <p className="text-xl text-gray-300 leading-relaxed mb-6">
            Every portfolio company is subject to rigorous financial monitoring and fraud prevention protocols. We track spend, verify expenditures, and maintain oversight to protect investor capital and ensure responsible deployment of funds.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 rounded-xl p-8 border border-emerald-500/20 shadow-lg shadow-emerald-500/10 hover:shadow-emerald-500/20 transition-all duration-300">
            <h3 className="text-2xl font-bold text-white mb-6">Monthly Financial Reviews</h3>
            <ul className="space-y-4">
              {[
                'Bank statement reconciliation and cash flow analysis',
                'Budget vs. actual spend variance tracking',
                'Burn rate monitoring and runway calculations',
                'Vendor payment verification and approval',
                'Expense categorization and anomaly detection',
                'Cap table updates and dilution tracking'
              ].map((item, i) => (
                <li key={i} className="text-gray-300 flex items-start">
                  <span className="text-emerald-400 mr-3 mt-1">•</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-gradient-to-br from-blue-500/10 to-blue-500/5 rounded-xl p-8 border border-blue-500/20 shadow-lg shadow-blue-500/10 hover:shadow-blue-500/20 transition-all duration-300">
            <h3 className="text-2xl font-bold text-white mb-6">Fraud Prevention Controls</h3>
            <ul className="space-y-4">
              {[
                'Dual authorization required for transfers >£5K',
                'Board approval for any non-budgeted spend >£10K',
                'Quarterly independent financial audits',
                'Real-time access to company bank accounts',
                'Vendor background checks and verification',
                'Related-party transaction disclosure requirements'
              ].map((item, i) => (
                <li key={i} className="text-gray-300 flex items-start">
                  <span className="text-blue-400 mr-3 mt-1">•</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-900/50 rounded-xl p-6 border border-purple-500/20 shadow-lg shadow-purple-500/10 hover:shadow-purple-500/20 transition-all duration-300">
            <div className="text-purple-400 text-sm font-semibold mb-2">MONITORING FREQUENCY</div>
            <div className="text-white text-3xl font-bold mb-2">Monthly</div>
            <p className="text-gray-400 text-sm">Detailed financial reviews with management team and board oversight</p>
          </div>

          <div className="bg-gray-900/50 rounded-xl p-6 border border-purple-500/20 shadow-lg shadow-purple-500/10 hover:shadow-purple-500/20 transition-all duration-300">
            <div className="text-purple-400 text-sm font-semibold mb-2">APPROVAL THRESHOLD</div>
            <div className="text-white text-3xl font-bold mb-2">£10K</div>
            <p className="text-gray-400 text-sm">Board approval required for any unbudgeted expenditure above threshold</p>
          </div>

          <div className="bg-gray-900/50 rounded-xl p-6 border border-purple-500/20 shadow-lg shadow-purple-500/10 hover:shadow-purple-500/20 transition-all duration-300">
            <div className="text-purple-400 text-sm font-semibold mb-2">AUDIT CYCLE</div>
            <div className="text-white text-3xl font-bold mb-2">Quarterly</div>
            <p className="text-gray-400 text-sm">Independent financial audits to verify reporting accuracy and compliance</p>
          </div>
        </div>

        <div className="mt-12 bg-gradient-to-br from-amber-500/10 to-amber-500/5 rounded-xl p-8 border border-amber-500/20">
          <h3 className="text-xl font-bold text-white mb-4">Red Flags & Escalation Protocol</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="text-sm font-semibold text-amber-400 mb-3">Automatic Triggers:</div>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>• Burn rate exceeds budget by &gt;20%</li>
                <li>• Unexplained vendor payments or patterns</li>
                <li>• Missing or delayed financial reporting</li>
                <li>• Unauthorized related-party transactions</li>
              </ul>
            </div>
            <div>
              <div className="text-sm font-semibold text-amber-400 mb-3">Response Actions:</div>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>• Immediate management discussion</li>
                <li>• Enhanced monitoring (weekly reviews)</li>
                <li>• Third-party forensic audit if needed</li>
                <li>• Board intervention and corrective action plan</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );

  const renderContact = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="space-y-16"
    >
      <div className="text-center">
        <h1 className="text-5xl font-bold text-white mb-6">Get In Touch</h1>
        <p className="text-xl text-gray-400 max-w-3xl mx-auto">
          Connect with NAVADA Nexus for investment opportunities, partnerships, and strategic discussions
        </p>
      </div>

      {/* Contact Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Contact Information */}
        <div className="bg-gray-800/30 backdrop-blur-sm rounded-3xl p-12 border border-gray-700/30">
          <h2 className="text-3xl font-bold text-white mb-8">Contact Information</h2>
          <div className="space-y-8">
            {[
              {
                icon: Mail,
                label: 'Email',
                value: process.env.REACT_APP_CONTACT_EMAIL || 'hello@navada.vc',
                action: 'Send Email'
              },
              {
                icon: Phone,
                label: 'Phone',
                value: process.env.REACT_APP_CONTACT_PHONE || '+44 20 7946 0958',
                action: 'Schedule Call'
              },
              {
                icon: MapPin,
                label: 'Headquarters',
                value: 'London, United Kingdom',
                action: 'View Location'
              },
              {
                icon: Globe,
                label: 'Website',
                value: 'www.navada.vc',
                action: 'Visit Site'
              }
            ].map((contact, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.6 }}
                className="flex items-center gap-6 p-6 bg-gray-900/50 rounded-xl border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300"
              >
                <div className="bg-emerald-500/10 p-4 rounded-xl">
                  <contact.icon className="h-6 w-6 text-emerald-400" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-400">{contact.label}</p>
                  <p className="text-lg text-white font-semibold">{contact.value}</p>
                </div>
                <button className="text-emerald-400 hover:text-emerald-300 font-medium text-sm transition-colors">
                  {contact.action}
                </button>
              </motion.div>
            ))}
          </div>

          {/* Investment Timeline */}
          <div className="mt-12 p-8 bg-gradient-to-r from-emerald-500/10 to-blue-500/10 rounded-xl border border-emerald-500/20">
            <h3 className="text-xl font-bold text-white mb-4">Investment Timeline</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Fund Launch</span>
                <span className="text-emerald-400 font-semibold">
                  {process.env.REACT_APP_FUND_LAUNCH_QUARTER} {process.env.REACT_APP_FUND_LAUNCH_YEAR}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">First Investments</span>
                <span className="text-white font-semibold">Q1 2027</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Full Deployment</span>
                <span className="text-white font-semibold">Q4 2028</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-8">
          <div className="bg-gray-800/30 backdrop-blur-sm rounded-3xl p-12 border border-gray-700/30">
            <h2 className="text-3xl font-bold text-white mb-8">Quick Actions</h2>
            <div className="space-y-4">
              {[
                {
                  title: 'Download Investment Deck',
                  description: 'Comprehensive overview of our investment strategy and market opportunity',
                  action: 'Download PDF',
                  color: 'emerald',
                  onClick: handleDownloadDeck
                },
                {
                  title: 'Schedule Meeting',
                  description: 'Book a call to discuss investment opportunities and partnership potential',
                  action: 'Book Call',
                  color: 'blue',
                  onClick: () => setShowCalendar(true)
                },
                {
                  title: 'Portfolio Application',
                  description: 'Submit your startup for consideration in our investment pipeline',
                  action: 'Apply Now',
                  color: 'purple',
                  onClick: () => setShowPortfolioApp(true)
                },
                {
                  title: 'Investor Relations',
                  description: 'Access LP portal and quarterly reports (authorized investors only)',
                  action: 'LP Portal',
                  color: 'amber',
                  onClick: () => setShowInvestorPortal(true)
                }
              ].map((action, idx) => {
                const colorClasses = {
                  emerald: { hover: 'hover:bg-emerald-500/10 hover:border-emerald-500/50', text: 'text-emerald-400' },
                  blue: { hover: 'hover:bg-blue-500/10 hover:border-blue-500/50', text: 'text-blue-400' },
                  purple: { hover: 'hover:bg-purple-500/10 hover:border-purple-500/50', text: 'text-purple-400' },
                  amber: { hover: 'hover:bg-amber-500/10 hover:border-amber-500/50', text: 'text-amber-400' }
                };
                const colors = colorClasses[action.color];

                return (
                  <motion.button
                    key={idx}
                    onClick={action.onClick}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full text-left p-6 bg-gray-900/50 border border-gray-700/50 rounded-xl transition-all duration-300 ${colors.hover}`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-2">{action.title}</h3>
                        <p className="text-gray-400 text-sm">{action.description}</p>
                      </div>
                      <span className={`${colors.text} font-medium text-sm`}>{action.action}</span>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Office Locations */}
          <div className="bg-gray-800/30 backdrop-blur-sm rounded-3xl p-12 border border-gray-700/30">
            <h2 className="text-3xl font-bold text-white mb-8">Global Presence</h2>
            <div className="grid grid-cols-2 gap-6">
              {[
                { city: 'London', country: 'UK', type: 'HQ' },
                { city: 'Lagos', country: 'Nigeria', type: 'Hub' },
                { city: 'Nairobi', country: 'Kenya', type: 'Hub' },
                { city: 'Accra', country: 'Ghana', type: 'Hub' }
              ].map((office, idx) => (
                <div key={idx} className="text-center p-4 bg-gray-900/50 rounded-xl">
                  <h3 className="text-white font-semibold text-lg mb-1">{office.city}</h3>
                  <p className="text-gray-400 text-sm">{office.country}</p>
                  <span className="inline-block mt-2 px-2 py-1 bg-emerald-500/20 text-emerald-400 text-xs rounded-full">
                    {office.type}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Legal Declaration Popup */}
      <AnimatePresence>
        {showLegalPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-md p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-4xl w-full bg-gradient-to-br from-gray-900 via-black to-gray-900 border border-emerald-500/30 rounded-3xl p-8 md:p-12 shadow-2xl shadow-emerald-500/20"
            >
              {/* Header */}
              <div className="text-center mb-8">
                <div className="inline-block p-4 bg-emerald-500/10 rounded-2xl mb-4">
                  <Shield className="h-12 w-12 text-emerald-400" />
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
                  NAVADA Nexus Legal Declaration
                </h1>
                <p className="text-emerald-400 text-lg font-semibold">
                  African Tech Innovation Investment Fund
                </p>
              </div>

              {/* Content */}
              <div className="space-y-6 max-h-[50vh] overflow-y-auto custom-scrollbar mb-8 px-4">
                <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
                  <h2 className="text-xl font-bold text-emerald-400 mb-3">Investment Disclaimer</h2>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    NAVADA Nexus is a venture capital fund targeting early-stage African technology companies.
                    All investment opportunities presented on this platform carry inherent risks. Past performance
                    does not guarantee future results. Investors may lose some or all of their invested capital.
                  </p>
                </div>

                <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
                  <h2 className="text-xl font-bold text-emerald-400 mb-3">Regulatory Compliance</h2>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    This platform is intended for sophisticated investors, accredited investors, and institutional
                    investors who understand venture capital risks. NAVADA Nexus operates in compliance with applicable
                    securities regulations. By proceeding, you confirm you meet the necessary investor criteria.
                  </p>
                </div>

                <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
                  <h2 className="text-xl font-bold text-emerald-400 mb-3">Data Privacy & Security</h2>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    We collect and process personal information in accordance with GDPR and applicable data protection
                    laws. Your data is encrypted, securely stored, and never shared with third parties without consent.
                    For details, review our Privacy Policy.
                  </p>
                </div>

                <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
                  <h2 className="text-xl font-bold text-emerald-400 mb-3">No Guarantee of Returns</h2>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    Projected IRR, portfolio valuations, and market analyses are estimates based on current data and
                    assumptions. Actual results may vary significantly. Investment decisions should be made after
                    thorough due diligence and professional financial advice.
                  </p>
                </div>

                <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
                  <h2 className="text-xl font-bold text-emerald-400 mb-3">Acceptance of Terms</h2>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    By clicking "I Accept & Continue," you acknowledge that you have read, understood, and agree to
                    these terms. You confirm that you are accessing this platform voluntarily and accept all associated
                    risks with venture capital investments.
                  </p>
                </div>
              </div>

              {/* Accept Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleAcceptLegal}
                className="w-full bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600 text-white py-4 rounded-xl font-bold text-lg transition-all duration-300 shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50"
              >
                I Accept & Continue to NAVADA Nexus
              </motion.button>

              {/* Footer Note */}
              <p className="text-center text-gray-500 text-xs mt-4">
                Last Updated: November 2025 | © 2025 NAVADA Venture Capital
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Calendar Modal */}
      <AnimatePresence>
        {showCalendar && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md p-4"
            onClick={() => setShowCalendar(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-4xl w-full bg-gray-900 border border-emerald-500/30 rounded-3xl p-8 shadow-2xl shadow-emerald-500/20"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-emerald-500/10 rounded-xl">
                    <Target className="h-6 w-6 text-emerald-400" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">Schedule a Meeting</h2>
                    <p className="text-gray-400 text-sm">Choose a time to discuss investment opportunities</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowCalendar(false)}
                  className="p-2 bg-red-500/10 hover:bg-red-500/20 rounded-lg transition-colors"
                >
                  <X className="h-6 w-6 text-red-400" />
                </button>
              </div>

              {/* Calendar Options */}
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <motion.a
                    href={`https://calendar.google.com/calendar/render?action=TEMPLATE&text=NAVADA%20VC%20Investment%20Discussion&details=Discussion%20about%20African%20tech%20investment%20opportunities%20with%20NAVADA%20VC&location=Video%20Call`}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center gap-4 bg-gradient-to-r from-blue-600/20 to-blue-500/20 hover:from-blue-600/30 hover:to-blue-500/30 border border-blue-500/30 rounded-xl p-6 transition-all duration-300"
                  >
                    <div className="p-3 bg-blue-500/20 rounded-lg">
                      <Globe className="h-6 w-6 text-blue-400" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-white mb-1">Google Calendar</h3>
                      <p className="text-gray-400 text-sm">Add to your Google Calendar</p>
                    </div>
                  </motion.a>

                  <motion.a
                    href={`mailto:${process.env.REACT_APP_CONTACT_EMAIL}?subject=Investment Discussion Request&body=I would like to schedule a meeting to discuss investment opportunities with NAVADA Nexus.`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center gap-4 bg-gradient-to-r from-emerald-600/20 to-emerald-500/20 hover:from-emerald-600/30 hover:to-emerald-500/30 border border-emerald-500/30 rounded-xl p-6 transition-all duration-300"
                  >
                    <div className="p-3 bg-emerald-500/20 rounded-lg">
                      <Mail className="h-6 w-6 text-emerald-400" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-white mb-1">Email Us</h3>
                      <p className="text-gray-400 text-sm">Send meeting request via email</p>
                    </div>
                  </motion.a>
                </div>

                {/* Direct Contact Info */}
                <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
                  <h3 className="text-lg font-bold text-white mb-4">Direct Contact</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Mail className="h-5 w-5 text-emerald-400" />
                      <a href={`mailto:${process.env.REACT_APP_CONTACT_EMAIL}`} className="text-gray-300 hover:text-emerald-400 transition-colors">
                        {process.env.REACT_APP_CONTACT_EMAIL}
                      </a>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="h-5 w-5 text-emerald-400" />
                      <a href={`tel:${process.env.REACT_APP_CONTACT_PHONE}`} className="text-gray-300 hover:text-emerald-400 transition-colors">
                        {process.env.REACT_APP_CONTACT_PHONE}
                      </a>
                    </div>
                  </div>
                </div>

                {/* Availability Note */}
                <div className="bg-emerald-500/10 rounded-xl p-4 border border-emerald-500/30">
                  <p className="text-emerald-400 text-sm">
                    <strong>Typical Response Time:</strong> Within 24 hours. For urgent inquiries, please call directly.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Portfolio Application Modal */}
        {showPortfolioApp && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md p-4 overflow-y-auto"
            onClick={() => setShowPortfolioApp(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-3xl w-full bg-gray-900 border border-purple-500/30 rounded-3xl p-8 shadow-2xl shadow-purple-500/20 my-8"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-purple-500/10 rounded-xl">
                    <Target className="h-6 w-6 text-purple-400" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">Portfolio Application</h2>
                    <p className="text-gray-400 text-sm">Submit your startup for investment consideration</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowPortfolioApp(false)}
                  className="p-2 bg-red-500/10 hover:bg-red-500/20 rounded-lg transition-colors"
                >
                  <X className="h-6 w-6 text-red-400" />
                </button>
              </div>

              {/* Application Form */}
              <form onSubmit={handlePortfolioSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Company Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Company Name <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={portfolioFormData.companyName}
                      onChange={(e) => handlePortfolioInputChange('companyName', e.target.value)}
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 transition-colors"
                      placeholder="Your Startup Name"
                    />
                  </div>

                  {/* Founder Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Founder Name <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={portfolioFormData.founderName}
                      onChange={(e) => handlePortfolioInputChange('founderName', e.target.value)}
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 transition-colors"
                      placeholder="Full Name"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Email <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={portfolioFormData.email}
                      onChange={(e) => handlePortfolioInputChange('email', e.target.value)}
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 transition-colors"
                      placeholder="contact@company.com"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Phone Number <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={portfolioFormData.phone}
                      onChange={(e) => handlePortfolioInputChange('phone', e.target.value)}
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 transition-colors"
                      placeholder="+234 xxx xxx xxxx"
                    />
                  </div>

                  {/* Country */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Country <span className="text-red-400">*</span>
                    </label>
                    <select
                      required
                      value={portfolioFormData.country}
                      onChange={(e) => handlePortfolioInputChange('country', e.target.value)}
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white focus:outline-none focus:border-purple-500/50 transition-colors"
                    >
                      <option value="">Select Country</option>
                      <option value="Nigeria">Nigeria</option>
                      <option value="Kenya">Kenya</option>
                      <option value="South Africa">South Africa</option>
                      <option value="Ghana">Ghana</option>
                      <option value="Egypt">Egypt</option>
                      <option value="Rwanda">Rwanda</option>
                      <option value="Other">Other African Country</option>
                    </select>
                  </div>

                  {/* Sector */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Sector <span className="text-red-400">*</span>
                    </label>
                    <select
                      required
                      value={portfolioFormData.sector}
                      onChange={(e) => handlePortfolioInputChange('sector', e.target.value)}
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white focus:outline-none focus:border-purple-500/50 transition-colors"
                    >
                      <option value="">Select Sector</option>
                      <option value="FinTech">FinTech</option>
                      <option value="EdTech">EdTech</option>
                      <option value="HealthTech">HealthTech</option>
                      <option value="AgriTech">AgriTech</option>
                      <option value="E-commerce">E-commerce</option>
                      <option value="AI/ML">AI/ML</option>
                      <option value="Logistics">Logistics</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  {/* Stage */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Funding Stage <span className="text-red-400">*</span>
                    </label>
                    <select
                      required
                      value={portfolioFormData.stage}
                      onChange={(e) => handlePortfolioInputChange('stage', e.target.value)}
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white focus:outline-none focus:border-purple-500/50 transition-colors"
                    >
                      <option value="">Select Stage</option>
                      <option value="Pre-Seed">Pre-Seed</option>
                      <option value="Seed">Seed</option>
                      <option value="Series A">Series A</option>
                      <option value="Series B">Series B</option>
                      <option value="Series C+">Series C+</option>
                    </select>
                  </div>

                  {/* Funding Needed */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Funding Needed (USD) <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={portfolioFormData.fundingNeeded}
                      onChange={(e) => handlePortfolioInputChange('fundingNeeded', e.target.value)}
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 transition-colors"
                      placeholder="e.g., $500,000"
                    />
                  </div>
                </div>

                {/* Website */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Website
                  </label>
                  <input
                    type="url"
                    value={portfolioFormData.website}
                    onChange={(e) => handlePortfolioInputChange('website', e.target.value)}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 transition-colors"
                    placeholder="https://yourcompany.com"
                  />
                </div>

                {/* Pitch Deck */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Pitch Deck URL (Google Drive, Dropbox, etc.)
                  </label>
                  <input
                    type="url"
                    value={portfolioFormData.pitchDeck}
                    onChange={(e) => handlePortfolioInputChange('pitchDeck', e.target.value)}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 transition-colors"
                    placeholder="https://drive.google.com/..."
                  />
                </div>

                {/* Submit Button */}
                <div className="flex gap-4 pt-4">
                  <motion.button
                    type="button"
                    onClick={() => setShowPortfolioApp(false)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 px-6 py-3 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-xl text-white font-medium transition-colors"
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400 rounded-xl text-white font-medium transition-all duration-300 shadow-lg shadow-purple-500/30"
                  >
                    Submit Application
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}

        {/* Investor Portal Modal */}
        {showInvestorPortal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md p-4"
            onClick={() => setShowInvestorPortal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-2xl w-full bg-gray-900 border border-amber-500/30 rounded-3xl p-8 shadow-2xl shadow-amber-500/20"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-amber-500/10 rounded-xl">
                    <Shield className="h-6 w-6 text-amber-400" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">LP Portal Access</h2>
                    <p className="text-gray-400 text-sm">Authorized Limited Partners Only</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowInvestorPortal(false)}
                  className="p-2 bg-red-500/10 hover:bg-red-500/20 rounded-lg transition-colors"
                >
                  <X className="h-6 w-6 text-red-400" />
                </button>
              </div>

              {/* Content */}
              <div className="space-y-6">
                <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-white mb-3">Access Restricted</h3>
                  <p className="text-gray-300 mb-4">
                    The LP Portal is available exclusively to authorized Limited Partners with active fund commitments.
                  </p>
                  <ul className="space-y-2 text-gray-400 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-amber-400 mt-1">•</span>
                      <span>Quarterly performance reports and fund updates</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-amber-400 mt-1">•</span>
                      <span>Portfolio company metrics and valuations</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-amber-400 mt-1">•</span>
                      <span>Tax documents and capital call schedules</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-amber-400 mt-1">•</span>
                      <span>Exclusive investment opportunities and co-investment rights</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
                  <h3 className="text-lg font-bold text-white mb-3">Interested in Becoming an LP?</h3>
                  <p className="text-gray-400 mb-4">
                    NAVADA Nexus accepts qualified institutional and individual investors. Minimum commitment starts at $250,000.
                  </p>
                  <motion.a
                    href={`mailto:${process.env.REACT_APP_CONTACT_EMAIL}?subject=LP%20Investment%20Inquiry&body=I%20am%20interested%20in%20learning%20more%20about%20becoming%20a%20Limited%20Partner%20with%20NAVADA%20VC.`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 rounded-xl text-white font-medium transition-all duration-300 shadow-lg shadow-amber-500/30"
                  >
                    <Mail className="h-5 w-5" />
                    Contact Investor Relations
                  </motion.a>
                </div>

                <div className="text-center text-gray-500 text-sm">
                  Current LPs: Please use your secure portal credentials to log in.
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Thank You Modal */}
        {showThankYou && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] flex items-center justify-center bg-black/90 backdrop-blur-md p-4"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 20 }}
              className="relative max-w-md w-full bg-gradient-to-br from-emerald-900/50 to-gray-900 border border-emerald-500/50 rounded-3xl p-8 shadow-2xl shadow-emerald-500/30 text-center"
            >
              <div className="mb-6">
                <div className="mx-auto w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mb-4">
                  <Heart className="h-10 w-10 text-emerald-400" />
                </div>
                <h2 className="text-3xl font-bold text-white mb-2">Thank You!</h2>
                <p className="text-gray-300">
                  Your application has been successfully submitted.
                </p>
              </div>

              <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-4 mb-6">
                <p className="text-emerald-400 text-sm">
                  Our investment team will review your application and reach out within 5-7 business days.
                </p>
              </div>

              <p className="text-gray-400 text-sm">
                Application ID: #{Date.now().toString().slice(-8)}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-black/80 backdrop-blur-xl border-b border-gray-800' : 'bg-transparent'
        }`}
      >
        <div className="mx-auto max-w-7xl px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-4"
            >
              <div>
                <div className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
                  NAVADA <span className="text-lg italic font-light">Nexus</span>
                </div>
              </div>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-2">
              {tabs.map((tab) => (
                <motion.button
                  key={tab.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'bg-emerald-600 text-white shadow-lg'
                      : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                  }`}
                >
                  <span>{tab.label}</span>
                </motion.button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl bg-gray-800 text-white"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="lg:hidden mt-4 overflow-hidden"
              >
                <div className="grid grid-cols-2 gap-2">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => {
                        setActiveTab(tab.id);
                        setIsMobileMenuOpen(false);
                      }}
                      className={`px-3 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                        activeTab === tab.id
                          ? 'bg-emerald-600 text-white'
                          : 'bg-gray-800/50 text-gray-400 hover:text-white'
                      }`}
                    >
                      <span>{tab.label}</span>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.nav>

      {/* Main Content */}
      <main className="pt-24 pb-12">
        <div className="mx-auto max-w-7xl px-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {activeTab === 'home' && renderHome()}
              {activeTab === 'strategy' && renderStrategy()}
              {activeTab === 'financials' && renderFinancials()}
              {activeTab === 'portfolio' && renderPortfolio()}
              {activeTab === 'market' && renderMarket()}
              {activeTab === 'team' && renderTeam()}
              {activeTab === 'transparency' && renderTransparency()}
              {activeTab === 'ai-assistant' && renderAIAssistant()}
              {activeTab === 'faq' && renderFAQ()}
              {activeTab === 'contact' && renderContact()}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {isScrolled && (
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-8 right-8 p-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl shadow-lg transition-colors duration-200"
          >
            <ChevronDown className="h-6 w-6 rotate-180" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Footer */}
      <Footer setActiveTab={setActiveTab} />
    </div>
  );
};

export default NavadaVCLanding;
