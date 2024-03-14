import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import moment from 'moment'
import styled from 'styled-components'
import TodoItem from '../interfaces/TodoItem'

interface Props {
	setTodoList: React.Dispatch<React.SetStateAction<TodoItem[]>>
}

const TodoInputContainer = styled.div`
	padding: 10px;
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 10px;
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
	const [importanceInput, setImportanceInput] = useState<boolean>(false)
	const [urgencyInput, setUrgencyInput] = useState<boolean>(false)
	const [dateInput, setDateInput] = useState<string>(
		moment(new Date()).format('YYYY-MM-DD'),
	)

	const addTodoHandle = (): void => {
		const newTodo: TodoItem = {
			id: uuidv4(),
			body: todoInput,
			isComplete: false,
			deadline: dateInput,
			urgency: urgencyInput,
			importance: importanceInput,
		}

		setTodoList((prev: TodoItem[]) => [...prev, newTodo])
		setTodoInput('')
		setImportanceInput(false)
		setImportanceInput(false)
		setDateInput(moment(new Date()).format('YYYY-MM-DD'))
	}

	const dateInputChangeHandle = (e: {
		target: { value: string | number | Date }
	}) => {
		setDateInput(moment(new Date(e?.target.value)).format('YYYY-MM-DD'))
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
			<div>
				<div>
					<span>
						<label htmlFor="inportance-task-input">
							Importance
						</label>
						<input
							type="checkbox"
							name=""
							id="inportance-task-input"
							checked={importanceInput}
							onChange={() =>
								setImportanceInput(!importanceInput)
							}
						/>
					</span>
					<span>
						<label htmlFor="urgency-task-input">Urgency</label>
						<input
							type="checkbox"
							name=""
							id="urgency-task-input"
							checked={urgencyInput}
							onChange={() => setUrgencyInput(!urgencyInput)}
						/>
					</span>
				</div>
				<div>
					<label htmlFor="deadline-task-input">Deadline</label>
					<input
						type="date"
						name=""
						id="deadline-task-input"
						value={dateInput}
						onChange={dateInputChangeHandle}
					/>
				</div>
			</div>
			<AddTaskButton autoFocus={true} onClick={() => addTodoHandle()}>
				Add Task
			</AddTaskButton>
		</TodoInputContainer>
	)
}

export default TodoInput
