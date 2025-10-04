import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { Month } from "@shared/schema";

interface MonthSelectorProps {
  value: Month;
  onChange: (month: Month) => void;
}

const monthLabels: Record<Month, string> = {
  october: "Октябрь",
  november: "Ноябрь",
  december: "Декабрь",
};

export default function MonthSelector({ value, onChange }: MonthSelectorProps) {
  return (
    <Select value={value} onValueChange={(val) => onChange(val as Month)}>
      <SelectTrigger className="w-[200px]" data-testid="select-month">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="october" data-testid="option-october">Октябрь</SelectItem>
        <SelectItem value="november" data-testid="option-november">Ноябрь</SelectItem>
        <SelectItem value="december" data-testid="option-december">Декабрь</SelectItem>
      </SelectContent>
    </Select>
  );
}
