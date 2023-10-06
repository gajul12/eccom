import React, { useState } from 'react';
import './Signup.css';
import { Link } from 'react-router-dom';
import Inputui from '../UI/Inputui';
import axios from 'axios';
import Model from '../UI/Model';

const Signup = () => {
    const [signupdata,setSignupdata] = useState({Name:"",MobileNo:"",Password:""})
    const [error,setError] = useState([]);
    const [respMessage,setRespMessage] = useState("");
    const [show,setShow] = useState(false);
    const onChangeHandler =(fieldName,value)=>{
        console.log(fieldName,value)
        setSignupdata(prevState=>({...prevState,[fieldName]:value}))
    }
    const onSubmitHandler= async(e)=>{
       e.preventDefault()
       console.log(signupdata);
       let localError = [];
       for(let x in signupdata){
            if(signupdata[x] === ""){
                localError.push(x)
            }
       }
       setError(localError);

       if(localError.length === 0){
        
        try {
            let result = await axios.post("https://onlinetestapi.gerasim.in/api/Ecomm/RegisterCustomer",signupdata);
            console.log(result.data.data);
            setRespMessage(result.data.message);
            setShow(true);
            setSignupdata({Name:" ",MobileNo:"",Password:""});
            
        } catch (error) {
            console.log(error);
        }
       }else{
        alert(localError)
       }
    }
    const handleError = (fieldName) =>{
        return error.indexOf(fieldName) > -1 ? true : false ;
       }

       const hideModal = ()=>{
        setShow(false);
    }
    
    return (
        <div>
            <section className="bg-image bgimage">
            <Model title="Sign Up" content={respMessage} show={show} hideModal={hideModal} ></Model>
                <div className="mask d-flex align-items-center h-100 gradient-custom-3">
                    <div className="container h-100">
                        <div className="row d-flex justify-content-center align-items-center h-100">
                            <div className="col-12 col-md-9 col-lg-7 col-xl-6 mt-2">
                                <div className="card" style={{borderRadius: "15px"}}>
                                    <div className="card-body p-5">
                                        <h2 className="text-uppercase text-center mb-5">Create an account</h2>
                                        <form onSubmit={(e)=>onSubmitHandler(e)}>

                                            <div className="form-outline mb-4">
                                                <Inputui type="text" placeholder="name"  value={signupdata.Name} fieldName="Name" onChangeHandler={onChangeHandler} error={handleError("Name")}></Inputui>
                                                <label className="form-label" for="form3Example1cg">Your Name</label>
                                            </div>
                                            <div className="form-outline mb-4">
                                            <Inputui type="text" placeholder="mobile" value={signupdata.MobileNo} fieldName="MobileNo" onChangeHandler={onChangeHandler} error={handleError("MobileNo")}></Inputui>
                                                <label className="form-label" for="form3Example4cg">Password</label>
                                            </div>
                                            <div className="form-outline mb-4">
                                            <Inputui type="password" placeholder="password" value={signupdata.Password} fieldName="Password" onChangeHandler={onChangeHandler} error={handleError("Password")}></Inputui>
                                                <label className="form-label" for="form3Example4cg">Password</label>
                                            </div>
                                            {/* <div className="form-check d-flex justify-content-center mb-5">
                                                <input className="form-check-input me-2" type="checkbox" value="" id="form2Example3cg" />
                                                <label className="form-check-label" for="form2Example3g">
                                                    I agree all statements in <a href="#!" className="text-body"><u>Terms of service</u></a>
                                                </label>
                                            </div> */}

                                            <div className="d-flex justify-content-center">
                                                <button type="submit" className="btn btn-success btn-block btn-lg gradient-custom-4 text-body">Register</button>
                                            </div>

                                            <p className="text-center text-muted mt-5 mb-0">Have already an account? <Link href="/login"className="fw-bold text-body"><u>Login here</u></Link></p>

                                        </form>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Signup;