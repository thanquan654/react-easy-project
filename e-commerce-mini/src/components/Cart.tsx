import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { RootState } from '../redux/store'
import CartListItem from './CartListItem'
import { CartItem } from '../interfaces/shopInterface'

const CardWraper = styled.div`
	width: 300px;
	height: 100vh;
	overflow-y: scroll;
	border: 1px solid #ccc;
	background-color: #00d;
	background: aqua;
	border: 5px solid #ccc;
`

const Cart = () => {
	const cartItems: CartItem[] = useSelector(
		(state: RootState) => state.shop.cartItems,
	)

	return (
		<CardWraper>
			{/* Item List */}
			{cartItems.map((item) => (
				<CartListItem item={item.item} quantity={item.quantity} />
			))}
			{/* Total Bill */}
		</CardWraper>
	)
}

export default Cart
