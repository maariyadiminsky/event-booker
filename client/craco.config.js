const path = require('path');

module.exports = {
    webpack: {
        alias: {
            '@modules': path.resolve(__dirname, 'src/modules'),
        }
    },
    style: {
        postcss: {
            plugins: [
                require('tailwindcss'),
                require('autoprefixer'),
            ],
        },
    },
}