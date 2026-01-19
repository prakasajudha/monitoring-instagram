import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '../contexts/AuthContext';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import ArrowLeft from 'lucide-react/dist/esm/icons/arrow-left';
import Plus from 'lucide-react/dist/esm/icons/plus';
import Edit from 'lucide-react/dist/esm/icons/edit';
import Trash2 from 'lucide-react/dist/esm/icons/trash-2';

interface Brief {
  id: string;
  title: string;
  objective: string;
  description: string;
  date: string;
  status: 'active' | 'inactive';
  activeUntilEndQuarter: boolean;
  contentTypes: string[];
  hashtags: string[];
}

const getCampaignBriefs = (campaignId: string): Brief[] => {
  const briefsMap: { [key: string]: Brief[] } = {
    'q1-2026': [
      {
        id: '1',
        title: 'Energi untuk Negeri',
        objective: 'Menunjukkan perjalanan, peran, dan kontribusi PT Pertamina Patra Niaga dalam memastikan ketersediaan energi bagi masyarakat serta mendukung ketahanan energi nasional.',
        description: `Suggested Angles:
1. Perjalanan & Milestone PPN - Peran dan capaian Pertamina Patra Niaga dalam perjalanan mendistribusikan energi ke seluruh Indonesia.
2. Di Balik Layar Distribusi Energi - Cerita tentang proses dan tantangan dalam memastikan energi tetap mengalir, terutama di wilayah terpencil.
3. People Behind the Energy - Apresiasi terhadap pekerja (Perwira PPN) yang menjadi garda terdepan dalam operasional.
4. Energi untuk Kehidupan Sehari-hari - Bagaimana energi dari PPN hadir dan berdampak langsung pada aktivitas masyarakat.
5. Refleksi & Harapan ke Depan - Harapan terhadap peran PPN di masa depan dalam mendukung energi berkelanjutan dan ketahanan energi.

Mandatory Mention: Pertamina Patra Niaga`,
        date: '2026-01-01',
        status: 'active',
        activeUntilEndQuarter: true,
        contentTypes: ['Photo', 'Reels', 'Carousel'],
        hashtags: ['#PertaminaPatraNiaga', '#EnergiUntukNegeri', '#ConnectingEnergy'],
      },
      {
        id: '5',
        title: 'Indonesia International Motor Show 2026',
        objective: 'Menunjukkan keterlibatan PT Pertamina Patra Niaga dalam mendukung penyelenggaraan IIMS melalui kehadiran booth interaktif, program aktivasi pengunjung, serta promosi MyPertamina yang memberikan berbagai kemudahan dan benefit bagi masyarakat.',
        description: `Suggested Angles:
1. Pertamina Patra Niaga Hadir di IIMS untuk Pengalaman yang Lebih Seru - Menampilkan aktivasi Pertamina Patra Niaga di IIMS melalui berbagai program dan aktivitas menarik untuk pengunjung.
2. Merchandise Resmi MotoGP & Produk Kolaborasi Digital - Menonjolkan merchandise resmi MotoGP dan produk kolaborasi digital (tas, tumbler, lanyard) sebagai daya tarik booth Pertamina Patra Niaga.
3. Transaksi Mudah dengan Banyak Metode Pembayaran - Menunjukkan kemudahan transaksi yang bisa dilakukan pengunjung, mulai dari tunai, mobile banking, hingga voucher BBK.
4. Belanja di Booth, Dapat Poin MyPertamina - Mengedukasi bahwa setiap pembelian merchandise memberikan poin MyPertamina, sehingga pengunjung mendapat benefit tambahan.

Mandatory Mention: Pertamina Patra Niaga`,
        date: '2026-01-01',
        status: 'active',
        activeUntilEndQuarter: true,
        contentTypes: ['Photo', 'Reels', 'Carousel'],
        hashtags: ['#PertaminaPatraNiaga', '#MelayaniSepenuhHati', '#EnergizingYourJourney', '#EnergiUntukNegeri', '#MyPertaminaIIMS'],
      },
    ],
    'q2-2026': [
      {
        id: '2',
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
        date: '2026-04-01',
        status: 'inactive',
        activeUntilEndQuarter: true,
        contentTypes: ['Photo', 'Reels', 'Carousel'],
        hashtags: ['#HUTPPN', '#PertaminaPatraNiaga', '#EnergiUntukNegeri', '#ConnectingSustainability'],
      },
    ],
    'q3-2026': [
      {
        id: '3',
        title: 'Connecting Mandalika GP',
        objective: 'Menunjukkan peran PT Pertamina Patra Niaga dalam mendukung pengembangan motorsport di Indonesia melalui dukungan energi dan dampak positif MotoGP Mandalika bagi Indonesia.',
        description: `Suggested Angles:
  1. Motorsport & Kebanggaan Indonesia - MotoGP Mandalika sebagai ajang motorsport kelas dunia yang digelar di Indonesia.
  2. Peran Energi di Balik Event Besar - Cerita tentang bagaimana energi mendukung kelancaran event internasional seperti MotoGP.
  3. Perputaran Ekonomi & Dampak Lokal - Dampak MotoGP Mandalika terhadap UMKM, pariwisata, transportasi, dan ekonomi sekitar.
  4. Fun Facts Sirkuit Mandalika - Fakta menarik tentang Sirkuit Mandalika atau pengalaman unik selama event berlangsung.
  5. Experience-Based Content - Pengalaman pribadi KOL selama berada di Mandalika (suasana, antusiasme, vibe event).
  
  Mandatory Mention: Pertamina Patra Niaga`,
        date: '2026-07-01',
        status: 'inactive',
        activeUntilEndQuarter: true,
        contentTypes: ['Photo', 'Reels', 'Carousel'],
        hashtags: ['#MotoGPMandalika', '#PertaminaPatraNiaga', '#EnergiUntukNegeri', '#ConnectingMandalikaGP'],
      },
      {
        id: '4',
        title: 'MyPertamina Pasar Rakyat',
        objective: 'Menampilkan kegiatan yang dilakukan oleh Pertamina Patra Niaga dalam turut menyemarakkan HUT Republik Indonesia dengan menghadirkan berbagai kemudahan bagi masyarakat.',
        description: `Suggested Angles:
1. Melayani Sepenuh Hati di Momen Kemerdekaan - Pelayanan Pertamina Patra Niaga melalui kehadiran MyPertamina Pasar Rakyat yang memberikan kemudahan dan manfaat langsung bagi masyarakat.
2. Dukung UMKM dan Ekonomi Lokal - MyPertamina Pasar Rakyat sebagai wadah pemberdayaan UMKM dan pelaku usaha lokal dalam perayaan HUT RI.
3. Kemerdekaan yang Lebih Dekat dan Bermakna - Perayaan kemerdekaan yang tidak hanya seremonial, tetapi dirasakan langsung oleh masyarakat melalui aktivitas dan fasilitas di Pasar Rakyat.
4. Aktivasi yang Diselenggarkaan di MyPertamina Pasar Rakyat - Menjelaskan kegiatan - kegiatan yang diselenggarakan di MyPertamina Pasar Rakyat. COntoh: Bright Gas Cooking Competition, Lomba-lomba, dll.

  Mandatory Mention: Pertamina Patra Niaga`,
        date: '2026-07-01',
        status: 'inactive',
        activeUntilEndQuarter: true,
        contentTypes: ['Photo', 'Reels', 'Carousel'],
        hashtags: ['#MelayaniSepenuhHati', '#PertaminaPatraNiaga', '#EnergiUntukNegeri', '#EnergizingYourJourney '],
      },
    ],
    'q4-2026': [
    {
        id: '1',
        title: 'MyPertamina Fair Show',
        objective: 'Menunjukkan apresiasi kepada pengguna setia MyPertamina sekaligus mengedukasi publik bahwa penggunaan MyPertamina memberikan berbagai benefit nyata melalui pengalaman, hiburan, dan keuntungan eksklusif.',
        description: `Suggested Angles:
1. Poin Jadi Tiket Experience - Fokus pada value experience, bahwa poin MyPertamina bukan hanya angka, tetapi dapat ditukar dengan tiket masuk event, akses hiburan, dan pengalaman eksklusif. 
2. Celebrating Community - Pertamina Patra Niaga hadir lebih dekat dengan masyarakat melalui event yang terbuka, inklusif, dan menyenangkan dengan aplikasi MyPertamina sebagai jembatannya.
3. Apresiasi untuk Pengguna Setia - MyPertamina Fair Show sebagai bentuk terima kasih kepada pengguna yang telah setia menggunakan MyPertamina dalam aktivitas sehari-hari.

Mandatory Mention: Pertamina Patra Niaga`,
        date: '2026-10-01',
        status: 'inactive',
        activeUntilEndQuarter: true,
        contentTypes: ['Photo', 'Reels', 'Carousel'],
        hashtags: ['#PertaminaPatraNiaga', '#EnergiUntukNegeri', '#EnergizingYourJourney ','#MelayaniSepenuhHati','#TinggalTukarAja'],
      },

    ],
  };

  return briefsMap[campaignId] || [];
};

