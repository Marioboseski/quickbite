const API_URL = import.meta.env.VITE_API_URL;

export const createOrder = async (orderData: any) => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API_URL}/api/orders`, {
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

  const res = await fetch(`${API_URL}/api/orders`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return res.json();
}