import { useState } from "react";
import { Clock, ChevronDown, Check } from "lucide-react";
import { useTimeRangeStore, RANGE_LABEL, type TimeRangeKey } from "@/store/time-range-store";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const RANGES: TimeRangeKey[] = ["15m", "1h", "24h", "7d", "30d"];

function isoLocal(d: Date) {
  const off = d.getTimezoneOffset();
  return new Date(d.getTime() - off * 60_000).toISOString().slice(0, 16);
}

export function TimeRangeSelector() {
  const { range, customStart, customEnd, setRange, setCustom } = useTimeRangeStore();
  const [openCustom, setOpenCustom] = useState(false);
  const [start, setStart] = useState(customStart || isoLocal(new Date(Date.now() - 3600_000)));
  const [end, setEnd] = useState(customEnd || isoLocal(new Date()));

  const label = range === "custom" && customStart && customEnd
    ? `${customStart.slice(5, 16)} → ${customEnd.slice(5, 16)}`
    : range;

  const applyCustom = () => {
    if (new Date(start) >= new Date(end)) return toast.error("Start must be before end");
    setCustom(start, end);
    setOpenCustom(false);
    toast.success("Custom range applied");
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center gap-1.5 rounded-md border border-border bg-card px-2.5 py-1.5 text-xs hover:bg-accent">
          <Clock className="h-3 w-3 text-muted-foreground" />
          <span className="font-mono">{label}</span>
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
          <DropdownMenuItem className="text-xs" onSelect={() => setOpenCustom(true)}>
            <span className="flex-1">Custom range…</span>
            {range === "custom" && <Check className="ml-2 h-3 w-3" />}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={openCustom} onOpenChange={setOpenCustom}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Custom time range</DialogTitle>
            <DialogDescription className="text-xs">Pick a start and end timestamp in your local timezone.</DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            <div className="space-y-1">
              <Label className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground">Start</Label>
              <Input type="datetime-local" value={start} onChange={(e) => setStart(e.target.value)} className="h-8 font-mono text-xs" />
            </div>
            <div className="space-y-1">
              <Label className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground">End</Label>
              <Input type="datetime-local" value={end} onChange={(e) => setEnd(e.target.value)} className="h-8 font-mono text-xs" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" size="sm" className="h-7 text-xs" onClick={() => setOpenCustom(false)}>Cancel</Button>
            <Button size="sm" className="h-7 text-xs" onClick={applyCustom}>Apply</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
