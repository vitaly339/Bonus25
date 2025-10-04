import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Wallet, TrendingUp } from "lucide-react";

interface SalaryDisplayProps {
  treesTotal: number;
  accessoriesTotal: number;
  treesTarget: number;
  accessoriesTarget: number;
}

export default function SalaryDisplay({ 
  treesTotal, 
  accessoriesTotal,
  treesTarget,
  accessoriesTarget 
}: SalaryDisplayProps) {
  const treesCommission = treesTotal * 0.03;
  const accessoriesCommission = accessoriesTotal * 0.05;
  
  const treesPercentage = treesTarget > 0 ? (treesTotal / treesTarget) * 100 : 0;
  const accessoriesPercentage = accessoriesTarget > 0 ? (accessoriesTotal / accessoriesTarget) * 100 : 0;
  
  const treesBonus = treesPercentage >= 100 ? treesTotal * 0.01 : 0;
  const accessoriesBonus = accessoriesPercentage >= 100 ? accessoriesTotal * 0.01 : 0;
  
  const totalBonus = treesBonus + accessoriesBonus;
  const totalSalary = treesCommission + accessoriesCommission + totalBonus;

  const hasPlanBonus = totalBonus > 0;

  return (
    <Card data-testid="card-salary-display">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Wallet className="h-5 w-5" />
          Расчет зарплаты
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Елки (3%)</span>
              <span className="font-mono font-medium" data-testid="text-trees-commission">
                {treesCommission.toLocaleString("ru-RU", { maximumFractionDigits: 0 })}₽
              </span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Аксессуары (5%)</span>
              <span className="font-mono font-medium" data-testid="text-accessories-commission">
                {accessoriesCommission.toLocaleString("ru-RU", { maximumFractionDigits: 0 })}₽
              </span>
            </div>

            {hasPlanBonus && (
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Бонус за план (1%)</span>
                  <Badge variant="default" className="bg-chart-2 hover:bg-chart-2">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    Выполнен
                  </Badge>
                </div>
                <span className="font-mono font-medium text-chart-2" data-testid="text-plan-bonus">
                  +{totalBonus.toLocaleString("ru-RU", { maximumFractionDigits: 0 })}₽
                </span>
              </div>
            )}
          </div>

          <Separator />

          <div className="flex justify-between items-center pt-2">
            <span className="text-lg font-semibold">Итого зарплата</span>
            <span className="text-3xl font-mono font-bold text-primary" data-testid="text-total-salary">
              {totalSalary.toLocaleString("ru-RU", { maximumFractionDigits: 0 })}₽
            </span>
          </div>

          {!hasPlanBonus && (
            <p className="text-xs text-muted-foreground">
              * Бонус 1% начисляется при выполнении плана на 100%
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
