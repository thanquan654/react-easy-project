import { configureStore } from '@reduxjs/toolkit'
import shopSlice from './shopSlice'
import appSlice from './appSlice'

export const store = configureStore({
	reducer: {
		shop: shopSlice,
		app: appSlice,
	},
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
