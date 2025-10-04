import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, TrendingDown } from "lucide-react";

interface PlanProgressCardProps {
  title: string;
  target: number;
  actual: number;
  icon?: React.ReactNode;
}

export default function PlanProgressCard({ title, target, actual, icon }: PlanProgressCardProps) {
  const percentage = target > 0 ? (actual / target) * 100 : 0;
  const isOnTrack = percentage >= 100;
  const isWarning = percentage >= 80 && percentage < 100;
  const isDanger = percentage < 80;

  const bgColor = isOnTrack
    ? "bg-chart-2/10"
    : isWarning
    ? "bg-chart-3/10"
    : "bg-chart-4/10";

  const textColor = isOnTrack
    ? "text-chart-2"
    : isWarning
    ? "text-chart-3"
    : "text-chart-4";

  const progressColor = isOnTrack
    ? "bg-chart-2"
    : isWarning
    ? "bg-chart-3"
    : "bg-chart-4";

  return (
    <Card className={`${bgColor} border-0 transition-colors duration-300`} data-testid={`card-progress-${title.toLowerCase()}`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div>
            <div className={`text-4xl font-mono font-semibold ${textColor}`} data-testid={`text-percentage-${title.toLowerCase()}`}>
              {percentage.toFixed(1)}%
            </div>
            <div className="flex items-center gap-2 mt-1">
              {isOnTrack ? (
                <TrendingUp className="h-4 w-4 text-chart-2" />
              ) : (
                <TrendingDown className="h-4 w-4 text-chart-4" />
              )}
              <p className="text-xs text-muted-foreground">
                {isOnTrack ? "План выполнен" : isWarning ? "Близко к плану" : "Ниже плана"}
              </p>
            </div>
          </div>
          
          <div className="space-y-1">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Факт:</span>
              <span className="font-mono font-semibold" data-testid={`text-actual-${title.toLowerCase()}`}>
                {actual.toLocaleString("ru-RU")}₽
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">План:</span>
              <span className="font-mono" data-testid={`text-target-${title.toLowerCase()}`}>
                {target.toLocaleString("ru-RU")}₽
              </span>
            </div>
          </div>
          
          <Progress 
            value={Math.min(percentage, 100)} 
            className="h-2"
            indicatorClassName={progressColor}
          />
        </div>
      </CardContent>
    </Card>
  );
}
