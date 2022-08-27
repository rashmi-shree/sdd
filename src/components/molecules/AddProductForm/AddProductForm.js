import React, { useState } from "react";
import CustomizedBtn from "../../atoms/CustomizedBtn/CustomizedBtn";
import moment from 'moment';
import { addedsuccessmsg } from '../../organisms/SuccessMsg/SuccessMsg';
import axios from 'axios';
import CustomizedComboboxAll from "../../atoms/CustomizedCombobox/CustomizedComboboxAll";
import '../../../style/style.css';
const AddProductForm = ({ handleClose }) => {
  const [customerdata, setcustomerdata] = useState();
  const [productstatus, setproductstatus] = useState(['Available', 'Not Available']);
  const [errors, seterrors] = useState({
    productNameError:"",
    productHsnCodeError:"",
    productDescriptionError:"",
    unitOfMeasureError:"",
    ratePerUnitError:"",
    gstRateError:"",
    productStatusError:"",
    stockError:"",
    discountError:"",
    commonError:""
  })
  let finalCustomerRefNo = '';
  const generateCustomerReferenceNo = () => {
    let s1 = "CUST2022";
    let min = 0;
    let max = 1000;
    let random = Math.floor(Math.random() * (max - min + 1)) + min;
    finalCustomerRefNo = s1 + random;
  }
  generateCustomerReferenceNo();
  let finalcurrentdate = "";
  const currentDate = () => {
    let date = new Date();
    finalcurrentdate = moment(date).format('YYYY-MM-DD');
  }
  currentDate();
  const validate = () => {
    let productNameError= "";
    let productHsnCodeError="";
    let productDescriptionError="";
    let unitOfMeasureError="";
    let ratePerUnitError="";
    let gstRateError="";
    let productStatusError="";
    let stockError="";
    let discountError="";
    let ce = "";
    console.log("customerdata",customerdata);
    if (!customerdata || customerdata.product_name || customerdata.product_hsn_code ||
      customerdata.product_description || customerdata.unit_of_measure || customerdata.rate_per_unit ||
      customerdata.gst_rate || customerdata.product_status || customerdata.product_status ||
      customerdata.stock || customerdata.discount 
      ){
      ce = "please enter all important fields";
      // productNameError = "Please Enter Product Name";
      // productHsnCodeError = "Please Enter Product Hsn Code";
      // productDescriptionError = "Please Enter Product Description";
      // unitOfMeasureError = "Please Enter unit ";
      // ratePerUnitError = "Please Enter Product Name";
      // gstRateError = "Please Enter Product Name";
      // productStatusError = "Please Enter Product Name";
      // stockError = "Please Enter Product Name";
      // discountError = "Please Enter Product Name";
    }
    if(ce){
      seterrors({...errors, ["commonError"]:ce});
      return false;
    }
    return true;
  }
  const submiteventclicked = () => {
    const isvalid = validate();
    if(isvalid){
      axios.post('http://3.84.110.201:3001/product/addProductData', {
        params: {
          data: customerdata
        }
      })
        .then((res) => {
          if (res) {
            const res = addedsuccessmsg({})
            alert(res.msg);
            handleClose();
          }
        })
    }
    else {
      alert(errors.ce);
    }
  }
  const changeevent = (event) => {
    setcustomerdata({ ...customerdata, [event.target.name]: event.target.value })
  }
  const selectevent = (event) => {
    setcustomerdata({ ...customerdata, "product_status": event.value })
  }
  return (
    <div>
      <div className="pageheading">
        Add Product Details
      </div>
      <form className="formcontainer">
        <div className="nameandinputcontainer">
          <label className="formdatalabelstyle">
            <div className="formnamestyle">
            <sup className="asteriskstyle">*</sup>Product Name:
            </div>
            <div className="formdatainputstyle">
              <input
                name="product_name"
                type="text"
                onChange={changeevent}
              />
            </div>
          </label>
        </div>
        <div className="nameandinputcontainer">
          <label className="formdatalabelstyle">
            <div className="formnamestyle">
            <sup className="asteriskstyle">*</sup>Product hsn code:
            </div>
            <div className="formdatainputstyle">
              <input
                name="product_hsn_code"
                type="text"
                onChange={changeevent}
              />
            </div>
          </label>
        </div>
        <div className="nameandinputcontainer">
          <label className="formdatalabelstyle">
            <div className="formnamestyle">
            <sup className="asteriskstyle">*</sup>Product description:
            </div>
            <div className="formdatainputstyle">
              <input
                name="product_description"
                type="text"
                onChange={changeevent}
              />
            </div>
          </label>
        </div>
        <div className="nameandinputcontainer">
          <label className="formdatalabelstyle">
            <div className="formnamestyle">
            <sup className="asteriskstyle">*</sup>Unit of measure:
            </div>
            <div className="formdatainputstyle">
              <input
                name="unit_of_measure"
                type="text"
                onChange={changeevent}
              />
            </div>
          </label>
        </div>
        <div className="nameandinputcontainer">
          <label className="formdatalabelstyle">
            <div className="formnamestyle">
            <sup className="asteriskstyle">*</sup>rate per unit:
            </div>
            <div className="formdatainputstyle">
              <input
                name="rate_per_unit"
                type="text"
                onChange={changeevent}
              />
            </div>
          </label>
        </div>
        <div className="nameandinputcontainer">
          <label className="formdatalabelstyle">
            <div className="formnamestyle">
            <sup className="asteriskstyle">*</sup>gst rate:
            </div>
            <div className="formdatainputstyle">
              <input
                name="gst_rate"
                type="text"
                onChange={changeevent}
              />
            </div>
          </label>
        </div>
        <div className="nameandinputcontainer">
          <label className="formdatalabelstyle">
            <div className="formnamestyle">
            <sup className="asteriskstyle">*</sup>Product status:
            </div>
            <div className="formdatainputstyle">
              <CustomizedComboboxAll 
                  comboboxdata={productstatus}
                  selectevent={selectevent}
                />
            </div>
          </label>
        </div>
        <div className="nameandinputcontainer">
          <label className="formdatalabelstyle">
            <div className="formnamestyle">
            <sup className="asteriskstyle">*</sup>stock:
            </div>
            <div className="formdatainputstyle">
              <input
                name="stock"
                type="text"
                onChange={changeevent}
              />
            </div>
          </label>
        </div>
        <div className="nameandinputcontainer">
          <label className="formdatalabelstyle">
            <div className="formnamestyle">
            <sup className="asteriskstyle">*</sup>discount:
            </div>
            <div className="formdatainputstyle">
              <input
                name="discount"
                type="text"
                onChange={changeevent}
              />
            </div>
          </label>
        </div>
        <div className="submitcontainee">
          <CustomizedBtn
            BtnName="submit"
            onClick={submiteventclicked}
          />
        </div>
      </form>
    </div>
  )
}
export default AddProductForm;