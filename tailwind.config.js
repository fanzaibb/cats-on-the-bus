module.exports = {
    mode: 'jit',
    purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    darkMode: false, // or 'media' or 'class'
    theme: {
        colors: {
            white: '#ffffff',
            black: '#000000',
            gray: {
                2: '#666666',
                3: '#999999',
                4: '#cccccc',
                5: '#EEEEEE'
            },
            blue: {
                2: '#5B81E2'
            },
            orange: '#FFC55A',
            red: '#E25B6C'

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
