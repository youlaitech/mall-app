import { PLATFORMS } from '@/enums/platformEnum';

/**
 * 判断是否是某个平台环境
 * @param target 目标平台
 *
 * @return boolean
 */
export function judgePlatform(target: PLATFORMS): boolean {
    let isVue3 = false;
    let isAppPlus = false;
    let isAppPlusNvue = false;
    let isAppNvue = false;
    let isH5 = false;
    let isMp = false;
    let isMpWeinxin = false;
    let isMpAlipay = false;
    let isMpBaidu = false;
    let isMpToutiao = false;
    let isMpLark = false;
    let isMpQq = false;
    let isMpKuaishou = false;
    // let isMpJd = false;
    let isMp360 = false;
    let isQuickAppWebView = false;
    let isQuickAppWebViewUnion = false;
    let isQuickAppWebViewHuawei = false;

    switch (target) {
        case PLATFORMS.VUE3:
            /* #ifdef VUE3 */
            isVue3 = true;
            /* #endif */
            return isVue3;
        case PLATFORMS.APP_PLUS:
            /* #ifdef APP-PLUS */
            isAppPlus = true;
            /* #endif */
            return isAppPlus;
        case PLATFORMS.APP_PLUS_NVUE:
            /* #ifdef APP-PLUS-NVUE */
            isAppPlusNvue = true;
            /* #endif */
            return isAppPlusNvue;
        case PLATFORMS.APP_NVUE:
            /* #ifdef APP-NVUE */
            isAppNvue = true;
            /* #endif */
            return isAppNvue;
        case PLATFORMS.H5:
            /* #ifdef H5 */
            isH5 = true;
            /* #endif */
            return isH5;
        case PLATFORMS.MP:
            /* #ifdef MP */
            isMp = true;
            /* #endif */
            return isMp;
        case PLATFORMS.MP_WEIXIN:
            /* #ifdef MP-WEIXIN */
            isMpWeinxin = true;
            /* #endif */
            return isMpWeinxin;
        case PLATFORMS.MP_ALIPAY:
            /* #ifdef MP-ALIPAY */
            isMpAlipay = true;
            /* #endif */
            return isMpAlipay;
        case PLATFORMS.MP_BAIDU:
            /* #ifdef MP_BAIDU */
            isMpBaidu = true;
            /* #endif */
            return isMpBaidu;
        case PLATFORMS.MP_TOUTIAO:
            /* #ifdef MP-TOUTIAO */
            isMpToutiao = true;
            /* #endif */
            return isMpToutiao;
        case PLATFORMS.MP_LARK:
            /* #ifdef MP-LARK */
            isMpLark = true;
            /* #endif */
            return isMpLark;
        case PLATFORMS.MP_QQ:
            /* #ifdef MP-QQ */
            isMpQq = true;
            /* #endif */
            return isMpQq;
        case PLATFORMS.MP_KUAISHOU:
            /* #ifdef MP-KUAISHOU */
            isMpKuaishou = true;
            /* #endif */
            return isMpKuaishou;
        // case PLATFORMS.MP_JD:
        //     /* #ifdef MP-JD */
        //     isMpJd = true;
        //     /* #endif */
        //     return (isMpJd = true);
        //     break;
        case PLATFORMS.MP_360:
            /* #ifdef MP-360 */
            isMp360 = true;
            /* #endif */
            return isMp360;
        case PLATFORMS.QUICKAPP_WEBVIEW:
            /* #ifdef QUICKAPP-WEBVIEW */
            isQuickAppWebView = true;
            /* #endif */
            return isQuickAppWebView;
        case PLATFORMS.QUICKAPP_WEBVIEW_UNION:
            /* #ifdef QUICKAPP-WEBVIEW-UNION */
            isQuickAppWebViewUnion = true;
            /* #endif */
            return isQuickAppWebViewUnion;
        case PLATFORMS.QUICKAPP_WEBVIEW_HUAWEI:
            /* #ifdef QUICKAPP-WEBVIEW-HUAWEI */
            isQuickAppWebViewHuawei = true;
            /* #endif */
            return isQuickAppWebViewHuawei;
        default:
            return false;
    }
}
