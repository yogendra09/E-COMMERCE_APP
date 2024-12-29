import placeholderImage from "@/../public/placeholder-image.webp";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../store/Reducers/cartReducer";
import { Link } from "react-router-dom";

const ProductCard = ({ product, originalPrice }) => {
  const dispatch = useDispatch();
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className="relative flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg transition-transform duration-300 hover:scale-105 sm:m-4">
      {/* Image Section */}
      <div className="relative mx-3 mt-3 h-64 overflow-hidden rounded-xl">
        <img
          className={`h-full w-full object-cover transition-opacity duration-300 ${
            imageLoaded ? "opacity-100" : "opacity-0"
          }`}
          src={product.thumbnail}
          onLoad={() => setImageLoaded(true)}
          alt="product"
        />
        {!imageLoaded && (
          <img
            className="absolute inset-0 h-full w-full object-cover"
            src={placeholderImage}
            alt="placeholder"
          />
        )}
        <span className="absolute top-2 left-2 rounded-full bg-green-500 px-3 py-1 text-sm font-medium text-white">
          {product.discountPercentage}% OFF
        </span>
      </div>

      {/* Product Details */}
      <div className="flex flex-col p-4">
        {/* Title */}
        <Link to={`/auth/product/${product.id}`}>
          <h3 className="text-lg font-semibold text-gray-900 hover:text-blue-500">
            {product.title}
          </h3>
        </Link>

        {/* Price and Original Price */}
        <div className="mt-3 mb-4 flex items-center justify-between">
          <div>
            <p className="text-xl font-bold text-gray-900">${product.price}</p>
            <p className="text-sm text-gray-500 line-through">
              ${originalPrice(product.discountPercentage, product.price)}
            </p>
          </div>
          {/* Rating */}
          <div className="flex items-center">
            {Array.from({ length: 5 }, (_, i) => (
              <svg
                key={i}
                aria-hidden="true"
                className={`h-5 w-5 ${
                  i < Math.round(product.rating)
                    ? "text-yellow-400"
                    : "text-gray-300"
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
            <span className="ml-2 text-sm font-medium text-gray-600">
              {product.rating}
            </span>
          </div>
        </div>

        {/* Add to Cart Button */}
        <button
          type="button"
          onClick={() => dispatch(addToCart(product))}
          className="flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="mr-2 h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
