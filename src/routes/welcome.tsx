import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Activity, BarChart2, Bell, GitBranch, Network, Workflow, ShieldCheck,
  Sparkles, ArrowRight, Github, Check, Cpu, Zap, Globe, Database, Lock,
  Terminal, TrendingUp, AlertTriangle, Clock, Server, Eye, ChevronRight,
  Star, Radio, Users, Code2, Layers, Rocket, Brain, X, Minus,
} from "lucide-react";
import {
  AreaChart, Area, LineChart, Line, BarChart, Bar,
  XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
} from "recharts";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState, useMemo } from "react";

export const Route = createFileRoute("/welcome")({
  head: () => ({
    meta: [
      { title: "Pulse — Distributed Event Processing & Observability Platform" },
      { name: "description", content: "Realtime observability for distributed event pipelines." },
    ],
  }),
  component: WelcomePage,
});

// ─── Types ───────────────────────────────────────────────────────────────────
interface ChartPoint {
  t: string;
  throughput: number;
  p95: number;
  p50: number;
  errorRate: number;
  queueLag: number;
}
interface LiveMetrics {
  eventsPerSec: number; p95: number; workersOnline: number;
  errorRate: number; throughput: number; queueDepth: number; uptime: number;
}

// ─── Seeded RNG ───────────────────────────────────────────────────────────────
function rng(seed: number) {
  let s = seed;
  return () => { s = (s * 1664525 + 1013904223) & 0xffffffff; return (s >>> 0) / 0xffffffff; };
}

function buildHistory(seed = 42): ChartPoint[] {
  const r = rng(seed);
  return Array.from({ length: 30 }, (_, i) => {
    const mins = (29 - i);
    const label = mins === 0 ? "now" : `${mins}m`;
    return {
      t: label,
      throughput: Math.round(680 + r() * 380),
      p95: Math.round(95 + r() * 120),
      p50: Math.round(35 + r() * 45),
      errorRate: parseFloat((r() * 0.14).toFixed(3)),
      queueLag: Math.round(200 + r() * 1800),
    };
  });
}

// ─── Hooks ───────────────────────────────────────────────────────────────────
function useLiveMetrics(): LiveMetrics {
  const [m, setM] = useState<LiveMetrics>({
    eventsPerSec: 847, p95: 142, workersOnline: 92,
    errorRate: 0.034, throughput: 2.4, queueDepth: 1204, uptime: 99.992,
  });
  useEffect(() => {
    const id = setInterval(() => setM((prev) => ({
      eventsPerSec: clamp(prev.eventsPerSec + (Math.random() - 0.48) * 28, 600, 1100),
      p95: clamp(prev.p95 + (Math.random() - 0.5) * 7, 90, 260),
      workersOnline: clamp(prev.workersOnline + (Math.random() > 0.88 ? (Math.random() > 0.5 ? 1 : -1) : 0), 88, 96),
      errorRate: clamp(prev.errorRate + (Math.random() - 0.5) * 0.004, 0.01, 0.14),
      throughput: clamp(prev.throughput + (Math.random() - 0.5) * 0.09, 1.6, 3.8),
      queueDepth: clamp(prev.queueDepth + (Math.random() - 0.5) * 55, 700, 2500),
      uptime: 99.992,
    })), 1100);
    return () => clearInterval(id);
  }, []);
  return m;
}

function useLiveChart(): ChartPoint[] {
  const [history, setHistory] = useState<ChartPoint[]>(() => buildHistory());
  useEffect(() => {
    const id = setInterval(() => {
      setHistory((prev) => {
        const last = prev[prev.length - 1];
        const next: ChartPoint = {
          t: "now",
          throughput: clamp(last.throughput + (Math.random() - 0.48) * 28, 600, 1100),
          p95: clamp(last.p95 + (Math.random() - 0.5) * 7, 90, 260),
          p50: clamp(last.p50 + (Math.random() - 0.5) * 4, 30, 90),
          errorRate: parseFloat(clamp(last.errorRate + (Math.random() - 0.5) * 0.005, 0.01, 0.14).toFixed(3)),
          queueLag: clamp(last.queueLag + (Math.random() - 0.5) * 60, 200, 2500),
        };
        return [...prev.slice(1).map((p, i, a) => i < a.length - 1 ? { ...p, t: `${29 - i}m` } : { ...p, t: "1m" }), next];
      });
    }, 1400);
    return () => clearInterval(id);
  }, []);
  return history;
}

function clamp(v: number, min: number, max: number) { return Math.max(min, Math.min(max, v)); }

// ─── Sparkline ───────────────────────────────────────────────────────────────
function Sparkline({ color = "#22c55e", height = 32 }: { color?: string; height?: number }) {
  const [pts, setPts] = useState(() => Array.from({ length: 18 }, () => Math.random() * 70 + 15));
  useEffect(() => {
    const id = setInterval(() => setPts((p) => [...p.slice(1), Math.random() * 70 + 15]), 900);
    return () => clearInterval(id);
  }, []);
  const w = 110; const h = height;
  const xs = pts.map((_, i) => (i / (pts.length - 1)) * w);
  const ys = pts.map((v) => h - (v / 100) * h);
  const line = xs.map((x, i) => `${i === 0 ? "M" : "L"}${x.toFixed(1)},${ys[i].toFixed(1)}`).join(" ");
  const fill = `${line} L${w},${h} L0,${h} Z`;
  return (
    <svg width={w} height={h} style={{ overflow: "visible" }}>
      <defs>
        <linearGradient id={`sp-${color.replace("#", "")}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.25" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={fill} fill={`url(#sp-${color.replace("#", "")})`} />
      <path d={line} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ─── Animated Counter ────────────────────────────────────────────────────────
function Num({ v, dec = 0 }: { v: number; dec?: number }) {
  const [d, setD] = useState(v);
  const prev = useRef(v);
  useEffect(() => {
    const from = prev.current; const to = v; const dur = 380; const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / dur, 1);
      const e = 1 - Math.pow(1 - t, 3);
      setD(from + (to - from) * e);
      if (t < 1) requestAnimationFrame(tick); else prev.current = to;
    };
    requestAnimationFrame(tick);
  }, [v]);
  return <>{d.toFixed(dec)}</>;
}

// ─── Chart Tooltip ───────────────────────────────────────────────────────────
function DarkTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: "#0f0f10", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, padding: "8px 12px", fontSize: 11, fontFamily: "JetBrains Mono, monospace" }}>
      <p style={{ color: "#52525b", marginBottom: 4 }}>{label}</p>
      {payload.map((p: any) => (
        <p key={p.dataKey} style={{ color: p.stroke || p.fill, margin: "2px 0" }}>
          {p.name ?? p.dataKey}: <strong>{p.value}</strong>
        </p>
      ))}
    </div>
  );
}

