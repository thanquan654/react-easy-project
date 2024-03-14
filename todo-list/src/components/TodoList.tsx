import styled from 'styled-components'
import TodoItem from '../interfaces/TodoItem'
import Todo from './Todo'
import { DEVICE_WIDTH } from '../constant/windowsMedia'

interface Props {
	todoList: Array<TodoItem>
}
const EisenhowerMatrixContainer = styled.div`
	display: grid;
	grid-template: ${() =>
		DEVICE_WIDTH > 768 ? 'repeat(2, 1fr) / repeat(2, 1fr)' : 'auto / auto'};
	width: 100%;
	flex: 1;
`
const EisenhowerMatrixCategory = styled.div<{ $category: string }>`
	padding: 10px;
	border: 1px solid #000;
	color: #fff;
	background-color: ${(props) => {
		switch (props.$category) {
			case 'do':
				return 'green'
				break
			case 'schedule':
				return 'orange'
				break
			case 'deligate':
				return 'blue'
			case 'delete':
				return 'red'
		}
	}};
`

const TodoList = ({ todoList }: Props) => {
	const doTodoList: Array<TodoItem> = []
	const scheduleTodoList: Array<TodoItem> = []
	const deligateTodoList: Array<TodoItem> = []
	const deleteTodoList: Array<TodoItem> = []

	todoList.forEach((todo) => {
		if (todo.importance === true) {
			if (todo.urgency === true) {
				doTodoList.push(todo)
			} else {
				scheduleTodoList.push(todo)
			}
		} else {
			if (todo.urgency === true) {
				deligateTodoList.push(todo)
			} else {
				deleteTodoList.push(todo)
			}
		}
	})

	return (
		<EisenhowerMatrixContainer>
			<EisenhowerMatrixCategory $category="do">
				<span>Do</span>
				{doTodoList.map((todo) => {
					return <Todo key={todo.id} todo={todo} />
				})}
			</EisenhowerMatrixCategory>
			<EisenhowerMatrixCategory $category="schedule">
				<span>Schedule</span>
				{scheduleTodoList.map((todo) => {
					return <Todo key={todo.id} todo={todo} />
				})}
			</EisenhowerMatrixCategory>
			<EisenhowerMatrixCategory $category="deligate">
				<span>Delegate</span>
				{deligateTodoList.map((todo) => {
					return <Todo key={todo.id} todo={todo} />
				})}
			</EisenhowerMatrixCategory>
			<EisenhowerMatrixCategory $category="delete">
				<span>Delete</span>
				{deleteTodoList.map((todo) => {
					return <Todo key={todo.id} todo={todo} />
				})}
			</EisenhowerMatrixCategory>
		</EisenhowerMatrixContainer>
	)
}

export default TodoList
