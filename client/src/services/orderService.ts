export const createOrder = async (orderData: any) => {
  const token = localStorage.getItem("token");

  const res = await fetch("http://localhost:3000/api/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(orderData)
  })

  return res.json();

}

export const getOrdersHistory = async () => {
  const token = localStorage.getItem("token");

  const res = await fetch("http://localhost:3000/api/orders", {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return res.json();
}