import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle, AlertCircle, XCircle, TrendingUp, Target, Lightbulb } from "lucide-react";

interface SeoMetric {
  name: string;
  current: number;
  potential: number;
  status: "good" | "warning" | "poor";
  description: string;
}

const seoMetrics: SeoMetric[] = [
  {
    name: "Title Optimization",
    current: 85,
    potential: 95,
    status: "good",
    description: "Keywords well positioned, could improve CTR words"
  },
  {
    name: "Description Quality",
    current: 72,
    potential: 90,
    status: "warning", 
    description: "Missing call-to-action and emotion triggers"
  },
  {
    name: "Tags Relevance",
    current: 68,
    potential: 88,
    status: "warning",
    description: "Need more long-tail keywords and synonyms"
  },
  {
    name: "Thumbnail CTR",
    current: 45,
    potential: 75,
    status: "poor",
    description: "Low contrast, text too small, missing emotion"
  },
  {
    name: "Video Structure",
    current: 78,
    potential: 92,
    status: "good",
    description: "Good chapters, could improve intro hook"
  },
  {
    name: "Engagement Signals",
    current: 62,
    potential: 85,
    status: "warning",
    description: "Low comment rate, need better CTAs"
  }
];

export const SeoAnalysis = () => {
  const overallScore = Math.round(seoMetrics.reduce((acc, metric) => acc + metric.current, 0) / seoMetrics.length);
  const potentialScore = Math.round(seoMetrics.reduce((acc, metric) => acc + metric.potential, 0) / seoMetrics.length);
  const improvement = potentialScore - overallScore;

  const getStatusIcon = (status: SeoMetric["status"]) => {
    switch (status) {
      case "good": return <CheckCircle className="h-4 w-4 text-success" />;
      case "warning": return <AlertCircle className="h-4 w-4 text-warning" />;
      case "poor": return <XCircle className="h-4 w-4 text-destructive" />;
    }
  };

  const getStatusColor = (status: SeoMetric["status"]) => {
    switch (status) {
      case "good": return "text-success";
      case "warning": return "text-warning";
      case "poor": return "text-destructive";
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-success";
    if (score >= 60) return "text-warning";
    return "text-destructive";
  };

  return (
    <Card className="animate-scale-in border border-border/50 bg-card/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-foreground flex items-center gap-2">
          <Target className="h-5 w-5 text-purple" />
          SEO Analysis & Optimization
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Overall Score */}
        <div className="text-center p-6 rounded-xl bg-gradient-to-br from-purple/10 to-info/10 border border-purple/20">
          <div className="flex items-center justify-center gap-8 mb-4">
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-1">Current Score</p>
              <div className={`text-3xl font-bold ${getScoreColor(overallScore)}`}>
                {overallScore}%
              </div>
            </div>
            
            <TrendingUp className="h-8 w-8 text-muted-foreground" />
            
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-1">Potential Score</p>
              <div className="text-3xl font-bold text-success">
                {potentialScore}%
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-center gap-2 mb-3">
            <Badge className="bg-success/20 text-success border-success/30">
              <TrendingUp className="h-3 w-3 mr-1" />
              +{improvement}% improvement possible
            </Badge>
          </div>
          
          <Button className="bg-gradient-to-r from-purple to-info hover:from-purple/80 hover:to-info/80 text-white">
            <Lightbulb className="h-4 w-4 mr-2" />
            Get Optimization Plan
          </Button>
        </div>

        {/* Detailed Metrics */}
        <div className="space-y-4">
          <h4 className="font-semibold text-foreground flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-info" />
            Detailed Analysis
          </h4>
          
          {seoMetrics.map((metric, index) => (
            <div
              key={metric.name}
              className="p-4 rounded-lg border border-border/30 bg-gradient-to-r from-card/30 to-transparent hover:from-card/60 transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  {getStatusIcon(metric.status)}
                  <span className="font-medium text-foreground">{metric.name}</span>
                </div>
                <div className="text-right">
                  <span className={`text-sm font-medium ${getStatusColor(metric.status)}`}>
                    {metric.current}%
                  </span>
                  <span className="text-xs text-muted-foreground ml-2">
                    → {metric.potential}%
                  </span>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex gap-2">
                  <div className="flex-1">
                    <Progress 
                      value={metric.current} 
                      className="h-2"
                    />
                  </div>
                  <div className="flex-1">
                    <Progress 
                      value={metric.potential} 
                      className="h-2 opacity-50"
                    />
                  </div>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {metric.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};