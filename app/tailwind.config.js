module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#FA541C',
        'primary-dark': '#B3200E',
        gray: {
          100: '#F9FAFB',
          200: '#F4F6F8',
          300: '#DFE3E8',
          400: '#C4CDD5',
          500: '#919EAB',
          600: '#637381',
          700: '#454F5B',
          800: '#212B36',
          900: '#161C24',
        },
      },
      spacing: {
        '28': '7rem',
      },
      fontSize: {
        h1: ['2.5rem', {
          lineHeight: '1.25',
        }],
        'h1-md': ['3.25rem', {
          lineHeight: '1.25',
        }],
        'h1-lg': ['3.625rem', {
          lineHeight: '1.25',
        }],
        'h1-xl': ['4rem', {
          lineHeight: '1.25',
        }],
        h2: ['2rem', {
          lineHeight: '1.333',
        }],
        'h2-md': ['2.5rem', {
          lineHeight: '1.333',
        }],
        'h2-lg': ['2.75rem', {
          lineHeight: '1.333',
        }],
        'h2-xl': ['3rem', {
          lineHeight: '1.25',
        }],
        h3: ['1.5rem', {
          lineHeight: '1.5',
        }],
        'h3-md': ['1.625rem', {
          lineHeight: '1.5',
        }],
        'h3-lg': ['1.875', {
          lineHeight: '1.5',
        }],
        'h3-xl': ['2rem', {
          lineHeight: '1.25',
        }],
        h4: ['1.25rem', {
          lineHeight: '1.5',
        }],
        'h4-md': ['1.25rem', {
          lineHeight: '1.5',
        }],
        'h4-lg': ['1.5rem', {
          lineHeight: '1.5',
        }],
        'h4-xl': ['1.5rem', {
          lineHeight: '1.5',
        }],
        h5: ['1.125rem', {
          lineHeight: '1.5',
        }],
        'h5-md': ['1.1875rem', {
          lineHeight: '1.5',
        }],
        'h5-lg': ['1.25rem', {
          lineHeight: '1.5',
        }],
        'h5-xl': ['1.25rem', {
          lineHeight: '1.5',
        }],
        h6: ['1.0625rem', {
          lineHeight: '1.55',
        }],
        'h6-md': ['1.125rem', {
          lineHeight: '1.55',
        }],
        'h6-lg': ['1.125rem', {
          lineHeight: '1.55',
        }],
        'h6-xl': ['1.125rem', {
          lineHeight: '1.55',
        }],
        body1: ['16px', {
          lineHeight: '28px',
        }],
        body2: ['14px', {
          lineHeight: '26px',
        }],
        caption: ['12px', {
          lineHeight: '20px',
        }],
        'button-small': ['0.8125', {
          lineHeight: '1.71429',
        }],
        'button-medium': ['0.875rem', {
          lineHeight: '1.71429',
        }],
        'button-large': ['0.9375rem', {
          lineHeight: '1.71429',
        }]
      },
      padding: {
        30: '120px'
      },
      boxShadow: {
        z1: '0px 1px 2px 0px rgba(145, 158, 171, 0.24)',
        z4: '-4px 4px 24px 0px rgba(145, 158, 171, 0.08)',
        z8: '-8px 8px 24px -8px rgba(145, 158, 171, 0.1)',
        z12: '-12px 12px 48px -4px rgba(145, 158, 171, 0.12)',
        z16: '-16px 16px 56px -8px rgba(145, 158, 171, 0.16)',
        z20: '-20px 20px 64px -8px rgba(145, 158, 171, 0.2)',
        z24: '-24px 24px 72px -8px rgba(145, 158, 171, 0.24)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
};
