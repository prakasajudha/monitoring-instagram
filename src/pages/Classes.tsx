import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Plus from 'lucide-react/dist/esm/icons/plus';
import Calendar from 'lucide-react/dist/esm/icons/calendar';
import Clock from 'lucide-react/dist/esm/icons/clock';
import MapPin from 'lucide-react/dist/esm/icons/map-pin';
import Video from 'lucide-react/dist/esm/icons/video';
import Users from 'lucide-react/dist/esm/icons/users';
import User from 'lucide-react/dist/esm/icons/user';
import ArrowRight from 'lucide-react/dist/esm/icons/arrow-right';
import Search from 'lucide-react/dist/esm/icons/search';

export interface Class {
  id: string;
  title: string;
  description: string;
  type: 'online' | 'offline';
  date: string;
  time: string;
  duration: string;
  instructor: string;
  maxParticipants: number;
  currentParticipants: number;
  meetingLink?: string;
  location?: string;
  mapLink?: string;
  status: 'upcoming' | 'ongoing' | 'completed';
  enrolledUsers: string[];
}

export const mockClasses: Class[] = [
  {
    id: '1',
    title: 'Social Media Marketing Fundamentals',
    description: 'Learn the basics of social media marketing, content strategy, and engagement techniques for Instagram and other platforms. This comprehensive course covers everything from creating compelling content to understanding your audience and measuring success.',
    type: 'online',
    date: '2026-02-15',
    time: '14:00',
    duration: '2 hours',
    instructor: 'Budi Santoso',
    maxParticipants: 50,
    currentParticipants: 32,
    meetingLink: 'https://teams.microsoft.com/l/meetup-join/example1',
    status: 'upcoming',
    enrolledUsers: ['2'],
  },
  {
    id: '2',
    title: 'Content Creation Workshop',
    description: 'Hands-on workshop for creating engaging visual content, video editing, and storytelling techniques. Learn professional tips and tricks to make your content stand out.',
    type: 'offline',
    date: '2026-02-20',
    time: '09:00',
    duration: '4 hours',
    instructor: 'Dewi Lestari',
    maxParticipants: 30,
    currentParticipants: 28,
    location: 'Pertamina Training Center, Jakarta',
    mapLink: 'https://maps.google.com/?q=Pertamina+Training+Center+Jakarta',
    status: 'upcoming',
    enrolledUsers: [],
  },
  {
    id: '3',
    title: 'Instagram Analytics & Insights',
    description: 'Deep dive into Instagram analytics, understanding metrics, and data-driven content strategy. Master the art of reading data and making informed decisions.',
    type: 'online',
    date: '2026-02-25',
    time: '15:00',
    duration: '1.5 hours',
    instructor: 'Andi Wijaya',
    maxParticipants: 40,
    currentParticipants: 35,
    meetingLink: 'https://teams.microsoft.com/l/meetup-join/example2',
    status: 'upcoming',
    enrolledUsers: ['2'],
  },
  {
    id: '4',
    title: 'Brand Storytelling Masterclass',
    description: 'Learn how to craft compelling brand stories that resonate with your audience and drive engagement. Discover the secrets of emotional connection through storytelling.',
    type: 'offline',
    date: '2026-01-30',
    time: '10:00',
    duration: '3 hours',
    instructor: 'Rini Kusuma',
    maxParticipants: 25,
    currentParticipants: 25,
    location: 'Pertamina Head Office, Jakarta',
    mapLink: 'https://maps.google.com/?q=Pertamina+Head+Office+Jakarta',
    status: 'completed',
    enrolledUsers: ['2'],
  },
  {
    id: '5',
    title: 'Advanced Video Editing Techniques',
    description: 'Master advanced video editing skills including transitions, effects, color grading, and audio mixing. Perfect for content creators looking to elevate their video production quality.',
    type: 'online',
    date: '2026-03-05',
    time: '13:00',
    duration: '3 hours',
    instructor: 'Hendra Gunawan',
    maxParticipants: 35,
    currentParticipants: 20,
    meetingLink: 'https://teams.microsoft.com/l/meetup-join/example3',
    status: 'upcoming',
    enrolledUsers: [],
  },
  {
    id: '6',
    title: 'Photography for Social Media',
    description: 'Learn professional photography techniques specifically tailored for social media platforms. From composition to lighting, master the art of capturing attention-grabbing images.',
    type: 'offline',
    date: '2026-03-10',
    time: '08:00',
    duration: '5 hours',
    instructor: 'Siti Nurhaliza',
    maxParticipants: 20,
    currentParticipants: 15,
    location: 'Pertamina Creative Studio, Jakarta',
    mapLink: 'https://maps.google.com/?q=Pertamina+Creative+Studio+Jakarta',
    status: 'upcoming',
    enrolledUsers: [],
  },
];

