import React, { useEffect, useState } from "react";
import CustomizedBtn from "../../atoms/CustomizedBtn/CustomizedBtn";
import { editedsuccessmsg } from '../../organisms/SuccessMsg/SuccessMsg';
import CustomizedComboboxAll from "../../atoms/CustomizedCombobox/CustomizedComboboxAll";
import axios from 'axios';
import '../../../style/style.css';

const ProductsDetailsForm = ({ rowdata, handleClose }) => {
  const [updaterowdata, setUpdaterowdata] = useState();
  const [productstatus, setproductstatus] = useState(["Available", "Not Available"]);
  useEffect(() => {
    setUpdaterowdata(rowdata);
  }, [])
  const submiteventclicked = () => {
    axios.put('http://3.84.110.201:3001/product/updateProductsDetails', {
      params: {
        updaterowdata
      }
    })
      .then((res) => {
        if (res) {
          const res = editedsuccessmsg({});
          alert(res.msg);
          handleClose();
        }
      })
  }
  const changeevent = (event) => {
    setUpdaterowdata({ ...updaterowdata, [event.target.name]: event.target.value })
  }
  const selectevent = (event) => {
    setUpdaterowdata({ ...updaterowdata, ["product_status"]: event.value })
  }
  return (
    <div>
      <div className="pageheading">
        Edit Product details
      </div>
      <form className="formcontainer">
        <div className="nameandinputcontainer">
          <label className="formdatalabelstyle">
            <div className="formnamestyle">
              Product HSN code:
            </div>
            <div className="formdatainputstyle">
              <input
                name="product_hsn_code"
                defaultValue={rowdata.product_hsn_code}
                onChange={changeevent}
                type="number"
              />
            </div>
          </label>
        </div>
        <div className="nameandinputcontainer">
          <label className="formdatalabelstyle">
            <div className="formnamestyle">
              Product Name:
            </div>
            <div className="formdatainputstyle">
              <input
                name="product_name"
                onChange={changeevent}
                defaultValue={rowdata.product_name}
                type="text"
              />
            </div>
          </label>
        </div>
        <div className="nameandinputcontainer">
          <label className="formdatalabelstyle">
            <div className="formnamestyle">
              Product Description:
            </div>
            <div className="formdatainputstyle">
              <input
                name="product_description"
                onChange={changeevent}
                defaultValue={rowdata.product_description}
                type="text"
              />
            </div>
          </label>
        </div>
        <div className="nameandinputcontainer">
          <label className="formdatalabelstyle">
            <div className="formnamestyle">
              Unit of Measure:
            </div>
            <div className="formdatainputstyle">
              <input
                name="unit_of_measure"
                onChange={changeevent}
                defaultValue={rowdata.unit_of_measure}
                type="text"
              />
            </div>
          </label>
        </div>
        <div className="nameandinputcontainer">
          <label className="formdatalabelstyle">
            <div className="formnamestyle">
              Rate per unit:
            </div>
            <div className="formdatainputstyle">
              <input
                name="rate_per_unit"
                onChange={changeevent}
                defaultValue={rowdata.rate_per_unit}
                type="number"
              />
            </div>
          </label>
        </div>
        <div className="nameandinputcontainer">
          <label className="formdatalabelstyle">
            <div className="formnamestyle">
              GST Rate:
            </div>
            <div className="formdatainputstyle">
              <input
                name="gst_rate"
                onChange={changeevent}
                defaultValue={rowdata.gst_rate}
                type="number"
              />
            </div>
          </label>
        </div>
        <div className="nameandinputcontainer">
          <label className="formdatalabelstyle">
            <div className="formnamestyle">
              Product Status:
            </div>
            <div className="formdatainputstyle">
              <CustomizedComboboxAll
                  comboboxdata={productstatus}
                  dvalue={rowdata.product_status}
                  selectevent={selectevent}
                />
            </div>
          </label>
        </div>
        <div className="nameandinputcontainer">
          <label className="formdatalabelstyle">
            <div className="formnamestyle">
              Product Discount:
            </div>
            <div className="formdatainputstyle">
              <input
                name="discount"
                onChange={changeevent}
                defaultValue={rowdata.discount}
                type="number"
              />
            </div>
          </label>
        </div>
        <div className="nameandinputcontainer">
          <label className="formdatalabelstyle">
            <div className="formnamestyle">
              Stock:
            </div>
            <div className="formdatainputstyle">
              <input
                name="stock"
                onChange={changeevent}
                defaultValue={rowdata.stock}
                type="number"
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
export default ProductsDetailsForm;