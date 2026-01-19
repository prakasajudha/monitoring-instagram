import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '../contexts/AuthContext';
import { 
  ArrowLeft, 
  FileText, 
  Eye, 
  Heart, 
  MessageCircle, 
  Share2, 
  TrendingUp, 
  ExternalLink, 
  ArrowUpDown 
} from 'lucide-react';

interface UserContent {
  id: string;
  username: string;
  fullName: string;
  avatar: string;
  contentType: 'photo' | 'reels' | 'carousel';
  reach: number;
  likes: number;
  comments: number;
  impression: number;
  engagementRate: number;
  postLink: string;
  uploadDate: string;
}

const mockUserContent: UserContent[] = [
  {
    id: '1',
    username: 'rina_w',
    fullName: 'Rina Wijayanti',
    avatar: 'https://c.animaapp.com/mjxnk1q0BwGZL7/img/ai_2.png',
    contentType: 'reels',
    reach: 15600,
    likes: 2340,
    comments: 189,
    impression: 18500,
    engagementRate: 16.5,
    postLink: 'https://instagram.com/p/abc123',
    uploadDate: '2026-02-05',
  },
  {
    id: '2',
    username: 'agus_p',
    fullName: 'Agus Prasetyo',
    avatar: 'https://c.animaapp.com/mjxnk1q0BwGZL7/img/ai_2.png',
    contentType: 'carousel',
    reach: 12300,
    likes: 1890,
    comments: 156,
    impression: 14800,
    engagementRate: 16.9,
    postLink: 'https://instagram.com/p/def456',
    uploadDate: '2026-02-04',
  },
  {
    id: '3',
    username: 'dian_p',
    fullName: 'Dian Permata',
    avatar: 'https://c.animaapp.com/mjxnk1q0BwGZL7/img/ai_2.png',
    contentType: 'photo',
    reach: 10800,
    likes: 1650,
    comments: 134,
    impression: 13200,
    engagementRate: 16.8,
    postLink: 'https://instagram.com/p/ghi789',
    uploadDate: '2026-02-03',
  },
  {
    id: '4',
    username: 'fajar_n',
    fullName: 'Fajar Nugroho',
    avatar: 'https://c.animaapp.com/mjxnk1q0BwGZL7/img/ai_2.png',
    contentType: 'photo',
    reach: 9500,
    likes: 1420,
    comments: 112,
    impression: 11800,
    engagementRate: 16.4,
    postLink: 'https://instagram.com/p/jkl012',
    uploadDate: '2026-02-02',
  },
  {
    id: '5',
    username: 'lina_m',
    fullName: 'Lina Marlina',
    avatar: 'https://c.animaapp.com/mjxnk1q0BwGZL7/img/ai_2.png',
    contentType: 'reels',
    reach: 8700,
    likes: 1280,
    comments: 98,
    impression: 10500,
    engagementRate: 16.1,
    postLink: 'https://instagram.com/p/mno345',
    uploadDate: '2026-02-01',
  },
];

interface BriefInfo {
  title: string;
  objective: string;
  description: string;
  period: string;
  contentTypes: string[];
  hashtags: string[];
}

