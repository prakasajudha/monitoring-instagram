import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { TrendingUp, Users, FileText, Target, ArrowRight } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const campaignPerformance = [
  { campaign: 'Q1 Campaign', briefs: 1, posts: 5, engagement: 8574, engagementRate: 16.5, id: 'q1-2026' },
  { campaign: 'Q2 Campaign', briefs: 1, posts: 0, engagement: 0, engagementRate: 0, id: 'q2-2026' },
  { campaign: 'Q3 Campaign', briefs: 2, posts: 0, engagement: 0, engagementRate: 0, id: 'q3-2026' },
  { campaign: 'Q4 Campaign', briefs: 1, posts: 0, engagement: 0, engagementRate: 0, id: 'q4-2026' },
];



const campaignStats = [
  { title: 'Total Brief', value: '5', icon: FileText, color: 'hsl(217, 91%, 60%)' },
  { title: 'Total Posts', value: '5', icon: Target, color: 'hsl(13, 85%, 62%)' },
  { title: 'Contributors', value: '5', icon: Users, color: 'hsl(145, 55%, 45%)' },
  { title: 'Avg. Engagement', value: '1.7K', icon: TrendingUp, color: 'hsl(42, 90%, 55%)' },
];

export function CampaignInsights() {
  const navigate = useNavigate();
  const { isAdmin } = useAuth();
  const [filterYear, setFilterYear] = useState('2026');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleCampaignClick = (campaignId: string) => {
    navigate(`/campaign/${campaignId}`);
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Campaigns</h1>
          <p className="text-muted-foreground">{isAdmin ? 'Analyze campaign performance and trends' : 'View campaign briefs and guidelines'}</p>
        </div>
        <Select value={filterYear} onValueChange={setFilterYear}>
          <SelectTrigger className="w-32 bg-background text-foreground border-border">
            <SelectValue placeholder="Year" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="2026">2026</SelectItem>
            <SelectItem value="2025">2025</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {isAdmin && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {campaignStats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card
                  key={stat.title}
                  className="border border-border bg-card"
                  style={{
                    animation: `fadeInUp 0.6s ease-out ${index * 100}ms both`,
                  }}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="text-sm font-medium text-muted-foreground mb-2">{stat.title}</p>
                        <p className="text-3xl font-semibold text-foreground">{stat.value}</p>
                      </div>
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg" style={{ backgroundColor: `${stat.color}15` }}>
                        <Icon className="w-6 h-6" style={{ color: stat.color }} strokeWidth={1.5} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border border-border bg-card">
              <CardHeader>
                <CardTitle className="text-foreground">Campaign Performance Comparison</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <BarChart data={campaignPerformance}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(0, 0%, 88%)" />
                    <XAxis dataKey="campaign" stroke="hsl(0, 0%, 38%)" style={{ fontSize: '12px' }} />
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
                    <Bar dataKey="engagement" fill="hsl(13, 85%, 62%)" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="border border-border bg-card">
              <CardHeader>
                <CardTitle className="text-foreground">Campaign Trends Over Time</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <LineChart data={campaignTrends}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(0, 0%, 88%)" />
                    <XAxis dataKey="month" stroke="hsl(0, 0%, 38%)" style={{ fontSize: '12px' }} />
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
                    <Line type="monotone" dataKey="q1" stroke="hsl(217, 91%, 60%)" strokeWidth={2} dot={{ fill: 'hsl(217, 91%, 60%)' }} />
                    <Line type="monotone" dataKey="q2" stroke="hsl(13, 85%, 62%)" strokeWidth={2} dot={{ fill: 'hsl(13, 85%, 62%)' }} />
                    <Line type="monotone" dataKey="q3" stroke="hsl(145, 55%, 45%)" strokeWidth={2} dot={{ fill: 'hsl(145, 55%, 45%)' }} />
                    <Line type="monotone" dataKey="q4" stroke="hsl(42, 90%, 55%)" strokeWidth={2} dot={{ fill: 'hsl(42, 90%, 55%)' }} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div> */}
        </>
      )}

      <Card className="border border-border bg-card">
        <CardHeader>
          <CardTitle className="text-foreground">Campaign Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {campaignPerformance.map((campaign) => (
              <div
                key={campaign.campaign}
                onClick={() => handleCampaignClick(campaign.id)}
                className="p-6 rounded-lg border border-border bg-accent/30 space-y-4 cursor-pointer hover:shadow-lg hover:border-primary/50 transition-all duration-200"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-foreground">{campaign.campaign}</h3>
                  <ArrowRight className="w-5 h-5 text-primary" strokeWidth={1.5} />
                </div>
                {isAdmin ? (
                  <>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Total Brief</p>
                        <p className="text-2xl font-semibold text-foreground">{campaign.briefs}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Total Posts</p>
                        <p className="text-2xl font-semibold text-foreground">{campaign.posts}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Total Engagement</p>
                        <p className="text-2xl font-semibold text-foreground">{campaign.engagement.toLocaleString()}</p>
                      </div>
                    </div>
                    <div className="pt-2">
                      <div className="flex items-center justify-between text-sm mb-2">
                        <span className="text-muted-foreground">Engagement Rate</span>
                        <span className="font-medium text-foreground">{campaign.engagementRate}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-gradient-1 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${campaign.engagementRate}%` }}
                        ></div>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 rounded-lg bg-primary/5 border border-primary/20">
                      <FileText className="w-8 h-8 text-primary mx-auto mb-2" strokeWidth={1.5} />
                      <p className="text-xs text-muted-foreground mb-1">Total Brief</p>
                      <p className="text-2xl font-bold text-foreground">{campaign.briefs}</p>
                    </div>
                    <div className="text-center p-4 rounded-lg bg-tertiary/5 border border-tertiary/20">
                      <Target className="w-8 h-8 text-tertiary mx-auto mb-2" strokeWidth={1.5} />
                      <p className="text-xs text-muted-foreground mb-1">Total Posts</p>
                      <p className="text-2xl font-bold text-foreground">{campaign.posts}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
