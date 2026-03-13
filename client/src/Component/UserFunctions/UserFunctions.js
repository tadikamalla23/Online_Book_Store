import Axios from 'axios';
const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:4000";
export const search=(item)=>{
   return Axios.get(`${API_BASE_URL}/book/search/${item}`).then((itemList)=>{
            return itemList.data;
    }).catch((err)=>{return {message:err.message}});
}

export const getCartItems=(userName)=>{
   return Axios.get(`${API_BASE_URL}/cart/getCartItems?userName=${userName}`).then((res)=>{
        return res.data;
    }).catch((err)=>{return {message:err.message}});
}
export const decrement=(id,userName)=>{
    return Axios.post(`${API_BASE_URL}/cart/dec?id=${id}&userName=${userName}`).then((res)=>{
        return res.data;
    }).catch((err)=>{return {message:err.message}});
}

export const increment=(id,userName)=>{
    return Axios.post(`${API_BASE_URL}/cart/inc?id=${id}&userName=${userName}`).then((res)=>{  
        return res.data;
    }).catch((err)=>{return {message:err.message}});
}

export const deleteBook=(id,userName)=>{
   return Axios.post(`${API_BASE_URL}/cart/deleteBook?id=${id}&userName=${userName}`).then((res)=>{
        return res.data;  
    }).catch((err)=>{return {message:err.message}});
}
export const placeOrder=(orderItems)=>{
    return Axios.post(`${API_BASE_URL}/order/placeOrder`,orderItems).then((res)=>{
         return res.data;  
     }).catch((err)=>{return {message:err.message}});
 }
 export const orders=(userName)=>{
    return Axios.get(`${API_BASE_URL}/order/orderedItems?userName=${userName}`).then((res)=>{
         return res.data;  
     }).catch((err)=>{return {message:err.message}});
 }
export const getCategories=()=>{
    return Axios.get(`${API_BASE_URL}/book/getCategories`).then((res)=>{
        return res.data;
    }).catch((err)=>{return {message:err.message}});
}
export const getAuthors=()=>{
    return Axios.get(`${API_BASE_URL}/book/getAuthors`).then((res)=>{
        return res.data;
    }).catch((err)=>{return {message:err.message}});
}
export const getBookByCategory=(category)=>{
    return Axios.get(`${API_BASE_URL}/book/getBookByCategory/${category}`).then((res)=>{
        return res.data;
    }).catch((err)=>{return {message:err.message}});
}
export const getBookByAuthor=(author)=>{
    return Axios.get(`${API_BASE_URL}/book/getBookByAuthor/${author}`).then((res)=>{
        return res.data;
    }).catch((err)=>{return {message:err.message}});
}

export const deleteCategory=(id)=>{
    return Axios.post(`${API_BASE_URL}/book/deleteCategory/${id}`).then((res)=>{
        return res.data;
    }).catch((err)=>{return {message:err.message}});
}
export const deleteAuthor=(id)=>{
    return Axios.post(`${API_BASE_URL}/book/deleteAuthor/${id}`).then((res)=>{
        return res.data;
    }).catch((err)=>{return {message:err.message}});
}

export const addBook=(book)=>{
    return Axios.post(`${API_BASE_URL}/book/addBook/`,book).then((res)=>{
        return res.data;
    }).catch((err)=>{return {message:err.message}});
}

export const getBooks=()=>{
    return Axios.get(`${API_BASE_URL}/book/getBooks`).then((res)=>{
        return res.data;
    }).catch((err)=>{return {message:err.message}});
}

export const deleteBookById=(id)=>{
    return Axios.post(`${API_BASE_URL}/book/deleteBook/${id}`).then((res)=>{
        return res.data;
    }).catch((err)=>{return {message:err.message}});
}

export const getBookById=(id)=>{
    return Axios.get(`${API_BASE_URL}/book/getBookById/${id}`).then((res)=>{
        return res.data;
    }).catch((err)=>{return {message:err.message}});
}