import React , {useEffect} from 'react'
import {createOrder} from "../api"
import axios from "axios"
import { useNavigate } from 'react-router-dom'

const Payment = () => {
  const navigate = useNavigate();

    const loadScript = (src) => {

        return new Promise((resolve) => {
  
          const script = document.createElement('script');
          script.src = src;
          script.onload = () => {
            resolve(true);
          }
          script.onerror = () => {
            resolve(false);
          }
          document.body.appendChild(script);
  
        })
  
    }



    const onPayment = async() => {
    

        //create Order
        try{
            
          const res = await createOrder();
          const data = res.data;
          console.log(data);
          
          const paymentObject = new (window).Razorpay({
    
            key: import.meta.VITE_RAZORPAY_KEY,
            order_id: data.id,
            amount: data.amount,
            ...data,
            //now below handler will get called once the payment is successsfull
            handler: function(response){
              console.log(response);
    
              const options2 = {
                order_id : response.razorpay_order_id,
                payment_id : response.razorpay_payment_id,
                signature : response.razorpay_signature
              }
    
              axios.post('http://localhost:4000/api/v1/payment/verifyPayment' , options2)
              .then((res) => {
                console.log(res.data);
    
                if(res.data.success){
                  alert('Payment Successfull');
                  localStorage.setItem('token' , res.data.token);
                  localStorage.clear();
                  navigate('/login')
                }
                else{
                  alert('Payment Failed');
                }
    
              })
              .catch((err) => {
                console.log(err);
              })
    
            }
    
          })
    
          paymentObject.open();
    
        }catch(err){
          console.log(err);
          
        }
    
      }
    
      useEffect(() => {

        loadScript('https://checkout.razorpay.com/v1/checkout.js');
    
      },[]);

  return (
    <div>
        Payment

        <h3>Upgrade Plan To Premium and Enjoy Video Uploading Feature</h3>
        <button onClick={() => onPayment()}>Upgrade Now</button>

    </div>

  )
}

export default Payment