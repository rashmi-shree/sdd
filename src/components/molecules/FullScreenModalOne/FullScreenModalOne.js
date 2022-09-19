import React from "react";
import AddCustomersForm from "../AddCustomersForm/AddCustomersForm";

const FullScreenModalOne = ({
    setpurchasemsgevent,
    api,
    purchasestatus,
    bookingstatus,
    displayCustomerFollowUpData,
    currentCustomerReferenceNo,
    displaycustomerfollowupevent
}) => {
    return(
        <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-fullscreen modal-dialog-scrollable">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">View Invoices </h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <h1>body</h1>
                        <AddCustomersForm
                            setpurchasemsgevent={setpurchasemsgevent}
                            api={api}
                            purchasestatus={purchasestatus}
                            bookingstatus={bookingstatus}
                            // handleClose={handleClose}
                            displayCustomerFollowUpData={displayCustomerFollowUpData}
                            currentCustomerReferenceNo={currentCustomerReferenceNo}
                            displaycustomerfollowupevent={displaycustomerfollowupevent}
                        />
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default FullScreenModalOne;