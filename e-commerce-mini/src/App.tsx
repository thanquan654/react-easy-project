import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import { useDispatch } from 'react-redux'
import { AppDispatch } from './redux/store'
import Header from './components/Header'
import ShoppingContainer from './components/ShoppingContainer'
import { useEffect } from 'react'
import { getAllCategory, getAllProduct } from './redux/shopSlice'

function App() {
	const dispath = useDispatch<AppDispatch>()
	useEffect(() => {
		dispath(getAllProduct())
		dispath(getAllCategory())
	}, [])

	return (
		<>
			{/* top */}
			<Header />
			{/* ProductList */}
			<ShoppingContainer />
		</>
	)
}

export default App
