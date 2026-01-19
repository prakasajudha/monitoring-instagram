import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { useAuth } from '../contexts/AuthContext';
import Trophy from 'lucide-react/dist/esm/icons/trophy';
import Medal from 'lucide-react/dist/esm/icons/medal';
import Award from 'lucide-react/dist/esm/icons/award';
import TrendingUp from 'lucide-react/dist/esm/icons/trending-up';
import Heart from 'lucide-react/dist/esm/icons/heart';
import MessageCircle from 'lucide-react/dist/esm/icons/message-circle';
import Share2 from 'lucide-react/dist/esm/icons/share-2';
import Search from 'lucide-react/dist/esm/icons/search';
import ChevronLeft from 'lucide-react/dist/esm/icons/chevron-left';
import ChevronRight from 'lucide-react/dist/esm/icons/chevron-right';

interface LeaderboardUser {
  rank: number;
  id: string;
  fullName: string;
  username: string;
  instagramUsername: string;
  avatar: string;
  totalPosts: number;
  totalReach: number;
  totalEngagement: number;
  points: number;
}

interface Brief {
  id: string;
  title: string;
  campaign: string;
}

const mockBriefs: Brief[] = [
  { id: '1', title: 'Energi Untuk Negeri', campaign: 'Q1 2024' },
  { id: '2', title: 'Indonesia International Motor Show 2026', campaign: 'Q1 2024' },
  { id: '3', title: 'Connecting Sustainability', campaign: 'Q2 2026' },
  { id: '4', title: 'Connecting Mandalika GP', campaign: 'Q3 2026' },
  { id: '5', title: 'MyPertamina Pasar Rakyat', campaign: 'Q3 2026' },
  { id: '6', title: 'MyPertamina Fair Show', campaign: 'Q4 2026' },
];

