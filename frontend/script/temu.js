import { cart, addToCart } from "../Data/cart.js";
import { products } from "../Data/products.js";

let productHtml = "";
products.forEach((product) => {
  productHtml += `
	<div className="col-lg-2 col-4 mb-4">
		<img src="${product.image}">
		<p className="m-0 product-name">${product.name}</p>
		<p className="m-0 product-price">${product.price.currentPrice}<span className="product-price-info">${product.price.oldPrice}</span></p>
		<span className="ratings">
			<ion-icon name="star"></ion-icon>
			<ion-icon name="star"></ion-icon>
			<ion-icon name="star"></ion-icon>
			<ion-icon name="star-half"></ion-icon>
			<ion-icon name="star-outline"></ion-icon>
		</span>
		<button className="add-btn mt-1 js-addToCart" data-product-id="${product.id}">Add to cart</button>
	</div>`;
  document.querySelector(".product-row").innerHTML = productHtml;
});

export function updateCartQuantity() {
  let cartQuantity = 0;
  cart.forEach((item) => {
    cartQuantity += item.quantity;
  });

  document.querySelector(".js-cart-quantity").innerText = cartQuantity;
}

let btn = document.querySelectorAll(".js-addToCart");
btn.forEach((button) => {
  button.addEventListener("click", () => {
    let productId = button.dataset.productId;

    addToCart(productId);
    updateCartQuantity();
  });
});
updateCartQuantity();
console.log(cart);
