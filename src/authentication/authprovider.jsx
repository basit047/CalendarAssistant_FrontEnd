import { useContext, createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState("");
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [tokenExpiry, setTokenExpiry] = useState(
    localStorage.getItem("token_expiry")
  );
  const [userEmail, setUserEmail] = useState("");
  const navigate = useNavigate();

  const loginAction = async (data) => {
    const callResponse = await fetch(
      "https://calendarassistant-backend.onrender.com/Authenticate/Login",
      {
        method: "POST",
        headers: {
          Accept: "application/json, text/plain",
          "Content-Type": "application/json;charset=UTF-8",
        },
        body: JSON.stringify({
          Username: data.email,
          Password: data.password,
        }),
      }
    );

    const response = await callResponse.json();
    console.log(`response: ${response}`);
    if (response.statusCode === 200) {
      setUser(response.userId);
      setToken(response.token);
      setTokenExpiry(response.expiration);
      setUserEmail(response.emailId);
      localStorage.setItem("token", response.token);
      localStorage.setItem("token_expiry", response.expiration);
      localStorage.setItem("user_id", response.userId);
      localStorage.setItem("email_id", response.emailId);
    }
    return response;
  };

  const logOut = () => {
    setUser(null);
    setToken("");
    setUserEmail("");
    localStorage.removeItem("token");
    localStorage.removeItem("token_expiry");
    localStorage.removeItem("user_id");
    localStorage.removeItem("email_id");
    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{ token, user, tokenExpiry, userEmail, loginAction, logOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
