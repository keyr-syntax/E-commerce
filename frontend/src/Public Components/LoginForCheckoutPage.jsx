import { useState, useContext } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { ProductContext } from "./ContextProvider";

import "react-toastify/dist/ReactToastify.css";
import Navbar from "./Navbar";
import toast from "react-hot-toast";

const LoginForCheckoutPage = () => {
  const { API_URL, setIsAdmin, setIsLoggedIn, setUser } =
    useContext(ProductContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  // const [allowRedirect, setAllowRedirect] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const data = await fetch(`${API_URL}/api/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const response = await data.json();
      if (response.success) {
        setShowMessage(true);
        setUser(response.user);
        setIsLoggedIn(true);
        setIsAdmin(response.user.isAdmin);
        localStorage.setItem("token", response.token);
        document.cookie = `token=${response.token}`;
        console.log("token", response.token);
        console.log("user", response.user);
      } else {
        toast.error(`${response.message}`);
      }
    } catch (error) {
      console.log(error);
    }
  };
  if (showMessage === true) {
    setTimeout(() => {
      setShowMessage(false);
    }, 2000);
    setTimeout(() => {
      navigate("/cart");
    }, 2000);
  }

  return (
    <>
      <Navbar />
      {showMessage === true && toast.success("Login successful")}
      <StyledWrapper>
        <div className="container">
          <div className="heading">LogIn</div>
          <form onSubmit={handleLogin} className="form">
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="input"
              type="email"
              name="email"
              id="email"
              placeholder="E-mail"
            />
            <input
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input"
              type="password"
              name="password"
              id="password"
              placeholder="Password"
            />
            <span className="forgot-password">
              <a href="#">Forgot Password?</a>
            </span>
            <button className="login-button" type="submit">
              {" "}
              Login
            </button>
          </form>
          <div className="no-account">
            <span className="no-account">
              No Account?{" "}
              <Link className="no-account" to="/signup">
                {" "}
                Register{" "}
              </Link>{" "}
            </span>
          </div>
        </div>
      </StyledWrapper>
    </>
  );
};

const StyledWrapper = styled.div`
  .container {
    max-width: 350px;
    background-color: #151533;
    border-radius: 8px;
    padding: 35px 35px;
    border: 1px solid rgb(255, 255, 255);
    margin: 85px auto;
  }
  .no-account {
    text-align: center;
    padding: 5px;
    font-size: 18px;
  }
  .heading {
    text-align: center;
    font-weight: 900;
    font-size: 30px;
    color: white;
  }

  .form {
    margin-top: 20px;
  }

  .form .input {
    width: 100%;
    background: white;
    border: none;
    padding: 15px 20px;
    border-radius: 8px;
    margin-top: 15px;
    color: black;
  }

  .form .input::-moz-placeholder {
    color: black;
  }

  .form .input::placeholder {
    color: black;
  }

  .form .forgot-password {
    display: block;
    margin-top: 10px;
    margin-left: 10px;
  }

  .form .forgot-password a {
    font-size: 16px;
    color: white;
    text-decoration: none;
  }

  .form .login-button {
    display: block;
    width: 100%;
    font-weight: bold;
    font-size: 22px;
    color: white;
    padding-block: 15px;
    margin: 20px auto;
    border-radius: 8px;
    border: 1px solid white;
    transition: all 0.2s ease-in-out;
    background-color: #151533;
  }

  .form .login-button:hover {
    cursor: pointer;
  }

  .social-account-container {
    margin-top: 25px;
  }

  .social-account-container .title {
    display: block;
    text-align: center;
    font-size: 16px;
    color: white;
    padding: 10px;
  }

  .social-account-container .social-accounts {
    width: 100%;
    display: flex;
    justify-content: center;
    gap: 15px;
    margin-top: 5px;
  }

  .social-account-container .social-accounts .social-button {
    border: 3px solid white;
    padding: 5px;
    border-radius: 50%;
    width: 40px;
    aspect-ratio: 1;
    display: grid;
    place-content: center;

    transition: all 0.2s ease-in-out;
  }

  .social-account-container .social-accounts .social-button .svg {
    fill: white;
    margin: auto;
  }

  .social-account-container .social-accounts .social-button:hover {
    transform: scale(1.2);
  }

  .social-account-container .social-accounts .social-button:active {
    transform: scale(0.9);
  }
`;

export default LoginForCheckoutPage;
