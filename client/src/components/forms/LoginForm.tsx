import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginFormData } from "../../schemas/loginSchema";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../services/authService";
import { useState } from "react";

const LoginForm = () => {

  const navigate = useNavigate();
  const [serverError, setServerError] = useState("");

  const handleLogin = async (data: LoginFormData) => {
    setServerError("");
    
    try {
      const res = await loginUser(data);

      console.log(res);

      if (res.user) {
        navigate("/home");
      }
      
    } catch (error: any) {
      setServerError(error.message);
    }
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
        {serverError && <p className="text-red-500">{serverError}</p>}
      </form>
    </div>
  );
}

export default LoginForm;