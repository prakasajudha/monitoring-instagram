module.exports = {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(0, 0%, 88%)",
        input: "hsl(0, 0%, 88%)",
        ring: "hsl(217, 91%, 60%)",
        background: "hsl(0, 0%, 100%)",
        foreground: "hsl(231, 17%, 20%)",
        primary: {
          DEFAULT: "hsl(217, 91%, 60%)",
          foreground: "hsl(0, 0%, 100%)",
        },
        secondary: {
          DEFAULT: "hsl(217, 70%, 75%)",
          foreground: "hsl(217, 10%, 10%)",
        },
        tertiary: {
          DEFAULT: "hsl(13, 85%, 62%)",
          foreground: "hsl(0, 0%, 100%)",
        },
        neutral: {
          DEFAULT: "hsl(0, 0%, 96%)",
          foreground: "hsl(231, 17%, 20%)",
        },
        success: {
          DEFAULT: "hsl(145, 55%, 45%)",
          foreground: "hsl(0, 0%, 100%)",
        },
        warning: {
          DEFAULT: "hsl(42, 90%, 55%)",
          foreground: "hsl(0, 0%, 100%)",
        },
        destructive: {
          DEFAULT: "hsl(0, 84%, 60%)",
          foreground: "hsl(0, 0%, 100%)",
        },
        muted: {
          DEFAULT: "hsl(0, 0%, 96%)",
          foreground: "hsl(0, 0%, 38%)",
        },
        accent: {
          DEFAULT: "hsl(0, 0%, 96%)",
          foreground: "hsl(231, 17%, 20%)",
        },
        popover: {
          DEFAULT: "hsl(0, 0%, 100%)",
          foreground: "hsl(231, 17%, 20%)",
        },
        card: {
          DEFAULT: "hsl(0, 0%, 100%)",
          foreground: "hsl(231, 17%, 20%)",
        },
        gray: {
          50: "hsl(0, 0%, 98%)",
          100: "hsl(0, 0%, 94%)",
          200: "hsl(0, 0%, 88%)",
          300: "hsl(0, 0%, 77%)",
          400: "hsl(0, 0%, 65%)",
          500: "hsl(0, 0%, 53%)",
          600: "hsl(0, 0%, 38%)",
          700: "hsl(0, 0%, 26%)",
          800: "hsl(0, 0%, 15%)",
          900: "hsl(0, 0%, 7%)",
        },
      },
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
        body: ["Inter", "sans-serif"],
      },
      borderRadius: {
        lg: "12px",
        md: "10px",
        sm: "8px",
      },
      spacing: {
        '4': '1rem',
        '8': '2rem',
        '12': '3rem',
        '16': '4rem',
        '24': '6rem',
        '32': '8rem',
        '48': '12rem',
        '64': '16rem',
      },
      backgroundImage: {
        'gradient-1': 'linear-gradient(135deg, hsl(217, 91%, 60%), hsl(13, 85%, 62%))',
        'gradient-2': 'linear-gradient(120deg, hsl(217, 91%, 60%), hsl(208, 90%, 58%))',
        'button-border-gradient': 'linear-gradient(90deg, hsl(217, 91%, 60%) 0%, hsl(13, 85%, 62%) 100%)',
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
