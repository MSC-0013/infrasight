import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { createFileRoute, Navigate } from "@tanstack/react-router";
import {
  Activity, BarChart2, Bell, GitBranch, Network, Workflow, ShieldCheck,
  Sparkles, ArrowRight, Github, Check, Cpu, Zap, Globe, Database, Lock,
  Terminal, TrendingUp, AlertTriangle, Clock, Server, Eye, ChevronRight,
  Star, Radio, Users, Code2, Layers, Rocket, Brain, Minus, X,
  ChevronDown, Menu, Shield, Boxes, LineChart, LayoutDashboard,
  MonitorCheck, GitCommit, FlaskConical, Webhook, KeyRound, Building2,
  Gauge, PackageCheck, TrendingDown, TriangleAlert, RefreshCw,
  ArrowUpRight, ArrowDownRight, Wifi, HardDrive, MemoryStick,
  Play, Pause, RotateCcw, ExternalLink, Copy, Search,
} from "lucide-react";
import {
  AreaChart, Area, LineChart as RLineChart, Line, BarChart, Bar,
  XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
  ReferenceLine, ComposedChart, Scatter,
} from "recharts";



export const Route = createFileRoute("/")({
  component: IndexPage,
});

function IndexPage() {
  return <Navigate to="/welcome1" />;
}
// ─── Seeded RNG ───────────────────────────────────────────────────────────────
function rng(seed = 42) {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) & 0xffffffff;
    return (s >>> 0) / 0xffffffff;
  };
}

function buildHistory(seed = 42) {
  const r = rng(seed);
  return Array.from({ length: 30 }, (_, i) => {
    const mins = 29 - i;
    const spike = i === 18 || i === 22;
    return {
      t: mins === 0 ? "now" : `${mins}m`,
      throughput: Math.round(720 + r() * 360 + (spike ? 280 : 0)),
      p95: Math.round(95 + r() * 110 + (spike ? 180 : 0)),
      p50: Math.round(30 + r() * 42),
      errorRate: parseFloat((r() * 0.12 + (spike ? 0.18 : 0)).toFixed(3)),
      queueLag: Math.round(220 + r() * 1600 + (spike ? 1200 : 0)),
      cpuUtil: Math.round(35 + r() * 45 + (spike ? 25 : 0)),
      memUtil: Math.round(48 + r() * 30),
    };
  });
}

function clamp(v, min, max) { return Math.max(min, Math.min(max, v)); }

// ─── Live hooks ───────────────────────────────────────────────────────────────
function useLiveMetrics() {
  const [m, setM] = useState({
    eventsPerSec: 847, p95: 142, workersOnline: 92,
    errorRate: 0.034, throughput: 2.4, queueDepth: 1204,
    uptime: 99.992, cpuUtil: 62, memUtil: 71, activeTraces: 3241,
    openIncidents: 3, deployToday: 7, sloHealth: 98.7,
  });
  useEffect(() => {
    const id = setInterval(() => setM(p => ({
      eventsPerSec: clamp(p.eventsPerSec + (Math.random() - 0.48) * 30, 600, 1100),
      p95: clamp(p.p95 + (Math.random() - 0.5) * 8, 85, 260),
      workersOnline: clamp(p.workersOnline + (Math.random() > 0.88 ? (Math.random() > 0.5 ? 1 : -1) : 0), 88, 96),
      errorRate: clamp(p.errorRate + (Math.random() - 0.5) * 0.004, 0.009, 0.14),
      throughput: clamp(p.throughput + (Math.random() - 0.5) * 0.1, 1.6, 3.8),
      queueDepth: clamp(p.queueDepth + (Math.random() - 0.5) * 60, 700, 2500),
      uptime: 99.992,
      cpuUtil: clamp(p.cpuUtil + (Math.random() - 0.5) * 3, 38, 92),
      memUtil: clamp(p.memUtil + (Math.random() - 0.5) * 2, 48, 88),
      activeTraces: clamp(p.activeTraces + Math.round((Math.random() - 0.5) * 80), 2800, 3800),
      openIncidents: p.openIncidents,
      deployToday: p.deployToday,
      sloHealth: clamp(p.sloHealth + (Math.random() - 0.5) * 0.05, 97.2, 99.9),
    })), 1100);
    return () => clearInterval(id);
  }, []);
  return m;
}

function useLiveChart() {
  const [history, setHistory] = useState(() => buildHistory());
  useEffect(() => {
    const id = setInterval(() => {
      setHistory(prev => {
        const last = prev[prev.length - 1];
        const next = {
          t: "now",
          throughput: clamp(last.throughput + (Math.random() - 0.48) * 28, 600, 1100),
          p95: clamp(last.p95 + (Math.random() - 0.5) * 9, 85, 260),
          p50: clamp(last.p50 + (Math.random() - 0.5) * 4, 28, 90),
          errorRate: parseFloat(clamp(last.errorRate + (Math.random() - 0.5) * 0.005, 0.009, 0.14).toFixed(3)),
          queueLag: clamp(last.queueLag + (Math.random() - 0.5) * 65, 180, 2600),
          cpuUtil: clamp(last.cpuUtil + (Math.random() - 0.5) * 3, 38, 92),
          memUtil: clamp(last.memUtil + (Math.random() - 0.5) * 2, 48, 88),
        };
        return [...prev.slice(1).map((p, i, a) =>
          i < a.length - 1 ? { ...p, t: `${29 - i}m` } : { ...p, t: "1m" }
        ), next];
      });
    }, 1400);
    return () => clearInterval(id);
  }, []);
  return history;
}

// ─── Animated Counter ─────────────────────────────────────────────────────────
function Num({ v, dec = 0, prefix = "", suffix = "" }) {
  const [d, setD] = useState(v);
  const prev = useRef(v);
  useEffect(() => {
    const from = prev.current; const to = v;
    const dur = 420; const start = performance.now();
    const tick = now => {
      const t = Math.min((now - start) / dur, 1);
      const e = 1 - Math.pow(1 - t, 3);
      setD(from + (to - from) * e);
      if (t < 1) requestAnimationFrame(tick); else prev.current = to;
    };
    requestAnimationFrame(tick);
  }, [v]);
  return <>{prefix}{d.toFixed(dec)}{suffix}</>;
}

// ─── Sparkline ────────────────────────────────────────────────────────────────
function Sparkline({ color = "#22c55e", height = 28, filled = true }) {
  const [pts, setPts] = useState(() => Array.from({ length: 20 }, () => Math.random() * 70 + 15));
  useEffect(() => {
    const id = setInterval(() => setPts(p => [...p.slice(1), Math.random() * 70 + 15]), 950);
    return () => clearInterval(id);
  }, []);
  const w = 120; const h = height;
  const xs = pts.map((_, i) => (i / (pts.length - 1)) * w);
  const ys = pts.map(val => h - (val / 100) * h);
  const line = xs.map((x, i) => `${i === 0 ? "M" : "L"}${x.toFixed(1)},${ys[i].toFixed(1)}`).join(" ");
  const fill = `${line} L${w},${h} L0,${h} Z`;
  const gradId = `sp${color.replace(/[^a-z0-9]/gi, "")}`;
  return (
    <svg width={w} height={h} style={{ overflow: "visible", display: "block" }}>
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.28" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      {filled && <path d={fill} fill={`url(#${gradId})`} />}
      <path d={line} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ─── Tooltip ──────────────────────────────────────────────────────────────────
function DarkTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: "#09090b", border: "1px solid #27272a", borderRadius: 8, padding: "8px 12px", fontSize: 11, fontFamily: "JetBrains Mono, monospace" }}>
      <p style={{ color: "#52525b", marginBottom: 4, fontSize: 10 }}>{label}</p>
      {payload.map(p => (
        <p key={p.dataKey} style={{ color: p.stroke || p.fill, margin: "2px 0" }}>
          {p.name ?? p.dataKey}: <strong>{typeof p.value === "number" ? p.value.toFixed(p.value < 1 ? 3 : 0) : p.value}</strong>
        </p>
      ))}
    </div>
  );
}

// ─── Terminal Feed ────────────────────────────────────────────────────────────
const LOG_LINES = [
  { lvl: "INFO", msg: "span.complete svc=api-gateway trace_id=a3f9b2c dur=12ms status=200 region=us-east-1" },
  { lvl: "INFO", msg: "worker.heartbeat id=wrk-04 queue=events processed=1247 lag=0ms mem=312MB" },
  { lvl: "WARN", msg: "queue.lag topic=user-events lag=892ms threshold=500ms action=auto-scale" },
  { lvl: "INFO", msg: "deploy.success version=v2.4.1 env=prod canary=100% sha=f3a9c2b rollback=none" },
  { lvl: "INFO", msg: "trace.ingested spans=142 svc=checkout-svc sampled=true flags=sampled" },
  { lvl: "ERROR", msg: "worker.timeout id=wrk-07 queue=ml-inference elapsed=30s killed=true restart=pending" },
  { lvl: "INFO", msg: "alert.resolved name=p95_latency slo=99.9% duration=4m32s responder=autohealed" },
  { lvl: "INFO", msg: "slo.check svc=payments window=30d budget=87.2% burn=0.8x status=healthy" },
  { lvl: "WARN", msg: "model.drift feature=user_embedding delta=0.12 threshold=0.1 action=notify" },
  { lvl: "INFO", msg: "scaler.event workers=+2 queue=events reason=lag_threshold lag=892ms" },
  { lvl: "INFO", msg: "topology.discovered svc=inventory-svc edges=3 rps=188 p95=22ms" },
  { lvl: "WARN", msg: "latency.spike svc=checkout-svc p99=312ms slo_breach=imminent budget=4.2%" },
  { lvl: "INFO", msg: "ingestion.batch events=8192 topic=clickstream dur=48ms offset=109238472" },
  { lvl: "INFO", msg: "auth.login user=m.chen@acme.com role=sre ip=203.0.113.42 mfa=totp" },
  { lvl: "DEBUG", msg: "cache.hit key=svc:checkout-svc:slo ttl=58s ratio=94.2% hits=18291" },
];

function TerminalFeed() {
  const [logs, setLogs] = useState(() =>
    LOG_LINES.slice(0, 7).map((l, i) => ({
      ...l, id: i,
      ts: new Date(Date.now() - (7 - i) * 2800).toISOString().slice(11, 19),
    }))
  );
  const ref = useRef(null);
  const idx = useRef(7);
  useEffect(() => {
    const id = setInterval(() => {
      const t = LOG_LINES[idx.current % LOG_LINES.length];
      setLogs(p => [...p.slice(-11), { ...t, id: Date.now(), ts: new Date().toISOString().slice(11, 19) }]);
      idx.current++;
    }, 1650);
    return () => clearInterval(id);
  }, []);
  useEffect(() => { if (ref.current) ref.current.scrollTop = ref.current.scrollHeight; }, [logs]);
  const col = { INFO: "#22c55e", WARN: "#f59e0b", ERROR: "#ef4444", DEBUG: "#3b82f6" };
  return (
    <div ref={ref} style={{ height: 200, overflowY: "auto", fontFamily: "JetBrains Mono, monospace", fontSize: 10, lineHeight: "1.75" }}>
      {logs.map(l => (
        <div key={l.id} style={{ display: "flex", gap: 8 }}>
          <span style={{ color: "#3f3f46", flexShrink: 0, letterSpacing: "0.02em" }}>{l.ts}</span>
          <span style={{ color: col[l.lvl] ?? "#71717a", flexShrink: 0, fontWeight: 700, width: 42 }}>{l.lvl}</span>
          <span style={{ color: "#71717a" }}>{l.msg}</span>
        </div>
      ))}
    </div>
  );
}

// ─── Trace Waterfall ──────────────────────────────────────────────────────────
const SPANS = [
  { name: "api-gateway", start: 0, dur: 98, color: "#3b82f6", depth: 0 },
  { name: "auth-svc", start: 3, dur: 11, color: "#8b5cf6", depth: 1 },
  { name: "checkout-svc", start: 16, dur: 64, color: "#06b6d4", depth: 1 },
  { name: "inventory-svc", start: 20, dur: 28, color: "#10b981", depth: 2 },
  { name: "cache-lookup", start: 20, dur: 4, color: "#14b8a6", depth: 3 },
  { name: "payment-svc", start: 50, dur: 38, color: "#f59e0b", depth: 2 },
  { name: "stripe-api", start: 52, dur: 22, color: "#fb923c", depth: 3 },
  { name: "notif-svc", start: 86, dur: 10, color: "#ef4444", depth: 2 },
];

function TraceWaterfall() {
  const [prog, setProg] = useState(0);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setProg(p => p >= 1 ? 0 : p + 0.010), 35);
    return () => clearInterval(id);
  }, [paused]);
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
        <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 9, color: "#52525b", letterSpacing: "0.1em", textTransform: "uppercase" }}>
          TRACE · checkout-flow · 98ms
        </span>
        <button onClick={() => setPaused(p => !p)} style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}>
          {paused
            ? <Play size={10} color="#52525b" />
            : <Pause size={10} color="#52525b" />}
        </button>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        {SPANS.map(s => {
          const visible = prog * 100 >= s.start;
          const filled = Math.max(0, Math.min(1, (prog * 100 - s.start) / s.dur));
          return (
            <div key={s.name} style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{
                fontFamily: "JetBrains Mono, monospace", fontSize: 9.5, color: "#52525b",
                width: 88 + s.depth * 6, flexShrink: 0, overflow: "hidden",
                textOverflow: "ellipsis", whiteSpace: "nowrap",
                paddingLeft: s.depth * 8,
              }}>
                {s.depth > 0 && <span style={{ color: "#27272a" }}>{"└ "}</span>}{s.name}
              </span>
              <div style={{ flex: 1, height: 12, background: "#18181b", borderRadius: 2, overflow: "hidden", position: "relative" }}>
                {visible && (
                  <div style={{
                    position: "absolute", left: `${s.start}%`,
                    width: `${s.dur * filled}%`, height: "100%",
                    background: s.color, borderRadius: 2, opacity: 0.85,
                  }} />
                )}
              </div>
              <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 9, color: "#3f3f46", width: 30, textAlign: "right" }}>
                {s.dur}ms
              </span>
            </div>
          );
        })}
      </div>
      <div style={{ display: "flex", gap: 1, marginTop: 8, height: 2, borderRadius: 1, overflow: "hidden", background: "#18181b" }}>
        <div style={{ width: `${prog * 100}%`, background: "linear-gradient(90deg, #3b82f6, #06b6d4)", transition: "none" }} />
      </div>
    </div>
  );
}

