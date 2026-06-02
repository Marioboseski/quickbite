export const checkout = (req, res) => {

  const { fullName, phoneNumber, address, items, totalPriceeee } = req.body;

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

  res.status(200).json({
    message: "Order received"
  });

}