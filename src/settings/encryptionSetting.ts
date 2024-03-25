import { getEnvValue, getPkgVersion, isDevMode } from '@/utils/env';

// System default cache time, in seconds
export const DEFAULT_CACHE_TIME = 60 * 60 * 24 * 7;
const PREFIX = getEnvValue<string>('VITE_APP_CACHE_PREFIX') || getEnvValue<string>('VITE_APP_TITLE') || 'UNI_APP_VUE3_TS';
export const DEFAULT_PREFIX_KEY = `${PREFIX}${getPkgVersion()}`;

// aes encryption key
export const cacheCipher = {
    key: 'aQ0{gD1@c_0@oH5:',
    iv: 'aF0#gC_$hE1$eA1!',
};

// Whether the system cache is encrypted using aes
export const enableStorageEncryption = !isDevMode();
