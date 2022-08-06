import React, {useRef } from "react";
import AddFewCustomersForm from "../AddFewCustomersForm/AddFewCustomersForm";
import InvoiceFormat from "../InvoiceFormat/InvoiceFormat";
import CustomizedPrint from "../../atoms/CustomizedPrint/CustomizedPrint";
import { useReactToPrint } from "react-to-print";

const FullScreenModal = ({
    api,
    invoiceFormData,
    custrefno,
    openinvoiceevent
}) => {
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });
    return(
        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-fullscreen">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Reciept </h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div ref={componentRef} class="modal-body">
                    <InvoiceFormat
                        api={api}
                        invoiceFormData={invoiceFormData}
                        custrefno={custrefno}
                        openinvoiceevent={openinvoiceevent}
                    />
                    </div>
                    <div class="modal-footer">
                        {/* <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button> */}
                        <div><CustomizedPrint
                    onClick={handlePrint}
                />
                </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default FullScreenModal;