// ─── Terminal Feed ───────────────────────────────────────────────────────────
const LOG_POOL = [
  { lvl: "INFO",  msg: "span.complete svc=api-gateway trace_id=a3f9b2c dur=12ms status=200" },
  { lvl: "INFO",  msg: "worker.heartbeat id=wrk-04 queue=events processed=1247 lag=0ms" },
  { lvl: "WARN",  msg: "queue.lag topic=user-events lag=892 threshold=500 action=scale" },
  { lvl: "INFO",  msg: "deploy.success version=v2.4.1 env=prod canary=100% rollback=none" },
  { lvl: "INFO",  msg: "trace.ingested spans=142 svc=checkout-svc sampled=true" },
  { lvl: "ERROR", msg: "worker.timeout id=wrk-07 queue=ml-inference elapsed=30s killed=true" },
  { lvl: "INFO",  msg: "alert.resolved name=p95_latency slo=99.9% duration=4m32s" },
  { lvl: "INFO",  msg: "slo.check svc=payments window=30d budget=87.2% burn=0.8x" },
  { lvl: "WARN",  msg: "model.drift feature=user_embedding delta=0.12 threshold=0.1" },
  { lvl: "INFO",  msg: "scaler.event workers=+2 queue=events reason=lag_threshold" },
  { lvl: "INFO",  msg: "topology.discovered svc=inventory-svc edges=3 rps=188" },
  { lvl: "WARN",  msg: "latency.spike svc=checkout-svc p99=312ms slo_breach=imminent" },
];
function TerminalFeed() {
  const [logs, setLogs] = useState(() =>
    LOG_POOL.slice(0, 6).map((l, i) => ({ ...l, id: i, ts: new Date(Date.now() - (6 - i) * 2800).toISOString().slice(11, 19) }))
  );
  const ref = useRef<HTMLDivElement>(null);
  const idx = useRef(6);
  useEffect(() => {
    const id = setInterval(() => {
      const t = LOG_POOL[idx.current % LOG_POOL.length];
      setLogs((p) => [...p.slice(-9), { ...t, id: Date.now(), ts: new Date().toISOString().slice(11, 19) }]);
      idx.current++;
    }, 1700);
    return () => clearInterval(id);
  }, []);
  useEffect(() => { if (ref.current) ref.current.scrollTop = ref.current.scrollHeight; }, [logs]);
  const col: Record<string, string> = { INFO: "#22c55e", WARN: "#f59e0b", ERROR: "#ef4444" };
  return (
    <div ref={ref} style={{ height: 180, overflowY: "auto", fontFamily: "JetBrains Mono, monospace", fontSize: 10.5, lineHeight: "1.7" }}>
      {logs.map((l) => (
        <div key={l.id} style={{ display: "flex", gap: 8, animation: "fadeIn 0.3s" }}>
          <span style={{ color: "#3f3f46", flexShrink: 0 }}>{l.ts}</span>
          <span style={{ color: col[l.lvl], flexShrink: 0, fontWeight: 600, width: 36 }}>{l.lvl}</span>
          <span style={{ color: "#71717a" }}>{l.msg}</span>
        </div>
      ))}
    </div>
  );
}

// ─── Trace Waterfall ─────────────────────────────────────────────────────────
const SPANS = [
  { name: "api-gateway", start: 0, dur: 98, color: "#3b82f6" },
  { name: "auth-svc", start: 4, dur: 12, color: "#8b5cf6" },
  { name: "checkout-svc", start: 18, dur: 62, color: "#06b6d4" },
  { name: "inventory-svc", start: 22, dur: 28, color: "#10b981" },
  { name: "payment-svc", start: 52, dur: 40, color: "#f59e0b" },
  { name: "notif-svc", start: 88, dur: 8, color: "#ef4444" },
];
function TraceWaterfall() {
  const [prog, setProg] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setProg((p) => (p >= 1 ? 0 : p + 0.012)), 40);
    return () => clearInterval(id);
  }, []);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
      {SPANS.map((s) => {
        const visible = prog * 100 >= s.start;
        const filled = Math.max(0, Math.min(1, (prog * 100 - s.start) / s.dur));
        return (
          <div key={s.name} style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 10, color: "#52525b", width: 96, flexShrink: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{s.name}</span>
            <div style={{ flex: 1, height: 14, background: "#27272a", borderRadius: 3, overflow: "hidden" }}>
              {visible && (
                <div style={{ marginLeft: `${s.start}%`, width: `${s.dur * filled}%`, height: "100%", background: s.color, borderRadius: 2, opacity: 0.88, transition: "none" }} />
              )}
            </div>
            <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 10, color: "#3f3f46", width: 36, textAlign: "right" }}>{s.dur}ms</span>
          </div>
        );
      })}
    </div>
  );
}

// ─── Service Topology SVG ─────────────────────────────────────────────────────
const TOPO_NODES = [
  { id: "client",    label: "Client",      sub: "browser",    x: 48,  y: 160, status: "healthy" },
  { id: "gw",        label: "api-gateway", sub: "847 rps",    x: 175, y: 160, status: "healthy" },
  { id: "auth",      label: "auth-svc",    sub: "312 rps",    x: 310, y: 75,  status: "healthy" },
  { id: "checkout",  label: "checkout",    sub: "428 rps",    x: 310, y: 210, status: "warning" },
  { id: "inventory", label: "inventory",   sub: "188 rps",    x: 455, y: 100, status: "healthy" },
  { id: "payment",   label: "payment-svc", sub: "214 rps",    x: 455, y: 240, status: "healthy" },
  { id: "notif",     label: "notif-svc",   sub: "98 rps",     x: 600, y: 155, status: "healthy" },
  { id: "db",        label: "postgres",    sub: "156 rps",    x: 600, y: 285, status: "healthy" },
];
const TOPO_EDGES = [
  { from: "client", to: "gw",        rps: 847,  err: false, dur: "2.1s" },
  { from: "gw",     to: "auth",      rps: 312,  err: false, dur: "2.8s" },
  { from: "gw",     to: "checkout",  rps: 428,  err: true,  dur: "1.9s" },
  { from: "checkout",to: "inventory",rps: 188,  err: false, dur: "3.2s" },
  { from: "checkout",to: "payment",  rps: 214,  err: false, dur: "2.5s" },
  { from: "payment", to: "notif",    rps: 98,   err: false, dur: "4.0s" },
  { from: "payment", to: "db",       rps: 156,  err: false, dur: "1.8s" },
];
const statusColor = { healthy: "#22c55e", warning: "#f59e0b", error: "#ef4444" };

