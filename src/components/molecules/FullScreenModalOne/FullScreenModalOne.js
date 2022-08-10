import React from "react";
import DealersInvoicesListForm from "../DealersInvoicesListForm/DealersInvoicesListForm";

const FullScreenModalOne = ({
    api,
    deliveryinvoices
}) => {
    return(
        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-fullscreen modal-dialog-scrollable">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">View Invoices </h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                    <DealersInvoicesListForm 
                        api={api}
                        deliveryinvoices={deliveryinvoices}
                        // handleClose={handleClose}
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
export default FullScreenModalOne;