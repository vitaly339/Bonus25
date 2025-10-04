import SalesHistoryTable from "../SalesHistoryTable";
import type { Sales } from "@shared/schema";

const mockSales: Sales[] = [
  {
    id: "1",
    date: "2024-11-15",
    month: "november",
    treesAmount: 180000,
    accessoriesAmount: 15000,
  },
  {
    id: "2",
    date: "2024-11-16",
    month: "november",
    treesAmount: 220000,
    accessoriesAmount: 18000,
  },
  {
    id: "3",
    date: "2024-11-17",
    month: "november",
    treesAmount: 195000,
    accessoriesAmount: 12000,
  },
];

export default function SalesHistoryTableExample() {
  const handleEdit = (sale: Sales) => {
    console.log("Edit sale:", sale);
  };

  const handleDelete = (id: string) => {
    console.log("Delete sale:", id);
  };

  return (
    <div className="p-8">
      <SalesHistoryTable 
        sales={mockSales}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}
