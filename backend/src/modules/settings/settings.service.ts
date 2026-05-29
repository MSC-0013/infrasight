import { AppError } from '../../core/errors/app-error.js';
import { settingsRepository } from './settings.repository.js';
export const settingsService = {
  get: async (orgId: string) => {
    const s = await settingsRepository.get(orgId);
    if (!s) return { orgId, notificationPrefs: {}, retentionDays: 7 };
    return s;
  },
  update: settingsRepository.upsert,
  apiKeys: settingsRepository.listApiKeys,
};
