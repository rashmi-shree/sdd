import React from "react";
import DealersInvoiceFormGenerate from "../DealersInvoiceFormGenerate/DealersInvoiceFormGenerate";
const FullScreenModalTwo = ({
    api,
    invoiceFormData,
    fetchdealersdatatoverify
}) => {
    return(
        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-fullscreen modal-dialog-scrollable">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Download Invoices </h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                    <DealersInvoiceFormGenerate 
                     api={api}
                     fetchdealersdatatoverify={fetchdealersdatatoverify}
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
export default FullScreenModalTwo;