import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar, Plus } from "lucide-react";
import { format } from "date-fns";

interface DailySalesFormProps {
  onSubmit: (data: { date: string; treesAmount: number; accessoriesAmount: number }) => void;
  isLoading?: boolean;
}

export default function DailySalesForm({ onSubmit, isLoading }: DailySalesFormProps) {
  const [date, setDate] = useState(format(new Date(), "yyyy-MM-dd"));
  const [treesAmount, setTreesAmount] = useState("");
  const [accessoriesAmount, setAccessoriesAmount] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    onSubmit({
      date,
      treesAmount: parseInt(treesAmount) || 0,
      accessoriesAmount: parseInt(accessoriesAmount) || 0,
    });
    
    setTreesAmount("");
    setAccessoriesAmount("");
  };

  return (
    <Card data-testid="card-daily-sales-form">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Добавить продажи за день
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="date">Дата</Label>
            <Input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              data-testid="input-date"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="trees">Елки (₽)</Label>
              <Input
                id="trees"
                type="number"
                placeholder="0"
                value={treesAmount}
                onChange={(e) => setTreesAmount(e.target.value)}
                min="0"
                required
                data-testid="input-trees"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="accessories">Аксессуары (₽)</Label>
              <Input
                id="accessories"
                type="number"
                placeholder="0"
                value={accessoriesAmount}
                onChange={(e) => setAccessoriesAmount(e.target.value)}
                min="0"
                required
                data-testid="input-accessories"
              />
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full" 
            disabled={isLoading}
            data-testid="button-add-sales"
          >
            <Plus className="h-4 w-4 mr-2" />
            Добавить продажи
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
