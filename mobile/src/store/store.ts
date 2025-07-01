import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Address } from '../types/address'
import { Service } from '../types/service'
import { Client } from '../types/client'
import { Plan } from '../types/plans'
import Theme from '@/src/constants/Theme'
import { Theme as ThemeType } from '../types/theme'

type OrderItem = {
	service: Service
}

type Payment = { method: string | null; details: Record<string, any> }

type ThemePreference = 'light' | 'dark' | 'system'
type EffectiveTheme = 'light' | 'dark'

interface ThemeStore {
	themePreference: ThemePreference
	effectiveTheme: EffectiveTheme
	isSystemTheme: boolean
	theme: ThemeType
	navigationTheme: ThemeType
	setThemePreference: (preference: ThemePreference) => void
	updateEffectiveTheme: (deviceTheme: 'light' | 'dark' | null) => void
}

interface StateStore {
	removeFileInput: boolean
	comprovante: any
	setRemoveFileInput: (removeFile: boolean) => void
	setComprovante: (comprovante: any) => void
}

interface CheckoutStore {
	address: Address | null
	order: OrderItem[]
	payment: Payment
	client: Client
	plan: Plan | null
	setAddress: (address: Address | null) => void
	setOrder: (order: OrderItem[]) => void
	setPayment: (payment: Payment) => void
	setClient: (client: Client) => void
	setPlan: (plan: Plan | null) => void
	resetCheckout: () => void
}

export const useStateStore = create<StateStore>()(set => ({
	removeFileInput: false,
	comprovante: null,
	setRemoveFileInput: (removeFile: boolean) =>
		set({ removeFileInput: removeFile }),
	setComprovante: (comprovante: any) => set({ comprovante: comprovante }),
}))

export const useCheckoutStore = create<CheckoutStore>()(set => ({
	address: null,
	order: [],
	payment: { method: null, details: {} },
	client: {} as Client,
	plan: null,
	setAddress: (address: Address | null) => set({ address }),
	setOrder: (order: OrderItem[]) => set({ order }),
	setPayment: (payment: Payment) => set({ payment }),
	setClient: (client: Client) => set({ client }),
	setPlan: (plan: Plan | null) => set({ plan }),
	resetCheckout: () =>
		set({
			address: null,
			order: [],
			payment: { method: null, details: {} },
			client: {} as Client,
			plan: null,
		}),
}))

export const useThemeStore = create<ThemeStore>()(
	persist(
		(set, get) => ({
			themePreference: 'system',
			effectiveTheme: 'light',
			isSystemTheme: true,
			theme: Theme.light,
			navigationTheme: {
				dark: false,
				colors: Theme.light.colors,
				fonts: Theme.light.fonts,
				size: Theme.light.size,
			},
			setThemePreference: (preference: ThemePreference) => {
				const { updateEffectiveTheme } = get()
				set({
					themePreference: preference,
					isSystemTheme: preference === 'system',
				})
				// Update effective theme based on new preference
				if (preference === 'system') {
					// This will be handled by the hook that calls updateEffectiveTheme
				} else {
					updateEffectiveTheme(preference)
				}
			},
			updateEffectiveTheme: (deviceTheme: 'light' | 'dark' | null) => {
				const { themePreference } = get()
				const effectiveTheme =
					themePreference === 'system'
						? deviceTheme || 'light'
						: themePreference

				const theme = effectiveTheme === 'dark' ? Theme.dark : Theme.light
				const navigationTheme = {
					dark: effectiveTheme === 'dark',
					colors: theme.colors,
					fonts: theme.fonts,
					size: theme.size,
				}

				set({
					effectiveTheme,
					theme,
					navigationTheme,
				})
			},
		}),
		{
			name: 'theme-storage',
			storage: createJSONStorage(() => AsyncStorage),
			partialize: state => ({ themePreference: state.themePreference }),
		},
	),
)
