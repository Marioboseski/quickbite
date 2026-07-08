import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginFormData } from "../../schemas/loginSchema";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../services/authService";
import { useState } from "react";
import { useUserStore } from "../../store/userStore";

const LoginForm = () => {

  const navigate = useNavigate();
  const [serverError, setServerError] = useState("");
  const { login } = useUserStore();

  const handleLogin = async (data: LoginFormData) => {
    setServerError("");

    try {
      const res = await loginUser(data);

      console.log(res);

      if (res.user) {
        login(res.user);

        localStorage.setItem("token", res.token);

        navigate("/checkout");
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
    <div className="flex flex-col justify-center items-center text-center gap-3 w-full p-2  min-h-dvh">
      <h3 className="text-3xl">Welcome back!</h3>
      <p className="text-lg">Login to your account!</p>
      <form onSubmit={handleSubmit(handleLogin)} className="flex flex-col justify-evenly min-h-60 w-full max-w-sm border border-gray-400 rounded-md p-2">

        <div className="flex flex-col justify-center items-start">
          <input type="text"
            placeholder="Email"
            className="input-fields"
            {...register("email")}
          />
          {errors.email && <p className="formInputError">{errors.email.message}</p>}
        </div>

        <div className="flex flex-col justify-center items-start">
          <input type="password"
            placeholder="********"
            className="input-fields"
            {...register("password")}
          />
          {errors.password && <p className="formInputError">{errors.password.message}</p>}
        </div>

        <div className="flex flex-col justify-center items-center gap-2">
          <button type="submit" className="border-2 border-amber-400 rounded-md p-1 text-lg w-full max-w-40">Login</button>
          {serverError && <p className="text-red-500">{serverError}</p>}
        </div>

      </form>
      <Link to={"/register"}>Don't have an accunt? Register</Link>
    </div>
  );
}

export default LoginForm;