import pkg from '../../package.json';
import { judgePlatform } from '@/utils/platform';
import { PLATFORMS } from '@/enums/platformEnum';

/**
 * @description: Generate cache key according to version
 */
export function getPkgVersion() {
    return `${`__${pkg.version}`}__`.toUpperCase();
}

/**
 * @description: Development mode
 */
export const devMode = 'development';

/**
 * @description: Production mode
 */
export const prodMode = 'production';

/**
 * @description: Get environment mode
 * @returns:
 * @example:
 */
export function getEnvMode(): string {
    return getEnvValue('VITE_ENV');
}

/**
 * @description: Get environment variables
 * @returns:
 * @example:
 */
export function getEnvValue<T = string>(key: keyof ImportMetaEnv): T {
    const envValue = import.meta.env[key];
    return (envValue === 'true' ? true : envValue === 'false' ? false : envValue) as unknown as T;
}

/**
 * @description: Is it a development mode
 * @returns:
 * @example:
 */
export function isDevMode(): boolean {
    return getEnvMode() === devMode;
}

/**
 * @description: Is it a production mode
 * @returns:
 * @example:
 */
export function isProdMode(): boolean {
    return getEnvMode() === prodMode;
}

/**
 * @description: Whether to use mock data
 * @returns:
 * @example:
 */
export function isUseMock(): boolean {
    return getEnvValue('VITE_USE_MOCK');
}

/**
 * @description: Get environment VITE_APP_API_URL value
 * @returns:
 * @example:
 */
export function getBaseURL(): string {
    return getEnvValue<string>('VITE_APP_BASE_API');
}

/**
 * @description: Get environment VITE_UPLOAD_URL value
 * @returns:
 * @example:
 */
export function getUploadUrl(): string {
    if (judgePlatform(PLATFORMS.H5) && isDevMode()) return '/upload';
    return getEnvValue<string>('VITE_UPLOAD_URL');
}
