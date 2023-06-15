/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{html,js,vue}'],
    theme: {
        extend: {
            // backgroundColor: {
            //     'slate': '#131313',
            // },
            colors: {},
        }
    },
    darkMode: 'class',
    // prefix: 'tw-',
    plugins: [require('daisyui')],
    daisyui: {
        themes: ["light", "dark"],
    },
}

