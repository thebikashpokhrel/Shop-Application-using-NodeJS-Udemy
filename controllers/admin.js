const Product = require("../models/product");

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if(!editMode){
    return res.redirect("/");
  }
  const prodId = req.params.productId;
  Product.findById(prodId,(product) =>{
    if(!product){
      res.redirect("/");
    }
      res.render("admin/edit-product", {
        pageTitle: "Add Product",
        path: "/admin/edit-product",
        editing: editMode,
        product : product
      });
  })
};

exports.postEditProduct = (req, res, next) =>{
  const prodId = req.body.productId;
  const name = req.body.product;
  const description = req.body.description;
  const price = req.body.price;
  const imageURL = req.body.imageURL;
  const updatedProduct = new Product(prodId, name, description, price, imageURL);
  updatedProduct.save();
  res.redirect("/admin/products");
}

exports.getAddProduct = (req, res, next) => {
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add",
    editing:false
  });
};

exports.postAddProduct = (req, res, next) => {
  const name = req.body.product;
  const description = req.body.description;
  const price = req.body.price;
  const imageURL = req.body.imageURL;
  const product = new Product(null,name,description,price,imageURL);
  product.save();
  res.redirect("/");
};

exports.getProducts = (req,res,next) =>{
   Product.fetchAll((products) => {
     res.render("admin/products", {
       pageTitle: "Admin products",
       path: "/admin/products",
       products,
       hasProducts: products.length > 0,
     });
   });
}

exports.postDeleteProduct = (req,res,next) =>{
    const prodId = req.body.productId;
    Product.deleteById(prodId);
    res.redirect("/admin/products");
}
