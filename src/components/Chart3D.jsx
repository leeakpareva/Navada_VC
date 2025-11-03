import React from 'react';
import Plot from 'react-plotly.js';

export const IRRProjection3D = () => {
  const years = [2026, 2027, 2028, 2029, 2030, 2031, 2032, 2033, 2034, 2035];
  const irrData = [-15.0, -8.2, 12.5, 28.3, 35.7, 42.1, 38.9, 36.2, 34.8, 33.1];
  const netReturns = [-50000, -25000, 75000, 180000, 320000, 520000, 750000, 920000, 1100000, 1250000];

  return (
    <Plot
      data={[
        {
          type: 'scatter3d',
          mode: 'lines+markers',
          x: years,
          y: irrData,
          z: netReturns.map(v => v / 1000), // Convert to thousands
          line: {
            color: '#10b981',
            width: 4
          },
          marker: {
            size: 8,
            color: irrData,
            colorscale: [
              [0, '#ef4444'],
              [0.3, '#f59e0b'],
              [0.6, '#10b981'],
              [1, '#3b82f6']
            ],
            showscale: true,
            colorbar: {
              title: 'IRR %',
              thickness: 15,
              len: 0.7
            }
          },
          text: years.map((year, i) =>
            `Year: ${year}<br>IRR: ${irrData[i]}%<br>Returns: £${(netReturns[i]/1000).toFixed(0)}K`
          ),
          hoverinfo: 'text'
        }
      ]}
      layout={{
        autosize: true,
        paper_bgcolor: 'rgba(0,0,0,0)',
        plot_bgcolor: 'rgba(0,0,0,0)',
        scene: {
          xaxis: {
            title: 'Year',
            gridcolor: '#374151',
            color: '#9ca3af'
          },
          yaxis: {
            title: 'IRR (%)',
            gridcolor: '#374151',
            color: '#9ca3af'
          },
          zaxis: {
            title: 'Net Returns (£K)',
            gridcolor: '#374151',
            color: '#9ca3af'
          },
          bgcolor: 'rgba(0,0,0,0)',
          camera: {
            eye: { x: 1.5, y: 1.5, z: 1.3 }
          }
        },
        margin: { l: 0, r: 0, b: 0, t: 30 },
        font: {
          family: 'Inter, sans-serif',
          color: '#e5e7eb'
        },
        title: {
          text: '10-Year IRR Projection',
          font: { size: 16, color: '#f3f4f6' }
        }
      }}
      config={{
        responsive: true,
        displayModeBar: true,
        displaylogo: false
      }}
      style={{ width: '100%', height: '100%' }}
    />
  );
};

export const PortfolioAllocation3D = ({ data }) => {
  return (
    <Plot
      data={[
        {
          type: 'pie',
          labels: data.map(d => d.sector),
          values: data.map(d => d.allocation),
          hole: 0.4,
          textinfo: 'label+percent',
          textposition: 'outside',
          marker: {
            colors: ['#10b981', '#3b82f6', '#8b5cf6', '#f59e0b', '#ef4444', '#ec4899'],
            line: {
              color: '#1f2937',
              width: 2
            }
          },
          hovertemplate: '<b>%{label}</b><br>' +
                        'Allocation: %{value}%<br>' +
                        '<extra></extra>'
        }
      ]}
      layout={{
        autosize: true,
        paper_bgcolor: 'rgba(0,0,0,0)',
        plot_bgcolor: 'rgba(0,0,0,0)',
        font: {
          family: 'Inter, sans-serif',
          color: '#e5e7eb',
          size: 12
        },
        title: {
          text: 'Portfolio Sector Allocation',
          font: { size: 16, color: '#f3f4f6' }
        },
        showlegend: true,
        legend: {
          orientation: 'v',
          x: 1.1,
          y: 0.5,
          font: { color: '#e5e7eb' }
        },
        margin: { l: 20, r: 120, b: 20, t: 60 }
      }}
      config={{
        responsive: true,
        displayModeBar: false,
        displaylogo: false
      }}
      style={{ width: '100%', height: '100%' }}
    />
  );
};

