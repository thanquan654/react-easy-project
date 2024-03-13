import TodoItem from '../interfaces/TodoItem'

interface Props {
	todo: TodoItem
}

const Todo = ({ todo }: Props) => {
	return (
		<div className="todo">
			<span>{todo.body}</span>
			<span>{todo.deadline}</span>
			{!todo.isComplete && <span>Done</span>}
		</div>
	)
}

export default Todo
