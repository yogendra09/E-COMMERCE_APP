const Product = require("../models/productModel");
const { catchAsyncErrors } = require("../middlewares/catchAsyncErrors");
const ErrorHandler = require("../utils/ErrorHandler");
const User = require("../models/userModel");
const { ObjectId } = require("mongoose").Types;
const paginationfun = require("../utils/paginationfun");

exports.getAllProductsWithPagination = catchAsyncErrors(async (req, res, next) => {
  const { page, search, size } = req.query;
  const query = search ? { name: { $regex: search, $options: "i" } } : {};

  const { limit, offset } = paginationfun.getPagination(page, size);

  const products = await Product.find(query).limit(limit).skip(offset);
  const totalProducts = await Product.countDocuments(query);

  if (totalProducts > 0) {
    const response = paginationfun.getPagingData(
      products,
      totalProducts,
      page,
      limit
    );
    // Return success response with paginated relation list
    // console.log(response);

    return res.status(200).json({
      status: true,
      data: response,
    });
  }
  if (products.length === 0)
    return next(new ErrorHandler("no product found", 404));

  res.status(200).json({
    status: true,
    count: products.length,
    data: products,
  });
});

// exports.getAllProducts = catchAsyncErrors(async (req, res, next) => {
//   const products = await Product.find();
//   if (products.length === 0)
//     return next(new ErrorHandler("no product found", 404));
//   res.status(200).json({
//     status: true,
//     count: products.length,
//     data: products,
//   });
// });

exports.getProductById = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) return next(new ErrorHandler("product not found", 404));

  return res.status(200).json({
    status: true,
    data: product,
  });
});

exports.createProduct = catchAsyncErrors(async (req, res) => {
  const { name, imageUrl, price, description } = req.body;
  if (!name || !imageUrl || !price || !description)
    return next(new ErrorHandler("please fill all fields", 400));

  const isAlreadyExist = await Product.findOne({ name });
  if (isAlreadyExist)
    return next(new ErrorHandler("product with this name already exist", 400));

  const product = await Product.create(req.body);
  res.status(200).json({
    status: true,
    data: product,
    message: "product created successfully",
  });
});

exports.updateProduct = catchAsyncErrors(async (req, res) => {
  const isAlreadyExists = await Product.findOne({ name: req.body.name });
  if (isAlreadyExists)
    return next(new ErrorHandler("product with this name already exist", 400));

  const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!product) return next(new ErrorHandler("product not found", 404));
  return res.status(200).json({
    status: true,
    data: product,
    message: "product updated successfully",
  });
});

exports.addUpdateProduct = catchAsyncErrors(async (req, res, next) => {
  const { name, imageUrl, price, description, _id } = req.body;
  if (!name || !imageUrl || !price || !description)
    return next(new ErrorHandler("please fill all fields", 400));
  if (_id) {
    const updatedProduct = await Product.findByIdAndUpdate(_id, req.body, {
      new: true,
      runValidators: true,
    });
    return res.status(200).json({
      status: true,
      data: updatedProduct,
      message: "product updated successfully",
    });
  } else {
    const newProduct = await Product.create(req.body);
    return res.status(200).json({
      status: true,
      data: newProduct,
      message: "product created successfully",
    });
  }
});

exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
  const productId = req.body._id;

  // Mark the product as deleted
  const product = await Product.findByIdAndUpdate(
    productId,
    { isDelete: true },
    { new: true, runValidators: true }
  );

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  // Find all users whose carts contain the product
  const usersWithProductInCart = await User.find({
    "cart.productId": productId,
  });

  // Update each user's cart to remove the product
  await Promise.all(
    usersWithProductInCart.map(async (user) => {
      user.cart = user.cart.filter(
        (item) => item.productId.toString() !== productId.toString()
      );
      await user.save();
    })
  );

  // Send success response
  return res.status(200).json({
    status: true,
    message: "Product deleted successfully and removed from all user carts",
  });
});

exports.addProductToCart = catchAsyncErrors(async (req, res, next) => {
  const { productId } = req.params;
  const product = await Product.findById(productId);
  if (!product) return next(new ErrorHandler("product not found", 404));
  const user = await User.findById(req.id);
  if (!user) return next(new ErrorHandler("user not found", 404));

  const existingProduct = user.cart.find(
    (item) => item.productId.toString() === productId.toString()
  );
  if (existingProduct) {
    existingProduct.quantity += 1;
    await user.save();
    return res.status(200).json({
      status: true,
      data: user.cart,
      message: "quantity updated",
    });
  } else {
    user.cart.push({ productId });
  }

  await user.save();

  return res.status(200).json({
    status: true,
    data: user.cart,
    message: "product added to cart successfully",
  });
});

exports.removeProductFromCart = catchAsyncErrors(async (req, res, next) => {
  const { productId } = req.params;
  const user = await User.findById(req.id);

  if (!user) return next(new ErrorHandler("user not found", 404));

  const product = user.cart.find(
    (item) => item.productId.toString() === productId.toString()
  );

  if (!product) return next(new ErrorHandler("product not found", 404));

  if (product.quantity > 1) {
    product.quantity -= 1;
    await user.save();
    return res.status(200).json({
      status: true,
      data: user.cart,
      message: "quantity updated",
    });
  } else {
    user.cart = user.cart.filter(
      (item) => item.productId.toString() !== productId.toString()
    );
  }
  await user.save();

  res.status(200).json({
    status: true,
    data: user.cart,
    message: "product removed from cart successfully",
  });
});

exports.getCartProducts = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.id).lean().populate("cart.productId");
  if (!user) return next(new ErrorHandler("user not found", 404));
  const cartProducts = user.cart;
  if (!user) return next(new ErrorHandler("not found", 404));
  return res.status(200).json({
    status: true,
    data: cartProducts,
  });
});
