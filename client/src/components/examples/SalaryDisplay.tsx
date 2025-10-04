import SalaryDisplay from "../SalaryDisplay";

export default function SalaryDisplayExample() {
  return (
    <div className="p-8 max-w-md">
      <SalaryDisplay
        treesTotal={2650000}
        accessoriesTotal={265000}
        treesTarget={2500000}
        accessoriesTarget={250000}
      />
    </div>
  );
}
