import {
	Button,
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
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { RootState } from '../redux/store'
import { ShopItem } from '../interfaces/shopInterface'
import { filterByCategory, filterByPrice } from '../redux/shopSlice'
import { useState } from 'react'

const ShoppingWrapper = styled.div`
	margin-top: 75px;
	background-color: #ccc;
	display: flex;
	justify-content: center;
	align-items: center;
`
const ShoppingContainerStyled = styled(Container)`
	display: flex;
	flex-direction: ${window.screen.width > 765 ? 'row' : 'column'};
	gap: 20px;
`
const CategoryTitle = styled(Typography)`
	display: flex;
	align-items: center;
	gap: 5px;
`
const CategoryList = styled.div`
	display: flex;
	flex-direction: ${window.screen.width < 765 ? 'row' : 'column'};
	flex-wrap: wrap;
`
const FilterContainer = styled(Grid)`
	display: flex;
	align-items: center;
	flex-wrap: wrap;
	gap: 10px;
	margin: 10px;
`
const ProductItem = styled(Grid)`
	padding: 10px;
	border-radius: 5px;
	border: 1px solid #000;
`

function capitalizeFirstLetter(string: string): string {
	return string.charAt(0).toUpperCase() + string.slice(1)
}

const ShoppingContainer = () => {
	const categories: string[] = useSelector(
		(state: RootState) => state.shop.categories,
	)
	const allProduct: ShopItem[] = useSelector(
		(state: RootState) => state.shop.filtedShopItem,
	)
	const dispatch = useDispatch()

	// const [currentCategory, setCurrentCategory] = useState<string>('all')
	const [currentFilter, setCurrentFilter] = useState<string>('')

	const handleFilterByPrice = (e) => {
		dispatch(filterByPrice(e.target.value))
		setCurrentFilter(
			e.target.value === currentFilter ? 'all' : e.target.value,
		)
	}

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
					<CategoryList>
						{categories.map((category, index) => (
							<ListItemButton key={index} component="a" href="#">
								<ListItemText
									primary={capitalizeFirstLetter(category)}
									onClick={() =>
										dispatch(filterByCategory(index))
									}
								/>
							</ListItemButton>
						))}
					</CategoryList>
				</List>
				{/* Filter */}

				{/* ProductList */}
				{/* TODO: fix grid */}
				<Grid container>
					<FilterContainer item xs={12} className="filter">
						<Typography>Filter:</Typography>
						<Button
							variant={
								currentFilter === 'low' ? 'contained' : 'text'
							}
							onClick={handleFilterByPrice}
							value={'low'}
						>
							Price: From low to high
						</Button>
						<Button
							variant={
								currentFilter === 'high' ? 'contained' : 'text'
							}
							onClick={handleFilterByPrice}
							value={'high'}
						>
							Price: From high to low
						</Button>
					</FilterContainer>
					{allProduct.map((product: ShopItem) => (
						<ProductItem key={product.id} item xs={6} sm={4} md={3}>
							<Card>
								<CardMedia
									component="img"
									height="194"
									image={product.image}
									alt="Paella dish"
								></CardMedia>
								{product.title}
								{product.price}
							</Card>
						</ProductItem>
					))}
				</Grid>
			</ShoppingContainerStyled>
		</ShoppingWrapper>
	)
}

export default ShoppingContainer
