type LoginValues = {
  email: string,
  password: string
}

export const validateLoginForm = (values: LoginValues) => {

  const errors: Record<string, string> = {};
  
  if (!values.email) {
    errors.email = "Email required"
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = "Enter valid email"
  }

  if (!values.password) {
    errors.password = "Password required"
  } else if (!/[A-Z]/.test(values.password) || (!/[!@#$%^&*(),.?":{}|<>]/.test(values.password))) {
    errors.password = "Atleast one uppercase and one special character"
  }

  return errors;
}