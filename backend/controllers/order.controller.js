const order_model = require('../models/order.model.js')
const product_model = require('../models/product.model.js')


function calcPrices(orderItems) {
  const itemsPrice = orderItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  const shippingPrice = itemsPrice > 100 ? 0 : 10;
  const taxRate = 0.15;
  const taxPrice = (itemsPrice * taxRate).toFixed(2);

  const totalPrice = (
    itemsPrice +
    shippingPrice +
    parseFloat(taxPrice)
  ).toFixed(2);

  return {
    itemsPrice: itemsPrice.toFixed(2),
    shippingPrice: shippingPrice.toFixed(2),
    taxPrice,
    totalPrice,
  };
}

exports.createOrder = async (req, res) => {

  try {
    const { orderItems, shippingAddress, paymentMethod } = req.body;

    if (orderItems && orderItems.length === 0) {
      res.status(400);
      throw new Error("No order items");
    }

    const itemsFromDB = await product_model.find({
      _id: { $in: orderItems.map((x) => x._id) },
    });

    const dbOrderItems = orderItems.map((itemFromClient) => {
      const matchingItemFromDB = itemsFromDB.find(
        (itemFromDB) => itemFromDB._id.toString() === itemFromClient._id
      );

      if (!matchingItemFromDB) {
        res.status(404);
        throw new Error(`Product not found: ${itemFromClient._id}`);
      }

      return {
        ...itemFromClient,
        product: itemFromClient._id,
        price: matchingItemFromDB.price,
        _id: undefined,
      };
    });

    const { itemsPrice, taxPrice, shippingPrice, totalPrice } =
      calcPrices(dbOrderItems);

    const order = await order_model.create({
      orderItems: dbOrderItems,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}; 


exports.getAllOrders = async (req, res) => {

  try {
    const orders = await order_model.find({}).populate('user', 'name id');
    res.status(201).send(orders);
  } catch (error) {
    console.log("Error getting all orders ", error);
    return res.status(404).send({
      message: "Error getting all orders",
    });
  }

}



exports.getUserOrders = async (req, res) =>{

  try {
    console.log(req.user)
    const orders = await order_model.find({user: req.user._id});
    if(orders){
      res.send(orders);
    } else {
      res.status(404).json({
        message: "No orders found for this user",
        });
    }
    
  } catch (error) {
    res.status(500).send({ 
      error: error.message 
    });
  }
}


exports.countTotalOrders = async (req, res) => {
  try {
    const totalOrders = await order_model.countDocuments();
    res.status(200).json({ totalOrders });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

exports.calculateTotalSales = async (req, res) => {
  try {
    const orders = await order_model.find();
    const totalSales = orders.reduce((sum, order) => sum + order.totalPrice, 0);
    res.send({ totalSales });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
}

exports.calculateTotalSalesByDate = async(req, res) => {
  try {
    const salesByDate = await order_model.aggregate([
      {
        $match: {
          isPaid: true,
        },
      },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$paidAt" },
          },
          totalSales: { $sum: "$totalPrice" },
        },
      },
    ]);

    res.json(salesByDate);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
}


exports.getOrderById =  async (req, res) => {
    try {
        const order = await order_model.findById(req.params.id).populate('user', 'name email');
        if (order){
          res.status(201).send(order)
        } else {
          res.status(404).send({ message: "Order not found" })
        }
    } catch (error) {
        console.log("Error geting the Order", error)
        return res.status(404).send({
            message: "Error fetching the Order"
        })
    }
}


exports.markOrderAsPaid = async (req, res) => {
  try {
    const order = await order_model.findById(req.params.id);

    if (order) {
      order.isPaid = true;
      order.paidAt = Date.now();
      order.paymentResult = {
        id: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email: req.body.payer.email,
      };

      const updateOrder = await order_model.save();
      res.status(200).send(updateOrder);
    } else {
      res.status(404).send({
        message: "Order not found!"
      })
    }
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
}

exports.markOrderAsDelivered = async (req, res) => {
  try {
    const order = await order_model.findById(req.params.id);
    if (order) {
      order.isDelivered = true;
      order.deliveredAt = Date.now();
      const updateOrder = await order.save();
      res.status(200).send(updateOrder);
    } else {
        res.status(404).send({
          message: "Order not found!"
        })
    }
    
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
}