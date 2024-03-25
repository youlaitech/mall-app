// 参考：https://eslint.bootcss.com/docs/rules/
// 参考：https://blog.csdn.net/x550392236/article/details/89497202
// 参考：https://blog.csdn.net/brokenkay/article/details/111106266

module.exports = {
    root: true,
    /**环境提供预定义的全局变量 */
    env: {
        /**Node.js全局变量和Node.js范围 */
        node: true,
        /**浏览器全局变量 */
        browser: true,
    },
    /**定义ESLint的解析器 */
    parser: 'vue-eslint-parser',
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        parser: '@typescript-eslint/parser',
    },
    /**定义文件继承的子规范 */
    extends: ['eslint:recommended', 'plugin:vue/vue3-essential', 'plugin:@typescript-eslint/recommended','./.eslintrc-auto-import.json'],
    plugins: ['vue', '@typescript-eslint'],
    rules: {
        'no-var': 'error', //要求使用 let 或 const 而不是 var
        camelcase: 'error', // 双峰驼命名格式
        indent: ['error', 4, { SwitchCase: 1 }], //代码缩进2个空格
        semi: ['error', 'always'], //行尾需要有分号
        quotes: ['error', 'single'], //强制使用一致的反勾号、双引号或单引号
        'linebreak-style': ['error', 'windows'], //强制使用一致的换行风格,"unix"：\n 表示 LF , "windows"：\r\n 表示 CRLF
        eqeqeq: ['error', 'always', { null: 'ignore' }], //比较时强制使用 === 或者 !==,但对null作比较时可以不用全等
        'no-unused-vars': 'off',
        '@typescript-eslint/no-unused-vars': [
            'warn',
            {
                argsIgnorePattern: '^_',
                varsIgnorePattern: '^_',
            },
        ], //不允许使用未使用的变量
        '@typescript-eslint/no-explicit-any': 'off', //不允许任何类型
        '@typescript-eslint/no-empty-function': 'off', //不允许空函数
        'vue/html-indent': ['error', 4], //在<template>中强制一致缩进
        'vue/singleline-html-element-content-newline': 'off', //要求在单行元素的内容之前和之后有一个换行符
        'vue/max-attributes-per-line': 'off', //执行每行的最大属性数(被 prettier 最大单行控制了暂off)
        'vue/multi-word-component-names': 'off', //要求组件名称始终为多字
        'vue/html-self-closing': 'off', //执行自我封闭式
        'no-undef': 'off', //禁用未声明的变量，除非它们在 /*global */ 注释中被提到
        '@typescript-eslint/ban-ts-comment': 'off', // 不允许@ts-<指令>评论或要求指令后的描述
        '@typescript-eslint/ban-types': 'off', // 不允许某些类型
        '@typescript-eslint/no-non-null-assertion': 'off', // 不允许使用！后缀操作符的非空断言
    },
    globals: {
        //可以定义全局中的变量的权限（只读，可读可写）
        defineProps: 'readonly',
        defineEmits: 'readonly',
        defineExpose: 'readonly',
        withDefaults: 'readonly',
        uni: 'readonly',
    },
    ignorePatterns: [
        // # 忽略目录
        '/dist',
        '/public',
        '/src/public',
        '/src/static',
        '/node_modules',
        // # 忽略文件
        '**/*-min.js',
        '**/*.min.js',
        '**/*-min.css',
        '**/*.min.css',
        '**/*.tsbuildinfo',
        '**/*.config.js',
        '**/*.config.ts',
        '/src/manifest.json',
    ],
};
