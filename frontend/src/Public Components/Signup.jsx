import { useState, useContext } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { ProductContext } from "./ContextProvider";

import Navbar from "./Navbar";
import toast from "react-hot-toast";
const Signup = () => {
  const {
    API_URL,

    setIsAdmin,

    setIsLoggedIn,

    setUser,
  } = useContext(ProductContext);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await fetch(`${API_URL}/api/user/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      });

      const response = await data.json();
      if (response.success) {
        setUser(response.user);
        setIsLoggedIn(true);
        setIsAdmin(response.user.isAdmin);
        // navigate(response.user.isAdmin ? "/admin" : "/");

        localStorage.setItem("token", response.token);
        document.cookie = `token=${response.token}`;
        console.log("token", response.token);
        console.log("user", response.user);
        toast.success("Registration successful");
        navigate("/");
      } else {
        toast.error(`${response.message}`);
      }
    } catch (error) {
      toast.error(`${error.message}`);
    }
  };

  return (
    <>
      <Navbar />
      <StyledWrapper>
        <div className="container-signup">
          <div className="heading">Register</div>
          <form onSubmit={handleSubmit} className="form">
            <input
              required
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              className="input-signup"
              type="text"
              name="username"
              id="username"
              placeholder="username"
            />
            <input
              required
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              className="input-signup"
              type="email"
              name="email"
              id="email"
              placeholder="E-mail"
            />
            <input
              required
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              className="input-signup"
              type="password"
              name="password"
              id="password"
              placeholder="Password"
            />
            <span className="forgot-password">
              <a href="#">Forgot Password?</a>
            </span>
            <input className="login-button" type="submit" value="Register" />
          </form>
          <div className="no-account-signup">
            <span className="no-account-signup">
              Already have Account?{" "}
              <Link className="no-account-signup" to="/login">
                {" "}
                Login{" "}
              </Link>{" "}
            </span>
          </div>
        </div>
      </StyledWrapper>
    </>
  );
};

const StyledWrapper = styled.div`
  .container-signup {
    max-width: 350px;
    background-color: #151533;
    border-radius: 8px;
    padding: 25px 35px;
    border: 1px solid rgb(255, 255, 255);
    margin: 75px auto;
  }
  .no-account-signup {
    text-align: center;
    padding: 5px;
    font-size: 18px;
    color: white;
    text-decoration: none;
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

  .form .input-signup {
    width: 100%;
    background: white;
    border: none;
    padding: 15px 20px;
    border-radius: 8px;
    margin-top: 15px;
    color: black;
  }

  .form .input-signup::-moz-placeholder {
    color: black;
  }

  .form .input-signup::placeholder {
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

export default Signup;
