'use client';

import { timelineData } from '@/data/election';
import { Map, Users, Bell, FileText, Eye, Mic, Box, BarChart } from 'lucide-react';
import './learn.css';

const IconMap = {
  Map: <Map size={24} />,
  Users: <Users size={24} />,
  Bell: <Bell size={24} />,
  FileText: <FileText size={24} />,
  Eye: <Eye size={24} />,
  Mic: <Mic size={24} />,
  Box: <Box size={24} />,
  BarChart: <BarChart size={24} />
};

export default function Learn() {
  return (
    <div className="learn-page container">
      <div className="page-header text-center animate-fade-in">
        <h1 className="h1">The Election Timeline</h1>
        <p className="p max-w-2xl mx-auto">
          Understand the step-by-step process of how the world's largest democracy conducts its elections.
        </p>
      </div>

      <div className="timeline">
        {timelineData.map((item, index) => (
          <div 
            key={item.step} 
            className={`timeline-item animate-fade-in delay-${(index % 5 + 1) * 100}`}
          >
            <div className="timeline-connector">
              <div 
                className="timeline-icon-wrapper" 
                style={{ 
                  backgroundColor: item.color,
                  boxShadow: `0 0 20px ${item.color}40`
                }}
              >
                {IconMap[item.icon]}
              </div>
              {index !== timelineData.length - 1 && <div className="timeline-line"></div>}
            </div>
            
            <div className="timeline-content card glass">
              <div className="step-badge" style={{ color: item.color, backgroundColor: `${item.color}20` }}>
                Step {item.step}
              </div>
              <h2 className="h2" style={{ fontSize: '1.5rem', margin: '0.5rem 0' }}>{item.title}</h2>
              <p className="p">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
