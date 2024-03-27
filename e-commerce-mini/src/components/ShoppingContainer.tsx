import FormatListBulletedOutlinedIcon from '@mui/icons-material/FormatListBulletedOutlined'
import {
	Box,
	Button,
	Card,
	CardMedia,
	Container,
	Grid,
	List,
	ListItemButton,
	ListItemText,
	Rating,
	Tooltip,
	Typography,
} from '@mui/material'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { ShopItem } from '../interfaces/shopInterface'
import {
	addItemToCart,
	filterByCategory,
	filterByPrice,
} from '../redux/shopSlice'
import { AppDispatch, RootState } from '../redux/store'
import { AddShoppingCart } from '@mui/icons-material'

const ShoppingWrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	flex: 1;
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
const ProductItem = styled(Card)`
	display: flex;
	flex-direction: column;
	padding: 10px;
	box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
	background-color: #ffffffda;
	cursor: pointer;
`
const ProductItemImage = styled(CardMedia)`
	margin-bottom: 5px;
	border: 1px solid #cccccc6c;
	border-radius: 5px;
	object-fit: contain;
	transition: all 0.25s;
	&:hover {
		transform: scale(1.02);
	}
`
const ProductItemTitle = styled(Typography)`
	font-weight: 600;
`
const ProductPrice = styled(Typography)`
	color: #000;
	font-size: 1.2rem;
	font-weight: 600;
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
	const dispatch = useDispatch<AppDispatch>()

	const [currentCategory, setCurrentCategory] = useState<string>('all')
	const [currentFilter, setCurrentFilter] = useState<string>('')

	const handleFilterByPrice = (e) => {
		dispatch(filterByPrice(e.target.value))
		setCurrentFilter(
			e.target.value === currentFilter ? 'all' : e.target.value,
		)
	}
	const handleAddToCart = (id: number): void => {
		dispatch(addItemToCart(id))
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
					<CategoryList>
						{categories.map((category, index) => (
							<ListItemButton key={index} component="a" href="#">
								<ListItemText
									primary={capitalizeFirstLetter(category)}
									sx={{
										color:
											currentCategory === category
												? 'blue'
												: 'grey',
									}}
									onClick={() => {
										setCurrentCategory(category)
										dispatch(filterByCategory(index))
									}}
								/>
							</ListItemButton>
						))}
					</CategoryList>
				</List>

				{/* ProductList */}
				<Grid container spacing={2} sx={{ height: 'fit-content' }}>
					<FilterContainer item xs={12}>
						<Typography>Filter:</Typography>
						<Button
							variant="text"
							sx={{
								color: () =>
									currentFilter === 'low' ? 'blue' : 'grey',
							}}
							onClick={handleFilterByPrice}
							value={'low'}
						>
							Price: From low to high
						</Button>
						<Button
							variant="text"
							sx={{
								color: () =>
									currentFilter === 'high' ? 'blue' : 'grey',
							}}
							onClick={handleFilterByPrice}
							value={'high'}
						>
							Price: From high to low
						</Button>
					</FilterContainer>
					<Grid container item={12}>
						{allProduct.map((product: ShopItem) => (
							<Grid key={product.id} item xs={6} sm={4} md={3}>
								<ProductItem sx={{ height: 'fit-content' }}>
									<ProductItemImage
										component="img"
										height="194"
										image={product.image}
										alt="Paella dish"
									></ProductItemImage>
									<Tooltip
										title={product.title}
										placement="bottom"
									>
										<ProductItemTitle noWrap={true}>
											{product.title}
										</ProductItemTitle>
									</Tooltip>
									<ProductPrice>
										${product.price}
									</ProductPrice>
									<Box
										display="flex"
										justifyContent="flex-start"
										alignItems="center"
										gap={0.25}
									>
										<Rating
											sx={{ width: 'fit-content' }}
											value={product.rating.rate}
											max={5}
											name="product-rating"
											size="small"
											readOnly
										/>
										<Typography>
											{product.rating.rate}
										</Typography>
									</Box>

									<Button
										variant="contained"
										sx={{ marginTop: 1 }}
										onClick={() =>
											handleAddToCart(product.id)
										}
									>
										<AddShoppingCart /> Add to Cart
									</Button>
								</ProductItem>
							</Grid>
						))}
					</Grid>
				</Grid>
			</ShoppingContainerStyled>
		</ShoppingWrapper>
	)
}

export default ShoppingContainer
