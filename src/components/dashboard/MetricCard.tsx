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
    youtube: "border-youtube/20 bg-gradient-to-br from-youtube/10 to-transparent",
    success: "border-success/20 bg-gradient-to-br from-success/10 to-transparent",
    info: "border-info/20 bg-gradient-to-br from-info/10 to-transparent",
    warning: "border-warning/20 bg-gradient-to-br from-warning/10 to-transparent",
    purple: "border-purple/20 bg-gradient-to-br from-purple/10 to-transparent"
  };

  const iconColorClasses = {
    youtube: "text-youtube",
    success: "text-success",
    info: "text-info",
    warning: "text-warning",
    purple: "text-purple"
  };

  return (
    <Card 
      className={`relative overflow-hidden border transition-all duration-500 hover:shadow-lg hover:scale-105 ${
        colorClasses[color]
      } ${isVisible ? 'animate-scale-in' : 'opacity-0'}`}
    >
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <div className="flex items-baseline gap-2">
              <h3 className={`text-2xl font-bold animate-counter-up ${iconColorClasses[color]}`}>
                {formatter(displayValue)}
              </h3>
              <span className={`text-sm font-medium flex items-center gap-1 ${
                change >= 0 ? 'text-success' : 'text-destructive'
              }`}>
                {change >= 0 ? '↗' : '↘'} {Math.abs(change)}%
              </span>
            </div>
          </div>
          <div className={`p-3 rounded-full bg-gradient-to-br from-${color}/20 to-${color}/5`}>
            <Icon className={`h-6 w-6 ${iconColorClasses[color]}`} />
          </div>
        </div>
        
        {/* Animated background glow */}
        <div className={`absolute inset-0 bg-gradient-to-r from-${color}/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300`} />
      </CardContent>
    </Card>
  );
};