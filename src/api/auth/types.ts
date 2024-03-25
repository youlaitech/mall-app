export interface LoginData {
    grant_type: string;
    mobile: string;
    code: string;
    client_id: string;
    client_secret: string;
}

/**
 * 登录响应
 */
export interface LoginResult {
    /**
     * 访问token
     */
    access_token?: string;
    /**
     * 过期时间(单位：毫秒)
     */
    expires?: number;
    /**
     * 刷新token
     */
    refresh_token?: string;
    /**
     * token 类型
     */
    token_type?: string;
}
