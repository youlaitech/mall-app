

## 预览

预览地址： [http://app.youlai.tech](http://app.youlai.tech/)

| ![](https://s2.loli.net/2023/06/09/VkYxOTAj9h417v6.jpg) | ![](https://s2.loli.net/2023/06/09/YaWQkxz9Z2uXbtE.jpg) |
| ------------------------------------------------------- | ------------------------------------------------------- |
| ![](https://s2.loli.net/2023/06/09/YXFI7DhNQHBt6ce.jpg) | ![](https://s2.loli.net/2023/06/09/eTXSUjOg9R175DQ.jpg) |




## 启动
### H5 启动

1. 下载 [ HBuilder X](https://www.dcloud.io/hbuilderx.html) 
2.  `Hbuilder X`工具栏点击 `运行`->`运行到内置浏览器` (运行到外置浏览器会有跨域限制，推荐内置浏览器访问)


### 微信小程序

1. 下载 [ HBuilder X](https://www.dcloud.io/hbuilderx.html) 和 [微信开发者工具](https://developers.weixin.qq.com/miniprogram/dev/devtools/stable.html)
2. [微信公众平台](https://mp.weixin.qq.com/)申请小程序，获得小程序的 AppID
3. `微信开发者工具`微信扫码登录，开启服务端口，点击工具栏`设置`->`安全设置`->`安全`->`服务端口`选择打开
4. `Hbuilder X`替换项目AppID 成您刚申请的，点击`manifest.json`文件->微信小程序配置
5. Nacos 控制台修改`youlai-auth`配置中的微信小程序 AppID 和 AppSecret 为自己申请的小程序
6. `Hbuilder X`工具栏点击 `运行`->`运行到小程序模拟器`->`微信开发者工具`



## 接口

默认使用线上接口地址(https://api.youlai.tech)，如果在本地部署 [youlai-mall](https://gitee.com/youlaitech/youlai-mall)  且想使用本地接口开发调试，请修改 `utils/request.js` 的接口地址 `baseURL ` 为 http://localhost:9999  即可。

![](https://s2.loli.net/2023/06/09/ruzqRBj4mE2CfXK.png)


## 交流群🚀

> 关注「有来技术」公众号，获取交流群二维码。
>
> 如果交流群的二维码过期，加我微信，备注「前端」、「后端」或「全栈」即可。
>
> 为了避免营销广告人群混入，此举无奈，望理解！


|公众号|交流群|
|-|-|
|<img src="https://s2.loli.net/2023/05/28/JaG4L8ZHmkIgRQC.png" height="180px"/>|<img src="https://s2.loli.net/2023/06/21/oikXZGOEDJMHpn5.png" height="180px"/>|

