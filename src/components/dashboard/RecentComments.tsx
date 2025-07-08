import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MessageCircle, Heart, Flag, Reply } from "lucide-react";

interface Comment {
  id: string;
  author: string;
  avatar: string;
  content: string;
  likes: number;
  timeAgo: string;
  sentiment: "positive" | "neutral" | "negative";
  videoTitle: string;
  isReplied: boolean;
}

const mockComments: Comment[] = [
  {
    id: "1",
    author: "Sarah Johnson",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face",
    content: "Amazing tutorial! This helped me increase my views by 300%. Thank you so much!",
    likes: 24,
    timeAgo: "2 hours ago",
    sentiment: "positive",
    videoTitle: "How to Optimize YouTube SEO...",
    isReplied: true
  },
  {
    id: "2",
    author: "Mike Chen",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
    content: "Could you make a video about thumbnail optimization? I struggle with CTR.",
    likes: 12,
    timeAgo: "4 hours ago",
    sentiment: "neutral",
    videoTitle: "YouTube Analytics Deep Dive...",
    isReplied: false
  },
  {
    id: "3",
    author: "Emma Wilson",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face",
    content: "This strategy actually works! Gained 500 subscribers in 2 weeks following your advice.",
    likes: 31,
    timeAgo: "6 hours ago",
    sentiment: "positive",
    videoTitle: "Content Strategy That Actually...",
    isReplied: true
  },
  {
    id: "4",
    author: "Alex Rodriguez",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
    content: "The audio quality could be better in this video, but the content is solid.",
    likes: 8,
    timeAgo: "8 hours ago",
    sentiment: "neutral",
    videoTitle: "How to Optimize YouTube SEO...",
    isReplied: false
  },
  {
    id: "5",
    author: "Lisa Park",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=40&h=40&fit=crop&crop=face",
    content: "Subscribed! Looking forward to more SEO tips. Your channel is a goldmine!",
    likes: 19,
    timeAgo: "12 hours ago",
    sentiment: "positive",
    videoTitle: "YouTube Analytics Deep Dive...",
    isReplied: true
  }
];

export const RecentComments = () => {
  const getSentimentColor = (sentiment: Comment["sentiment"]) => {
    switch (sentiment) {
      case "positive": return "text-success";
      case "negative": return "text-destructive"; 
      case "neutral": return "text-muted-foreground";
    }
  };

  const getSentimentBadge = (sentiment: Comment["sentiment"]) => {
    const variants = {
      positive: { color: "bg-success/20 text-success border-success/30", label: "😊" },
      neutral: { color: "bg-muted/20 text-muted-foreground border-muted/30", label: "😐" },
      negative: { color: "bg-destructive/20 text-destructive border-destructive/30", label: "😞" }
    };
    
    return variants[sentiment];
  };

  return (
    <Card className="animate-slide-up border border-border/50 bg-card/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-foreground flex items-center gap-2">
          <MessageCircle className="h-5 w-5 text-info" />
          Recent Comments
          <Badge className="bg-youtube/20 text-youtube border-youtube/30 text-xs">
            {mockComments.length} new
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {mockComments.map((comment, index) => (
          <div
            key={comment.id}
            className="group flex gap-3 p-4 rounded-lg border border-border/30 bg-gradient-to-r from-card/50 to-transparent hover:from-card/80 hover:shadow-md transition-all duration-300 animate-fade-in"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <Avatar className="w-10 h-10 border-2 border-border/50">
              <AvatarImage src={comment.avatar} alt={comment.author} />
              <AvatarFallback className="bg-gradient-to-br from-primary/20 to-secondary/20">
                {comment.author.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-medium text-sm text-foreground">{comment.author}</span>
                <span className="text-xs text-muted-foreground">{comment.timeAgo}</span>
                <Badge className={`text-xs ${getSentimentBadge(comment.sentiment).color}`}>
                  {getSentimentBadge(comment.sentiment).label}
                </Badge>
              </div>
              
              <p className="text-sm text-foreground/90 mb-2 leading-relaxed">
                {comment.content}
              </p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="text-xs bg-muted/30 px-2 py-1 rounded-full">
                    {comment.videoTitle}
                  </span>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Heart className="h-3 w-3" />
                    {comment.likes}
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {comment.isReplied ? (
                      <Badge className="bg-success/20 text-success border-success/30 text-xs">
                        <Reply className="h-3 w-3 mr-1" />
                        Replied
                      </Badge>
                    ) : (
                      <button className="text-xs text-muted-foreground hover:text-primary transition-colors">
                        Reply
                      </button>
                    )}
                    <button className="text-xs text-muted-foreground hover:text-warning transition-colors">
                      <Flag className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};