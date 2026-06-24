import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerShema, type RegisterFormData } from "../../schemas/registerSchema";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../services/authService";
import { useState } from "react";
import { Link } from "react-router-dom";

export const RegisterForm = () => {

  const navigate = useNavigate();
  const [serverError, setServerError] = useState("");

  const handleRegister = async (data: RegisterFormData) => {
    setServerError("");

    try {
      const res = await registerUser(data);
      console.log(res);

      if (res.user) {
        navigate("/login");
      }
    } catch (error: any) {
      setServerError(error.message);
    }
  }

  const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormData>({
    resolver: zodResolver(registerShema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      city: ""
    }
  });

  return (
    <div className="flex flex-col justify-center items-center gap-3 w-full p-2 min-h-dvh">
      <h3 className="text-3xl">Welcome to QuickBite!</h3>
      <p className="text-lg">Create your account and start ordering!</p>
      <form onSubmit={handleSubmit(handleRegister)} className="flex flex-col justify-evenly min-h-96 w-full max-w-sm border border-gray-400 rounded-md p-2">

        <input type="text"
          placeholder="Name"
          className="input-fields"
          {...register("name")} />
        {errors.name && <p className="formInputError">{errors.name.message}</p>}

        <input type="text"
          placeholder="Email"
          className="input-fields"
          {...register("email")} />
        {errors.email && <p className="formInputError">{errors.email.message}</p>}

        <input type="password"
          placeholder="********"
          className="input-fields"
          {...register("password")} />
        {errors.password && <p className="formInputError">{errors.password.message}</p>}

        <input type="text"
          placeholder="City"
          className="input-fields"
          {...register("city")} />
        {errors.city && <p className="formInputError">{errors.city.message}</p>}

        <div className="flex flex-col justify-center items-center gap-2">
          <button type="submit" className="border-2 border-amber-400 rounded-md p-1 text-lg w-full max-w-40">Register</button>
          {serverError && <p className="text-red-500">{serverError}</p>}
        </div>

      </form>
      <Link to={"/login"}>Already have an account? Login</Link>
    </div>
  )
}