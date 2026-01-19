import { useEffect } from 'react';
import { KPICard } from '../components/KPICard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { FileText, Heart, MessageCircle, TrendingUp, ExternalLink } from 'lucide-react';

const kpiData = [
  { title: 'Total Posts Detected', value: '5', icon: FileText, trend: { value: '12.5%', isPositive: true } },
  { title: 'Total Likes', value: '8.6K', icon: Heart, trend: { value: '8.3%', isPositive: true } },
  { title: 'Total Comments', value: '689', icon: MessageCircle, trend: { value: '5.7%', isPositive: true } },
  { title: 'Engagement Rate', value: '16.5%', icon: TrendingUp, trend: { value: '2.1%', isPositive: true } },
];

const trendData = [
  { date: 'Jan',posts: 2, likes: 2901, comments: 250 },
  { date: 'Feb', posts: 1, likes: 2853, comments: 230},
  { date: 'Mar', posts: 2, likes: 2846, comments: 209 },
  { date: 'Apr', posts: 0, likes: 0, comments: 0 },
  { date: 'May', posts: 0, likes: 0, comments: 0 },
  { date: 'Jun', posts: 0, likes: 0, comments: 0 },
  { date: 'Jul', posts: 0, likes: 0, comments: 0 },
  { date: 'Aug', posts: 0, likes: 0, comments: 0 },
  { date: 'Sep', posts: 0, likes: 0, comments: 0 },
  { date: 'Oct', posts: 0, likes: 0, comments: 0 },
  { date: 'Nov', posts: 0, likes: 0, comments: 0 },
  { date: 'Dec', posts: 0, likes: 0, comments: 0 },
];

const contentTypeData = [
  { name: 'Photo', value: 2, color: 'hsl(217, 91%, 60%)' },
  { name: 'Carousel', value: 1, color: 'hsl(13, 85%, 62%)' },
  { name: 'Reels', value: 2, color: 'hsl(145, 55%, 45%)' },
];

interface RecentPost {
  id: number;
  user: string;
  fullName: string;
  briefTitle: string;
  contentType: 'photo' | 'carousel' | 'reels';
  reach: number;
  likes: number;
  comments: number;
  impression: number;
  engagementRate: number;
  postLink: string;
  date: string;
}

const recentPosts: RecentPost[] = [
  {
    id: 1,
    user: 'rina_w',
    fullName: 'Rina Wijayanti',
    briefTitle: 'Indonesia International Motor Show 2026',
    contentType: 'reels',
    reach: 15600,
    likes: 2340,
    comments: 189,
    impression: 18500,
    engagementRate: 16.5,
    postLink: 'https://instagram.com/p/abc123',
    date: '2026-02-05',
  },
  {
    id: 2,
    user: 'agus_p',
    fullName: 'Agus Prasetyo',
    briefTitle: 'Indonesia International Motor Show 2026',
    contentType: 'carousel',
    reach: 12300,
    likes: 1890,
    comments: 156,
    impression: 14800,
    engagementRate: 16.9,
    postLink: 'https://instagram.com/p/def456',
    date: '2026-02-05',
  },
  {
    id: 3,
    user: 'dian_p',
    fullName: 'Dian Permata',
    briefTitle: 'Energi untuk Negeri',
    contentType: 'photo',
    reach: 10800,
    likes: 1650,
    comments: 134,
    impression: 13200,
    engagementRate: 16.8,
    postLink: 'https://instagram.com/p/ghi789',
    date: '2026-02-04',
  },
  {
    id: 4,
    user: 'fajar_n',
    fullName: 'Fajar Nugroho',
    briefTitle: 'Indonesia International Motor Show 2026',
    contentType: 'photo',
    reach: 9500,
    likes: 1420,
    comments: 112,
    impression: 11800,
    engagementRate: 16.4,
    postLink: 'https://instagram.com/p/jkl012',
    date: '2026-02-04',
  },
  {
    id: 5,
    user: 'lina_m',
    fullName: 'Lina Marlina',
    briefTitle: 'Energi untuk Negeri',
    contentType: 'reels',
    reach: 8700,
    likes: 1280,
    comments: 98,
    impression: 10500,
    engagementRate: 16.1,
    postLink: 'https://instagram.com/p/mno345',
    date: '2026-02-03',
  },
];

