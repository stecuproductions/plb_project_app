/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eef2ff',   // indigo-50
          100: '#e0e7ff',  // indigo-100 
          600: '#4f46e5',  // indigo-600
          700: '#4338ca',  // indigo-700 
          800: '#3730a3',  // indigo-800
          900: '#312e81',  // indigo-900
        },
        secondary: {
          500: '#a855f7',  // purple-500
          600: '#9333ea',  // purple-600
        },
        danger: {
          500: '#ef4444',  // red-500
          600: '#dc2626',  // red-600
        },
        neutral: {
          50: '#fafafa',   // gray-50
          100: '#f5f5f5',  // gray-100
          500: '#737373',  // gray-500
          700: '#404040',  // gray-700
          800: '#262626',  // gray-800
        },
        surface: '#ffffff', // white
      },
      fontFamily: {
        sans: ['Inter'],
      },
      borderRadius: {
        'xl': '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      boxShadow: {
        'sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'DEFAULT': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        'md': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      }
    },
  },
  plugins: [],
}