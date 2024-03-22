export interface ShopItem {
	id: number
	title: string
	price: number
	category: string
	description: string
	image: string
	ratsing: {
		count: number
		rate: number
	}
}
