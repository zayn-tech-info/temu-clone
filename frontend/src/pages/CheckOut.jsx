import CartReview from "../components/CartReview";
import PageHeader from "../components/PageHeader";
import ShippingInfo from "../components/ShippingInfo";

const CheckOut = () => {
  return (
    <div className="max-w-7xl mx-auto px-16 py-8">
      <PageHeader />
      <p className="text-2xl font-bold">Checkout</p>
      <div className="md:grid md:grid-cols-2 md:gap-10 my-5">
        <div>
          <ShippingInfo />
        </div>
        <div>
          <CartReview />
        </div>
      </div>
    </div>
  );
};

export default CheckOut;
