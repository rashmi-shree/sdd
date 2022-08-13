import React, { useState } from "react";
import CustomizedSearchBar from '../../components/atoms/CustomizedSearchBar/CustomizedSearchBar';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import OpenModal from '../../components/molecules/OpenModal/OpenModal';
import { useNavigate } from 'react-router-dom';
import HeaderWithLogout from '../../pages/Header/HeaderWithLogout';
import CustomizedBtn from "../../components/atoms/CustomizedBtn/CustomizedBtn";
import moment from 'moment';
import FullScreenModal from "../../components/molecules/FullScreenModal/FullScreenModal";
import '../../style/style.css';
import Button from '@mui/material/Button';

const ViewInvoicePage = ({
    api
}) => {
    const [invoiceData, setInvoiceData] = useState([]);
    const [invoiceFormData, setInvoiceFormData] = useState([]);
    const [searchData, setSearchData] = useState('');
    const [modalview, setModalview] = useState('');
    const [open, setOpen] = useState(false);
    const openevent = (e) =>{
      setOpen(e)
    }
    let navigate = useNavigate();
    const onHandleChangeEvent = (event) => {
        setSearchData(event.target.value);
    }
    const goEventClicked = () => {
        api.post('/delivery/getInvoices', {
            params: {
                searchData
            }
        }
        )
        .then((res) => {
            setInvoiceData(res.data);
        })
    }
    const openinvoiceevent = (invoiceNo) => {
        api.post('/delivery/getDeliveryReportData', {
            params: {
                invoiceNo
            }
        }
        )
            .then((res) => {
                setInvoiceFormData(res.data);
            })
    }
    return (
        <div>
            <div>
                <HeaderWithLogout />
            </div>
            <OpenModal
                api={api}
                modalview={modalview}
                open={open}
                openevent={openevent}
                invoiceFormData={invoiceFormData}
            />
            <div className="viewInvoicePageContainer">
                <div className="pageheading">
                    View Your Invoices
                </div>
                <CustomizedSearchBar
                    onHandleChangeEvent={onHandleChangeEvent}
                    type="search"
                    goEventClicked={goEventClicked}
                    labelname="phone number / Invoice Number"
                    Btnname="search"
                />
                <div className="displayContainer">
                    <div className="backarrow">
                        <p
                            onClick={() => {
                                navigate("/main");
                            }}
                        ><ArrowBackIcon /></p>
                    </div>
                    <div className="table-responsive">
                        {
                            invoiceData.length != 0 &&
                            <table className="table table-striped table-bordered">
                                <thead className="theadalter">
                                    <tr>
                                        <th>Invoice date</th>
                                        <th>Invoice no</th>
                                        <th>Customer name</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        invoiceData.map((data, i) => (
                                            <tr key={i}>
                                                <td>
                                                    {
                                                        data.delivery_date != null ?
                                                        moment(data.delivery_date).format('YYYY-MM-DD'):
                                                        data.delivery_date
                                                    }
                                                </td>
                                                <td>{data.invoice_no}</td>
                                                <td>{data.customer_name}</td>
                                                <td>
                                                <div className='btnstyle'>
                                                    <Button 
                                                        id="btn"
                                                        // type="button" 
                                                        data-bs-toggle="modal"
                                                        data-bs-target="#exampleModal"
                                                        onClick={()=>{
                                                            openinvoiceevent(data.invoice_no);
                                                        }}
                                                        // class="btnstyle"
                                                        >
                                                            View Invoice
                                                    </Button>
                                                </div>
                                                    <FullScreenModal 
                                                       api={api}
                                                    //    modalview={modalview}
                                                    //    open={open}
                                                    //    openevent={openevent}
                                                       invoiceFormData={invoiceFormData}                                                    />
                                                {/* <CustomizedBtn 
                                                    BtnName="View Invoice"
                                                    onClick={()=>{
                                                        openinvoiceevent(data.invoice_no);
                                                        setModalview("invoiceformat");
                                                        openevent(true);
                                                    }}
                                                /> */}
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        }
                    </div>
                    {
                        invoiceData.length === 0 &&
                        <p> no data found! </p>
                    }
                </div>
            </div>
        </div>
    );
}
export default ViewInvoicePage;