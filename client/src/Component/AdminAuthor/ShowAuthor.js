import React from 'react';
import {getAuthors,deleteAuthor} from '../UserFunctions/UserFunctions';
import AdminNav from '../Admin/AdminNav';
import Footer from '../../Others/Footer';
import Services from '../../Others/Services';
import Aux from '../../hoc/Auxiliary';
import Auth from '../../Authentication/Auth';
import './showAuthor.css';
export default class ShowAuthors extends React.Component{
    state={authors:[],message:''};
    componentDidMount(){
        getAuthors().then((res)=>{
            if(res.message===true){
                this.setState({authors:res.authors});
            }else{
                alert(res.message);
            }
        }).catch(err=>{if(err) alert("404 error")});
    }
    constructor(props){
        super(props);
        this.auth=new Auth(this.props.history);
      }
      logoutHandler=()=>{
        this.auth.adminLogout();
      }
    deleteHandler=(id)=>{
        deleteAuthor(id).then((res)=>{
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
                    <h1 style={{fontSize:"25px"}}>List of Authors</h1>
                    <table className="table showAuthors">
                    {this.state.authors.length>0 &&
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
                        {this.state.authors.map((author)=>{
                            return(
                                <tr>
                                    <td >{author._id}</td>
                                    <td>{author.name}</td>
                                    <td>{author.emailId}</td>
                                    <td>{author.contactNo}</td>
                                    <td>{author.address}</td>
                                    <td><i type="button" className="fa fa-trash text-danger" aria-hidden="true" style={{margin:"0px", fontSize:"15px"}} onClick={()=>this.deleteHandler(author._id)}></i> </td>
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