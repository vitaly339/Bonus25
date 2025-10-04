import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pencil, Trash2, History } from "lucide-react";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import type { Sales } from "@shared/schema";

interface SalesHistoryTableProps {
  sales: Sales[];
  onEdit?: (sale: Sales) => void;
  onDelete?: (id: string) => void;
}

export default function SalesHistoryTable({ sales, onEdit, onDelete }: SalesHistoryTableProps) {
  const sortedSales = [...sales].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const treesTotal = sales.reduce((sum, sale) => sum + sale.treesAmount, 0);
  const accessoriesTotal = sales.reduce((sum, sale) => sum + sale.accessoriesAmount, 0);
  const grandTotal = treesTotal + accessoriesTotal;

  return (
    <Card data-testid="card-sales-history">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <History className="h-5 w-5" />
          История продаж
        </CardTitle>
      </CardHeader>
      <CardContent>
        {sales.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <p>Нет записей о продажах</p>
            <p className="text-sm mt-1">Добавьте первую запись выше</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Дата</TableHead>
                  <TableHead className="text-right">Елки (₽)</TableHead>
                  <TableHead className="text-right">Аксессуары (₽)</TableHead>
                  <TableHead className="text-right">Итого</TableHead>
                  <TableHead className="w-[100px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedSales.map((sale) => {
                  const dailyTotal = sale.treesAmount + sale.accessoriesAmount;
                  return (
                    <TableRow key={sale.id} data-testid={`row-sale-${sale.id}`}>
                      <TableCell className="font-medium">
                        {format(new Date(sale.date), "dd MMM yyyy", { locale: ru })}
                      </TableCell>
                      <TableCell className="text-right font-mono">
                        {sale.treesAmount.toLocaleString("ru-RU")}₽
                      </TableCell>
                      <TableCell className="text-right font-mono">
                        {sale.accessoriesAmount.toLocaleString("ru-RU")}₽
                      </TableCell>
                      <TableCell className="text-right font-mono font-semibold">
                        {dailyTotal.toLocaleString("ru-RU")}₽
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          {onEdit && (
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => onEdit(sale)}
                              data-testid={`button-edit-${sale.id}`}
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                          )}
                          {onDelete && (
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => onDelete(sale.id)}
                              data-testid={`button-delete-${sale.id}`}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
                <TableRow className="font-semibold border-t-2">
                  <TableCell>Итого</TableCell>
                  <TableCell className="text-right font-mono" data-testid="text-trees-total">
                    {treesTotal.toLocaleString("ru-RU")}₽
                  </TableCell>
                  <TableCell className="text-right font-mono" data-testid="text-accessories-total">
                    {accessoriesTotal.toLocaleString("ru-RU")}₽
                  </TableCell>
                  <TableCell className="text-right font-mono text-primary" data-testid="text-grand-total">
                    {grandTotal.toLocaleString("ru-RU")}₽
                  </TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
