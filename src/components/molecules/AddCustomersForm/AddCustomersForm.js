import React, { useEffect, useState, useRef } from "react";
import CustomizedBtn from '../../atoms/CustomizedBtn/CustomizedBtn';
import { purchasesuccessmsg } from '../../organisms/SuccessMsg/SuccessMsg';
import SelectDate from "../../atoms/CustomizedDatepicker/SelectDate";
import { useReactToPrint } from "react-to-print";
import CustomizedPrint from "../../atoms/CustomizedPrint/CustomizedPrint";
import CustomizedComboboxAll from "../../atoms/CustomizedCombobox/CustomizedComboboxAll";
import '../../../style/style.css';

const AddCustomersForm = ({
    currentCustomerReferenceNo,
    handleClose,
    displaycustomerfollowupevent,
    purchasestatus,
    api,
    setpurchasemsgevent
}) => {
    const [rowdatadisplayed, setRowdatadisplayed] = useState();
    const [paymentstatus, setpaymentstatus] = useState(["paid", "pending"]);
    const [bookeddate, setbookeddate] = useState('');
    const [productdata, setproductdata] = useState({});
    const [finalpurchasestatus, setfinalpurchasestatus] = useState();
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });
    useEffect(() => {
        if (purchasestatus) {
            setfinalpurchasestatus(purchasestatus[0].purchase_status);
        }
    }, [purchasestatus])
    const selectevent = (event, index) => {
        let updateRowDataByIndex = [...rowdatadisplayed];
        rowdatadisplayed.find((item, i) => {
            if (item.delivery_id === index) {
                updateRowDataByIndex[i]["payment_status"] = event.target.innerHTML;
                setRowdatadisplayed(() => [...updateRowDataByIndex]);
            }
        })
    }
    const bookeddateevent = () => {
        let newDate = new Date()
        let date = newDate.getDate();
        let month = newDate.getMonth() + 1;
        let year = newDate.getFullYear();
        let finaldate = year + "-" + month + "-" + date;
        setbookeddate(finaldate);
    }
    const [updaterowdata, setUpdaterowdata] = useState();
    useEffect(() => {
        bookeddateevent();
    }, [])
    useEffect(() => {
        fetchalldatafromcust();
    }, [])
    const fetchalldatafromcust = () => {
        api.post('/delivery/getalldataofcustomer', {
            params: {
                currentCustomerReferenceNo
            }
        })
            .then((res) => {
                const data = res.data;
                setRowdatadisplayed(data);
                setUpdaterowdata(data[0]);
            })
    }
    useEffect(() => {
        if (updaterowdata && updaterowdata.product_hsn_code) {
            api.post('/product/displayProductDetailsDatabasedonproducthsn', {
                params: {
                    product_hsn_code: updaterowdata.product_hsn_code
                }
            })
                .then((res) => {
                    const data = res.data;
                    setproductdata(data);
                })
        }
    }, [updaterowdata]);
    const submiteventclicked = () => {
        api.put('/customer/updatefinalstatuscustomertable', {
            params: {
                final_status: "Booked",
                customer_reference_no: currentCustomerReferenceNo
            }
        })
            .then((res) => {
                displaycustomerfollowupevent();
            })
        api.put('/delivery/updatepurchasestatusofdeliverytable', {
            params: {
                customer_reference_no: currentCustomerReferenceNo
            }
        })
            .then((res) => {
                displaycustomerfollowupevent();
            })
        api.put('/delivery/updateDeliveryData', {
            params: {
                rowdatadisplayed: rowdatadisplayed
            }
        })
            .then((res) => {
            })
        api.put('/delivery/updaterateofdelivery', {
            params: {
                rowdatadisplayed: rowdatadisplayed
            }
        })
            .then((res) => {
            })
        api.post('/delivery/getstatecodefromdelivery', {
            params: {
                rowdatadisplayed: rowdatadisplayed
            }
        })
            .then((res) => {
                const data = res.data;
                for (var i = 0; i < data.length; i++) {
                    if (data[i].state_code === 29) {
                        api.put('/jointables/updatekarnatakagstrates', {
                            params: {
                                customer_reference_no: data[i].customer_reference_no,
                                product_hsn_code: data[i].product_hsn_code
                            }
                        })
                            .then((res) => {
                            })
                        api.put('/jointables/updatefinalamountdelivery', {
                            params: {
                                rowdatadisplayed: rowdatadisplayed
                            }
                        })
                            .then((res) => {
                            })
                        api.put('/delivery/updatebalanceamountdelivery', {
                            params: {
                                rowdatadisplayed: rowdatadisplayed
                            }
                        })
                            .then((res) => {
                                if (res) {
                                    setpurchasemsgevent("Order Placed Successfully");
                                    // alert(res.msg);
                                    // const res = purchasesuccessmsg({});
                                    handleClose();
                                }
                            })
                    }
                    else {
                        api.put('/delivery/updateotherstatesgstrates', {
                            params: {
                                customer_reference_no: data[i].customer_reference_no,
                                product_hsn_code: data[i].product_hsn_code
                            }
                        })
                            .then((res) => {
                            })
                        api.put('/jointables/updatefinalamountdelivery', {
                            params: {
                                rowdatadisplayed: rowdatadisplayed
                            }
                        })
                            .then((res) => {
                            })
                        api.put('/delivery/updatebalanceamountdelivery', {
                            params: {
                                rowdatadisplayed: rowdatadisplayed
                            }
                        })
                            .then((res) => {
                                if (res) {
                                    setpurchasemsgevent("Order Placed Successfully");
                                    // const res = purchasesuccessmsg({});
                                    // alert(res.msg);
                                    handleClose();
                                }
                            })
                    }
                }
            })
    }
    const changeevent = (event, index) => {
        let updateRowDataByIndex = [...rowdatadisplayed];
        rowdatadisplayed.find((item, i) => {
            if (item.delivery_id === index) {
                updateRowDataByIndex[i][event.target.name] = event.target.value;
                setRowdatadisplayed(() => [...updateRowDataByIndex]);
            }
        })
    }
    return (
        <div>
            <div>
                <CustomizedPrint
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
                {
                    rowdatadisplayed && rowdatadisplayed.length &&
                    rowdatadisplayed.map((data, i) => (
                        <form className="formcontainer">
                            <div className="nameandinputcontainer">
                                <label className="formdatalabelstyle">
                                    <div className="formnamestyle">
                                        Customer Reference Number:
                                    </div>
                                    <div className="formdatainputstyle">
                                        <input
                                            defaultValue={currentCustomerReferenceNo}
                                            type="text"
                                            readOnly
                                        />
                                    </div>
                                </label>
                            </div>
                            <div className="nameandinputcontainer">
                                <label className="formdatalabelstyle">
                                    <div className="formnamestyle">
                                        Booked date:
                                    </div>
                                    <div>
                                        <SelectDate
                                            type="booked_date"
                                            typeOne="booked_date"
                                            incomingdate={
                                                data.booked_date != null
                                                    ? data.booked_date = data.booked_date
                                                    : data.booked_date = data.booked_date
                                            }
                                        />
                                    </div>
                                </label>
                            </div>
                            <div className="nameandinputcontainer">
                                <label className="formdatalabelstyle">
                                    <div className="formnamestyle">
                                        Requested delivery date:
                                    </div>
                                    <div>
                                        <SelectDate
                                            typeOne="requested_delivery_date"
                                            onHandleChangeEvent={(event) => changeevent(event, data.delivery_id)}
                                            incomingdate={
                                                data.requested_delivery_date != null
                                                    ? data.requested_delivery_date = data.requested_delivery_date
                                                    : data.requested_delivery_date = data.requested_delivery_date
                                            }
                                        />
                                    </div>
                                </label>
                            </div>
                            <div className="nameandinputcontainer">
                                <label className="formdatalabelstyle">
                                    <div className="formnamestyle">
                                        Customer Address:
                                    </div>
                                    <div className="formdatainputstyle">
                                        <input
                                            defaultValue={data.customer_address}
                                            name="customer_address"
                                            type="text"
                                            onChange={(event) => changeevent(event, data.delivery_id)}
                                        />
                                    </div>
                                </label>
                            </div>
                            <div className="nameandinputcontainer">
                                <label className="formdatalabelstyle">
                                    <div className="formnamestyle">
                                        State:
                                    </div>
                                    <div className="formdatainputstyle">
                                        <input
                                            defaultValue={data.state}
                                            type="text"
                                            readOnly
                                        />
                                    </div>
                                </label>
                            </div>
                            <div className="nameandinputcontainer">
                                <label className="formdatalabelstyle">
                                    <div className="formnamestyle">
                                        Phone number:
                                    </div>
                                    <div className="formdatainputstyle">
                                        <input
                                            type="number"
                                            name="phone_number"
                                            defaultValue={data.phone_number}
                                            onWheel={(e) => e.target.blur()}
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
                                            type="number"
                                            defaultValue={data.product_hsn_code}
                                            onWheel={(e) => e.target.blur()}
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
                                            type="text"
                                            defaultValue={data.product}
                                            readOnly
                                        />
                                    </div>
                                </label>
                            </div>
                            <div className="nameandinputcontainer">
                                <label className="formdatalabelstyle">
                                    <div className="formnamestyle">
                                        Quantity:
                                    </div>
                                    <div className="formdatainputstyle">
                                        <input
                                            type="number"
                                            name="quantity"
                                            defaultValue={data.quantity}
                                            readOnly
                                        />
                                    </div>
                                </label>
                            </div>
                            <div className="nameandinputcontainer">
                                <label className="formdatalabelstyle">
                                    <div className="formnamestyle">
                                        Product Rate:
                                    </div>
                                    <div className="formdatainputstyle">
                                        <input
                                            type="text"
                                            defaultValue={data.rate}
                                            readOnly
                                        />
                                    </div>
                                </label>
                            </div>
                            <div className="nameandinputcontainer">
                                <label className="formdatalabelstyle">
                                    <div className="formnamestyle">
                                        Discount:
                                    </div>
                                    <div className="formdatainputstyle">
                                        <input
                                            type="text"
                                            defaultValue={data.discount}
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
                                            type="number"
                                            name="extended_discount"
                                            onChange={(event) => changeevent(event, data.delivery_id)}
                                            defaultValue={data.extended_discount}
                                            onWheel={(e) => e.target.blur()}
                                        />
                                    </div>
                                </label>
                            </div>
                            <div className="nameandinputcontainer">
                                <label className="formdatalabelstyle">
                                    <div className="formnamestyle">
                                        CGST:
                                    </div>
                                    <div className="formdatainputstyle">
                                        <input
                                            type="text"
                                            defaultValue={data.cgst}
                                            readOnly
                                        />
                                    </div>
                                </label>
                            </div>
                            <div className="nameandinputcontainer">
                                <label className="formdatalabelstyle">
                                    <div className="formnamestyle">
                                        SGST:
                                    </div>
                                    <div className="formdatainputstyle">
                                        <input
                                            type="text"
                                            defaultValue={data.sgst}
                                            readOnly
                                        />
                                    </div>
                                </label>
                            </div>
                            <div className="nameandinputcontainer">
                                <label className="formdatalabelstyle">
                                    <div className="formnamestyle">
                                        IGST:
                                    </div>
                                    <div className="formdatainputstyle">
                                        <input
                                            type="text"
                                            defaultValue={data.igst}
                                            readOnly
                                        />
                                    </div>
                                </label>
                            </div>
                            <div className="nameandinputcontainer">
                                <label className="formdatalabelstyle">
                                    <div className="formnamestyle">
                                        Rate:
                                    </div>
                                    <div className="formdatainputstyle">
                                        <input
                                            type="text"
                                            defaultValue={data.rate}
                                            readOnly
                                        />
                                    </div>
                                </label>
                            </div>
                            <div className="nameandinputcontainer">
                                <label className="formdatalabelstyle">
                                    <div className="formnamestyle">
                                        Final amount:
                                    </div>
                                    <div className="formdatainputstyle">
                                        <input
                                            type="text"
                                            defaultValue={data.final_amount}
                                            readOnly
                                        />
                                    </div>
                                </label>
                            </div>
                            <div className="nameandinputcontainer">
                                <label className="formdatalabelstyle">
                                    <div className="formnamestyle">
                                        Balance amount:
                                    </div>
                                    <div className="formdatainputstyle">
                                        <input
                                            type="number"
                                            defaultValue={data.balance_amount}
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
                                        Booking advance amount:
                                    </div>
                                    <div className="formdatainputstyle">
                                        <input
                                            type="number"
                                            name="booking_advance_amount"
                                            defaultValue={data.booking_advance_amount}
                                            onChange={(event) => changeevent(event, data.delivery_id)}
                                            onWheel={(e) => e.target.blur()}
                                        />
                                    </div>
                                </label>
                            </div>
                            <div className="divider"></div>
                        </form>
                    ))
                }
            </div>
            {
                finalpurchasestatus == 1
                    ? <p className="verificationstyle">Purchase completed!</p>
                    : <div className="submitcontainee">
                        <CustomizedBtn
                            BtnName="submit"
                            onClick={submiteventclicked}
                        />
                    </div>
            }
        </div>
    )
}
export default AddCustomersForm;