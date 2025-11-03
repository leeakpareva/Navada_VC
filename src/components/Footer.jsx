import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Mail, MapPin, Linkedin, Twitter, Github } from 'lucide-react';

export function Footer({ setActiveTab }) {
  const currentYear = new Date().getFullYear();

  const navigationLinks = [
    { label: 'Overview', id: 'home' },
    { label: 'Strategy', id: 'strategy' },
    { label: 'Portfolio', id: 'portfolio' },
    { label: 'About', id: 'about' },
    { label: 'AI Advisor', id: 'ai' }
  ];

  return (
    <footer className="relative mt-32 border-t border-gray-800 bg-gradient-to-b from-gray-900 to-black">
      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 via-blue-500/5 to-purple-500/5 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-blue-500 rounded-xl flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
                  NAVADA VC
                </div>
                <div className="text-xs text-gray-500">African Tech Investment</div>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6 max-w-md">
              Premier UK-Africa Venture Capital fund deploying £200K in seed capital to accelerate
              innovation across AI & Cloud Solutions, Robotics & Automation, FinTech, and emerging technologies.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-emerald-600 rounded-lg flex items-center justify-center transition-all duration-300">
                <Linkedin className="h-5 w-5 text-gray-400 hover:text-white" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-all duration-300">
                <Twitter className="h-5 w-5 text-gray-400 hover:text-white" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-gray-700 rounded-lg flex items-center justify-center transition-all duration-300">
                <Github className="h-5 w-5 text-gray-400 hover:text-white" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              {navigationLinks.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => {
                      setActiveTab(link.id);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="text-gray-400 hover:text-emerald-400 text-sm transition-colors duration-200"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-gray-400 text-sm">
                <Mail className="h-4 w-4 mt-1 text-emerald-400" />
                <span>contact@navadavc.com</span>
              </li>
              <li className="flex items-start gap-2 text-gray-400 text-sm">
                <MapPin className="h-4 w-4 mt-1 text-emerald-400" />
                <span>London, UK<br />Lagos, Nigeria</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Investment Disclaimer */}
        <div className="border-t border-gray-800 pt-8 mb-8">
          <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
            <h4 className="text-white font-semibold mb-3 text-sm">Investment Disclaimer</h4>
            <p className="text-gray-400 text-xs leading-relaxed">
              NAVADA VC is a proposed venture capital fund. This website is for informational purposes only and does not
              constitute an offer to sell or a solicitation of an offer to buy any securities. Investment in venture capital
              involves substantial risk and is suitable only for sophisticated investors. Past performance is not indicative
              of future results. All projections and financial models are estimates based on market research and assumptions
              that may not materialize. Potential investors should conduct their own due diligence and consult with their
              financial, legal, and tax advisors before making any investment decisions.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-gray-500 text-sm text-center md:text-left">
              © {currentYear} NAVADA VC. All rights reserved. Launching Q4 2026.
            </div>

            {/* Designer Credit */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex items-center gap-2 bg-gradient-to-r from-emerald-500/10 to-blue-500/10 px-4 py-2 rounded-lg border border-emerald-500/20"
            >
              <div className="text-xs text-gray-400">
                Designed + Coded by
              </div>
              <div className="text-sm font-bold bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
                Lee Akpareva
              </div>
              <div className="text-xs text-gray-500">
                MBA, MA
              </div>
            </motion.div>
          </div>

          {/* Additional Info */}
          <div className="mt-6 text-center">
            <div className="inline-flex items-center gap-2 text-xs text-gray-600">
              <span>Built with React, Tailwind CSS, Framer Motion & Plotly.js</span>
              <span className="text-emerald-500">•</span>
              <span>Powered by Advanced 3D Visualizations</span>
            </div>
          </div>
        </div>
      </div>

      {/* Animated gradient background effect */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent" />
    </footer>
  );
}
