import styled from 'styled-components'
import TodoItem from '../interfaces/TodoItem'
import { LuCalendarClock } from 'react-icons/lu'
import { MdDeleteOutline } from 'react-icons/md'

interface Props {
	todo: TodoItem
	changeTodoItemHandle: (id: string) => void
	deleteTodoItemHandle: (id: string) => void
}

const TodoListItem = styled.div<{ $isComplete: boolean }>`
	background-color: #cccccc21;
	padding: 7px;
	margin: 3px 0;
	border-radius: 5px;
	color: #f1ecec;
	&:hover {
		background-color: #cccccc61;
		border: 1px solid #ccc;
	}
	display: flex;
	justify-content: space-between;
	align-items: center;
	gap: 5px;
	opacity: ${(props) => (props.$isComplete ? 0.5 : 1)};
`
const TodoBody = styled.div<{ $isComplete: boolean }>`
	font-weight: 400;
	flex: 1;
	display: flex;
	flex-direction: column;
	gap: 5px;

	& label {
		text-decoration: ${(props) =>
			props.$isComplete ? 'line-through' : 'none'};
		max-width: 95%;
		overflow: scroll;
		scrollbar-width: none;
		white-space: wrap;
	}

	& div {
		font-size: 0.9rem;
		color: #ecdddd;
		display: flex;
		align-items: center;
		gap: 3px;
	}
`
const TodoDeleteBtn = styled.div`
	width: 30px;
	height: 30px;
	background-color: #d6c2c260;
	border-radius: 50%;
	font-size: 1.3rem;
	padding: 5px;
	animation: color 350ms, background-color 150ms;

	&:hover {
		background-color: #d6c2c2ae;
		color: #ff2828c0;
	}
`

const Todo = ({ todo, changeTodoItemHandle, deleteTodoItemHandle }: Props) => {
	return (
		<TodoListItem $isComplete={todo.isComplete}>
			<input
				type="checkbox"
				id="todo-complete"
				checked={todo.isComplete}
				onChange={() => changeTodoItemHandle(todo.id)}
			/>
			<TodoBody $isComplete={todo.isComplete}>
				<label htmlFor="todo-complete">{todo.body}</label>
				{/* Change YYYY-MM-DD format to DD/MM/YYYY format */}
				<div>
					<LuCalendarClock />
					<span>{todo.deadline.split('-').reverse().join('/')}</span>
				</div>
			</TodoBody>
			<TodoDeleteBtn onClick={() => deleteTodoItemHandle(todo.id)}>
				<MdDeleteOutline />
			</TodoDeleteBtn>
		</TodoListItem>
	)
}

export default Todo
