import { ROLE_LABEL, ROLE_TONE, type Role } from "@/store/auth-store";
import { StatusBadge } from "@/components/status-badge";

export function RoleBadge({ role }: { role: Role }) {
  return <StatusBadge tone={ROLE_TONE[role]}>{ROLE_LABEL[role]}</StatusBadge>;
}
