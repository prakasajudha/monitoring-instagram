import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '../contexts/AuthContext';
import Settings from 'lucide-react/dist/esm/icons/settings';
import Save from 'lucide-react/dist/esm/icons/save';
import RotateCcw from 'lucide-react/dist/esm/icons/rotate-ccw';
import Image from 'lucide-react/dist/esm/icons/image';
import Layers from 'lucide-react/dist/esm/icons/layers';
import Video from 'lucide-react/dist/esm/icons/video';
import Heart from 'lucide-react/dist/esm/icons/heart';
import MessageCircle from 'lucide-react/dist/esm/icons/message-circle';
import History from 'lucide-react/dist/esm/icons/history';
import Clock from 'lucide-react/dist/esm/icons/clock';
import User from 'lucide-react/dist/esm/icons/user';

interface PointSettings {
  basePoints: {
    reels: number;
    carousel: number;
    photo: number;
  };
  engagementPoints: {
    like: number;
    comment: number;
  };
}

interface ChangeHistory {
  id: string;
  userName: string;
  userEmail: string;
  timestamp: string;
  changes: string[];
}

const defaultSettings: PointSettings = {
  basePoints: {
    reels: 15,
    carousel: 10,
    photo: 7,
  },
  engagementPoints: {
    like: 3,
    comment: 5,
  },
};

const mockHistory: ChangeHistory[] = [
  {
    id: '1',
    userName: 'Admin chECkers',
    userEmail: 'admin@pertamina.com',
    timestamp: '2026-02-10T14:30:00',
    changes: [
      'Reels base point: 12 → 15',
      'Like engagement point: 2 → 3',
    ],
  },
  {
    id: '2',
    userName: 'Admin chECkers',
    userEmail: 'admin@pertamina.com',
    timestamp: '2026-02-05T10:15:00',
    changes: [
      'Carousel base point: 8 → 10',
      'Comment engagement point: 4 → 5',
    ],
  },
  {
    id: '3',
    userName: 'Admin chECkers',
    userEmail: 'admin@pertamina.com',
    timestamp: '2026-01-28T16:45:00',
    changes: [
      'Photo base point: 5 → 7',
    ],
  },
];

