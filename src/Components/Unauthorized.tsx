import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons/faHome";

export const Unauthorized = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <div className="error-template">
            <h1>Oops!</h1>
            <h2>404 Not Found</h2>
            <div className="error-details">
              Sorry, an error has occured, Requested page not found!
            </div>
            <div className="error-actions">
              <Link to={"/Login"} className="btn btn-primary btn-lg">
                <FontAwesomeIcon icon={faHome} /> Take Me Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
