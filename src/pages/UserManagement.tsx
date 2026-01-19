import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import Search from 'lucide-react/dist/esm/icons/search';
import Check from 'lucide-react/dist/esm/icons/check';
import X from 'lucide-react/dist/esm/icons/x';
import Clock from 'lucide-react/dist/esm/icons/clock';

interface PendingUser {
  id: string;
  fullName: string;
  username: string;
  email: string;
  phone: string;
  instagramUsername: string;
  status: 'pending' | 'approved' | 'rejected';
  registeredAt: string;
}

const mockPendingUsers: PendingUser[] = [
  {
    id: '1',
    fullName: 'Rina Wijayanti',
    username: 'rina_w',
    email: 'rina.w@pertamina.com',
    phone: '+62 812 3456 7890',
    instagramUsername: '@rina_wijayanti',
    status: 'pending',
    registeredAt: '2024-02-05',
  },
  {
    id: '2',
    fullName: 'Agus Prasetyo',
    username: 'agus_p',
    email: 'agus.p@pertamina.com',
    phone: '+62 813 4567 8901',
    instagramUsername: '@agus_prasetyo',
    status: 'pending',
    registeredAt: '2024-02-04',
  },
  {
    id: '3',
    fullName: 'Dian Permata',
    username: 'dian_p',
    email: 'dian.p@pertamina.com',
    phone: '+62 814 5678 9012',
    instagramUsername: '@dian_permata',
    status: 'pending',
    registeredAt: '2024-02-03',
  },
];

