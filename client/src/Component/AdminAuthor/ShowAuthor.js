import React from "react";
import {
  getAuthors,
  deleteAuthor,
  updateAuthor,
} from "../UserFunctions/UserFunctions";
import AdminNav from "../Admin/AdminNav";
import Footer from "../../Others/Footer";
import Services from "../../Others/Services";
import Aux from "../../hoc/Auxiliary";
import Auth from "../../Authentication/Auth";
import "./showAuthor.css";
export default class ShowAuthors extends React.Component {
  state = {
    authors: [],
    message: "",
    editId: "",
    name: "",
    emailId: "",
    contactNo: "",
    address: "",
    showEdit: false,
  };
  componentDidMount() {
    getAuthors()
      .then((res) => {
        if (res.message === true) {
          this.setState({ authors: res.authors });
        } else {
          alert(res.message);
        }
      })
      .catch((err) => {
        if (err) alert("404 error");
      });
  }
  constructor(props) {
    super(props);
    this.auth = new Auth(this.props.history);
  }
  logoutHandler = () => {
    this.auth.adminLogout();
  };
  deleteHandler = (id) => {
    deleteAuthor(id)
      .then((res) => {
        if (res.message === true) {
          alert("Deleted Successfully");
          window.location.reload();
        } else {
          alert(res.message);
        }
      })
      .catch((err) => {
        if (err) alert("404 error");
      });
  };
  editHandler = (author) => {
    console.log("EDIT CLICKED", author);
    this.setState({
      editId: author._id,
      name: author.name,
      emailId: author.emailId,
      contactNo: author.contactNo,
      address: author.address,
      showEdit: true,
    });
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  updateHandler = (event) => {
    event.preventDefault();
    console.log("UPDATE SUBMIT");

    const payload = {
      name: this.state.name,
      emailId: this.state.emailId,
      contactNo: this.state.contactNo,
      address: this.state.address,
    };

    updateAuthor(this.state.editId, payload)
      .then((res) => {
        if (res.message === true) {
          alert("Updated Successfully");
          window.location.reload();
        } else {
          alert(res.message);
        }
      })
      .catch(() => {
        alert("404 error");
      });
  };
  render() {
    return (
      <Aux>
        <div className="container-fluid">
          <AdminNav logoutHandler={this.logoutHandler} />
        </div>
        <div className="container">
          <div className="jumbotron w-75  mt-4 mb-4 border-0">
            <h1 style={{ fontSize: "25px" }}>List of Authors</h1>
            <table className="table showAuthors">
              {this.state.authors.length > 0 && (
                <Aux>
                  <thead>
                    <tr>
                      <th scope="col">id</th>
                      <th scope="col">Name</th>
                      <th scope="col">Email</th>
                      <th scope="col">ContactNo</th>
                      <th scope="col">Address</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.authors.map((author) => {
                      return (
                        <tr>
                          <td>{author._id}</td>
                          <td>{author.name}</td>
                          <td>{author.emailId}</td>
                          <td>{author.contactNo}</td>
                          <td>{author.address}</td>
                          <td>
                            <i
                              type="button"
                              className="fa fa-pencil text-danger fa-3x mx-2"
                              aria-hidden="true"
                              data-toggle="modal"
                              data-target="#editAuthorModal"
                              style={{
                                margin: "0px",
                                fontSize: "15px",
                              }}
                              onClick={() => this.editHandler(author)}
                            ></i>{" "}
                            <i
                              type="button"
                              className="fa fa-trash text-danger"
                              aria-hidden="true"
                              style={{
                                margin: "0px",
                                padding: "0px",
                                fontSize: "15px",
                              }}
                              onClick={() => this.deleteHandler(author._id)}
                            ></i>{" "}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Aux>
              )}
            </table>
            <div
              className="modal"
              id="editAuthorModal"
              tabIndex="-1"
              role="dialog"
              aria-labelledby="editAuthorModal"
              aria-hidden="true"
              style={{ paddingRight: "0px !important", overflow: "inherit" }}
            >
              <div
                className="modal-dialog modal-dialog-centered"
                role="document"
              >
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Edit Author</h5>
                    <button
                      type="button"
                      className="close"
                      data-dismiss="modal"
                      aria-label="Close"
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>

                  <form onSubmit={this.updateHandler}>
                    <div className="modal-body">
                      <div className="form-group">
                        <label className="float-left">Name:</label>
                        <input
                          type="text"
                          className="form-control"
                          name="name"
                          value={this.state.name}
                          onChange={this.handleChange}
                          required
                        />
                      </div>

                      <div className="form-group">
                        <label className="float-left">Email:</label>
                        <input
                          type="text"
                          className="form-control"
                          name="emailId"
                          value={this.state.emailId}
                          onChange={this.handleChange}
                          required
                        />
                      </div>

                      <div className="form-group">
                        <label className="float-left">Contact No:</label>
                        <input
                          type="text"
                          className="form-control"
                          name="contactNo"
                          value={this.state.contactNo}
                          onChange={this.handleChange}
                          required
                        />
                      </div>

                      <div className="form-group">
                        <label className="float-left">Address:</label>
                        <input
                          type="text"
                          className="form-control"
                          name="address"
                          value={this.state.address}
                          onChange={this.handleChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="modal-footer">
                      <button type="submit" className="btn btn-success">
                        Update Author
                      </button>
                      <button
                        type="button"
                        className="btn btn-secondary"
                        data-dismiss="modal"
                      >
                        Close
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container-fluid">
          <Services />
          <Footer />
        </div>
      </Aux>
    );
  }
}
