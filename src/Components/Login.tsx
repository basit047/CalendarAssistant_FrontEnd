import React, {useEffect } from "react";
import { GoogleDirectLogin } from "./GoogleDirectLogin.tsx";
import { GoogleOAuthProvider } from "@react-oauth/google";

// --- STYLES ---
// In a real React app, this would typically be in a separate CSS file
// or handled by a CSS-in-JS library. For this self-contained example,
// we'll inject it into the head.
const LoginStyles = () => {
  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
            body {
                font-family: 'Inter', sans-serif;
                background-color: #f0f2f5; /* A neutral background */
            }
            .form-panel-gradient {
                background: linear-gradient(180deg, #ffffff 0%, #fefde8 100%);
            }
            .image-panel {
                background-image: url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop');
                background-size: cover;
                background-position: center;
            }
            .ui-card {
                background: rgba(255, 255, 255, 0.8);
                backdrop-filter: blur(10px);
                -webkit-backdrop-filter: blur(10px);
                border: 1px solid rgba(255, 255, 255, 0.2);
            }
        `;
    document.head.appendChild(style);

    const fontLink = document.createElement("link");
    fontLink.href =
      "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap";
    fontLink.rel = "stylesheet";
    document.head.appendChild(fontLink);

    const tailwindScript = document.createElement("script");
    tailwindScript.src = "https://cdn.tailwindcss.com";
    document.head.appendChild(tailwindScript);

    return () => {
      document.head.removeChild(style);
      document.head.removeChild(fontLink);
      document.head.removeChild(tailwindScript);
    };
  }, []);

  return null;
};

// --- THE MAIN LOGIN COMPONENT ---
export const Login = () => {
  // const [formData, setFormData] = useState({
  //   fullName: "",
  //   email: "",
  //   password: "",
  // });

  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = e.target;
  //   setFormData((prevState) => ({
  //     ...prevState,
  //     [name]: value,
  //   }));
  // };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // console.log("Form Submitted:", formData);
    // // Here you would typically handle the form submission,
    // // e.g., send the data to your backend API.
    // alert(`Account creation submitted for ${formData.fullName}`);
  };

  return (
    <>
      <LoginStyles />
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-5xl mx-auto lg:grid lg:grid-cols-2 rounded-3xl shadow-2xl overflow-hidden" style={{"height": "800px"}}>
          {/* Form Panel */}
          <div className="form-panel-gradient p-8 md:p-12" style={{"paddingTop": "43%"}}>
            <div className="w-full max-w-md mx-auto">
              <h1 className="text-2xl font-bold text-gray-800">Calender Assistant</h1>

              <h2 className="mt-6 text-3xl font-bold text-gray-900">
                Login
              </h2>

              <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
                <div className="">
                  <button
                    type="button"
                    className="w-full inline-flex justify-center py-3 px-4 border border-gray-600 rounded-lg shadow-sm text-sm font-medium text-gray-300"
                  >
                    <GoogleOAuthProvider clientId="814206436687-df03frm3q9ml8ue57cnliu2q3m90e3ov.apps.googleusercontent.com">
                      <GoogleDirectLogin />
                    </GoogleOAuthProvider>
                  </button>
                </div>
              </form>
              <div className="mt-8 text-xs text-gray-500 text-center">
                <span>
                  Already have an account?{" "}
                  <a
                    href="#"
                    className="font-medium text-yellow-600 hover:text-yellow-700"
                  >
                    Log in
                  </a>
                </span>
                <span className="mx-2">|</span>
                <span>
                  <a
                    href="#"
                    className="font-medium text-yellow-600 hover:text-yellow-700"
                  >
                    Terms & Conditions
                  </a>
                </span>
              </div>
            </div>
          </div>

          {/* Image Panel */}
          <div className="relative hidden lg:block image-panel">
            <div className="absolute top-10 right-10 ui-card p-4 rounded-xl shadow-lg">
              <div className="flex items-center space-x-2">
                <span className="w-3 h-3 bg-yellow-400 rounded-full"></span>
                <p className="text-sm font-semibold text-gray-800">
                  Task Review with Team
                </p>
              </div>
              <p className="text-xs text-gray-600 mt-1">10:00 AM - 10:30 AM</p>
            </div>

            <div className="absolute bottom-20 left-10 ui-card p-4 rounded-xl shadow-lg">
              <p className="text-sm font-semibold text-gray-800">
                Daily Meeting
              </p>
              <p className="text-xs text-gray-600 mt-1">11:00 AM - 11:15 AM</p>
              <div className="flex -space-x-2 overflow-hidden mt-2">
                <img
                  className="inline-block h-6 w-6 rounded-full ring-2 ring-white"
                  src="https://placehold.co/32x32/d1d5db/374151?text=A"
                  alt="User A"
                  onError={(e) => {
                    e.currentTarget.src =
                      "https://placehold.co/32x32/d1d5db/374151?text=A";
                  }}
                />
                <img
                  className="inline-block h-6 w-6 rounded-full ring-2 ring-white"
                  src="https://placehold.co/32x32/a5b4fc/1e293b?text=B"
                  alt="User B"
                  onError={(e) => {
                    e.currentTarget.src =
                      "https://placehold.co/32x32/a5b4fc/1e293b?text=B";
                  }}
                />
                <img
                  className="inline-block h-6 w-6 rounded-full ring-2 ring-white"
                  src="https://placehold.co/32x32/fca5a5/450a0a?text=C"
                  alt="User C"
                  onError={(e) => {
                    e.currentTarget.src =
                      "https://placehold.co/32x32/fca5a5/450a0a?text=C";
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
