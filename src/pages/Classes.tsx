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
  // Completed Classes
  {
    id: '1',
    title: 'Energy Connectors 101',
    description: 'Kelas pengenalan program Energy Connectors, tujuan, peran peserta, serta alur aktivitas dan sistem monitoring. Peserta juga akan memahami playbook dasar agar aktivitas komunikasi berjalan terarah dan aman.',
    type: 'offline',
    date: '2026-01-10',
    time: '14:00',
    duration: '2 hours',
    instructor: 'Budi Santoso',
    maxParticipants: 50,
    currentParticipants: 45,
    location: 'Function Room Wisma Tugu II Lt. 1 Jakarta',
    mapLink: 'https://maps.google.com/?q=Wisma+Tugu+II+Jakarta',
    status: 'completed',
    enrolledUsers: ['2'],
  },
  {
    id: '2',
    title: 'Guideline Komunikasi di Media Sosial',
    description: 'Pembahasan do’s & don’ts dalam membuat konten sebagai employee advocate, termasuk batasan informasi dan gaya komunikasi yang sesuai. Materi ini menjadi acuan utama agar konten tetap selaras dengan nilai perusahaan.',
    type: 'offline',
    date: '2026-01-11',
    time: '10:00',
    duration: '2 hours',
    instructor: 'Siti Aminah',
    maxParticipants: 50,
    currentParticipants: 48,
    location: 'Function Room Wisma Tugu II Lt. 1 Jakarta',
    mapLink: 'https://maps.google.com/?q=Wisma+Tugu+II+Jakarta',
    status: 'completed',
    enrolledUsers: ['2'],
  },
  {
    id: '3',
    title: 'Dive Deeper Into the Company’s Value & Business Process',
    description: 'Kelas untuk memperkuat pemahaman peserta tentang value perusahaan dan proses bisnis Pertamina Patra Niaga. Tujuannya agar storytelling yang dibuat lebih kontekstual, akurat, dan relevan dengan operasional perusahaan.',
    type: 'offline',
    date: '2026-01-12',
    time: '13:00',
    duration: '2.5 hours',
    instructor: 'Rudi Hartono',
    maxParticipants: 50,
    currentParticipants: 50,
    location: 'Function Room Wisma Tugu II Lt. 1 Jakarta',
    mapLink: 'https://maps.google.com/?q=Wisma+Tugu+II+Jakarta',
    status: 'completed',
    enrolledUsers: ['2'],
  },
  {
    id: '4',
    title: 'Etika Komunikasi Digital',
    description: 'Materi mengenai etika berinteraksi di ruang digital, termasuk cara menyampaikan pendapat, merespons audiens, dan menjaga profesionalisme. Peserta dilatih untuk berkomunikasi dengan humanis tanpa menimbulkan risiko reputasi.',
    type: 'offline',
    date: '2026-01-13',
    time: '09:00',
    duration: '2 hours',
    instructor: 'Dewi Sartika',
    maxParticipants: 50,
    currentParticipants: 42,
    location: 'Function Room Wisma Tugu II Lt. 1 Jakarta',
    mapLink: 'https://maps.google.com/?q=Wisma+Tugu+II+Jakarta',
    status: 'completed',
    enrolledUsers: ['2'],
  },
  {
    id: '5',
    title: 'Perlindungan Data Pribadi & Digital Safety Basic',
    description: 'Pembekalan dasar keamanan digital, privasi akun, dan cara melindungi diri dari risiko seperti doxxing atau serangan online. Peserta juga memahami prinsip perlindungan data pribadi dalam aktivitas komunikasi.',
    type: 'offline',
    date: '2026-01-14',
    time: '15:00',
    duration: '2 hours',
    instructor: 'Eko Prasetyo',
    maxParticipants: 50,
    currentParticipants: 40,
    location: 'Function Room Wisma Tugu II Lt. 1 Jakarta',
    mapLink: 'https://maps.google.com/?q=Wisma+Tugu+II+Jakarta',
    status: 'completed',
    enrolledUsers: ['2'],
  },
  {
    id: '6',
    title: 'Building Digital Persona',
    description: 'Kelas untuk membangun personal branding yang kredibel dan konsisten, tanpa kehilangan identitas pribadi. Peserta belajar menampilkan citra profesional yang tetap selaras dengan peran sebagai Perwira PPN.',
    type: 'offline',
    date: '2026-01-15',
    time: '11:00',
    duration: '2 hours',
    instructor: 'Maya Indriani',
    maxParticipants: 50,
    currentParticipants: 46,
    location: 'Function Room Wisma Tugu II Lt. 1 Jakarta',
    mapLink: 'https://maps.google.com/?q=Wisma+Tugu+II+Jakarta',
    status: 'completed',
    enrolledUsers: ['2'],
  },

  // Upcoming Classes
  {
    id: '7',
    title: 'Mastering Credible Storytelling',
    description: 'Pelatihan menyusun narasi yang kuat, autentik, dan mudah dipahami publik, terutama terkait aktivitas operasional di lapangan. Fokus pada cara menyampaikan informasi dengan struktur yang jelas dan terpercaya.',
    type: 'online',
    date: '2026-02-05',
    time: '14:00',
    duration: '2 hours',
    instructor: 'Andi Wijaya',
    maxParticipants: 100,
    currentParticipants: 25,
    meetingLink: 'https://teams.microsoft.com/l/meetup-join/example1',
    status: 'upcoming',
    enrolledUsers: [],
  },
  {
    id: '8',
    title: 'Basic Editing & Content Creation',
    description: 'Materi teknis produksi konten menggunakan perangkat sederhana (HP), termasuk teknik pengambilan gambar/video dan editing dasar. Peserta dilatih membuat konten yang rapi, engaging, dan siap tayang.',
    type: 'offline',
    date: '2026-02-10',
    time: '09:00',
    duration: '4 hours',
    instructor: 'Rina Marlina',
    maxParticipants: 30,
    currentParticipants: 15,
    location: 'Pertamina Training Center',
    mapLink: 'https://maps.google.com/?q=Pertamina+Training+Center',
    status: 'upcoming',
    enrolledUsers: [],
  },
  {
    id: '9',
    title: 'Reading Basic Analytics',
    description: 'Pembahasan metrik dasar performa konten seperti reach, views, engagement, dan watch time. Peserta belajar membaca data untuk meningkatkan kualitas konten di posting berikutnya.',
    type: 'online',
    date: '2026-02-15',
    time: '13:00',
    duration: '1.5 hours',
    instructor: 'Doni Kurniawan',
    maxParticipants: 100,
    currentParticipants: 10,
    meetingLink: 'https://teams.microsoft.com/l/meetup-join/example2',
    status: 'upcoming',
    enrolledUsers: [],
  },
  {
    id: '10',
    title: 'Reputational Risk & Personal Brand Protection',
    description: 'Kelas untuk mengenali risiko reputasi dalam komunikasi digital, baik untuk individu maupun perusahaan. Peserta dibekali strategi menjaga kredibilitas dan menghindari konten yang berpotensi memicu isu.',
    type: 'offline',
    date: '2026-02-20',
    time: '10:00',
    duration: '2 hours',
    instructor: 'Fajar Nugraha',
    maxParticipants: 50,
    currentParticipants: 5,
    location: 'Function Room Wisma Tugu II Lt. 1 Jakarta',
    mapLink: 'https://maps.google.com/?q=Wisma+Tugu+II+Jakarta',
    status: 'upcoming',
    enrolledUsers: [],
  },
  {
    id: '11',
    title: 'Crisis Communication for Employee Advocate',
    description: 'Pembekalan cara bersikap saat isu sensitif atau krisis muncul di ruang publik. Peserta memahami kapan harus merespons, kapan harus eskalasi, dan bagaimana menjaga komunikasi tetap aman.',
    type: 'online',
    date: '2026-02-25',
    time: '14:00',
    duration: '2 hours',
    instructor: 'Indah Permatasari',
    maxParticipants: 100,
    currentParticipants: 8,
    meetingLink: 'https://teams.microsoft.com/l/meetup-join/example3',
    status: 'upcoming',
    enrolledUsers: [],
  },
  {
    id: '12',
    title: 'Misinformation & Fact Checking',
    description: 'Materi untuk meningkatkan kemampuan memilah informasi, menghindari hoaks, dan memastikan konten yang dibagikan akurat. Peserta juga belajar cara melakukan verifikasi sebelum memposting.',
    type: 'online',
    date: '2026-03-01',
    time: '10:00',
    duration: '2 hours',
    instructor: 'Herry Setiawan',
    maxParticipants: 100,
    currentParticipants: 12,
    meetingLink: 'https://teams.microsoft.com/l/meetup-join/example4',
    status: 'upcoming',
    enrolledUsers: [],
  },
  {
    id: '13',
    title: 'Updated Product Knowledge',
    description: 'Sesi pembaruan informasi terkait produk, layanan, atau program terbaru perusahaan. Tujuannya agar peserta dapat menyampaikan edukasi publik dengan tepat dan selaras dengan informasi resmi.',
    type: 'offline',
    date: '2026-03-05',
    time: '09:00',
    duration: '3 hours',
    instructor: 'Bambang Sudibyo',
    maxParticipants: 60,
    currentParticipants: 30,
    location: 'Pertamina Head Office',
    mapLink: 'https://maps.google.com/?q=Pertamina+Head+Office',
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
