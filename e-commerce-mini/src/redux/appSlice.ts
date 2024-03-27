import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface AppState {
	isLoading: boolean
	isOpenCart: boolean
}

const initialState: AppState = {
	isLoading: false,
	isOpenCart: false,
}

const appSlice = createSlice({
	name: 'app',
	initialState,
	reducers: {
		setIsOpenCart: (state, action: PayloadAction<boolean>) => {
			state.isOpenCart = action.payload
		},
	},
})

export const { setIsOpenCart } = appSlice.actions

export default appSlice.reducer
