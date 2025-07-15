import { useNavigate } from "react-router-dom";
const baseUrl = "http://localhost:5191/api/";

const authFetch = async (url, options = {}) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const headers = {
    ...options.headers,
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  const response = await fetch(`${baseUrl}${url}`, {
    ...options,
    headers,
  });

  // Handle 401 Unauthorized (token expired or invalid)
  if (response.status === 401) {
    console.error("Unauthorized: Token is invalid or expired");
    navigate("/Unauthorized");
  }

  return response;
};

export default authFetch;
