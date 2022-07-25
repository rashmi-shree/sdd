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
  const submiteventclicked = () => {
    axios.post('http://localhost:3000/product/addProductData', {
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
              Product Name:
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
              Product hsn code:
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
              Product description:
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
              Unit of measure:
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
              rate per unit:
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
              gst rate:
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
              Product status:
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
              stock:
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
              discount:
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