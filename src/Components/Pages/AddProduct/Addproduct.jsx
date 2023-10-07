import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './addproduct.css'
import Inputui from '../UI/Inputui';

const Addproduct = () => {
    const [selData, setSelData] = useState([]);
    const [error, setError] = useState([]);
    const [formData, setFormData] = useState({
        "ProductSku": "",
        "ProductName": "",
        "ProductPrice": 0,
        "ProductShortName": "",
        "ProductDescription": "",
        "CreatedDate": new Date(),
        "DeliveryTimeSpan": "",
        "CategoryId": 0,
        "ProductImageUrl": ""
    }
    )
    useEffect(() => {
        const getApicall = async () => {
            try {
                const res = await axios.get("https://onlinetestapi.gerasimd.in/api/Ecomm/GetAllCategory")
                console.log(res.data);
                setSelData(res?.data?.data);

            } catch (error) {
                console.log(error)
            }
        }
        getApicall()
    }, [])

    const commmonHandler = (fieldName, event) => {
        // console.log(fieldName, event.target.value);
        setFormData(prevState => ({
            ...prevState, [fieldName]: event.target.value
        }))

    }
    const handleError = (fieldName) =>{
        return error.indexOf(fieldName) > -1 ? true : false ;
       }
    const submitHandler = async (e) => {
        e.preventDefault();
        let localError = [];
        for (let x in formData) {
            if (formData[x] === "") {
                localError.push(x)
            }
        }
        setError(localError);
        if (localError.length === 0) {
            try {
                let res = await axios.post("https://onlinetestapi.gerasim.in/api/Ecomm/CreateProduct", formData)
                console.log(res?.data?.data);
                alert(res?.data?.message);
            } catch (error) {
                console.log(error)
            }
        } else {
            alert(localError)
        }
    }
    return (
        <div class="classproduct bodyaddproduct px-5 py-5">
            <div class="text">   Add Product  </div>
            <form onSubmit={(e) => submitHandler(e)}>
                <div class="form-row">
                    <div class="input-data">
                    {/* <Inputui type="text" value={formData.ProductSku} fieldName="ProductSku" onChangeHandler={commmonHandler} error={handleError("Name")}></Inputui> */}
                        <input type="text" required value={formData.ProductSku} onChange={(e) => commmonHandler("ProductSku", e)} />
                        <div class="underline"></div>
                        <label for="">ProductSku</label>
                    </div>
                    <div class="input-data">
                        <input type="text" required value={formData.ProductName} onChange={(e) => commmonHandler("ProductName", e)} />
                        <div class="underline"></div>
                        <label for="">ProductName</label>
                    </div>
                </div>
                <div class="form-row">
                    <div class="input-data">
                        <input type="text" required value={formData.ProductPrice} onChange={(e) => commmonHandler("ProductPrice", e)} />
                        <div class="underline"></div>
                        <label for="">ProductPrice</label>
                    </div>
                    <div class="input-data">
                        <input type="text" required value={formData.ProductShortName} onChange={(e) => commmonHandler("ProductShortName", e)} />
                        <div class="underline"></div>
                        <label for="">ProductShortName</label>
                    </div>
                </div>
                <div class="form-row">
                    <div class="input-data">
                        <input type="text" required value={formData.ProductDescription} onChange={(e) => commmonHandler("ProductDescription", e)} />
                        <div class="underline"></div>
                        <label for="">ProductDescription</label>
                    </div>
                    <div class="input-data">
                        <input type="Date" required value={formData.CreatedDate} onChange={(e) => commmonHandler("CreatedDate", e)} />
                        <div class="underline"></div>
                        {/* <label for="">CreatedDate</label> */}
                    </div>
                </div>
                <div class="form-row">
                    <div class="input-data">
                        <input type="text" required value={formData.DeliveryTimeSpan} onChange={(e) => commmonHandler("DeliveryTimeSpan", e)} />
                        <div class="underline"></div>
                        <label for="">DeliveryTimeSpan</label>
                    </div>
                    <div class="input-data">
                        <select name="" id="" value={formData.CategoryId} onChange={(e) => commmonHandler("CategoryId", e)}>
                            <option defaultValue={formData.CategoryId}>Category Id</option>
                            {selData.map((item) => {
                                return (
                                    <option value={item.categoryId}>{item.categoryName}</option>
                                )
                            })}
                        </select>
                    </div>
                </div>
                <div class="form-row">
                    <div class="input-data">
                        <input type="text" required value={formData.ProductImageUrl} onChange={(e) => commmonHandler("ProductImageUrl", e)} />
                        <div class="underline"></div>
                        <label for="">ProductImageUrl</label>
                    </div>
                </div>
                <div className="form-row">
                    <button type='submit' className='btn btn-primary'>Submit</button>
                </div>
            </form>
        </div>
    );
};

export default Addproduct;