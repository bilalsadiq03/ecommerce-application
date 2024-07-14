
const product_model = require("../models/product.model.js");


exports.createNewProduct = async (req, res) => {
    
    try {
      const { name, description, price, category, stock } = req.fields;
      const product = await product_model.create({ ...req.fields });
      res.status(201).json(product);
        
    } catch (error) {
        console.log(error.message);
        return res.status(500).send({
            message: error.message
        })
    }


}



exports.fetchAllproducts = async (req, res) => {
    try {
        const products = await product_model.find({})
          .populate("category")
          .limit(12)
          .sort({ createAt: -1 });
    
        res.json(products);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server Error" });
      }
}


exports.fetchProductWithId = async (req, res) => {
    try {
        const product = await product_model.findById(req.params.id);
        res.status(201).send(product)
    } catch (error) {
        console.log("Error geting the Product", error)
        return res.status(404).send({
            message: "Error fetching the Product"
        })
    }
}

exports.updateProduct = async (req, res) => {

    const productData = {
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        productImage: req.body.productImage,
        stock: req.body.stock,
        category: req.body.category
    }

    try {
        const product = await product_model.findByIdAndUpdate(req.params.id, { ...productData}, {new: true});
        res.status(201).send(product);
    } catch (err) {
        console.log("Error while Updating the product details:" ,err);
        return res.status(404).send({
            message: "Error updating  the Product details."
        })
    }
    



}


exports.deleteProduct = async (req, res) => {
    
    try {
        const product = await product_model.findByIdAndDelete(req.params.id)  
        res.json(product); 
    } catch (error) {
        res.status(500).json("Error deleting the Product ", error);
        return res.status(500).json({
            message: "Error deleting the Product"
        })
    }
}

exports.fetchProducts = async (req, res) => { 
  try {
        const pageSize = 6;
        const keyword = req.query.keyword
          ? {
              name: {
                $regex: req.query.keyword,
                $options: "i",
              },
            }
          : {};
    
        const count = await product_model.countDocuments({ ...keyword });
        const products = await product_model.find({ ...keyword }).limit(pageSize);
    
        res.json({
          products,
          page: 1,
          pages: Math.ceil(count / pageSize),
          hasMore: false,
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server Error" });
      }
}


exports.addProductReview =  async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const product = await product_model.findById(req.params.id);

    if (product) {
      const alreadyReviewed = product.reviews.find(
        (r) => r.user.toString() === req.user._id.toString()
      );

      if (alreadyReviewed) {
        res.status(400);
        throw new Error("Product already reviewed");
      }

      const review = {
        name: req.user.name,
        rating: Number(rating),
        comment,
        user: req.user._id,
      };

      product.reviews.push(review);

      product.numReviews = product.reviews.length;

      product.rating =
        product.reviews.reduce((acc, item) => item.rating + acc, 0) /
        product.reviews.length;

      await product.save();
      res.status(201).json({ message: "Review added" });
    } else {
      res.status(404);
      throw new Error("Product not found");
    }
  } catch (error) {
    console.error(error);
    res.status(400).json(error.message);
  }
}

exports.fetchTopProducts =  async (req, res) => {
    try {
       const products = await product_model.find({}).sort({rating: -1}).limit(4)
       res.json(products) 
    } catch (error) {
        console.error(error)
        res.status(400).json(error.message)
    }
}

exports.fetchNewProducts =  async (req, res) => {
    try {
       const products = await product_model.find().sort({_id: -1}).limit(5)
       res.json(products)
    } catch (error) {
        console.error(error)
        res.status(400).json(error)
    }
}


exports.filterProducts = async (req, res) => {
  try {

    const {checked, radio} = req.body

    let args = {}
    if (checked.length > 0) args.category = checked;
    if (radio.length) args.price = {$gte: radio[0], $lte: radio[1]}

    const products =await product_model.find(args)
    res.json(products)


  } catch (error) {

    console.error(error);
    res.status(500).json({error: "Internal Server Error"})
  }

}




