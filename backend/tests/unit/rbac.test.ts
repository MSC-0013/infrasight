import { describe, expect, it } from 'vitest';
import { getPermissionsForRole, hasPermission } from '../../src/core/utils/rbac.js';

describe('RBAC', () => {
  it('grants viewer read permissions only', () => {
    const perms = getPermissionsForRole('viewer');
    expect(perms).toContain('read:events');
    expect(perms).not.toContain('manage:users');
  });

  it('grants admin manage:users', () => {
    expect(hasPermission('admin', 'manage:users')).toBe(true);
  });

  it('denies developer manage:queues', () => {
    expect(hasPermission('developer', 'manage:queues')).toBe(false);
  });
});
