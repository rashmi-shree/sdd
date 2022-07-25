import React, { useEffect, useState, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import CustomizedPrint from "../../atoms/CustomizedPrint/CustomizedPrint";
import { ToWords } from 'to-words';
import moment from 'moment';
import '../../../style/style.css';

const InvoiceFormat = ({
    invoiceFormData
}) => {
    const [constantinvoicedata, setconstantinvoicedata] = useState();
    const [totalamount, settotalamount] = useState();
    const [totalinwords, settotalinwords] = useState();
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });
    const toWords = new ToWords();
    useEffect(() => {
        if (invoiceFormData) {
            const tempdata = [...new Set(invoiceFormData.map((e) => e.customer_reference_no))];
            tempdata.map((temp) => {
                let filterByTempData = invoiceFormData.filter(dataObject => dataObject.customer_reference_no === temp)
                var fixedstrings = filterByTempData[0];
                setconstantinvoicedata(fixedstrings);
                let temptotal = 0;
                invoiceFormData.map((data) => temptotal = temptotal + data.final_amount);
                settotalamount(temptotal);
                let words = toWords.convert(temptotal);
                settotalinwords(words);
            })
        }
    }, [invoiceFormData])
    return (
        <div className="invoiceformatcontainer">
            <div className="invoiceheader">
                <div><CustomizedPrint
                    onClick={handlePrint}
                />
                </div>
            </div>
            <div className="table-responsive" id="tableprint" >
                {
                    constantinvoicedata
                        ?
                        <div ref={componentRef}>
                            <table className="tbl">
                                <thead>
                                    <tr>
                                        <th colspan="6" scope="col">
                                            <div className="theaddiv">
                                                <h6>TAX INVOICE</h6>
                                                <h5><bold>SHREE PARAMANANDA ENTERPRISES</bold></h5>
                                                <p>Shop #05,Medhini Arcade,Kithaganahalli Gate,Opp Anna Building,Hosur Main Road Bangalore-560099,Mobile: 9035757145/9902880851/9141070705</p>
                                                <p>Email ID:shreeparamananda@gmail.com</p>
                                                <p>GSTIN/UIN:29AYSPB6397D1ZX,{constantinvoicedata.state} State Code:{constantinvoicedata.state_code}</p>
                                            </div>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td rowSpan="3">Buyer:</td>
                                        <td rowSpan="3">{constantinvoicedata.customer_address}
                                        </td>
                                        <td colspan="3">Invoice No:</td>
                                        <td colspan="7">{constantinvoicedata.invoice_no}</td>
                                    </tr>
                                    <tr>
                                        <td colspan="3">Date of supply:-</td>
                                        <td colspan="7">
                                            {constantinvoicedata.delivery_date != null ?
                                             moment(constantinvoicedata.delivery_date).format('YYYY-MM-DD'):
                                             constantinvoicedata.delivery_date
                                            }
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colspan="3">PO no:</td>
                                        <td colspan="7">{constantinvoicedata.po_number}</td>
                                    </tr>
                                    <tr>
                                        <td>GSTIN/UIN:</td>
                                        <td>{constantinvoicedata.gst}</td>
                                        <td colspan="3">Vehicle No:</td>
                                        <td colspan="7">{constantinvoicedata.vehicle_number}</td>
                                    </tr>
                                    <tr>
                                        <td>State Code:</td>
                                        <td>{constantinvoicedata.state_code}</td>
                                        <td colspan="3">Pan Number:</td>
                                        <td colspan="7">pan 567jkhasdfkj67rt8</td>
                                    </tr>
                                    <tr>
                                        <td>Place of supply : </td>
                                        <td colspan="11">{constantinvoicedata.state}</td>
                                    </tr>
                                    <tr>
                                        <td>Contact NO :</td>
                                        <td colspan="2">{constantinvoicedata.phone_number} </td>
                                        <td colspan="4">{constantinvoicedata.phone_number} </td>
                                        <td colspan="4">{constantinvoicedata.phone_number} </td>
                                    </tr>
                                    <tr>
                                        <td>Sl</td>
                                        <td>Discription of Product</td>
                                        <td>HSN CODE</td>
                                        <td>Qty</td>
                                        <td>Rate</td>
                                        <td>Amount</td>
                                        <td>CGST</td>
                                        <td>SGST</td>
                                        <td>IGST</td>
                                        <td>Discount</td>
                                    </tr>
                                    {
                                        invoiceFormData && invoiceFormData.length &&
                                        invoiceFormData.map((d, index) => (
                                            <tr>
                                                <td >{index + 1}</td>
                                                <td >{d.product}</td>
                                                <td >{d.product_hsn_code}</td>
                                                <td >{d.quantity}</td>
                                                <td >{d.rate/d.quantity}</td>
                                                <td >{d.rate}</td>
                                                <td >{d.cgst}</td>
                                                <td >{d.sgst}</td>
                                                <td >{d.igst}</td>
                                                <td >{d.discount}</td>
                                            </tr>
                                        ))
                                    }
                                    <tr>
                                        <td colspan="3">Total</td>
                                        <td colspan="7">{totalamount}</td>
                                    </tr>
                                    <tr>
                                        <td colspan="3" rowSpan="5">
                                            Terms &Conditions :
                                            <ol>
                                                <li>Payment only by DD/CHQ,In faver of Shree Paramananda Enterprises</li>
                                                <li>In Case of Cash payment contact the above phone number Before Making Payment</li>
                                                <li>Goods once sold Cannot return Back</li>
                                            </ol>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colSpan="4">Round off:</td>
                                        <td colspan="3">{Math.round(totalamount)}</td>
                                    </tr>
                                    <tr>
                                        <td colSpan="4">TOTAL:</td>
                                        <td colspan="3">{Math.round(totalamount)}</td>
                                    </tr>
                                    <tr>
                                        <td colSpan="4">Final Payble Amount :- </td>
                                        <td colSpan="3">{Math.round(totalamount)}</td>
                                    </tr>
                                    <tr>
                                        <td colSpan="1">Amount in Words: </td>
                                        <td colSpan="6">Rupees {totalinwords} Only</td>
                                    </tr>
                                    <tr>
                                        <td colSpan="3">Received The goods in good condition </td>
                                        <td colSpan="7">certified that the particulars given above are true and correct For Shree Paramananda Enterprises</td>
                                    </tr>
                                    <tr>
                                        <td colSpan="3">Receivers Signature: </td>
                                        <td colSpan="7">Authorised Signatory:</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        : <></>
                }
            </div>
        </div>
    );
}
export default InvoiceFormat;