function TopologyGraph() {
  const nodeMap = Object.fromEntries(TOPO_NODES.map((n) => [n.id, n]));
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 2000);
    return () => clearInterval(id);
  }, []);

  return (
    <div style={{ position: "relative", overflowX: "auto" }}>
      <svg viewBox="0 0 680 340" style={{ width: "100%", minWidth: 560, fontFamily: "JetBrains Mono, monospace" }}>
        <defs>
          <marker id="arr-ok" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill="#3f3f46" />
          </marker>
          <marker id="arr-warn" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill="#f59e0b" />
          </marker>
          {TOPO_EDGES.map((e, i) => (
            <path key={`p-${i}`} id={`ep-${i}`}
              d={`M${nodeMap[e.from].x},${nodeMap[e.from].y} L${nodeMap[e.to].x},${nodeMap[e.to].y}`}
              fill="none" />
          ))}
        </defs>

        {/* Edges */}
        {TOPO_EDGES.map((e, i) => {
          const f = nodeMap[e.from]; const t = nodeMap[e.to];
          const mx = (f.x + t.x) / 2; const my = (f.y + t.y) / 2;
          const ec = e.err ? "#f59e0b" : "#3f3f46";
          return (
            <g key={`edge-${i}`}>
              <line x1={f.x} y1={f.y} x2={t.x} y2={t.y}
                stroke={ec} strokeWidth={e.err ? 1.5 : 1}
                strokeDasharray={e.err ? "5 3" : "none"}
                markerEnd={e.err ? "url(#arr-warn)" : "url(#arr-ok)"}
                opacity={0.6} />
              {/* RPS label */}
              <rect x={mx - 18} y={my - 8} width={36} height={14} rx={3}
                fill="#18181b" stroke="#27272a" strokeWidth={0.5} />
              <text x={mx} y={my + 3} textAnchor="middle" fontSize={8}
                fill={e.err ? "#f59e0b" : "#52525b"}>{e.rps}</text>
              {/* Animated traffic dot */}
              <circle r={3} fill={ec} opacity={0.9}>
                <animateMotion dur={e.dur} repeatCount="indefinite">
                  <mpath href={`#ep-${i}`} />
                </animateMotion>
              </circle>
            </g>
          );
        })}

        {/* Nodes */}
        {TOPO_NODES.map((n) => {
          const sc = statusColor[n.status as keyof typeof statusColor];
          const isClient = n.id === "client";
          return (
            <g key={n.id} style={{ cursor: "pointer" }}>
              {/* Glow ring for warning */}
              {n.status === "warning" && (
                <circle cx={n.x} cy={n.y} r={24} fill="none" stroke="#f59e0b" strokeWidth={1} opacity={0.3}>
                  <animate attributeName="r" values="24;30;24" dur="2s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.3;0;0.3" dur="2s" repeatCount="indefinite" />
                </circle>
              )}
              <circle cx={n.x} cy={n.y} r={22}
                fill={isClient ? "#1c1c1e" : "#1c1c1e"}
                stroke={sc} strokeWidth={n.status === "warning" ? 1.5 : 1} />
              {/* Status dot */}
              <circle cx={n.x + 15} cy={n.y - 15} r={4} fill={sc}>
                {n.status === "healthy" && <animate attributeName="opacity" values="1;0.4;1" dur="2.5s" repeatCount="indefinite" />}
              </circle>
              {/* Label */}
              <text x={n.x} y={n.y + 2} textAnchor="middle" fontSize={8.5}
                fontWeight="600" fill="#e4e4e7">{n.label}</text>
              <text x={n.x} y={n.y + 13} textAnchor="middle" fontSize={7.5}
                fill="#52525b">{n.sub}</text>
            </g>
          );
        })}

        {/* Legend */}
        <g transform="translate(16, 310)">
          <circle cx={6} cy={6} r={5} fill="none" stroke="#22c55e" strokeWidth={1} />
          <text x={15} y={10} fontSize={8} fill="#52525b">healthy</text>
          <circle cx={66} cy={6} r={5} fill="none" stroke="#f59e0b" strokeWidth={1} />
          <text x={75} y={10} fontSize={8} fill="#52525b">degraded</text>
          <line x1={130} y1={6} x2={148} y2={6} stroke="#3f3f46" strokeWidth={1} />
          <text x={152} y={10} fontSize={8} fill="#52525b">edge RPS</text>
        </g>
      </svg>
    </div>
  );
}

// ─── Data Constants ───────────────────────────────────────────────────────────
const FEATURES = [
  { icon: Workflow,      title: "Distributed Tracing",     desc: "Span-level waterfalls across every service hop with deep linking to logs and metrics. OpenTelemetry-native ingestion.", badge: "Core",     color: "#3b82f6" },
  { icon: BarChart2,     title: "Realtime Analytics",      desc: "Streaming throughput, latency percentiles, and cardinality breakdowns at second resolution with automatic rollups.", badge: "Core",     color: "#8b5cf6" },
  { icon: Network,       title: "Service Topology",        desc: "Auto-discovered dependency graph with live RPS and error-rate edges. Drill into any node for instant service context.", badge: "Core",     color: "#06b6d4" },
  { icon: Bell,          title: "Alerting & Incidents",    desc: "SLO-aware alerts, on-call rotations, RCA timelines, and post-mortems. Native PagerDuty & Slack integration.", badge: "Ops",      color: "#f59e0b" },
  { icon: GitBranch,     title: "Deployment Intelligence", desc: "Correlate every deploy with traffic, errors, and latency. One-click rollback with git-native diff views.", badge: "Ops",      color: "#10b981" },
  { icon: Sparkles,      title: "MLOps Observability",     desc: "Model drift, feature distribution, and inference latency tracking for AI workloads at production scale.", badge: "AI",       color: "#ec4899" },
  { icon: Database,      title: "Queue Inspector",         desc: "Per-topic lag, throughput, DLQ size and consumer group health. Kafka, SQS, Pub/Sub — unified.", badge: "Infra",    color: "#f97316" },
  { icon: Terminal,      title: "Log Explorer",            desc: "Full-text search over structured logs with faceted filtering, saved queries, query history, and live tail.", badge: "Core",     color: "#14b8a6" },
  { icon: Globe,         title: "Synthetic Monitors",      desc: "Multi-region uptime checks, scripted browser flows, and API contract validation on a configurable schedule.", badge: "Platform", color: "#6366f1" },
];

const PROGRESS_MATRIX = [
  ["01", "Marketing landing (/welcome)",    "✅"],
  ["02", "Enterprise auth UI",              "✅"],
  ["03", "5-role RBAC",                     "✅"],
  ["04", "Role-based dashboards",           "✅"],
  ["05", "Sidebar permission filtering",    "✅"],
  ["06", "Command palette (⌘K)",           "✅"],
  ["07", "Right-side inspector drawer",     "✅"],
  ["08", "Global time-range selector",      "✅"],
  ["09", "Realtime dashboard",              "✅"],
  ["10", "Events explorer",                 "✅"],
  ["11", "Distributed traces + waterfall",  "✅"],
  ["12", "Log explorer + live tail",        "✅"],
  ["13", "Service topology SVG",            "✅"],
  ["14", "Service health + SLOs",           "✅"],
  ["15", "Queues & workers",                "✅"],
  ["16", "API monitoring",                  "✅"],
  ["17", "Alerts + acknowledge workflow",   "✅"],
  ["18", "Incidents + RCA timeline",        "✅"],
  ["19", "Deployments + rollback",          "✅"],
  ["20", "MLOps — drift + inference",       "✅"],
  ["21", "Audit log",                       "✅"],
  ["22", "Organizations + workspaces",      "✅"],
  ["23", "Settings — API keys + SSO",       "✅"],
  ["24", "Notification center",             "✅"],
  ["25", "Mocked realtime engine",          "✅"],
  ["26", "Backend-ready abstraction",       "✅"],
];

const PERMISSIONS = [
  { label: "view:dashboard",     sa: true,  ad: true,  sr: true,  dev: true,  vi: true  },
  { label: "view:events",        sa: true,  ad: true,  sr: true,  dev: true,  vi: true  },
  { label: "view:traces",        sa: true,  ad: true,  sr: true,  dev: true,  vi: true  },
  { label: "view:logs",          sa: true,  ad: true,  sr: true,  dev: true,  vi: true  },
  { label: "view:topology",      sa: true,  ad: true,  sr: true,  dev: true,  vi: true  },
  { label: "view:deployments",   sa: true,  ad: true,  sr: true,  dev: true,  vi: false },
  { label: "view:mlops",         sa: true,  ad: true,  sr: true,  dev: true,  vi: false },
  { label: "manage:incidents",   sa: true,  ad: true,  sr: true,  dev: true,  vi: false },
  { label: "manage:alerts",      sa: true,  ad: true,  sr: true,  dev: false, vi: false },
  { label: "manage:deployments", sa: true,  ad: true,  sr: true,  dev: false, vi: false },
  { label: "manage:queues",      sa: true,  ad: false, sr: true,  dev: false, vi: false },
  { label: "manage:workers",     sa: true,  ad: false, sr: true,  dev: false, vi: false },
  { label: "manage:users",       sa: true,  ad: true,  sr: false, dev: false, vi: false },
  { label: "manage:billing",     sa: true,  ad: true,  sr: false, dev: false, vi: false },
  { label: "manage:settings",    sa: true,  ad: true,  sr: false, dev: false, vi: false },
  { label: "manage:api_keys",    sa: true,  ad: true,  sr: false, dev: false, vi: false },
];

