import React, { useState } from 'react';
import './login.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import Model from '../UI/Model';

const Login = () => {
    const [formData, setFormData] = useState({ UserName: "", UserPassword: "" });
    const [errorMessage, setErrorMessage] = useState("");
    const [localerrormsg,setLocalerrormsg] = useState("");
    const [show,setShow] = useState(false)
    const navigate = useNavigate();

    const onChangeHandler = (fieldName, value) => {
        setFormData(prevState => ({ ...prevState, [fieldName]: value }));
    }
    const submitHandler = async (e) => {
        e.preventDefault();
        if(formData.UserName === "admin" && formData.UserPassword ==="1234"){
            localStorage.setItem("UserInfo",formData.UserName)
            navigate("/");
            window.location.reload()
        }
        if(formData.UserName !== "" && formData.UserPassword !==""){
            try {
                const res = await axios.post("https://onlinetestapi.gerasim.in/api/Ecomm/Login", formData);
                // console.log(res);
                if (res.data.data !== null) {
                    setErrorMessage("");
                    localStorage.setItem("UserInfo", JSON.stringify(res.data.data));
                    alert(res.data.message);
                    navigate("/");
                    window.location.reload()
                } else {
                    setErrorMessage(res.data.message)
                    setShow(true);
                }
            } catch (error) {
    
            }

        }else{
            if(formData.UserName === ""){
                setLocalerrormsg("Please enter user name")
            }
            if(formData.UserPassword === ""){
                setLocalerrormsg("Please enter paasword")
            }

        }
        
    }
    const hideModal = ()=>{
        setShow(false);
    }
    
    return (
        <section className="h-100 gradient-form" style={{ backgroundColor: "#eee" }}>
            <Model title="Login" content={errorMessage} show={show} hideModal={hideModal} ></Model>
            <div className="container py-4 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-xl-10">
                        <div className="card rounded-3 text-black">
                            <div className="row g-0">
                                <div className="col-lg-6">
                                    <div className="card-body p-md-5 mx-md-4">
                                        <div className="text-center">
                                            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
                                                style={{ width: "185px" }} alt="logo" />
                                            <h4 className="mt-1 mb-5 pb-1">Ecom</h4>
                                        </div>

                                        <form onSubmit={(e) => submitHandler(e)}>
                                            <p>Please login to your account</p>

                                            <div className="form-outline mb-4">
                                                <input type="text" value={formData.UserName} onChange={(e) => onChangeHandler("UserName", e.target.value)} className="form-control" placeholder="Phone number or email address" />
                                                <label className="form-label" >Username</label>
                                            </div>

                                            <div className="form-outline mb-4">
                                                <input type="password" value={formData.UserPassword} onChange={(e) => onChangeHandler("UserPassword", e.target.value)} className="form-control" placeholder='enter password' />
                                                <label className="form-label">Password</label>
                                            </div>
                                            <div className="mb-3">
                                                <div>{localerrormsg}</div>
                                            </div>

                                            <div className="text-center pt-1 mb-5 pb-1">
                                                <button type='submit' className="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3">Log in</button>
                                            </div>
                                        </form>
 
                                    </div>
                                </div>
                                <div className="col-lg-6 d-flex align-items-center gradient-custom-2">
                                    <div className="text-white px-3 py-4 p-md-5 mx-md-4">
                                        <h4 className="mb-4">We are more than just a company</h4>
                                        <p className="small mb-0">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                                            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                                            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Login;