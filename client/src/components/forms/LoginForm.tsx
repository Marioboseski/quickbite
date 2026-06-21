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
        localStorage.setItem("currentUser", JSON.stringify(res.user));
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
    <div className="flex flex-col justify-center items-center gap-3 w-full p-2">
      <h3 className="text-3xl">Welcome back!</h3>
      <p className="text-lg">Login to your account!</p>
      <form onSubmit={handleSubmit(handleLogin)} className="flex flex-col justify-evenly min-h-60 w-full max-w-sm border border-gray-400 rounded-md p-2">

        <input type="text"
          placeholder="Email"
          className="input-fields"
          {...register("email")}
        />
        {errors.email && <p className="formInputError">{errors.email.message}</p>}

        <input type="password"
          placeholder="********"
          className="input-fields"
          {...register("password")}
        />
        {errors.password && <p className="formInputError">{errors.password.message}</p>}

        <div className="flex flex-col justify-center items-center gap-2">
          <button type="submit" className="border-2 border-amber-400 rounded-md p-1 text-lg w-full max-w-40">Login</button>
          {serverError && <p className="text-red-500">{serverError}</p>}
        </div>

      </form>
    </div>
  );
}

export default LoginForm;