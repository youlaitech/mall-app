# 项目依赖

-   [uniapp-vue3-vite-ts-template](https://gitee.com/h_mo/uniapp-vue3-vite-ts-template)
-   [nuitui-uniapp](https://github.com/nutui-uniapp/nutui-uniapp)
-   [vite-plugin-uni-components](ttps://github.com/uni-helper/vite-plugin-uni-components)

# 导入基础模板

通过 HBuilderX 导入项目 https://gitee.com/h_mo/uniapp-vue3-vite-ts-template

![image-20240226233320600](https://s2.loli.net/2024/02/27/YWOXUausmLcTS7B.png)

# 模板整合 nutui

参考文档：https://nutui-uniapp.netlify.app/guide/quick-start.html

## npm 安装

```bash
pnpm add nutui-uniapp
```

## 组件 TS 类型支持

在 tsconfig.json 中通过 compilerOptions.type 指定全局组件类型。

```json
// tsconfig.json
{
    "compilerOptions": {
        // ...
        "types": ["nutui-uniapp/global.d.ts"]
    }
}
```

## 自动导入

安装 vite-plugin-uni-components， [安装和使用说明](https://github.com/uni-helper/vite-plugin-uni-components)

```bash
pnpm i -D @uni-helper/vite-plugin-uni-components
```

配置 vite.config.ts

```typescript
// Vite中文网：https://vitejs.cn/config/
import { ConfigEnv, loadEnv, UserConfig } from 'vite';
import { resolve } from 'path';
import uni from '@dcloudio/vite-plugin-uni';
import Components from '@uni-helper/vite-plugin-uni-components';
import { NutResolver } from 'nutui-uniapp';

// https://vitejs.dev/config/
export default ({ mode }: ConfigEnv): UserConfig => {
    const root = process.cwd();
    const env = loadEnv(mode, root);
    return {
        // ...
        plugins: [
            // ...
            Components({
                resolvers: [NutResolver()],
                dirs: ['src/components', 'src/**/components'],
                dts: 'typings/components.d.ts',
            }),
            // uni 插件一定要放到后面
            uni(),
        ],
    };
};
```

> 如果你使用 `pnpm` ，请在根目录下创建一个 `.npmrc` 文件，参见[issue](https://github.com/antfu/unplugin-vue-components/issues/389)。

```
// .npmrc
public-hoist-pattern[]=@vue*
// or
// shamefully-hoist = true
```

## 样式引入

在项目文件 `app.vue` 文件中添加如下代码：

```html
// App.vue
<style lang="scss">
    @import 'nutui-uniapp/styles/index';
</style>
```

导入样式变量

```typescript
// vite.config.ts
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
    // ...
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: '@import "nutui-uniapp/styles/variables.scss";',
            },
        },
    },
});
```

## 测试示例

```html
<!-- pages/index/index.vue -->
<template>
    <AppProvider>
        <view class="content">
            <nut-button type="primary"> 主要按钮 </nut-button>
            <!-- ... -->
        </view>
    </AppProvider>
</template>
```

![image-20240227003711245](https://s2.loli.net/2024/02/27/hbiwOjTMAeEUc1s.png)

# UnoCSS

```
pnpm i -D @unocss/transformer-directives
```
