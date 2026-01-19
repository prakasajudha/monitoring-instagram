import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Plus, Edit, Trash2, Search } from 'lucide-react';

interface Hashtag {
  id: number;
  name: string;
  campaign: string;
  year: string;
  status: 'active' | 'inactive';
  posts: number;
  engagement: number;
}

const initialHashtags: Hashtag[] = [
  { id: 1, name: '#chECkersLife', campaign: 'Q1 Campaign', year: '2024', status: 'active', posts: 234, engagement: 8500 },
  { id: 2, name: '#TeamSpirit', campaign: 'Q1 Campaign', year: '2024', status: 'active', posts: 189, engagement: 7200 },
  { id: 3, name: '#MissionComplete', campaign: 'Q2 Campaign', year: '2024', status: 'active', posts: 156, engagement: 6800 },
  { id: 4, name: '#DailyGrind', campaign: 'Q2 Campaign', year: '2023', status: 'inactive', posts: 98, engagement: 5900 },
  { id: 5, name: '#TogetherStrong', campaign: 'Q1 Campaign', year: '2024', status: 'active', posts: 145, engagement: 5200 },
];

export function HashtagManagement() {
  const [hashtags, setHashtags] = useState<Hashtag[]>(initialHashtags);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingHashtag, setEditingHashtag] = useState<Hashtag | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filteredHashtags = hashtags.filter(hashtag =>
    hashtag.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    hashtag.campaign.toLowerCase().includes(searchQuery.toLowerCase()) ||
    hashtag.year.includes(searchQuery)
  );

  const handleAddHashtag = () => {
    setEditingHashtag(null);
    setIsDialogOpen(true);
  };

  const handleEditHashtag = (hashtag: Hashtag) => {
    setEditingHashtag(hashtag);
    setIsDialogOpen(true);
  };

  const handleDeleteHashtag = (id: number) => {
    setHashtags(hashtags.filter(h => h.id !== id));
  };

  const handleSaveHashtag = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsDialogOpen(false);
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Hashtag Management</h1>
          <p className="text-muted-foreground">Manage hashtags and campaign mappings</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={handleAddHashtag} className="bg-primary text-primary-foreground hover:bg-primary/90 font-normal">
              <Plus className="w-5 h-5 mr-2" strokeWidth={1.5} />
              Add Hashtag
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-popover text-popover-foreground">
            <form onSubmit={handleSaveHashtag}>
              <DialogHeader>
                <DialogTitle className="text-popover-foreground">{editingHashtag ? 'Edit Hashtag' : 'Add New Hashtag'}</DialogTitle>
                <DialogDescription className="text-muted-foreground">
                  {editingHashtag ? 'Update hashtag details and campaign mapping' : 'Create a new hashtag and map it to a campaign'}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="hashtag-name" className="text-popover-foreground">Hashtag Name</Label>
                  <Input
                    id="hashtag-name"
                    placeholder="#YourHashtag"
                    defaultValue={editingHashtag?.name}
                    className="bg-background text-foreground border-border"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="campaign" className="text-popover-foreground">Campaign</Label>
                    <Select defaultValue={editingHashtag?.campaign || 'Q1 Campaign'}>
                      <SelectTrigger id="campaign" className="bg-background text-foreground border-border">
                        <SelectValue placeholder="Select campaign" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Q1 Campaign">Q1 Campaign</SelectItem>
                        <SelectItem value="Q2 Campaign">Q2 Campaign</SelectItem>
                        <SelectItem value="Q3 Campaign">Q3 Campaign</SelectItem>
                        <SelectItem value="Q4 Campaign">Q4 Campaign</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="year" className="text-popover-foreground">Year</Label>
                    <Select defaultValue={editingHashtag?.year || '2026'}>
                      <SelectTrigger id="year" className="bg-background text-foreground border-border">
                        <SelectValue placeholder="Select year" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="2026">2026</SelectItem>
                        <SelectItem value="2025">2025</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status" className="text-popover-foreground">Status</Label>
                  <Select defaultValue={editingHashtag?.status || 'active'}>
                    <SelectTrigger id="status" className="bg-background text-foreground border-border">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)} className="bg-transparent text-foreground border-border hover:bg-accent hover:text-accent-foreground font-normal">
                  Cancel
                </Button>
                <Button type="submit" className="bg-primary text-primary-foreground hover:bg-primary/90 font-normal">
                  {editingHashtag ? 'Update' : 'Create'}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="border border-border bg-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-foreground">All Hashtags</CardTitle>
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" strokeWidth={1.5} />
              <Input
                type="search"
                placeholder="Search hashtags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-background text-foreground border-border"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-sm font-medium text-foreground">Hashtag</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-foreground">Campaign</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-foreground">Year</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-foreground">Status</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-foreground">Posts</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-foreground">Engagement</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredHashtags.map((hashtag) => (
                  <tr key={hashtag.id} className="border-b border-border hover:bg-accent transition-colors duration-200">
                    <td className="py-3 px-4 text-sm font-medium text-primary">{hashtag.name}</td>
                    <td className="py-3 px-4 text-sm text-foreground">{hashtag.campaign}</td>
                    <td className="py-3 px-4 text-sm text-muted-foreground">{hashtag.year}</td>
                    <td className="py-3 px-4 text-sm">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          hashtag.status === 'active'
                            ? 'bg-success/10 text-success'
                            : 'bg-gray-200 text-gray-700'
                        }`}
                      >
                        {hashtag.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm text-foreground">{hashtag.posts}</td>
                    <td className="py-3 px-4 text-sm text-foreground">{hashtag.engagement.toLocaleString()}</td>
                    <td className="py-3 px-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEditHashtag(hashtag)}
                          className="bg-transparent text-foreground hover:bg-accent hover:text-accent-foreground"
                        >
                          <Edit className="w-4 h-4" strokeWidth={1.5} />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteHashtag(hashtag.id)}
                          className="bg-transparent text-destructive hover:bg-destructive/10 hover:text-destructive"
                        >
                          <Trash2 className="w-4 h-4" strokeWidth={1.5} />
                        </Button>
                      </div>
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
