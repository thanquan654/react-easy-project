import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'

interface CounterState {
	value: number
}

const initialState: CounterState = {
	value: 0,
}

const counterSlice = createSlice({
	name: 'counter',
	initialState,
	reducers: {
		increment: (state) => {
			state.value += 1
		},
		decrement: (state) => {
			state.value -= 1
		},
		incrementByAmount: (
			state,
			action: PayloadAction<{ value: number }>,
		) => {
			state.value += action.payload.value
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(incrementAsync.pending, () => {
				console.log('Pending')
			})
			.addCase(
				incrementAsync.fulfilled,
				(state, action: PayloadAction<{ value: number }>) => {
					state.value += action.payload.value
				},
			)
	},
})

// Create async reducer
export const incrementAsync = createAsyncThunk(
	'counter/increamentAsync',
	async (amount: number) => {
		await new Promise((resolve) => setTimeout(resolve, 2000))
		return { value: amount }
	},
)

export const { increment, decrement, incrementByAmount } = counterSlice.actions
export default counterSlice.reducer
