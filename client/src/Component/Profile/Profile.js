import React from "react";
import "./Profile.css";
import Aux from "../../hoc/Auxiliary.js";
import { Link } from "react-router-dom";
import { getUser } from "../UserFunctions/UserFunctions.js";

class Profile extends React.Component {
  state = {
    details: {},
    message: "",
  };

  componentDidMount() {
    const userName = localStorage.getItem("userName");

    getUser(userName)
      .then((res) => {

        if (Array.isArray(res) && res.length > 0) {
          this.setState(
            {
              details: res[0],
              message: "",
            },
            
          );
        } else {
          this.setState({
            details: {},
            message: "User not found",
          });
        }
      })
      .catch((err) => {
        console.log("PROFILE ERROR:", err);
        this.setState({
          details: {},
          message: "Unable to load profile",
        });
      });
  }

  handleEdit = () => {
    this.props.history.push("/editDetails");
  };

  render() {
    const data = this.state.details || {};

    return (
      <Aux>
        <Link
          to="/#"
          type="button"
          data-toggle="modal"
          data-target="#profileModal"
          data-backdrop="false"
        >
          <i
            className="fa fa-user-circle-o"
            style={{
              fontSize: "30px",
              padding: "0px 4px 5px 0px",
              margin: "0px",
            }}
          ></i>
        </Link>

        <div
          className="modal"
          id="profileModal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="profileModal"
          aria-hidden="true"
          style={{ paddingRight: "0px !important", overflow: "inherit" }}
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalCenterTitle">
                  My Details
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>

              <div className="modal-body">
                {this.state.message ? (
                  <p>{this.state.message}</p>
                ) : (
                  <>
                    <p>
                      Name: {data.firstName || ""} {data.lastName || ""}
                    </p>
                    <p>User Name: {data.userName || ""}</p>
                    <p>Phone Number: {data.phnNo || ""}</p>
                    <p>
                      Address: {data.address || ""},{data.state || ""},{data.city || ""}.
                    </p>
                  </>
                )}
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={this.handleEdit}
                >
                  Edit Details
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </Aux>
    );
  }
}

export default Profile;