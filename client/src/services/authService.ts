const API_URL = import.meta.env.VITE_API_URL;

export const registerUser = async (data: any) => {
  const res = await fetch(`${API_URL}/api/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });

  const result = await res.json();

  if (!res.ok) {
    throw new Error(result.message);
  }
  return result;
}

export const loginUser = async (data: any) => {
  const res = await fetch(`${API_URL}/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })

  const result = await res.json();

  if (!res.ok) {
    throw new Error(result.message);
  }
  return result;
}