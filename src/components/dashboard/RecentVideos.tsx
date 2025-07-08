import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Play, Eye, ThumbsUp, MessageCircle } from "lucide-react";

interface Video {
  id: string;
  title: string;
  views: number;
  likes: number;
  comments: number;
  duration: string;
  publishedAt: string;
  thumbnail: string;
  performance: "excellent" | "good" | "average" | "poor";
}

const mockVideos: Video[] = [
  {
    id: "1",
    title: "How to Optimize YouTube SEO for Maximum Reach",
    views: 45620,
    likes: 1250,
    comments: 89,
    duration: "12:34",
    publishedAt: "2 days ago",
    thumbnail: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=300&h=200&fit=crop",
    performance: "excellent"
  },
  {
    id: "2",
    title: "YouTube Analytics Deep Dive: Understanding Your Data",
    views: 23800,
    likes: 890,
    comments: 45,
    duration: "18:22",
    publishedAt: "5 days ago",
    thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=300&h=200&fit=crop",
    performance: "good"
  },
  {
    id: "3",
    title: "Content Strategy That Actually Works in 2024",
    views: 12400,
    likes: 340,
    comments: 28,
    duration: "15:47",
    publishedAt: "1 week ago",
    thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300&h=200&fit=crop",
    performance: "average"
  }
];

export const RecentVideos = () => {
  const getPerformanceBadge = (performance: Video["performance"]) => {
    const variants = {
      excellent: { color: "bg-success text-success-foreground", label: "Excellent" },
      good: { color: "bg-info text-info-foreground", label: "Good" },
      average: { color: "bg-warning text-warning-foreground", label: "Average" },
      poor: { color: "bg-destructive text-destructive-foreground", label: "Poor" }
    };
    
    const variant = variants[performance];
    return (
      <Badge className={`${variant.color} text-xs`}>
        {variant.label}
      </Badge>
    );
  };

  return (
    <Card className="animate-slide-up border border-border/50 bg-card/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-foreground flex items-center gap-2">
          <Play className="h-5 w-5 text-youtube" />
          Recent Videos
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {mockVideos.map((video, index) => (
          <div
            key={video.id}
            className="group flex gap-4 p-3 rounded-lg border border-border/30 bg-gradient-to-r from-card/50 to-transparent hover:from-card/80 hover:shadow-md transition-all duration-300 animate-fade-in"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="relative flex-shrink-0">
              <img
                src={video.thumbnail}
                alt={video.title}
                className="w-16 h-12 rounded-md object-cover"
              />
              <div className="absolute inset-0 bg-black/20 rounded-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Play className="h-4 w-4 text-white" />
              </div>
              <span className="absolute bottom-1 right-1 bg-black/80 text-white text-xs px-1 rounded">
                {video.duration}
              </span>
            </div>
            
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-sm text-foreground truncate group-hover:text-youtube transition-colors">
                {video.title}
              </h4>
              <p className="text-xs text-muted-foreground mb-2">{video.publishedAt}</p>
              
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Eye className="h-3 w-3" />
                  {video.views.toLocaleString()}
                </div>
                <div className="flex items-center gap-1">
                  <ThumbsUp className="h-3 w-3" />
                  {video.likes.toLocaleString()}
                </div>
                <div className="flex items-center gap-1">
                  <MessageCircle className="h-3 w-3" />
                  {video.comments}
                </div>
              </div>
            </div>
            
            <div className="flex-shrink-0">
              {getPerformanceBadge(video.performance)}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};