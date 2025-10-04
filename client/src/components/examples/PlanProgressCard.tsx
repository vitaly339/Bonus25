import PlanProgressCard from "../PlanProgressCard";
import { TreePine, Sparkles } from "lucide-react";

export default function PlanProgressCardExample() {
  return (
    <div className="p-8 space-y-4 max-w-md">
      <PlanProgressCard
        title="Елки"
        target={2500000}
        actual={2380000}
        icon={<TreePine className="h-4 w-4 text-muted-foreground" />}
      />
      <PlanProgressCard
        title="Аксессуары"
        target={250000}
        actual={265000}
        icon={<Sparkles className="h-4 w-4 text-muted-foreground" />}
      />
    </div>
  );
}
