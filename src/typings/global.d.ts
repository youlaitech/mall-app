import { ResultEnum } from '@/enums/httpEnum';
declare global {
    interface API<T = any> {
        code: ResultEnum;
        data?: T;
        message: string;
    }

    /**
     * 分页响应对象
     */
    interface PageResult<T> {
        /** 数据列表 */
        list: T;
        /** 总数 */
        total: number;
    }
}

export {};
