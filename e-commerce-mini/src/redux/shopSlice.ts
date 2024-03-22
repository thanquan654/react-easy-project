import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { ShopItem } from '../interfaces/shopInterface'
import axios from 'axios'

interface ShopState {
	shopItem: Array<ShopItem>
	categories: Array<string>
	numberOfItem: number
}

const initialState: ShopState = {
	shopItem: [],
	categories: [],
	numberOfItem: 0,
}

const shopSlice = createSlice({
	name: 'shop',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(
				getAllProduct.fulfilled,
				(state, action: PayloadAction<Array<ShopItem>>) => {
					state.shopItem = action.payload
					state.numberOfItem = state.shopItem.length
				},
			)
			.addCase(
				getAllCategory.fulfilled,
				(state, action: PayloadAction<Array<string>>) => {
					state.categories = action.payload
				},
			)
	},
})

export const getAllProduct = createAsyncThunk(
	'shop/getAllProduct',
	async () => {
		try {
			const res = await axios.get('https://fakestoreapi.com/products')
			console.log(res)
			return res.data
		} catch (e) {
			console.error(e)
		}
	},
)
export const getAllCategory = createAsyncThunk(
	'shop/getAllCategory',
	async () => {
		try {
			const res = await axios.get(
				'https://fakestoreapi.com/products/categories',
			)
			console.log(res)
			return res.data
		} catch (e) {
			console.error(e)
		}
	},
)

// export { } = shopSlice.actions
export default shopSlice.reducer
