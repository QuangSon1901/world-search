/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}', './app/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            spacing: {
                header: '80px',
            },
            colors: {
                bg: {
                    primary: '#FFFFFF',
                    second: '#F5F8F9',
                },
                color: {
                    primary: '#2074BB',
                },
                text: {
                    primary: '#242938',
                    red: '#D14242',
                    AA: '#AAAAAA',
                },
                border: 'D9D9D9',
            },
            fontSize: {
                primary: '1.6rem',
            },
        },
    },
    plugins: [],
};
