const ProductVariant = require("../../../models/ProductVariant");
const Product = require("../../../models/Product");

exports.createProductVariant = async (req, res) => {
  try {
    const product = await Product.findOne({ _id: req.params.id });
    const productvariant = await ProductVariant.create({
      ...req.body,
      product_id: product._id,
    });
/*
    if (product.product_variant.includes(product._id)) {
      return res
        .status(400)
        .json({ status: "Fail", message: "product variant already exists!" });
    }
    await product.product_variant.push(productvariant._id);
    await product.save();
*/
    res.status(201).json({
      status: "proprties has been created successfuly!",
      productvariant,
    });
  } catch (error) {
    res.status(400).json({
      status: "Fail",
      error,
    });
  }
};

exports.getProductVariant = async (req, res) => {
  try {
    const productvariant = await ProductVariant.find();

    res.status(200).json({
      status: "Success",
      productvariant,
    });
  } catch (error) {
    res.status(400).json({
      status: "Fail",
      error,
    });
  }
};
