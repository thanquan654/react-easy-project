import styled from 'styled-components'
import TodoItem from '../interfaces/TodoItem'
import Todo from './Todo'

interface Props {
	todoList: Array<TodoItem>
}
const EisenhowerMatrixContainer = styled.div`
	display: grid;
	grid-template: repeat(2, 1fr) / repeat(2, 1fr);
`
const EisenhowerMatrixCategory = styled.div`
	padding: 10px;
	border: 1px solid #000;
	color: #fff;
	background-color: #ccc;
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
			<EisenhowerMatrixCategory>
				<span>Do</span>
				{doTodoList.map((todo) => {
					return <Todo key={todo.id} todo={todo} />
				})}
			</EisenhowerMatrixCategory>
			<EisenhowerMatrixCategory>
				<span>Schedule</span>
				{doTodoList.map((todo) => {
					return <Todo key={todo.id} todo={todo} />
				})}
			</EisenhowerMatrixCategory>
			<EisenhowerMatrixCategory>
				<span>Delegate</span>
				{doTodoList.map((todo) => {
					return <Todo key={todo.id} todo={todo} />
				})}
			</EisenhowerMatrixCategory>
			<EisenhowerMatrixCategory>
				<span>Delete</span>
				{doTodoList.map((todo) => {
					return <Todo key={todo.id} todo={todo} />
				})}
			</EisenhowerMatrixCategory>
		</EisenhowerMatrixContainer>
	)
}

export default TodoList
