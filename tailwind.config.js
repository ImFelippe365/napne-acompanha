/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primary: "#40916C",
        "primary-transparent": "#40916C10",
        "primary-dark": "#000E1A",
        "primary-dark-transparent": "rgba(0,50,73,0.1)",
        "primary-background": "rgba(0,126,167,0.08)",
        "primary-light": "#F4FBFC",
        "secondary-light": "#9AD1D4",
        "light-gray-hover": "#D9D9D925",
        white: "#FFFFFF",
        "light-gray": "#D9D9D9",
        gray: "#808080",
        black: "#3D3D3D",
        placeholder: "#919EAB",
        "background-color": "#FAFAFA",
        contrast: "#4A9E68",
        shape: "#C1C1C1",
        success: "#58AE30",
        error: "#C92A2A",
        warning: "#E1A917",
        "ultra-violet": "#52489C",
        coffee: "#6D4C3D",
        orange: "#FF8600",
        "ultra-violet-transparent": "rgba(82,72,156,0.1)",
        "coffee-transparent": "rgba(109,76,61,0.1)",
        "orange-transparent": "rgba(255,134,0,0.1)",
        "success-transparent": "rgba(88,174,48,0.1)",
        "error-transparent": "rgba(201, 42, 42, 0.1)",
        "warning-transparent": "rgba(225,169,23,0.1)",
        "background-black-transparent": "rgba(0,0,0,0.6)",
      },
      gridTemplateColumns: {
        container: '280px auto',
        profileContainer: '400px auto',
        studentsListContainer: 'repeat(auto-fill, minmax(340px, 1fr))',
        classContainer: 'auto 400px',
        cardsGrid: 'repeat(auto-fill, minmax(224px, 1fr))'
      },
      gridTemplateRows: {
        // cardsGrid: 'repeat(auto-fill, 100px)'
      }
    },
  },
  plugins: [require('flowbite/plugin')],
}