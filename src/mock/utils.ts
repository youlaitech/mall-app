import { ResultEnum } from '@/enums/httpEnum';
import { API } from '@/services/model/baseModel';

interface MockResponseOptions<T = any> {
    status: number;
    statusText: string;
    responseHeaders: Record<string, any>;
    body: API<T>;
}

export const createMock = (options: Partial<API>): MockResponseOptions => {
    return {
        status: 200,
        statusText: 'OK',
        responseHeaders: {},
        body: {
            code: ResultEnum.SUCCESS,
            message: 'succeed',
            ...options,
        },
    };
};
