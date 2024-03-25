import presetWeapp from 'unocss-preset-weapp';
import { presetIcons } from 'unocss';
import { transformerAttributify, transformerClass } from 'unocss-preset-weapp/transformer';

import transformerDirectives from '@unocss/transformer-directives';

export default {
    presets: [
        // https://github.com/MellowCo/unocss-preset-weapp
        presetWeapp(),
        presetIcons(),
    ],
    shortcuts: [
        {
            'border-base': 'border border-gray-500_10',
            center: 'flex justify-center items-center',
        },
    ],
    transformers: [
        transformerDirectives({
            enforce: 'pre',
        }),

        // https://github.com/MellowCo/unocss-preset-weapp/tree/main/src/transformer/transformerClass
        transformerClass(),
    ],
    theme: {
        color: {
            blue: 'rgba(22, 33, 255, 1)',
            red: '#e74c3c',
            sun: '#f1c40f',
            green: '#16a085',
        },
        border: {
            blue: 'rgba(22, 33, 255, 1)',
            red: '#e74c3c',
            sun: '#f1c40f',
            green: '#16a085',
        },
    },
};
