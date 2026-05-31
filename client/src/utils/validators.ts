export const validateFullName = (value: string) => {

  if (!value.trim()) {
    return "This field is required"
  }

  return "";
}

export const validatePhoneNumber = (value: string) => {

  if (!value) {
    return "Phone Number Requred"
  }

  return "";
}

export const validateAddress = (value: string) => {

  if (!value.trim()) {

    return "Address Required";
  }

  return "";
}