import React from 'react';
import AdminNav from '../Admin/AdminNav';
import Footer from '../../Others/Footer';
import Services from '../../Others/Services';
import Aux from '../../hoc/Auxiliary';
import {deleteBookById,getBooks} from '../UserFunctions/UserFunctions';
import './ViewBook.css';
import Auth from '../../Authentication/Auth';
export default class ViewBooks extends React.Component{
    state={books:[],message:''};
    constructor(props){
        super(props);
        this.auth=new Auth(this.props.history);
      }
      logoutHandler=()=>{
        this.auth.adminLogout();
      }
    componentDidMount(){
        getBooks().then((res)=>{
            if(res.message===true){
                this.setState({books:res.books});
            }else{
                alert(res.message);
            }
        }).catch(err=>{if(err) alert("404 error")});
    }
    deleteHandler=(id)=>{
        deleteBookById(id).then((res)=>{
            if(res.message===true){
                alert("Deleted Successfully");
                window.location.reload();
            }else{
               alert(res.message);
            }
        }).catch(err=>{if(err) alert("404 error")});
    }
    render(){
        return(
            <Aux>
                <div className="container-fluid">
                    <AdminNav logoutHandler={this.logoutHandler}/>
                </div>
                <div className="container">
                    <div className="jumbotron w-75  mt-4 mb-4 border-0">
                    <h1 style={{fontSize:"25px"}}>List of Books</h1>
                    <table className="table showCategories">
                    {this.state.books.length>0 &&
                        <Aux> 
                        <thead>
                        <tr>
                        <th scope="col">BookName</th>
                        <th scope="col">Category</th>
                        <th scope="col">Author</th>
                        <th scope="col">Price</th>
                        <th scope="col">Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.books.map((book)=>{
                            return(
                                <tr>
                                    <td >{book.bookName}</td>
                                    <td>{book.category}</td>
                                    <td>{book.author}</td>
                                    <td>{book.price}</td>
                                    <td><i type="button" className="fa fa-trash text-danger" aria-hidden="true" style={{margin:"0px", fontSize:"15px"}} onClick={()=>this.deleteHandler(book._id)}></i> </td>
                                </tr>
                            )
                        })}
                        </tbody>
                        </Aux>
                    }
                     </table>
                     </div>       
                </div>
                <div className="container-fluid">
                    <Services/>
                    <Footer/>
                </div>
            </Aux>
        );
    }
} 