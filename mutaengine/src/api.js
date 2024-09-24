import axios from 'axios'

const api = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL
})

export const googleAuth = (code) => {

    return api.get(`auth/google-login?code=${code}`);

}

export const sendOTP = (email) => {

    
    return api.post(`auth/sendotp`,{
        email: email
    });

}

export const signUp = (props) => {

    console.log(props);
    
    return api.post(`auth/signup`,props);

}

export const login = (props) => {
console.log(props);
return api.post('auth/login', props)
}

export const imgUpload = (props) => {

  
    return api.post(`media/imageUpload`,props, {
        headers:{
            "Content-Type":'multipart/form-data'
        }
    });

}

export const vidUpload = (props) => {

  
    return api.post(`media/videoUpload`,props, {
        headers:{
            "Content-Type":'multipart/form-data'
        }
    });

}

export const getMedia = () => {
   
    return api.get('media/all',{
        headers:{
            "Authorization" : `Bearer ${localStorage.getItem('token')}`
        }
    }) ;
}

export const delelteImage = (id) => {
    return api.delete(`media/image-delete/${id}`,{
        headers:{
            "Authorization" : `Bearer ${localStorage.getItem('token')}`
        }
    }) ;
}

export const delelteVideo = (id) => {
    return api.delete(`media/video-delete/${id}`,{
        headers:{
            "Authorization" : `Bearer ${localStorage.getItem('token')}`
        }
    }) ;
}

export const createOrder = () => {
    return api.post(`payment/createOrder`,{} , {
        headers:{
            "Authorization" : `Bearer ${localStorage.getItem('token')}`
        }
    }) ;
}

export const passwordForgot = (email) => {
    return api.post(`auth/reset-password-token` , {email}) ;
}

export const resetPassword = (prop) => {
    return api.post(`auth/reset-password` , prop) ;
}

