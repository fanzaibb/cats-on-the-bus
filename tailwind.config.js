module.exports = {
    mode: 'jit',
    purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    darkMode: false, // or 'media' or 'class'
    theme: {
        colors: {
            white: '#ffffff',
            black: '#000000'
        },
        extend: {}
    },
    variants: {
        extend: {}
    },
    plugins: [],

    corePlugins: {
        container: false
    }
};