const mockLeaderboardData: LeaderboardUser[] = [
  {
    rank: 1,
    id: '1',
    fullName: 'Rina Wijayanti',
    username: 'rina_w',
    instagramUsername: '@rina_wijayanti',
    avatar: 'https://c.animaapp.com/mjxnk1q0BwGZL7/img/ai_2.png',
    totalPosts: 5,
    totalReach: 56700,
    totalEngagement: 8580,
    points: 2850,
  },
  {
    rank: 2,
    id: '2',
    fullName: 'Agus Prasetyo',
    username: 'agus_p',
    instagramUsername: '@agus_prasetyo',
    avatar: 'https://c.animaapp.com/mjxnk1q0BwGZL7/img/ai_2.png',
    totalPosts: 4,
    totalReach: 48900,
    totalEngagement: 7320,
    points: 2440,
  },
  {
    rank: 3,
    id: '3',
    fullName: 'Dian Permata',
    username: 'dian_p',
    instagramUsername: '@dian_permata',
    avatar: 'https://c.animaapp.com/mjxnk1q0BwGZL7/img/ai_2.png',
    totalPosts: 4,
    totalReach: 42600,
    totalEngagement: 6540,
    points: 2180,
  },
  {
    rank: 4,
    id: '4',
    fullName: 'Fajar Nugroho',
    username: 'fajar_n',
    instagramUsername: '@fajar_nugroho',
    avatar: 'https://c.animaapp.com/mjxnk1q0BwGZL7/img/ai_2.png',
    totalPosts: 3,
    totalReach: 38100,
    totalEngagement: 5850,
    points: 1950,
  },
  {
    rank: 5,
    id: '5',
    fullName: 'Lina Marlina',
    username: 'lina_m',
    instagramUsername: '@lina_marlina',
    avatar: 'https://c.animaapp.com/mjxnk1q0BwGZL7/img/ai_2.png',
    totalPosts: 3,
    totalReach: 34200,
    totalEngagement: 5280,
    points: 1760,
  },
  {
    rank: 6,
    id: '6',
    fullName: 'Rizki Ramadhan',
    username: 'rizki_r',
    instagramUsername: '@rizki_ramadhan',
    avatar: 'https://c.animaapp.com/mjxnk1q0BwGZL7/img/ai_2.png',
    totalPosts: 3,
    totalReach: 29500,
    totalEngagement: 4620,
    points: 1540,
  },
  {
    rank: 7,
    id: '7',
    fullName: 'Maya Sari',
    username: 'maya_s',
    instagramUsername: '@maya_sari',
    avatar: 'https://c.animaapp.com/mjxnk1q0BwGZL7/img/ai_2.png',
    totalPosts: 2,
    totalReach: 26200,
    totalEngagement: 4140,
    points: 1380,
  },
  {
    rank: 8,
    id: '8',
    fullName: 'Eko Wahyudi',
    username: 'eko_w',
    instagramUsername: '@eko_wahyudi',
    avatar: 'https://c.animaapp.com/mjxnk1q0BwGZL7/img/ai_2.png',
    totalPosts: 2,
    totalReach: 23800,
    totalEngagement: 3780,
    points: 1260,
  },
  {
    rank: 9,
    id: '9',
    fullName: 'Putri Ayu',
    username: 'putri_a',
    instagramUsername: '@putri_ayu',
    avatar: 'https://c.animaapp.com/mjxnk1q0BwGZL7/img/ai_2.png',
    totalPosts: 2,
    totalReach: 21500,
    totalEngagement: 3420,
    points: 1140,
  },
  {
    rank: 10,
    id: '10',
    fullName: 'Arif Hidayat',
    username: 'arif_h',
    instagramUsername: '@arif_hidayat',
    avatar: 'https://c.animaapp.com/mjxnk1q0BwGZL7/img/ai_2.png',
    totalPosts: 2,
    totalReach: 19800,
    totalEngagement: 3180,
    points: 1060,
  },
  {
    rank: 11,
    id: '11',
    fullName: 'Indah Lestari',
    username: 'indah_l',
    instagramUsername: '@indah_lestari',
    avatar: 'https://c.animaapp.com/mjxnk1q0BwGZL7/img/ai_2.png',
    totalPosts: 1,
    totalReach: 17200,
    totalEngagement: 2820,
    points: 940,
  },
  {
    rank: 12,
    id: '12',
    fullName: 'Bambang Sutrisno',
    username: 'bambang_s',
    instagramUsername: '@bambang_sutrisno',
    avatar: 'https://c.animaapp.com/mjxnk1q0BwGZL7/img/ai_2.png',
    totalPosts: 1,
    totalReach: 15900,
    totalEngagement: 2640,
    points: 880,
  },
  {
    rank: 13,
    id: '13',
    fullName: 'Sari Rahayu',
    username: 'sari_r',
    instagramUsername: '@sari_rahayu',
    avatar: 'https://c.animaapp.com/mjxnk1q0BwGZL7/img/ai_2.png',
    totalPosts: 1,
    totalReach: 14600,
    totalEngagement: 2460,
    points: 820,
  },
  {
    rank: 14,
    id: '14',
    fullName: 'Hadi Susanto',
    username: 'hadi_s',
    instagramUsername: '@hadi_susanto',
    avatar: 'https://c.animaapp.com/mjxnk1q0BwGZL7/img/ai_2.png',
    totalPosts: 1,
    totalReach: 13400,
    totalEngagement: 2280,
    points: 760,
  },
  {
    rank: 15,
    id: '15',
    fullName: 'Wulan Dari',
    username: 'wulan_d',
    instagramUsername: '@wulan_dari',
    avatar: 'https://c.animaapp.com/mjxnk1q0BwGZL7/img/ai_2.png',
    totalPosts: 1,
    totalReach: 12300,
    totalEngagement: 2100,
    points: 700,
  },
  {
    rank: 16,
    id: '16',
    fullName: 'Yudi Setiawan',
    username: 'yudi_s',
    instagramUsername: '@yudi_setiawan',
    avatar: 'https://c.animaapp.com/mjxnk1q0BwGZL7/img/ai_2.png',
    totalPosts: 1,
    totalReach: 11200,
    totalEngagement: 1920,
    points: 640,
  },
  {
    rank: 17,
    id: '17',
    fullName: 'Fitri Handayani',
    username: 'fitri_h',
    instagramUsername: '@fitri_handayani',
    avatar: 'https://c.animaapp.com/mjxnk1q0BwGZL7/img/ai_2.png',
    totalPosts: 1,
    totalReach: 10300,
    totalEngagement: 1740,
    points: 580,
  },
  {
    rank: 18,
    id: '18',
    fullName: 'Tono Sukirman',
    username: 'tono_s',
    instagramUsername: '@tono_sukirman',
    avatar: 'https://c.animaapp.com/mjxnk1q0BwGZL7/img/ai_2.png',
    totalPosts: 1,
    totalReach: 9500,
    totalEngagement: 1560,
    points: 520,
  },
  {
    rank: 19,
    id: '19',
    fullName: 'Ratna Dewi',
    username: 'ratna_d',
    instagramUsername: '@ratna_dewi',
    avatar: 'https://c.animaapp.com/mjxnk1q0BwGZL7/img/ai_2.png',
    totalPosts: 1,
    totalReach: 8700,
    totalEngagement: 1380,
    points: 460,
  },
  {
    rank: 20,
    id: '20',
    fullName: 'Joko Widodo',
    username: 'joko_w',
    instagramUsername: '@joko_widodo',
    avatar: 'https://c.animaapp.com/mjxnk1q0BwGZL7/img/ai_2.png',
    totalPosts: 1,
    totalReach: 7900,
    totalEngagement: 1200,
    points: 400,
  },
];

