import DailySalesForm from "../DailySalesForm";

export default function DailySalesFormExample() {
  const handleSubmit = (data: { date: string; treesAmount: number; accessoriesAmount: number }) => {
    console.log("Sales submitted:", data);
  };

  return (
    <div className="p-8 max-w-2xl">
      <DailySalesForm onSubmit={handleSubmit} />
    </div>
  );
}