// ─── Service Topology ─────────────────────────────────────────────────────────
const TOPO_NODES = [
  { id: "cdn", label: "CDN", sub: "Edge", x: 52, y: 170, status: "healthy", icon: "⬡" },
  { id: "gw", label: "api-gateway", sub: "847 rps", x: 172, y: 170, status: "healthy", icon: "◈" },
  { id: "auth", label: "auth-svc", sub: "312 rps", x: 300, y: 80, status: "healthy", icon: "◎" },
  { id: "checkout", label: "checkout", sub: "428 rps", x: 300, y: 220, status: "warning", icon: "◈" },
  { id: "inventory", label: "inventory", sub: "188 rps", x: 440, y: 100, status: "healthy", icon: "◫" },
  { id: "payment", label: "payment-svc", sub: "214 rps", x: 440, y: 248, status: "healthy", icon: "◈" },
  { id: "notif", label: "notif-svc", sub: "98 rps", x: 580, y: 155, status: "healthy", icon: "◎" },
  { id: "db", label: "postgres", sub: "156 qps", x: 580, y: 280, status: "healthy", icon: "◫" },
  { id: "redis", label: "redis", sub: "1.2k ops", x: 440, y: 330, status: "healthy", icon: "⬡" },
];
const TOPO_EDGES = [
  { from: "cdn", to: "gw", rps: 847, err: false, dur: "1.8s" },
  { from: "gw", to: "auth", rps: 312, err: false, dur: "2.4s" },
  { from: "gw", to: "checkout", rps: 428, err: true, dur: "1.9s" },
  { from: "checkout", to: "inventory", rps: 188, err: false, dur: "3.0s" },
  { from: "checkout", to: "payment", rps: 214, err: false, dur: "2.6s" },
  { from: "checkout", to: "redis", rps: 420, err: false, dur: "0.9s" },
  { from: "payment", to: "notif", rps: 98, err: false, dur: "3.8s" },
  { from: "payment", to: "db", rps: 156, err: false, dur: "1.7s" },
  { from: "inventory", "to": "redis", rps: 380, err: false, dur: "1.1s" },
];
const STATUS_CLR = { healthy: "#22c55e", warning: "#f59e0b", error: "#ef4444" };

function TopologyGraph() {
  const nm = Object.fromEntries(TOPO_NODES.map(n => [n.id, n]));
  return (
    <div style={{ overflowX: "auto" }}>
      <svg viewBox="0 0 660 370" style={{ width: "100%", minWidth: 520, fontFamily: "JetBrains Mono, monospace" }}>
        <defs>
          <marker id="arr" markerWidth="5" markerHeight="5" refX="4.5" refY="2.5" orient="auto">
            <path d="M0,0 L5,2.5 L0,5 Z" fill="#3f3f46" />
          </marker>
          <marker id="arr-w" markerWidth="5" markerHeight="5" refX="4.5" refY="2.5" orient="auto">
            <path d="M0,0 L5,2.5 L0,5 Z" fill="#f59e0b" />
          </marker>
          {TOPO_EDGES.map((e, i) => (
            <path key={`p${i}`} id={`ep${i}`}
              d={`M${nm[e.from].x},${nm[e.from].y} L${nm[e.to].x},${nm[e.to].y}`}
              fill="none" />
          ))}
        </defs>

        {/* Grid dots */}
        {Array.from({ length: 12 }, (_, r) =>
          Array.from({ length: 18 }, (_, c) => (
            <circle key={`d${r}${c}`} cx={c * 40 + 10} cy={r * 30 + 15} r={0.8} fill="#27272a" />
          ))
        )}

        {/* Edges */}
        {TOPO_EDGES.map((e, i) => {
          const f = nm[e.from]; const t = nm[e.to];
          const mx = (f.x + t.x) / 2; const my = (f.y + t.y) / 2;
          const ec = e.err ? "#f59e0b" : "#3f3f46";
          return (
            <g key={`edge${i}`}>
              <line x1={f.x} y1={f.y} x2={t.x} y2={t.y}
                stroke={ec} strokeWidth={e.err ? 1.5 : 1}
                strokeDasharray={e.err ? "5 3" : undefined}
                markerEnd={e.err ? "url(#arr-w)" : "url(#arr)"}
                opacity={0.55} />
              <rect x={mx - 15} y={my - 7} width={30} height={13} rx={3}
                fill="#0f0f10" stroke="#27272a" strokeWidth={0.5} />
              <text x={mx} y={my + 3} textAnchor="middle" fontSize={7.5}
                fill={e.err ? "#f59e0b" : "#52525b"}>{e.rps}</text>
              <circle r={2.5} fill={ec} opacity={0.9}>
                <animateMotion dur={e.dur} repeatCount="indefinite">
                  <mpath href={`#ep${i}`} />
                </animateMotion>
              </circle>
            </g>
          );
        })}

        {/* Nodes */}
        {TOPO_NODES.map(n => {
          const sc = STATUS_CLR[n.status];
          return (
            <g key={n.id} style={{ cursor: "pointer" }}>
              {n.status === "warning" && (
                <circle cx={n.x} cy={n.y} r={26} fill="none" stroke="#f59e0b" strokeWidth={1} opacity={0.25}>
                  <animate attributeName="r" values="26;33;26" dur="2.2s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.25;0;0.25" dur="2.2s" repeatCount="indefinite" />
                </circle>
              )}
              {/* Outer ring */}
              <circle cx={n.x} cy={n.y} r={22} fill="#111113" stroke={sc} strokeWidth={n.status === "warning" ? 1.5 : 0.8} />
              {/* Inner bg */}
              <circle cx={n.x} cy={n.y} r={18} fill="#18181b" />
              {/* Status dot */}
              <circle cx={n.x + 14} cy={n.y - 14} r={3.5} fill={sc}>
                {n.status === "healthy" && <animate attributeName="opacity" values="1;0.3;1" dur="2.5s" repeatCount="indefinite" />}
              </circle>
              <text x={n.x} y={n.y + 2} textAnchor="middle" fontSize={8} fontWeight="600" fill="#e4e4e7">{n.label}</text>
              <text x={n.x} y={n.y + 12.5} textAnchor="middle" fontSize={7} fill="#52525b">{n.sub}</text>
            </g>
          );
        })}

        {/* Legend */}
        <g transform="translate(12, 346)">
          {[["#22c55e", "healthy"], ["#f59e0b", "degraded"], ["#ef4444", "error"]].map(([c, l], i) => (
            <g key={l} transform={`translate(${i * 80}, 0)`}>
              <circle cx={5} cy={5} r={4} fill="none" stroke={c} strokeWidth={1} />
              <text x={13} y={9} fontSize={8} fill="#52525b">{l}</text>
            </g>
          ))}
        </g>
      </svg>
    </div>
  );
}

// ─── SLO Gauge ────────────────────────────────────────────────────────────────
function SLOGauge({ value = 99.2, target = 99.9, label = "payments-svc" }) {
  const pct = value / 100;
  const radius = 42;
  const circumference = Math.PI * radius; // semicircle
  const strokeDashoffset = circumference * (1 - pct);
  const ok = value >= target;
  const color = ok ? "#22c55e" : value >= 99 ? "#f59e0b" : "#ef4444";
  return (
    <div style={{ textAlign: "center" }}>
      <svg width={110} height={65} viewBox="0 0 110 65">
        <path d="M 10,58 A 45,45 0 0,1 100,58" fill="none" stroke="#27272a" strokeWidth={8} strokeLinecap="round" />
        <path d="M 10,58 A 45,45 0 0,1 100,58"
          fill="none" stroke={color} strokeWidth={8} strokeLinecap="round"
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={strokeDashoffset}
          style={{ transition: "stroke-dashoffset 0.8s cubic-bezier(0.4,0,0.2,1)" }} />
        <text x="55" y="50" textAnchor="middle" fontSize="13" fontWeight="700" fill="#f4f4f5"
          fontFamily="JetBrains Mono, monospace">{value.toFixed(2)}%</text>
      </svg>
      <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 9, color: "#52525b", marginTop: -4 }}>{label}</div>
      <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 8, color: ok ? "#22c55e" : "#f59e0b", marginTop: 2 }}>
        {ok ? "✓ WITHIN SLO" : "⚠ BREACH RISK"} · target {target}%
      </div>
    </div>
  );
}

// ─── Incident Timeline ────────────────────────────────────────────────────────
const INCIDENTS = [
  { id: "INC-1024", sev: "P2", title: "checkout-svc p99 elevated", opened: "14m ago", status: "investigating", svc: "checkout", color: "#f59e0b" },
  { id: "INC-1021", sev: "P3", title: "queue lag above threshold", opened: "2h ago", status: "mitigated", svc: "queues", color: "#3b82f6" },
  { id: "INC-1018", sev: "P1", title: "payment-svc 500 burst", opened: "1d ago", status: "resolved", svc: "payments", color: "#22c55e" },
];

function IncidentPanel() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      {INCIDENTS.map(inc => (
        <div key={inc.id} style={{
          display: "flex", alignItems: "center", gap: 10,
          background: "#111113", borderRadius: 8, padding: "8px 10px",
          border: "1px solid #1f1f22",
        }}>
          <span style={{
            fontFamily: "JetBrains Mono, monospace", fontSize: 9.5, fontWeight: 700,
            color: inc.sev === "P1" ? "#ef4444" : inc.sev === "P2" ? "#f59e0b" : "#3b82f6",
            background: inc.sev === "P1" ? "#ef444414" : inc.sev === "P2" ? "#f59e0b14" : "#3b82f614",
            padding: "2px 6px", borderRadius: 4, flexShrink: 0,
          }}>{inc.sev}</span>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 10, color: "#e4e4e7", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{inc.title}</div>
            <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 9, color: "#52525b", marginTop: 1 }}>{inc.id} · {inc.opened} · {inc.svc}</div>
          </div>
          <span style={{
            fontFamily: "JetBrains Mono, monospace", fontSize: 8.5, flexShrink: 0,
            color: inc.color, background: `${inc.color}18`, padding: "2px 7px", borderRadius: 3,
          }}>{inc.status}</span>
        </div>
      ))}
    </div>
  );
}

// ─── Deploy Heatmap ────────────────────────────────────────────────────────────
const DEPLOYS = [
  { time: "09:12", svc: "api-gateway", ver: "v2.4.1", ok: true, dur: "3m12s" },
  { time: "10:48", svc: "checkout-svc", ver: "v1.9.3", ok: true, dur: "2m44s" },
  { time: "11:22", svc: "auth-svc", ver: "v3.1.0", ok: true, dur: "1m58s" },
  { time: "13:05", svc: "payment-svc", ver: "v2.2.1", ok: false, dur: "4m11s" },
  { time: "13:41", svc: "payment-svc", ver: "v2.2.2", ok: true, dur: "2m50s" },
  { time: "14:18", svc: "notif-svc", ver: "v1.4.0", ok: true, dur: "1m30s" },
  { time: "15:02", svc: "inventory", ver: "v1.6.1", ok: true, dur: "2m18s" },
];

function DeployTimeline() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
      {DEPLOYS.map((d, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 9.5, color: "#3f3f46", width: 38, flexShrink: 0 }}>{d.time}</span>
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: d.ok ? "#22c55e" : "#ef4444", flexShrink: 0 }} />
          <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 9.5, color: "#71717a", flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            {d.svc} <span style={{ color: "#3f3f46" }}>{d.ver}</span>
          </span>
          <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 9, color: "#3f3f46", flexShrink: 0 }}>{d.dur}</span>
        </div>
      ))}
    </div>
  );
}

// ─── MLOps drift chart ────────────────────────────────────────────────────────
function buildDriftData() {
  const r = rng(77);
  return Array.from({ length: 14 }, (_, i) => ({
    day: `d${i + 1}`,
    drift: parseFloat((0.02 + r() * 0.15 + (i > 10 ? 0.08 : 0)).toFixed(3)),
    threshold: 0.10,
  }));
}

// ─── Queue Inspector ──────────────────────────────────────────────────────────
const QUEUES = [
  { name: "user-events", lag: 892, depth: 14822, throughput: 847, dlq: 2, status: "warn" },
  { name: "checkout-flow", lag: 44, depth: 892, throughput: 428, dlq: 0, status: "healthy" },
  { name: "ml-inference", lag: 3201, depth: 41080, throughput: 122, dlq: 18, status: "critical" },
  { name: "notifications", lag: 12, depth: 204, throughput: 98, dlq: 0, status: "healthy" },
  { name: "payment-events", lag: 28, depth: 512, throughput: 214, dlq: 1, status: "healthy" },
];

const STATUS_BADGE_CLR = {
  healthy: { bg: "#22c55e14", text: "#22c55e" },
  warn: { bg: "#f59e0b14", text: "#f59e0b" },
  critical: { bg: "#ef444414", text: "#ef4444" },
};

// ─── Section Label ────────────────────────────────────────────────────────────
function SLabel({ children }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
      <span style={{ width: 20, height: 1, background: "linear-gradient(90deg, #3b82f6, transparent)" }} />
      <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.12em", color: "#3b82f6" }}>
        {children}
      </span>
    </div>
  );
}

// ─── Chip ─────────────────────────────────────────────────────────────────────
function Chip({ label, icon: Icon }) {
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 5,
      borderRadius: 100, border: "1px solid #27272a", background: "#111113",
      padding: "4px 12px", fontSize: 11.5, color: "#71717a",
      fontFamily: "JetBrains Mono, monospace", cursor: "default",
      transition: "all 0.15s",
    }}>
      {Icon && <Icon size={11} />}
      {label}
    </span>
  );
}

// ─── Feature card ─────────────────────────────────────────────────────────────
function FeatureCard({ icon: Icon, title, desc, badge, color, tags = [] }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        position: "relative", borderRadius: 16,
        border: `1px solid ${hov ? "#2e2e32" : "#1c1c1f"}`,
        background: hov ? "#111113" : "#0d0d0f",
        padding: 22, overflow: "hidden",
        transition: "all 0.25s cubic-bezier(0.4,0,0.2,1)",
        cursor: "default",
      }}
    >
      <div style={{
        position: "absolute", inset: 0, opacity: hov ? 1 : 0,
        background: `radial-gradient(circle at 50% 0%, ${color}0a, transparent 60%)`,
        transition: "opacity 0.4s",
      }} />
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 14, position: "relative" }}>
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "center",
          width: 36, height: 36, borderRadius: 10,
          background: `${color}12`, border: `1px solid ${color}22`,
        }}>
          <Icon size={16} color={color} />
        </div>
        <span style={{
          fontFamily: "JetBrains Mono, monospace", fontSize: 9.5,
          background: "#18181b", border: "1px solid #27272a",
          color: "#52525b", padding: "2px 8px", borderRadius: 100,
        }}>{badge}</span>
      </div>
      <div style={{ position: "relative" }}>
        <h3 style={{ fontSize: 13, fontWeight: 600, color: "#f4f4f5", margin: "0 0 6px" }}>{title}</h3>
        <p style={{ fontSize: 11.5, color: "#52525b", lineHeight: 1.65, margin: 0 }}>{desc}</p>
        {tags.length > 0 && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginTop: 12 }}>
            {tags.map(t => (
              <span key={t} style={{
                fontFamily: "JetBrains Mono, monospace", fontSize: 9,
                color: "#3f3f46", background: "#18181b",
                padding: "2px 7px", borderRadius: 3, border: "1px solid #27272a",
              }}>{t}</span>
            ))}
          </div>
        )}
        <div style={{
          display: "flex", alignItems: "center", gap: 3,
          marginTop: 14, fontSize: 11, color: hov ? color : "#3f3f46",
          transition: "color 0.2s",
        }}>
          View docs <ChevronRight size={10} />
        </div>
      </div>
    </div>
  );
}

