import { useState } from 'react'
import './App.css'
import TodoList from './components/TodoList'
import TodoItem from './interfaces/TodoItem'
import TodoInput from './components/TodoInput'

function App() {
	const [todoList, setTodoList] = useState<TodoItem[]>([])

	return (
		<>
			<div className="container">
				{/* Eisenhower Matrix */}
				<TodoList todoList={todoList} />
				{/* Todo Input */}
				<TodoInput setTodoList={setTodoList} />
			</div>
		</>
	)
}

export default App
