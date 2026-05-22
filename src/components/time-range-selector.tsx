import { Clock, ChevronDown } from "lucide-react";
import { useTimeRangeStore, RANGE_LABEL, type TimeRangeKey } from "@/store/time-range-store";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Check } from "lucide-react";

const RANGES: TimeRangeKey[] = ["15m", "1h", "24h", "7d", "30d"];

export function TimeRangeSelector() {
  const { range, setRange } = useTimeRangeStore();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-1.5 rounded-md border border-border bg-card px-2.5 py-1.5 text-xs hover:bg-accent">
        <Clock className="h-3 w-3 text-muted-foreground" />
        <span className="font-mono">{range}</span>
        <ChevronDown className="h-3 w-3 text-muted-foreground" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-52">
        <DropdownMenuLabel className="text-xs">Time range</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {RANGES.map((r) => (
          <DropdownMenuItem key={r} className="text-xs" onSelect={() => setRange(r)}>
            <span className="flex-1">{RANGE_LABEL[r]}</span>
            {r === range && <Check className="ml-2 h-3 w-3" />}
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-xs text-muted-foreground" disabled>
          Custom range…
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
