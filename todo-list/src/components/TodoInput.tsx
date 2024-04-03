import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import moment from 'moment'
import styled from 'styled-components'
import TodoItem from '../interfaces/TodoItem'
import { DEVICE_WIDTH } from '../constants/windowsMedia'

interface Props {
	setTodoList: React.Dispatch<React.SetStateAction<TodoItem[]>>
}

const TodoInputContainer = styled.div`
	padding: 10px;
	display: flex;
	flex-direction: ${() => (DEVICE_WIDTH > 768 ? 'row' : 'column')};
	justify-content: center;
	align-items: center;
	gap: 10px;
	width: 100%;
	color: #332e2e;
	flex: 10%;
`
const TodoTextInput = styled.input`
	flex: 1;
	height: 44px;
	width: 100%;
	min-height: 35px;
	background-color: #05060f0a;
	border-radius: 0.5rem;
	padding: 0 1rem;
	border: 2px solid transparent;
	font-size: 1rem;
	transition: border-color 0.3s cubic-bezier(0.25, 0.01, 0.25, 1) 0s,
		color 0.3s cubic-bezier(0.25, 0.01, 0.25, 1) 0s,
		background 0.2s cubic-bezier(0.25, 0.01, 0.25, 1) 0s;

	&:hover,
	&:focus {
		outline: none;
		border-color: #05060f;
	}
`
const AddTaskButton = styled.button`
	padding: 10px;
	color: #fff;
	background-color: #13aa52;
	border: 1px solid #13aa52;
	border-radius: 4px;
	box-shadow: rgba(0, 0, 0, 0.1) 0 2px 4px 0;
	color: #fff;
	cursor: pointer;
	font-size: 16px;
	font-weight: 400;
	outline: none;
	outline: 0;
	padding: 10px 25px;
	text-align: center;
	transform: translateY(0);
	transition: transform 250ms, box-shadow 150ms;
	&:hover {
		box-shadow: rgba(0, 0, 0, 0.15) 0 3px 9px 0;
		transform: translateY(-1px);
	}
`
const StatusInput = styled.div`
	display: flex;
	justify-content: space-between;
	margin-bottom: 7px;
	& span > label {
		margin-right: 5px;
		line-height: 1.3;
	}
`
const DateInput = styled.div`
	& label {
		margin-right: 5px;
	}
	& input {
		padding: 2px 5px;
	}
`

const TodoInput = ({ setTodoList }: Props) => {
	const [todoInput, setTodoInput] = useState<string>('')
	const [importanceInput, setImportanceInput] = useState<boolean>(false)
	const [urgencyInput, setUrgencyInput] = useState<boolean>(false)
	const [dateInput, setDateInput] = useState<string>(
		moment(new Date()).format('YYYY-MM-DD'),
	)

	const addTodoHandle = (): void => {
		if (!todoInput) return
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
		setUrgencyInput(false)
		setDateInput(moment(new Date()).format('YYYY-MM-DD'))
	}

	const dateInputChangeHandle = (e: {
		target: { value: string | number | Date }
	}) => {
		setDateInput(moment(new Date(e?.target.value)).format('YYYY-MM-DD'))
	}

	return (
		<TodoInputContainer>
			<TodoTextInput
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
				<StatusInput>
					<span>
						<label htmlFor="inportance-task-input">
							Importance{' '}
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
						<label htmlFor="urgency-task-input">Urgency </label>
						<input
							type="checkbox"
							name=""
							id="urgency-task-input"
							checked={urgencyInput}
							onChange={() => setUrgencyInput(!urgencyInput)}
						/>
					</span>
				</StatusInput>
				<DateInput>
					<label htmlFor="deadline-task-input">Deadline </label>
					<input
						type="date"
						name=""
						id="deadline-task-input"
						value={dateInput}
						onChange={dateInputChangeHandle}
					/>
				</DateInput>
			</div>
			<AddTaskButton autoFocus={true} onClick={() => addTodoHandle()}>
				Add Task
			</AddTaskButton>
		</TodoInputContainer>
	)
}

export default TodoInput