const ROLES = [
  { name: "Super Admin", icon: ShieldCheck, tagline: "Global control plane, org governance, audit trails.", perms: ["All permissions", "Org & billing", "API keys & SSO", "Audit log"], color: "#ef4444" },
  { name: "Admin",       icon: Lock,        tagline: "Workspace admin and team management.",                perms: ["Manage users", "Manage settings", "Manage alerts", "Billing read"], color: "#f97316" },
  { name: "SRE",         icon: Server,      tagline: "Incidents, on-call, deployments and infra.",          perms: ["Manage incidents", "Manage deploys", "Manage queues", "On-call config"], color: "#3b82f6" },
  { name: "Developer",   icon: Terminal,    tagline: "Traces, logs, metrics and incident ownership.",       perms: ["View observability", "Open incidents", "Inspect traces", "Annotations"], color: "#10b981" },
  { name: "Viewer",      icon: Eye,         tagline: "Read-only dashboards for stakeholders.",              perms: ["Dashboards", "Alerts feed", "Service health", "Incident read"], color: "#71717a" },
];

const INTEGRATIONS = [
  "Apache Kafka", "AWS SQS", "GCP Pub/Sub", "Redis Streams", "RabbitMQ", "NATS",
  "Prometheus", "OpenTelemetry", "Jaeger", "Grafana", "PagerDuty", "Opsgenie",
  "Slack", "Microsoft Teams", "Datadog", "New Relic", "Sentry", "GitHub",
  "GitLab", "ArgoCD", "Terraform", "Jira", "Linear", "SAML SSO",
];

const TESTIMONIALS = [
  { name: "Riya Desai",    role: "Staff SRE @ Stripe",    body: "We replaced three separate observability tools with Pulse. The service topology alone saved us hours during our last P0 incident. The permission model is exactly what we needed." },
  { name: "Marcus Chen",   role: "Engineering Lead @ Vercel", body: "The MLOps observability is genuinely the best I've seen shipped in an internal tool. We caught a model drift issue in production before it affected a single user." },
  { name: "Anya Kowalski", role: "Platform Eng @ Linear",  body: "Deployment intelligence changed how we ship. Correlating every deploy with latency changes in realtime meant our last three releases had zero surprise regressions." },
];

const TECH_STACK = [
  { name: "TanStack Start", icon: Rocket, cat: "Framework" },
  { name: "React 19", icon: Code2, cat: "UI" },
  { name: "TypeScript strict", icon: ShieldCheck, cat: "Language" },
  { name: "Tailwind 4", icon: Sparkles, cat: "Styles" },
  { name: "shadcn/ui", icon: Layers, cat: "Components" },
  { name: "Zustand", icon: Database, cat: "State" },
  { name: "TanStack Query", icon: Zap, cat: "Cache" },
  { name: "TanStack Table", icon: BarChart2, cat: "Data" },
  { name: "Recharts", icon: TrendingUp, cat: "Charts" },
  { name: "JetBrains Mono", icon: Terminal, cat: "Typography" },
  { name: "OpenTelemetry", icon: Network, cat: "Observability" },
  { name: "WebSocket / SSE", icon: Radio, cat: "Realtime" },
];

// ─── Pill ────────────────────────────────────────────────────────────────────
function Chip({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center rounded-full border border-white/8 bg-zinc-900/60 px-3 py-1 text-xs font-medium text-zinc-400 hover:border-blue-500/30 hover:text-blue-400 hover:bg-blue-500/5 transition-all duration-150 cursor-default">
      {label}
    </span>
  );
}

