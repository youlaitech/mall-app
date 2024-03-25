import { createAlovaMockAdapter } from '@alova/mock';
import { uniappRequestAdapter, uniappMockResponse } from '@alova/adapter-uniapp';
import { mockGroupV1 } from '@/mock/v1';

/**
 * 模拟数据请求适配器
 * @link https://alova.js.org/zh-CN/extension/alova-mock
 */
export const mockAdapter = createAlovaMockAdapter(mockGroupV1, {
    // 指定uniapp请求适配器后，未匹配模拟接口的请求将使用这个适配器发送请求
    httpAdapter: uniappRequestAdapter,

    // mock接口响应延迟，单位毫秒
    delay: 1500,

    // 是否打印mock接口请求信息
    // mockRequestLogger: false,

    //  模拟响应适配器，指定后响应数据将转换为uniapp兼容的数据格式
    onMockResponse: uniappMockResponse,
});