const topPerformersChartData = mockLeaderboardData.slice(0, 5).map(user => ({
  name: user.username,
  posts: user.totalPosts,
  reach: user.totalReach,
  engagement: user.totalEngagement,
  points: user.points,
}));

export function Leaderboard() {
  const navigate = useNavigate();
  const { isAdmin } = useAuth();
  const [filterYear, setFilterYear] = useState('2026');
  const [filterQuarter, setFilterQuarter] = useState('all');
  const [filterBrief, setFilterBrief] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filteredUsers = mockLeaderboardData.filter(
    (user) =>
      user.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.instagramUsername.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedUsers = filteredUsers.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  const handleUserClick = (userId: string) => {
    if (isAdmin) {
      navigate(`/user/${userId}`);
    }
  };

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="w-6 h-6 text-white" strokeWidth={1.5} />;
      case 2:
        return <Medal className="w-6 h-6 text-white" strokeWidth={1.5} />;
      case 3:
        return <Award className="w-6 h-6 text-white" strokeWidth={1.5} />;
      default:
        return <span className="text-lg font-semibold text-muted-foreground">#{rank}</span>;
    }
  };

  const getRankBadgeColor = (rank: number) => {
    switch (rank) {
      case 1:
        return 'bg-gradient-to-br from-yellow-400 to-yellow-600';
      case 2:
        return 'bg-gradient-to-br from-gray-300 to-gray-500';
      case 3:
        return 'bg-gradient-to-br from-amber-500 to-amber-700';
      default:
        return 'bg-primary/10';
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Leaderboard</h1>
          <p className="text-muted-foreground">Top contributors ranked by engagement performance</p>
        </div>
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
                  {mockBriefs.map((brief) => (
                    <SelectItem key={brief.id} value={brief.id}>
                      {brief.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
      </Card>

      {isAdmin && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {mockLeaderboardData.slice(0, 3).map((user) => (
              <Card
                key={user.id}
                className={`border-2 ${
                  user.rank === 1
                    ? 'border-yellow-500 bg-gradient-to-br from-yellow-50 to-white'
                    : user.rank === 2
                    ? 'border-gray-400 bg-gradient-to-br from-gray-50 to-white'
                    : 'border-amber-600 bg-gradient-to-br from-amber-50 to-white'
                }`}
              >
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className={`flex h-16 w-16 items-center justify-center rounded-full ${getRankBadgeColor(user.rank)}`}>
                      {getRankIcon(user.rank)}
                    </div>
                    <Avatar className="w-20 h-20 border-4 border-white shadow-lg">
                      <AvatarImage src={user.avatar} alt={user.fullName} />
                      <AvatarFallback className="bg-secondary text-secondary-foreground text-xl">
                        {user.fullName.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                      <div>
                        <h3 className="text-lg font-bold text-foreground">{user.fullName}</h3>
                        <p className="text-sm text-primary font-medium mt-1">{user.instagramUsername}</p>
                      </div>
                    <div className="w-full pt-4 border-t border-border space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Posts</span>
                        <span className="font-semibold text-foreground">{user.totalPosts}</span>
                      </div>
                      {isAdmin ? (
                        <>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Total Reach</span>
                            <span className="font-bold text-foreground">{user.totalReach.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Total Engagement</span>
                            <span className="font-bold text-foreground">{user.totalEngagement.toLocaleString()}</span>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Total Likes</span>
                            <span className="font-bold text-foreground">{Math.floor(user.totalEngagement * 0.75).toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Total Comments</span>
                            <span className="font-bold text-foreground">{Math.floor(user.totalEngagement * 0.25).toLocaleString()}</span>
                          </div>
                        </>
                      )}
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Points</span>
                        <span className="font-semibold text-warning">{user.points.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="border border-border bg-card">
            <CardHeader>
              <CardTitle className="text-foreground">Top 5 Performers Comparison</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={topPerformersChartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(0, 0%, 88%)" />
                  <XAxis dataKey="name" stroke="hsl(0, 0%, 38%)" style={{ fontSize: '12px' }} />
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
                  <Bar dataKey="posts" fill="hsl(217, 91%, 60%)" radius={[8, 8, 0, 0]} />
                  <Bar dataKey="reach" fill="hsl(13, 85%, 62%)" radius={[8, 8, 0, 0]} />
                  <Bar dataKey="engagement" fill="hsl(145, 55%, 45%)" radius={[8, 8, 0, 0]} />
                  <Bar dataKey="points" fill="hsl(42, 90%, 55%)" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </>
      )}

      <Card className="border border-border bg-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-foreground">User Rankings</CardTitle>
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" strokeWidth={1.5} />
              <Input
                type="search"
                placeholder="Search users..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-background text-foreground border-border"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {paginatedUsers.map((user) => (
              <div
                key={user.id}
                onClick={() => handleUserClick(user.id)}
                className={`flex items-center gap-4 p-4 rounded-lg transition-all duration-200 ${
                  isAdmin ? 'cursor-pointer' : 'cursor-default'
                } ${
                  user.rank <= 3
                    ? `bg-gradient-to-r from-accent/50 to-transparent border-l-4 border-primary ${isAdmin ? 'hover:shadow-md' : ''}`
                    : `bg-accent/30 ${isAdmin ? 'hover:bg-accent/50 hover:shadow-md' : ''}`
                }`}
              >
                <div className={`flex items-center justify-center w-12 h-12 rounded-full flex-shrink-0 ${getRankBadgeColor(user.rank)}`}>
                  {getRankIcon(user.rank)}
                </div>

                <Avatar className="w-12 h-12 flex-shrink-0">
                  <AvatarImage src={user.avatar} alt={user.fullName} />
                  <AvatarFallback className="bg-secondary text-secondary-foreground">
                    {user.fullName.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-foreground truncate">{user.fullName}</h4>
                  <p className="text-sm text-primary font-medium">{user.instagramUsername}</p>
                </div>

                {isAdmin ? (
                <div className="hidden md:flex items-center gap-6 text-sm">
                  <div className="text-center">
                    <p className="text-xs text-muted-foreground mb-1">Posts</p>
                    <p className="font-semibold text-foreground">{user.totalPosts}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-muted-foreground mb-1">Reach</p>
                    <p className="font-semibold text-foreground">{user.totalReach.toLocaleString()}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-muted-foreground mb-1">Engagement</p>
                    <p className="font-semibold text-foreground">{user.totalEngagement.toLocaleString()}</p>
                  </div>
                </div>
              ) : (
                <div className="hidden md:flex items-center gap-6 text-sm">
                  <div className="text-center">
                    <p className="text-xs text-muted-foreground mb-1">Posts</p>
                    <p className="font-semibold text-foreground">{user.totalPosts}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-muted-foreground mb-1">Likes</p>
                    <p className="font-semibold text-foreground">{Math.floor(user.totalEngagement * 0.75).toLocaleString()}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-muted-foreground mb-1">Comments</p>
                    <p className="font-semibold text-foreground">{Math.floor(user.totalEngagement * 0.25).toLocaleString()}</p>
                  </div>
                </div>
              )}

                <div className="text-right flex-shrink-0">
                  <div className="flex items-center gap-2 mb-1">
                    <Trophy className="w-4 h-4 text-warning" strokeWidth={1.5} />
                    <p className="text-lg font-bold text-warning">{user.points.toLocaleString()}</p>
                  </div>
                  <p className="text-xs text-muted-foreground">points</p>
                </div>
              </div>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-6 pt-6 border-t border-border">
              <div className="text-sm text-muted-foreground">
                Showing {startIndex + 1} to {Math.min(endIndex, filteredUsers.length)} of {filteredUsers.length} users
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="bg-transparent text-foreground border-border hover:bg-accent hover:text-accent-foreground font-normal"
                >
                  <ChevronLeft className="w-4 h-4 mr-1" strokeWidth={1.5} />
                  Previous
                </Button>
                <div className="flex items-center gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <Button
                      key={page}
                      variant={currentPage === page ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => handlePageChange(page)}
                      className={
                        currentPage === page
                          ? 'bg-primary text-primary-foreground hover:bg-primary/90 font-normal'
                          : 'bg-transparent text-foreground border-border hover:bg-accent hover:text-accent-foreground font-normal'
                      }
                    >
                      {page}
                    </Button>
                  ))}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="bg-transparent text-foreground border-border hover:bg-accent hover:text-accent-foreground font-normal"
                >
                  Next
                  <ChevronRight className="w-4 h-4 ml-1" strokeWidth={1.5} />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
