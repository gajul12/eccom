import React, { useState } from 'react';
import './home.css'

const Dashboard = () => {
    const [activeItem, setActiveItem] = useState({
        cauroselImagesUrls: [
            "https://m.media-amazon.com/images/I/61-yhe06tyL._SX679_.jpg",
            "https://m.media-amazon.com/images/I/41IcuNkyrdL._SX300_SY300_QL70_FMwebp_.jpg",
            "https://m.media-amazon.com/images/I/31VM4MszXiL._SX300_SY300_QL70_FMwebp_.jpg",
            "https://rukminim2.flixcart.com/image/416/416/xif0q/television/z/w/r/-original-imagnrjvfnwkq8bg.jpeg?q=70",
            "https://rukminim2.flixcart.com/image/416/416/ks0onm80/monitor/w/6/6/ha270-um-hw0si-a01-acer-original-imag5zjnk4yad4uz.jpeg?q=70"
        ],
        activeno: 0
    })

    const setnextItem = () => {
        const limit = activeItem.cauroselImagesUrls.length - 1;
        setActiveItem(prevState => ({ ...prevState, activeno: prevState.activeno === limit ? 0 : prevState.activeno + 1 }));
        console.log(activeItem.activeno)
    }
    const setPreviousItem =()=>{
        const limit = activeItem.cauroselImagesUrls.length + 1;
        setActiveItem(prevState => ({ ...prevState, activeno: prevState.activeno === 0 ? 0 : prevState.activeno - 1 }));
        console.log(activeItem.activeno)
    }
    return (
        <div>
            <div className='container border mt-3 shadow p-3 mb-5 bg-white rounded' style={{ height: "100vh" }}>
                <div id="carouselExampleControls" className="carousel slide" data-ride="carousel">
                    <div className="carousel-inner text-center imgcss">
                        {
                            activeItem.cauroselImagesUrls.map((items, index) => {
                                return (
                                    <div className={activeItem.activeno === index ? "carousel-item active" : "carousel-item"}>
                                        <img className="d-block mx-auto " style={{ height: "300px", objectFit: "contain" }} src={items} alt="First slide" />
                                    </div>
                                )
                            })
                        }
                    </div>
                    <p className="carousel-control-prev" >
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="sr-only " style={{ color: 'red', translate: "10px 291px" }} onClick={() => setPreviousItem()}>Previous</span>
                    </p>
                    <p className="carousel-control-next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="sr-only " style={{ color: 'red', translate: "10px 291px" }} onClick={() => setnextItem()} >Next</span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;