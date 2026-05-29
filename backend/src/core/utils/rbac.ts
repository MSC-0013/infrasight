import type { UserRole } from '@prisma/client';

const ROLE_PERMISSIONS: Record<UserRole, string[]> = {
  super_admin: [
    'read:dashboard', 'read:events', 'read:traces', 'read:logs', 'read:topology',
    'read:analytics', 'manage:incidents', 'manage:alerts', 'manage:deployments',
    'manage:queues', 'manage:workers', 'manage:users', 'manage:billing',
    'manage:settings', 'manage:api_keys', 'manage:org', 'use:ai', 'read:audit',
  ],
  admin: [
    'read:dashboard', 'read:events', 'read:traces', 'read:logs', 'read:topology',
    'read:analytics', 'manage:incidents', 'manage:alerts', 'manage:deployments',
    'manage:users', 'manage:billing', 'manage:settings', 'manage:api_keys',
    'use:ai', 'read:audit',
  ],
  sre: [
    'read:dashboard', 'read:events', 'read:traces', 'read:logs', 'read:topology',
    'read:analytics', 'manage:incidents', 'manage:alerts', 'manage:deployments',
    'manage:queues', 'manage:workers', 'use:ai',
  ],
  developer: [
    'read:dashboard', 'read:events', 'read:traces', 'read:logs', 'read:topology',
    'read:analytics', 'manage:incidents', 'use:ai',
  ],
  viewer: [
    'read:dashboard', 'read:events', 'read:traces', 'read:logs', 'read:topology',
    'read:analytics',
  ],
};

export function getPermissionsForRole(role: UserRole): string[] {
  return ROLE_PERMISSIONS[role] ?? [];
}

export function hasPermission(role: UserRole, permission: string): boolean {
  return getPermissionsForRole(role).includes(permission);
}

export function requireMinRole(userRole: UserRole, allowed: UserRole[]): boolean {
  const hierarchy: UserRole[] = ['viewer', 'developer', 'sre', 'admin', 'super_admin'];
  const userLevel = hierarchy.indexOf(userRole);
  return allowed.some((r) => userLevel >= hierarchy.indexOf(r));
}
