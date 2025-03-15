
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
			padding: '1rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			fontFamily: {
				sans: ['Roboto', 'sans-serif'],
				display: ['Playfair Display', 'serif'],
			},
			colors: {
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
				vegas: {
					black: '#0A0914',
					darkgray: '#161A26',
					gold: '#FAB005',
					blue: '#3B82F6',
					red: '#EF4444',
					purple: '#9b87f5',
					dark: '#1A1F2C',
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
				'fade-in': {
					'0%': { opacity: '0', transform: 'translateY(10px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				'pulse-neon': {
					'0%, 100%': { boxShadow: '0 0 10px 0 rgba(251, 191, 36, 0.4)' },
					'50%': { boxShadow: '0 0 20px 5px rgba(251, 191, 36, 0.6)' }
				},
				'pulse-gold': {
					'0%, 100%': { boxShadow: '0 0 10px 0 rgba(251, 191, 36, 0.7)' },
					'50%': { boxShadow: '0 0 20px 5px rgba(251, 191, 36, 0.9)' }
				},
				'pulse-blue': {
					'0%, 100%': { boxShadow: '0 0 10px 0 rgba(59, 130, 246, 0.7)' },
					'50%': { boxShadow: '0 0 20px 5px rgba(59, 130, 246, 0.9)' }
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-5px)' }
				},
				'scale-in': {
					'0%': { transform: 'scale(0.95)', opacity: '0' },
					'100%': { transform: 'scale(1)', opacity: '1' }
				},
				'bell-shake': {
					'0%, 100%': { transform: 'rotate(0)' },
					'20%, 80%': { transform: 'rotate(15deg)' },
					'40%, 60%': { transform: 'rotate(-15deg)' }
				},
				'confetti': {
					'0%': { transform: 'translateY(0) rotate(0)', opacity: '1', scale: '0' },
					'100%': { transform: 'translateY(-500px) rotate(720deg)', opacity: '0', scale: '1' }
				},
				'slide-up': {
					'0%': { transform: 'translateY(20px)', opacity: '0' },
					'100%': { transform: 'translateY(0)', opacity: '1' }
				},
				'slide-left': {
					'0%': { transform: 'translateX(20px)', opacity: '0' },
					'100%': { transform: 'translateX(0)', opacity: '1' }
				},
				'slide-right': {
					'0%': { transform: 'translateX(-20px)', opacity: '0' },
					'100%': { transform: 'translateX(0)', opacity: '1' }
				},
				'ticker': {
					'0%': { transform: 'translateX(100%)' },
					'100%': { transform: 'translateX(-100%)' }
				},
				'shimmer': {
					'100%': { transform: 'translateX(100%)' },
				},
				'spin-slow': {
					'0%': { transform: 'rotate(0deg)' },
					'100%': { transform: 'rotate(360deg)' },
				},
				'card-flip': {
					'0%, 100%': { transform: 'rotateY(0deg)' },
					'50%': { transform: 'rotateY(180deg)' },
				},
				'chip-bounce': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-10px)' },
				},
				'jackpot-lights': {
					'0%, 100%': { 
						'box-shadow': '0 0 5px 2px rgba(251,191,36,0.7), 0 0 10px 4px rgba(251,191,36,0.5), 0 0 15px 6px rgba(251,191,36,0.3)'
					},
					'33%': { 
						'box-shadow': '0 0 5px 2px rgba(220,38,38,0.7), 0 0 10px 4px rgba(220,38,38,0.5), 0 0 15px 6px rgba(220,38,38,0.3)'
					},
					'66%': { 
						'box-shadow': '0 0 5px 2px rgba(59,130,246,0.7), 0 0 10px 4px rgba(59,130,246,0.5), 0 0 15px 6px rgba(59,130,246,0.3)'
					},
				},
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.4s ease-out',
				'pulse-neon': 'pulse-neon 2s infinite',
				'pulse-gold': 'pulse-gold 2s infinite',
				'pulse-blue': 'pulse-blue 2s infinite',
				'float': 'float 3s ease-in-out infinite',
				'scale-in': 'scale-in 0.2s ease-out',
				'bell-shake': 'bell-shake 0.5s ease-in-out',
				'confetti': 'confetti 1s ease-in-out forwards',
				'slide-up': 'slide-up 0.5s ease-out',
				'slide-left': 'slide-left 0.5s ease-out',
				'slide-right': 'slide-right 0.5s ease-out',
				'ticker': 'ticker 15s linear infinite',
				'shimmer': 'shimmer 1.5s infinite',
				'spin-slow': 'spin-slow 8s linear infinite',
				'card-flip': 'card-flip 2s ease-in-out',
				'chip-bounce': 'chip-bounce 1s ease-in-out infinite',
				'jackpot-lights': 'jackpot-lights 4s ease-in-out infinite',
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
