import { useState } from "react";
import LoginForm from "../components/forms/LoginForm";
import { RegisterForm } from "../components/forms/RegisterForm";

const Auth = () => {

  const [ isLogin, setIsLogin ] = useState(false);

  const toggleAuthMode = () => {
    setIsLogin(prev => !prev);
  }

  return (
    <div className="flex flex-col justify-center items-center min-h-dvh">
      {isLogin ? <LoginForm /> : <RegisterForm />}
      <button onClick={toggleAuthMode}>{isLogin ? "Don't have an account? Register." : "Already have an account? Login."}</button>
    </div>
  );
}

export default Auth;