export function PointSettings() {
  const { toast } = useToast();
  const { user } = useAuth();
  const [settings, setSettings] = useState<PointSettings>(defaultSettings);
  const [previousSettings, setPreviousSettings] = useState<PointSettings>(defaultSettings);
  const [hasChanges, setHasChanges] = useState(false);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [isHistoryDialogOpen, setIsHistoryDialogOpen] = useState(false);
  const [history, setHistory] = useState<ChangeHistory[]>(mockHistory);

  useEffect(() => {
    window.scrollTo(0, 0);
    const savedSettings = localStorage.getItem('pointSettings');
    if (savedSettings) {
      const parsed = JSON.parse(savedSettings);
      setSettings(parsed);
      setPreviousSettings(parsed);
    }

    const savedHistory = localStorage.getItem('pointSettingsHistory');
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, []);

  const handleBasePointChange = (type: 'reels' | 'carousel' | 'photo', value: string) => {
    const numValue = parseInt(value) || 0;
    setSettings({
      ...settings,
      basePoints: {
        ...settings.basePoints,
        [type]: numValue,
      },
    });
    setHasChanges(true);
  };

  const handleEngagementPointChange = (type: 'like' | 'comment', value: string) => {
    const numValue = parseInt(value) || 0;
    setSettings({
      ...settings,
      engagementPoints: {
        ...settings.engagementPoints,
        [type]: numValue,
      },
    });
    setHasChanges(true);
  };

  const getChanges = (): string[] => {
    const changes: string[] = [];

    if (settings.basePoints.reels !== previousSettings.basePoints.reels) {
      changes.push(`Reels base point: ${previousSettings.basePoints.reels} → ${settings.basePoints.reels}`);
    }
    if (settings.basePoints.carousel !== previousSettings.basePoints.carousel) {
      changes.push(`Carousel base point: ${previousSettings.basePoints.carousel} → ${settings.basePoints.carousel}`);
    }
    if (settings.basePoints.photo !== previousSettings.basePoints.photo) {
      changes.push(`Photo base point: ${previousSettings.basePoints.photo} → ${settings.basePoints.photo}`);
    }
    if (settings.engagementPoints.like !== previousSettings.engagementPoints.like) {
      changes.push(`Like engagement point: ${previousSettings.engagementPoints.like} → ${settings.engagementPoints.like}`);
    }
    if (settings.engagementPoints.comment !== previousSettings.engagementPoints.comment) {
      changes.push(`Comment engagement point: ${previousSettings.engagementPoints.comment} → ${settings.engagementPoints.comment}`);
    }

    return changes;
  };

  const handleSaveClick = () => {
    setIsConfirmDialogOpen(true);
  };

  const handleConfirmSave = () => {
    const changes = getChanges();
    
    localStorage.setItem('pointSettings', JSON.stringify(settings));
    
    const newHistoryEntry: ChangeHistory = {
      id: Date.now().toString(),
      userName: user?.fullName || 'Admin',
      userEmail: user?.email || 'admin@pertamina.com',
      timestamp: new Date().toISOString(),
      changes: changes,
    };
    
    const updatedHistory = [newHistoryEntry, ...history];
    setHistory(updatedHistory);
    localStorage.setItem('pointSettingsHistory', JSON.stringify(updatedHistory));
    
    setPreviousSettings(settings);
    setHasChanges(false);
    setIsConfirmDialogOpen(false);
    
    toast({
      title: 'Settings saved',
      description: 'Point system settings have been updated successfully.',
    });
  };

  const handleReset = () => {
    setSettings(defaultSettings);
    setHasChanges(true);
    toast({
      title: 'Settings reset',
      description: 'Point system settings have been reset to default values.',
    });
  };
const calculateExamplePoints = () => {
    const basePoint = settings.basePoints.reels;
    const likePoints = 100 * settings.engagementPoints.like;
    const commentPoints = 20 * settings.engagementPoints.comment;
    return basePoint + likePoints + commentPoints;
  };

  const formatDateTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return {
      date: date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }),
      time: date.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: false
      }),
    };
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Point System Settings</h1>
          <p className="text-muted-foreground">Configure point allocation for content types and engagement metrics</p>
        </div>
        <Button
          variant="outline"
          onClick={() => setIsHistoryDialogOpen(true)}
          className="bg-transparent text-foreground border-border hover:bg-accent hover:text-accent-foreground font-normal"
        >
          <History className="w-4 h-4 mr-2" strokeWidth={1.5} />
          History
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="border border-border bg-card lg:col-span-2">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <Settings className="w-5 h-5 text-primary" strokeWidth={1.5} />
              </div>
              <div>
                <CardTitle className="text-foreground">Point Configuration</CardTitle>
                <CardDescription className="text-muted-foreground">
                  Set base points and engagement multipliers
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4">1. Base Point (Effort Konten)</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Points awarded based on content type complexity and effort required
                </p>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 rounded-lg bg-accent/30 border border-border">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-success/10 flex-shrink-0">
                      <Video className="w-6 h-6 text-success" strokeWidth={1.5} />
                    </div>
                    <div className="flex-1">
                      <Label htmlFor="reels-point" className="text-foreground font-medium">Reels</Label>
                      <p className="text-xs text-muted-foreground">Video content with highest engagement potential</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Input
                        id="reels-point"
                        type="number"
                        min="0"
                        value={settings.basePoints.reels}
                        onChange={(e) => handleBasePointChange('reels', e.target.value)}
                        className="w-24 bg-background text-foreground border-border text-center font-semibold"
                      />
                      <span className="text-sm text-muted-foreground">points</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-4 rounded-lg bg-accent/30 border border-border">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-tertiary/10 flex-shrink-0">
                      <Layers className="w-6 h-6 text-tertiary" strokeWidth={1.5} />
                    </div>
                    <div className="flex-1">
                      <Label htmlFor="carousel-point" className="text-foreground font-medium">Carousel</Label>
                      <p className="text-xs text-muted-foreground">Multiple images with storytelling capability</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Input
                        id="carousel-point"
                        type="number"
                        min="0"
                        value={settings.basePoints.carousel}
                        onChange={(e) => handleBasePointChange('carousel', e.target.value)}
                        className="w-24 bg-background text-foreground border-border text-center font-semibold"
                      />
                      <span className="text-sm text-muted-foreground">points</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-4 rounded-lg bg-accent/30 border border-border">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 flex-shrink-0">
                      <Image className="w-6 h-6 text-primary" strokeWidth={1.5} />
                    </div>
                    <div className="flex-1">
                      <Label htmlFor="photo-point" className="text-foreground font-medium">Photo</Label>
                      <p className="text-xs text-muted-foreground">Single image post with caption</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Input
                        id="photo-point"
                        type="number"
                        min="0"
                        value={settings.basePoints.photo}
                        onChange={(e) => handleBasePointChange('photo', e.target.value)}
                        className="w-24 bg-background text-foreground border-border text-center font-semibold"
                      />
                      <span className="text-sm text-muted-foreground">points</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-border">
                <h3 className="text-lg font-semibold text-foreground mb-4">2. Engagement Point</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Points awarded per interaction received on the content
                </p>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 rounded-lg bg-accent/30 border border-border">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-destructive/10 flex-shrink-0">
                      <Heart className="w-6 h-6 text-destructive" strokeWidth={1.5} />
                    </div>
                    <div className="flex-1">
                      <Label htmlFor="like-point" className="text-foreground font-medium">Like</Label>
                      <p className="text-xs text-muted-foreground">Points per like received</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Input
                        id="like-point"
                        type="number"
                        min="0"
                        value={settings.engagementPoints.like}
                        onChange={(e) => handleEngagementPointChange('like', e.target.value)}
                        className="w-24 bg-background text-foreground border-border text-center font-semibold"
                      />
                      <span className="text-sm text-muted-foreground">points</span>
                    </div>
                  </div>
                   <div className="flex items-center gap-4 p-4 rounded-lg bg-accent/30 border border-border">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 flex-shrink-0">
                      <MessageCircle className="w-6 h-6 text-primary" strokeWidth={1.5} />
                    </div>
                    <div className="flex-1">
                      <Label htmlFor="comment-point" className="text-foreground font-medium">Comment</Label>
                      <p className="text-xs text-muted-foreground">Points per comment received</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Input
                        id="comment-point"
                        type="number"
                        min="0"
                        value={settings.engagementPoints.comment}
                        onChange={(e) => handleEngagementPointChange('comment', e.target.value)}
                        className="w-24 bg-background text-foreground border-border text-center font-semibold"
                      />
                      <span className="text-sm text-muted-foreground">points</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-6 border-t border-border">
              <Button
                onClick={handleSaveClick}
                disabled={!hasChanges}
                className="bg-primary text-primary-foreground hover:bg-primary/90 font-normal disabled:opacity-50"
              >
                <Save className="w-4 h-4 mr-2" strokeWidth={1.5} />
                Save Changes
              </Button>
              <Button
                onClick={handleReset}
                variant="outline"
                className="bg-transparent text-foreground border-border hover:bg-accent hover:text-accent-foreground font-normal"
              >
                <RotateCcw className="w-4 h-4 mr-2" strokeWidth={1.5} />
                Reset to Default
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="border border-border bg-card">
            <CardHeader>
              <CardTitle className="text-foreground">Point Calculation</CardTitle>
              <CardDescription className="text-muted-foreground">
                How points are calculated
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 rounded-lg bg-accent/50 space-y-3">
                <h4 className="font-semibold text-foreground">Formula:</h4>
                <div className="space-y-2 text-sm">
                  <div className="p-3 rounded-lg bg-background border border-border">
                    <p className="text-muted-foreground mb-1">Total Points =</p>
                    <p className="font-mono text-foreground">
                      Base Point + (Likes × {settings.engagementPoints.like}) + (Comments × {settings.engagementPoints.comment})
                    </p>
                  </div>
                </div>
              </div>

              
              <div className="p-4 rounded-lg bg-primary/5 border border-primary/20 space-y-3">
                <h4 className="font-semibold text-foreground">Example Calculation:</h4>
                <div className="space-y-2 text-sm">
                  <p className="text-muted-foreground">Reels with 100 likes and 20 comments:</p>
                  <div className="p-3 rounded-lg bg-background space-y-1">
                    <p className="text-foreground">
                      • Base Point: <span className="font-semibold">{settings.basePoints.reels}</span>
                    </p>
                    <p className="text-foreground">
                      • Like Points: 100 × {settings.engagementPoints.like} = <span className="font-semibold">{100 * settings.engagementPoints.like}</span>
                    </p>
                    <p className="text-foreground">
                      • Comment Points: 20 × {settings.engagementPoints.comment} = <span className="font-semibold">{20 * settings.engagementPoints.comment}</span>
                    </p>
                    <div className="pt-2 mt-2 border-t border-border">
                      <p className="text-foreground font-bold">
                        Total: <span className="text-primary text-lg">{calculateExamplePoints()}</span> points
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-warning/20 bg-warning/5">
            <CardHeader>
              <CardTitle className="text-warning">Important Notes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex gap-2">
                <span className="text-warning font-bold flex-shrink-0">•</span>
                <p className="text-foreground">
                  Changes will apply to all future point calculations
                </p>
              </div>
              <div className="flex gap-2">
                <span className="text-warning font-bold flex-shrink-0">•</span>
                <p className="text-foreground">
                  Existing user points will not be recalculated
                </p>
              </div>
              <div className="flex gap-2">
                <span className="text-warning font-bold flex-shrink-0">•</span>
                <p className="text-foreground">
                  Higher points encourage more engagement and quality content
                </p>
              </div>
              <div className="flex gap-2">
                <span className="text-warning font-bold flex-shrink-0">•</span>
                <p className="text-foreground">
                  Consider balancing points to maintain fair competition
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Dialog open={isConfirmDialogOpen} onOpenChange={setIsConfirmDialogOpen}>
        <DialogContent className="bg-popover text-popover-foreground max-w-md">
          <DialogHeader>
            <DialogTitle className="text-popover-foreground">Confirm Changes</DialogTitle>
            <DialogDescription className="text-muted-foreground">
              Are you sure you want to save these changes to the point system?
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="p-4 rounded-lg bg-accent/50 space-y-2">
              <h4 className="font-semibold text-foreground mb-3">Changes to be applied:</h4>
              <div className="space-y-2">
                {getChanges().map((change, index) => (
                  <div key={index} className="flex items-start gap-2 text-sm">
                    <span className="text-primary font-bold flex-shrink-0">•</span>
                    <p className="text-foreground">{change}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsConfirmDialogOpen(false)}
              className="bg-transparent text-foreground border-border hover:bg-accent hover:text-accent-foreground font-normal"
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={handleConfirmSave}
              className="bg-primary text-primary-foreground hover:bg-primary/90 font-normal"
            >
              <Save className="w-4 h-4 mr-2" strokeWidth={1.5} />
              Confirm & Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Dialog open={isHistoryDialogOpen} onOpenChange={setIsHistoryDialogOpen}>
        <DialogContent className="bg-popover text-popover-foreground max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-popover-foreground flex items-center gap-2">
              <History className="w-5 h-5 text-primary" strokeWidth={1.5} />
              Change History
            </DialogTitle>
            <DialogDescription className="text-muted-foreground">
              View all changes made to the point system settings
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            {history.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No change history available</p>
              </div>
            ) : (
              <div className="space-y-4">
                {history.map((entry) => {
                  const { date, time } = formatDateTime(entry.timestamp);
                  return (
                    <div
                      key={entry.id}
                      className="p-4 rounded-lg border border-border bg-accent/30 space-y-3"
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 flex-shrink-0">
                          <User className="w-5 h-5 text-primary" strokeWidth={1.5} />
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold text-foreground">{entry.userName}</p>
                          <p className="text-sm text-muted-foreground">{entry.userEmail}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 text-sm text-muted-foreground pl-13">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" strokeWidth={1.5} />
                          <span>{date}</span>
                        </div>
                        <span>•</span>
                        <span>{time}</span>
                      </div>

                      <div className="pl-13 space-y-2">
                        <p className="text-sm font-medium text-foreground">Changes made:</p>
                        <div className="space-y-1">
                          {entry.changes.map((change, index) => (
                            <div key={index} className="flex items-start gap-2 text-sm">
                              <span className="text-primary font-bold flex-shrink-0">•</span>
                              <p className="text-foreground">{change}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsHistoryDialogOpen(false)}
              className="bg-transparent text-foreground border-border hover:bg-accent hover:text-accent-foreground font-normal"
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}