export const MarketGrowth3D = () => {
  const regions = ['Nigeria', 'Kenya', 'Ghana', 'South Africa'];
  const years = ['2024', '2026', '2028', '2030'];

  const data = regions.map((region, idx) => ({
    type: 'scatter3d',
    mode: 'lines+markers',
    name: region,
    x: years,
    y: Array(4).fill(region),
    z: [
      2.5 + idx * 0.5,
      3.2 + idx * 0.7,
      4.8 + idx * 1.2,
      7.5 + idx * 1.8
    ],
    line: { width: 4 },
    marker: { size: 8 }
  }));

  return (
    <Plot
      data={data}
      layout={{
        autosize: true,
        paper_bgcolor: 'rgba(0,0,0,0)',
        plot_bgcolor: 'rgba(0,0,0,0)',
        scene: {
          xaxis: {
            title: 'Year',
            gridcolor: '#374151',
            color: '#9ca3af'
          },
          yaxis: {
            title: 'Market',
            gridcolor: '#374151',
            color: '#9ca3af'
          },
          zaxis: {
            title: 'Market Size ($B)',
            gridcolor: '#374151',
            color: '#9ca3af'
          },
          bgcolor: 'rgba(0,0,0,0)',
          camera: {
            eye: { x: 1.8, y: 1.8, z: 1.3 }
          }
        },
        margin: { l: 0, r: 0, b: 0, t: 30 },
        font: {
          family: 'Inter, sans-serif',
          color: '#e5e7eb'
        },
        title: {
          text: 'Regional Market Growth',
          font: { size: 16, color: '#f3f4f6' }
        },
        showlegend: true,
        legend: {
          x: 0,
          y: 1,
          font: { color: '#e5e7eb' }
        }
      }}
      config={{
        responsive: true,
        displayModeBar: true,
        displaylogo: false
      }}
      style={{ width: '100%', height: '100%' }}
    />
  );
};

export const InvestmentAllocation3D = ({ data }) => {
  const sectors = data.map(d => d.sector);
  const allocations = data.map(d => d.allocation);
  const avgTickets = data.map(d => d.avgTicket);
  const companies = data.map(d => d.companies);

  const colors = ['#10b981', '#3b82f6', '#8b5cf6', '#f59e0b', '#ef4444', '#ec4899'];

  return (
    <Plot
      data={[
        {
          type: 'bar',
          x: sectors,
          y: allocations,
          marker: {
            color: colors,
            line: {
              color: '#1f2937',
              width: 2
            }
          },
          text: allocations.map(a => `${a}%`),
          textposition: 'outside',
          hovertemplate: '<b>%{x}</b><br>' +
                        'Allocation: %{y}%<br>' +
                        '<extra></extra>',
          name: 'Allocation %'
        },
        {
          type: 'scatter',
          mode: 'markers+text',
          x: sectors,
          y: allocations.map(a => a + 3),
          marker: {
            size: companies.map(c => c * 8),
            color: avgTickets,
            colorscale: [
              [0, '#3b82f6'],
              [0.5, '#10b981'],
              [1, '#f59e0b']
            ],
            showscale: true,
            colorbar: {
              title: 'Avg Ticket (£K)',
              thickness: 15,
              len: 0.7,
              x: 1.15
            },
            line: {
              color: '#fff',
              width: 2
            }
          },
          text: companies.map(c => c),
          textposition: 'middle center',
          textfont: {
            color: '#fff',
            size: 12,
            weight: 'bold'
          },
          hovertemplate: '<b>%{x}</b><br>' +
                        'Companies: %{text}<br>' +
                        'Avg Ticket: £%{marker.color}K<br>' +
                        '<extra></extra>',
          name: 'Companies (bubble size)'
        }
      ]}
      layout={{
        autosize: true,
        paper_bgcolor: 'rgba(0,0,0,0)',
        plot_bgcolor: 'rgba(0,0,0,0)',
        xaxis: {
          title: 'Sector',
          gridcolor: '#374151',
          color: '#9ca3af',
          tickangle: -45
        },
        yaxis: {
          title: 'Allocation (%)',
          gridcolor: '#374151',
          color: '#9ca3af',
          range: [0, Math.max(...allocations) + 10]
        },
        margin: { l: 60, r: 150, b: 120, t: 60 },
        font: {
          family: 'Inter, sans-serif',
          color: '#e5e7eb'
        },
        title: {
          text: 'Investment Allocation Model (3D View)',
          font: { size: 16, color: '#f3f4f6' }
        },
        showlegend: true,
        legend: {
          orientation: 'h',
          x: 0,
          y: -0.3,
          font: { color: '#e5e7eb' }
        },
        hovermode: 'closest'
      }}
      config={{
        responsive: true,
        displayModeBar: true,
        displaylogo: false
      }}
      style={{ width: '100%', height: '100%' }}
    />
  );
};

