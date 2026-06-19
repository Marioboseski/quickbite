import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerShema, type RegisterFormData } from "../../schemas/registerSchema";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../services/authService";
import { useState } from "react";

export const RegisterForm = () => {

  const navigate = useNavigate();
  const [serverError, setServerError] = useState("");

  const handleRegister = async (data: RegisterFormData) => {
    setServerError("");

    try {
      const res = await registerUser(data);
      console.log(res);

      if (res.user) {
        navigate("/home");
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
    <div>
      <form onSubmit={handleSubmit(handleRegister)}>
        <input type="text"
          placeholder="Name"
          className="input-fields"
          {...register("name")} />
        {errors.name && <p>{errors.name.message}</p>}

        <input type="text"
          placeholder="Email"
          className="input-fields"
          {...register("email")} />
        {errors.email && <p>{errors.email.message}</p>}

        <input type="password"
          placeholder="********"
          className="input-fields"
          {...register("password")} />
        {errors.password && <p>{errors.password.message}</p>}

        <input type="text"
          placeholder="City"
          className="input-fields"
          {...register("city")} />
        {errors.city && <p>{errors.city.message}</p>}

        <button type="submit">Register</button>
        {serverError && <p className="text-red-500">{serverError}</p>}
      </form>
    </div>
  )
}