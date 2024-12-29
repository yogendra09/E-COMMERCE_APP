import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../../components/card/ProductCard";
import { Pagination } from "@mui/material";
import { asyncUpdateProduct } from "../../store/Actions/productAction";

const Home = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.productReducer);
  const itemsPerPage = 12;
  const [currentPage, setCurrentPage] = useState(1);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProducts = products.slice(startIndex, startIndex + itemsPerPage);

  const originalPrice = (discount, productPrice) => {
    const discountedPrice = productPrice / (1 - discount / 100);
    return discountedPrice.toFixed(2);
  };

  const handleChange = (event, value) => {
    setCurrentPage(value);
  };

  useEffect(() => {
    dispatch(asyncUpdateProduct());
  }, []);

  return (
    <div className="min-h-screen">
      {/* Responsive Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4 sm:px-8 md:px-12 py-8">
        {products.length > 0 &&
          currentProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              originalPrice={originalPrice}
            />
          ))}
      </div>

      {/* Pagination Section */}
      <div className="flex justify-center w-full py-8">
        {products.length > 0 && (
          <Pagination
            count={Math.ceil(products.length / itemsPerPage)}
            page={currentPage}
            onChange={handleChange}
            color="primary"
            size="large"
          />
        )}
      </div>
    </div>
  );
};

export default Home;
