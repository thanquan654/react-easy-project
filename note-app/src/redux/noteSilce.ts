import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { NoteItem } from '../interfaces/NoteItem'

interface NoteState {
	noteItemList: NoteItem[]
	numberOfNote: number
}

const initialState: NoteState = {
	noteItemList: [],
	numberOfNote: 0,
}

const noteSilce = createSlice({
	name: 'note',
	initialState,
	reducers: {
		addNewNote: (state, action: PayloadAction<NoteItem>) => {
			state.noteItemList.push(action.payload)
			state.numberOfNote++
		},
		deleteNote: (state, action: PayloadAction<{ id: string }>) => {
			state.noteItemList.filter(
				(noteItem) => noteItem.id === action.payload.id,
			)
		},
	},
})

export const { addNewNote, deleteNote } = noteSilce.actions
export default noteSilce.reducer