export function Classes() {
  const navigate = useNavigate();
  const { isAdmin, user } = useAuth();
  const { toast } = useToast();
  const [classes, setClasses] = useState<Class[]>(mockClasses);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingClass, setEditingClass] = useState<Class | null>(null);
  const [filterType, setFilterType] = useState<'all' | 'online' | 'offline'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'upcoming' | 'completed' | 'registered' | 'history'>('upcoming');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'online' as 'online' | 'offline',
    date: '',
    time: '',
    duration: '',
    instructor: '',
    maxParticipants: 30,
    meetingLink: '',
    location: '',
    mapLink: '',
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    if (isAdmin) {
      setActiveTab('all');
    } else {
      setActiveTab('upcoming');
    }
  }, [isAdmin]);

  const filteredClasses = classes.filter((cls) => {
    const matchesType = filterType === 'all' || cls.type === filterType;
    
    let matchesTab = false;
    if (isAdmin) {
      matchesTab = 
        activeTab === 'all' || 
        (activeTab === 'upcoming' && cls.status === 'upcoming') ||
        (activeTab === 'completed' && cls.status === 'completed');
    } else {
      const isEnrolled = cls.enrolledUsers.includes(user?.id || '');
      matchesTab = 
        (activeTab === 'upcoming' && cls.status === 'upcoming' && !isEnrolled) ||
        (activeTab === 'registered' && isEnrolled && cls.status === 'upcoming') ||
        (activeTab === 'history' && isEnrolled && cls.status === 'completed');
    }
    
    const matchesSearch = 
      cls.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cls.instructor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cls.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesTab && matchesSearch;
  });

  const handleAddClass = () => {
    setEditingClass(null);
    setFormData({
      title: '',
      description: '',
      type: 'online',
      date: '',
      time: '',
      duration: '',
      instructor: '',
      maxParticipants: 30,
      meetingLink: '',
      location: '',
      mapLink: '',
    });
    setIsDialogOpen(true);
  };

  const handleSaveClass = () => {
    if (editingClass) {
      setClasses(classes.map(c =>
        c.id === editingClass.id
          ? {
              ...c,
              ...formData,
            }
          : c
      ));
      toast({
        title: 'Class updated',
        description: 'The class has been successfully updated.',
      });
    } else {
      const newClass: Class = {
        id: Date.now().toString(),
        ...formData,
        currentParticipants: 0,
        status: 'upcoming',
        enrolledUsers: [],
      };
      setClasses([...classes, newClass]);
      toast({
        title: 'Class created',
        description: 'The class has been successfully created.',
      });
    }
    setIsDialogOpen(false);
  };

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  const handleViewDetail = (classId: string) => {
    navigate(`/classes/${classId}`);
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Classes</h1>
          <p className="text-muted-foreground">
            {isAdmin ? 'Manage training classes and workshops' : 'Browse and enroll in available classes'}
          </p>
        </div>
        {isAdmin && (
          <Button
            onClick={handleAddClass}
            className="bg-primary text-primary-foreground hover:bg-primary/90 font-normal"
          >
            <Plus className="w-5 h-5 mr-2" strokeWidth={1.5} />
            Add Class
          </Button>
        )}
      </div>

      <Card className="border border-border bg-card">
        <CardContent className="p-6">
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative flex-1 min-w-[250px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" strokeWidth={1.5} />
              <Input
                type="search"
                placeholder="Search classes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-background text-foreground border-border"
              />
            </div>
            <Select value={filterType} onValueChange={(value: any) => setFilterType(value)}>
              <SelectTrigger className="w-40 bg-background text-foreground border-border">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="online">Online</SelectItem>
                <SelectItem value="offline">Offline</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card className="border border-border bg-card">
        <CardContent className="p-6">
          <Tabs value={activeTab} onValueChange={(value: any) => setActiveTab(value)} className="w-full">
            {isAdmin ? (
              <TabsList className="grid w-full grid-cols-3 bg-accent p-1 h-auto">
                <TabsTrigger 
                  value="all" 
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm py-2.5 font-medium"
                >
                  All Classes
                </TabsTrigger>
                <TabsTrigger 
                  value="upcoming"
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm py-2.5 font-medium"
                >
                  Upcoming
                </TabsTrigger>
                <TabsTrigger 
                  value="completed"
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm py-2.5 font-medium"
                >
                  Completed
                </TabsTrigger>
              </TabsList>
            ) : (
              <TabsList className="grid w-full grid-cols-3 bg-accent p-1 h-auto">
                <TabsTrigger 
                  value="upcoming"
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm py-2.5 font-medium"
                >
                  Upcoming
                </TabsTrigger>
                <TabsTrigger 
                  value="registered"
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm py-2.5 font-medium"
                >
                  Registered
                </TabsTrigger>
                <TabsTrigger 
                  value="history"
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm py-2.5 font-medium"
                >
                  History
                </TabsTrigger>
              </TabsList>
            )}

            <TabsContent value={activeTab} className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredClasses.map((cls) => (
          <Card
            key={cls.id}
            className="border border-border bg-card hover:shadow-xl hover:border-primary/50 transition-all duration-300 cursor-pointer group"
            onClick={() => handleViewDetail(cls.id)}
          >
            <CardContent className="p-6 space-y-4">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2 flex-1">
                  {cls.title}
                </h3>
                <span
                  className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium ml-3 flex-shrink-0 ${
                    cls.type === 'online' 
                      ? 'bg-primary/10 text-primary' 
                      : 'bg-tertiary/10 text-tertiary'
                  }`}
                >
                  {cls.type === 'online' ? (
                    <>
                      <Video className="w-3.5 h-3.5 mr-1.5" strokeWidth={2} />
                      Online
                    </>
                  ) : (
                    <>
                      <MapPin className="w-3.5 h-3.5 mr-1.5" strokeWidth={2} />
                      Offline
                    </>
                  )}
                </span>
              </div>

              <div className="flex items-center gap-3 pb-4 border-b border-border">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 flex-shrink-0">
                  <User className="w-5 h-5 text-primary" strokeWidth={1.5} />
                </div>
                <span className="text-sm font-medium text-foreground">{cls.instructor}</span>
              </div>

              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" strokeWidth={1.5} />
                  <span>{new Date(cls.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" strokeWidth={1.5} />
                  <span>{cls.time}</span>
                </div>
              </div>

              <Button
                variant="outline"
                size="sm"
                className="w-full bg-transparent text-primary border-primary hover:bg-primary hover:text-primary-foreground font-normal group-hover:bg-primary group-hover:text-primary-foreground transition-all mt-4"
                onClick={(e) => {
                  e.stopPropagation();
                  handleViewDetail(cls.id);
                }}
              >
                View Details
                <ArrowRight className="w-4 h-4 ml-2" strokeWidth={1.5} />
              </Button>
            </CardContent>
          </Card>
              ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-popover text-popover-foreground max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-popover-foreground">
              {editingClass ? 'Edit Class' : 'Add New Class'}
            </DialogTitle>
            <DialogDescription className="text-muted-foreground">
              {editingClass ? 'Update class details' : 'Create a new training class'}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-popover-foreground required-asterisk">Class Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Enter class title"
                className="bg-background text-foreground border-border"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="text-popover-foreground required-asterisk">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Enter class description"
                rows={3}
                className="bg-background text-foreground border-border"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="type" className="text-popover-foreground required-asterisk">Class Type</Label>
              <Select value={formData.type} onValueChange={(value: 'online' | 'offline') => setFormData({ ...formData, type: value })}>
                <SelectTrigger id="type" className="bg-background text-foreground border-border">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="online">Online</SelectItem>
                  <SelectItem value="offline">Offline</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date" className="text-popover-foreground required-asterisk">Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="bg-background text-foreground border-border"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="time" className="text-popover-foreground required-asterisk">Time</Label>
                <Input
                  id="time"
                  type="time"
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  className="bg-background text-foreground border-border"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="duration" className="text-popover-foreground required-asterisk">Duration</Label>
                <Input
                  id="duration"
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                  placeholder="e.g., 2 hours"
                  className="bg-background text-foreground border-border"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="instructor" className="text-popover-foreground required-asterisk">Instructor</Label>
                <Input
                  id="instructor"
                  value={formData.instructor}
                  onChange={(e) => setFormData({ ...formData, instructor: e.target.value })}
                  placeholder="Enter instructor name"
                  className="bg-background text-foreground border-border"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="maxParticipants" className="text-popover-foreground required-asterisk">Max Participants</Label>
              <Input
                id="maxParticipants"
                type="number"
                value={formData.maxParticipants}
                onChange={(e) => setFormData({ ...formData, maxParticipants: parseInt(e.target.value) })}
                placeholder="Enter max participants"
                className="bg-background text-foreground border-border"
              />
            </div>

            {formData.type === 'online' && (
              <div className="space-y-2">
                <Label htmlFor="meetingLink" className="text-popover-foreground required-asterisk">Meeting Link</Label>
                <Input
                  id="meetingLink"
                  value={formData.meetingLink}
                  onChange={(e) => setFormData({ ...formData, meetingLink: e.target.value })}
                  placeholder="https://teams.microsoft.com/..."
                  className="bg-background text-foreground border-border"
                />
              </div>
            )}

            {formData.type === 'offline' && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="location" className="text-popover-foreground required-asterisk">Location</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="Enter location address"
                    className="bg-background text-foreground border-border"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="mapLink" className="text-popover-foreground">Google Maps Link</Label>
                  <Input
                    id="mapLink"
                    value={formData.mapLink}
                    onChange={(e) => setFormData({ ...formData, mapLink: e.target.value })}
                    placeholder="https://maps.google.com/..."
                    className="bg-background text-foreground border-border"
                  />
                </div>
              </>
            )}
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsDialogOpen(false)}
              className="bg-transparent text-foreground border-border hover:bg-accent hover:text-accent-foreground font-normal"
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={handleSaveClass}
              className="bg-primary text-primary-foreground hover:bg-primary/90 font-normal"
            >
              {editingClass ? 'Update Class' : 'Create Class'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
