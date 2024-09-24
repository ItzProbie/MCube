import React, { useEffect, useState } from 'react'
import { imgUpload, vidUpload, getMedia, delelteImage, delelteVideo} from '../api';
import { Link , useNavigate } from 'react-router-dom';

const UserPage = () => {

    const token = localStorage.getItem('token');
    const [image, setImage] = useState(null);
    const [media , setMedia] = useState(null);
    const [flag,setFlag] = useState(false)
    const [userName , setUserName] = useState('');
    const navigate = useNavigate()

    const handleImageUpload = async() => {
        // console.log(image)
            if(image){
                    const formData = new FormData();
                    formData.append('name', image.name); 
                    formData.append('token',token) // Add username if needed
                    formData.append('imageFile', image);  

                    const res = await imgUpload(formData);
                    console.log(res);
                    setFlag(prevFlag => !prevFlag)
                    alert("Image Uploaded Successfully");
            }
        
    }

    const handleVideoUpload = async() => {
        console.log(image)
            if(image){
                    const formData = new FormData();
                    formData.append('name', image.name); 
                    formData.append('token',token) // Add username if needed
                    formData.append('videoFile', image);  

                    const res = await vidUpload(formData);
                    console.log(res);
                    setFlag(prevFlag => !prevFlag)
                    alert("Video Uploaded Successfully")
            }
        
    }

    const getData = async()=>{
        try {

            const data = await getMedia();
            
            localStorage.setItem('media-data', JSON.stringify(data?.data?.user.media));
            setUserName(data.data.user.name)
            setMedia(data?.data?.user?.media);

        } catch (error) {
            console.error("Error fetching media data: ", error);
        }
    }

    const logoutHandler = async() => {

        localStorage.clear();
        navigate('/login');

    }

    const accType = localStorage.getItem('accountType');

    useEffect(() => {
        console.log("useEffect triggered");
        getData();
    }, [flag]);
    

    const handleDelete = async(id , type)=> {
        const res = (type === 'Image') ? (await delelteImage(id)) : (await delelteVideo(id));
        console.log(res)
        setFlag(prev=>!prev)
        alert("File deleted Successfully");
    }

  return (
    <div>
        Hello<br/>
        {
            (accType === 'Basic') && <Link to='/payment'>
                    Upgrade Plan
            </Link>
        }

        <h2>{userName} - {accType ? accType : ""}</h2>
        <div>
            <input type="file" accept='*' onChange={(e)=>setImage(e.target.files[0])}/>
            <button onClick={handleImageUpload}>Upload Image</button>
            <button onClick={handleVideoUpload}>Upload Video</button>
            <button onClick={logoutHandler}>Logout</button>
            {
                media && media.map((item)=>{
                     return (
                        <div key={Math.random().toString(36)}>
                            <p>{item.name}</p>
                            <a href={item.publicAcessUrl} >Link</a>
                            <p>{item.fileSize}</p>
                            <p>{item.fileType}</p>
                            <p>{Math.floor(item.size/1024)} kb</p>
                            <button onClick={()=>handleDelete(item._id , item.fileType)}>Delete</button>
                        </div>
                     )
                })
            }
        </div>
    </div>
  )
}

export default UserPage