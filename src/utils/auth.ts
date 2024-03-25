import { getCache } from '@/utils/cache';
import { TOKEN_KEY } from '@/enums/cacheEnum';

export const TOKEN = () => getCache<string>(TOKEN_KEY) || undefined;
