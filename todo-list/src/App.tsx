import { useState } from 'react'
import './App.css'
import TodoList from './components/TodoList'
import TodoItem from './interfaces/TodoItem'
import TodoInput from './components/TodoInput'
import styled from 'styled-components'
import { DEVICE_WIDTH } from './constant/windowsMedia'

const AppContainer = styled.div`
	width: ${() => (DEVICE_WIDTH > 768 ? '80%' : '100%')};
	height: ${() => (DEVICE_WIDTH > 768 ? '90%' : '100%')};
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
	padding: 5px;
	border-radius: 5px;
	border: 1px solid #000;
	box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
`

function App() {
	const [todoList, setTodoList] = useState<TodoItem[]>([])

	return (
		<>
			<AppContainer>
				{/* Eisenhower Matrix */}
				<TodoList todoList={todoList} />
				{/* Todo Input */}
				<TodoInput setTodoList={setTodoList} />
			</AppContainer>
		</>
	)
}

export default App
