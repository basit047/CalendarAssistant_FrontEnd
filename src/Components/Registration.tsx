import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";

export const Registration = () => {
  const [isEmailAlreadyExist, setIsEmailAlreadyExist] = useState(true);
  const [errorText, setErrorText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const checkEmail = (event: any) => {
    const email = event.target.value;
    const encodedEmail = encodeURIComponent(email);
    fetch(
      `https://localhost:7009/Authenticate/isEmailAvailable?email=${encodedEmail}`
    )
      .then((response) => response.json())
      .then((response) => {
        if (response.status === "Success") {
          setIsEmailAlreadyExist(false);
        }
      })
      .catch((error) => console.log(`Failed to fetch data: ${error}`));
  };

  const submitForm = (event: any) => {
    event.preventDefault();
    let username = event.target.username.value;
    let email = event.target.email.value;
    let password = event.target.password.value;
    let confirmPassword = event.target.confirmpassword.value;

    if (password === confirmPassword) {
      setIsLoading(true);
      fetch("https://localhost:7009/Authenticate/Register", {
        method: "POST",
        headers: {
          Accept: "application/json, text/plain",
          "Content-Type": "application/json;charset=UTF-8",
        },
        body: JSON.stringify({
          Username: username,
          Email: email,
          Password: password,
        }),
      })
        .then((response) => response.json())
        .then((response) => {
          if (response.status === "Error") {
            setErrorText(response.message);
            setIsLoading(false);
          } else {
            navigate("/");
          }
        })
        .catch((error) => {
          setErrorText(error);
          console.log(`Failed to save data: ${error}`);
        });
    } else {
      setErrorText("*** Password and confirm password does not much");
    }
  };

  return (
    <div>
      <section className="vh-100" style={{ backgroundColor: "#eee" }}>
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-12 col-xl-11">
              <div className="card text-black" style={{ borderRadius: "25px" }}>
                <div className="card-body p-md-5">
                  <div className="row justify-content-center">
                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                      <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                        Sign up
                      </p>
                      <p style={{ color: "red" }}>{errorText}</p>

                      <form className="mx-1 mx-md-4" onSubmit={submitForm}>
                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-lg me-3 fa-fw">
                            <FontAwesomeIcon icon={faUser} />
                          </i>

                          <div
                            data-mdb-input-init
                            className="form-outline flex-fill mb-0"
                          >
                            <input
                              type="text"
                              name="username"
                              className="form-control"
                              placeholder="Your Username"
                            />
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-lg me-3 fa-fw">
                            <FontAwesomeIcon icon={faEnvelope} />
                          </i>
                          <div
                            data-mdb-input-init
                            className="form-outline flex-fill mb-0"
                          >
                            <input
                              type="email"
                              name="email"
                              className="form-control"
                              placeholder="Your Email"
                              onBlur={checkEmail}
                            />
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-lg me-3 fa-fw">
                            <FontAwesomeIcon icon={faLock} />
                          </i>
                          <div
                            data-mdb-input-init
                            className="form-outline flex-fill mb-0"
                          >
                            <input
                              type="password"
                              className="form-control"
                              placeholder="Password"
                              name="password"
                            />
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-lg me-3 fa-fw">
                            <FontAwesomeIcon icon={faLock} />
                          </i>
                          <div
                            data-mdb-input-init
                            className="form-outline flex-fill mb-0"
                          >
                            <input
                              type="password"
                              name="confirmpassword"
                              className="form-control"
                              placeholder="Repeat your password"
                            />
                          </div>
                        </div>

                        <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                          <button
                            className="btn btn-primary"
                            type="submit"
                            disabled={isEmailAlreadyExist}
                          >
                            {isLoading && (
                              <span
                                className="spinner-border spinner-border-sm"
                                role="status"
                                aria-hidden="true"
                              ></span>
                            )}
                            &nbsp; Register
                          </button>
                        </div>
                      </form>
                    </div>
                    <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                      <img
                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                        className="img-fluid"
                        alt="Sample image"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
