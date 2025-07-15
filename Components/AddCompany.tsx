import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBuilding, faAddressCard } from "@fortawesome/free-solid-svg-icons";

export const AddCompany = () => {
  const [errorText, setErrorText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const token = localStorage.getItem("token");

  const submitForm = (event: any) => {
    event.preventDefault();
    let companyName = event.target.name.value;
    let companyAddress = event.target.address.value;

    if (companyName && companyAddress) {
      setIsLoading(true);
      fetch("http://localhost:5191/api/Company/Register", {
        method: "POST",
        headers: {
          Accept: "application/json, text/plain",
          "Content-Type": "application/json;charset=UTF-8",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          address: companyAddress,
          name: companyName,
        }),
      })
        .then((response) => response.json())
        .then((response) => {
          if (response.status === "Error") {
            setErrorText(response.message);
            setIsLoading(false);
          } else {
            alert(999);
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
      <div>
        <section className="vh-100" style={{ backgroundColor: "#eee" }}>
          <div className="container h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-lg-12 col-xl-11">
                <div
                  className="card text-black"
                  style={{ borderRadius: "25px" }}
                >
                  <div className="card-body p-md-5">
                    <div className="row justify-content-center">
                      <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                        <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                          Add Company
                        </p>
                        <p style={{ color: "red" }}></p>

                        <form className="mx-1 mx-md-4" onSubmit={submitForm}>
                          <div
                            data-mdb-input-init
                            className="form-group row form-outline mb-4"
                          >
                            <label className="col-sm-4 col-form-label form-control-md">
                              <FontAwesomeIcon icon={faBuilding} />
                            </label>
                            <div className="col-sm-8">
                              <input
                                type="text"
                                name="name"
                                className="form-control form-control-md"
                                placeholder="Company Name"
                              />
                            </div>
                          </div>
                          <div
                            data-mdb-input-init
                            className="form-group row form-outline mb-4"
                          >
                            <label className="col-sm-4 col-form-label form-control-md">
                              <FontAwesomeIcon icon={faAddressCard} />
                            </label>
                            <div className="col-sm-8">
                              <textarea
                                name="address"
                                className="form-control form-control-md"
                                placeholder="Address"
                              />
                            </div>
                          </div>
                          <button className="btn btn-primary" type="submit">
                            &nbsp; Add
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AddCompany;