export function UserManagement() {
  const [users, setUsers] = useState<PendingUser[]>(mockPendingUsers);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState<PendingUser | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const { toast } = useToast();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesTab =
      activeTab === 'all' ||
      (activeTab === 'pending' && user.status === 'pending') ||
      (activeTab === 'approved' && user.status === 'approved') ||
      (activeTab === 'rejected' && user.status === 'rejected');

    return matchesSearch && matchesTab;
  });

  const handleViewDetails = (user: PendingUser) => {
    setSelectedUser(user);
    setIsDialogOpen(true);
  };

  const handleApprove = (userId: string) => {
    setUsers(users.map(u => u.id === userId ? { ...u, status: 'approved' } : u));
    toast({
      title: 'User approved',
      description: 'The user has been approved and can now access the system.',
    });
    setIsDialogOpen(false);
  };

  const handleReject = (userId: string) => {
    setUsers(users.map(u => u.id === userId ? { ...u, status: 'rejected' } : u));
    toast({
      title: 'User rejected',
      description: 'The user registration has been rejected.',
      variant: 'destructive',
    });
    setIsDialogOpen(false);
  };

  const pendingCount = users.filter(u => u.status === 'pending').length;
  const approvedCount = users.filter(u => u.status === 'approved').length;
  const rejectedCount = users.filter(u => u.status === 'rejected').length;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">User Management</h1>
        <p className="text-muted-foreground">Manage Calon Perwira chECkers registrations</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border border-border bg-card">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-muted-foreground mb-2">Pending Approval</p>
                <p className="text-3xl font-semibold text-foreground">{pendingCount}</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-warning/10">
                <Clock className="w-6 h-6 text-warning" strokeWidth={1.5} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-border bg-card">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-muted-foreground mb-2">Approved Users</p>
                <p className="text-3xl font-semibold text-foreground">{approvedCount}</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-success/10">
                <Check className="w-6 h-6 text-success" strokeWidth={1.5} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-border bg-card">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-muted-foreground mb-2">Rejected</p>
                <p className="text-3xl font-semibold text-foreground">{rejectedCount}</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-destructive/10">
                <X className="w-6 h-6 text-destructive" strokeWidth={1.5} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border border-border bg-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-foreground">Registration Requests</CardTitle>
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
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-6">
              <TabsTrigger value="all">All Users</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="approved">Approved</TabsTrigger>
              <TabsTrigger value="rejected">Rejected</TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="mt-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4 text-sm font-medium text-foreground">User</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-foreground">Email</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-foreground">Instagram</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-foreground">Status</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-foreground">Registered</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-foreground">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map((user) => (
                      <tr key={user.id} className="border-b border-border hover:bg-accent transition-colors duration-200">
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <Avatar className="w-10 h-10">
                              <AvatarImage src="https://c.animaapp.com/mjxnk1q0BwGZL7/img/ai_2.png" alt={user.fullName} />
                              <AvatarFallback className="bg-secondary text-secondary-foreground">
                                {user.fullName.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium text-foreground">{user.fullName}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-sm text-foreground">{user.email}</td>
                        <td className="py-3 px-4 text-sm text-primary font-medium">{user.instagramUsername}</td>
                        <td className="py-3 px-4 text-sm">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              user.status === 'pending'
                                ? 'bg-warning/10 text-warning'
                                : user.status === 'approved'
                                ? 'bg-success/10 text-success'
                                : 'bg-destructive/10 text-destructive'
                            }`}
                          >
                            {user.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-sm text-muted-foreground">{user.registeredAt}</td>
                        <td className="py-3 px-4 text-sm">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleViewDetails(user)}
                            className="bg-transparent text-foreground border-border hover:bg-accent hover:text-accent-foreground font-normal"
                          >
                            View Details
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-popover text-popover-foreground max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-popover-foreground">User Registration Details</DialogTitle>
            <DialogDescription className="text-muted-foreground">
              Review the user information before approving or rejecting
            </DialogDescription>
          </DialogHeader>
          {selectedUser && (
            <div className="space-y-6 py-4">
              <div className="flex items-center gap-4">
                <Avatar className="w-16 h-16">
                  <AvatarImage src="https://c.animaapp.com/mjxnk1q0BwGZL7/img/ai_2.png" alt={selectedUser.fullName} />
                  <AvatarFallback className="bg-secondary text-secondary-foreground text-xl">
                    {selectedUser.fullName.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">{selectedUser.fullName}</h3>
                  <p className="text-sm text-primary font-medium">{selectedUser.instagramUsername}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Email</p>
                  <p className="text-sm text-foreground">{selectedUser.email}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Phone</p>
                  <p className="text-sm text-foreground">{selectedUser.phone}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Instagram</p>
                  <p className="text-sm text-primary font-medium">{selectedUser.instagramUsername}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Registered</p>
                  <p className="text-sm text-foreground">{selectedUser.registeredAt}</p>
                </div>
              </div>

              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Current Status</p>
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                    selectedUser.status === 'pending'
                      ? 'bg-warning/10 text-warning'
                      : selectedUser.status === 'approved'
                      ? 'bg-success/10 text-success'
                      : 'bg-destructive/10 text-destructive'
                  }`}
                >
                  {selectedUser.status}
                </span>
              </div>
            </div>
          )}
          <DialogFooter>
            {selectedUser?.status === 'pending' && (
              <>
                <Button
                  variant="outline"
                  onClick={() => handleReject(selectedUser.id)}
                  className="bg-transparent text-destructive border-destructive hover:bg-destructive/10 hover:text-destructive font-normal"
                >
                  <X className="w-4 h-4 mr-2" strokeWidth={1.5} />
                  Reject
                </Button>
                <Button
                  onClick={() => handleApprove(selectedUser.id)}
                  className="bg-success text-success-foreground hover:bg-success/90 font-normal"
                >
                  <Check className="w-4 h-4 mr-2" strokeWidth={1.5} />
                  Approve
                </Button>
              </>
            )}
            {selectedUser?.status !== 'pending' && (
              <Button
                variant="outline"
                onClick={() => setIsDialogOpen(false)}
                className="bg-transparent text-foreground border-border hover:bg-accent hover:text-accent-foreground font-normal"
              >
                Close
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
