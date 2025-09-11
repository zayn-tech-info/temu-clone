import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useProductStore } from "../stores/productStore";

const ProductDetails = () => {
  const { singleProduct, product } = useProductStore();
  const { id } = useParams();

  useEffect(() => {
    singleProduct(id);
  }, [id, singleProduct]);
  
  return (
    <div>
      <div>ProductDetails</div>
    </div>
  );
};

export default ProductDetails;
