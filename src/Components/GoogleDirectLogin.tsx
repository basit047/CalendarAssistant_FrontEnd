import { GoogleLogin, useGoogleLogin } from "@react-oauth/google";
import { useAuth } from "./AuthContext.tsx";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const GoogleDirectLogin = () => {
  const { setUser } = useAuth();
  const navigate = useNavigate();
  const login = useGoogleLogin({
    flow: "auth-code",
    onSuccess: async (codeResponse) => {
      console.log("Authorization Code:", codeResponse.code);

      // Send code to your .NET backend
      const response = await axios.post(
        "https://calendarassistant-backend.onrender.com/Calendar/AuthenticateUser",
        {
          token: codeResponse.code,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Backend response:", response.data);

      const { email, name, picture, timezone, idToken, accessToken } =
        response.data;
      setUser({ email, name, picture, timezone, idToken, accessToken });
      localStorage.setItem("access_token", response.data.accessToken);
      localStorage.setItem("id_token", response.data.idToken);
      localStorage.setItem("user_email", email);
      navigate("/Dashboard");
    },
    onError: (errorResponse) => console.error("Login Failed:", errorResponse),
    scope: [
      "openid",
      "email",
      "profile",
      "https://www.googleapis.com/auth/gmail.readonly",
      "https://www.googleapis.com/auth/gmail.send",
      "https://www.googleapis.com/auth/calendar",
    ].join(" "),
  });

  return (
    <div>
      <GoogleLogin onSuccess={() => login()} />
    </div>
  );
};