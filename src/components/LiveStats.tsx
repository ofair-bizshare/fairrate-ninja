
import React, { useState, useEffect } from 'react';
import { Users, Star, BadgeCheck, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Stat {
  icon: React.ReactNode;
  value: number;
  label: string;
  increment?: number;
  format?: (value: number) => string;
}

const LiveStats: React.FC = () => {
  const [stats, setStats] = useState<Stat[]>([
    {
      icon: <Users className="h-5 w-5 text-primary" />,
      value: 0,
      label: "לקוחות רשומים",
      increment: 0,
      format: (v: number) => v.toLocaleString()
    },
    {
      icon: <Star className="h-5 w-5 text-yellow-400" />,
      value: 0,
      label: "דירוגים שהושארו",
      increment: 0,
      format: (v: number) => v.toLocaleString()
    },
    {
      icon: <BadgeCheck className="h-5 w-5 text-primary" />,
      value: 0,
      label: "בעלי מקצוע מאומתים",
      increment: 0,
      format: (v: number) => v.toLocaleString()
    },
    {
      icon: <Clock className="h-5 w-5 text-primary" />,
      value: 0,
      label: "דקות זמן תגובה ממוצע",
      format: (v: number) => `${v}%`
    }
  ]);

  return (
    <div className="w-full py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-6">
          <div className="ofair-chip mb-2">נתונים חיים</div>
          <h2 className="text-2xl font-bold rtl">מה קורה עכשיו ב-oFair</h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="ofair-card text-center flex flex-col items-center"
            >
              <div className="bg-primary/5 p-3 rounded-full mb-3 inline-flex">
                {stat.icon}
              </div>
              <div className="text-2xl md:text-3xl font-bold mb-1">
                {stat.format ? stat.format(stat.value) : stat.value}
              </div>
              <div className="text-sm text-muted-foreground rtl">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LiveStats;
