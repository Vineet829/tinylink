module.exports = {
    content: ['./src/**/*.{js,ts,jsx,tsx}'],
    theme: {
      extend: {
        colors: {
          primary: {
            DEFAULT: '#6366F1', 
            dark: '#4F46E5',    
          },
          accent: '#06b6d4',   
        },
        fontFamily: {
          sans: ['Inter', 'system-ui', 'sans-serif'],
          mono: ['Menlo', 'monospace'],
        },
        container: {
          center: true,
          padding: '1rem',
        },
      },
    },
    plugins: [],
  }
  