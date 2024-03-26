/**  登录参数 */
export interface LoginData {
    /** 授权方式 */
    grant_type: string;
    /** 手机号 */
    mobile: string;
    /** 验证码 */
    code: string;
}

/** 登录响应 */
export interface LoginResult {
    /** 访问token */
    access_token?: string;
    /** 过期时间(单位：毫秒) */
    expires?: number;
    /** 刷新token */
    refresh_token?: string;
    /** token 类型 */
    token_type?: string;
}