const getBriefInfo = (campaignId: string, briefId: string): BriefInfo => {
  const briefsMap: { [key: string]: { [key: string]: BriefInfo } } = {
    'q1-2026': {
      '1': {
        title: 'Energi untuk Negeri',
        objective: 'Menunjukkan perjalanan, peran, dan kontribusi PT Pertamina Patra Niaga dalam memastikan ketersediaan energi bagi masyarakat serta mendukung ketahanan energi nasional.',
        description: `Suggested Angles:
1. Perjalanan & Milestone PPN - Peran dan capaian Pertamina Patra Niaga dalam perjalanan mendistribusikan energi ke seluruh Indonesia.
2. Di Balik Layar Distribusi Energi - Cerita tentang proses dan tantangan dalam memastikan energi tetap mengalir, terutama di wilayah terpencil.
3. People Behind the Energy - Apresiasi terhadap pekerja (Perwira PPN) yang menjadi garda terdepan dalam operasional.
4. Energi untuk Kehidupan Sehari-hari - Bagaimana energi dari PPN hadir dan berdampak langsung pada aktivitas masyarakat.
5. Refleksi & Harapan ke Depan - Harapan terhadap peran PPN di masa depan dalam mendukung energi berkelanjutan dan ketahanan energi.

Mandatory Mention: Pertamina Patra Niaga`,
        period: 'January 1, 2026 - March 31, 2026',
        contentTypes: ['Photo', 'Reels', 'Carousel'],
        hashtags: ['#PertaminaPatraNiaga', '#EnergiUntukNegeri', '#ConnectingEnergy'],
      },
      '5': {
        title: 'Indonesia International Motor Show 2026',
        objective: 'Menunjukkan keterlibatan PT Pertamina Patra Niaga dalam mendukung penyelenggaraan IIMS melalui kehadiran booth interaktif, program aktivasi pengunjung, serta promosi MyPertamina yang memberikan berbagai kemudahan dan benefit bagi masyarakat.',
        description: `Suggested Angles:
1. Pertamina Patra Niaga Hadir di IIMS untuk Pengalaman yang Lebih Seru - Menampilkan aktivasi Pertamina Patra Niaga di IIMS melalui berbagai program dan aktivitas menarik untuk pengunjung.
2. Merchandise Resmi MotoGP & Produk Kolaborasi Digital - Menonjolkan merchandise resmi MotoGP dan produk kolaborasi digital (tas, tumbler, lanyard) sebagai daya tarik booth Pertamina Patra Niaga.
3. Transaksi Mudah dengan Banyak Metode Pembayaran - Menunjukkan kemudahan transaksi yang bisa dilakukan pengunjung, mulai dari tunai, mobile banking, hingga voucher BBK.
4. Belanja di Booth, Dapat Poin MyPertamina - Mengedukasi bahwa setiap pembelian merchandise memberikan poin MyPertamina, sehingga pengunjung mendapat benefit tambahan.

Mandatory Mention: Pertamina Patra Niaga`,
        period: 'January 1, 2026 - March 31, 2026',
        contentTypes: ['Photo', 'Reels', 'Carousel'],
        hashtags: ['#PertaminaPatraNiaga', '#MelayaniSepenuhHati', '#EnergizingYourJourney', '#EnergiUntukNegeri', '#MyPertaminaIIMS'],
      },
    },
    'q2-2026': {
      '2': {
        title: 'Connecting Sustainability',
        objective: 'Menunjukkan komitmen PT Pertamina Patra Niaga dalam mendukung ketahanan energi, pertumbuhan berkelanjutan, dan pengembangan masyarakat melalui berbagai inisiatif dan aktivitas operasional perusahaan.',
        description: `Suggested Angles:
1. Green Energy - Cerita tentang upaya transisi energi, efisiensi, atau praktik ramah lingkungan di aktivitas operasional.
2. Energy Independence - Peran energi dalam mendukung kemandirian nasional dan keberlanjutan pasokan energi dalam negeri.
3. Sustainable Business - Bagaimana operasional perusahaan dijalankan dengan prinsip keberlanjutan dan tanggung jawab jangka panjang.
4. Community Energy - Dampak kehadiran energi bagi masyarakat sekitar, termasuk UMKM, komunitas lokal, dan wilayah operasi.
5. Energy Security - Upaya menjaga keandalan pasokan energi di berbagai kondisi, termasuk momen krusial dan tantangan distribusi.
6. Growth Initiative - Inovasi, pengembangan bisnis, atau inisiatif baru yang mendorong pertumbuhan perusahaan.
7. Local Economy Resilience - Kontribusi perusahaan dalam menggerakkan ekonomi daerah dan memperkuat ketahanan ekonomi lokal.
8. People Development - Cerita tentang pengembangan SDM, pembelajaran, dan peran pekerja sebagai penggerak perusahaan.

Mandatory Mention: Pertamina Patra Niaga`,
        period: 'April 1, 2026 - June 30, 2026',
        contentTypes: ['Photo', 'Reels', 'Carousel'],
        hashtags: ['#HUTPPN', '#PertaminaPatraNiaga', '#EnergiUntukNegeri', '#ConnectingSustainability'],
      },
    },
    'q3-2026': {
      '3': {
        title: 'Connecting Mandalika GP',
        objective: 'Menunjukkan peran PT Pertamina Patra Niaga dalam mendukung pengembangan motorsport di Indonesia melalui dukungan energi dan dampak positif MotoGP Mandalika bagi Indonesia.',
        description: `Suggested Angles:
1. Motorsport & Kebanggaan Indonesia - MotoGP Mandalika sebagai ajang motorsport kelas dunia yang digelar di Indonesia.
2. Peran Energi di Balik Event Besar - Cerita tentang bagaimana energi mendukung kelancaran event internasional seperti MotoGP.
3. Perputaran Ekonomi & Dampak Lokal - Dampak MotoGP Mandalika terhadap UMKM, pariwisata, transportasi, dan ekonomi sekitar.
4. Fun Facts Sirkuit Mandalika - Fakta menarik tentang Sirkuit Mandalika atau pengalaman unik selama event berlangsung.
5. Experience-Based Content - Pengalaman pribadi KOL selama berada di Mandalika (suasana, antusiasme, vibe event).

Mandatory Mention: Pertamina Patra Niaga`,
        period: 'July 1, 2026 - September 30, 2026',
        contentTypes: ['Photo', 'Reels', 'Carousel'],
        hashtags: ['#MotoGPMandalika', '#PertaminaPatraNiaga', '#EnergiUntukNegeri', '#ConnectingMandalikaGP'],
      },
      '4': {
        title: 'MyPertamina Pasar Rakyat',
        objective: 'Menampilkan kegiatan yang dilakukan oleh Pertamina Patra Niaga dalam turut menyemarakkan HUT Republik Indonesia dengan menghadirkan berbagai kemudahan bagi masyarakat.',
        description: `Suggested Angles:
1. Melayani Sepenuh Hati di Momen Kemerdekaan - Pelayanan Pertamina Patra Niaga melalui kehadiran MyPertamina Pasar Rakyat yang memberikan kemudahan dan manfaat langsung bagi masyarakat.
2. Dukung UMKM dan Ekonomi Lokal - MyPertamina Pasar Rakyat sebagai wadah pemberdayaan UMKM dan pelaku usaha lokal dalam perayaan HUT RI.
3. Kemerdekaan yang Lebih Dekat dan Bermakna - Perayaan kemerdekaan yang tidak hanya seremonial, tetapi dirasakan langsung oleh masyarakat melalui aktivitas dan fasilitas di Pasar Rakyat.
4. Aktivasi yang Diselenggarkaan di MyPertamina Pasar Rakyat - Menjelaskan kegiatan - kegiatan yang diselenggarakan di MyPertamina Pasar Rakyat. COntoh: Bright Gas Cooking Competition, Lomba-lomba, dll.

Mandatory Mention: Pertamina Patra Niaga`,
        period: 'July 1, 2026 - September 30, 2026',
        contentTypes: ['Photo', 'Reels', 'Carousel'],
        hashtags: ['#MelayaniSepenuhHati', '#PertaminaPatraNiaga', '#EnergiUntukNegeri', '#EnergizingYourJourney '],
      },
    },
    'q4-2026': {
      '1': {
        title: 'MyPertamina Fair Show',
        objective: 'Menunjukkan apresiasi kepada pengguna setia MyPertamina sekaligus mengedukasi publik bahwa penggunaan MyPertamina memberikan berbagai benefit nyata melalui pengalaman, hiburan, dan keuntungan eksklusif.',
        description: `Suggested Angles:
1. Poin Jadi Tiket Experience - Fokus pada value experience, bahwa poin MyPertamina bukan hanya angka, tetapi dapat ditukar dengan tiket masuk event, akses hiburan, dan pengalaman eksklusif. 
2. Celebrating Community - Pertamina Patra Niaga hadir lebih dekat dengan masyarakat melalui event yang terbuka, inklusif, dan menyenangkan dengan aplikasi MyPertamina sebagai jembatannya.
3. Apresiasi untuk Pengguna Setia - MyPertamina Fair Show sebagai bentuk terima kasih kepada pengguna yang telah setia menggunakan MyPertamina dalam aktivitas sehari-hari.

Mandatory Mention: Pertamina Patra Niaga`,
        period: 'October 1, 2026 - December 31, 2026',
        contentTypes: ['Photo', 'Reels', 'Carousel'],
        hashtags: ['#PertaminaPatraNiaga', '#EnergiUntukNegeri', '#EnergizingYourJourney ','#MelayaniSepenuhHati','#TinggalTukarAja'],
      },
    },
  };

  return briefsMap[campaignId]?.[briefId] || {
    title: 'Brief Campaign',
    objective: '',
    description: '',
    period: '',
    contentTypes: [],
    hashtags: [],
  };
};

