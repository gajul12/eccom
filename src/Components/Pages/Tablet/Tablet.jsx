import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom';
import Spinner from '../UI/Spinner';

const Tablet = () => {
    const [mobileData, setMobileData] = useState([]);
    const [loading, setLoading] = useState([true]);
    useEffect(() => {

        const getMobileData = async () => {
            try {
                const res = await axios.get('https://onlinetestapi.gerasim.in/api/Ecomm/GetAllProductsByCategoryId', { params: { id: 3 } })
                console.log(res);
                setLoading(false);
                setMobileData(res?.data?.data);

            } catch (error) {
                console.log(error)
            }
        }
        getMobileData();

    }, [])
    return (
        <div>
            <h1>Mobile</h1>
            <div className="container">
                <div className="row">
                    <div className="col-4 offset-4 px-3 py-3">
                    {loading && <Spinner></Spinner>}
                    </div>
                </div>
                <div className="row">
                    {
                        mobileData?.length > 0 && mobileData.map((item) => {
                            return (
                                <div className="col-4">
                                    <div className="card m-2 " style={{ width: "18rem", height: "200" }}>
                                        <img className="card-img-top pt-2" src={item.productImageUrl} style={{ objectFit: "contain", height: 150 }} alt="Card  cap" width="300" height="300" />
                                        <div className="card-body">
                                            <h5 className="card-title">{item.productShortName}</h5>
                                            <p className="card-text pb-3">{item.productDescription}</p>
                                            {/* <a href="/" className="btn btn-primary position-absolute bottom-0 start-50 translate-middle-x mb-2">Add To Cart</a> */}
                                            <div className='d-flex justify-content-between'>
                                                <p><strong>RS:</strong> {item.productPrice}</p>
                                                <FontAwesomeIcon icon={faCartShopping} className='pt-2' />
                                                <Link to="/detailspage" state={{ cardDetail: item }} >detail{">"}</Link>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    );
};

export default Tablet;