import { getEnvValue } from '@/utils/env';

const projectName = getEnvValue<string>('VITE_APP_TITLE');

export function warn(message: string) {
    console.warn(`[${projectName} warn]:${message}`);
}

export function error(message: string) {
    throw new Error(`[${projectName} error]:${message}`);
}
