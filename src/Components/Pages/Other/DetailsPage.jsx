import React, { useContext, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'
import './detailsPage.css'
import axios from 'axios';
import { AppContext } from '../../../App';

const DetailsPage = () => {
    let { state } = useLocation();
    const contextfunc = useContext(AppContext);
    const nav = useNavigate();

    // console.log(state.cardDetail);
    const [count, setCount] = useState(1)
    const incNum = () => {
        setCount(Number(count) + 1);
    }
    const decNum = () => {
        count > 1 ? setCount(count - 1) : setCount(1)

    }
    const handleChange = (e) => {
        setCount(e.target.value);
    }
    const addcart = async () => {
        const loginDetails = JSON.parse(localStorage.getItem("UserInfo"));
        // console.log(loginDetails.name)
        // console.log(loginDetails.custId)
        // console.log(cartDetail)
        if (loginDetails !== null) {
            const cartDetail =
            {
                "CustId": loginDetails?.custId,
                "ProductId": state?.cardDetail?.productId,
                "Quantity": count,
                "AddedDate": new Date()
            }
            try {
                let result = await axios.post("http://onlinetestapi.gerasim.in/api/Ecomm/AddToCart", cartDetail);
                console.log(result?.data?.result);
                alert(result?.data?.message)
                if (result?.data?.result === true) {
                    contextfunc.getCartData();
                }
            } catch (error) {
                alert(error)
            }
        } else {
            nav('/login')
        }
    }

    return (
        <div>
            <div>

                <div class="container mt-5 mb-5">
                    <div class="card">
                        <div class="row g-0">
                            <div class="col-md-6 border-end">
                                <div class="d-flex flex-column justify-content-center">
                                    <div class="main_image">
                                        <img src={state?.cardDetail?.productImageUrl} id="sd" alt='ddd' width="350" />
                                    </div>

                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="p-3 right-side">
                                    <div class="d-flex justify-content-between align-items-center">
                                        <h3>{state?.cardDetail?.productName}</h3>
                                        <span class="heart"><i class='bx bx-heart'></i></span>
                                    </div>
                                    <div class="mt-2 pr-3 content">
                                        <p>{state?.cardDetail?.productDescription}</p>
                                    </div>
                                    <h3>${state?.cardDetail?.productPrice}</h3>
                                    <div class="ratings d-flex flex-row align-items-center">

                                        <span>441 reviews</span>
                                    </div>

                                    <div class="buttons d-flex flex-row mt-5 gap-3">
                                        <div class="input-group d-flex flex-row" style={{ width: "20%" }}>
                                            <div class="input-group-prepend">
                                                <button className="btn btn-outline-primary" type="button" onClick={decNum}>-</button>
                                            </div>
                                            {/* <div class="input-group">
                                                <input type="text" class="form-control" style={{width: "1px"}} value={count} onChange={handleChange}/>
                                            </div> */}
                                            <input type="text" className="form-control mt-1 mb-2 text-center" value={count} style={{ height: "30px" }} onChange={handleChange} />
                                            <div class="input-group-prepend">
                                                <button className="btn btn-outline-primary" type="button" onClick={incNum}>+</button>
                                            </div>
                                        </div>
                                        <button class="btn btn-outline-dark">Buy Now</button>
                                        <button class="btn btn-outline-dark" onClick={() => addcart()}>Add to Basket</button>
                                    </div>
                                    {/* <div class="search-option mt-2">
                                        <i class='bx bx-search-alt-2 first-search'></i>
                                        <i class='bx bx-share-alt share'></i>
                                    </div> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailsPage;