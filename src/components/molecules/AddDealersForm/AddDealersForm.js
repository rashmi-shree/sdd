import React, { useState } from "react";
import CustomizedBtn from "../../atoms/CustomizedBtn/CustomizedBtn";
import moment from 'moment';
import { addedsuccessmsg } from '../../organisms/SuccessMsg/SuccessMsg';
import CustomizedComboboxForAll from "../../atoms/CustomizedCombobox/CustomizedComboboxForAll";
import CustomizedComboboxAll from "../../atoms/CustomizedCombobox/CustomizedComboboxAll";
import axios from 'axios';
import '../../../style/style.css';
const AddDealersForm = ({ handleClose }) => {
  const [customerdata, setcustomerdata] = useState();
  const [gststatus, setgststatus] = useState(['Active', 'In Active']);
  let finalCustomerRefNo = '';
  const generateCustomerReferenceNo = () => {
    let s1 = "CUST2022";
    let min = 0;
    let max = 1000;
    let random = Math.floor(Math.random() * (max - min + 1)) + min;
    finalCustomerRefNo = s1 + random;
  }
  generateCustomerReferenceNo();
  let updatedate = "";
  let finalcurrentdate = "";
  const currentDate = () => {
    let date = new Date();
    finalcurrentdate = moment(date).format('YYYY-MM-DD');
  }
  currentDate();
  const submiteventclicked = () => {
    axios.post(`http://3.84.110.201:3001/dealers/addDealersData`,{
      params:{
        data: customerdata
      }
    })
    .then((res)=>{
      if(res){
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
    setcustomerdata({ ...customerdata, "gstin_status": event.value })
  }
  return (
    <div>
      <div className="pageheading">
        Add Dealers Details
      </div>
      <form className="formcontainer">
        <div className="nameandinputcontainer">
          <label className="formdatalabelstyle">
            <div className="formnamestyle">
              GSTIN Number:
            </div>
            <div className="formdatainputstyle">
              <input
                name="gstin_number"
                type="text"
                onChange={changeevent}
              />
            </div>
          </label>
        </div>
        <div className="nameandinputcontainer">
          <label className="formdatalabelstyle">
            <div className="formnamestyle">
              Enterprise name:
            </div>
            <div className="formdatainputstyle">
              <input
                name="enterprise_name"
                type="text"
                onChange={changeevent}
              />
            </div>
          </label>
        </div>
        <div className="nameandinputcontainer">
          <label className="formdatalabelstyle">
            <div className="formnamestyle">
              Enterprise address:
            </div>
            <div className="formdatainputstyle">
              <input
                name="enterprise_address"
                type="text"
                onChange={changeevent}
              />
            </div>
          </label>
        </div>
        <div className="nameandinputcontainer">
          <label className="formdatalabelstyle">
            <div className="formnamestyle">
              Proprietor address:
            </div>
            <div className="formdatainputstyle">
              <input
                name="proprietor_name"
                type="text"
                onChange={changeevent}
              />
            </div>
          </label>
        </div>
        <div className="nameandinputcontainer">
          <label className="formdatalabelstyle">
            <div className="formnamestyle">
              Proprietor phone number:
            </div>
            <div className="formdatainputstyle">
              <input
                name="proprietor_phone_number"
                type="number"
                onChange={changeevent}
                onWheel={(e) => e.target.blur()}
              />
            </div>
          </label>
        </div>
        <div className="nameandinputcontainer">
          <label className="formdatalabelstyle">
            <div className="formnamestyle">
              gst status:
            </div>
            <div className="formdatainputstyle">
              <CustomizedComboboxAll 
                  comboboxdata={gststatus}
                  selectevent={selectevent}
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
export default AddDealersForm;