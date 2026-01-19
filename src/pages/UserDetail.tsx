import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  ArrowLeft, 
  Users, 
  FileText, 
  Eye, 
  Heart, 
  MessageCircle, 
  Share2, 
  TrendingUp, 
  ExternalLink 
} from 'lucide-react';

interface UserDetail {
  id: string;
  fullName: string;
  username: string;
  email: string;
  instagramUsername: string;
  avatar: string;
  followers: number;
}

interface Post {
  id: string;
  briefTitle: string;
  contentType: 'carousel' | 'photo' | 'reels';
  reach: number;
  likes: number;
  comments: number;
  impression: number;
  engagementRate: number;
  postLink: string;
  date: string;
}

const mockUserDetail: UserDetail = {
  id: '1',
  fullName: 'Rina Wijayanti',
  username: 'rina_w',
  email: 'rina.wijayanti@pertamina.com',
  instagramUsername: '@rina_wijayanti',
  avatar: 'https://c.animaapp.com/mjxnk1q0BwGZL7/img/ai_2.png',
  followers: 12500,
};

const mockPosts: Post[] = [
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
    briefTitle: 'Energi untuk Negeri',
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
    briefTitle: 'Energi untuk Negeri',
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
    briefTitle: 'Indonesia International Motor Show 2026',
    contentType: 'reels',
    reach: 8700,
    likes: 1280,
    comments: 98,
    impression: 10500,
    engagementRate: 16.1,
    postLink: 'https://instagram.com/p/mno345',
    date: '2026-01-20',
  },
  {
    id: '6',
    briefTitle: 'Energi untuk Negeri',
    contentType: 'carousel',
    reach: 7900,
    likes: 1150,
    comments: 87,
    impression: 9800,
    engagementRate: 15.9,
    postLink: 'https://instagram.com/p/pqr678',
    date: '2026-01-18',
  },
  {
    id: '7',
    briefTitle: 'Indonesia International Motor Show 2026',
    contentType: 'reels',
    reach: 7200,
    likes: 1050,
    comments: 76,
    impression: 8900,
    engagementRate: 15.8,
    postLink: 'https://instagram.com/p/stu901',
    date: '2025-12-15',
  },
  {
    id: '8',
    briefTitle: 'Indonesia International Motor Show 2026',
    contentType: 'photo',
    reach: 6800,
    likes: 980,
    comments: 68,
    impression: 8200,
    engagementRate: 15.6,
    postLink: 'https://instagram.com/p/vwx234',
    date: '2025-12-10',
  },
];

export function UserDetail() {
  // const { userId } = useParams();
  const navigate = useNavigate();
  const [posts] = useState<Post[]>(mockPosts);
  const [filterYear, setFilterYear] = useState('2026');
  const [filterQuarter, setFilterQuarter] = useState('all');
  const [filterBrief, setFilterBrief] = useState('all');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const totalPosts = posts.length;
  const totalReach = posts.reduce((sum, post) => sum + post.reach, 0);
  const totalLikes = posts.reduce((sum, post) => sum + post.likes, 0);
  const totalComments = posts.reduce((sum, post) => sum + post.comments, 0);
  const totalImpression = posts.reduce((sum, post) => sum + post.impression, 0);
  const avgEngagementRate = (posts.reduce((sum, post) => sum + post.engagementRate, 0) / posts.length).toFixed(1);

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
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate('/leaderboard')}
          className="bg-transparent text-foreground hover:bg-accent hover:text-accent-foreground"
        >
          <ArrowLeft className="w-5 h-5" strokeWidth={1.5} />
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">User Profile</h1>
          <p className="text-muted-foreground">Detailed performance and engagement metrics</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border border-border bg-card">
          <CardContent className="p-6">
            <div className="flex items-center gap-6">
              <Avatar className="w-24 h-24 border-4 border-primary/20 shadow-lg flex-shrink-0">
                <AvatarImage src={mockUserDetail.avatar} alt={mockUserDetail.fullName} />
                <AvatarFallback className="bg-secondary text-secondary-foreground text-2xl">
                  {mockUserDetail.fullName.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h2 className="text-xl font-bold text-foreground mb-1">{mockUserDetail.fullName}</h2>
                <p className="text-sm text-primary font-medium mb-2">{mockUserDetail.instagramUsername}</p>
                <p className="text-xs text-muted-foreground">{mockUserDetail.email}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-border bg-card">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-muted-foreground mb-2">Total Followers</p>
                <p className="text-3xl font-semibold text-foreground">{mockUserDetail.followers.toLocaleString()}</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Users className="w-6 h-6 text-primary" strokeWidth={1.5} />
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
        <Card className="border border-border bg-card">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-muted-foreground mb-2">My Posts</p>
                <p className="text-3xl font-semibold text-foreground">{totalPosts}</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-tertiary/10">
                <FileText className="w-6 h-6 text-tertiary" strokeWidth={1.5} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-border bg-card">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-muted-foreground mb-2">Total Reach</p>
                <p className="text-3xl font-semibold text-foreground">{totalReach.toLocaleString()}</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Eye className="w-6 h-6 text-primary" strokeWidth={1.5} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-border bg-card">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-muted-foreground mb-2">Total Likes</p>
                <p className="text-3xl font-semibold text-foreground">{totalLikes.toLocaleString()}</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-destructive/10">
                <Heart className="w-6 h-6 text-destructive" strokeWidth={1.5} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-border bg-card">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-muted-foreground mb-2">Total Comments</p>
                <p className="text-3xl font-semibold text-foreground">{totalComments.toLocaleString()}</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <MessageCircle className="w-6 h-6 text-primary" strokeWidth={1.5} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-border bg-card">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-muted-foreground mb-2">Total Impression</p>
                <p className="text-3xl font-semibold text-foreground">{totalImpression.toLocaleString()}</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-success/10">
                <Share2 className="w-6 h-6 text-success" strokeWidth={1.5} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-border bg-card">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-muted-foreground mb-2">Engagement Rate</p>
                <p className="text-3xl font-semibold text-foreground">{avgEngagementRate}%</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-warning/10">
                <TrendingUp className="w-6 h-6 text-warning" strokeWidth={1.5} />
              </div>
            </div>
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
