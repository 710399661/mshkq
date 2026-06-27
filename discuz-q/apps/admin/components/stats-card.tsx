import { LucideIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@discuzq/ui';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  change?: string;
  changeType?: 'increase' | 'decrease';
  iconColor?: string;
  iconBgColor?: string;
}

export function StatsCard({
  title,
  value,
  icon: Icon,
  change,
  changeType = 'increase',
  iconColor = 'text-primary',
  iconBgColor = 'bg-primary/10',
}: StatsCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${iconBgColor}`}>
          <Icon className={`h-5 w-5 ${iconColor}`} />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {change && (
          <p
            className={`text-xs ${
              changeType === 'increase'
                ? 'text-green-600'
                : 'text-red-600'
            } mt-1`}
          >
            {changeType === 'increase' ? '↑' : '↓'} {change} 较昨日
          </p>
        )}
      </CardContent>
    </Card>
  );
}
