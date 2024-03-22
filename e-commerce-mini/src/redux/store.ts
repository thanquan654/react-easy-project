import { configureStore } from '@reduxjs/toolkit'
import counterSlice from './counterSlice'
import shopSlice from './shopSlice'

export const store = configureStore({
	reducer: {
		counter: counterSlice,
		shop: shopSlice,
	},
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
