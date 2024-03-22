import { Badge, Button, Container, IconButton, TextField } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined'
import styled from 'styled-components'

const HeaderWrapper = styled.div`
	display: flex;
	justify-content: center;
	position: fixed;
	background-color: #e2e9f0;
	width: 100%;
	height: 75px;
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
					/>
					<Button variant="contained">
						<SearchIcon />
					</Button>
				</SearchContainer>
				{/* Cart */}
				<IconButton>
					<Badge color="secondary" badgeContent={0} showZero>
						<ShoppingCartOutlinedIcon />
					</Badge>
				</IconButton>
			</HeaderConteiner>
		</HeaderWrapper>
	)
}

export default Header
