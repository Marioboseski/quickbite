import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginFormData } from "../../schemas/loginSchema";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {

  const navigate = useNavigate();

  const handleLogin = (data: LoginFormData) => {
    console.log(data);

    navigate("/home");
  }

  const { register, handleSubmit, formState: { errors } } =
    useForm<LoginFormData>({
      resolver: zodResolver(loginSchema),
      defaultValues: {
        email: "",
        password: ""
      }
    });

  return (
    <div className="">
      <form onSubmit={handleSubmit(handleLogin)}>

        <input type="text"
          placeholder="Email"
          className="input-fields"
          {...register("email")}
        />
        {errors.email && <p>{errors.email.message}</p>}

        <input type="password"
          placeholder="********"
          className="input-fields"
          {...register("password")}
        />
        {errors.password && <p>{errors.password.message}</p>}

        <button type="submit">Login</button>

      </form>
    </div>
  );
}

export default LoginForm;