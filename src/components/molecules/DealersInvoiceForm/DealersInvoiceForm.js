import React, { useEffect, useState } from "react";
import CustomizedBtn from "../../atoms/CustomizedBtn/CustomizedBtn";
import CustomizedComboboxMultipleSelect from '../../atoms/CustomizedComboboxMultipleSelect/CustomizedComboboxMultipleSelect';
import CustomizedComboboxForState from '../../atoms/CustomizedCombobox/CustomizedComboboxForState';
import { generateinvoicesuccessmsg } from '../../organisms/SuccessMsg/SuccessMsg';
import '../../../style/style.css';
const DealersInvoiceForm = ({
  dealersdata,
  handleClose,
  api
}) => {
  const [comboboxdata, setComboboxdata] = useState([]);
  const [products, setproducts] = useState({
    productname: '',
    quantity: "",
    product_status: ""
  });
  const [state, setstate] = useState([]);
  const [selectedstate, setselectedstate] = useState("Karnataka");
  const [changeddata, setchangeddata] = useState();
  let finalCustomerRefNo = '';
  const generateCustomerReferenceNo = () => {
    let s1 = "CUST2022";
    let min = 0;
    let max = 1000;
    let random = Math.floor(Math.random() * (max - min + 1)) + min;
    finalCustomerRefNo = s1 + random;
  }
  generateCustomerReferenceNo();
  let finalInvoiceNo = '';
  const generateInvoiceNo = () => {
    let s1 = "In22-2023/";
    let min = 0;
    let max = 1000;
    let random = Math.floor(Math.random() * (max - min + 1)) + min;
    let notostring = random.toString();
    let size = notostring.length;
    if (size === 4) {
      finalInvoiceNo = s1 + random;
    }
    else if (size === 3) {
      finalInvoiceNo = s1 + "0" + random;
    }
    else if (size === 2) {
      finalInvoiceNo = s1 + "00" + random;
    }
    else if (size === 1) {
      finalInvoiceNo = s1 + "000" + random;
    }
  }
  generateInvoiceNo();
  useEffect(() => {
    api.get('stateandstatecodes/getstateandstatecodes')
      .then((res) => {
        setstate(res.data);
      })
  }, [])
  const submiteventclicked = () => {
    api.post('product/fetchallproductdetails', {
      params: {
        productsdata: products
      }
    })
      .then((res) => {
        var data = res.data;
        let prod = products.map((d) => {
          let temp = data.find(a => a.product_name == d.productname)
          return { ...d, ...temp }
        })
        let selectedstatecode = "";
        state.map((d) => {
          if (d.statename === selectedstate) {
            selectedstatecode = d.statecode;
          }
        })
        api.post('customer/insertdealerscustomertable', {
          params: {
            customer_reference_no: finalCustomerRefNo,
            dealersdata: dealersdata,
            state: selectedstate,
            changed_data: changeddata
          }
        })
          .then((res) => {
          })
        api.post('dealers/insertdealersdataintodeliverytable', {
          params: {
            customer_reference_no: finalCustomerRefNo,
            invoice_no: finalInvoiceNo,
            dealersdata: dealersdata,
            productsdata: prod,
            state: selectedstate,
            state_code: selectedstatecode,
            changed_data: changeddata
          }
        })
          .then((res) => {
            if (res) {
              const res = generateinvoicesuccessmsg({})
              alert(res.msg);
              handleClose();
            }
          })
      })
      api.put('product/updateProductsDetailsProductData',{
        params:products
      })
  }
  const incrementclicked = (data) => {
    let selectedproductdetails = products.map((product) => {
      if (product.productname == data.productname) {
        product.quantity += 1;
      }
      return product;
    });
    setproducts(selectedproductdetails);
  }
  const decrementclicked = (data) => {
    let selectedproductdetails = products.map((product) => {
      if (product.productname == data.productname) {
        product.quantity -= 1;
      }
      return product;
    });
    setproducts(selectedproductdetails);
  }
  const selectedproducts = (e) => {
    let selectedproducts = e.map((data) => {
      return { productname: data, quantity: 1 }
    })
    setproducts(selectedproducts);
  }
  useEffect(() => {
    api.get('product/displayProductDetailsDataforcombobox')
      .then((res) => {
        setComboboxdata(res.data);
      })
  }, [])
  const selecteventforstate = (e) => {
    setselectedstate(e.label);
  }
  const changeevent = (e) => {
    setchangeddata({ ...changeddata, [e.target.name]: e.target.value });
  }
  return (
    <div>
      <div className="pageheading">
        Generate Invoice
      </div>
      <form className="formcontainer">
        <div className="nameandinputcontainer">
          <label className="formdatalabelstyle">
            <div className="formnamestyle">
              GSTIN Number:
            </div>
            <div className="formdatainputstyle">
              <input
                type="text"
                defaultValue={dealersdata.gstin_number}
                readOnly
                disabled
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
                type="text"
                defaultValue={dealersdata.enterprise_name}
                readOnly
                disabled
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
                type="text"
                defaultValue={dealersdata.enterprise_address}
                readOnly
                disabled
              />
            </div>
          </label>
        </div>
        <div className="nameandinputcontainer">
          <label className="formdatalabelstyle">
            <div className="formnamestyle">
              Proprietor Phone Number:
            </div>
            <div className="formdatainputstyle">
              <input
                type="text"
                defaultValue={dealersdata.proprietor_phone_number}
                readOnly
                disabled
              />
            </div>
          </label>
        </div>
        <div className="nameandinputcontainer">
          <label className="formdatalabelstyle">
            <div className="formnamestyle">
            <sup className="asteriskstyle">*</sup>Enquired Product:
            </div>
            <div className="formdatainputstyle">
              <CustomizedComboboxMultipleSelect
                comboboxdata={comboboxdata}
                selectedproducts={selectedproducts}
              />
            </div>
          </label>
        </div>
        <div>
          <p>Selected products:-
            <ul>
              {products && products.length &&
                products.map((data) => (
                  <li className="productnamedesign">
                    <div>{data.productname}</div>
                    <div className="incrementdecrement">
                      <CustomizedBtn BtnName="+" onClick={() => { incrementclicked(data) }} />
                      {data.quantity}
                      <CustomizedBtn BtnName="-" onClick={() => { decrementclicked(data) }} />
                    </div>
                  </li>
                ))
              }
            </ul>
          </p>
        </div>
        <div className="nameandinputcontainer">
          <label className="formdatalabelstyle">
            <div className="formnamestyle">
            <sup className="asteriskstyle">*</sup>PO Number:
            </div>
            <div className="formdatainputstyle">
              <input
                name="po_number"
                type="text"
                onChange={changeevent}
              />
            </div>
          </label>
        </div>
        <div className="nameandinputcontainer">
          <label className="formdatalabelstyle">
            <div className="formnamestyle">
            <sup className="asteriskstyle">*</sup>Vehicle Number:
            </div>
            <div className="formdatainputstyle">
              <input
                name="vehicle_number"
                type="text"
                onChange={changeevent}
              />
            </div>
          </label>
        </div>
        <div className="nameandinputcontainer">
          <label className="formdatalabelstyle">
            <div className="formnamestyle">
            <sup className="asteriskstyle">*</sup>Place of Supply:
            </div>
            <div className="formdatainputstyle">
              <input
                name="place_of_supply"
                type="text"
                onChange={changeevent}
              />
            </div>
          </label>
        </div>
        <div className="nameandinputcontainer">
          <label className="formdatalabelstyle">
            <div className="formnamestyle">
            <sup className="asteriskstyle">*</sup>State:
            </div>
            <div className="formdatainputstyle">
              <CustomizedComboboxForState
                className="select"
                comboboxdata={state}
                type="state"
                selectevent={selecteventforstate}
              />
            </div>
          </label>
        </div>
        <div className="nameandinputcontainer">
          <label className="formdatalabelstyle">
            <div className="formnamestyle">
              Phone number (Alter-1):
            </div>
            <div className="formdatainputstyle">
              <input
                name="phone_number_alter_one"
                type="number"
                onChange={changeevent}
              />
            </div>
          </label>
        </div>
        <div className="nameandinputcontainer">
          <label className="formdatalabelstyle">
            <div className="formnamestyle">
              Phone number (Alter-2):
            </div>
            <div className="formdatainputstyle">
              <input
                name="phone_number_alter_two"
                type="number"
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
export default DealersInvoiceForm;