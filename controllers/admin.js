const Product = require("../models/product");
const mongodb = require("mongodb");

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect("/");
  }
  const prodId = req.params.productId;
  Product.findById(prodId)
    .then((product) => {
      if (!product) {
        res.redirect("/");
      }
      res.render("admin/edit-product", {
        pageTitle: "Add Product",
        path: "/admin/edit-product",
        editing: editMode,
        product: product,
      });
    })
    .catch((err) => console.log(err));
};

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const name = req.body.product;
  const description = req.body.description;
  const price = req.body.price;
  const imageURL = req.body.imageURL;
  const product = new Product(name, description, price, imageURL, prodId);
  product
    .save()
    .then((result) => {
      console.log("Product Updated");
      res.redirect("/admin/products");
    })
    .catch((err) => console.log(err));
};

exports.getAddProduct = (req, res, next) => {
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add",
    editing: false,
  });
};

exports.postAddProduct = (req, res, next) => {
  const name = req.body.product;
  const description = req.body.description;
  const price = req.body.price;
  const imageURL = req.body.imageURL;
  const product = new Product(
    name,
    description,
    price,
    imageURL,
    null,
    req.user._id
  );
  product
    .save()
    .then((result) => {
      console.log("Created Product");
      res.redirect("/admin/products");
    })
    .catch((err) => console.log(err));
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll()
    .then((products) => {
      res.render("admin/products", {
        pageTitle: "Admin products",
        path: "/admin/products",
        products: products,
        hasProducts: products.length > 0,
      });
    })
    .catch((err) => console.log(err));
};

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.deleteById(prodId)
    .then(() => {
      console.log("Product Deleted");
      res.redirect("/admin/products");
    })
    .catch((err) => console.log(err));
};
