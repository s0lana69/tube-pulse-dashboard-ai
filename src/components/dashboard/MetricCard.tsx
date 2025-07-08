import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";

interface MetricCardProps {
  title: string;
  value: number;
  change: number;
  icon: LucideIcon;
  formatter?: (value: number) => string;
  color?: "youtube" | "success" | "info" | "warning" | "purple";
  delay?: number;
}

export const MetricCard = ({ 
  title, 
  value, 
  change, 
  icon: Icon, 
  formatter = (n) => n.toLocaleString(),
  color = "youtube",
  delay = 0
}: MetricCardProps) => {
  const [displayValue, setDisplayValue] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
      
      // Animate the counter
      const duration = 2000;
      const steps = 60;
      const increment = value / steps;
      let currentValue = 0;
      
      const counter = setInterval(() => {
        currentValue += increment;
        if (currentValue >= value) {
          setDisplayValue(value);
          clearInterval(counter);
        } else {
          setDisplayValue(Math.floor(currentValue));
        }
      }, duration / steps);
      
      return () => clearInterval(counter);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  const colorClasses = {
    youtube: "border-l-4 border-l-youtube bg-card/50 backdrop-blur-sm",
    success: "border-l-4 border-l-success bg-card/50 backdrop-blur-sm", 
    info: "border-l-4 border-l-info bg-card/50 backdrop-blur-sm",
    warning: "border-l-4 border-l-warning bg-card/50 backdrop-blur-sm",
    purple: "border-l-4 border-l-purple bg-card/50 backdrop-blur-sm"
  };

  const iconColorClasses = {
    youtube: "text-youtube",
    success: "text-success",
    info: "text-info",
    warning: "text-warning",
    purple: "text-purple"
  };

  return (
    <div 
      className={`relative overflow-hidden transition-all duration-500 hover:translate-y-[-2px] ${
        colorClasses[color]
      } ${isVisible ? 'animate-scale-in' : 'opacity-0'}`}
    >
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg bg-${color}/10`}>
              <Icon className={`h-5 w-5 ${iconColorClasses[color]}`} />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{title}</p>
              <div className="flex items-baseline gap-2 mt-1">
                <h3 className={`text-3xl font-black ${iconColorClasses[color]}`}>
                  {formatter(displayValue)}
                </h3>
              </div>
            </div>
          </div>
          <div className={`px-2 py-1 rounded-full text-xs font-bold ${
            change >= 0 
              ? 'bg-success/10 text-success' 
              : 'bg-destructive/10 text-destructive'
          }`}>
            {change >= 0 ? '+' : ''}{change}%
          </div>
        </div>
        
        {/* Progress bar */}
        <div className="h-1 bg-muted rounded-full overflow-hidden">
          <div 
            className={`h-full bg-${color} transition-all duration-1000 ease-out`}
            style={{ width: isVisible ? '100%' : '0%' }}
          />
        </div>
      </div>
    </div>
  );
};