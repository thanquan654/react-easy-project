import { Badge, Button, Container, IconButton, TextField } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { filterByName } from '../redux/shopSlice'
import { useState } from 'react'
import debounce from 'lodash.debounce'
import { AppDispatch, RootState } from '../redux/store'
import { setIsOpenCart } from '../redux/appSlice'

const HeaderWrapper = styled.div`
	display: flex;
	justify-content: center;
	position: fixed;
	top: 0;
	right: 0;
	left: 0;
	background-color: #e2e9f0;
	height: 75px;
	z-index: 1;
`
const HeaderConteiner = styled(Container)`
	display: flex;
	justify-content: space-between;
	align-items: center;
	gap: 50px;
`
const SearchContainer = styled.div`
	flex: 1;
	display: flex;
	padding: 5px 3px;
	border-radius: 7px;
	max-width: 700px;
`

const Header = () => {
	const dispatch = useDispatch<AppDispatch>()
	const isOpenCart = useSelector((state: RootState) => state.app.isOpenCart)

	const [itemNameInput, setItemNameInput] = useState<string>('')
	const numberOfCartItem = useSelector(
		(state: RootState) => state.shop.numberOfCartItem,
	)
	const debounceDispatch = debounce(() => {
		dispatch(filterByName(itemNameInput))
	}, 1000)
	const handleSearchItem = (e) => {
		setItemNameInput(e.target.value)
		debounceDispatch()
	}

	return (
		<HeaderWrapper>
			<HeaderConteiner maxWidth="lg">
				{/* Logo */}
				<img
					src="https://brandlogos.net/wp-content/uploads/2022/03/tiki-logo-brandlogos.net_.png"
					alt="Logo"
					width={80}
				/>
				{/* Search */}
				<SearchContainer>
					<TextField
						id="outlined-basic"
						// label="Search Product"
						variant="outlined"
						fullWidth
						placeholder="Search Product"
						size="small"
						value={itemNameInput}
						onChange={(e) => handleSearchItem(e)}
					/>
					<Button
						variant="contained"
						onClick={() => dispatch(filterByName(itemNameInput))}
					>
						<SearchIcon />
					</Button>
				</SearchContainer>
				{/* Cart */}
				<IconButton
					onClick={() => dispatch(setIsOpenCart(!isOpenCart))}
				>
					<Badge
						color="secondary"
						badgeContent={numberOfCartItem}
						showZero
					>
						<ShoppingCartOutlinedIcon />
					</Badge>
				</IconButton>
			</HeaderConteiner>
		</HeaderWrapper>
	)
}

export default Header
