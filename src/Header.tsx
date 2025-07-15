import "./header.css";
import { Link } from "react-router-dom";
import { useAuth } from "./Components/AuthContext.tsx";

export const Header = () => {
  const auth = useAuth();
  console.log(auth);
  const email_id = auth.user?.email;
  console.log(email_id);
  const isNullOrEmpty = (str: string | null | undefined): boolean => {
    return str === null || str === undefined || str.trim() === "";
  };
  return (
    <>
      <nav>
        <div className="container-fluid header">
          <div className="row">
            <div className="col-xs-2 col-sm-8 col-lg-10">
              <Link
                to="/Dashboard"
                className="logo"
                style={{ textDecoration: "underline" }}
              >
                LLM Based Scheduling Assistant
              </Link>
            </div>
          </div>
        </div>
      </nav>
      <nav className="nav-line">
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-6 hidden-xs"></div>
            <div className="col-sm-6 right-col">
              {isNullOrEmpty(auth.user?.email) ? (
                <>
                  <b>
                    {/* <Link to="/Register" className="me-3">
                      Register
                    </Link> */}
                    <Link to="/Login" className="me-3">Login</Link>
                  </b>
                </>
              ) : (
                <>
                  <Link to="/Edit" className="me-3">
                    <span className="me-3">{auth.user?.email}</span>
                  </Link>
                  <b>
                    <Link to="/Schedule" className="me-3">
                      Schedule
                    </Link>
                  </b>
                  <b>
                    <Link to="/Login" onClick={auth.logout}>
                      Logout
                    </Link>
                  </b>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
