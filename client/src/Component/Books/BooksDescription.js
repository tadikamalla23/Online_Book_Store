import React from "react";
import {
  getBookById,
  getBookByCategory,
  getBookByAuthor,
  search,
  addToCart,
} from "../UserFunctions/UserFunctions.js";
import Aux from "../../hoc/Auxiliary";
import Auth from "../../Authentication/Auth";
import Footer from "../../Others/Footer";
import Services from "../../Others/Services";
import LeftNavbar from "../Navbar/LeftNavbar";
import Navbar from "../Navbar/Navbar";
import Books from "../Books/Books";
export default class BookDescription extends React.Component {
  state = {
    searchItem: "",
    books: [],
    display: true,
    result: [],
    message: "",
    displaySearch: true,
    count: 0,
    bookById: {},
  };
  constructor(props) {
    super(props);
    this.auth = new Auth(this.props.history);
  }
  logoutHandler = () => {
    this.setState({ count: 0 });
  };
  resetHandler = () => {
    this.setState({ result: [], message: "" });
  };
  changeHandler = (event) => {
    event.preventDefault();
    this.setState({ searchItem: event.target.value });
  };

  addToCartHandler = (id) => {
    addToCart(id, this.auth.getUserName()).then((res) => {
      if (res.message === true) {
        this.props.history.push(`/shoppingcart`);
      } else {
        this.setState({
          message: `Unable to add to cart please try again later`,
        });
        alert(this.state.message);
      }
    });
  };

  getSearchResult = (event) => {
    event.preventDefault();
    this.resetHandler();
    this.setState({ display: false });
    search(this.state.searchItem)
      .then((searchResult) => {
        if (searchResult.length > 0) {
          this.setState({ result: searchResult });
        } else {
          this.setState({
            message: `No book found with ${this.state.searchItem} name`,
          });
        }
      })
      .catch((err) => {
        this.setState({ message: "404 error" });
      });
  };
  getBooksByCategory = async (category) => {
    this.resetHandler();
    await this.setState({ display: false });
    getBookByCategory(category)
      .then((res) => {
        console.log(res);
        if (res.message === true) {
          this.setState({ result: res.books });
        } else {
          this.setState({ message: res.message });
        }
      })
      .catch((err) => this.setState({ message: "404 Error" }));
  };
  getBooksByAuthor = async (author) => {
    this.resetHandler();
    await this.setState({ display: false });
    getBookByAuthor(author)
      .then((res) => {
        if (res.message === true) {
          this.setState({ result: res.books });
        } else {
          this.setState({ message: res.message });
        }
      })
      .catch((err) => this.setState({ message: "404 Error" }));
  };
  componentDidMount() {
    getBookById(this.props.match.params.id)
      .then((res) => {
        if (res.message === true) {
          this.setState({ bookById: res.book });
        } else {
          this.setState({ message: res.message });
        }
      })
      .catch((err) => this.setState({ message: err.message }));
  }

  render() {
    return (
      <Aux>
        <div className="container-fluid">
          <Navbar
            {...this.props}
            display={this.state.displaySearch}
            logout={() => {
              this.logoutHandler();
            }}
            search={(e) => this.changeHandler(e)}
            click={(e) => this.getSearchResult(e)}
            userName={this.auth.getUserName()}
            count={this.state.count}
          />
        </div>
        <div className="container">
          <div className="row">
            <div className=" col-lg-2 col-md-3 col-sm-4 bg-white ml-lg-2 ml-md-0">
              <LeftNavbar
                getBookByCategory={this.getBooksByCategory}
                getBookByAuthor={this.getBooksByAuthor}
              />
            </div>
            <div className="col-lg-9 col-md-8 col-sm-7 ">
              {this.state.display && (
                <div className="d-flex justify-content-between align-items-top">
                  <img
                    src={this.state.bookById.imageURL}
                    alt="..."
                    width="350px"
                    height="400px"
                  />
                  <div className="p-3">
                    <h4>{this.state.bookById.bookName}</h4>
                    <hr></hr>
                    <p>Category:{this.state.bookById.category}</p>
                    <p>Author:{this.state.bookById.auhtor}</p>
                    <p>Price:{this.state.bookById.price}</p>
                    <p>PublishedDate:{this.state.bookById.publishedDate}</p>
                    <hr></hr>
                    <h5>About Item:</h5>
                    <p>{this.state.bookById.description}</p>
                    <div className="d-flex">
                      <button
                        className="btn btn-danger mr-2"
                        onClick={() =>
                          this.addToCartHandler(this.state.bookById._id)
                        }
                      >
                        Add to cart
                      </button>
                      <button
                        className="btn btn-success mr-2"
                        onClick={() =>
                          this.addToCartHandler(this.state.bookById._id)
                        }
                      >
                        Buy Now
                      </button>
                    </div>
                  </div>
                </div>
              )}
              <Books
                {...this.props}
                books={this.state.books}
                searchResult={this.state.result}
                message={this.state.message}
                display={this.state.display}
                addToCart={this.addToCartHandler}
              />
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
