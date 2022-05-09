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
        h1: ['64px', {
          lineHeight: '80px',
        }],
        h2: ['48px', {
          lineHeight: '64px',
        }],
        h3: ['36px', {
          lineHeight: '54px',
        }],
        h4: ['34px', {
          lineHeight: '51px',
        }],
        h5: ['20px', {
          lineHeight: '30px',
        }],
        h6: ['18px', {
          lineHeight: '28px',
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
        'button-medium': ['14px', {
          lineHeight: '24px',
        }],
        'button-large': ['15px', {
          lineHeight: '26px',
        }]
      },
      padding: {
        30: '120px'
      },
      boxShadow: {
        z4: '-4px 4px 24px 0px rgba(145, 158, 171, 0.12)',
        z12: '-12px 12px 48px -4px rgba(145, 158, 171, 0.12)',
        z16: '-16px 16px 56px -8px rgba(145, 158, 171, 0.16)',
      }
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
};
