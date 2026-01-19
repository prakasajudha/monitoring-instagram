import { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import User from 'lucide-react/dist/esm/icons/user';
import Shield from 'lucide-react/dist/esm/icons/shield';
import Database from 'lucide-react/dist/esm/icons/database';

export function Settings() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Settings</h1>
        <p className="text-muted-foreground">Manage your account and application preferences</p>
      </div>

      <Card className="border border-border bg-card">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <User className="w-5 h-5 text-primary" strokeWidth={1.5} />
            </div>
            <div>
              <CardTitle className="text-foreground">Profile Settings</CardTitle>
              <CardDescription className="text-muted-foreground">Update your personal information</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="first-name" className="text-foreground">First Name</Label>
              <Input id="first-name" defaultValue="John" className="bg-background text-foreground border-border" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="last-name" className="text-foreground">Last Name</Label>
              <Input id="last-name" defaultValue="Doe" className="bg-background text-foreground border-border" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email" className="text-foreground">Email</Label>
            <Input id="email" type="email" defaultValue="john.doe@troopers.com" className="bg-background text-foreground border-border" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="username" className="text-foreground">Instagram Username</Label>
            <Input id="username" defaultValue="@john_doe" className="bg-background text-foreground border-border" />
          </div>
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90 font-normal">
            Save Changes
          </Button>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border border-border bg-card">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-success/10">
                <Shield className="w-5 h-5 text-success" strokeWidth={1.5} />
              </div>
              <div>
                <CardTitle className="text-foreground">Security</CardTitle>
                <CardDescription className="text-muted-foreground">Manage your security settings</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="current-password" className="text-foreground">Current Password</Label>
              <Input id="current-password" type="password" className="bg-background text-foreground border-border" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-password" className="text-foreground">New Password</Label>
              <Input id="new-password" type="password" className="bg-background text-foreground border-border" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password" className="text-foreground">Confirm New Password</Label>
              <Input id="confirm-password" type="password" className="bg-background text-foreground border-border" />
            </div>
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90 font-normal">
              Update Password
            </Button>
          </CardContent>
        </Card>

        <Card className="border border-border bg-card">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-warning/10">
                <Database className="w-5 h-5 text-warning" strokeWidth={1.5} />
              </div>
              <div>
                <CardTitle className="text-foreground">Data Management</CardTitle>
                <CardDescription className="text-muted-foreground">Export or delete your data</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 rounded-lg bg-accent/50 space-y-2">
              <h4 className="font-medium text-foreground">Export Your Data</h4>
              <p className="text-sm text-muted-foreground">Download a copy of all your data including posts, engagement metrics, and activity history.</p>
              <Button variant="outline" className="bg-transparent text-foreground border-border hover:bg-accent hover:text-accent-foreground font-normal mt-2">
                Request Export
              </Button>
            </div>
            <Separator className="bg-border" />
            <div className="p-4 rounded-lg bg-destructive/10 space-y-2">
              <h4 className="font-medium text-destructive">Delete Account</h4>
              <p className="text-sm text-muted-foreground">Permanently delete your account and all associated data. This action cannot be undone.</p>
              <Button variant="outline" className="bg-transparent text-destructive border-destructive hover:bg-destructive/10 hover:text-destructive font-normal mt-2">
                Delete Account
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
