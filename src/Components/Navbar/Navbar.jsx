import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import'./navbar.css'
import { AppContext } from '../../App';

const Navbar = () => {
    // const [flag,setFlag] = useState(false);
    const navigate = useNavigate();
    const contextdata = useContext(AppContext)
     console.log(contextdata);
    const [navData, setNavData] = useState([]);
    const [flag, setFlag] = useState(false)
    const [show, setShow] = useState(false);
    const [cshow, setCshow] = useState(false);
    useEffect(() => {
        const loginDetails = localStorage.getItem("UserInfo");
        if (loginDetails !== null && loginDetails !== "admin") {
            setFlag(true)
            setCshow(true)
        }
        if (loginDetails === "admin") {
            setShow(true)
            setFlag(true)
        }

        const getApicall = async () => {
            const res = await axios.get("https://onlinetestapi.gerasim.in/api/Ecomm/GetAllCategory")
            console.log(res.data);
            setNavData(res.data.data);
            console.log(navData.length)
        }
        getApicall();
    },[]);

    const Logout = () => {
        navigate("/")
        localStorage.clear();
        window.location.reload();
    }

    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/">Ecom</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            {navData?.length && navData.map((item,index) => {
                                if (item.categoryName !== 'string' && index <= 7)
                                    return (
                                        <li className="nav-item active">
                                            <Link className="nav-link active" aria-current="page" to={item.categoryName.toLowerCase()}>{item.categoryName}</Link>
                                        </li>
                                    )
                            })}
                            {show && <li className="nav-item active">
                                <Link className="nav-link active" aria-current="page" to="/addproduct">Add Product</Link>
                            </li>}
                            {cshow && <li className="nav-item active cart ">
                                {/* <div className="cart"> */}
                                    <span class="count">{contextdata.cartdata.length}</span>
                                    <Link className="nav-link active" aria-current="page" to='/cart'> <FontAwesomeIcon icon={faCartShopping} className='pt-2'/></Link>
                                {/* </div> */}
                            </li>}

                            {/* <li className="nav-item dropdown">
                                <a className={flag ? "nav-link dropdown-toggle show": "nav-link dropdown-toggle"} onClick={()=>setFlag(!flag)} href="#" role="button" data-bs-toggle="dropdown" aria-expanded={flag ? "true" :"false"}>
                                    Dropdown
                                </a>
                                <ul className={flag ? "dropdown-menu show": "dropdown-menu"}>
                                    <li><a className="dropdown-item" href="#">Action</a></li>
                                    <li><a className="dropdown-item" href="#">Another action</a></li>
                                    <li><a className="dropdown-item" href="#">Something else here</a></li>
                                </ul>
                            </li> */}
                        </ul>
                        <form className="d-flex" role="search">

                            {!flag && <> <Link to='/login'><button className="btn btn-outline-success me-2" type="button">Login</button></Link>
                                <Link to='/signup'> <button className="btn btn-outline-success me-2" type="button">Sign Up</button></Link>   </>}
                            {flag && <><button type='button' className='btn btn-outline-success me-2' onClick={() => Logout()}>Logout</button></>}
                        </form>
                    </div>
                </div>
            </nav>

        </div>
    );
};

export default Navbar;