// ─── Data constants ───────────────────────────────────────────────────────────
const FEATURES = [
  { icon: Workflow, title: "Distributed Tracing", desc: "Span-level waterfalls with deep-linking to logs and metrics. OpenTelemetry-native ingestion, head + tail sampling.", badge: "Core", color: "#3b82f6", tags: ["otlp", "jaeger", "w3c-trace"] },
  { icon: BarChart2, title: "Realtime Analytics", desc: "Streaming throughput, latency percentiles and cardinality breakdowns at 1-second resolution with automatic rollups.", badge: "Core", color: "#8b5cf6", tags: ["p50", "p95", "p99", "hdr"] },
  { icon: Network, title: "Service Topology", desc: "Auto-discovered dependency graph with live RPS and error-rate edges. Click any node for instant service context.", badge: "Core", color: "#06b6d4", tags: ["ebpf", "otel", "graphviz"] },
  { icon: Bell, title: "Alerting & Incidents", desc: "SLO-aware alerts, on-call rotations, RCA timelines and post-mortems. PagerDuty, Opsgenie and Slack native.", badge: "Ops", color: "#f59e0b", tags: ["slo", "error-budget", "mttr"] },
  { icon: GitBranch, title: "Deployment Intelligence", desc: "Correlate every deploy with traffic, errors and latency. One-click rollback with git-native diff views.", badge: "Ops", color: "#10b981", tags: ["gitops", "canary", "rollback"] },
  { icon: Sparkles, title: "MLOps Observability", desc: "Model drift, feature distribution and inference latency tracking for AI workloads at production scale.", badge: "AI", color: "#ec4899", tags: ["drift", "psi", "inference"] },
  { icon: Database, title: "Queue Inspector", desc: "Per-topic lag, DLQ size and consumer group health. Kafka, SQS, Pub/Sub, Redis Streams — unified view.", badge: "Infra", color: "#f97316", tags: ["kafka", "sqs", "pubsub"] },
  { icon: Terminal, title: "Log Explorer", desc: "Full-text search over structured logs with faceted filtering, saved queries, query history and live tail.", badge: "Core", color: "#14b8a6", tags: ["lucene", "jsonpath", "regex"] },
  { icon: Globe, title: "Synthetic Monitors", desc: "Multi-region uptime checks, scripted browser flows and API contract validation on a configurable schedule.", badge: "Platform", color: "#6366f1", tags: ["playwright", "k6", "sla"] },
  { icon: MonitorCheck, title: "API Monitoring", desc: "Per-endpoint latency, error breakdown and request volume. Threshold alerting with SLO budget tracking.", badge: "Platform", color: "#a78bfa", tags: ["rest", "grpc", "graphql"] },
  { icon: FlaskConical, title: "Canary Analysis", desc: "Automated baseline vs canary comparison on latency, errors and business metrics. Rollback at confidence threshold.", badge: "Ops", color: "#34d399", tags: ["spinnaker", "argo", "regression"] },
  { icon: Webhook, title: "Integrations Hub", desc: "150+ connectors for ticketing, alerting, SCM, CI/CD and identity providers. Bidirectional webhook fanout.", badge: "Platform", color: "#fb7185", tags: ["rest", "graphql", "webhook"] },
];

const INTEGRATIONS = [
  "Apache Kafka", "AWS SQS", "GCP Pub/Sub", "Redis Streams", "RabbitMQ", "NATS JetStream",
  "Prometheus", "OpenTelemetry", "Jaeger", "Grafana", "PagerDuty", "Opsgenie",
  "Slack", "Microsoft Teams", "Datadog", "New Relic", "Sentry", "GitHub",
  "GitLab", "ArgoCD", "Terraform", "Jira", "Linear", "SAML SSO",
  "AWS CloudWatch", "GCP Monitoring", "Azure Monitor", "Splunk", "Elastic APM",
];

const TESTIMONIALS = [
  {
    name: "Riya Desai", role: "Staff SRE @ Stripe", initials: "RD", color: "#3b82f6",
    body: "We replaced three separate observability tools with Pulse. The service topology alone saved us hours during our last P0 incident. The permission model is exactly what we needed for a 200-person eng org."
  },
  {
    name: "Marcus Chen", role: "Engineering Lead @ Vercel", initials: "MC", color: "#8b5cf6",
    body: "The MLOps observability is genuinely the best I've seen. We caught a feature distribution drift in production before it affected a single user. Took 45 minutes to set up from scratch."
  },
  {
    name: "Anya Kowalski", role: "Platform Eng @ Linear", initials: "AK", color: "#10b981",
    body: "Deployment intelligence changed how we ship. Correlating every deploy with latency changes in realtime meant our last three releases had zero surprise regressions. The SLO error budget dashboard is chef's kiss."
  },
  {
    name: "James Liu", role: "Principal SWE @ Figma", initials: "JL", color: "#f59e0b",
    body: "The command palette alone is worth the switch. ⌘K for anything across traces, logs, deployments — it's the product I wanted to build internally but never had bandwidth for. We migrated in a week."
  },
];

const PERMISSIONS = [
  { label: "view:dashboard", sa: true, ad: true, sr: true, dev: true, vi: true },
  { label: "view:events", sa: true, ad: true, sr: true, dev: true, vi: true },
  { label: "view:traces", sa: true, ad: true, sr: true, dev: true, vi: true },
  { label: "view:logs", sa: true, ad: true, sr: true, dev: true, vi: true },
  { label: "view:topology", sa: true, ad: true, sr: true, dev: true, vi: true },
  { label: "view:deployments", sa: true, ad: true, sr: true, dev: true, vi: false },
  { label: "view:mlops", sa: true, ad: true, sr: true, dev: true, vi: false },
  { label: "view:queues", sa: true, ad: true, sr: true, dev: true, vi: true },
  { label: "manage:incidents", sa: true, ad: true, sr: true, dev: true, vi: false },
  { label: "manage:alerts", sa: true, ad: true, sr: true, dev: false, vi: false },
  { label: "manage:deployments", sa: true, ad: true, sr: true, dev: false, vi: false },
  { label: "manage:queues", sa: true, ad: false, sr: true, dev: false, vi: false },
  { label: "manage:workers", sa: true, ad: false, sr: true, dev: false, vi: false },
  { label: "manage:users", sa: true, ad: true, sr: false, dev: false, vi: false },
  { label: "manage:billing", sa: true, ad: true, sr: false, dev: false, vi: false },
  { label: "manage:settings", sa: true, ad: true, sr: false, dev: false, vi: false },
  { label: "manage:api_keys", sa: true, ad: true, sr: false, dev: false, vi: false },
  { label: "manage:org", sa: true, ad: false, sr: false, dev: false, vi: false },
];

const ROLES = [
  {
    key: "sa", name: "Super Admin", icon: ShieldCheck, color: "#ef4444",
    perms: ["All permissions", "Org & billing", "API keys + SSO", "Audit log"]
  },
  {
    key: "ad", name: "Admin", icon: Lock, color: "#f97316",
    perms: ["Manage users", "Manage settings", "Manage alerts", "Billing read"]
  },
  {
    key: "sr", name: "SRE", icon: Server, color: "#3b82f6",
    perms: ["Manage incidents", "Manage deploys", "Manage queues", "On-call config"]
  },
  {
    key: "dev", name: "Developer", icon: Terminal, color: "#10b981",
    perms: ["View observability", "Open incidents", "Inspect traces", "Annotations"]
  },
  {
    key: "vi", name: "Viewer", icon: Eye, color: "#71717a",
    perms: ["Dashboards", "Alerts feed", "Service health", "Incident read"]
  },
];

const TECH_STACK = [
  { name: "TanStack Start", icon: Rocket, cat: "Framework" },
  { name: "React 19", icon: Code2, cat: "UI" },
  { name: "TypeScript", icon: ShieldCheck, cat: "strict mode" },
  { name: "Tailwind 4", icon: Sparkles, cat: "Styles" },
  { name: "shadcn/ui", icon: Layers, cat: "Components" },
  { name: "Zustand", icon: Database, cat: "State" },
  { name: "TanStack Query", icon: Zap, cat: "Cache" },
  { name: "TanStack Table", icon: BarChart2, cat: "Data" },
  { name: "Recharts", icon: TrendingUp, cat: "Charts" },
  { name: "JetBrains Mono", icon: Terminal, cat: "Typography" },
  { name: "OpenTelemetry", icon: Network, cat: "Observability" },
  { name: "WebSocket/SSE", icon: Radio, cat: "Realtime" },
];

const PROGRESS_MATRIX = [
  ["01", "Marketing landing (/welcome)", true],
  ["02", "Enterprise auth UI", true],
  ["03", "5-role RBAC", true],
  ["04", "Role-based dashboards", true],
  ["05", "Sidebar permission filtering", true],
  ["06", "Command palette (⌘K)", true],
  ["07", "Right-side inspector drawer", true],
  ["08", "Global time-range selector", true],
  ["09", "Realtime dashboard", true],
  ["10", "Events explorer", true],
  ["11", "Distributed traces + waterfall", true],
  ["12", "Log explorer + live tail", true],
  ["13", "Service topology SVG", true],
  ["14", "Service health + SLOs", true],
  ["15", "Queues & workers", true],
  ["16", "API monitoring", true],
  ["17", "Alerts + acknowledge workflow", true],
  ["18", "Incidents + RCA timeline", true],
  ["19", "Deployments + rollback", true],
  ["20", "MLOps — drift + inference", true],
  ["21", "Audit log", true],
  ["22", "Organizations + workspaces", true],
  ["23", "Settings — API keys + SSO", true],
  ["24", "Notification center", true],
  ["25", "Mocked realtime engine", true],
  ["26", "Backend-ready abstraction", true],
];

// ─── Scroll reveal hook ────────────────────────────────────────────────────────
function useVisible(ref) {
  const [vis, setVis] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const ob = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); ob.disconnect(); } }, { threshold: 0.1 });
    ob.observe(ref.current);
    return () => ob.disconnect();
  }, []);
  return vis;
}

function FadeIn({ children, delay = 0 }) {
  const ref = useRef(null);
  const vis = useVisible(ref);
  return (
    <div ref={ref} style={{
      opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(18px)",
      transition: `opacity 0.55s ${delay}ms cubic-bezier(0.4,0,0.2,1), transform 0.55s ${delay}ms cubic-bezier(0.4,0,0.2,1)`,
    }}>{children}</div>
  );
}

// ─── Nav ──────────────────────────────────────────────────────────────────────
const NAV_LINKS = ["Features", "Topology", "SLOs", "Incidents", "Queues", "MLOps", "Pricing", "Roadmap"];

