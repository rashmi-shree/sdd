import React, {useRef } from "react";
import DealersInvoiceFormGenerate from "../DealersInvoiceFormGenerate/DealersInvoiceFormGenerate";
import CustomizedPrint from "../../atoms/CustomizedPrint/CustomizedPrint";
import { useReactToPrint } from "react-to-print";

const FullScreenModalTwo = ({
    api,
    invoiceFormData,
    fetchdealersdatatoverify
}) => {
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });
    return(
        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-fullscreen modal-dialog-scrollable">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Reciept</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div ref={componentRef} class="modal-body">
                    <DealersInvoiceFormGenerate 
                     api={api}
                     fetchdealersdatatoverify={fetchdealersdatatoverify}
                    />
                    </div>
                    <div class="modal-footer">
                        {/* <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button> */}
                        <div>
                            <CustomizedPrint
                                onClick={handlePrint}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default FullScreenModalTwo;