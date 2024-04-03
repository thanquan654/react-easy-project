export interface ShopItem {
	id: number
	title: string
	price: number
	category: string
	description: string
	image: string
	rating: {
		count: number
		rate: number
	}
}

export interface CartItem {
	item: ShopItem
	quantity: number
}
