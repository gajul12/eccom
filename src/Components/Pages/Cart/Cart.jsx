import React, { useContext} from 'react';
import './cart.css'
import { AppContext } from '../../../App';
import { Link } from 'react-router-dom';

const Cart = () => {
    const contextArray = useContext(AppContext)
    return (
        <div className="cart-body">
            <div className="card-main">
                <div className="card-top border-bottom text-center">
                    <Link to='/'> Back to shop</Link>
                    <span className='cspan' id="logo"><sup>*</sup>ECOMM<sup>*</sup></span>
                </div>
                <div className="card-bodyp">
                    <div className="crow upper">
                        <span className='cspan'><i class="fa fa-check-circle-o"></i> Shopping bag</span>
                        <span className='cspan'><i class="fa fa-check-circle-o"></i> Order details</span>
                        <span className='cspan' id="payment"><span id="three">3</span>Payment</span>
                    </div>
                    <div className=" row crow">
                        <div className="col-md-7">
                            <div className="left border">
                                <div className="crow">
                                    <span className="header cspan">Payment</span>
                                    <div className="cicons">
                                        <img className='cimg' src="https://logowik.com/content/uploads/images/visa-payment-card1873.jpg" alt='visa' />
                                        <img className='cimg' src="https://www.credit-card-logos.com/images/mastercard_credit-card-logos/mastercard_logo_5.gif" alt='master' />
                                        <img className='cimg' src="https://banner2.cleanpng.com/20181109/lif/kisspng-credit-card-payment-mastercard-logo-5be5fb46d19816.5027498515417987268585.jpg" alt='mastero' />
                                    </div>
                                </div>
                                <form className='cfrom'>
                                    <span className='cspan'>Cardholder's name:</span>
                                    <input className='cinput' placeholder="Linda Williams" />
                                    <span className='cspan'>Card Number:</span>
                                    <input className='cinput' placeholder="0125 6780 4567 9909" />
                                    <div className=" row crow">
                                        <div className="col-4 ccol"><span className='cspan'>Expiry date:</span>
                                            <input className='cinput' placeholder="YY/MM" />
                                        </div>
                                        <div className="col-4 ccol"><span className='cspan'>CVV:</span>
                                            <input className='cinput' id="cvv" />
                                        </div>
                                    </div>
                                    <input className='cinput' type="checkbox" id="save_card" class="align-left" />
                                    <label for="save_card">Save card details to wallet</label>
                                </form>
                            </div>
                        </div>
                        <div class="col-md-5">
                            <div className="right border">
                                <div className="header">Order Summary</div>
                                <p>{contextArray.cartdata?.length} items</p>
                                {
                                    contextArray.cartdata?.length > 0 && contextArray.cartdata.map((item) => {
                                        return (
                                            <div className=" row crow citem">
                                                <div className="col-4 ccol align-self-center"><img class="img-fluid" src={item.productImageUrl} alt='product'/></div>
                                                <div className="col-8 ceigth">
                                                    <div className="crow"><b>$ {item.productPrice}</b></div>
                                                    <div className="crow text-muted">{item.productName}</div>
                                                    <div className="crow">Qty:{item.quantity}</div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                                {/* <div class=" row crow citem">
                                    <div class="col-4 ccol align-self-center"><img class="img-fluid" src="https://i.imgur.com/Ew8NzKr.jpg" /></div>
                                    <div class="col-8 ceigth">
                                        <div class="crow"><b>$ 19.99</b></div>
                                        <div class="crow text-muted">Be Legandary Lipstick-Sheer Navy Cream</div>
                                        <div class="crow">Qty:1</div>
                                    </div>
                                </div> */}
                                <hr />
                                <div className="crow lower">
                                    <div className="col text-left">total Quantity</div>
                                    <div className="col text-right">$ {contextArray.qCount}</div>
                                </div>
                                <div className="crow lower">
                                    <div className="col text-left">Delivery</div>
                                    <div className="col text-right">Free</div>
                                </div>
                                <div class="crow lower">
                                    <div className="col text-left"><b>Total to pay</b></div>
                                    <div className="col text-right"><b>$ {contextArray.price}</b></div>
                                </div>
                                <div className="crow lower">
                                    <div className="col text-left"><Link to='/'><u>Add promo code</u></Link></div>
                                </div>
                                <button className="btn cbtn">Place order</button>
                                <p className="text-muted text-center">Complimentary Shipping & Returns</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div>
                </div>
            </div>
        </div>
    );
};

export default Cart;