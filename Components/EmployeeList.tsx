import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle, faPenSquare } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";

type Employee = {
  empNo: number;
  ename: string;
  job: string;
  mgr?: number;
  hireDate: Date;
  sal: number;
  comm: string;
  dept: number;
  createBy: number;
  createdAt: Date;
  modifiedBy?: number;
  modifiedAt?: Date;
};

export const EmployeeList = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5191/api/Employee", {
      method: "GET",
      headers: {
        Accept: "application/json, text/plain",
        "Content-Type": "application/json;charset=UTF-8",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.status === 401) {
          navigate("/Unauthorized");
        } else {
          setEmployees(response);
        }
      })
      .catch((error) => {
        console.log(`Failed to load data: ${error}`);
        navigate("/Unauthorized");
      });
  }, []);

  return (
    <div className="table-responsive">
      {employees.length === 0 ? (
        <p>Loading data...</p>
      ) : (
        <table className="table mb-0 bg-white">
          <thead className="bg-light">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Title</th>
              <th>Status</th>
              <th>Position</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee, index) => (
              <tr key={`Key_${employee.empNo}_${index}`}>
                <td>{index + 1}</td>
                <td>
                  <div className="d-flex align-items-center">
                    <img
                      src="https://mdbootstrap.com/img/new/avatars/8.jpg"
                      alt=""
                      style={{ width: "45px", height: "45px" }}
                      className="rounded-circle"
                    />
                    <div className="ms-3">
                      <p className="fw-bold mb-1">{employee.ename}</p>
                      <p className="text-muted mb-0">
                        {moment(employee.hireDate).format("MM-DD-YYYY")}
                      </p>
                    </div>
                  </div>
                </td>
                <td>
                  <p className="fw-normal mb-1">{employee.job}</p>
                  <p className="text-muted mb-0">{employee.sal}</p>
                </td>
                <td>
                  <FontAwesomeIcon icon={faCircle} style={{ color: "green" }} />
                </td>
                <td>Senior</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-link btn-sm btn-rounded"
                  >
                    <FontAwesomeIcon icon={faPenSquare} size="2x" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};
