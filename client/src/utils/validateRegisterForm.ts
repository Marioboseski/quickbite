type RegisterValues = {
  name: string,
  email: string,
  password: string,
  city: string
}

export const validateRegisterForm = (values: RegisterValues) => {
  
  const errors: Record<string, string> = {};

  if (!values.name) {
    errors.name = "Name requred"
  } 

  if (!values.email) {
    errors.email = "Email required"
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = "Enter valid email"
  }

  if (!values.password) {
    errors.password = "Password required"
  } else if (!/[A-Z]/.test(values.password) || (!/[!@#$%^&*(),.?":{}|<>]/.test(values.password))) {
    errors.password = "Atleast one upper case and one special character"
  }

  if (!values.city) {
    errors.city = "City required"
  }

  return errors;
}