export const InvestmentProcess3D = () => {
  const stages = ['Sourcing', 'Screening', 'Due Diligence', 'Investment Committee', 'Term Sheet', 'Closing'];
  const timeWeeks = [1, 2, 4, 1, 2, 3];
  const conversionRate = [100, 40, 25, 15, 10, 8];
  const effort = [20, 40, 100, 60, 50, 80];

  return (
    <Plot
      data={[
        {
          type: 'scatter3d',
          mode: 'lines+markers',
          x: stages.map((_, i) => i),
          y: conversionRate,
          z: timeWeeks,
          line: {
            color: '#10b981',
            width: 6
          },
          marker: {
            size: effort.map(e => e / 5),
            color: conversionRate,
            colorscale: [
              [0, '#ef4444'],
              [0.3, '#f59e0b'],
              [0.6, '#10b981'],
              [1, '#3b82f6']
            ],
            showscale: true,
            colorbar: {
              title: 'Conversion %',
              thickness: 15,
              len: 0.7
            },
            line: {
              color: '#fff',
              width: 2
            }
          },
          text: stages.map((stage, i) =>
            `${stage}<br>Time: ${timeWeeks[i]} weeks<br>Conversion: ${conversionRate[i]}%<br>Effort: ${effort[i]}%`
          ),
          hoverinfo: 'text',
          name: 'Process Flow'
        }
      ]}
      layout={{
        autosize: true,
        paper_bgcolor: 'rgba(0,0,0,0)',
        plot_bgcolor: 'rgba(0,0,0,0)',
        scene: {
          xaxis: {
            title: 'Stage',
            gridcolor: '#374151',
            color: '#9ca3af',
            tickmode: 'array',
            tickvals: [0, 1, 2, 3, 4, 5],
            ticktext: stages
          },
          yaxis: {
            title: 'Conversion Rate (%)',
            gridcolor: '#374151',
            color: '#9ca3af'
          },
          zaxis: {
            title: 'Time (Weeks)',
            gridcolor: '#374151',
            color: '#9ca3af'
          },
          bgcolor: 'rgba(0,0,0,0)',
          camera: {
            eye: { x: 1.8, y: 1.8, z: 1.3 }
          }
        },
        margin: { l: 0, r: 0, b: 0, t: 30 },
        font: {
          family: 'Inter, sans-serif',
          color: '#e5e7eb'
        },
        title: {
          text: 'Investment Process Timeline & Funnel',
          font: { size: 16, color: '#f3f4f6' }
        }
      }}
      config={{
        responsive: true,
        displayModeBar: true,
        displaylogo: false
      }}
      style={{ width: '100%', height: '100%' }}
    />
  );
};

