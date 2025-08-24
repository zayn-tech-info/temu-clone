export let cart = JSON.parse(localStorage.getItem('cart'))

if (!cart) {
	cart = [{
		productId: '1ty-kjk-3rt-1',
		quantity: 1
	},
	{
		productId: '1ty-kjk-3rt-19',
		quantity: 1
	}
	];
}

function saveToStorage() {
	localStorage.setItem('cart', JSON.stringify(cart))
}

export function addToCart(productId) {
	let matchingItem;
	cart.forEach((item) => {
		if (item.productId === productId) {
			matchingItem = item
		}
	})
	
	if (matchingItem) {
		matchingItem.quantity += 1
	}else {
		cart.push({
			productId: productId,
			quantity: 1
		})
	}
	saveToStorage()
}

export function renderDelete(productId) {
	const newCart = []

	cart.forEach((cartItem) => {
		if (cartItem.productId !== productId) {
			newCart.push(cartItem)
		}
	})
	cart = newCart
	saveToStorage()
}