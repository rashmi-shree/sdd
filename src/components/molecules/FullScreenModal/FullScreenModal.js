import React from "react";
import AddFewCustomersForm from "../AddFewCustomersForm/AddFewCustomersForm";
import InvoiceFormat from "../InvoiceFormat/InvoiceFormat";

const FullScreenModal = ({
    api,
    invoiceFormData,
    custrefno,
    openinvoiceevent
}) => {
    return(
        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-fullscreen">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Tax Invoice</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                    <InvoiceFormat
                        api={api}
                        invoiceFormData={invoiceFormData}
                        custrefno={custrefno}
                        openinvoiceevent={openinvoiceevent}
                    />
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default FullScreenModal;