export const AIAdoptionAfrica3D = () => {
  const years = [2025, 2026, 2027, 2028, 2029, 2030, 2031, 2032, 2033, 2034, 2035];

  const sectors = [
    {
      name: 'FinTech',
      data: [15, 22, 32, 45, 58, 68, 75, 80, 84, 87, 90],
      color: '#10b981'
    },
    {
      name: 'AgriTech',
      data: [8, 14, 22, 32, 44, 56, 66, 74, 80, 85, 88],
      color: '#3b82f6'
    },
    {
      name: 'HealthTech',
      data: [12, 19, 28, 38, 50, 62, 71, 78, 83, 87, 90],
      color: '#8b5cf6'
    },
    {
      name: 'EdTech',
      data: [10, 16, 25, 36, 48, 60, 70, 77, 82, 86, 89],
      color: '#f59e0b'
    },
    {
      name: 'Robotics & Automation',
      data: [5, 10, 18, 28, 40, 54, 66, 75, 82, 87, 91],
      color: '#ef4444'
    },
    {
      name: 'Cloud Solutions',
      data: [18, 26, 36, 48, 60, 70, 78, 84, 88, 91, 94],
      color: '#ec4899'
    }
  ];

  return (
    <Plot
      data={sectors.map(sector => ({
        type: 'scatter3d',
        mode: 'lines+markers',
        name: sector.name,
        x: years,
        y: Array(years.length).fill(sector.name),
        z: sector.data,
        line: {
          color: sector.color,
          width: 4
        },
        marker: {
          size: 6,
          color: sector.color,
          line: {
            color: '#fff',
            width: 1
          }
        },
        text: years.map((year, i) =>
          `${sector.name}<br>Year: ${year}<br>AI Adoption: ${sector.data[i]}%`
        ),
        hoverinfo: 'text'
      }))}
      layout={{
        autosize: true,
        paper_bgcolor: 'rgba(0,0,0,0)',
        plot_bgcolor: 'rgba(0,0,0,0)',
        scene: {
          xaxis: {
            title: 'Year',
            gridcolor: '#374151',
            color: '#9ca3af'
          },
          yaxis: {
            title: 'Sector',
            gridcolor: '#374151',
            color: '#9ca3af'
          },
          zaxis: {
            title: 'AI Adoption Rate (%)',
            gridcolor: '#374151',
            color: '#9ca3af',
            range: [0, 100]
          },
          bgcolor: 'rgba(0,0,0,0)',
          camera: {
            eye: { x: 1.5, y: 1.8, z: 1.4 }
          }
        },
        margin: { l: 0, r: 0, b: 0, t: 40 },
        font: {
          family: 'Inter, sans-serif',
          color: '#e5e7eb'
        },
        title: {
          text: 'AI Adoption Growth Across African Tech Sectors (2025-2035)',
          font: { size: 16, color: '#f3f4f6' }
        },
        showlegend: true,
        legend: {
          x: 0,
          y: 1,
          font: { color: '#e5e7eb' }
        }
      }}
      config={{
        responsive: true,
        displayModeBar: true,
        displaylogo: false
      }}
      style={{ width: '100%', height: '100%' }}
    />
  );
};

// Fund Deployment Timeline 3D Chart
export const FundDeployment3D = () => {
  const years = ['Year 1', 'Year 2', 'Year 3', 'Year 4', 'Year 5'];

  const deploymentData = {
    deployed: [40000, 30000, 30000, 30000, 10000], // Per year deployment
    reserved: [20000, 15000, 10000, 5000, 10000], // Follow-on reserves used
    cumulative: [60000, 105000, 145000, 180000, 200000] // Cumulative deployed
  };

  return (
    <Plot
      data={[
        {
          type: 'bar',
          x: years,
          y: deploymentData.deployed,
          name: 'Initial Investments',
          marker: { color: '#10b981' },
          text: deploymentData.deployed.map(v => `£${(v/1000).toFixed(0)}K`),
          textposition: 'outside'
        },
        {
          type: 'bar',
          x: years,
          y: deploymentData.reserved,
          name: 'Follow-on Capital',
          marker: { color: '#3b82f6' },
          text: deploymentData.reserved.map(v => `£${(v/1000).toFixed(0)}K`),
          textposition: 'outside'
        },
        {
          type: 'scatter',
          mode: 'lines+markers',
          x: years,
          y: deploymentData.cumulative,
          name: 'Cumulative Deployed',
          marker: { color: '#f59e0b', size: 10 },
          line: { color: '#f59e0b', width: 3 },
          yaxis: 'y2'
        }
      ]}
      layout={{
        paper_bgcolor: 'rgba(0,0,0,0)',
        plot_bgcolor: 'rgba(0,0,0,0)',
        font: { color: '#e5e7eb', family: 'Inter, sans-serif' },
        title: {
          text: 'Capital Deployment Over 5 Years',
          font: { size: 18, color: '#f3f4f6' }
        },
        barmode: 'stack',
        xaxis: {
          title: 'Investment Period',
          gridcolor: '#374151',
          color: '#9ca3af'
        },
        yaxis: {
          title: 'Deployed Capital (£)',
          gridcolor: '#374151',
          color: '#9ca3af',
          tickformat: ',.0f'
        },
        yaxis2: {
          title: 'Cumulative Total (£)',
          overlaying: 'y',
          side: 'right',
          gridcolor: '#374151',
          color: '#f59e0b',
          tickformat: ',.0f'
        },
        showlegend: true,
        legend: {
          x: 0,
          y: 1.1,
          orientation: 'h',
          font: { color: '#e5e7eb' }
        }
      }}
      config={{
        responsive: true,
        displayModeBar: true,
        displaylogo: false
      }}
      style={{ width: '100%', height: '100%' }}
    />
  );
};

