import styled from 'styled-components'
import TodoItem from '../interfaces/TodoItem'
import Todo from './Todo'
import { DEVICE_WIDTH } from '../constants/windowsMedia'

interface Props {
	todoList: Array<TodoItem>
	setTodoList: React.Dispatch<React.SetStateAction<TodoItem[]>>
}
const EisenhowerMatrixContainer = styled.div`
	display: grid;
	grid-template: ${() =>
		DEVICE_WIDTH > 768 ? 'repeat(2, 1fr) / repeat(2, 1fr)' : 'auto / auto'};
	width: 100%;
	flex: 90%;
	overflow: scroll;
	scrollbar-width: none;
`
const eisenhowerMatrixCategoryBgColor: { [index: string]: string } = {
	do: '#5fa285',
	schedule: '#ee8e73',
	deligate: '#4672d3',
	delete: '#f5676b',
}
const EisenhowerMatrixCategory = styled.div<{ $category: string }>`
	padding: 10px;
	border: 1px solid #000;
	color: #fff;
	background-color: ${(props) =>
		eisenhowerMatrixCategoryBgColor[props.$category]};
`
const CategoryTitle = styled.div`
	font-size: 1.5rem;
	text-align: center;
	font-weight: 500;
	margin-bottom: 7px;
`

const TodoList = ({ todoList, setTodoList }: Props) => {
	const doTodoList: Array<TodoItem> = []
	const scheduleTodoList: Array<TodoItem> = []
	const deligateTodoList: Array<TodoItem> = []
	const deleteTodoList: Array<TodoItem> = []

	const changeTodoItemHandle: (id: string) => void = (id) => {
		const newTodoList = todoList.map((todo) => {
			if (todo.id === id) {
				todo.isComplete = !todo.isComplete
			}
			return todo
		})
		setTodoList(newTodoList)

		console.log(newTodoList)
	}
	const deleteTodoItemHandle: (id: string) => void = (id) => {
		const newTodoList = todoList.filter((todo: TodoItem) => {
			return todo.id !== id
		})
		setTodoList(newTodoList)
	}

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
				<CategoryTitle>Do</CategoryTitle>
				{doTodoList.map((todo) => {
					return (
						<Todo
							key={todo.id}
							todo={todo}
							changeTodoItemHandle={changeTodoItemHandle}
							deleteTodoItemHandle={deleteTodoItemHandle}
						/>
					)
				})}
			</EisenhowerMatrixCategory>
			<EisenhowerMatrixCategory $category="schedule">
				<CategoryTitle>Schedule</CategoryTitle>
				{scheduleTodoList.map((todo) => {
					return (
						<Todo
							key={todo.id}
							todo={todo}
							changeTodoItemHandle={changeTodoItemHandle}
							deleteTodoItemHandle={deleteTodoItemHandle}
						/>
					)
				})}
			</EisenhowerMatrixCategory>
			<EisenhowerMatrixCategory $category="deligate">
				<CategoryTitle>Delegate</CategoryTitle>
				{deligateTodoList.map((todo) => {
					return (
						<Todo
							key={todo.id}
							todo={todo}
							changeTodoItemHandle={changeTodoItemHandle}
							deleteTodoItemHandle={deleteTodoItemHandle}
						/>
					)
				})}
			</EisenhowerMatrixCategory>
			<EisenhowerMatrixCategory $category="delete">
				<CategoryTitle>Delete</CategoryTitle>
				{deleteTodoList.map((todo) => {
					return (
						<Todo
							key={todo.id}
							todo={todo}
							changeTodoItemHandle={changeTodoItemHandle}
							deleteTodoItemHandle={deleteTodoItemHandle}
						/>
					)
				})}
			</EisenhowerMatrixCategory>
		</EisenhowerMatrixContainer>
	)
}

export default TodoList
