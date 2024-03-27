import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { CartItem, ShopItem } from '../interfaces/shopInterface'
import axios from 'axios'

interface ShopState {
	shopItem: Array<ShopItem>
	filtedShopItem: Array<ShopItem>
	categories: Array<string>
	numberOfItem: number
	cartItems: Array<CartItem>
	numberOfCartItem: number
}

const initialState: ShopState = {
	shopItem: [],
	filtedShopItem: [],
	categories: [],
	numberOfItem: 0,
	cartItems: [],
	numberOfCartItem: 0,
}

const shopSlice = createSlice({
	name: 'shop',
	initialState,
	reducers: {
		filterByCategory: (state, action: PayloadAction<number>) => {
			// action.payload store of index in categories
			// index = 0 is all product
			if (action.payload == 0) {
				state.filtedShopItem = state.shopItem
			} else {
				const newState = state.shopItem.filter((item: ShopItem) => {
					return item.category === state.categories[action.payload]
				})
				state.filtedShopItem = newState
			}
		},
		filterByPrice: (state, action: PayloadAction<string>) => {
			// payload is a mode to sort ['all', 'low', 'high']
			const mode = action.payload
			switch (mode) {
				case 'low':
					state.filtedShopItem.sort(
						(a: ShopItem, b: ShopItem) => a.price - b.price,
					)
					break
				case 'high':
					state.filtedShopItem.sort(
						(a: ShopItem, b: ShopItem) => b.price - a.price,
					)
			}
		},
		filterByName: (state, action: PayloadAction<string>) => {
			const newState = state.shopItem.filter((item: ShopItem) => {
				return item.title
					.toLowerCase()
					.includes(action.payload.toLowerCase())
			})
			state.filtedShopItem = newState
		},
		addItemToCart: (state, action: PayloadAction<number>) => {
			// Check item in cart
			for (let i = 0; i < state.cartItems.length; i++) {
				if (state.cartItems[i].item.id === action.payload) {
					state.cartItems[0].quantity++
					state.numberOfCartItem++
					return
				}
			}
			// If item dosent have in cart list
			const newItem = state.shopItem.find(
				(item) => item.id === action.payload,
			)
			if (newItem) {
				state.cartItems.push({
					item: newItem,
					quantity: 1,
				})
				state.numberOfCartItem++
			}
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(
				getAllProduct.fulfilled,
				(state, action: PayloadAction<Array<ShopItem>>) => {
					state.shopItem = action.payload
					state.filtedShopItem = action.payload
					state.numberOfItem = state.shopItem.length
				},
			)
			.addCase(
				getAllCategory.fulfilled,
				(state, action: PayloadAction<Array<string>>) => {
					state.categories = ['all', ...action.payload]
				},
			)
	},
})

export const getAllProduct = createAsyncThunk(
	'shop/getAllProduct',
	async () => {
		try {
			const res = await axios.get('https://fakestoreapi.com/products')
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
			return res.data
		} catch (e) {
			console.error(e)
		}
	},
)

export const { filterByCategory, filterByPrice, filterByName, addItemToCart } =
	shopSlice.actions
export default shopSlice.reducer
