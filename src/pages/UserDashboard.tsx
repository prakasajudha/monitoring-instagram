import { useEffect, useState } from 'react';
import { KPICard } from '../components/KPICard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import FileText from 'lucide-react/dist/esm/icons/file-text';
import Eye from 'lucide-react/dist/esm/icons/eye';
import Heart from 'lucide-react/dist/esm/icons/heart';
import MessageCircle from 'lucide-react/dist/esm/icons/message-circle';
import Share2 from 'lucide-react/dist/esm/icons/share-2';
import TrendingUp from 'lucide-react/dist/esm/icons/trending-up';
import Users from 'lucide-react/dist/esm/icons/users';
import ExternalLink from 'lucide-react/dist/esm/icons/external-link';
import { Trophy } from 'lucide-react';

interface UserPost {
  id: string;
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

const mockUserPosts: UserPost[] = [
  {
    id: '1',
    briefTitle: 'Energi untuk Negeri',
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
    id: '2',
    briefTitle: 'Indonesia International Motor Show 2026',
    contentType: 'carousel',
    reach: 12300,
    likes: 1890,
    comments: 156,
    impression: 14800,
    engagementRate: 16.9,
    postLink: 'https://instagram.com/p/def456',
    date: '2026-02-03',
  },
  {
    id: '3',
    briefTitle: 'Indonesia International Motor Show 2026',
    contentType: 'photo',
    reach: 10800,
    likes: 1650,
    comments: 134,
    impression: 13200,
    engagementRate: 16.8,
    postLink: 'https://instagram.com/p/ghi789',
    date: '2026-01-28',
  },
  {
    id: '4',
    briefTitle: 'Indonesia International Motor Show 2026',
    contentType: 'photo',
    reach: 9500,
    likes: 1420,
    comments: 112,
    impression: 11800,
    engagementRate: 16.4,
    postLink: 'https://instagram.com/p/jkl012',
    date: '2026-01-25',
  },
  {
    id: '5',
    briefTitle: 'Energi untuk Negeri',
    contentType: 'reels',
    reach: 8700,
    likes: 1280,
    comments: 98,
    impression: 10500,
    engagementRate: 16.1,
    postLink: 'https://instagram.com/p/mno345',
    date: '2026-01-20',
  },
];

export function UserDashboard() {
  const [filterYear, setFilterYear] = useState('2026');
  const [filterQuarter, setFilterQuarter] = useState('all');
  const [filterBrief, setFilterBrief] = useState('all');
  const [posts] = useState<UserPost[]>(mockUserPosts);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const totalPosts = posts.length;
  const totalReach = posts.reduce((sum, post) => sum + post.reach, 0);
  const totalLikes = posts.reduce((sum, post) => sum + post.likes, 0);
  const totalComments = posts.reduce((sum, post) => sum + post.comments, 0);
  const totalImpression = posts.reduce((sum, post) => sum + post.impression, 0);
  const avgEngagementRate = (posts.reduce((sum, post) => sum + post.engagementRate, 0) / posts.length).toFixed(1);

  const userKpiData = [
    { title: 'My Posts', value: totalPosts.toString(), icon: FileText, trend: { value: '15.2%', isPositive: true } },
    { title: 'Total Reach', value: totalReach.toLocaleString(), icon: Eye, trend: { value: '12.8%', isPositive: true } },
    { title: 'Total Likes', value: totalLikes.toLocaleString(), icon: Heart, trend: { value: '9.8%', isPositive: true } },
    { title: 'Total Comments', value: totalComments.toLocaleString(), icon: MessageCircle, trend: { value: '6.3%', isPositive: true } },
    { title: 'Total Impression', value: totalImpression.toLocaleString(), icon: Share2, trend: { value: '8.1%', isPositive: true } },
    { title: 'Engagement Rate', value: `${avgEngagementRate}%`, icon: TrendingUp, trend: { value: '4.5%', isPositive: true } },
  ];

  const getContentTypeColor = (type: string) => {
    switch (type) {
      case 'photo':
        return 'bg-primary/10 text-primary';
      case 'carousel':
        return 'bg-tertiary/10 text-tertiary';
      case 'reels':
        return 'bg-success/10 text-success';
      default:
        return 'bg-gray-200 text-gray-700';
    }
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <Card className="border border-border bg-card lg:col-span-2">
          <CardContent className="p-6">
            <div className="flex items-center gap-6">
              <Avatar className="w-24 h-24 border-4 border-primary/20 shadow-lg flex-shrink-0">
                <AvatarImage src="https://c.animaapp.com/mjxnk1q0BwGZL7/img/ai_2.png" alt="user avatar placeholder" />
                <AvatarFallback className="bg-secondary text-secondary-foreground text-2xl">JD</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h2 className="text-xl font-bold text-foreground mb-1">Rina Wijayanti</h2>
                <p className="text-sm text-primary font-medium mb-2">@rina_wijayanti</p>
                <p className="text-xs text-muted-foreground">rina.wijayanti@pertamina.com</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-border bg-card lg:col-span-1">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-muted-foreground mb-2">Total Followers</p>
                <p className="text-3xl font-semibold text-foreground">8,450</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Users className="w-6 h-6 text-primary" strokeWidth={1.5} />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border border-border bg-card lg:col-span-1">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-muted-foreground mb-2">Total Point</p>
                <p className="text-3xl font-semibold text-foreground">2850</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-warning/10">
                <Trophy className="w-6 h-6 text-warning" strokeWidth={1.5} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border border-border bg-card">
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <CardTitle className="text-foreground">Filter Options</CardTitle>
            <div className="flex flex-wrap gap-3">
              <Select value={filterYear} onValueChange={setFilterYear}>
                <SelectTrigger className="w-32 bg-background text-foreground border-border">
                  <SelectValue placeholder="Year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2026">2026</SelectItem>
                  <SelectItem value="2025">2025</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filterQuarter} onValueChange={setFilterQuarter}>
                <SelectTrigger className="w-32 bg-background text-foreground border-border">
                  <SelectValue placeholder="Quarter" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Quarters</SelectItem>
                  <SelectItem value="q1">Q1</SelectItem>
                  <SelectItem value="q2">Q2</SelectItem>
                  <SelectItem value="q3">Q3</SelectItem>
                  <SelectItem value="q4">Q4</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filterBrief} onValueChange={setFilterBrief}>
                <SelectTrigger className="w-64 bg-background text-foreground border-border">
                  <SelectValue placeholder="Brief" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Briefs</SelectItem>
                  <SelectItem value="1">Indonesia International Motor Show 2026</SelectItem>
                  <SelectItem value="2">Energi untuk Negeri</SelectItem>
                  <SelectItem value="3">Connecting Mandalika GP</SelectItem>
                  <SelectItem value="4">MyPertamina Pasar Rakyat</SelectItem>
                  <SelectItem value="5">MyPertamina Fair Show</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {userKpiData.map((kpi, index) => (
          <KPICard key={kpi.title} {...kpi} delay={index * 100} />
        ))}
      </div>

      <Card className="border border-border bg-card">
        <CardHeader>
          <CardTitle className="text-foreground">My Recent Posts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
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
                {posts.map((post) => (
                  <tr key={post.id} className="border-b border-border hover:bg-accent transition-colors duration-200">
                    <td className="py-3 px-4 text-sm font-medium text-foreground">{post.briefTitle}</td>
                    <td className="py-3 px-4 text-sm">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getContentTypeColor(post.contentType)}`}>
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
