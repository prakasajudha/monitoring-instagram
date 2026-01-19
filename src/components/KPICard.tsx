import { Card, CardContent } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';

interface KPICardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  delay?: number;
}

export function KPICard({ title, value, icon: Icon, trend, delay = 0 }: KPICardProps) {
  return (
    <Card
      className="border border-border bg-card hover:shadow-sm transition-all duration-200 ease-in-out"
      style={{
        animation: `fadeInUp 0.6s ease-out ${delay}ms both`,
      }}
    >
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-muted-foreground mb-2">{title}</p>
            <p className="text-3xl font-semibold text-foreground mb-2">{value}</p>
            {trend && (
              <p className={`text-sm font-medium ${trend.isPositive ? 'text-success' : 'text-destructive'}`}>
                {trend.isPositive ? '↑' : '↓'} {trend.value}
              </p>
            )}
          </div>
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
            <Icon className="w-6 h-6 text-primary" strokeWidth={1.5} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
