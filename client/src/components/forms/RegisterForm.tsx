import { useForm } from "../../hooks/useForm";
import { validateRegisterForm } from "../../utils/validateRegisterForm";
import { useNavigate } from "react-router-dom";

const initialValues = {
  name: "",
  email: "",
  password: "",
  city: ""
}

export const RegisterForm = () => {

  const navigate = useNavigate();

  const handleRegister = (values: typeof initialValues) => {
    console.log(values);
    
    navigate("/home");
  }

  const { errors, values, handleChange, handleSubmit } = useForm(initialValues, validateRegisterForm, handleRegister);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text"
          name="name"
          value={values.name}
          onChange={handleChange}
          placeholder="Name"
          className="input-fields" />
        {errors.name && <p>{errors.name}</p>}

        <input type="text"
          name="email"
          value={values.email}
          onChange={handleChange}
          placeholder="Email"
          className="input-fields" />
        {errors.email && <p>{errors.email}</p>}

        <input type="password"
          name="password"
          value={values.password}
          onChange={handleChange}
          placeholder="********"
          className="input-fields" />
        {errors.password && <p>{errors.password}</p>}

        <input type="text"
          name="city"
          value={values.city}
          onChange={handleChange}
          placeholder="City"
          className="input-fields" />
        {errors.city && <p>{errors.city}</p>}

        <button type="submit">Register</button>

      </form>
    </div>
  )
}