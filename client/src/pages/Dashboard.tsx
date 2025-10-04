import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import { monthPlans, type Month, type Sales } from "@shared/schema";
import MonthSelector from "@/components/MonthSelector";
import PlanProgressCard from "@/components/PlanProgressCard";
import DailySalesForm from "@/components/DailySalesForm";
import SalaryDisplay from "@/components/SalaryDisplay";
import SalesHistoryTable from "@/components/SalesHistoryTable";
import { TreePine, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Dashboard() {
  const [selectedMonth, setSelectedMonth] = useState<Month>("november");
  const { toast } = useToast();

  const monthPlan = monthPlans[selectedMonth];

  const { data: sales = [], isLoading } = useQuery<Sales[]>({
    queryKey: ["/api/sales", selectedMonth],
  });

  const createSaleMutation = useMutation({
    mutationFn: async (data: { date: string; treesAmount: number; accessoriesAmount: number }) => {
      const response = await fetch("/api/sales", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          month: selectedMonth,
        }),
      });
      if (!response.ok) throw new Error("Failed to create sale");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/sales", selectedMonth] });
      toast({
        title: "Успешно добавлено",
        description: "Продажи за день успешно добавлены",
      });
    },
  });

  const deleteSaleMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`/api/sales/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete sale");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/sales", selectedMonth] });
      toast({
        title: "Удалено",
        description: "Запись успешно удалена",
      });
    },
  });

  const treesTotal = sales.reduce((sum, sale) => sum + sale.treesAmount, 0);
  const accessoriesTotal = sales.reduce((sum, sale) => sum + sale.accessoriesAmount, 0);

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold">Система расчета бонусов</h1>
              <p className="text-sm text-muted-foreground">Премиум Елки</p>
            </div>
            <MonthSelector value={selectedMonth} onChange={setSelectedMonth} />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <PlanProgressCard
              title="Елки"
              target={monthPlan.treesTarget}
              actual={treesTotal}
              icon={<TreePine className="h-4 w-4 text-muted-foreground" />}
            />
            <PlanProgressCard
              title="Аксессуары"
              target={monthPlan.accessoriesTarget}
              actual={accessoriesTotal}
              icon={<Sparkles className="h-4 w-4 text-muted-foreground" />}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <DailySalesForm
                onSubmit={(data) => createSaleMutation.mutate(data)}
                isLoading={createSaleMutation.isPending}
              />
            </div>
            <div>
              <SalaryDisplay
                treesTotal={treesTotal}
                accessoriesTotal={accessoriesTotal}
                treesTarget={monthPlan.treesTarget}
                accessoriesTarget={monthPlan.accessoriesTarget}
              />
            </div>
          </div>

          <SalesHistoryTable
            sales={sales}
            onDelete={(id) => deleteSaleMutation.mutate(id)}
          />
        </div>
      </main>
    </div>
  );
}
