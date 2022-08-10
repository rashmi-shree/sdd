import React, { useEffect, useState } from "react";
import OpenModal from "../../molecules/OpenModal/OpenModal";
import CustomizedBtn from "../../atoms/CustomizedBtn/CustomizedBtn";
import FullScreenModal from "../FullScreenModal/FullScreenModal";
import '../../../style/style.css';
const DealersInvoicesListForm = ({
    deliveryinvoices,
    api
}) => {
    const [fetchdealersdatatoverify, setfetchdealersdatatoverify] = useState();
    const [verificationstatus, setverificationstatus] = useState();
    const [currentInvoiceno, setcurrentInvoiceno] = useState();
    const [modalview, setModalview] = useState('');
    const [open, setOpen] = useState(false);
    console.log("deliveryinvoices", deliveryinvoices);
    const openevent = (e) => {
        setOpen(e)
    }
    const currentInvoicenoevent = (e) => {
        setcurrentInvoiceno(e);
    }
    const fetchdealersdatatoverifyevent = (e) => {
        api.post('delivery/fetchdealersdatatoverify', {
            params: {
                invoice_no: e
            }
        })
            .then((res) => {
                const fetchdealersdatatoverify = res.data;
                api.put('jointables/updaterateofdeliverytableonbook', {
                    params: {
                        data: fetchdealersdatatoverify
                    }
                })
                    .then((res) => {
                    })
                api.post('delivery/getstatecodefromdeliverytableonbook', {
                    params: {
                        data: fetchdealersdatatoverify
                    }
                })
                    .then((res) => {
                        var data = res.data;
                        for (var i = 0; i < data.length; i++) {
                            if (data[i].state_code === 29) {
                                api.put('jointables/updatekarnatakagstratesdeliverytableonbook', {
                                    params: {
                                        data: fetchdealersdatatoverify
                                    }
                                })
                                    .then((res) => {
                                    })
                                api.put('jointables/updatefinalamountdeliverytableonbook', {
                                    params: {
                                        data: fetchdealersdatatoverify
                                    }
                                })
                                api.put('/jointables/updatebalanceamountdeliverytableonbook', {
                                    params: {
                                        data: fetchdealersdatatoverify
                                    }
                                })
                                api.put('/jointables/updatepaymentstatusdeliverytableonbook', {
                                    params: {
                                        data: fetchdealersdatatoverify
                                    }
                                })
                            }
                            else {
                                api.put('jointables/updateotherstatesgstratesdeliverytableonbook', {
                                    params: {
                                        data: fetchdealersdatatoverify
                                    }
                                })
                                    .then((res) => {
                                    })
                                api.put('jointables/updatefinalamountdeliverytableonbook', {
                                    params: {
                                        data: fetchdealersdatatoverify
                                    }
                                })
                                api.put('/jointables/updatebalanceamountdeliverytableonbook', {
                                    params: {
                                        data: fetchdealersdatatoverify
                                    }
                                })
                                api.put('/jointables/updatepaymentstatusdeliverytableonbook', {
                                    params: {
                                        data: fetchdealersdatatoverify
                                    }
                                })
                            }
                        }
                    })
                alert("Updated Successfully");
            })
    }
    const updatedownloadinvoiceevent = (e) =>{
        api.post('delivery/fetchdealersdatatoverify', {
            params: {
                invoice_no: e
            }
        })
        .then((res) => {
            setfetchdealersdatatoverify(res.data);
        })
    }
    // useEffect(() => {
    //     if (fetchdealersdatatoverify) {
    //         api.put('jointables/updaterateofdeliverytableonbook', {
    //             params: {
    //                 data: fetchdealersdatatoverify
    //             }
    //         })
    //             .then((res) => {
    //             })
    //         api.post('delivery/getstatecodefromdeliverytableonbook', {
    //             params: {
    //                 data: fetchdealersdatatoverify
    //             }
    //         })
    //             .then((res) => {
    //                 var data = res.data;
    //                 for (var i = 0; i < data.length; i++) {
    //                     if (data[i].state_code === 29) {
    //                         api.put('jointables/updatekarnatakagstratesdeliverytableonbook', {
    //                             params: {
    //                                 data: fetchdealersdatatoverify
    //                             }
    //                         })
    //                             .then((res) => {
    //                             })
    //                         api.put('jointables/updatefinalamountdeliverytableonbook', {
    //                             params: {
    //                                 data: fetchdealersdatatoverify
    //                             }
    //                         })
    //                         api.put('/jointables/updatebalanceamountdeliverytableonbook',{
    //                             params:{
    //                               data:fetchdealersdatatoverify
    //                             }
    //                           })
    //                           api.put('/jointables/updatepaymentstatusdeliverytableonbook',{
    //                             params:{
    //                               data:fetchdealersdatatoverify
    //                             }
    //                           })
    //                     }
    //                     else {
    //                         api.put('jointables/updateotherstatesgstratesdeliverytableonbook', {
    //                             params: {
    //                                 data: fetchdealersdatatoverify
    //                             }
    //                         })
    //                             .then((res) => {
    //                             })
    //                         api.put('jointables/updatefinalamountdeliverytableonbook', {
    //                             params: {
    //                                 data: fetchdealersdatatoverify
    //                             }
    //                         })
    //                         api.put('/jointables/updatebalanceamountdeliverytableonbook',{
    //                             params:{
    //                               data:fetchdealersdatatoverify
    //                             }
    //                           })
    //                           api.put('/jointables/updatepaymentstatusdeliverytableonbook',{
    //                             params:{
    //                               data:fetchdealersdatatoverify
    //                             }
    //                           })
    //                     }
    //                 }
    //             })
    //     }
    // }, [fetchdealersdatatoverify])
    const fetchverificationstatusevent = (e) => {
        api.post('delivery/getverificationstatus', {
            params: {
                invoice_no: e
            }
        })
            .then((res) => {
                setverificationstatus(res.data);
            })
    }
    return (
        <div>
            <OpenModal
                api={api}
                modalview={modalview}
                open={open}
                openevent={openevent}
                currentInvoiceno={currentInvoiceno}
                verificationstatus={verificationstatus}
                fetchdealersdatatoverify={fetchdealersdatatoverify}
            />
            <div className='table-responsive'>
                <table className="table table-striped table-bordered ">
                    <thead className="theadalter">
                        <tr>
                            <th>Invoices List</th>
                            <th>Action</th>
                            <th>Generate</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            deliveryinvoices && deliveryinvoices.length
                                ? deliveryinvoices.map((data) => (
                                    <tr>
                                        <td>{data.invoice_no}</td>
                                        <td>{
                                            data.purchase_status == 1
                                                ?
                                                <CustomizedBtn
                                                    BtnName="View"
                                                    onClick={() => {
                                                        // fetchdealersdatatoverifyevent(data.invoice_no);
                                                        fetchverificationstatusevent(data.invoice_no);
                                                        currentInvoicenoevent(data.invoice_no);
                                                        setModalview("dealersdetailsform");
                                                        openevent(true);
                                                    }}
                                                />
                                                :
                                                <div className="btndesign">
                                                    <span className="cbtn"><CustomizedBtn
                                                        BtnName="Update Invoice"
                                                        onClick={() => {
                                                            fetchdealersdatatoverifyevent(data.invoice_no);
                                                        }}
                                                    />
                                                    </span>
                                                    <span className="cbtn"><CustomizedBtn
                                                        BtnName="Verify Invoice"
                                                        onClick={() => {
                                                            // fetchdealersdatatoverifyevent(data.invoice_no);
                                                            fetchverificationstatusevent(data.invoice_no);
                                                            currentInvoicenoevent(data.invoice_no);
                                                            setModalview("dealersdetailsform");
                                                            openevent(true);
                                                        }}
                                                    />
                                                    </span>
                                                </div>
                                        }
                                        </td>
                                        <td>
                                            <CustomizedBtn
                                                BtnName="Download Invoice"
                                                onClick={() => {
                                                    updatedownloadinvoiceevent(data.invoice_no);
                                                    setModalview("DealersInvoiceFormGenerateFormat");
                                                    openevent(true);
                                                }}
                                            />
                                        </td>
                                    </tr>
                                ))
                                :
                                <tr>
                                    <td colSpan={3}>No Record!</td>
                                </tr>
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
}
export default DealersInvoicesListForm;