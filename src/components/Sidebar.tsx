import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '../contexts/AuthContext';
import { 
  LayoutDashboard, 
  Users, 
  TrendingUp, 
  Settings, 
  ChevronLeft, 
  ChevronRight, 
  UserCheck, 
  Trophy, 
  GraduationCap 
} from 'lucide-react';

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

const menuItems = [
  { icon: LayoutDashboard, label: 'Overview', path: '/overview', adminOnly: true, userOnly: false },
  { icon: Users, label: 'My Dashboard', path: '/per-personil', adminOnly: false, userOnly: true },
  { icon: Trophy, label: 'Leaderboard', path: '/leaderboard', adminOnly: false, userOnly: false },
  { icon: TrendingUp, label: 'Campaigns', path: '/campaign-insights', adminOnly: false, userOnly: false },
  { icon: GraduationCap, label: 'Classes', path: '/classes', adminOnly: false, userOnly: false },
  { icon: Settings, label: 'Point Settings', path: '/point-settings', adminOnly: true, userOnly: false },
  { icon: UserCheck, label: 'User Management', path: '/user-management', adminOnly: true, userOnly: false },
];

export function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const location = useLocation();
  const { isAdmin } = useAuth();

  const filteredMenuItems = menuItems.filter(item => {
    if (item.adminOnly && !isAdmin) return false;
    if (item.userOnly && isAdmin) return false;
    return true;
  });

  return (
    <aside
      className={`flex flex-col bg-card border-r border-border transition-all duration-300 ease-in-out ${
        collapsed ? 'w-20' : 'w-64'
      }`}
    >
      <div className="flex h-16 items-center justify-between px-6 border-b border-border">
        {!collapsed && <h1 className="text-xl font-semibold text-foreground font-sans">chECkers</h1>}
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggle}
          className="bg-transparent text-foreground hover:bg-accent hover:text-accent-foreground"
        >
          {collapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
        </Button>
      </div>
      <nav className="flex-1 space-y-2 px-3 py-6">
        {filteredMenuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <Link key={item.path} to={item.path}>
              <div
                className={`flex items-center gap-4 px-3 py-3 rounded-lg transition-all duration-200 ease-in-out cursor-pointer ${
                  isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'text-foreground hover:bg-accent hover:text-accent-foreground'
                }`}
              >
                <Icon className="w-6 h-6 flex-shrink-0" strokeWidth={1.5} />
                {!collapsed && <span className="font-medium text-base font-normal">{item.label}</span>}
              </div>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}