type SortField = 'username' | 'contentType' | 'reach' | 'likes' | 'comments' | 'impression' | 'engagementRate' | 'uploadDate';
type SortOrder = 'asc' | 'desc';

export function BriefDetail() {
  const { campaignId, briefId } = useParams();
  const navigate = useNavigate();
  const { isAdmin } = useAuth();
  const [userContent, setUserContent] = useState<UserContent[]>(mockUserContent);
  const [sortField, setSortField] = useState<SortField>('engagementRate');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  const briefInfo = getBriefInfo(campaignId || '', briefId || '');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('desc');
    }
  };

  useEffect(() => {
    const sortedContent = [...mockUserContent].sort((a, b) => {
      let aValue: any = a[sortField];
      let bValue: any = b[sortField];

      if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });
    setUserContent(sortedContent);
  }, [sortField, sortOrder]);

  const totalPosts = userContent.length;
  const totalReach = userContent.reduce((sum, content) => sum + content.reach, 0);
  const totalLikes = userContent.reduce((sum, content) => sum + content.likes, 0);
  const totalComments = userContent.reduce((sum, content) => sum + content.comments, 0);
  const totalImpression = userContent.reduce((sum, content) => sum + content.impression, 0);
  const avgEngagementRate = (userContent.reduce((sum, content) => sum + content.engagementRate, 0) / userContent.length).toFixed(1);

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate(`/campaign/${campaignId}`)}
          className="bg-transparent text-foreground hover:bg-accent hover:text-accent-foreground"
        >
          <ArrowLeft className="w-5 h-5" strokeWidth={1.5} />
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">{briefInfo.title}</h1>
          <p className="text-muted-foreground">{isAdmin ? 'Brief performance and user contributions' : 'Brief information and guidelines'}</p>
        </div>
      </div>

      {isAdmin && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border border-border bg-card">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-muted-foreground mb-2">Total Posts</p>
                    <p className="text-3xl font-semibold text-foreground">{totalPosts}</p>
                  </div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <FileText className="w-6 h-6 text-primary" strokeWidth={1.5} />
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
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-tertiary/10">
                    <Eye className="w-6 h-6 text-tertiary" strokeWidth={1.5} />
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
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
        </div>
      )}

      <Card className="border border-border bg-card">
        <CardHeader>
          <CardTitle className="text-foreground">Brief Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-2">Objective</p>
              <p className="text-sm text-foreground">{briefInfo.objective}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-2">Description</p>
              <p className="text-sm text-foreground whitespace-pre-line">{briefInfo.description}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-2">Active Period</p>
                <p className="text-sm text-foreground">{briefInfo.period}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-2">Allowed Content Types</p>
                <div className="flex flex-wrap gap-2">
                  {briefInfo.contentTypes.map((type) => (
                    <span
                      key={type}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary"
                    >
                      {type}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-2">Campaign Hashtags</p>
                <div className="flex flex-wrap gap-2">
                  {briefInfo.hashtags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-tertiary/10 text-tertiary"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border border-border bg-card">
        <CardHeader>
          <CardTitle className="text-foreground">User Contributions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-sm font-medium text-foreground">
                    <button
                      onClick={() => handleSort('username')}
                      className="flex items-center gap-2 hover:text-primary transition-colors"
                    >
                      Username
                      <ArrowUpDown className="w-4 h-4" strokeWidth={1.5} />
                    </button>
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-foreground">
                    <button
                      onClick={() => handleSort('uploadDate')}
                      className="flex items-center gap-2 hover:text-primary transition-colors"
                    >
                      Upload Date
                      <ArrowUpDown className="w-4 h-4" strokeWidth={1.5} />
                    </button>
                  </th>
                  {isAdmin && (
                    <>
                      <th className="text-left py-3 px-4 text-sm font-medium text-foreground">
                        <button
                          onClick={() => handleSort('contentType')}
                          className="flex items-center gap-2 hover:text-primary transition-colors"
                        >
                          Content Type
                          <ArrowUpDown className="w-4 h-4" strokeWidth={1.5} />
                        </button>
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-foreground">
                        <button
                          onClick={() => handleSort('reach')}
                          className="flex items-center gap-2 hover:text-primary transition-colors"
                        >
                          Reach
                          <ArrowUpDown className="w-4 h-4" strokeWidth={1.5} />
                        </button>
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-foreground">
                        <button
                          onClick={() => handleSort('likes')}
                          className="flex items-center gap-2 hover:text-primary transition-colors"
                        >
                          Likes
                          <ArrowUpDown className="w-4 h-4" strokeWidth={1.5} />
                        </button>
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-foreground">
                        <button
                          onClick={() => handleSort('comments')}
                          className="flex items-center gap-2 hover:text-primary transition-colors"
                        >
                          Comments
                          <ArrowUpDown className="w-4 h-4" strokeWidth={1.5} />
                        </button>
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-foreground">
                        <button
                          onClick={() => handleSort('impression')}
                          className="flex items-center gap-2 hover:text-primary transition-colors"
                        >
                          Impression
                          <ArrowUpDown className="w-4 h-4" strokeWidth={1.5} />
                        </button>
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-foreground">
                        <button
                          onClick={() => handleSort('engagementRate')}
                          className="flex items-center gap-2 hover:text-primary transition-colors"
                        >
                          Engagement Rate
                          <ArrowUpDown className="w-4 h-4" strokeWidth={1.5} />
                        </button>
                      </th>
                    </>
                  )}
                  <th className="text-left py-3 px-4 text-sm font-medium text-foreground">Link</th>
                </tr>
              </thead>
              <tbody>
                {userContent.map((content) => (
                  <tr key={content.id} className="border-b border-border hover:bg-accent transition-colors duration-200">
                    <td className="py-3 px-4 text-sm">
                      <div className="flex items-center gap-3">
                        <img
                          src={content.avatar}
                          alt={content.fullName}
                          className="w-8 h-8 rounded-full"
                        />
                        <div>
                          <p className="font-medium text-foreground">{content.fullName}</p>
                          <p className="text-xs text-muted-foreground">@{content.username}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm text-muted-foreground">
                      {new Date(content.uploadDate).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'short', 
                        day: 'numeric' 
                      })}
                    </td>
                    {isAdmin && (
                      <>
                        <td className="py-3 px-4 text-sm">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getContentTypeColor(content.contentType)}`}>
                            {content.contentType}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-sm text-foreground">{content.reach.toLocaleString()}</td>
                        <td className="py-3 px-4 text-sm text-foreground">{content.likes.toLocaleString()}</td>
                        <td className="py-3 px-4 text-sm text-foreground">{content.comments.toLocaleString()}</td>
                        <td className="py-3 px-4 text-sm text-foreground">{content.impression.toLocaleString()}</td>
                        <td className="py-3 px-4 text-sm font-semibold text-success">{content.engagementRate}%</td>
                      </>
                    )}
                    <td className="py-3 px-4 text-sm">
                      <a
                        href={content.postLink}
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
