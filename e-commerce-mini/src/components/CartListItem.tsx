import {
	Button,
	ButtonGroup,
	Card,
	CardContent,
	Typography,
} from '@mui/material'
import { ShopItem } from '../interfaces/shopInterface'

interface Props {
	item: ShopItem
	quantity: number
}

const CartListItem = ({ item, quantity }: Props) => {
	return (
		<Card>
			<CardContent>
				{/* Title */}
				<Typography>{item.title}</Typography>
				{/* Price */}
				<Typography>
					{quantity} * {item.price}$ ={' '}
					{(quantity * item.price).toFixed(2)}$
				</Typography>
				{/* Quantity Control */}
				<ButtonGroup variant="outlined" size="small">
					<Button>-</Button>
					<Button disabled>{quantity}</Button>
					<Button>+</Button>
				</ButtonGroup>
			</CardContent>
		</Card>
	)
}

export default CartListItem
