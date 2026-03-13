import React from 'react';
import {getCategories} from '../UserFunctions/UserFunctions';
import AdminNav from '../Admin/AdminNav';
import Footer from '../../Others/Footer';
import Services from '../../Others/Services';
import Aux from '../../hoc/Auxiliary';
import {deleteCategory} from '../UserFunctions/UserFunctions';
import './showCategory.css';
import Auth from '../../Authentication/Auth';
export default class ShowCategories extends React.Component{
    state={categories:[],message:''};
    constructor(props){
        super(props);
        this.auth=new Auth(this.props.history);
      }
      logoutHandler=()=>{
        this.auth.adminLogout();
      }
    componentDidMount(){
        getCategories().then((res)=>{
            if(res.message===true){
                this.setState({categories:res.categories});
            }else{
                alert(res.message);
            }
        }).catch(err=>{if(err) alert("404 error")});
    }
    deleteHandler=(id)=>{
        deleteCategory(id).then((res)=>{
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
                    <h1 style={{fontSize:"25px"}}>List of Categories</h1>
                    <table className="table showCategories">
                    {this.state.categories.length>0 &&
                        <Aux> 
                        <thead>
                        <tr>
                        <th scope="col">id</th>
                        <th scope="col">Category</th>
                        <th scope="col">Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.categories.map((category)=>{
                            return(
                                <tr>
                                    <td >{category._id}</td>
                                    <td>{category.name}</td>
                                    <td><i type="button" className="fa fa-trash text-danger" aria-hidden="true" style={{margin:"0px", fontSize:"15px"}} onClick={()=>this.deleteHandler(category._id)}></i> </td>
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