export function GlobalDashboard() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Global Dashboard</h1>
        <p className="text-muted-foreground">Monitor Instagram hashtag engagement across all campaigns</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiData.map((kpi, index) => (
          <KPICard key={kpi.title} {...kpi} delay={index * 100} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border border-border bg-card">
          <CardHeader>
            <CardTitle className="text-foreground">Engagement Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(0, 0%, 88%)" />
                <XAxis dataKey="date" stroke="hsl(0, 0%, 38%)" style={{ fontSize: '12px' }} />
                <YAxis stroke="hsl(0, 0%, 38%)" style={{ fontSize: '12px' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(0, 0%, 100%)',
                    border: '1px solid hsl(0, 0%, 88%)',
                    borderRadius: '8px',
                    color: 'hsl(231, 17%, 20%)',
                  }}
                />
                <Legend wrapperStyle={{ color: 'hsl(231, 17%, 20%)' }} />
                <Line type="monotone" dataKey="posts" stroke="hsl(217, 91%, 60%)" strokeWidth={2} dot={{ fill: 'hsl(217, 91%, 60%)' }} />
                <Line type="monotone" dataKey="likes" stroke="hsl(13, 85%, 62%)" strokeWidth={2} dot={{ fill: 'hsl(13, 85%, 62%)' }} />
                <Line type="monotone" dataKey="comments" stroke="hsl(145, 55%, 45%)" strokeWidth={2} dot={{ fill: 'hsl(145, 55%, 45%)' }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border border-border bg-card">
          <CardHeader>
            <CardTitle className="text-foreground">Content Type Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={contentTypeData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {contentTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(0, 0%, 100%)',
                    border: '1px solid hsl(0, 0%, 88%)',
                    borderRadius: '8px',
                    color: 'hsl(231, 17%, 20%)',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card className="border border-border bg-card">
          <CardHeader>
            <CardTitle className="text-foreground">Recent Posts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-sm font-medium text-foreground">User</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-foreground">Upload Date</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-foreground">Brief</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-foreground">Content Type</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-foreground">Reach</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-foreground">Likes</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-foreground">Comments</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-foreground">Impression</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-foreground">Engagement Rate</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-foreground">Link</th>
                  </tr>
                </thead>
                <tbody>
                  {recentPosts.map((post) => (
                    <tr key={post.id} className="border-b border-border hover:bg-accent transition-colors duration-200">
                    <td className="py-3 px-4 text-sm text-foreground">
                      <div>
                        <p className="font-medium">{post.fullName}</p>
                        <p className="text-xs text-muted-foreground">@{post.user}</p>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm text-muted-foreground">
                      {new Date(post.date).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'short', 
                        day: 'numeric' 
                      })}
                    </td>
                    <td className="py-3 px-4 text-sm font-medium text-foreground">{post.briefTitle}</td>
                    <td className="py-3 px-4 text-sm">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          post.contentType === 'photo'
                            ? 'bg-primary/10 text-primary'
                            : post.contentType === 'carousel'
                            ? 'bg-tertiary/10 text-tertiary'
                            : 'bg-success/10 text-success'
                        }`}
                      >
                        {post.contentType}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm text-foreground">{post.reach.toLocaleString()}</td>
                    <td className="py-3 px-4 text-sm text-foreground">{post.likes.toLocaleString()}</td>
                    <td className="py-3 px-4 text-sm text-foreground">{post.comments.toLocaleString()}</td>
                    <td className="py-3 px-4 text-sm text-foreground">{post.impression.toLocaleString()}</td>
                    <td className="py-3 px-4 text-sm font-semibold text-success">{post.engagementRate}%</td>
                      <td className="py-3 px-4 text-sm">
                        <a
                          href={post.postLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:text-primary/80 transition-colors"
                        >
                          <ExternalLink className="w-4 h-4" strokeWidth={1.5} />
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
      </Card>
    </div>
  );
}
