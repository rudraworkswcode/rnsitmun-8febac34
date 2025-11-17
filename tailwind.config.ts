import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			fontFamily: {
				'inter': ['Inter', 'sans-serif'],
				'roboto-mono': ['Roboto Mono', 'monospace'],
				// Keep legacy fonts for compatibility
				'playfair': ['Playfair Display', 'serif'],
				'opensans': ['Open Sans', 'sans-serif'],
				'montserrat': ['Montserrat', 'sans-serif'],
			},
			colors: {
				mun: {
					primary: '#3a3c90',
					secondary: '#7E69AB',
					tertiary: '#6E59A5',
					light: '#D6BCFA',
					dark: '#1A1F2C',
					accent: '#8B5CF6',
				},
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'lusion-pulse': {
					'0%, 100%': { transform: 'scale(1) rotate(0deg)', opacity: '1' },
					'50%': { transform: 'scale(1.05) rotate(180deg)', opacity: '0.8' }
				},
				'lusion-glow': {
					'0%, 100%': { boxShadow: '0 0 20px hsl(226 100% 55% / 0.3)' },
					'50%': { boxShadow: '0 0 40px hsl(226 100% 55% / 0.6)' }
				},
				'lusion-float': {
					'0%, 100%': { transform: 'translateY(0px)' },
					'50%': { transform: 'translateY(-10px)' }
				},
				'shimmer': {
					'100%': { transform: 'translateX(50%)' }
				},
				'sparkle': {
					'0%, 100%': { opacity: '0', transform: 'scale(0.5)' },
					'50%': { opacity: '1', transform: 'scale(1.2)' }
				},
				'steam': {
					'0%': { opacity: '0', transform: 'translateY(0) scaleX(1)' },
					'50%': { opacity: '0.6', transform: 'translateY(-20px) scaleX(1.2)' },
					'100%': { opacity: '0', transform: 'translateY(-40px) scaleX(0.8)' }
				},
				'fade-in': {
					'0%': { opacity: '0', transform: 'translateY(10px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				'fade-out': {
					'0%': { opacity: '1', transform: 'translateY(0)' },
					'100%': { opacity: '0', transform: 'translateY(10px)' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'lusion-pulse': 'lusion-pulse 2s cubic-bezier(0.4, 0, 0.2, 1) infinite',
				'lusion-glow': 'lusion-glow 3s ease-in-out infinite',
				'lusion-float': 'lusion-float 6s ease-in-out infinite',
				'shimmer': 'shimmer 2s infinite linear',
				'sparkle': 'sparkle 2s infinite ease-in-out',
    'lusion-fade-in': 'fade-in 0.8s ease-out forwards',
    'fade-in': 'fade-in 0.3s ease-out forwards',
    'fade-out': 'fade-out 0.3s ease-out forwards'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