// Geographic Distribution 3D Chart
export const GeographicDistribution3D = () => {
  const countries = ['Nigeria', 'Kenya', 'Ghana', 'South Africa'];
  const sectors = ['FinTech', 'AgriTech', 'HealthTech', 'EdTech', 'Robotics', 'Cloud'];

  // Investment amounts by country and sector (in £K)
  const investmentMatrix = [
    [16, 14.4, 13.6, 12, 12, 12], // Nigeria (40%)
    [12, 10.8, 10.2, 9, 9, 9],    // Kenya (30%)
    [6, 5.4, 5.1, 4.5, 4.5, 4.5], // Ghana (15%)
    [6, 5.4, 5.1, 4.5, 4.5, 4.5]  // South Africa (15%)
  ];

  const traces = countries.map((country, idx) => ({
    type: 'bar',
    name: country,
    x: sectors,
    y: investmentMatrix[idx],
    marker: {
      color: ['#10b981', '#3b82f6', '#8b5cf6', '#f59e0b'][idx]
    }
  }));

  return (
    <Plot
      data={traces}
      layout={{
        paper_bgcolor: 'rgba(0,0,0,0)',
        plot_bgcolor: 'rgba(0,0,0,0)',
        font: { color: '#e5e7eb', family: 'Inter, sans-serif' },
        title: {
          text: 'Investment Distribution by Country & Sector',
          font: { size: 18, color: '#f3f4f6' }
        },
        barmode: 'group',
        xaxis: {
          title: 'Sector',
          gridcolor: '#374151',
          color: '#9ca3af'
        },
        yaxis: {
          title: 'Investment Amount (£K)',
          gridcolor: '#374151',
          color: '#9ca3af'
        },
        showlegend: true,
        legend: {
          x: 0,
          y: 1.1,
          orientation: 'h',
          font: { color: '#e5e7eb' }
        }
      }}
      config={{
        responsive: true,
        displayModeBar: true,
        displaylogo: false
      }}
      style={{ width: '100%', height: '100%' }}
    />
  );
};

// Risk-Return Matrix 3D
export const RiskReturnMatrix3D = () => {
  const portfolioCompanies = [
    { name: 'FinTech A', risk: 3, expectedReturn: 5, investment: 15 },
    { name: 'FinTech B', risk: 4, expectedReturn: 7, investment: 12 },
    { name: 'FinTech C', risk: 2, expectedReturn: 3, investment: 13 },
    { name: 'AgriTech A', risk: 5, expectedReturn: 10, investment: 14 },
    { name: 'AgriTech B', risk: 4, expectedReturn: 6, investment: 12 },
    { name: 'AgriTech C', risk: 3, expectedReturn: 4, investment: 10 },
    { name: 'HealthTech A', risk: 4, expectedReturn: 8, investment: 13 },
    { name: 'HealthTech B', risk: 3, expectedReturn: 5, investment: 11 },
    { name: 'HealthTech C', risk: 5, expectedReturn: 12, investment: 10 },
    { name: 'EdTech A', risk: 3, expectedReturn: 6, investment: 12 },
    { name: 'EdTech B', risk: 4, expectedReturn: 7, investment: 10 },
    { name: 'Robotics A', risk: 7, expectedReturn: 20, investment: 12 },
    { name: 'Robotics B', risk: 6, expectedReturn: 15, investment: 10 },
    { name: 'Cloud A', risk: 4, expectedReturn: 9, investment: 12 },
    { name: 'Cloud B', risk: 5, expectedReturn: 11, investment: 10 }
  ];

  return (
    <Plot
      data={[
        {
          type: 'scatter',
          mode: 'markers+text',
          x: portfolioCompanies.map(c => c.risk),
          y: portfolioCompanies.map(c => c.expectedReturn),
          marker: {
            size: portfolioCompanies.map(c => c.investment),
            color: portfolioCompanies.map(c => {
              if (c.name.includes('FinTech')) return '#10b981';
              if (c.name.includes('AgriTech')) return '#3b82f6';
              if (c.name.includes('HealthTech')) return '#8b5cf6';
              if (c.name.includes('EdTech')) return '#f59e0b';
              if (c.name.includes('Robotics')) return '#ef4444';
              return '#ec4899';
            }),
            line: { color: '#1f2937', width: 2 },
            opacity: 0.7
          },
          text: portfolioCompanies.map(c => c.name),
          textposition: 'top center',
          textfont: { size: 9, color: '#e5e7eb' },
          hovertemplate: '<b>%{text}</b><br>Risk Score: %{x}<br>Expected Return: %{y}x<br>Investment: £%{marker.size}K<extra></extra>'
        }
      ]}
      layout={{
        paper_bgcolor: 'rgba(0,0,0,0)',
        plot_bgcolor: 'rgba(0,0,0,0)',
        font: { color: '#e5e7eb', family: 'Inter, sans-serif' },
        title: {
          text: 'Risk-Return Profile by Investment',
          font: { size: 18, color: '#f3f4f6' }
        },
        xaxis: {
          title: 'Risk Score (1-10)',
          gridcolor: '#374151',
          color: '#9ca3af',
          range: [0, 10]
        },
        yaxis: {
          title: 'Expected Return (Multiple)',
          gridcolor: '#374151',
          color: '#9ca3af',
          range: [0, 25]
        },
        annotations: [
          {
            x: 2,
            y: 22,
            text: 'High Return<br>Low Risk',
            showarrow: false,
            font: { size: 11, color: '#10b981' },
            bgcolor: 'rgba(16, 185, 129, 0.1)',
            borderpad: 4
          },
          {
            x: 8,
            y: 22,
            text: 'High Return<br>High Risk',
            showarrow: false,
            font: { size: 11, color: '#ef4444' },
            bgcolor: 'rgba(239, 68, 68, 0.1)',
            borderpad: 4
          }
        ],
        showlegend: false
      }}
      config={{
        responsive: true,
        displayModeBar: true,
        displaylogo: false
      }}
      style={{ width: '100%', height: '100%' }}
    />
  );
};