export function CampaignDetail() {
  const { campaignId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { isAdmin } = useAuth();
  const [briefs, setBriefs] = useState<Brief[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingBrief, setEditingBrief] = useState<Brief | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    objective: '',
    description: '',
    date: '',
    endDate: '',
    activeUntilEndQuarter: false,
    contentTypes: [] as string[],
    hashtags: '',
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    if (campaignId) {
      setBriefs(getCampaignBriefs(campaignId));
    }
  }, [campaignId]);

  const getCampaignName = (id: string) => {
    const campaigns: { [key: string]: string } = {
      'q1-2026': 'Q1 Campaign 2026',
      'q2-2026': 'Q2 Campaign 2026',
      'q3-2026': 'Q3 Campaign 2026',
      'q4-2026': 'Q4 Campaign 2026',
    };
    return campaigns[id] || 'Campaign';
  };

  const getQuarterStartDate = (id: string): string => {
    const quarterStartDates: { [key: string]: string } = {
      'q1-2026': '2026-01-01',
      'q2-2026': '2026-04-01',
      'q3-2026': '2026-07-01',
      'q4-2026': '2026-10-01',
    };
    return quarterStartDates[id] || '';
  };

  const getQuarterEndDate = (id: string): string => {
    const quarterEndDates: { [key: string]: string } = {
      'q1-2026': '2026-03-31',
      'q2-2026': '2026-06-30',
      'q3-2026': '2026-09-30',
      'q4-2026': '2026-12-31',
    };
    return quarterEndDates[id] || '';
  };

  const formatDate = (dateString: string): string => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  const handleAddBrief = () => {
    setEditingBrief(null);
    const quarterStartDate = getQuarterStartDate(campaignId || '');
    const quarterEndDate = getQuarterEndDate(campaignId || '');
    setFormData({
      title: '',
      objective: '',
      description: '',
      date: quarterStartDate,
      endDate: quarterEndDate,
      activeUntilEndQuarter: true,
      contentTypes: ['Photo', 'Reels', 'Carousel'],
      hashtags: '',
    });
    setIsDialogOpen(true);
  };

  const handleEditBrief = (brief: Brief) => {
    setEditingBrief(brief);
    const endDate = brief.activeUntilEndQuarter ? getQuarterEndDate(campaignId || '') : brief.date;
    setFormData({
      title: brief.title,
      objective: brief.objective,
      description: brief.description,
      date: brief.date,
      endDate: endDate,
      activeUntilEndQuarter: brief.activeUntilEndQuarter,
      contentTypes: brief.contentTypes,
      hashtags: brief.hashtags.join(', '),
    });
    setIsDialogOpen(true);
  };

  const handleDeleteBrief = (briefId: string) => {
    setBriefs(briefs.filter(b => b.id !== briefId));
    toast({
      title: 'Brief deleted',
      description: 'The brief has been successfully deleted.',
    });
  };

  const handleToggleStatus = (briefId: string) => {
    setBriefs(briefs.map(b => 
      b.id === briefId 
        ? { ...b, status: b.status === 'active' ? 'inactive' : 'active' } 
        : b
    ));
  };

  const handleSaveBrief = () => {
    const hashtagsArray = formData.hashtags
      .split(',')
      .map(tag => tag.trim())
      .filter(tag => tag.length > 0);

    if (editingBrief) {
      setBriefs(briefs.map(b =>
        b.id === editingBrief.id
          ? {
              ...b,
              title: formData.title,
              objective: formData.objective,
              description: formData.description,
              date: formData.date,
              activeUntilEndQuarter: formData.activeUntilEndQuarter,
              contentTypes: formData.contentTypes,
              hashtags: hashtagsArray,
            }
          : b
      ));
      toast({
        title: 'Brief updated',
        description: 'The brief has been successfully updated.',
      });
    } else {
      const newBrief: Brief = {
        id: Date.now().toString(),
        title: formData.title,
        objective: formData.objective,
        description: formData.description,
        date: formData.date,
        status: 'active',
        activeUntilEndQuarter: formData.activeUntilEndQuarter,
        contentTypes: formData.contentTypes,
        hashtags: hashtagsArray,
      };
      setBriefs([...briefs, newBrief]);
      toast({
        title: 'Brief created',
        description: 'The brief has been successfully created.',
      });
    }
    setIsDialogOpen(false);
  };

  const handleContentTypeChange = (type: string, checked: boolean) => {
    if (checked) {
      setFormData({ ...formData, contentTypes: [...formData.contentTypes, type] });
    } else {
      setFormData({ ...formData, contentTypes: formData.contentTypes.filter(t => t !== type) });
    }
  };

  const handleSelectAllContentTypes = (checked: boolean) => {
    if (checked) {
      setFormData({ ...formData, contentTypes: ['Photo', 'Reels', 'Carousel'] });
    } else {
      setFormData({ ...formData, contentTypes: [] });
    }
  };

  const handleBriefClick = (briefId: string) => {
    navigate(`/campaign/${campaignId}/brief/${briefId}`);
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/campaign-insights')}
            className="bg-transparent text-foreground hover:bg-accent hover:text-accent-foreground"
          >
            <ArrowLeft className="w-5 h-5" strokeWidth={1.5} />
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">{getCampaignName(campaignId || '')}</h1>
            <p className="text-muted-foreground">Campaign briefs and content guidelines</p>
          </div>
        </div>
        {isAdmin && (
          <Button
            onClick={handleAddBrief}
            className="bg-primary text-primary-foreground hover:bg-primary/90 font-normal"
          >
            <Plus className="w-5 h-5 mr-2" strokeWidth={1.5} />
            Tambah Brief
          </Button>
        )}
      </div>

      <Card className="border border-border bg-card">
        <CardHeader>
          <CardTitle className="text-foreground">Social Media Guidelines</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-success/10">
                  <svg className="w-6 h-6 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-success">Do's</h3>
              </div>
              <div className="space-y-3">
                <div className="flex gap-3 p-3 rounded-lg bg-success/5 border border-success/20">
                  <span className="text-success font-bold flex-shrink-0">✓</span>
                  <p className="text-sm text-foreground">Bagikan cerita dan pengalaman lapangan yang nyata, relevan, dan positif.</p>
                </div>
                <div className="flex gap-3 p-3 rounded-lg bg-success/5 border border-success/20">
                  <span className="text-success font-bold flex-shrink-0">✓</span>
                  <p className="text-sm text-foreground">Gunakan bahasa yang sopan, informatif, dan mudah dipahami publik.</p>
                </div>
                <div className="flex gap-3 p-3 rounded-lg bg-success/5 border border-success/20">
                  <span className="text-success font-bold flex-shrink-0">✓</span>
                  <p className="text-sm text-foreground">Pastikan informasi yang dibagikan akurat dan tidak menimbulkan multitafsir.</p>
                </div>
                <div className="flex gap-3 p-3 rounded-lg bg-success/5 border border-success/20">
                  <span className="text-success font-bold flex-shrink-0">✓</span>
                  <p className="text-sm text-foreground">Gunakan hashtag dan tag akun resmi sesuai ketentuan program.</p>
                </div>
                <div className="flex gap-3 p-3 rounded-lg bg-success/5 border border-success/20">
                  <span className="text-success font-bold flex-shrink-0">✓</span>
                  <p className="text-sm text-foreground">Jaga etika, profesionalisme, dan citra perusahaan dalam setiap unggahan.</p>
                </div>
                <div className="flex gap-3 p-3 rounded-lg bg-success/5 border border-success/20">
                  <span className="text-success font-bold flex-shrink-0">✓</span>
                  <p className="text-sm text-foreground">Arahkan pertanyaan sensitif atau strategis ke kanal resmi perusahaan.</p>
                </div>
                <div className="flex gap-3 p-3 rounded-lg bg-success/5 border border-success/20">
                  <span className="text-success font-bold flex-shrink-0">✓</span>
                  <p className="text-sm text-foreground">Laporkan kepada Corporate Secretary jika menghadapi respons negatif atau potensi isu.</p>
                </div>
                <div className="flex gap-3 p-3 rounded-lg bg-success/5 border border-success/20">
                  <span className="text-success font-bold flex-shrink-0">✓</span>
                  <p className="text-sm text-foreground">Lindungi privasi diri sendiri, rekan kerja, dan pihak eksternal.</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-destructive/10">
                  <svg className="w-6 h-6 text-destructive" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-destructive">Don'ts</h3>
              </div>
              <div className="space-y-3">
                <div className="flex gap-3 p-3 rounded-lg bg-destructive/5 border border-destructive/20">
                  <span className="text-destructive font-bold flex-shrink-0">✗</span>
                  <p className="text-sm text-foreground">Jangan membagikan informasi rahasia, sensitif, atau belum dipublikasikan secara resmi.</p>
                </div>
                <div className="flex gap-3 p-3 rounded-lg bg-destructive/5 border border-destructive/20">
                  <span className="text-destructive font-bold flex-shrink-0">✗</span>
                  <p className="text-sm text-foreground">Jangan menyampaikan pernyataan yang mewakili kebijakan atau sikap resmi perusahaan.</p>
                </div>
                <div className="flex gap-3 p-3 rounded-lg bg-destructive/5 border border-destructive/20">
                  <span className="text-destructive font-bold flex-shrink-0">✗</span>
                  <p className="text-sm text-foreground">Jangan berdebat atau menanggapi provokasi di media sosial.</p>
                </div>
                <div className="flex gap-3 p-3 rounded-lg bg-destructive/5 border border-destructive/20">
                  <span className="text-destructive font-bold flex-shrink-0">✗</span>
                  <p className="text-sm text-foreground">Jangan menyampaikan opini pribadi terkait isu hukum, politik, atau kebijakan perusahaan.</p>
                </div>
                <div className="flex gap-3 p-3 rounded-lg bg-destructive/5 border border-destructive/20">
                  <span className="text-destructive font-bold flex-shrink-0">✗</span>
                  <p className="text-sm text-foreground">Jangan membagikan data pribadi pelanggan, mitra, atau rekan kerja.</p>
                </div>
                <div className="flex gap-3 p-3 rounded-lg bg-destructive/5 border border-destructive/20">
                  <span className="text-destructive font-bold flex-shrink-0">✗</span>
                  <p className="text-sm text-foreground">Jangan menggunakan identitas atau atribut perusahaan di luar ketentuan.</p>
                </div>
                <div className="flex gap-3 p-3 rounded-lg bg-destructive/5 border border-destructive/20">
                  <span className="text-destructive font-bold flex-shrink-0">✗</span>
                  <p className="text-sm text-foreground">Jangan mengunggah konten yang berpotensi menyesatkan atau merugikan reputasi perusahaan.</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border border-border bg-card">
        <CardHeader>
          <CardTitle className="text-foreground">Campaign Briefs</CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full space-y-4">
            {briefs.map((brief) => (
              <AccordionItem
                key={brief.id}
                value={brief.id}
                className="border border-border rounded-lg bg-accent/30 px-4"
              >
                <AccordionTrigger className="hover:no-underline">
                  <div className="flex items-center justify-between w-full pr-4">
                    <div className="flex items-center gap-4">
                      <div className="text-left">
                        <h3 className="font-semibold text-foreground">{brief.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {formatDate(brief.date)} - {formatDate(brief.activeUntilEndQuarter ? getQuarterEndDate(campaignId || '') : brief.date)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                          brief.status === 'active'
                            ? 'bg-success/10 text-success'
                            : 'bg-gray-200 text-gray-700'
                        }`}
                      >
                        {brief.status}
                      </span>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="pt-4 space-y-4">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-2">Objective</p>
                      <p className="text-sm text-foreground">{brief.objective}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-2">Description</p>
                      <p className="text-sm text-foreground whitespace-pre-line">{brief.description}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground mb-2">Content Types</p>
                        <div className="flex flex-wrap gap-2">
                          {brief.contentTypes.map((type) => (
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
                        <p className="text-sm font-medium text-muted-foreground mb-2">Hashtags</p>
                        <div className="flex flex-wrap gap-2">
                          {brief.hashtags.map((tag) => (
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
                    <div className="flex items-center justify-between gap-3 pt-4 border-t border-border">
                      <div className="flex items-center gap-3">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleBriefClick(brief.id)}
                          className="bg-transparent text-foreground border-border hover:bg-accent hover:text-accent-foreground font-normal"
                        >
                          View Details
                        </Button>
                        {isAdmin && (
                          <>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleEditBrief(brief)}
                              className="bg-transparent text-foreground border-border hover:bg-accent hover:text-accent-foreground font-normal"
                            >
                              <Edit className="w-4 h-4 mr-2" strokeWidth={1.5} />
                              Edit
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleToggleStatus(brief.id)}
                              className="bg-transparent text-foreground border-border hover:bg-accent hover:text-accent-foreground font-normal"
                            >
                              {brief.status === 'active' ? 'Deactivate' : 'Activate'}
                            </Button>
                          </>
                        )}
                      </div>
                      {isAdmin && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteBrief(brief.id)}
                          className="bg-transparent text-destructive border-destructive hover:bg-destructive/10 hover:text-destructive font-normal"
                        >
                          <Trash2 className="w-4 h-4 mr-2" strokeWidth={1.5} />
                          Delete
                        </Button>
                      )}
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-popover text-popover-foreground max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-popover-foreground">
              {editingBrief ? 'Edit Brief' : 'Tambah Brief Baru'}
            </DialogTitle>
            <DialogDescription className="text-muted-foreground">
              {editingBrief ? 'Update brief details' : 'Create a new brief for this campaign'}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-popover-foreground required-asterisk">Judul Brief</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Enter brief title"
                className="bg-background text-foreground border-border"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="objective" className="text-popover-foreground required-asterisk">Objective</Label>
              <Textarea
                id="objective"
                value={formData.objective}
                onChange={(e) => setFormData({ ...formData, objective: e.target.value })}
                placeholder="Enter campaign objective"
                rows={3}
                className="bg-background text-foreground border-border"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="text-popover-foreground required-asterisk">Deskripsi Brief</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Enter suggested angles and mandatory mentions"
                rows={8}
                className="bg-background text-foreground border-border"
              />
            </div>

            <div className="flex items-center justify-between p-4 rounded-lg bg-accent/50">
              <div className="space-y-0.5">
                <Label htmlFor="active-quarter" className="text-popover-foreground">
                  Aktif sampai akhir {getCampaignName(campaignId || '').split(' ')[0]}
                </Label>
                <p className="text-sm text-muted-foreground">Brief will remain active until end of quarter</p>
              </div>
              <Switch
                id="active-quarter"
                checked={formData.activeUntilEndQuarter}
                onCheckedChange={(checked) => {
                  const quarterEndDate = getQuarterEndDate(campaignId || '');
                  const newEndDate = checked ? quarterEndDate : (formData.date || new Date().toISOString().split('T')[0]);
                  setFormData({ 
                    ...formData, 
                    activeUntilEndQuarter: checked,
                    endDate: newEndDate
                  });
                }}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date" className="text-popover-foreground required-asterisk">Tanggal Mulai Brief</Label>
                <div className="relative">
                  <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => {
                      const newDate = e.target.value;
                      const newEndDate = formData.activeUntilEndQuarter 
                        ? getQuarterEndDate(campaignId || '') 
                        : newDate;
                      setFormData({ 
                        ...formData, 
                        date: newDate,
                        endDate: newEndDate
                      });
                    }}
                    className="bg-background text-foreground border-border [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:right-3 [&::-webkit-calendar-picker-indicator]:cursor-pointer"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="endDate" className="text-popover-foreground required-asterisk">Berlaku Hingga</Label>
                <div className="relative">
                  <Input
                    id="endDate"
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                    disabled={formData.activeUntilEndQuarter}
                    className="bg-background text-foreground border-border disabled:opacity-50 disabled:cursor-not-allowed [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:right-3 [&::-webkit-calendar-picker-indicator]:cursor-pointer"
                  />
                </div>
                {formData.activeUntilEndQuarter && (
                  <p className="text-xs text-muted-foreground">
                    Otomatis terisi hingga akhir {getCampaignName(campaignId || '').split(' ')[0]}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-3">
              <Label className="text-popover-foreground required-asterisk">Jenis Konten</Label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="select-all"
                    checked={formData.contentTypes.length === 3}
                    onCheckedChange={handleSelectAllContentTypes}
                  />
                  <label
                    htmlFor="select-all"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Select All
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="photo"
                    checked={formData.contentTypes.includes('Photo')}
                    onCheckedChange={(checked) => handleContentTypeChange('Photo', checked as boolean)}
                  />
                  <label
                    htmlFor="photo"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Photo
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="reels"
                    checked={formData.contentTypes.includes('Reels')}
                    onCheckedChange={(checked) => handleContentTypeChange('Reels', checked as boolean)}
                  />
                  <label
                    htmlFor="reels"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Reels
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="carousel"
                    checked={formData.contentTypes.includes('Carousel')}
                    onCheckedChange={(checked) => handleContentTypeChange('Carousel', checked as boolean)}
                  />
                  <label
                    htmlFor="carousel"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Carousel
                  </label>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="hashtags" className="text-popover-foreground required-asterisk">Hashtag</Label>
              <Input
                id="hashtags"
                value={formData.hashtags}
                onChange={(e) => setFormData({ ...formData, hashtags: e.target.value })}
                placeholder="#hashtag1, #hashtag2, #hashtag3"
                className="bg-background text-foreground border-border"
              />
              <p className="text-xs text-muted-foreground">Separate multiple hashtags with commas</p>
            </div>
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
              onClick={handleSaveBrief}
              className="bg-primary text-primary-foreground hover:bg-primary/90 font-normal"
            >
              {editingBrief ? 'Update Brief' : 'Save Brief'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
