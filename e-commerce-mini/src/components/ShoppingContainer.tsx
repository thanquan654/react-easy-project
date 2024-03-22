import {
	Card,
	CardMedia,
	Container,
	Divider,
	Grid,
	List,
	ListItemButton,
	ListItemText,
	Typography,
} from '@mui/material'
import FormatListBulletedOutlinedIcon from '@mui/icons-material/FormatListBulletedOutlined'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { RootState } from '../redux/store'
import { ShopItem } from '../interfaces/shopInterface'

const ShoppingWrapper = styled.div`
	margin-top: 75px;
	background-color: #ccc;
	display: flex;
	justify-content: center;
	align-items: center;
`
const ShoppingContainerStyled = styled(Container)`
	display: flex;
	gap: 5px;
`
const CategoryTitle = styled(Typography)`
	display: flex;
	align-items: center;
	gap: 5px;
`

function capitalizeFirstLetter(string: string): string {
	return string.charAt(0).toUpperCase() + string.slice(1)
}

const ShoppingContainer = () => {
	const categories = useSelector((state: RootState) => state.shop.categories)
	const allProduct = useSelector((state: RootState) => state.shop.shopItem)

	return (
		<ShoppingWrapper>
			<ShoppingContainerStyled>
				{/* Category */}
				<List>
					<CategoryTitle variant="h6">
						<FormatListBulletedOutlinedIcon />
						Category:
					</CategoryTitle>
					<Divider />
					{categories.map((category, index) => (
						<ListItemButton
							key={index}
							component="a"
							href="#simple-list"
						>
							<ListItemText
								primary={capitalizeFirstLetter(category)}
							/>
						</ListItemButton>
					))}
				</List>
				<div style={{}}>
					{/* Filter */}
					<div className="filter">
						<Typography>Filter by:</Typography>
					</div>
					{/* ProductList */}
					{/* TODO: fix grid */}
					<Grid columns={{ sx: 2, md: 3 }}>
						{allProduct.map((product: ShopItem) => (
							<Card key={product.id}>
								<CardMedia
									component="img"
									height="194"
									image={product.image}
									alt="Paella dish"
								></CardMedia>
								{product.title}
							</Card>
						))}
					</Grid>
				</div>
			</ShoppingContainerStyled>
		</ShoppingWrapper>
	)
}

export default ShoppingContainer
