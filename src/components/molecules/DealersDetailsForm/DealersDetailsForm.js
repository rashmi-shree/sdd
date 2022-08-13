import React, { useEffect, useState, useRef } from "react";
import CustomizedBtn from "../../atoms/CustomizedBtn/CustomizedBtn";
import { purchasesuccessmsg } from '../../organisms/SuccessMsg/SuccessMsg';
import { useReactToPrint } from "react-to-print";
import CustomizedPrint from '../../atoms/CustomizedPrint/CustomizedPrint';
import axios from 'axios';
import '../../../style/style.css';
const DealersDetailsForm = ({
  rowdata,
  handleClose,
  fetchdealersdatatoverify,
  verificationstatus,
  currentInvoiceno,
  fetchinvoicesfromdelivery
}) => {
  const [updaterowdata, setUpdaterowdata] = useState();
  const [Rowdatadisplayed, setRowdatadisplayed] = useState();
  const [gstno, setgstno] = useState();
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  useEffect(() => {
    fetchalldatafromcust();
  }, [])
  const fetchalldatafromcust = () => {
    axios.post('http://3.84.110.201:3001/delivery/getalldataofcustomer', {
        params: {
          currentCustomerReferenceNo: currentInvoiceno
        }
      })
        .then((res) => {
          setRowdatadisplayed(res.data);
        })
  }
  useEffect(() => {
    if (fetchdealersdatatoverify) {
      setUpdaterowdata(fetchdealersdatatoverify);
    }
  }, [fetchdealersdatatoverify])
  const [finalverificationstatus, setfinalverificationstatus] = useState();
  useEffect(() => {
    if (verificationstatus) {
      setfinalverificationstatus(verificationstatus[0].verification_status);
    }
  }, [verificationstatus])
  const [constantinvoicedata, setconstantinvoicedata] = useState();
  useEffect(() => {
    if (fetchdealersdatatoverify) {
      const tempdata = [...new Set(fetchdealersdatatoverify.map((e) => e.customer_reference_no))];
      tempdata.map((temp) => {
        let filterByTempData = fetchdealersdatatoverify.filter(dataObject => dataObject.customer_reference_no === temp)
        var fixedstrings = filterByTempData[0];
        setconstantinvoicedata(fixedstrings);
      })
    }
  }, [fetchdealersdatatoverify])
  const submiteventclicked = (gstno) => {
    let custrefno = "";
    let statecode;
    Rowdatadisplayed.map((data) => {
      custrefno = data.customer_reference_no;
      statecode = data.state_code;
    })
    axios.post('http://3.84.110.201:3001/delivery/setverificationstatus', {
      params: {
        customer_reference_no: custrefno
      }
    })
      axios.put('http://3.84.110.201:3001/delivery/updatepurchasestatusofdeliverytable', {
      params: {
        customer_reference_no: custrefno
      }
    })
      axios.put('http://3.84.110.201:3001/delivery/updateDeliveryDatafromdealersform', {
      params: {
        rowdatadisplayed: Rowdatadisplayed
      }
    })
      axios.post('http://3.84.110.201:3001/jointables/calculaterateofdeliveryofdealers', {
      params: {
        rowdatadisplayed: Rowdatadisplayed
      }
    })
    if (statecode == 29) {
      axios.put('http://3.84.110.201:3001/jointables/updatekarnatakagstratesfromdealers', {
        params: {
          customer_reference_no: custrefno
        }
      })
        axios.put('http://3.84.110.201:3001/jointables/updatefinalamountdeliveryfromdealers', {
        params: {
          customer_reference_no: custrefno
        }
      })
        axios.put('http://3.84.110.201:3001/jointables/updatebalanceamountdeliveryfromdealers', {
        params: {
          rowdatadisplayed: Rowdatadisplayed
        }
      })
        .then((res) => {
          if (res) {
            const res = purchasesuccessmsg({});
            alert(res.msg);
            handleClose();
          }
        })
        fetchinvoicesfromdelivery(gstno);
    }
    else {
      axios.put('http://3.84.110.201:3001/jointables/updateotherstatesgstratesfromdealers', {
        params: {
          customer_reference_no: custrefno
        }
      })
        .then((res) => {
        })
        axios.put('http://3.84.110.201:3001/jointables/updatefinalamountdeliveryfromdealers', {
        params: {
          customer_reference_no: custrefno
        }
      })
        .then((res) => {
        })
        axios.put('http://3.84.110.201:3001/jointables/updatebalanceamountdeliveryfromdealers', {
        params: {
          rowdatadisplayed: Rowdatadisplayed
        }
      })
        .then((res) => {
          if (res) {
            const res = purchasesuccessmsg({});
            alert(res.msg);
            handleClose();
            fetchinvoicesfromdelivery(gstno);
          }
        })
    }
  }
  
  useEffect(()=>{
    if (Rowdatadisplayed){
      Rowdatadisplayed.map((data,i)=>(
        setgstno(data.gst)
      ))
    }
  },[Rowdatadisplayed])
  const changeevent = (event, index) => {
    let updateRowDataByIndex = [...Rowdatadisplayed];
    Rowdatadisplayed.find((item, i) => {
      if (item.delivery_id === index) {
        updateRowDataByIndex[i][event.target.name] = event.target.value;
        setRowdatadisplayed(() => [...updateRowDataByIndex]);
      }
    })
  }
  return (
    <div>
      <div><CustomizedPrint
        onClick={handlePrint}
      />
      </div>
      <div ref={componentRef}>
        <div className="formheading">
          <h5><bold>SHREE PARAMANANDA ENTERPRISES</bold></h5>
          <p>Shop #05,Medhini Arcade,Kithaganahalli Gate,
            Opp Anna
            Building,Hosur Main Road Bangalore-560099,
            <br></br>Mobile: 9035757145/9902880851/9141070705</p>
        </div>
        <div className="pageheading">
          Purchase Order
        </div>
        <form className="formcontainer">
          {
            Rowdatadisplayed && Rowdatadisplayed.length
              ? Rowdatadisplayed.map((data, i) => (
                <>
                  <div className="nameandinputcontainer">
                    <label className="formdatalabelstyle">
                      <div className="formnamestyle">
                        customer name:
                      </div>
                      <div className="formdatainputstyle">
                        <input
                          defaultValue={data.customer_name}
                          type="text"
                          readOnly
                        />
                      </div>
                    </label>
                  </div>
                  <div className="nameandinputcontainer">
                    <label className="formdatalabelstyle">
                      <div className="formnamestyle">
                        Customer address:
                      </div>
                      <div className="formdatainputstyle">
                        <input
                          defaultValue={data.customer_address}
                          type="text"
                          readOnly
                        />
                      </div>
                    </label>
                  </div>
                  <div className="nameandinputcontainer">
                    <label className="formdatalabelstyle">
                      <div className="formnamestyle">
                        Invoice no:
                      </div>
                      <div className="formdatainputstyle">
                        <input
                          defaultValue={data.invoice_no}
                          type="text"
                          readOnly
                        />
                      </div>
                    </label>
                  </div>
                  <div className="nameandinputcontainer">
                    <label className="formdatalabelstyle">
                      <div className="formnamestyle">
                        GST:
                      </div>
                      <div className="formdatainputstyle">
                        <input
                          defaultValue={data.gst}
                          type="text"
                          readOnly
                        />
                      </div>
                    </label>
                  </div>
                  <div className="nameandinputcontainer">
                    <label className="formdatalabelstyle">
                      <div className="formnamestyle">
                        phone number:
                      </div>
                      <div className="formdatainputstyle">
                        <input
                          defaultValue={data.phone_number}
                          type="number"
                          readOnly
                        />
                      </div>
                    </label>
                  </div>
                  <div className="nameandinputcontainer">
                    <label className="formdatalabelstyle">
                      <div className="formnamestyle">
                        phone number (alter one):
                      </div>
                      <div className="formdatainputstyle">
                        <input
                          defaultValue={data.phone_number_alter_one}
                          type="number"
                          readOnly
                        />
                      </div>
                    </label>
                  </div>
                  <div className="nameandinputcontainer">
                    <label className="formdatalabelstyle">
                      <div className="formnamestyle">
                        phone number (alter two):
                      </div>
                      <div className="formdatainputstyle">
                        <input
                          defaultValue={data.phone_number_alter_two}
                          type="text"
                          readOnly
                        />
                      </div>
                    </label>
                  </div>
                  <div className="nameandinputcontainer">
                    <label className="formdatalabelstyle">
                      <div className="formnamestyle">
                        Product:
                      </div>
                      <div className="formdatainputstyle">
                        <input
                          defaultValue={data.product}
                          type="text"
                          readOnly
                        />
                      </div>
                    </label>
                  </div>
                  <div className="nameandinputcontainer">
                    <label className="formdatalabelstyle">
                      <div className="formnamestyle">
                        quantity:
                      </div>
                      <div className="formdatainputstyle">
                        <input
                          defaultValue={data.quantity}
                          type="text"
                          readOnly
                        />
                      </div>
                    </label>
                  </div>
                  <div className="nameandinputcontainer">
                    <label className="formdatalabelstyle">
                      <div className="formnamestyle">
                        rate:
                      </div>
                      <div className="formdatainputstyle">
                        <input
                          defaultValue={data.rate}
                          type="text"
                          readOnly
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
                          defaultValue={data.discount}
                          type="text"
                          readOnly
                        />
                      </div>
                    </label>
                  </div>
                  <div className="nameandinputcontainer">
                    <label className="formdatalabelstyle">
                      <div className="formnamestyle">
                        Rate After Extended Discount:
                      </div>
                      <div className="formdatainputstyle">
                        <input
                          defaultValue={data.extended_discount}
                          type="text"
                          onChange={(event) => changeevent(event, data.delivery_id)}
                          name="extended_discount"
                        />
                      </div>
                    </label>
                  </div>
                  <div className="nameandinputcontainer">
                    <label className="formdatalabelstyle">
                      <div className="formnamestyle">
                        cgst:
                      </div>
                      <div className="formdatainputstyle">
                        <input
                          defaultValue={data.cgst}
                          type="text"
                          readOnly
                        />
                      </div>
                    </label>
                  </div>
                  <div className="nameandinputcontainer">
                    <label className="formdatalabelstyle">
                      <div className="formnamestyle">
                        sgst:
                      </div>
                      <div className="formdatainputstyle">
                        <input
                          defaultValue={data.sgst}
                          type="text"
                          readOnly
                        />
                      </div>
                    </label>
                  </div>
                  <div className="nameandinputcontainer">
                    <label className="formdatalabelstyle">
                      <div className="formnamestyle">
                        igst:
                      </div>
                      <div className="formdatainputstyle">
                        <input
                          defaultValue={data.igst}
                          type="text"
                          readOnly
                        />
                      </div>
                    </label>
                  </div>
                  <div className="nameandinputcontainer">
                    <label className="formdatalabelstyle">
                      <div className="formnamestyle">
                        final amount:
                      </div>
                      <div className="formdatainputstyle">
                        <input
                          defaultValue={data.final_amount}
                          type="text"
                          readOnly
                        />
                      </div>
                    </label>
                  </div>
                  <div className="nameandinputcontainer">
                    <label className="formdatalabelstyle">
                      <div className="formnamestyle">
                        balance amount:
                      </div>
                      <div className="formdatainputstyle">
                        <input
                          defaultValue={data.balance_amount}
                          type="text"
                          readOnly
                        />
                      </div>
                    </label>
                  </div>
                  <div className="nameandinputcontainer">
                      <label className="formdatalabelstyle">
                          <div className="formnamestyle">
                              Payment status:
                          </div>
                          <div className="formdatainputstyle">
                              <input
                                  type="text"
                                  defaultValue={data.payment_status}
                                  readOnly
                              />
                          </div> 
                      </label>
                  </div>
                  <div className="nameandinputcontainer">
                    <label className="formdatalabelstyle">
                      <div className="formnamestyle">
                        advance amount:
                      </div>
                      <div className="formdatainputstyle">
                        <input
                          defaultValue={data.booking_advance_amount}
                          type="number"
                          onChange={(event) => changeevent(event, data.delivery_id)}
                          name="booking_advance_amount"
                        />
                      </div>
                    </label>
                  </div>
                  <div className="nameandinputcontainer">
                    <label className="formdatalabelstyle">
                      <div className="formnamestyle">
                        po number:
                      </div>
                      <div className="formdatainputstyle">
                        <input
                          defaultValue={data.po_number}
                          type="text"
                          readOnly
                        />
                      </div>
                    </label>
                  </div>
                  <div className="nameandinputcontainer">
                    <label className="formdatalabelstyle">
                      <div className="formnamestyle">
                        vehicle number:
                      </div>
                      <div className="formdatainputstyle">
                        <input
                          defaultValue={data.vehicle_number}
                          type="text"
                          readOnly
                        />
                      </div>
                    </label>
                  </div>
                  <div className="divider"></div>
                </>
              ))
              : <p>No Record!</p>
            }
            {/* <CustomizedBtn
            BtnName="submit"
            // onClick={submiteventclicked}
            onClick={() => {
              submiteventclicked(data.gst);
          }}
          /> */}
        </form>
      </div>
      {
        finalverificationstatus == 1
          ? <p className="verificationstyle">verification completed!</p>
          : <div className="submitcontainee">
            <CustomizedBtn
              BtnName="submit"
              // onClick={submiteventclicked}
              onClick={()=>{
                submiteventclicked(gstno);
              }}
            />
          </div>
      }
    </div>
  )
}
export default DealersDetailsForm;