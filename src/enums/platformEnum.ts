/**
 * 平台
 */
export enum PLATFORMS {
    DEFAULT = 'DEFAULT' /* 默认 */,
    VUE3 = 'VUE3' /* HBuilderX 3.2.0+ */,
    APP_PLUS = 'APP-PLUS' /* App */,
    APP_PLUS_NVUE = 'APP-PLUS-NVUE' /* App nvue 页面 */,
    APP_NVUE = 'APP-NVUE' /* App nvue 页面 */,
    H5 = 'H5' /* H5 */,
    MP_WEIXIN = 'MP-WEIXIN' /* 微信小程序 */,
    MP_ALIPAY = 'MP-ALIPAY' /* 支付宝小程序 */,
    MP_BAIDU = 'MP_BAIDU' /* 百度小程序 */,
    MP_TOUTIAO = 'MP-TOUTIAO' /* 字节跳动小程序 */,
    MP_LARK = 'MP-LARK' /* 飞书小程序 */,
    MP_QQ = 'MP-QQ' /* QQ小程序 */,
    MP_KUAISHOU = 'MP-KUAISHOU' /* 快手小程序 */,
    MP_JD = 'MP-JD' /* 京东小程序 */,
    MP_360 = 'MP-360' /* 360小程序 */,
    MP = 'MP' /* 微信小程序/支付宝小程序/百度小程序/字节跳动小程序/飞书小程序/QQ小程序/360小程序 */,
    QUICKAPP_WEBVIEW = 'QUICKAPP-WEBVIEW' /* 快应用通用(包含联盟、华为) */,
    QUICKAPP_WEBVIEW_UNION = 'QUICKAPP-WEBVIEW-UNION' /* 快应用联盟 */,
    QUICKAPP_WEBVIEW_HUAWEI = 'QUICKAPP-WEBVIEW-HUAWEI' /* 快应用华为 */,
}

/**
 * 平台环境
 * @constructor
 */
function PLATFORM_ENV() {
    let platform = PLATFORMS.DEFAULT;

    /* #ifdef VUE3 */
    platform = PLATFORMS.VUE3;
    /* #endif */

    /* #ifdef APP-PLUS */
    platform = PLATFORMS.APP_PLUS;
    /* #endif */

    /* #ifdef APP-PLUS-NVUE */
    platform = PLATFORMS.APP_PLUS_NVUE;
    /* #endif */

    /* #ifdef APP-NVUE */
    platform = PLATFORMS.APP_NVUE;
    /* #endif */

    /* #ifdef H5 */
    platform = PLATFORMS.H5;
    /* #endif */

    /* #ifdef MP */
    platform = PLATFORMS.MP;
    /* #endif */

    /* #ifdef MP-WEIXIN */
    platform = PLATFORMS.MP_WEIXIN;
    /* #endif */

    /* #ifdef MP-ALIPAY */
    platform = PLATFORMS.MP_ALIPAY;
    /* #endif */

    /* #ifdef MP_BAIDU */
    platform = PLATFORMS.MP_BAIDU;
    /* #endif */

    /* #ifdef MP-TOUTIAO */
    platform = PLATFORMS.MP_TOUTIAO;
    /* #endif */

    /* #ifdef MP-LARK */
    platform = PLATFORMS.MP_LARK;
    /* #endif */

    /* #ifdef MP-QQ */
    platform = PLATFORMS.MP_QQ;
    /* #endif */

    /* #ifdef MP-KUAISHOU */
    platform = PLATFORMS.MP_KUAISHOU;
    /* #endif */

    /* #ifdef MP-JD */
    platform = PLATFORMS.MP_JD;
    /* #endif */

    /* #ifdef MP-360 */
    platform = PLATFORMS.MP_360;
    /* #endif */

    /* #ifdef QUICKAPP-WEBVIEW */
    platform = PLATFORMS.QUICKAPP_WEBVIEW;
    /* #endif */

    /* #ifdef QUICKAPP-WEBVIEW-UNION */
    platform = PLATFORMS.QUICKAPP_WEBVIEW_UNION;
    /* #endif */

    /* #ifdef QUICKAPP-WEBVIEW-HUAWEI */
    platform = PLATFORMS.QUICKAPP_WEBVIEW_HUAWEI;
    /* #endif */

    return platform;
}

/**
 * 当前平台
 * 在微信小程序中 "process.env['UNI_PLATFORM']" 无效
 */
export const CURRENT_PLATFORM = PLATFORM_ENV();
