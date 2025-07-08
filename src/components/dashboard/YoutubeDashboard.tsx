import { Users, Eye, DollarSign, TrendingUp, Play, Target, BarChart3, Clock } from "lucide-react";
import { MetricCard } from "./MetricCard";
import { AnalyticsChart } from "./AnalyticsChart";
import { RecentVideos } from "./RecentVideos";
import { TopKeywords } from "./TopKeywords";

// Mock data for charts
const viewsData = [
  { name: 'Jan', views: 12000, revenue: 1200 },
  { name: 'Feb', views: 19000, revenue: 1900 },
  { name: 'Mar', views: 15000, revenue: 1500 },
  { name: 'Apr', views: 25000, revenue: 2500 },
  { name: 'May', views: 32000, revenue: 3200 },
  { name: 'Jun', views: 42000, revenue: 4200 },
  { name: 'Jul', views: 38000, revenue: 3800 },
  { name: 'Aug', views: 48000, revenue: 4800 },
];

const engagementData = [
  { name: 'Mon', engagement: 65 },
  { name: 'Tue', engagement: 72 },
  { name: 'Wed', engagement: 68 },
  { name: 'Thu', engagement: 85 },
  { name: 'Fri', engagement: 91 },
  { name: 'Sat', engagement: 88 },
  { name: 'Sun', engagement: 76 },
];

export const YoutubeDashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-background/90 p-6">
      {/* Header */}
      <div className="mb-8 animate-fade-in">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-3 rounded-xl bg-gradient-to-br from-youtube/20 to-youtube/5 border border-youtube/20">
            <Play className="h-8 w-8 text-youtube" />
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
              YouTube SEO Analytics
            </h1>
            <p className="text-muted-foreground">Track your channel performance and optimize for growth</p>
          </div>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <MetricCard
          title="Total Subscribers"
          value={248563}
          change={12.5}
          icon={Users}
          color="youtube"
          delay={0}
        />
        <MetricCard
          title="Total Views"
          value={1847932}
          change={8.2}
          icon={Eye}
          formatter={(n) => `${(n / 1000000).toFixed(1)}M`}
          color="info"
          delay={200}
        />
        <MetricCard
          title="Revenue (USD)"
          value={48750}
          change={15.8}
          icon={DollarSign}
          formatter={(n) => `$${n.toLocaleString()}`}
          color="success"
          delay={400}
        />
        <MetricCard
          title="Avg. Watch Time"
          value={425}
          change={-2.1}
          icon={Clock}
          formatter={(n) => `${Math.floor(n / 60)}:${(n % 60).toString().padStart(2, '0')}`}
          color="purple"
          delay={600}
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <AnalyticsChart
          title="Views & Revenue Over Time"
          data={viewsData}
          dataKey="views"
          color="hsl(var(--youtube-red))"
          type="area"
        />
        <AnalyticsChart
          title="Weekly Engagement Rate"
          data={engagementData}
          dataKey="engagement"
          color="hsl(var(--info-blue))"
          type="line"
        />
      </div>

      {/* Bottom Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentVideos />
        <TopKeywords />
      </div>

      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6">
        <button className="group p-4 bg-gradient-to-r from-youtube to-primary rounded-full shadow-lg hover:shadow-xl transition-all duration-300 animate-pulse-glow">
          <TrendingUp className="h-6 w-6 text-white group-hover:scale-110 transition-transform" />
        </button>
      </div>
    </div>
  );
};