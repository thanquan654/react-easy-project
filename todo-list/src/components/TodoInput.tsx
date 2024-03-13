import { useState } from 'react'
import styled from 'styled-components'
import TodoItem from '../interfaces/TodoItem'

interface Props {
	setTodoList: React.Dispatch<React.SetStateAction<TodoItem[]>>
}

const TodoInputContainer = styled.div`
	padding: 10px;
`
const AddTaskButton = styled.button`
	padding: 10px;
	color: #fff;
	background-color: aqua;
	border: 1px solid #ccc;
	box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
`

const TodoInput = ({ setTodoList }: Props) => {
	const [todoInput, setTodoInput] = useState<string>('')

	const addTodoHandle = (): void => {
		const newTodo: TodoItem = {
			id: 'f',
			body: todoInput,
			isComplete: true,
			deadline: '10/1/2024',
			urgency: true,
			importance: true,
		}

		setTodoList((prev: TodoItem[]) => [...prev, newTodo])
		setTodoInput('')
	}

	return (
		<TodoInputContainer>
			<input
				type="text"
				className="todo-body"
				placeholder="Enter your task"
				value={todoInput}
				onChange={(e) => setTodoInput(e.target.value)}
				onKeyDown={(e) => {
					if (e.key === 'Enter') addTodoHandle()
				}}
			/>
			<AddTaskButton autoFocus={true} onClick={() => addTodoHandle()}>
				Add Task
			</AddTaskButton>
		</TodoInputContainer>
	)
}

export default TodoInput
