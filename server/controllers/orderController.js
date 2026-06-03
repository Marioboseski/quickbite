export const checkout = (req, res) => {

  const { fullName, phoneNumber, address, items, totalPrice, paymentMethod } = req.body;

  if (!fullName) {
    return res.status(400).json({
      message: "Full name is required"
    });
  }

  if (!phoneNumber) {
    return res.status(400).json({
      message: "Phone number is requred"
    });
  }

  if (!address) {
    return res.status(400).json({
      message: "Address is required"
    })
  }

  if (!items || items.length === 0) {
    return res.status(400).json({
      message: "Cart is empty"
    })
  }

  if (!paymentMethod) {
    return res.status(400).json({
      message: "Payment method is required"
    })
  }

  if (paymentMethod === "cash") {
    return res.status(200).json({
      message: "Order received successfully, pay on delivery"
    })
  } else if (paymentMethod === "card") {
    return res.status(200).json({
      message: "Order received successfully.Card payment selected."
    })
  }

  res.status(200).json({
    success: true,
    message: "Order received"
  });

}