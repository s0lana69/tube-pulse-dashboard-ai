import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Search, Target } from "lucide-react";

interface Keyword {
  term: string;
  rank: number;
  searches: number;
  difficulty: "easy" | "medium" | "hard";
  trend: "up" | "down" | "stable";
}

const mockKeywords: Keyword[] = [
  { term: "youtube seo", rank: 3, searches: 45000, difficulty: "medium", trend: "up" },
  { term: "video marketing", rank: 7, searches: 32000, difficulty: "hard", trend: "up" },
  { term: "content strategy", rank: 5, searches: 28000, difficulty: "medium", trend: "stable" },
  { term: "youtube analytics", rank: 12, searches: 18000, difficulty: "easy", trend: "up" },
  { term: "video optimization", rank: 15, searches: 15000, difficulty: "medium", trend: "down" },
  { term: "youtube algorithm", rank: 8, searches: 22000, difficulty: "hard", trend: "up" }
];

export const TopKeywords = () => {
  const getDifficultyColor = (difficulty: Keyword["difficulty"]) => {
    switch (difficulty) {
      case "easy": return "bg-success/20 text-success border-success/30";
      case "medium": return "bg-warning/20 text-warning border-warning/30";
      case "hard": return "bg-destructive/20 text-destructive border-destructive/30";
    }
  };

  const getTrendIcon = (trend: Keyword["trend"]) => {
    switch (trend) {
      case "up": return <TrendingUp className="h-3 w-3 text-success" />;
      case "down": return <TrendingUp className="h-3 w-3 text-destructive rotate-180" />;
      case "stable": return <div className="h-3 w-3 rounded-full bg-muted-foreground" />;
    }
  };

  return (
    <Card className="animate-slide-up border border-border/50 bg-card/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-foreground flex items-center gap-2">
          <Target className="h-5 w-5 text-info" />
          Top Keywords
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {mockKeywords.map((keyword, index) => (
          <div
            key={keyword.term}
            className="flex items-center justify-between p-3 rounded-lg border border-border/30 bg-gradient-to-r from-card/50 to-transparent hover:from-card/80 transition-all duration-300 animate-fade-in"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="flex items-center gap-3 flex-1">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-info/20 to-purple/20 text-sm font-semibold text-info">
                #{keyword.rank}
              </div>
              
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium text-foreground">{keyword.term}</span>
                  {getTrendIcon(keyword.trend)}
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Search className="h-3 w-3" />
                  {keyword.searches.toLocaleString()} searches/month
                </div>
              </div>
            </div>
            
            <Badge className={`text-xs ${getDifficultyColor(keyword.difficulty)}`}>
              {keyword.difficulty}
            </Badge>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};