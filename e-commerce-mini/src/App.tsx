import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from './redux/store'
import Header from './components/Header'
import ShoppingContainer from './components/ShoppingContainer'
import { useEffect } from 'react'
import { getAllCategory, getAllProduct } from './redux/shopSlice'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Cart from './components/Cart'
import styled from 'styled-components'

const BottomApp = styled.div`
	display: flex;
	align-items: flex-start;
	margin-top: 75px;
`

function App() {
	const dispath = useDispatch<AppDispatch>()
	const isOpenCart = useSelector((state: RootState) => state.app.isOpenCart)

	useEffect(() => {
		dispath(getAllProduct())
		dispath(getAllCategory())
	}, [dispath])

	return (
		<>
			<ToastContainer />

			{/* top */}
			<Header />
			{/* ProductList */}
			<BottomApp>
				<ShoppingContainer />
				{isOpenCart && <Cart />}
			</BottomApp>
		</>
	)
}

export default App
