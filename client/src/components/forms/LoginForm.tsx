import { useForm } from "../../hooks/useForm";
import { validateLoginForm } from "../../utils/validateLoginForm";
import { useNavigate } from "react-router-dom";

const initialValues = {
  email: "",
  password: ""
}

const LoginForm = () => {

  const navigate = useNavigate();

  const handleLogin = (values: typeof initialValues) => {
    console.log(values);
    navigate("/home");
  }

  const { errors, values, handleChange, handleSubmit } = useForm(initialValues, validateLoginForm, handleLogin);

  return (
    <div className="">
      <form onSubmit={handleSubmit}>

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

        <button type="submit">Login</button>

      </form>
    </div>
  );
}

export default LoginForm;