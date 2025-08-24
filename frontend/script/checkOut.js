import { products } from "../Data/products.js";
import { cart, renderDelete } from "../Data/cart.js";

console.log(2 + 4);
let cartSummaryHtml = "";

cart.forEach((cartItem) => {
  const productId = cartItem.productId;

  let matchingProduct;
  products.forEach((product) => {
    if (productId === product.id) {
      matchingProduct = product;

      cartSummaryHtml += `
			<div className="cart-summary-container mb-4 p-3 js-cart-item-${matchingProduct.id}">
				<div className="row">
					<div className="col-7">
						<p className="m-0 delivery-date">Delivery date: Monday, October 9</p>
						<div className="product-details d-flex justify-start gap-4 mt-4">
							<img src="${matchingProduct.image}" width="100">
							<div>
								<p className="m-0 product-name">${matchingProduct.name}</p>
								<p className="m-0 price">${matchingProduct.price.currentPrice}</p>
								<p className="m-0">
									<span>Quantity: ${cartItem.quantity} </span>
									<span className="update">Update</span>
									<span className="delete js-delete-button" data-product-id="${matchingProduct.id}">Delete</span>
								</p>
							</div>
						</div>
					</div>
					<div className="col-5 delivery-option">
						<p className="mb-1 delivery-option">Choose a delivery option</p>
						<div className="d-grid gap-3">
							<div className="d-flex gap-3 align-items-center">
								<input type="radio" name="delivery-option-${matchingProduct.id}">
								<div>
									<p className="m-0 delivery-date">Monday, October 9</p>
									<p className="m-0 shipping">Free - Shipping</p>
								</div>
							</div>
							<div className="d-flex gap-3 align-items-center">
								<input type="radio" name="delivery-option-${matchingProduct.id}">
								<div>
									<p className="m-0 delivery-date">Thursday, October 5</p>
									<p className="m-0 shipping">#2,000 - Shipping</p>
								</div>
							</div>
							<div className="d-flex gap-3 align-items-center">
								<input type="radio" name="delivery-option-${matchingProduct.id}">
								<div>
									<p className="m-0 delivery-date">Teusday, October 3</p>
									<p className="m-0 shipping">#6,000 - Shipping</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			`;
    }
  });

  document.querySelector(".js-cart-summary-container").innerHTML =
    cartSummaryHtml;
});

document.querySelectorAll(".js-delete-button").forEach((link) => [
  link.addEventListener("click", () => {
    const productId = link.dataset.productId;
    renderDelete(productId);
    const container = document.querySelector(`.js-cart-item-${productId}`);
    container.remove();
  }),
]);
