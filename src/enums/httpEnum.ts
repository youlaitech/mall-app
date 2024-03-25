/**
 * @description: 请求结果设置
 */
export enum ResultEnum {
    SUCCESS = '00000',
    FAIL = 'B0001',
    ERROR = 1,
    TIMEOUT = 401,
    TYPE = 'success',
}

/**
 * @description: contentType
 */
export enum ContentTypeEnum {
    // json
    JSON = 'application/json;charset=UTF-8',
    // form-data qs
    FORM_URLENCODED = 'application/x-www-form-urlencoded;charset=UTF-8',
    // form-data  upload
    FORM_DATA = 'multipart/form-data;charset=UTF-8',
}