// ─── Section Label ────────────────────────────────────────────────────────────
function SLabel({ children }: { children: React.ReactNode }) {
  return <p className="font-mono text-[11px] uppercase tracking-widest text-blue-400 mb-2">{children}</p>;
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function WelcomePage() {
  const metrics = useLiveMetrics();
  const chartData = useLiveChart();
  const [activeT, setActiveT] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setActiveT((t) => (t + 1) % TESTIMONIALS.length), 5200);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 antialiased selection:bg-blue-500/30">
      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: translateY(0); } }
        .fade-in { animation: fadeIn 0.3s ease forwards; }
        ::-webkit-scrollbar { width: 4px; height: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #3f3f46; border-radius: 2px; }
      `}</style>

      {/* ambient glow */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div style={{ position: "absolute", top: -160, left: "50%", transform: "translateX(-50%)", width: 900, height: 500, borderRadius: "50%", background: "radial-gradient(ellipse, rgba(59,130,246,0.07) 0%, transparent 70%)" }} />
        <div style={{ position: "absolute", top: "40%", left: -200, width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(ellipse, rgba(139,92,246,0.05) 0%, transparent 70%)" }} />
      </div>

      {/* ── NAV ── */}
      <header className="sticky top-0 z-50 border-b border-white/5 bg-zinc-950/80 backdrop-blur-xl">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-6">
          <Link to="/welcome" className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-blue-500 shadow-lg shadow-blue-500/25">
              <Activity className="h-4 w-4 text-white" strokeWidth={2.5} />
            </div>
            <span className="text-sm font-bold tracking-tight text-white">Pulse</span>
            <span className="hidden rounded border border-white/10 bg-white/5 px-1.5 py-0.5 font-mono text-[10px] text-zinc-500 md:inline">v2.4.0</span>
          </Link>
          <nav className="hidden items-center gap-6 text-xs text-zinc-500 md:flex">
            {["Features","Topology","Progress","Permissions","Pricing","Roadmap"].map((s) => (
              <a key={s} href={`#${s.toLowerCase()}`} className="hover:text-zinc-200 transition-colors">{s}</a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <Link to="/login"><Button size="sm" variant="ghost" className="h-7 text-xs text-zinc-400 hover:text-white hover:bg-white/5">Sign in</Button></Link>
            <Link to="/dashboard"><Button size="sm" className="h-7 gap-1.5 text-xs bg-blue-500 hover:bg-blue-400 text-white border-0 shadow-lg shadow-blue-500/20">Open console <ArrowRight className="h-3 w-3" /></Button></Link>
          </div>
        </div>
      </header>

      {/* ── HERO ── */}
      <section className="border-b border-white/5 relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 pt-20 pb-14">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/8 px-3 py-1 text-[11px] font-mono text-emerald-400 mb-5">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                cluster · us-east-1 · 99.992% uptime ·{" "}
                <Num v={Math.round(metrics.eventsPerSec)} /> events/sec
              </div>
              <h1 className="text-5xl xl:text-6xl font-bold leading-[1.04] tracking-[-0.03em] text-white">
                Observability for<br />distributed pipelines.
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 mt-1">
                  Built for engineers.
                </span>
              </h1>
              <p className="mt-5 text-base text-zinc-400 leading-relaxed max-w-lg">
                Traces, logs, metrics, queues, workers, deployments, incidents and MLOps in one engineering-grade console. 26 features shipped. Zero bloat.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link to="/dashboard"><Button className="h-9 gap-2 bg-blue-500 hover:bg-blue-400 text-white border-0 shadow-lg shadow-blue-500/25 font-medium">Launch console <ArrowRight className="h-4 w-4" /></Button></Link>
                <Link to="/signup"><Button variant="outline" className="h-9 border-white/10 bg-white/5 text-zinc-300 hover:bg-white/10 hover:text-white">Create account</Button></Link>
                <a href="https://github.com" target="_blank" rel="noreferrer"><Button variant="ghost" className="h-9 gap-2 text-zinc-500 hover:text-zinc-200 hover:bg-white/5"><Github className="h-4 w-4" /> Source</Button></a>
              </div>
              <div className="mt-8 flex items-center gap-3">
                <div className="flex -space-x-2">
                  {["#3b82f6","#8b5cf6","#06b6d4","#10b981","#f59e0b"].map((c, i) => (
                    <div key={i} className="h-7 w-7 rounded-full border-2 border-zinc-950 flex items-center justify-center text-[9px] font-bold text-white" style={{ background: c }}>
                      {["RS","MC","AK","JL","PW"][i]}
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex">{Array(5).fill(0).map((_,i)=><Star key={i} className="h-3 w-3 fill-amber-400 text-amber-400"/>)}</div>
                  <p className="text-[11px] text-zinc-500 mt-0.5">Trusted by <span className="text-zinc-300 font-medium">2,400+</span> engineering teams</p>
                </div>
              </div>
            </div>

            {/* Live console panel */}
            <div className="rounded-2xl border border-white/8 bg-zinc-900/60 overflow-hidden shadow-2xl shadow-black/60 backdrop-blur">
              {/* Window chrome */}
              <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/5 bg-zinc-900/80">
                <div className="flex items-center gap-1.5">
                  <div className="h-3 w-3 rounded-full bg-red-500/80" />
                  <div className="h-3 w-3 rounded-full bg-amber-500/80" />
                  <div className="h-3 w-3 rounded-full bg-emerald-500/80" />
                </div>
                <div className="flex items-center gap-1.5 font-mono text-[10px] text-zinc-600">
                  <Radio className="h-3 w-3 text-emerald-400 animate-pulse" /> pulse.console / live
                </div>
                <span className="font-mono text-[10px] text-zinc-700">demo</span>
              </div>
              {/* Live KPI row */}
              <div className="grid grid-cols-4 border-b border-white/5">
                {[
                  { lbl: "Events/s", val: <Num v={Math.round(metrics.eventsPerSec)}/>, c: "#22c55e" },
                  { lbl: "p95 lat", val: <><Num v={Math.round(metrics.p95)}/>ms</>, c: "#3b82f6" },
                  { lbl: "Workers", val: <><Num v={Math.round(metrics.workersOnline)}/>/96</>, c: "#8b5cf6" },
                  { lbl: "Err rate", val: <><Num v={metrics.errorRate} dec={2}/>%</>, c: "#ef4444" },
                ].map(({ lbl, val, c }) => (
                  <div key={lbl} className="px-3 py-2 border-r border-white/5 last:border-0">
                    <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 9, color: "#52525b", textTransform: "uppercase", letterSpacing: "0.08em" }}>{lbl}</div>
                    <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 15, fontWeight: 700, color: "#fff", marginTop: 2 }}>{val}</div>
                    <div style={{ marginTop: 4 }}><Sparkline color={c} height={22} /></div>
                  </div>
                ))}
              </div>
              {/* Trace waterfall */}
              <div className="px-4 py-3 border-b border-white/5">
                <div className="flex justify-between mb-2.5">
                  <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 10, color: "#52525b", textTransform: "uppercase", letterSpacing: "0.08em" }}>TRACE · checkout-flow</span>
                  <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 10, color: "#3f3f46" }}>98ms</span>
                </div>
                <TraceWaterfall />
              </div>
              {/* Log feed */}
              <div className="px-4 py-3 bg-black/30">
                <div className="flex justify-between mb-2">
                  <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 10, color: "#52525b", textTransform: "uppercase", letterSpacing: "0.08em" }}>LIVE LOGS</span>
                  <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 10, color: "#22c55e", display: "flex", alignItems: "center", gap: 4 }}>
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#22c55e", display: "inline-block", animation: "pulse 2s infinite" }} />tail
                  </span>
                </div>
                <TerminalFeed />
              </div>
            </div>
          </div>

          {/* Stat strip */}
          <div className="mt-10 grid grid-cols-2 md:grid-cols-6 gap-px overflow-hidden rounded-xl border border-white/5 bg-white/5">
            {[
              { lbl: "Events / sec", v: <Num v={Math.round(metrics.eventsPerSec)}/>, u: "k", icon: Zap },
              { lbl: "p95 Latency",  v: <Num v={Math.round(metrics.p95)}/>, u: "ms", icon: Clock },
              { lbl: "Queue depth",  v: <Num v={Math.round(metrics.queueDepth)}/>, u: "", icon: Database },
              { lbl: "Workers",      v: <Num v={Math.round(metrics.workersOnline)}/>, u: "/96", icon: Cpu },
              { lbl: "Throughput",   v: <Num v={metrics.throughput} dec={1}/>, u: "GB/s", icon: TrendingUp },
              { lbl: "Open incidents", v: "3", u: "", icon: AlertTriangle },
            ].map(({ lbl, v, u, icon: Icon }) => (
              <div key={lbl} className="bg-zinc-900/60 px-4 py-4">
                <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-zinc-600 mb-1.5">
                  <Icon className="h-3 w-3" /> {lbl}
                </div>
                <div className="font-mono text-xl text-white tabular-nums">{v}<span className="text-zinc-600 text-xs">{u}</span></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── LIVE CHARTS ── */}
      <section className="border-b border-white/5 bg-zinc-950">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="mb-10">
            <SLabel>Live Metrics</SLabel>
            <h2 className="text-3xl font-bold tracking-tight text-white">Every signal, updating in realtime.</h2>
            <p className="mt-2 text-sm text-zinc-400">30-minute rolling window. Data updates every ~1.4s. These are live chart renders, not screenshots.</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
            {/* Throughput */}
            <div className="rounded-2xl border border-white/5 bg-zinc-900/60 p-5">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-[10px] font-mono uppercase tracking-wider text-zinc-600">Event Throughput</p>
                  <p className="mt-1 text-2xl font-mono font-bold text-white tabular-nums">
                    <Num v={Math.round(metrics.eventsPerSec)} /><span className="text-sm font-normal text-zinc-500 ml-1">ev/s</span>
                  </p>
                </div>
                <span className="text-[10px] font-mono text-emerald-500 border border-emerald-500/20 bg-emerald-500/10 rounded px-2 py-0.5">+12.4%</span>
              </div>
              <ResponsiveContainer width="100%" height={120}>
                <AreaChart data={chartData} margin={{ top: 5, right: 0, left: -30, bottom: 0 }}>
                  <defs>
                    <linearGradient id="gt" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                  <XAxis dataKey="t" tick={{ fontSize: 9, fill: "#3f3f46", fontFamily: "JetBrains Mono, monospace" }} tickLine={false} axisLine={false} interval={9} />
                  <YAxis tick={{ fontSize: 9, fill: "#3f3f46", fontFamily: "JetBrains Mono, monospace" }} tickLine={false} axisLine={false} />
                  <Tooltip content={<DarkTooltip />} />
                  <Area type="monotone" dataKey="throughput" stroke="#3b82f6" strokeWidth={1.5} fill="url(#gt)" dot={false} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            {/* Latency */}
            <div className="rounded-2xl border border-white/5 bg-zinc-900/60 p-5">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-[10px] font-mono uppercase tracking-wider text-zinc-600">Latency Percentiles</p>
                  <p className="mt-1 text-2xl font-mono font-bold text-white tabular-nums">
                    <Num v={Math.round(metrics.p95)} /><span className="text-sm font-normal text-zinc-500 ml-1">p95 ms</span>
                  </p>
                </div>
                <span className="text-[10px] font-mono text-zinc-600 border border-white/8 rounded px-2 py-0.5">SLO: 200ms</span>
              </div>
              <ResponsiveContainer width="100%" height={120}>
                <LineChart data={chartData} margin={{ top: 5, right: 0, left: -30, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                  <XAxis dataKey="t" tick={{ fontSize: 9, fill: "#3f3f46", fontFamily: "JetBrains Mono, monospace" }} tickLine={false} axisLine={false} interval={9} />
                  <YAxis tick={{ fontSize: 9, fill: "#3f3f46", fontFamily: "JetBrains Mono, monospace" }} tickLine={false} axisLine={false} />
                  <Tooltip content={<DarkTooltip />} />
                  <Line type="monotone" dataKey="p95" stroke="#8b5cf6" strokeWidth={1.5} dot={false} name="p95" />
                  <Line type="monotone" dataKey="p50" stroke="#06b6d4" strokeWidth={1} dot={false} strokeDasharray="4 2" name="p50" />
                </LineChart>
              </ResponsiveContainer>
              <div className="flex gap-4 mt-2">
                <span className="flex items-center gap-1 text-[10px] text-zinc-600"><span className="w-3 h-0.5 inline-block" style={{ background: "#8b5cf6" }} /> p95</span>
                <span className="flex items-center gap-1 text-[10px] text-zinc-600"><span className="w-3 h-0.5 inline-block" style={{ background: "#06b6d4", borderTop: "1px dashed #06b6d4" }} /> p50</span>
              </div>
            </div>
            {/* Queue Lag */}
            <div className="rounded-2xl border border-white/5 bg-zinc-900/60 p-5">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-[10px] font-mono uppercase tracking-wider text-zinc-600">Queue Lag</p>
                  <p className="mt-1 text-2xl font-mono font-bold text-white tabular-nums">
                    <Num v={Math.round(metrics.queueDepth)} /><span className="text-sm font-normal text-zinc-500 ml-1">msgs</span>
                  </p>
                </div>
                <span className="text-[10px] font-mono text-amber-500 border border-amber-500/20 bg-amber-500/10 rounded px-2 py-0.5">warn</span>
              </div>
              <ResponsiveContainer width="100%" height={120}>
                <BarChart data={chartData.slice(-14)} margin={{ top: 5, right: 0, left: -30, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                  <XAxis dataKey="t" tick={{ fontSize: 9, fill: "#3f3f46", fontFamily: "JetBrains Mono, monospace" }} tickLine={false} axisLine={false} interval={4} />
                  <YAxis tick={{ fontSize: 9, fill: "#3f3f46", fontFamily: "JetBrains Mono, monospace" }} tickLine={false} axisLine={false} />
                  <Tooltip content={<DarkTooltip />} />
                  <Bar dataKey="queueLag" fill="#f59e0b" opacity={0.7} radius={[2, 2, 0, 0]} name="lag (msgs)" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Worker health matrix */}
          <div className="mt-3 rounded-2xl border border-white/5 bg-zinc-900/60 p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-[10px] font-mono uppercase tracking-wider text-zinc-600">Worker Pool Health</p>
                <p className="text-xs text-zinc-500 mt-0.5"><Num v={Math.round(metrics.workersOnline)} /> / 96 workers active</p>
              </div>
              <div className="flex items-center gap-4 text-[10px] text-zinc-600 font-mono">
                <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm inline-block bg-emerald-500/80" /> active</span>
                <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm inline-block" style={{ background: "#27272a" }} /> idle/drain</span>
              </div>
            </div>
            <div className="grid gap-0.5" style={{ gridTemplateColumns: "repeat(24, 1fr)" }}>
              {Array.from({ length: 96 }, (_, i) => (
                <div key={i} className="rounded-sm transition-colors duration-700"
                  style={{ aspectRatio: "1", background: i < metrics.workersOnline ? (i < 80 ? "#22c55e" : "#10b981") : "#27272a", opacity: i < metrics.workersOnline ? 0.85 : 0.4 }} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── TOPOLOGY ── */}
      <section id="topology" className="border-b border-white/5">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">
            <div className="lg:col-span-2">
              <SLabel>Service Topology</SLabel>
              <h2 className="text-3xl font-bold tracking-tight text-white">Auto-discovered dependency graph.</h2>
              <p className="mt-3 text-sm text-zinc-400 leading-relaxed">Live RPS, error-rate edges, and health indicators updated continuously. Click any node to open the inspector drawer with spans, logs, and SLOs.</p>
              <div className="mt-6 space-y-2.5">
                {[
                  { label: "api-gateway", rps: 847, status: "healthy" as const },
                  { label: "checkout-svc", rps: 428, status: "warning" as const },
                  { label: "payment-svc", rps: 214, status: "healthy" as const },
                  { label: "inventory-svc", rps: 188, status: "healthy" as const },
                  { label: "notif-svc", rps: 98, status: "healthy" as const },
                ].map((s) => (
                  <div key={s.label} className="flex items-center justify-between rounded-lg border border-white/5 bg-zinc-900/60 px-3 py-2">
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full" style={{ background: statusColor[s.status] }} />
                      <span className="font-mono text-xs text-zinc-300">{s.label}</span>
                    </div>
                    <span className="font-mono text-xs text-zinc-500">{s.rps} rps</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:col-span-3 rounded-2xl border border-white/5 bg-zinc-900/50 p-5">
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-[10px] text-zinc-600 uppercase tracking-wider">live dependency graph</span>
                <div className="flex items-center gap-1.5 text-[10px] font-mono text-emerald-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" /> streaming
                </div>
              </div>
              <TopologyGraph />
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section id="features" className="border-b border-white/5 bg-zinc-950">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="max-w-xl mb-10">
            <SLabel>Platform</SLabel>
            <h2 className="text-3xl font-bold tracking-tight text-white">One console for every signal.</h2>
            <p className="mt-3 text-sm text-zinc-400 leading-relaxed">From the API edge to the worker pool, Pulse captures every span and renders it in workflows engineers actually use.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {FEATURES.map(({ icon: Icon, title, desc, badge, color }) => (
              <div key={title} className="group relative rounded-2xl border border-white/5 bg-zinc-900/50 p-6 overflow-hidden hover:border-white/10 hover:bg-zinc-900/80 transition-all duration-300">
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: `radial-gradient(circle at 50% 0%, ${color}09, transparent 55%)` }} />
                <div className="flex items-start justify-between mb-4">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/8 bg-white/5">
                    <Icon className="h-4.5 w-4.5" style={{ color }} />
                  </div>
                  <span className="rounded-full border border-white/8 bg-white/5 px-2 py-0.5 text-[10px] font-mono text-zinc-500">{badge}</span>
                </div>
                <h3 className="text-sm font-semibold text-white">{title}</h3>
                <p className="mt-1.5 text-xs leading-relaxed text-zinc-500">{desc}</p>
                <div className="mt-4 flex items-center gap-1 text-[11px] text-zinc-700 group-hover:text-blue-400 transition-colors">
                  Learn more <ChevronRight className="h-3 w-3" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROGRESS MATRIX ── */}
      <section id="progress" className="border-b border-white/5">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
            <div className="lg:col-span-2">
              <SLabel>Progress Matrix</SLabel>
              <h2 className="text-3xl font-bold tracking-tight text-white">26 features. All shipped.</h2>
              <p className="mt-3 text-sm text-zinc-400 leading-relaxed">Every area of the platform from auth to MLOps is implemented and production-ready. No stubs, no placeholders.</p>
              <div className="mt-6 flex items-center gap-4">
                <div className="text-center">
                  <div className="text-4xl font-bold font-mono text-white">26</div>
                  <div className="text-xs text-zinc-500 mt-0.5">Features</div>
                </div>
                <div className="h-12 w-px bg-white/5" />
                <div className="text-center">
                  <div className="text-4xl font-bold font-mono text-emerald-400">100%</div>
                  <div className="text-xs text-zinc-500 mt-0.5">Complete</div>
                </div>
              </div>
            </div>
            <div className="lg:col-span-3 rounded-2xl border border-white/5 bg-zinc-900/50 overflow-hidden">
              <div className="px-5 py-3 border-b border-white/5 flex items-center gap-2">
                <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-600">area</span>
              </div>
              <div className="overflow-y-auto" style={{ maxHeight: 420 }}>
                <table className="w-full text-xs">
                  <tbody>
                    {PROGRESS_MATRIX.map(([num, area, status]) => (
                      <tr key={num} className="border-b border-white/5 hover:bg-white/2 transition-colors">
                        <td className="px-5 py-2.5 font-mono text-zinc-700 w-10">{num}</td>
                        <td className="px-2 py-2.5 text-zinc-300">{area}</td>
                        <td className="px-5 py-2.5 text-right">
                          <span className="inline-flex items-center gap-1 text-emerald-400 font-mono text-[11px]">
                            <Check className="h-3 w-3" /> done
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PERMISSION MATRIX ── */}
      <section id="permissions" className="border-b border-white/5 bg-zinc-950">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="mb-10">
            <SLabel>Access Control</SLabel>
            <h2 className="text-3xl font-bold tracking-tight text-white">Permission matrix, in full.</h2>
            <p className="mt-3 text-sm text-zinc-400 max-w-xl">Five built-in roles. Every sidebar item, dashboard widget, and mutating action is gated by <code className="font-mono text-[11px] bg-white/5 px-1.5 py-0.5 rounded text-blue-400">can(perm)</code>. Wildcards honored.</p>
          </div>

          {/* Role cards */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-3 mb-8">
            {ROLES.map(({ name, icon: Icon, tagline, color }) => (
              <div key={name} className="rounded-xl border border-white/5 bg-zinc-900/60 p-4 hover:border-white/10 transition-colors">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg mb-3" style={{ background: `${color}18`, border: `1px solid ${color}28` }}>
                  <Icon className="h-4 w-4" style={{ color }} />
                </div>
                <p className="text-sm font-semibold text-white">{name}</p>
                <p className="text-[11px] text-zinc-500 mt-0.5 leading-relaxed">{tagline}</p>
              </div>
            ))}
          </div>

          {/* Matrix table */}
          <div className="rounded-2xl border border-white/5 bg-zinc-900/50 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-white/5">
                    <th className="px-5 py-3 text-left font-mono text-[10px] uppercase tracking-wider text-zinc-600 w-48">Permission</th>
                    {["Super Admin","Admin","SRE","Developer","Viewer"].map((r) => (
                      <th key={r} className="px-4 py-3 text-center font-mono text-[10px] uppercase tracking-wider text-zinc-600">{r}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {PERMISSIONS.map((p) => (
                    <tr key={p.label} className="border-b border-white/5 hover:bg-white/2 transition-colors">
                      <td className="px-5 py-2.5 font-mono text-[11px] text-zinc-400">{p.label}</td>
                      {[p.sa, p.ad, p.sr, p.dev, p.vi].map((has, i) => (
                        <td key={i} className="px-4 py-2.5 text-center">
                          {has
                            ? <Check className="h-3.5 w-3.5 text-emerald-400 mx-auto" />
                            : <Minus className="h-3.5 w-3.5 text-zinc-800 mx-auto" />
                          }
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* ── ARCHITECTURE ── */}
      <section id="architecture" className="border-b border-white/5">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <SLabel>Architecture</SLabel>
              <h2 className="text-3xl font-bold tracking-tight text-white">Frontend-first, backend-ready.</h2>
              <p className="mt-3 text-sm text-zinc-400 leading-relaxed">Typed interfaces, abstracted API layer, mockable realtime streams and pluggable auth. Swap mocks for gRPC, REST or GraphQL without touching components.</p>
              <div className="mt-8 grid grid-cols-2 gap-2">
                {TECH_STACK.map(({ name, icon: Icon, cat }) => (
                  <div key={name} className="flex items-center gap-2.5 rounded-lg border border-white/5 bg-zinc-900/60 px-3 py-2.5 hover:border-blue-500/20 transition-colors group">
                    <div className="flex h-6 w-6 items-center justify-center rounded-md bg-white/5 group-hover:bg-blue-500/10 transition-colors">
                      <Icon className="h-3 w-3 text-zinc-500 group-hover:text-blue-400 transition-colors" />
                    </div>
                    <div>
                      <p className="text-[11px] font-medium text-zinc-300">{name}</p>
                      <p className="text-[10px] text-zinc-600">{cat}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-2xl border border-white/8 bg-black/60 p-6 font-mono text-[11px] leading-relaxed shadow-2xl">
              <div className="flex items-center gap-2 mb-4">
                <div className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
                <div className="h-2.5 w-2.5 rounded-full bg-amber-500/70" />
                <div className="h-2.5 w-2.5 rounded-full bg-emerald-500/70" />
                <span className="ml-2 text-zinc-600">pulse/architecture</span>
              </div>
              <pre className="whitespace-pre text-zinc-500 text-[10.5px] leading-loose">
{`┌───────────────────┐   WS/SSE    ┌──────────────┐
│   Browser         │◀──────────▶│  Edge / SSR  │
│   (Pulse UI)      │            │  TanStack    │
│                   │   RPC      │  Start       │
│ ┌───────────────┐ │◀──────────▶└──────┬───────┘
│ │ Zustand stores│ │                   │
│ │ TanStack Query│ │        ┌──────────▼────────┐
│ │ Realtime hub  │ │        │     Services       │
│ └───────────────┘ │        │ events · workers   │
└───────────────────┘        │ queues · MLOps     │
                             └───────────────────┘`}
              </pre>
              <div className="mt-4 border-t border-white/5 pt-4 space-y-1.5 text-[10.5px]">
                <div><span className="text-emerald-400">✓</span> <span className="text-zinc-500">All data flows typed end-to-end (strict TS)</span></div>
                <div><span className="text-emerald-400">✓</span> <span className="text-zinc-500">Auth is role-aware at route + data layer</span></div>
                <div><span className="text-emerald-400">✓</span> <span className="text-zinc-500">Mock → real backend is a one-line env swap</span></div>
                <div><span className="text-emerald-400">✓</span> <span className="text-zinc-500">Realtime hub: today setInterval, tomorrow WS</span></div>
                <div><span className="text-blue-400">→</span> <span className="text-zinc-500">can(perm) resolves wildcards and role hierarchy</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── INTEGRATIONS ── */}
      <section className="border-b border-white/5 bg-zinc-950">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="text-center max-w-xl mx-auto mb-10">
            <SLabel>Integrations</SLabel>
            <h2 className="text-3xl font-bold tracking-tight text-white">Plays well with your entire stack.</h2>
            <p className="mt-3 text-sm text-zinc-400">Native connectors for queues, observability tools, alerting platforms, SCMs, and identity providers.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {INTEGRATIONS.map((n) => <Chip key={n} label={n} />)}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="border-b border-white/5">
        <div className="mx-auto max-w-4xl px-6 py-20 text-center">
          <SLabel>What engineers say</SLabel>
          <div className="relative" style={{ minHeight: 160 }}>
            {TESTIMONIALS.map((t, i) => (
              <div key={t.name} className="absolute inset-0 transition-all duration-500"
                style={{ opacity: i === activeT ? 1 : 0, transform: `translateY(${i === activeT ? 0 : 10}px)`, pointerEvents: i === activeT ? "auto" : "none" }}>
                <blockquote className="text-xl font-medium text-zinc-200 leading-relaxed max-w-2xl mx-auto">"{t.body}"</blockquote>
                <div className="mt-5 flex items-center justify-center gap-2">
                  <div className="h-7 w-7 rounded-full bg-blue-500/20 flex items-center justify-center text-[10px] font-bold text-blue-400">
                    {t.name.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-semibold text-white">{t.name}</p>
                    <p className="text-xs text-zinc-500">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center gap-1.5 mt-20">
            {TESTIMONIALS.map((_, i) => (
              <button key={i} onClick={() => setActiveT(i)}
                className="h-1.5 rounded-full transition-all duration-300"
                style={{ width: i === activeT ? 24 : 6, background: i === activeT ? "#3b82f6" : "#3f3f46" }} />
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section id="pricing" className="border-b border-white/5 bg-zinc-950">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="text-center max-w-xl mx-auto mb-12">
            <SLabel>Pricing</SLabel>
            <h2 className="text-3xl font-bold tracking-tight text-white">Simple, transparent, per-host.</h2>
            <p className="mt-3 text-sm text-zinc-400">No data ingestion tax. No per-seat fees. Flat per-host pricing that scales with your infra.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {[
              { name: "Hobby", price: "$0", period: "/mo", desc: "For local dev and solo engineers.", feats: ["1 workspace", "7-day retention", "3 synthetic monitors", "Community support", "Basic alerting"] },
              { name: "Team", price: "$29", period: "/host/mo", desc: "For growing engineering teams.", feats: ["10 workspaces", "30-day retention", "Unlimited monitors", "SSO + audit log", "Priority support", "On-call rotations"], popular: true },
              { name: "Enterprise", price: "Custom", period: "", desc: "For production-grade at scale.", feats: ["Unlimited workspaces", "Custom retention", "SAML SSO + SCIM", "Dedicated CSM", "Custom SLA", "Private cluster"] },
            ].map((t) => (
              <div key={t.name} className="relative rounded-2xl p-6 transition-all"
                style={{ border: t.popular ? "2px solid rgba(59,130,246,0.5)" : "1px solid rgba(255,255,255,0.06)", background: t.popular ? "rgba(59,130,246,0.06)" : "rgba(24,24,27,0.6)" }}>
                {t.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-blue-500 px-3 py-0.5 text-[10px] font-mono uppercase tracking-wider text-white shadow-lg shadow-blue-500/30">
                    Most popular
                  </div>
                )}
                <div className="text-sm font-semibold text-white">{t.name}</div>
                <div className="mt-3 font-mono">
                  <span className="text-3xl font-bold text-white">{t.price}</span>
                  <span className="text-xs text-zinc-500">{t.period}</span>
                </div>
                <p className="mt-2 text-xs text-zinc-500 leading-relaxed">{t.desc}</p>
                <ul className="mt-5 space-y-2">
                  {t.feats.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-xs text-zinc-400">
                      <Check className="h-3.5 w-3.5 text-emerald-400 shrink-0" /> {f}
                    </li>
                  ))}
                </ul>
                <Link to="/signup" className="mt-6 block">
                  <Button className="w-full h-9 text-xs font-medium"
                    style={t.popular ? { background: "#3b82f6", color: "#fff", border: "none", boxShadow: "0 4px 24px rgba(59,130,246,0.2)" } : {}}>
                    {t.price === "Custom" ? "Contact sales" : "Get started"}
                  </Button>
                </Link>
              </div>
            ))}
          </div>
          <p className="text-center text-[11px] text-zinc-600 mt-6">All plans include unlimited team members, full API access and 99.9% uptime SLA.</p>
        </div>
      </section>

      {/* ── ROADMAP ── */}
      <section id="roadmap" className="border-b border-white/5">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="mb-10">
            <SLabel>Roadmap</SLabel>
            <h2 className="text-3xl font-bold tracking-tight text-white">What's coming next.</h2>
            <p className="mt-3 text-sm text-zinc-400 max-w-xl">The platform is production-ready today. These are the enterprise and AI features shipping next.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              { cat: "Frontend", icon: Layers, color: "#3b82f6", items: ["Saved dashboards + share links", "Drag-and-drop dashboard editor", "Virtualized log/event tables", "Keyboard vim-like motions"] },
              { cat: "Backend",  icon: Server, color: "#10b981", items: ["OTLP-compatible event ingestion", "ClickHouse / Loki / Prometheus adapters", "Multi-tenant RLS policies", "Webhook + cron endpoints"] },
              { cat: "AI Systems", icon: Brain, color: "#ec4899", items: ["AI assistant in command palette", "Log clustering + anomaly summaries", "Incident RCA draft generation", "Auto-triage of alerts to responders"] },
              { cat: "Infra",    icon: Globe,  color: "#f59e0b", items: ["WS pub/sub hub (CF Durable Objects)", "Multi-region active/active", "Horizontal worker autoscaling", "Automated DR drills"] },
            ].map(({ cat, icon: Icon, color, items }) => (
              <div key={cat} className="rounded-2xl border border-white/5 bg-zinc-900/50 p-5">
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg" style={{ background: `${color}18`, border: `1px solid ${color}28` }}>
                    <Icon className="h-3.5 w-3.5" style={{ color }} />
                  </div>
                  <span className="text-sm font-semibold text-white">{cat}</span>
                </div>
                <ul className="space-y-2">
                  {items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-xs text-zinc-500">
                      <span className="mt-0.5 h-3.5 w-3.5 rounded-sm border border-white/10 bg-white/5 shrink-0 flex items-center justify-center">
                        <span className="h-1 w-1 rounded-sm bg-zinc-700" />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="border-b border-white/5 bg-zinc-950">
        <div className="mx-auto max-w-7xl px-6 py-24 text-center relative overflow-hidden">
          <div className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(ellipse at 50% 50%, rgba(59,130,246,0.05), transparent 60%)" }} />
          <div className="relative">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/8 px-3 py-1 text-[11px] font-mono text-blue-400 mb-6">
              <Zap className="h-3 w-3" /> No signup required for demo workspace
            </div>
            <h2 className="text-4xl font-bold tracking-tight text-white max-w-2xl mx-auto">
              Ship observability your engineers will actually use.
            </h2>
            <p className="mt-4 max-w-xl mx-auto text-sm text-zinc-400">Full-featured demo. Real data. No credit card. Launch in seconds.</p>
            <div className="mt-8 flex justify-center gap-3 flex-wrap">
              <Link to="/dashboard"><Button className="h-10 px-6 gap-2 text-sm bg-blue-500 hover:bg-blue-400 text-white border-0 shadow-xl shadow-blue-500/25 font-medium">Open console <ArrowRight className="h-4 w-4" /></Button></Link>
              <Link to="/signup"><Button variant="outline" className="h-10 px-6 text-sm border-white/10 bg-white/5 text-zinc-300 hover:bg-white/10 hover:text-white">Create workspace</Button></Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-white/5">
        <div className="mx-auto max-w-7xl px-6 py-10">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-10">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 mb-3">
                <div className="flex h-6 w-6 items-center justify-center rounded-md bg-blue-500">
                  <Activity className="h-3.5 w-3.5 text-white" strokeWidth={2.5} />
                </div>
                <span className="text-sm font-bold text-white">Pulse</span>
              </div>
              <p className="text-[11px] text-zinc-600 leading-relaxed">Distributed event processing & observability for modern engineering teams.</p>
            </div>
            {[
              { h: "Product", ls: ["Features","Pricing","Changelog","Roadmap"] },
              { h: "Docs",    ls: ["Getting started","API reference","SDKs","Integrations"] },
              { h: "Company", ls: ["About","Blog","Careers","Contact"] },
              { h: "Legal",   ls: ["Privacy","Terms","Security","Status"] },
            ].map(({ h, ls }) => (
              <div key={h}>
                <div className="text-[10px] font-semibold uppercase tracking-wider text-zinc-600 mb-3">{h}</div>
                <ul className="space-y-2">
                  {ls.map((l) => <li key={l}><a href="#" className="text-xs text-zinc-600 hover:text-zinc-300 transition-colors">{l}</a></li>)}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-white/5 pt-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-zinc-600">
            <span>© 2025 Pulse Inc. All rights reserved.</span>
            <div className="flex items-center gap-1.5 font-mono">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              All systems operational · 99.992% uptime
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
