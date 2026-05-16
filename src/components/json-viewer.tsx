import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { toast } from "sonner";

export function JSONViewer({ data }: { data: unknown }) {
  const [copied, setCopied] = useState(false);
  const json = JSON.stringify(data, null, 2);

  const copy = async () => {
    await navigator.clipboard.writeText(json);
    setCopied(true);
    toast.success("Copied to clipboard");
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="relative overflow-hidden rounded-md border border-border bg-background">
      <button
        onClick={copy}
        className="absolute right-2 top-2 z-10 flex h-6 items-center gap-1 rounded border border-border bg-card px-1.5 text-[10px] font-mono uppercase text-muted-foreground hover:text-foreground"
      >
        {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
        {copied ? "copied" : "copy"}
      </button>
      <pre className="thin-scrollbar max-h-72 overflow-auto p-3 font-mono text-[11px] leading-relaxed text-foreground/90">
        {json}
      </pre>
    </div>
  );
}
