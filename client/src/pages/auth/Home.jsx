import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../../components/card/ProductCard";
import { Pagination } from "@mui/material";
import { asyncUpdateProduct } from "../../store/Actions/productAction";

const Home = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.productReducer);
  const itemsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProducts = products.slice(startIndex, startIndex + itemsPerPage);

  const originalPrice = (discount,productPrice) => {
    const discountedPrice =productPrice / (1 - discount / 100);
   return discountedPrice.toFixed(2);
  }

  const handleChange = (event, value) => {
    setCurrentPage(value);
  };
  useEffect(() => {
    dispatch(asyncUpdateProduct());
    console.log(products);
  }, []);
  return (
    <div className="min-h-screen">
      <div
        className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8 p-12`}
      >

        {products.length > 0 &&
          currentProducts.map((product) => {
            return <ProductCard key={product.id} product={product} originalPrice={originalPrice} />;
          })}
      </div>
      <div className="flex justify-center w-full py-8">
        {products.length > 0 && (
          <Pagination
            count={Math.ceil(products.length / itemsPerPage)} // Total number of pages
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