// Exit Timeline 3D
export const ExitTimeline3D = () => {
  const years = ['Year 1', 'Year 2', 'Year 3', 'Year 4', 'Year 5', 'Year 6', 'Year 7'];
  const exitTypes = {
    acquisitions: [0, 0, 2, 3, 2, 1, 0],
    ipos: [0, 0, 0, 1, 2, 1, 1],
    secondaries: [0, 0, 1, 1, 1, 1, 0],
    cumulative: [0, 0, 3, 7, 12, 15, 16]
  };

  return (
    <Plot
      data={[
        {
          type: 'bar',
          x: years,
          y: exitTypes.acquisitions,
          name: 'Acquisitions',
          marker: { color: '#10b981' },
          text: exitTypes.acquisitions,
          textposition: 'inside'
        },
        {
          type: 'bar',
          x: years,
          y: exitTypes.ipos,
          name: 'IPOs',
          marker: { color: '#3b82f6' },
          text: exitTypes.ipos,
          textposition: 'inside'
        },
        {
          type: 'bar',
          x: years,
          y: exitTypes.secondaries,
          name: 'Secondary Sales',
          marker: { color: '#8b5cf6' },
          text: exitTypes.secondaries,
          textposition: 'inside'
        },
        {
          type: 'scatter',
          mode: 'lines+markers',
          x: years,
          y: exitTypes.cumulative,
          name: 'Cumulative Exits',
          marker: { color: '#f59e0b', size: 10 },
          line: { color: '#f59e0b', width: 3, dash: 'dash' },
          yaxis: 'y2'
        }
      ]}
      layout={{
        paper_bgcolor: 'rgba(0,0,0,0)',
        plot_bgcolor: 'rgba(0,0,0,0)',
        font: { color: '#e5e7eb', family: 'Inter, sans-serif' },
        title: {
          text: 'Expected Exit Timeline',
          font: { size: 18, color: '#f3f4f6' }
        },
        barmode: 'stack',
        xaxis: {
          title: 'Year',
          gridcolor: '#374151',
          color: '#9ca3af'
        },
        yaxis: {
          title: 'Number of Exits',
          gridcolor: '#374151',
          color: '#9ca3af',
          dtick: 1
        },
        yaxis2: {
          title: 'Cumulative Exits',
          overlaying: 'y',
          side: 'right',
          color: '#f59e0b',
          dtick: 2
        },
        showlegend: true,
        legend: {
          x: 0,
          y: 1.1,
          orientation: 'h',
          font: { color: '#e5e7eb' }
        }
      }}
      config={{
        responsive: true,
        displayModeBar: true,
        displaylogo: false
      }}
      style={{ width: '100%', height: '100%' }}
    />
  );
};
