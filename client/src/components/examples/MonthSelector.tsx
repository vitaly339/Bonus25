import { useState } from "react";
import MonthSelector from "../MonthSelector";
import type { Month } from "@shared/schema";

export default function MonthSelectorExample() {
  const [month, setMonth] = useState<Month>("november");
  
  return (
    <div className="p-8">
      <MonthSelector value={month} onChange={setMonth} />
      <p className="mt-4 text-sm text-muted-foreground">Selected: {month}</p>
    </div>
  );
}