// ─── Main Component ───────────────────────────────────────────────────────────
export default function PulseWelcome() {
  const metrics = useLiveMetrics();
  const chartData = useLiveChart();
  const [activeT, setActiveT] = useState(0);
  const [activeRole, setActiveRole] = useState("sa");
  const [mobileNav, setMobileNav] = useState(false);
  const [copied, setCopied] = useState(false);
  const driftData = useMemo(() => buildDriftData(), []);

  useEffect(() => {
    const id = setInterval(() => setActiveT(t => (t + 1) % TESTIMONIALS.length), 5500);
    return () => clearInterval(id);
  }, []);

  const handleCopy = useCallback(() => {
    navigator.clipboard?.writeText("npx @pulse/cli init").then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, []);

  // Theme vars
  const C = {
    bg: "#080809",
    surface: "#0f0f11",
    surface2: "#131315",
    border: "#1c1c1f",
    border2: "#222224",
    text: "#f4f4f5",
    muted: "#71717a",
    subtle: "#52525b",
    faint: "#3f3f46",
    blue: "#3b82f6",
    purple: "#8b5cf6",
    cyan: "#06b6d4",
    green: "#22c55e",
    amber: "#f59e0b",
    red: "#ef4444",
    pink: "#ec4899",
    orange: "#f97316",
    teal: "#14b8a6",
    indigo: "#6366f1",
  };

  const cs = { // card style
    borderRadius: 16, border: `1px solid ${C.border}`,
    background: C.surface, overflow: "hidden",
  };

  return (
    <div style={{ background: C.bg, color: C.text, fontFamily: "system-ui, -apple-system, sans-serif", lineHeight: 1.6, minHeight: "100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::selection { background: rgba(59,130,246,0.32); }
        ::-webkit-scrollbar { width: 3px; height: 3px; }
        ::-webkit-scrollbar-thumb { background: #3f3f46; border-radius: 2px; }
        ::-webkit-scrollbar-track { background: transparent; }
        @keyframes pulse-ring { 0%,100%{opacity:.6} 50%{opacity:.15} }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.3} }
        @keyframes marquee { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
        @keyframes fadeSlideUp { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }
        a { text-decoration: none; color: inherit; }
        button { font-family: inherit; }
        .sr-only { position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);border:0 }
      `}</style>

      {/* Ambient background blobs */}
      <div aria-hidden style={{ position: "fixed", inset: 0, pointerEvents: "none", overflow: "hidden", zIndex: 0 }}>
        <div style={{ position: "absolute", top: -300, left: "30%", width: 800, height: 700, borderRadius: "50%", background: "radial-gradient(ellipse, rgba(59,130,246,0.055) 0%, transparent 70%)" }} />
        <div style={{ position: "absolute", top: "55%", right: -200, width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(ellipse, rgba(139,92,246,0.04) 0%, transparent 70%)" }} />
        <div style={{ position: "absolute", bottom: "10%", left: -100, width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(ellipse, rgba(6,182,212,0.035) 0%, transparent 70%)" }} />
        {/* Dot grid */}
        <svg width="100%" height="100%" style={{ position: "absolute", inset: 0, opacity: 0.4 }}>
          <defs>
            <pattern id="dots" x="0" y="0" width="28" height="28" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="0.8" fill="#27272a" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dots)" />
        </svg>
      </div>

      {/* ── STICKY NAV ── */}
      <header style={{
        position: "sticky", top: 0, zIndex: 100,
        borderBottom: `1px solid ${C.border}`,
        background: "rgba(8,8,9,0.82)", backdropFilter: "blur(20px)",
      }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px", height: 56, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          {/* Logo */}
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{
              width: 30, height: 30, borderRadius: 8,
              background: "linear-gradient(135deg, #3b82f6, #06b6d4)",
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "0 0 20px rgba(59,130,246,0.3)",
            }}>
              <Activity size={16} color="#fff" strokeWidth={2.5} />
            </div>
            <span style={{ fontWeight: 700, fontSize: 15, letterSpacing: "-0.02em", color: C.text }}>Pulse</span>
            <span style={{
              fontFamily: "JetBrains Mono, monospace", fontSize: 9.5,
              border: `1px solid ${C.border}`, background: C.surface,
              color: C.faint, padding: "2px 7px", borderRadius: 4,
            }}>v2.4.1</span>
          </div>

          {/* Nav links */}
          <nav style={{ display: "flex", gap: 28, alignItems: "center" }}>
            {NAV_LINKS.map(l => (
              <a key={l} href={`#${l.toLowerCase()}`}
                style={{ fontSize: 12.5, color: C.subtle, transition: "color 0.15s" }}
                onMouseEnter={e => e.target.style.color = C.text}
                onMouseLeave={e => e.target.style.color = C.subtle}>
                {l}
              </a>
            ))}
          </nav>

          {/* CTA */}
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <a href="#" style={{
              fontSize: 12.5, color: C.muted, padding: "5px 14px",
              borderRadius: 7, transition: "all 0.15s",
            }}
              onMouseEnter={e => { e.currentTarget.style.background = C.surface; e.currentTarget.style.color = C.text; }}
              onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = C.muted; }}>
              Sign in
            </a>
            <a href="#" style={{
              fontSize: 12.5, fontWeight: 600, color: "#fff",
              background: "linear-gradient(135deg, #3b82f6, #06b6d4)",
              padding: "6px 16px", borderRadius: 7,
              display: "flex", alignItems: "center", gap: 5,
              boxShadow: "0 4px 14px rgba(59,130,246,0.28)",
              transition: "transform 0.15s, box-shadow 0.15s",
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.boxShadow = "0 6px 20px rgba(59,130,246,0.38)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = "0 4px 14px rgba(59,130,246,0.28)"; }}>
              Open console <ArrowRight size={12} />
            </a>
          </div>
        </div>

        {/* System status bar */}
        <div style={{
          background: C.surface, borderTop: `1px solid ${C.border}`,
          padding: "4px 24px", display: "flex", alignItems: "center", gap: 20,
          justifyContent: "space-between", fontSize: 10.5,
          fontFamily: "JetBrains Mono, monospace",
        }}>
          <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
            <span style={{ display: "flex", alignItems: "center", gap: 5, color: C.green }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: C.green, animation: "pulse-ring 2s infinite" }} />
              All systems operational
            </span>
            <span style={{ color: C.faint }}>us-east-1 · us-west-2 · eu-central-1</span>
          </div>
          <div style={{ display: "flex", gap: 16, color: C.faint }}>
            <span>events/s: <span style={{ color: C.text }}><Num v={Math.round(metrics.eventsPerSec)} /></span></span>
            <span>p95: <span style={{ color: C.text }}><Num v={Math.round(metrics.p95)} />ms</span></span>
            <span>workers: <span style={{ color: C.text }}><Num v={Math.round(metrics.workersOnline)} />/96</span></span>
            <span>uptime: <span style={{ color: C.green }}>99.992%</span></span>
          </div>
        </div>
      </header>

      {/* ── HERO ── */}
      <section style={{ position: "relative", zIndex: 1, borderBottom: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "72px 24px 56px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 56, alignItems: "start" }}>

            {/* Hero copy */}
            <div>
              {/* Live badge */}
              <div style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                border: "1px solid rgba(34,197,94,0.22)", background: "rgba(34,197,94,0.06)",
                borderRadius: 100, padding: "4px 14px 4px 10px",
                fontSize: 11, fontFamily: "JetBrains Mono, monospace", color: C.green,
                marginBottom: 24,
              }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: C.green, flexShrink: 0, animation: "blink 2s infinite" }} />
                cluster · us-east-1 · 99.992% uptime ·{" "}
                <Num v={Math.round(metrics.eventsPerSec)} /> ev/s ingesting
              </div>

              <h1 style={{ fontSize: 52, fontWeight: 800, lineHeight: 1.05, letterSpacing: "-0.035em", marginBottom: 20 }}>
                <span style={{ display: "block", color: C.text }}>Observability for</span>
                <span style={{ display: "block", color: C.text }}>distributed pipelines.</span>
                <span style={{
                  display: "block",
                  background: "linear-gradient(135deg, #3b82f6 0%, #06b6d4 50%, #8b5cf6 100%)",
                  WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                  backgroundClip: "text", marginTop: 4,
                }}>Built for engineers.</span>
              </h1>

              <p style={{ fontSize: 15, color: C.muted, lineHeight: 1.7, maxWidth: 460, marginBottom: 32 }}>
                Traces, logs, metrics, queues, workers, deployments, incidents and MLOps in one engineering-grade console.{" "}
                <strong style={{ color: C.subtle }}>26 features shipped.</strong> Production-ready from day one.
              </p>

              {/* CTA buttons */}
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 32 }}>
                <a href="#" style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  background: "linear-gradient(135deg, #3b82f6, #06b6d4)",
                  color: "#fff", fontWeight: 600, fontSize: 13.5,
                  padding: "10px 22px", borderRadius: 9,
                  boxShadow: "0 4px 20px rgba(59,130,246,0.32)",
                  transition: "transform 0.15s, box-shadow 0.15s",
                }}
                  onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.boxShadow = "0 8px 28px rgba(59,130,246,0.42)"; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = "0 4px 20px rgba(59,130,246,0.32)"; }}>
                  Launch console <ArrowRight size={14} />
                </a>
                <a href="#" style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  border: `1px solid ${C.border2}`, background: C.surface,
                  color: C.muted, fontSize: 13.5, fontWeight: 500,
                  padding: "10px 22px", borderRadius: 9, transition: "all 0.15s",
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = C.faint; e.currentTarget.style.color = C.text; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = C.border2; e.currentTarget.style.color = C.muted; }}>
                  <Github size={14} /> Source
                </a>
                <a href="#" style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  border: `1px solid ${C.border2}`, background: "transparent",
                  color: C.muted, fontSize: 13.5,
                  padding: "10px 22px", borderRadius: 9, transition: "all 0.15s",
                }}
                  onMouseEnter={e => { e.currentTarget.style.color = C.text; }}
                  onMouseLeave={e => { e.currentTarget.style.color = C.muted; }}>
                  View docs <ExternalLink size={12} />
                </a>
              </div>

              {/* CLI snippet */}
              <div style={{
                display: "inline-flex", alignItems: "center", gap: 12,
                background: "#080a0c", border: `1px solid ${C.border}`,
                borderRadius: 9, padding: "9px 14px", marginBottom: 32,
              }}>
                <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 12, color: C.subtle }}>$</span>
                <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 12, color: C.text }}>npx @pulse/cli init</span>
                <button onClick={handleCopy} style={{
                  background: "none", border: "none", cursor: "pointer",
                  color: copied ? C.green : C.faint, transition: "color 0.2s",
                  display: "flex", padding: 0,
                }}>
                  {copied ? <Check size={13} /> : <Copy size={13} />}
                </button>
              </div>

              {/* Social proof */}
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <div style={{ display: "flex" }}>
                  {["#3b82f6", "#8b5cf6", "#06b6d4", "#10b981", "#f59e0b"].map((c, i) => (
                    <div key={i} style={{
                      width: 30, height: 30, borderRadius: "50%",
                      border: "2px solid #080809",
                      background: c, marginLeft: i > 0 ? -10 : 0,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 9, fontWeight: 700, color: "#fff",
                    }}>
                      {["RS", "MC", "AK", "JL", "PW"][i]}
                    </div>
                  ))}
                </div>
                <div>
                  <div style={{ display: "flex", gap: 2, marginBottom: 2 }}>
                    {Array(5).fill(0).map((_, i) => (
                      <Star key={i} size={11} fill="#f59e0b" color="#f59e0b" />
                    ))}
                  </div>
                  <p style={{ fontSize: 11, color: C.subtle }}>
                    Trusted by <span style={{ color: C.text, fontWeight: 600 }}>2,400+</span> engineering teams
                  </p>
                </div>
              </div>
            </div>

            {/* Hero console panel */}
            <div style={{ ...cs, boxShadow: "0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04)" }}>
              {/* Window chrome */}
              <div style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                padding: "10px 14px", borderBottom: `1px solid ${C.border}`,
                background: "#0c0c0e",
              }}>
                <div style={{ display: "flex", gap: 6 }}>
                  <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#ef4444", opacity: 0.75 }} />
                  <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#f59e0b", opacity: 0.75 }} />
                  <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#22c55e", opacity: 0.75 }} />
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 6, fontFamily: "JetBrains Mono, monospace", fontSize: 10, color: C.faint }}>
                  <Radio size={10} color={C.green} style={{ animation: "blink 2s infinite" }} />
                  pulse.console / live · demo workspace
                </div>
                <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 9, color: C.faint, border: `1px solid ${C.border}`, padding: "1px 6px", borderRadius: 3 }}>⌘K</span>
              </div>

              {/* KPI row */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", borderBottom: `1px solid ${C.border}` }}>
                {[
                  { lbl: "Events/s", val: <Num v={Math.round(metrics.eventsPerSec)} />, c: C.green, trend: "+12%" },
                  { lbl: "p95 lat", val: <><Num v={Math.round(metrics.p95)} />ms</>, c: C.blue, trend: "▼ ok" },
                  { lbl: "Workers", val: <><Num v={Math.round(metrics.workersOnline)} />/96</>, c: C.purple, trend: "active" },
                  { lbl: "Err rate", val: <><Num v={metrics.errorRate} dec={2} />%</>, c: C.red, trend: "low" },
                ].map(({ lbl, val, c, trend }) => (
                  <div key={lbl} style={{ padding: "10px 12px", borderRight: `1px solid ${C.border}`, ":last-child": { borderRight: "none" } }}>
                    <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 8.5, color: C.faint, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 3 }}>{lbl}</div>
                    <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 16, fontWeight: 700, color: C.text, marginBottom: 4 }}>{val}</div>
                    <Sparkline color={c} height={20} />
                    <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 8.5, color: c, marginTop: 3 }}>{trend}</div>
                  </div>
                ))}
              </div>

              {/* Trace waterfall */}
              <div style={{ padding: "12px 14px", borderBottom: `1px solid ${C.border}` }}>
                <TraceWaterfall />
              </div>

              {/* Log feed */}
              <div style={{ padding: "10px 14px", background: "rgba(0,0,0,0.25)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                  <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 9, color: C.faint, textTransform: "uppercase", letterSpacing: "0.1em" }}>LIVE LOGS</span>
                  <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 9, color: C.green, display: "flex", alignItems: "center", gap: 4 }}>
                    <span style={{ width: 5, height: 5, borderRadius: "50%", background: C.green, animation: "blink 2s infinite" }} />
                    tail · all services
                  </span>
                </div>
                <TerminalFeed />
              </div>
            </div>
          </div>

          {/* KPI strip */}
          <div style={{
            marginTop: 40, display: "grid", gridTemplateColumns: "repeat(8, 1fr)",
            border: `1px solid ${C.border}`, borderRadius: 14, overflow: "hidden",
          }}>
            {[
              { lbl: "Events/sec", v: <Num v={Math.round(metrics.eventsPerSec)} />, u: "", icon: Zap, c: C.blue },
              { lbl: "p95 Latency", v: <Num v={Math.round(metrics.p95)} />, u: "ms", icon: Clock, c: C.purple },
              { lbl: "Queue depth", v: <Num v={Math.round(metrics.queueDepth)} />, u: "", icon: Database, c: C.orange },
              { lbl: "Active workers", v: <Num v={Math.round(metrics.workersOnline)} />, u: "/96", icon: Cpu, c: C.cyan },
              { lbl: "Throughput", v: <Num v={metrics.throughput} dec={1} />, u: "GB/s", icon: TrendingUp, c: C.green },
              { lbl: "Active traces", v: <Num v={Math.round(metrics.activeTraces)} />, u: "", icon: Network, c: C.indigo },
              { lbl: "Open incidents", v: "3", u: "", icon: AlertTriangle, c: C.red },
              { lbl: "SLO health", v: <Num v={metrics.sloHealth} dec={1} />, u: "%", icon: Gauge, c: C.green },
            ].map(({ lbl, v, u, icon: Icon, c }) => (
              <div key={lbl} style={{ background: C.surface, padding: "14px 16px", borderRight: `1px solid ${C.border}` }}>
                <div style={{ display: "flex", alignItems: "center", gap: 5, fontFamily: "JetBrains Mono, monospace", fontSize: 9, textTransform: "uppercase", letterSpacing: "0.08em", color: C.faint, marginBottom: 6 }}>
                  <Icon size={10} color={c} /> {lbl}
                </div>
                <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 18, fontWeight: 700, color: C.text }}>
                  {v}<span style={{ color: C.faint, fontSize: 11 }}>{u}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── LIVE CHARTS ── */}
      <section style={{ position: "relative", zIndex: 1, borderBottom: `1px solid ${C.border}`, background: C.bg }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "80px 24px" }}>
          <FadeIn>
            <SLabel>Live Metrics</SLabel>
            <h2 style={{ fontSize: 34, fontWeight: 800, letterSpacing: "-0.03em", color: C.text, marginBottom: 8 }}>
              Every signal, updating in realtime.
            </h2>
            <p style={{ fontSize: 13.5, color: C.muted, marginBottom: 36, maxWidth: 520 }}>
              30-minute rolling window. Data updates every ~1.4 seconds. These are live renders, not screenshots.
            </p>
          </FadeIn>

          {/* Primary charts grid */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginBottom: 12 }}>

            {/* Throughput */}
            <FadeIn delay={0}>
              <div style={{ ...cs, padding: 20 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
                  <div>
                    <p style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 9.5, textTransform: "uppercase", letterSpacing: "0.1em", color: C.faint, marginBottom: 4 }}>Event Throughput</p>
                    <p style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 26, fontWeight: 700, color: C.text }}>
                      <Num v={Math.round(metrics.eventsPerSec)} /> <span style={{ fontSize: 12, color: C.subtle, fontWeight: 400 }}>ev/s</span>
                    </p>
                  </div>
                  <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 10, color: C.green, background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.2)", borderRadius: 4, padding: "2px 8px" }}>+12.4%</span>
                </div>
                <ResponsiveContainer width="100%" height={110}>
                  <AreaChart data={chartData} margin={{ top: 4, right: 0, left: -30, bottom: 0 }}>
                    <defs>
                      <linearGradient id="g-tput" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={C.blue} stopOpacity={0.3} />
                        <stop offset="95%" stopColor={C.blue} stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="2 4" stroke="#1a1a1c" vertical={false} />
                    <XAxis dataKey="t" tick={{ fontSize: 8.5, fill: C.faint, fontFamily: "JetBrains Mono, monospace" }} tickLine={false} axisLine={false} interval={9} />
                    <YAxis tick={{ fontSize: 8.5, fill: C.faint, fontFamily: "JetBrains Mono, monospace" }} tickLine={false} axisLine={false} />
                    <Tooltip content={<DarkTooltip />} />
                    <Area type="monotone" dataKey="throughput" stroke={C.blue} strokeWidth={1.5} fill="url(#g-tput)" dot={false} name="ev/s" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </FadeIn>

            {/* Latency */}
            <FadeIn delay={80}>
              <div style={{ ...cs, padding: 20 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
                  <div>
                    <p style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 9.5, textTransform: "uppercase", letterSpacing: "0.1em", color: C.faint, marginBottom: 4 }}>Latency Percentiles</p>
                    <p style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 26, fontWeight: 700, color: C.text }}>
                      <Num v={Math.round(metrics.p95)} /> <span style={{ fontSize: 12, color: C.subtle, fontWeight: 400 }}>p95 ms</span>
                    </p>
                  </div>
                  <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 10, color: C.faint, background: C.surface2, border: `1px solid ${C.border}`, borderRadius: 4, padding: "2px 8px" }}>SLO: 200ms</span>
                </div>
                <ResponsiveContainer width="100%" height={110}>
                  <RLineChart data={chartData} margin={{ top: 4, right: 0, left: -30, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="2 4" stroke="#1a1a1c" vertical={false} />
                    <XAxis dataKey="t" tick={{ fontSize: 8.5, fill: C.faint, fontFamily: "JetBrains Mono, monospace" }} tickLine={false} axisLine={false} interval={9} />
                    <YAxis tick={{ fontSize: 8.5, fill: C.faint, fontFamily: "JetBrains Mono, monospace" }} tickLine={false} axisLine={false} />
                    <Tooltip content={<DarkTooltip />} />
                    <ReferenceLine y={200} stroke={C.red} strokeWidth={0.8} strokeDasharray="4 3" label={{ value: "SLO", fill: C.red, fontSize: 8, fontFamily: "JetBrains Mono, monospace" }} />
                    <Line type="monotone" dataKey="p95" stroke={C.purple} strokeWidth={1.5} dot={false} name="p95" />
                    <Line type="monotone" dataKey="p50" stroke={C.cyan} strokeWidth={1} dot={false} strokeDasharray="4 2" name="p50" />
                  </RLineChart>
                </ResponsiveContainer>
                <div style={{ display: "flex", gap: 14, marginTop: 6 }}>
                  <span style={{ display: "flex", alignItems: "center", gap: 5, fontFamily: "JetBrains Mono, monospace", fontSize: 9.5, color: C.faint }}>
                    <span style={{ width: 14, height: 2, background: C.purple, borderRadius: 1 }} /> p95
                  </span>
                  <span style={{ display: "flex", alignItems: "center", gap: 5, fontFamily: "JetBrains Mono, monospace", fontSize: 9.5, color: C.faint }}>
                    <span style={{ width: 14, height: 2, background: C.cyan, borderRadius: 1, borderTop: `1px dashed ${C.cyan}` }} /> p50
                  </span>
                  <span style={{ display: "flex", alignItems: "center", gap: 5, fontFamily: "JetBrains Mono, monospace", fontSize: 9.5, color: C.red }}>
                    <span style={{ width: 14, height: 1, background: C.red, borderRadius: 1 }} /> SLO
                  </span>
                </div>
              </div>
            </FadeIn>

            {/* CPU + Mem */}
            <FadeIn delay={160}>
              <div style={{ ...cs, padding: 20 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
                  <div>
                    <p style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 9.5, textTransform: "uppercase", letterSpacing: "0.1em", color: C.faint, marginBottom: 4 }}>CPU / Memory</p>
                    <div style={{ display: "flex", gap: 16 }}>
                      <p style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 22, fontWeight: 700, color: C.text }}>
                        <Num v={Math.round(metrics.cpuUtil)} /><span style={{ fontSize: 11, color: C.subtle, fontWeight: 400 }}>%</span>
                      </p>
                      <p style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 22, fontWeight: 700, color: C.muted }}>
                        <Num v={Math.round(metrics.memUtil)} /><span style={{ fontSize: 11, color: C.subtle, fontWeight: 400 }}>%</span>
                      </p>
                    </div>
                  </div>
                </div>
                <ResponsiveContainer width="100%" height={110}>
                  <ComposedChart data={chartData} margin={{ top: 4, right: 0, left: -30, bottom: 0 }}>
                    <defs>
                      <linearGradient id="g-cpu" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={C.orange} stopOpacity={0.25} />
                        <stop offset="95%" stopColor={C.orange} stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="2 4" stroke="#1a1a1c" vertical={false} />
                    <XAxis dataKey="t" tick={{ fontSize: 8.5, fill: C.faint, fontFamily: "JetBrains Mono, monospace" }} tickLine={false} axisLine={false} interval={9} />
                    <YAxis tick={{ fontSize: 8.5, fill: C.faint, fontFamily: "JetBrains Mono, monospace" }} tickLine={false} axisLine={false} domain={[0, 100]} />
                    <Tooltip content={<DarkTooltip />} />
                    <Area type="monotone" dataKey="cpuUtil" stroke={C.orange} strokeWidth={1.5} fill="url(#g-cpu)" dot={false} name="CPU %" />
                    <Line type="monotone" dataKey="memUtil" stroke={C.teal} strokeWidth={1.5} dot={false} strokeDasharray="4 2" name="Mem %" />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </FadeIn>
          </div>

          {/* Bottom row */}
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 12 }}>
            {/* Error rate + queue lag combined */}
            <FadeIn delay={0}>
              <div style={{ ...cs, padding: 20 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
                  <div>
                    <p style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 9.5, textTransform: "uppercase", letterSpacing: "0.1em", color: C.faint, marginBottom: 4 }}>Error Rate · Queue Lag</p>
                    <div style={{ display: "flex", gap: 20, alignItems: "baseline" }}>
                      <p style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 24, fontWeight: 700, color: C.text }}>
                        <Num v={metrics.errorRate} dec={2} />% <span style={{ fontSize: 11, color: C.subtle, fontWeight: 400 }}>err</span>
                      </p>
                      <p style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 24, fontWeight: 700, color: C.text }}>
                        <Num v={Math.round(metrics.queueDepth)} /> <span style={{ fontSize: 11, color: C.subtle, fontWeight: 400 }}>msgs</span>
                      </p>
                    </div>
                  </div>
                  <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 10, color: C.amber, background: "rgba(245,158,11,0.1)", border: "1px solid rgba(245,158,11,0.2)", borderRadius: 4, padding: "2px 8px" }}>queue warn</span>
                </div>
                <ResponsiveContainer width="100%" height={120}>
                  <ComposedChart data={chartData} margin={{ top: 4, right: 0, left: -30, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="2 4" stroke="#1a1a1c" vertical={false} />
                    <XAxis dataKey="t" tick={{ fontSize: 8.5, fill: C.faint, fontFamily: "JetBrains Mono, monospace" }} tickLine={false} axisLine={false} interval={9} />
                    <YAxis yAxisId="left" tick={{ fontSize: 8.5, fill: C.faint, fontFamily: "JetBrains Mono, monospace" }} tickLine={false} axisLine={false} />
                    <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 8.5, fill: C.faint, fontFamily: "JetBrains Mono, monospace" }} tickLine={false} axisLine={false} />
                    <Tooltip content={<DarkTooltip />} />
                    <Bar yAxisId="right" dataKey="queueLag" fill={C.amber} opacity={0.6} radius={[2, 2, 0, 0]} name="queue lag" />
                    <Line yAxisId="left" type="monotone" dataKey="errorRate" stroke={C.red} strokeWidth={2} dot={false} name="error rate" />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </FadeIn>

            {/* Worker grid */}
            <FadeIn delay={100}>
              <div style={{ ...cs, padding: 20, height: "100%" }}>
                <p style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 9.5, textTransform: "uppercase", letterSpacing: "0.1em", color: C.faint, marginBottom: 6 }}>Worker Pool</p>
                <p style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 22, fontWeight: 700, color: C.text, marginBottom: 14 }}>
                  <Num v={Math.round(metrics.workersOnline)} /><span style={{ fontSize: 12, color: C.subtle, fontWeight: 400 }}> / 96 active</span>
                </p>
                <div style={{ display: "grid", gap: 2, gridTemplateColumns: "repeat(16, 1fr)" }}>
                  {Array.from({ length: 96 }, (_, i) => (
                    <div key={i} style={{
                      aspectRatio: "1", borderRadius: 2,
                      background: i < metrics.workersOnline
                        ? (i < 80 ? C.green : "#16a34a")
                        : "#1a1a1c",
                      opacity: i < metrics.workersOnline ? 0.8 : 0.35,
                      transition: "background 0.5s",
                    }} />
                  ))}
                </div>
                <div style={{ display: "flex", gap: 12, marginTop: 12, fontFamily: "JetBrains Mono, monospace", fontSize: 9.5 }}>
                  <span style={{ display: "flex", alignItems: "center", gap: 5, color: C.faint }}>
                    <span style={{ width: 8, height: 8, borderRadius: 2, background: C.green }} /> active
                  </span>
                  <span style={{ display: "flex", alignItems: "center", gap: 5, color: C.faint }}>
                    <span style={{ width: 8, height: 8, borderRadius: 2, background: "#1a1a1c" }} /> idle
                  </span>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── SLO SECTION ── */}
      <section id="slos" style={{ position: "relative", zIndex: 1, borderBottom: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "80px 24px" }}>
          <FadeIn>
            <SLabel>Service Level Objectives</SLabel>
            <h2 style={{ fontSize: 34, fontWeight: 800, letterSpacing: "-0.03em", color: C.text, marginBottom: 8 }}>
              SLO dashboards built for reliability.
            </h2>
            <p style={{ fontSize: 13.5, color: C.muted, marginBottom: 40, maxWidth: 560 }}>
              Error budget burn-rate alerting, multi-window SLO policies and automatic SLO report generation. Know before your users do.
            </p>
          </FadeIn>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            {/* SLO gauges */}
            <FadeIn delay={0}>
              <div style={{ ...cs, padding: 24 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                  <div>
                    <p style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 9.5, textTransform: "uppercase", letterSpacing: "0.1em", color: C.faint }}>SLO Health Overview</p>
                    <p style={{ fontSize: 11.5, color: C.muted, marginTop: 3 }}>6 services · 30-day rolling window</p>
                  </div>
                  <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 10.5, color: C.green, background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.2)", borderRadius: 5, padding: "3px 10px" }}>
                    5/6 healthy
                  </span>
                </div>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "space-around" }}>
                  <SLOGauge value={99.87} target={99.9} label="api-gateway" />
                  <SLOGauge value={98.42} target={99.5} label="checkout-svc" />
                  <SLOGauge value={99.94} target={99.9} label="payment-svc" />
                </div>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "space-around", marginTop: 12 }}>
                  <SLOGauge value={99.99} target={99.9} label="auth-svc" />
                  <SLOGauge value={99.61} target={99.5} label="inventory" />
                  <SLOGauge value={99.78} target={99.5} label="notif-svc" />
                </div>
              </div>
            </FadeIn>

            {/* Error budget burn */}
            <FadeIn delay={100}>
              <div style={{ ...cs, padding: 24 }}>
                <p style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 9.5, textTransform: "uppercase", letterSpacing: "0.1em", color: C.faint, marginBottom: 4 }}>Error Budget Burn Rate</p>
                <p style={{ fontSize: 11.5, color: C.muted, marginBottom: 16 }}>Fast (1h) and slow (6h) windows · checkout-svc</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {[
                    { label: "1h window", burn: 3.2, budget: 68, color: C.amber, status: "warn" },
                    { label: "6h window", burn: 1.8, budget: 72, color: C.blue, status: "ok" },
                    { label: "24h window", burn: 0.9, budget: 81, color: C.green, status: "ok" },
                    { label: "30d window", burn: 0.8, budget: 87, color: C.green, status: "ok" },
                  ].map(item => (
                    <div key={item.label}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                        <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 11, color: C.muted }}>{item.label}</span>
                        <div style={{ display: "flex", gap: 12 }}>
                          <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 11, color: item.color }}>
                            {item.burn}x burn
                          </span>
                          <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 11, color: C.muted }}>
                            {item.budget}% budget
                          </span>
                        </div>
                      </div>
                      <div style={{ height: 6, background: "#1a1a1c", borderRadius: 3, overflow: "hidden" }}>
                        <div style={{
                          height: "100%", width: `${item.budget}%`,
                          background: item.color, borderRadius: 3, opacity: 0.75,
                          transition: "width 0.8s cubic-bezier(0.4,0,0.2,1)",
                        }} />
                      </div>
                    </div>
                  ))}
                </div>
                <div style={{ marginTop: 18, padding: "10px 14px", background: "rgba(245,158,11,0.06)", border: "1px solid rgba(245,158,11,0.15)", borderRadius: 8 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
                    <AlertTriangle size={12} color={C.amber} />
                    <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 10.5, color: C.amber, fontWeight: 600 }}>ALERT: Fast burn rate elevated</span>
                  </div>
                  <p style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 9.5, color: C.faint, lineHeight: 1.6 }}>
                    checkout-svc 1h burn=3.2x · At this rate, 30-day error budget exhausted in ~9 days. Oncall: rdesai
                  </p>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── TOPOLOGY ── */}
      <section id="topology" style={{ position: "relative", zIndex: 1, borderBottom: `1px solid ${C.border}`, background: C.bg }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "80px 24px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "2fr 3fr", gap: 48, alignItems: "start" }}>
            <div>
              <FadeIn>
                <SLabel>Service Topology</SLabel>
                <h2 style={{ fontSize: 34, fontWeight: 800, letterSpacing: "-0.03em", color: C.text, marginBottom: 12 }}>
                  Auto-discovered dependency graph.
                </h2>
                <p style={{ fontSize: 13.5, color: C.muted, lineHeight: 1.7, marginBottom: 24 }}>
                  Live RPS, error-rate edges and health indicators updated continuously. Click any node to open the inspector drawer with spans, logs and SLOs.
                </p>
              </FadeIn>

              {/* Service list */}
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {[
                  { label: "api-gateway", rps: 847, status: "healthy", p95: "12ms", err: "0.02%" },
                  { label: "checkout-svc", rps: 428, status: "warning", p95: "148ms", err: "0.38%" },
                  { label: "payment-svc", rps: 214, status: "healthy", p95: "44ms", err: "0.04%" },
                  { label: "inventory-svc", rps: 188, status: "healthy", p95: "22ms", err: "0.01%" },
                  { label: "auth-svc", rps: 312, status: "healthy", p95: "8ms", err: "0.00%" },
                  { label: "notif-svc", rps: 98, status: "healthy", p95: "6ms", err: "0.00%" },
                ].map(s => (
                  <div key={s.label} style={{
                    display: "flex", alignItems: "center",
                    border: `1px solid ${s.status === "warning" ? "rgba(245,158,11,0.2)" : C.border}`,
                    background: s.status === "warning" ? "rgba(245,158,11,0.04)" : C.surface,
                    borderRadius: 9, padding: "8px 12px", cursor: "pointer",
                    transition: "border-color 0.15s",
                  }}>
                    <span style={{ width: 7, height: 7, borderRadius: "50%", background: STATUS_CLR[s.status], marginRight: 10, flexShrink: 0 }} />
                    <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 11, color: C.text, flex: 1 }}>{s.label}</span>
                    <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 10, color: C.faint, marginRight: 10 }}>{s.rps} rps</span>
                    <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 10, color: s.status === "warning" ? C.amber : C.faint, marginRight: 10 }}>{s.p95}</span>
                    <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 10, color: parseFloat(s.err) > 0.1 ? C.red : C.faint }}>{s.err}</span>
                    <ChevronRight size={12} color={C.faint} style={{ marginLeft: 8 }} />
                  </div>
                ))}
              </div>
            </div>

            <FadeIn delay={100}>
              <div style={{ ...cs, padding: 20 }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
                  <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 9.5, textTransform: "uppercase", letterSpacing: "0.1em", color: C.faint }}>
                    live dependency graph · {TOPO_NODES.length} services · {TOPO_EDGES.length} edges
                  </span>
                  <div style={{ display: "flex", alignItems: "center", gap: 5, fontFamily: "JetBrains Mono, monospace", fontSize: 9.5, color: C.green }}>
                    <span style={{ width: 5, height: 5, borderRadius: "50%", background: C.green, animation: "blink 2s infinite" }} />
                    streaming
                  </div>
                </div>
                <TopologyGraph />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── INCIDENTS + DEPLOYS ── */}
      <section id="incidents" style={{ position: "relative", zIndex: 1, borderBottom: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "80px 24px" }}>
          <FadeIn>
            <SLabel>Incidents & Deployments</SLabel>
            <h2 style={{ fontSize: 34, fontWeight: 800, letterSpacing: "-0.03em", color: C.text, marginBottom: 8 }}>
              From alert to resolution in one workflow.
            </h2>
            <p style={{ fontSize: 13.5, color: C.muted, marginBottom: 40, maxWidth: 560 }}>
              Triage incidents, assign responders, correlate deploys and generate RCA timelines — all without leaving Pulse.
            </p>
          </FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
            {/* Incident panel */}
            <FadeIn delay={0}>
              <div style={{ ...cs, padding: 20 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                  <p style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 9.5, textTransform: "uppercase", letterSpacing: "0.1em", color: C.faint }}>Active Incidents</p>
                  <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 9.5, background: "rgba(239,68,68,0.1)", color: C.red, border: "1px solid rgba(239,68,68,0.2)", borderRadius: 4, padding: "2px 8px" }}>3 open</span>
                </div>
                <IncidentPanel />
              </div>
            </FadeIn>

            {/* Deployment timeline */}
            <FadeIn delay={80}>
              <div style={{ ...cs, padding: 20 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                  <p style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 9.5, textTransform: "uppercase", letterSpacing: "0.1em", color: C.faint }}>Deployments Today</p>
                  <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 9.5, color: C.green, background: "rgba(34,197,94,0.08)", border: `1px solid ${C.border}`, borderRadius: 4, padding: "2px 8px" }}>7 shipped</span>
                </div>
                <DeployTimeline />
                <div style={{ marginTop: 14, display: "flex", gap: 8 }}>
                  <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 9.5, color: C.green }}>✓ 6 successful</span>
                  <span style={{ color: C.faint }}>·</span>
                  <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 9.5, color: C.red }}>✗ 1 rolled back</span>
                </div>
              </div>
            </FadeIn>

            {/* RCA timeline sketch */}
            <FadeIn delay={160}>
              <div style={{ ...cs, padding: 20 }}>
                <p style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 9.5, textTransform: "uppercase", letterSpacing: "0.1em", color: C.faint, marginBottom: 14 }}>RCA Timeline · INC-1024</p>
                {[
                  { t: "13:05", icon: "🚀", msg: "payment-svc v2.2.1 deployed to prod", c: C.blue },
                  { t: "13:08", icon: "📈", msg: "p99 latency spike detected +240%", c: C.amber },
                  { t: "13:11", icon: "🚨", msg: "SLO alert fired · PD notified", c: C.red },
                  { t: "13:14", icon: "👤", msg: "Responder rdesai acknowledged", c: C.purple },
                  { t: "13:22", icon: "🔄", msg: "Rollback initiated v2.2.0", c: C.orange },
                  { t: "13:41", icon: "✅", msg: "v2.2.2 hotfix deployed · resolved", c: C.green },
                ].map((ev, i) => (
                  <div key={i} style={{ display: "flex", gap: 10, marginBottom: 10, position: "relative" }}>
                    {i < 5 && (
                      <div style={{ position: "absolute", left: 18, top: 20, width: 1, height: 14, background: C.border }} />
                    )}
                    <div style={{ width: 22, height: 22, borderRadius: "50%", background: `${ev.c}15`, border: `1px solid ${ev.c}30`, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10 }}>
                      {ev.icon}
                    </div>
                    <div>
                      <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 9.5, color: ev.c, marginBottom: 1 }}>{ev.t}</div>
                      <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 9.5, color: C.muted, lineHeight: 1.5 }}>{ev.msg}</div>
                    </div>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── QUEUES SECTION ── */}
      <section id="queues" style={{ position: "relative", zIndex: 1, borderBottom: `1px solid ${C.border}`, background: C.bg }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "80px 24px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "2fr 3fr", gap: 48 }}>
            <FadeIn>
              <SLabel>Queue Inspector</SLabel>
              <h2 style={{ fontSize: 34, fontWeight: 800, letterSpacing: "-0.03em", color: C.text, marginBottom: 12 }}>
                Every topic, one pane.
              </h2>
              <p style={{ fontSize: 13.5, color: C.muted, lineHeight: 1.7, marginBottom: 20 }}>
                Per-topic lag, depth, throughput and DLQ size. Kafka, SQS, Pub/Sub, Redis Streams — unified. Consumer group health with auto-scale triggers.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {[
                  { icon: Database, label: "Apache Kafka", desc: "Native consumer group lag tracking" },
                  { icon: Zap, label: "AWS SQS", desc: "Approximate + exact depth metrics" },
                  { icon: Globe, label: "GCP Pub/Sub", desc: "Subscription backlog + ack latency" },
                  { icon: Database, label: "Redis Streams", desc: "XLEN, XPENDING and XAUTOCLAIM" },
                ].map(({ icon: Icon, label, desc }) => (
                  <div key={label} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                    <div style={{ width: 32, height: 32, borderRadius: 8, background: "rgba(249,115,22,0.1)", border: "1px solid rgba(249,115,22,0.2)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <Icon size={14} color={C.orange} />
                    </div>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 600, color: C.text, marginBottom: 1 }}>{label}</div>
                      <div style={{ fontSize: 11.5, color: C.subtle }}>{desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </FadeIn>

            <FadeIn delay={100}>
              <div style={{ ...cs, overflow: "hidden" }}>
                <div style={{ padding: "12px 16px", borderBottom: `1px solid ${C.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 9.5, textTransform: "uppercase", letterSpacing: "0.1em", color: C.faint }}>Queue Inspector · 5 topics</span>
                  <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 9.5, color: C.red }}>1 critical</span>
                </div>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 11.5 }}>
                  <thead>
                    <tr style={{ borderBottom: `1px solid ${C.border}`, background: "#0c0c0e" }}>
                      {["Topic", "Lag (ms)", "Depth", "Throughput", "DLQ", "Status"].map(h => (
                        <th key={h} style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 9, textTransform: "uppercase", letterSpacing: "0.08em", color: C.faint, padding: "8px 14px", textAlign: "left", fontWeight: 500 }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {QUEUES.map((q, i) => {
                      const sc = STATUS_BADGE_CLR[q.status];
                      return (
                        <tr key={q.name} style={{ borderBottom: `1px solid ${C.border}`, background: i % 2 === 0 ? "transparent" : "rgba(255,255,255,0.01)" }}>
                          <td style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 11, color: C.text, padding: "10px 14px" }}>{q.name}</td>
                          <td style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 11, color: q.lag > 1000 ? C.red : q.lag > 200 ? C.amber : C.green, padding: "10px 14px" }}>{q.lag.toLocaleString()}</td>
                          <td style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 11, color: C.muted, padding: "10px 14px" }}>{q.depth.toLocaleString()}</td>
                          <td style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 11, color: C.muted, padding: "10px 14px" }}>{q.throughput}/s</td>
                          <td style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 11, color: q.dlq > 0 ? C.red : C.faint, padding: "10px 14px" }}>{q.dlq}</td>
                          <td style={{ padding: "10px 14px" }}>
                            <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 9.5, background: sc.bg, color: sc.text, padding: "2px 8px", borderRadius: 4 }}>{q.status}</span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── MLOPS ── */}
      <section id="mlops" style={{ position: "relative", zIndex: 1, borderBottom: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "80px 24px" }}>
          <FadeIn>
            <SLabel>MLOps Observability</SLabel>
            <h2 style={{ fontSize: 34, fontWeight: 800, letterSpacing: "-0.03em", color: C.text, marginBottom: 8 }}>
              Production-grade ML model monitoring.
            </h2>
            <p style={{ fontSize: 13.5, color: C.muted, marginBottom: 40, maxWidth: 560 }}>
              Feature distribution drift, inference latency tracking and model version lineage. Catch regressions before they cost you.
            </p>
          </FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
            {/* Drift chart */}
            <FadeIn delay={0}>
              <div style={{ ...cs, padding: 20 }}>
                <p style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 9.5, textTransform: "uppercase", letterSpacing: "0.1em", color: C.faint, marginBottom: 4 }}>Feature Drift · user_embedding</p>
                <p style={{ fontSize: 11.5, color: C.muted, marginBottom: 12 }}>PSI score · 14-day window · threshold=0.10</p>
                <ResponsiveContainer width="100%" height={140}>
                  <AreaChart data={driftData} margin={{ top: 4, right: 0, left: -30, bottom: 0 }}>
                    <defs>
                      <linearGradient id="g-drift" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={C.pink} stopOpacity={0.3} />
                        <stop offset="95%" stopColor={C.pink} stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="2 4" stroke="#1a1a1c" vertical={false} />
                    <XAxis dataKey="day" tick={{ fontSize: 8.5, fill: C.faint, fontFamily: "JetBrains Mono, monospace" }} tickLine={false} axisLine={false} interval={3} />
                    <YAxis tick={{ fontSize: 8.5, fill: C.faint, fontFamily: "JetBrains Mono, monospace" }} tickLine={false} axisLine={false} domain={[0, 0.25]} />
                    <Tooltip content={<DarkTooltip />} />
                    <ReferenceLine y={0.10} stroke={C.red} strokeWidth={0.8} strokeDasharray="4 2" label={{ value: "threshold", fill: C.red, fontSize: 7.5, fontFamily: "JetBrains Mono, monospace" }} />
                    <Area type="monotone" dataKey="drift" stroke={C.pink} strokeWidth={1.5} fill="url(#g-drift)" dot={false} name="PSI drift" />
                  </AreaChart>
                </ResponsiveContainer>
                <div style={{ marginTop: 10, padding: "8px 12px", background: "rgba(236,72,153,0.06)", border: "1px solid rgba(236,72,153,0.15)", borderRadius: 7 }}>
                  <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 9.5, color: C.pink }}>⚠ Drift detected on day 12 · PSI=0.18 · Auto-alert sent</span>
                </div>
              </div>
            </FadeIn>

            {/* Model versions */}
            <FadeIn delay={80}>
              <div style={{ ...cs, padding: 20 }}>
                <p style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 9.5, textTransform: "uppercase", letterSpacing: "0.1em", color: C.faint, marginBottom: 14 }}>Model Registry · recsys-v3</p>
                {[
                  { ver: "v3.2.1", status: "production", acc: "92.4%", p50: "18ms", deployed: "3d ago", c: C.green },
                  { ver: "v3.2.0", status: "shadow", acc: "91.8%", p50: "17ms", deployed: "8d ago", c: C.blue },
                  { ver: "v3.1.4", status: "archived", acc: "90.2%", p50: "22ms", deployed: "21d ago", c: C.faint },
                  { ver: "v3.1.3", status: "rollback", acc: "88.1%", p50: "28ms", deployed: "30d ago", c: C.red },
                ].map(m => (
                  <div key={m.ver} style={{
                    display: "flex", alignItems: "center", gap: 10,
                    padding: "8px 0", borderBottom: `1px solid ${C.border}`,
                  }}>
                    <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 11, color: C.text, width: 60 }}>{m.ver}</div>
                    <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 9, background: `${m.c}15`, color: m.c, padding: "1px 7px", borderRadius: 3, flexShrink: 0 }}>{m.status}</span>
                    <div style={{ flex: 1 }} />
                    <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 10, color: C.muted }}>{m.acc}</span>
                    <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 10, color: C.faint }}>{m.p50}</span>
                    <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 9.5, color: C.faint }}>{m.deployed}</span>
                  </div>
                ))}
                <div style={{ marginTop: 12 }}>
                  <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 9.5, color: C.faint, marginBottom: 6 }}>Shadow traffic split</div>
                  <div style={{ height: 8, background: "#1a1a1c", borderRadius: 4, overflow: "hidden", display: "flex" }}>
                    <div style={{ width: "80%", background: C.green, opacity: 0.8 }} />
                    <div style={{ width: "20%", background: C.blue, opacity: 0.8 }} />
                  </div>
                  <div style={{ display: "flex", gap: 10, marginTop: 4 }}>
                    <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 9, color: C.green }}>80% v3.2.1</span>
                    <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 9, color: C.blue }}>20% v3.2.0 shadow</span>
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* Inference latency */}
            <FadeIn delay={160}>
              <div style={{ ...cs, padding: 20 }}>
                <p style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 9.5, textTransform: "uppercase", letterSpacing: "0.1em", color: C.faint, marginBottom: 14 }}>Inference Stats</p>
                {[
                  { model: "recsys-v3", p50: 18, p95: 42, p99: 98, rps: 122 },
                  { model: "embedder-v2", p50: 6, p95: 14, p99: 28, rps: 847 },
                  { model: "ranker-v1", p50: 48, p95: 112, p99: 240, rps: 66 },
                  { model: "classifier-v4", p50: 3, p95: 8, p99: 14, rps: 1220 },
                ].map(m => (
                  <div key={m.model} style={{ marginBottom: 14 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                      <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 10.5, color: C.text }}>{m.model}</span>
                      <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 9.5, color: C.faint }}>{m.rps} rps</span>
                    </div>
                    <div style={{ display: "flex", gap: 4 }}>
                      {[["p50", m.p50, C.green], ["p95", m.p95, C.blue], ["p99", m.p99, C.purple]].map(([l, v, c]) => (
                        <div key={l} style={{ flex: 1, background: "#111113", borderRadius: 5, padding: "4px 6px", textAlign: "center" }}>
                          <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 8.5, color: C.faint }}>{l}</div>
                          <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 11, fontWeight: 600, color: c }}>{v}ms</div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── FEATURES GRID ── */}
      <section id="features" style={{ position: "relative", zIndex: 1, borderBottom: `1px solid ${C.border}`, background: C.bg }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "80px 24px" }}>
          <FadeIn>
            <SLabel>Platform</SLabel>
            <h2 style={{ fontSize: 34, fontWeight: 800, letterSpacing: "-0.03em", color: C.text, marginBottom: 8 }}>One console for every signal.</h2>
            <p style={{ fontSize: 13.5, color: C.muted, marginBottom: 40, maxWidth: 520 }}>
              From the API edge to the worker pool, Pulse captures every span and renders it in workflows engineers actually use.
            </p>
          </FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10 }}>
            {FEATURES.map((f, i) => (
              <FadeIn key={f.title} delay={i * 40}>
                <FeatureCard {...f} />
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROGRESS MATRIX ── */}
      <section id="progress" style={{ position: "relative", zIndex: 1, borderBottom: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "80px 24px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "2fr 3fr", gap: 48 }}>
            <FadeIn>
              <SLabel>Progress Matrix</SLabel>
              <h2 style={{ fontSize: 34, fontWeight: 800, letterSpacing: "-0.03em", color: C.text, marginBottom: 12 }}>26 features. All shipped.</h2>
              <p style={{ fontSize: 13.5, color: C.muted, lineHeight: 1.7, marginBottom: 28 }}>
                Every area from auth to MLOps is implemented and production-ready. No stubs, no placeholders, no coming-soon banners.
              </p>
              <div style={{ display: "flex", gap: 32, alignItems: "center", marginBottom: 32 }}>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 48, fontWeight: 800, color: C.text, lineHeight: 1 }}>26</div>
                  <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 10, color: C.faint, marginTop: 4 }}>Features</div>
                </div>
                <div style={{ height: 48, width: 1, background: C.border }} />
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 48, fontWeight: 800, color: C.green, lineHeight: 1 }}>100%</div>
                  <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 10, color: C.faint, marginTop: 4 }}>Complete</div>
                </div>
              </div>
              {/* Tech stack grid */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                {TECH_STACK.map(({ name, icon: Icon, cat }) => (
                  <div key={name} style={{
                    display: "flex", alignItems: "center", gap: 9,
                    border: `1px solid ${C.border}`, background: C.surface,
                    borderRadius: 8, padding: "8px 11px",
                  }}>
                    <div style={{ width: 26, height: 26, borderRadius: 6, background: "rgba(59,130,246,0.1)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <Icon size={12} color={C.blue} />
                    </div>
                    <div>
                      <div style={{ fontSize: 11.5, fontWeight: 600, color: C.text }}>{name}</div>
                      <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 9, color: C.faint }}>{cat}</div>
                    </div>
                  </div>
                ))}
              </div>
            </FadeIn>

            <FadeIn delay={100}>
              <div style={{ ...cs, overflow: "hidden" }}>
                <div style={{ padding: "12px 18px", borderBottom: `1px solid ${C.border}`, background: "#0c0c0e", fontFamily: "JetBrains Mono, monospace", fontSize: 9.5, textTransform: "uppercase", letterSpacing: "0.1em", color: C.faint }}>
                  Feature completion matrix
                </div>
                <div style={{ overflowY: "auto", maxHeight: 480 }}>
                  <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
                    <tbody>
                      {PROGRESS_MATRIX.map(([num, area, done]) => (
                        <tr key={num} style={{ borderBottom: `1px solid ${C.border}` }}>
                          <td style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 9.5, color: C.faint, padding: "9px 18px", width: 36 }}>{num}</td>
                          <td style={{ padding: "9px 8px", color: C.muted, fontSize: 12.5 }}>{area}</td>
                          <td style={{ padding: "9px 18px", textAlign: "right" }}>
                            <span style={{ display: "inline-flex", alignItems: "center", gap: 4, fontFamily: "JetBrains Mono, monospace", fontSize: 10, color: C.green }}>
                              <Check size={11} /> done
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── PERMISSIONS ── */}
      <section id="permissions" style={{ position: "relative", zIndex: 1, borderBottom: `1px solid ${C.border}`, background: C.bg }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "80px 24px" }}>
          <FadeIn>
            <SLabel>Access Control</SLabel>
            <h2 style={{ fontSize: 34, fontWeight: 800, letterSpacing: "-0.03em", color: C.text, marginBottom: 8 }}>Permission matrix, in full.</h2>
            <p style={{ fontSize: 13.5, color: C.muted, marginBottom: 32, maxWidth: 600 }}>
              Five built-in roles. Every sidebar item, dashboard widget and mutating action is gated by{" "}
              <code style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 12, background: "rgba(59,130,246,0.1)", color: C.blue, padding: "1px 7px", borderRadius: 4 }}>can(perm)</code>.
              Wildcards and role hierarchy honored.
            </p>
          </FadeIn>

          {/* Role selector */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 8, marginBottom: 24 }}>
            {ROLES.map(r => (
              <div key={r.key}
                onClick={() => setActiveRole(r.key)}
                style={{
                  borderRadius: 11, padding: "14px 16px", cursor: "pointer",
                  border: `1px solid ${activeRole === r.key ? r.color + "50" : C.border}`,
                  background: activeRole === r.key ? `${r.color}0c` : C.surface,
                  transition: "all 0.18s",
                }}
              >
                <div style={{ width: 34, height: 34, borderRadius: 9, background: `${r.color}18`, border: `1px solid ${r.color}28`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 10 }}>
                  <r.icon size={15} color={r.color} />
                </div>
                <div style={{ fontSize: 12.5, fontWeight: 600, color: C.text, marginBottom: 3 }}>{r.name}</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  {r.perms.map(p => (
                    <div key={p} style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 9, color: C.faint }}>{p}</div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Matrix table */}
          <FadeIn delay={100}>
            <div style={{ ...cs, overflow: "hidden" }}>
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
                  <thead>
                    <tr style={{ borderBottom: `1px solid ${C.border}`, background: "#0c0c0e" }}>
                      <th style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 9, textTransform: "uppercase", letterSpacing: "0.08em", color: C.faint, padding: "10px 18px", textAlign: "left", fontWeight: 500, width: 200 }}>Permission</th>
                      {ROLES.map(r => (
                        <th key={r.key} style={{
                          fontFamily: "JetBrains Mono, monospace", fontSize: 9, textTransform: "uppercase", letterSpacing: "0.08em",
                          color: activeRole === r.key ? r.color : C.faint,
                          padding: "10px 16px", textAlign: "center", fontWeight: 500, transition: "color 0.2s",
                        }}>{r.name}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {PERMISSIONS.map((p, i) => (
                      <tr key={p.label} style={{ borderBottom: `1px solid ${C.border}`, background: i % 2 === 0 ? "transparent" : "rgba(255,255,255,0.01)" }}>
                        <td style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 11, color: C.muted, padding: "8px 18px" }}>{p.label}</td>
                        {[p.sa, p.ad, p.sr, p.dev, p.vi].map((has, j) => {
                          const rk = ROLES[j].key;
                          const hl = activeRole === rk;
                          return (
                            <td key={j} style={{ padding: "8px 16px", textAlign: "center", background: hl ? (has ? "rgba(34,197,94,0.04)" : "transparent") : "transparent" }}>
                              {has
                                ? <Check size={13} color={hl ? C.green : "#22c55e"} style={{ margin: "0 auto" }} />
                                : <Minus size={13} color={C.border2} style={{ margin: "0 auto" }} />
                              }
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── ARCHITECTURE ── */}
      <section style={{ position: "relative", zIndex: 1, borderBottom: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "80px 24px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48 }}>
            <FadeIn>
              <SLabel>Architecture</SLabel>
              <h2 style={{ fontSize: 34, fontWeight: 800, letterSpacing: "-0.03em", color: C.text, marginBottom: 12 }}>Frontend-first, backend-ready.</h2>
              <p style={{ fontSize: 13.5, color: C.muted, lineHeight: 1.7, marginBottom: 28 }}>
                Typed interfaces, abstracted API layer, mockable realtime streams and pluggable auth. Swap mocks for gRPC, REST or GraphQL without touching components.
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                {[
                  { icon: ShieldCheck, label: "Typed end-to-end", desc: "Strict TypeScript throughout", c: C.blue },
                  { icon: RefreshCw, label: "Mock → production", desc: "One-line env swap", c: C.green },
                  { icon: Wifi, label: "WebSocket-ready", desc: "Today setInterval, tmrw WS", c: C.cyan },
                  { icon: Shield, label: "Auth at every layer", desc: "Route + data + action gates", c: C.purple },
                  { icon: Boxes, label: "Modular state", desc: "Zustand atomic stores", c: C.orange },
                  { icon: LayoutDashboard, label: "Role dashboards", desc: "Adapts to each of 5 roles", c: C.indigo },
                ].map(({ icon: Icon, label, desc, c }) => (
                  <div key={label} style={{ display: "flex", gap: 10, alignItems: "flex-start", padding: "10px 12px", border: `1px solid ${C.border}`, borderRadius: 9, background: C.surface }}>
                    <Icon size={14} color={c} style={{ flexShrink: 0, marginTop: 2 }} />
                    <div>
                      <div style={{ fontSize: 12, fontWeight: 600, color: C.text }}>{label}</div>
                      <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 10, color: C.faint }}>{desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </FadeIn>

            <FadeIn delay={100}>
              <div style={{ background: "#060608", border: `1px solid ${C.border}`, borderRadius: 16, padding: 24, fontFamily: "JetBrains Mono, monospace", fontSize: 11.5, lineHeight: 1.8 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 18 }}>
                  <div style={{ width: 11, height: 11, borderRadius: "50%", background: "#ef4444", opacity: 0.75 }} />
                  <div style={{ width: 11, height: 11, borderRadius: "50%", background: "#f59e0b", opacity: 0.75 }} />
                  <div style={{ width: 11, height: 11, borderRadius: "50%", background: "#22c55e", opacity: 0.75 }} />
                  <span style={{ color: C.faint, marginLeft: 8, fontSize: 10 }}>pulse/architecture</span>
                </div>
                <pre style={{ color: C.subtle, fontSize: 10.5, lineHeight: 1.9, whiteSpace: "pre", overflowX: "auto" }}>{`┌───────────────────────────┐  WS/SSE
│      Browser (Pulse UI)   │◀────────▶ Edge / SSR
│                           │            TanStack
│  ┌─────────────────────┐  │  RPC       Start
│  │  Routes (file-based)│  │◀────────▶──────┐
│  ├─────────────────────┤  │                │
│  │  Components         │  │     ┌──────────▼────┐
│  │  (shadcn + feature) │  │     │   Services    │
│  ├─────────────────────┤  │     │ events traces │
│  │  Zustand stores     │  │     │ queues mlops  │
│  │  TanStack Query     │  │     │ incidents ... │
│  │  Realtime hub       │  │     └───────────────┘
│  └─────────────────────┘  │
└───────────────────────────┘`}</pre>
                <div style={{ marginTop: 16, borderTop: `1px solid ${C.border}`, paddingTop: 14, display: "flex", flexDirection: "column", gap: 6, fontSize: 10.5 }}>
                  {[
                    [C.green, "All data flows typed end-to-end (strict TS)"],
                    [C.green, "Auth is role-aware at route + data + action layer"],
                    [C.green, "Mock → real backend is a one-line env swap"],
                    [C.green, "Realtime hub: today setInterval, tomorrow WS"],
                    [C.green, "can(perm) resolves wildcards and role hierarchy"],
                    [C.blue, "TanStack Query cache is the single source of truth"],
                    [C.blue, "Realtime pushes via setQueryData not Zustand"],
                  ].map(([c, msg]) => (
                    <div key={msg} style={{ display: "flex", gap: 8 }}>
                      <span style={{ color: c, flexShrink: 0 }}>✓</span>
                      <span style={{ color: C.subtle }}>{msg}</span>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── INTEGRATIONS MARQUEE ── */}
      <section style={{ position: "relative", zIndex: 1, borderBottom: `1px solid ${C.border}`, background: C.bg, overflow: "hidden" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "72px 24px" }}>
          <FadeIn>
            <div style={{ textAlign: "center", marginBottom: 36 }}>
              <SLabel>Integrations</SLabel>
              <h2 style={{ fontSize: 34, fontWeight: 800, letterSpacing: "-0.03em", color: C.text, marginBottom: 8 }}>Plays well with your entire stack.</h2>
              <p style={{ fontSize: 13.5, color: C.muted }}>Native connectors for queues, observability, alerting, SCM, CI/CD and identity providers.</p>
            </div>
          </FadeIn>
          <div style={{ position: "relative" }}>
            <div style={{
              position: "absolute", left: 0, top: 0, bottom: 0, width: 80,
              background: "linear-gradient(90deg, #080809, transparent)", zIndex: 2,
            }} />
            <div style={{
              position: "absolute", right: 0, top: 0, bottom: 0, width: 80,
              background: "linear-gradient(270deg, #080809, transparent)", zIndex: 2,
            }} />
            {/* Row 1 */}
            <div style={{ overflow: "hidden", marginBottom: 10 }}>
              <div style={{ display: "flex", gap: 10, animation: "marquee 28s linear infinite", width: "max-content" }}>
                {[...INTEGRATIONS, ...INTEGRATIONS].map((n, i) => <Chip key={`r1-${i}`} label={n} />)}
              </div>
            </div>
            {/* Row 2 - reversed */}
            <div style={{ overflow: "hidden" }}>
              <div style={{ display: "flex", gap: 10, animation: "marquee 22s linear infinite reverse", width: "max-content" }}>
                {[...INTEGRATIONS.slice().reverse(), ...INTEGRATIONS.slice().reverse()].map((n, i) => <Chip key={`r2-${i}`} label={n} />)}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section style={{ position: "relative", zIndex: 1, borderBottom: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "80px 24px", textAlign: "center" }}>
          <FadeIn>
            <SLabel>What engineers say</SLabel>
            <div style={{ position: "relative", minHeight: 220, marginBottom: 32 }}>
              {TESTIMONIALS.map((t, i) => (
                <div key={t.name} style={{
                  position: "absolute", inset: 0,
                  opacity: i === activeT ? 1 : 0,
                  transform: `translateY(${i === activeT ? 0 : 12}px)`,
                  pointerEvents: i === activeT ? "auto" : "none",
                  transition: "all 0.55s cubic-bezier(0.4,0,0.2,1)",
                }}>
                  <div style={{ display: "flex", justifyContent: "center", marginBottom: 20 }}>
                    {Array(5).fill(0).map((_, j) => <Star key={j} size={14} fill={C.amber} color={C.amber} />)}
                  </div>
                  <blockquote style={{ fontSize: 18, fontWeight: 500, color: C.text, lineHeight: 1.7, maxWidth: 700, margin: "0 auto 24px" }}>
                    "{t.body}"
                  </blockquote>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}>
                    <div style={{
                      width: 38, height: 38, borderRadius: "50%",
                      background: `${t.color}20`, border: `1px solid ${t.color}40`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontWeight: 700, fontSize: 12, color: t.color,
                      fontFamily: "JetBrains Mono, monospace",
                    }}>{t.initials}</div>
                    <div style={{ textAlign: "left" }}>
                      <div style={{ fontSize: 13.5, fontWeight: 600, color: C.text }}>{t.name}</div>
                      <div style={{ fontSize: 12, color: C.muted }}>{t.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", justifyContent: "center", gap: 6 }}>
              {TESTIMONIALS.map((_, i) => (
                <button key={i} onClick={() => setActiveT(i)}
                  style={{
                    height: 6, width: i === activeT ? 28 : 6, borderRadius: 3,
                    background: i === activeT ? C.blue : C.border2,
                    border: "none", cursor: "pointer", padding: 0,
                    transition: "all 0.3s cubic-bezier(0.4,0,0.2,1)",
                  }} />
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section id="pricing" style={{ position: "relative", zIndex: 1, borderBottom: `1px solid ${C.border}`, background: C.bg }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "80px 24px" }}>
          <FadeIn>
            <div style={{ textAlign: "center", marginBottom: 48 }}>
              <SLabel>Pricing</SLabel>
              <h2 style={{ fontSize: 34, fontWeight: 800, letterSpacing: "-0.03em", color: C.text, marginBottom: 8 }}>Simple, transparent, per-host.</h2>
              <p style={{ fontSize: 13.5, color: C.muted }}>No data ingestion tax. No per-seat fees. Flat per-host pricing that scales with your infra.</p>
            </div>
          </FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, maxWidth: 1000, margin: "0 auto" }}>
            {[
              {
                name: "Hobby", price: "$0", period: "/mo", popular: false, desc: "For local dev and solo engineers.", color: C.faint,
                feats: ["1 workspace", "7-day retention", "3 synthetic monitors", "Community support", "Basic alerting", "All core observability"]
              },
              {
                name: "Team", price: "$29", period: "/host/mo", popular: true, desc: "For growing engineering teams.", color: C.blue,
                feats: ["10 workspaces", "30-day retention", "Unlimited monitors", "SSO + audit log", "Priority support", "On-call rotations", "MLOps dashboard", "Deployment intelligence"]
              },
              {
                name: "Enterprise", price: "Custom", period: "", popular: false, desc: "For production-grade at scale.", color: C.purple,
                feats: ["Unlimited workspaces", "Custom retention", "SAML SSO + SCIM", "Dedicated CSM", "Custom SLA", "Private cluster", "Custom connectors", "White-label option"]
              },
            ].map((t, i) => (
              <FadeIn key={t.name} delay={i * 80}>
                <div style={{
                  borderRadius: 16, padding: 24, position: "relative",
                  border: `${t.popular ? "2px" : "1px"} solid ${t.popular ? "rgba(59,130,246,0.45)" : C.border}`,
                  background: t.popular ? "rgba(59,130,246,0.05)" : C.surface,
                  transition: "transform 0.2s, box-shadow 0.2s",
                }}>
                  {t.popular && (
                    <div style={{
                      position: "absolute", top: -14, left: "50%", transform: "translateX(-50%)",
                      background: C.blue, color: "#fff", fontFamily: "JetBrains Mono, monospace",
                      fontSize: 9.5, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em",
                      padding: "3px 14px", borderRadius: 100, boxShadow: "0 4px 14px rgba(59,130,246,0.35)",
                      whiteSpace: "nowrap",
                    }}>Most popular</div>
                  )}
                  <div style={{ fontSize: 14, fontWeight: 700, color: C.text, marginBottom: 4 }}>{t.name}</div>
                  <div style={{ fontFamily: "JetBrains Mono, monospace", marginBottom: 4 }}>
                    <span style={{ fontSize: 36, fontWeight: 800, color: C.text }}>{t.price}</span>
                    <span style={{ fontSize: 12, color: C.muted }}>{t.period}</span>
                  </div>
                  <p style={{ fontSize: 12.5, color: C.muted, marginBottom: 20, lineHeight: 1.6 }}>{t.desc}</p>
                  <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 24 }}>
                    {t.feats.map(f => (
                      <div key={f} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12.5, color: C.muted }}>
                        <Check size={13} color={C.green} style={{ flexShrink: 0 }} /> {f}
                      </div>
                    ))}
                  </div>
                  <a href="#" style={{
                    display: "flex", alignItems: "center", justifyContent: "center",
                    width: "100%", padding: "10px 0", borderRadius: 9,
                    fontSize: 13, fontWeight: 600, gap: 6,
                    ...(t.popular
                      ? { background: C.blue, color: "#fff", boxShadow: "0 4px 16px rgba(59,130,246,0.3)" }
                      : { background: C.surface2, color: C.muted, border: `1px solid ${C.border}` }),
                  }}>
                    {t.price === "Custom" ? "Contact sales" : "Get started"} <ArrowRight size={13} />
                  </a>
                </div>
              </FadeIn>
            ))}
          </div>
          <p style={{ textAlign: "center", fontFamily: "JetBrains Mono, monospace", fontSize: 11, color: C.faint, marginTop: 24 }}>
            All plans include unlimited team members, full API access and 99.9% uptime SLA.
          </p>
        </div>
      </section>

      {/* ── ROADMAP ── */}
      <section id="roadmap" style={{ position: "relative", zIndex: 1, borderBottom: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "80px 24px" }}>
          <FadeIn>
            <SLabel>Roadmap</SLabel>
            <h2 style={{ fontSize: 34, fontWeight: 800, letterSpacing: "-0.03em", color: C.text, marginBottom: 8 }}>What's coming next.</h2>
            <p style={{ fontSize: 13.5, color: C.muted, marginBottom: 40, maxWidth: 560 }}>
              The platform is production-ready today. These are the enterprise and AI features shipping next.
            </p>
          </FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10 }}>
            {[
              {
                cat: "Frontend", icon: Layers, color: C.blue, q: "Q1 2026",
                items: ["Saved dashboards + share links", "Drag-and-drop dashboard editor", "Virtualized log/event tables", "Keyboard vim-like motions", "Mobile adaptive layouts"]
              },
              {
                cat: "Backend", icon: Server, color: C.green, q: "Q1 2026",
                items: ["OTLP-compatible ingestion", "ClickHouse / Loki adapters", "Multi-tenant RLS policies", "Webhook + cron endpoints", "Trace sampling policies"]
              },
              {
                cat: "AI Systems", icon: Brain, color: C.pink, q: "Q2 2026",
                items: ["AI assistant in ⌘K", "Log clustering + anomaly summaries", "Incident RCA draft generation", "Auto-triage alerts to responders", "Trace anomaly detection"]
              },
              {
                cat: "Infra", icon: Globe, color: C.amber, q: "Q2 2026",
                items: ["WS pub/sub (Durable Objects)", "Multi-region active/active", "Horizontal worker autoscaling", "Automated DR drills", "Cost attribution per team"]
              },
            ].map(({ cat, icon: Icon, color, q, items }, i) => (
              <FadeIn key={cat} delay={i * 60}>
                <div style={{ ...cs, padding: 20, height: "100%" }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
                      <div style={{ width: 30, height: 30, borderRadius: 8, background: `${color}18`, border: `1px solid ${color}28`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <Icon size={14} color={color} />
                      </div>
                      <span style={{ fontSize: 13, fontWeight: 700, color: C.text }}>{cat}</span>
                    </div>
                    <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 9.5, color, background: `${color}12`, border: `1px solid ${color}28`, padding: "2px 8px", borderRadius: 4 }}>{q}</span>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    {items.map(item => (
                      <div key={item} style={{ display: "flex", gap: 8, fontSize: 12, color: C.subtle, lineHeight: 1.4 }}>
                        <span style={{
                          flexShrink: 0, marginTop: 2, width: 14, height: 14, borderRadius: 3,
                          border: `1px solid ${C.border}`, background: "#111113",
                          display: "flex", alignItems: "center", justifyContent: "center",
                        }}>
                          <span style={{ width: 4, height: 4, borderRadius: 1, background: C.faint }} />
                        </span>
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ position: "relative", zIndex: 1, borderBottom: `1px solid ${C.border}`, background: C.bg }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "100px 24px", textAlign: "center", position: "relative", overflow: "hidden" }}>
          <div aria-hidden style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 50% 50%, rgba(59,130,246,0.07), transparent 60%)" }} />
          <FadeIn>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 7,
              border: "1px solid rgba(59,130,246,0.25)", background: "rgba(59,130,246,0.08)",
              borderRadius: 100, padding: "4px 16px 4px 12px",
              fontSize: 11.5, fontFamily: "JetBrains Mono, monospace", color: C.blue, marginBottom: 28,
            }}>
              <Zap size={12} /> No signup required for demo workspace
            </div>
            <h2 style={{ fontSize: 44, fontWeight: 800, letterSpacing: "-0.035em", color: C.text, maxWidth: 700, margin: "0 auto 16px", lineHeight: 1.1 }}>
              Ship observability your engineers will actually use.
            </h2>
            <p style={{ fontSize: 15, color: C.muted, maxWidth: 480, margin: "0 auto 36px" }}>
              Full-featured demo. Real live data. No credit card. Launch in seconds.
            </p>
            <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap" }}>
              <a href="#" style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                background: "linear-gradient(135deg, #3b82f6, #06b6d4)",
                color: "#fff", fontWeight: 700, fontSize: 14,
                padding: "12px 28px", borderRadius: 10,
                boxShadow: "0 8px 32px rgba(59,130,246,0.35)",
                transition: "transform 0.15s, box-shadow 0.15s",
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 12px 40px rgba(59,130,246,0.45)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = "0 8px 32px rgba(59,130,246,0.35)"; }}>
                Open console <ArrowRight size={15} />
              </a>
              <a href="#" style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                border: `1px solid ${C.border2}`, background: C.surface,
                color: C.muted, fontSize: 14, fontWeight: 500,
                padding: "12px 28px", borderRadius: 10, transition: "all 0.15s",
              }}
                onMouseEnter={e => { e.currentTarget.style.color = C.text; e.currentTarget.style.borderColor = C.faint; }}
                onMouseLeave={e => { e.currentTarget.style.color = C.muted; e.currentTarget.style.borderColor = C.border2; }}>
                Create workspace
              </a>
            </div>
            {/* Stats */}
            <div style={{ display: "flex", justifyContent: "center", gap: 48, marginTop: 56 }}>
              {[
                { v: "2,400+", l: "Engineering teams" },
                { v: "99.992%", l: "Platform uptime" },
                { v: "26", l: "Features shipped" },
                { v: "<2min", l: "Time to first trace" },
              ].map(({ v, l }) => (
                <div key={l} style={{ textAlign: "center" }}>
                  <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 28, fontWeight: 800, color: C.text }}>{v}</div>
                  <div style={{ fontSize: 12, color: C.muted, marginTop: 2 }}>{l}</div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ position: "relative", zIndex: 1, borderTop: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "56px 24px 32px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr", gap: 40, marginBottom: 48 }}>
            {/* Brand */}
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 14 }}>
                <div style={{ width: 28, height: 28, borderRadius: 7, background: "linear-gradient(135deg, #3b82f6, #06b6d4)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Activity size={14} color="#fff" strokeWidth={2.5} />
                </div>
                <span style={{ fontWeight: 800, fontSize: 15, letterSpacing: "-0.02em", color: C.text }}>Pulse</span>
              </div>
              <p style={{ fontSize: 12.5, color: C.faint, lineHeight: 1.7, maxWidth: 220, marginBottom: 18 }}>
                Distributed event processing & observability for modern engineering teams.
              </p>
              {/* Status */}
              <div style={{
                display: "inline-flex", alignItems: "center", gap: 6,
                border: `1px solid rgba(34,197,94,0.2)`, background: "rgba(34,197,94,0.06)",
                borderRadius: 6, padding: "4px 10px",
                fontFamily: "JetBrains Mono, monospace", fontSize: 10, color: C.green,
              }}>
                <span style={{ width: 5, height: 5, borderRadius: "50%", background: C.green, animation: "blink 2s infinite" }} />
                All systems operational
              </div>
            </div>

            {[
              { h: "Product", ls: ["Features", "Pricing", "Changelog", "Roadmap", "Status"] },
              { h: "Docs", ls: ["Getting started", "API reference", "SDKs", "Integrations", "Security"] },
              { h: "Company", ls: ["About", "Blog", "Careers", "Contact", "Press"] },
              { h: "Legal", ls: ["Privacy", "Terms", "Security", "Cookie policy", "SLA"] },
            ].map(({ h, ls }) => (
              <div key={h}>
                <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 9.5, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: C.faint, marginBottom: 14 }}>{h}</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {ls.map(l => (
                    <a key={l} href="#" style={{ fontSize: 12.5, color: C.faint, transition: "color 0.15s" }}
                      onMouseEnter={e => e.target.style.color = C.text}
                      onMouseLeave={e => e.target.style.color = C.faint}>{l}</a>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Bottom bar */}
          <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 24, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span style={{ fontSize: 12, color: C.faint }}>© 2025 Pulse Inc. All rights reserved.</span>
            <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6, fontFamily: "JetBrains Mono, monospace", fontSize: 10.5, color: C.faint }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: C.green, animation: "blink 2s infinite" }} />
                99.992% uptime · <Num v={Math.round(metrics.eventsPerSec)} /> ev/s · us-east-1 · us-west-2 · eu-central-1
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}