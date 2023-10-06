import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ButtonStyle, ContainerStyle, InputStyle, LabelStyle, LinkStyle, LoginContainerStyle, TitleStyle } from "./IndexStyle";

export const Login = () => {

  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    email: "",
    senha: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:4004/login", userData);
      if (response.data.success) {
        alert("Login successful!");
        window.localStorage.setItem("token", response.data);
        window.localStorage.setItem("loggedIn", true);
        window.localStorage.setItem("user", JSON.stringify(response.data.user));
        console.log(response.data);
        window.location.reload();
        navigate("/dashboard");
      } else {
        alert("Invalid credentials. Please try again.");
      }
    } catch (error) {
      console.error("Error login:", error);
      alert("Erro durante o login! Verifique as entradas!");
    }
  };
  
  useEffect(() => {
    const isLoggedIn = window.localStorage.getItem("loggedIn");
    if (isLoggedIn === "true") {
      navigate("/dashboard");
    }
  }, [navigate]);

  return (
    <ContainerStyle>
      <LoginContainerStyle className="Card">

        <TitleStyle>Login</TitleStyle>
        <LabelStyle>Email:</LabelStyle>
        <InputStyle
          type="text"
          name="email"
          value={userData.email}
          onChange={handleInputChange}
        />
        <LabelStyle>Password:</LabelStyle>
        <InputStyle
          type="password"
          name="senha"
          value={userData.senha}
          onChange={handleInputChange}
        />
        <ButtonStyle onClick={handleLogin}>Login</ButtonStyle>

        <Link to="/cadastro">
          <LinkStyle>Create an account</LinkStyle>
        </Link>

        

      </LoginContainerStyle>
    </ContainerStyle>
  );
};
