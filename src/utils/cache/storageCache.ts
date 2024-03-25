import { cacheCipher } from '@/settings/encryptionSetting';
import type { EncryptionParams } from '@/utils/cipher';
import { AesEncryption } from '@/utils/cipher';
import { isNullOrUnDef } from '@/utils/is';

export interface CreateStorageParams extends EncryptionParams {
    prefixKey: string;
    hasEncrypt: boolean;
    timeout?: number | null;
}
export const createStorage = ({
    prefixKey = '',
    key = cacheCipher.key,
    iv = cacheCipher.iv,
    timeout = null,
    hasEncrypt = true,
}: Partial<CreateStorageParams> = {}) => {
    if (hasEncrypt && [key.length, iv.length].some((item) => item !== 16)) {
        throw new Error('When hasEncrypt is true, the key or iv must be 16 bits!');
    }

    const encryption = new AesEncryption({ key, iv });

    /**
     * Cache class
     * Construction parameters can be passed into sessionStorage, localStorage,
     * @class Cache
     * @example
     */
    class Storage {
        private prefixKey?: string;

        private encryption: AesEncryption;

        private hasEncrypt: boolean;

        /**
         *
         * @param {*} storage
         */
        constructor() {
            this.prefixKey = prefixKey;
            this.encryption = encryption;
            this.hasEncrypt = hasEncrypt;
        }

        private getKey(key: string) {
            return `${this.prefixKey}${key}`.toUpperCase();
        }

        /**
         * Set cache
         * @param {string} key
         * @param {*} value
         * @param {*} expire Expiration time in seconds
         * @memberof Cache
         */
        set(key: string, value: any, expire: number | null = timeout) {
            try {
                const stringData = JSON.stringify({
                    value,
                    time: Date.now(),
                    expire: !isNullOrUnDef(expire) ? new Date().getTime() + expire * 1000 : null,
                });
                const stringifyValue = this.hasEncrypt ? this.encryption.encryptByAES(stringData) : stringData;
                uni.setStorageSync(this.getKey(key), stringifyValue);
            } catch (err) {
                throw new Error(`setStorageSync error: ${err}`);
            }
        }

        /**
         * Read cache
         * @param {string} key
         * @param {*} def
         * @memberof Cache
         */
        get<T = any>(key: string, def: any = null): T {
            const val = uni.getStorageSync(this.getKey(key));
            if (!val) return def;

            try {
                const decVal = this.hasEncrypt ? this.encryption.decryptByAES(val) : val;
                const data = JSON.parse(decVal);
                const { value, expire } = data;
                if (isNullOrUnDef(expire) || expire < new Date().getTime()) {
                    this.remove(key);
                    return def;
                }
                return value;
            } catch (e) {
                return def;
            }
        }

        /**
         * Delete cache based on key
         * @param {string} key
         * @memberof Cache
         */
        remove(key: string) {
            uni.removeStorageSync(this.getKey(key));
        }

        /**
         * Delete all caches of this instance
         */
        clear(): void {
            uni.clearStorageSync();
        }
    }
    return new Storage();
};
