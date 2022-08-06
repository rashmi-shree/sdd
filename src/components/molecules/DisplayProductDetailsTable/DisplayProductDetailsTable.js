import React,{useState, useEffect} from 'react';
import CustomizedEditIcon from '../../atoms/CustomizedEditIcon/CustomizedEditIcon';
import OpenModal from '../OpenModal/OpenModal';
import CustomizedSearchBar from '../../atoms/CustomizedSearchBar/CustomizedSearchBar';
import CustomizedDeleteIcon from '../../atoms/CustomizedDeleteIcon/CustomizedDeleteIcon';
import CustomizedBtn from '../../atoms/CustomizedBtn/CustomizedBtn';
import axios from 'axios';
import '../../../style/style.css';

const DisplayProductDetailsTable = ({
    currentstatus,  
}) => {
    const [productsdetailsdata, setProductsdetailsdata] = useState({});
    const [filterflag, setfilterflag] = useState(false);
    const [editRow, setEditRow] = useState(null);
    const [rowdata, setrowdata] = useState({});
    const [searchvalue, setSearchvalue] = React.useState('');
    const [changedmodalview, setChangedmodalview] = useState('');
    const [modalview, setmodalview] = useState();
    const [open, setOpen] = useState(false);
    const openevent = (e) =>{
      setOpen(e)
    }
    const [editFormData, setEditFormData] = useState({
        product_hsn_code:"",
        product_name:"",
        product_description:"",
        unit_of_measure:"",
        rate_per_unit:"",
        gst_rate:"",
        product_status:"",
        stock:""
    })
    useEffect(()=>{
        if(filterflag && currentstatus){
            productstatusfilter();
        }
        else {
            displayProductDetailsData();
        }
    },[currentstatus])
    const modalviewchange = () =>{
        setChangedmodalview("addproductform");
    }
    const rowdataevent = (e) => {
        setrowdata(e);
    }
    const displayProductDetailsData = () => {
        axios.get(`http://3.84.110.201:3001/product/displayProductDetailsData`)
        .then((res)=>{
            setProductsdetailsdata(res.data);
            setfilterflag(true);
        })
    }
    useEffect(()=>{
        if (searchvalue === ""){
            displayProductDetailsData();
        }
    },[searchvalue])
    const productstatusfilter = () => {
        axios.post(`http://3.84.110.201:3001/product/productstatusfilter`,{
            params:{
                status:currentstatus
            }
        })
        .then((res)=>{
            setProductsdetailsdata(res.data);
        })
    }
    const editevent = (event, data ) => {
        setEditRow(data.product_hsn_code);
        const formValues = {
            product_hsn_code:data.product_hsn_code,
            product_name:data.product_name,
            product_description:data.product_description,
            unit_of_measure:data.unit_of_measure,
            rate_per_unit:data.rate_per_unit,
            gst_rate:data.gst_rate,
            product_status:data.product_status,
            stock:data.stock
        }
        setEditFormData(formValues);
    }
    const deleteevent = (id) => {
        alert("hi");
        // axios.delete(`http://3.84.110.201:3001/product/deletefromproductdetailstable`, 
        // { 
        //     data: { 
        //         id:id 
        //     }
        //  })
        //  .then((res)=>{
        //         displayProductDetailsData();
        //  })
    }
    const searchHandle = (e) => {
        setSearchvalue(e.target.value);
      }
      const searchclicked = () => {
        axios.post(`http://3.84.110.201:3001/product/getProductDetailsData`,{
            params:{
                product_name:searchvalue,
                product_hsn:searchvalue
            }
        })
        .then((res)=>{
            setProductsdetailsdata(res.data);  
        })
      }
    return(
        <div>
            <OpenModal 
                modalview={modalview}
                open={open}
                openevent={openevent}
                displayProductDetailsData={displayProductDetailsData}
                rowdata={rowdata}
            />
            <CustomizedSearchBar 
            labelname="product name / product hsn"
            Btnname="search"
            onHandleChangeEvent={searchHandle}
            goEventClicked={searchclicked}
            />
            <div className='adddealersbtnstyle'>
                <CustomizedBtn 
                    BtnName="Add Product"
                    onClick={()=>{
                        setmodalview("addproductform");
                        openevent(true);
                    }}
                />
            </div>
            <div className='table-responsive'>
                <form>
                    <table className='table table-striped table-bordered tablebackground'>
                        <thead className='theadalter'>
                            <tr>
                                <th>Product HSN code</th>
                                <th>Product Name</th>
                                <th>Product Description</th>	
                                <th>Unit of Measure</th>
                                <th>Rate per unit (₹)</th>
                                <th>GST Rate (%)</th>
                                <th>Product Status</th>	
                                <th>Product Discount (%)</th>
                                <th>Stock</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                productsdetailsdata && productsdetailsdata.length 
                                ? productsdetailsdata.map((data)=>(
                                    <tr>
                                        <td>{data.product_hsn_code}</td>
                                        <td>{data.product_name}</td>
                                        <td>{data.product_description}</td>
                                        <td>{data.unit_of_measure}</td>
                                        <td>{data.rate_per_unit}</td>
                                        <td>{data.gst_rate}</td>
                                        <td>{data.product_status}</td>
                                        <td>{data.discount}</td>
                                        <td>{data.stock}</td>
                                        <td>
                                            <div className='editdeletecontainer'>
                                                <CustomizedEditIcon 
                                                    onClick={()=>{
                                                        rowdataevent(data);
                                                        setmodalview("productdetailsform");
                                                        openevent(true);
                                                    }}
                                                />
                                                <CustomizedDeleteIcon onClick={()=>(deleteevent(data.product_hsn_code))} />
                                            </div>
                                        </td>
                                    </tr>
                                ))
                                : 
                                    <tr>
                                        <td colSpan={9}>No Record!</td>
                                    </tr>
                            }
                            
                        </tbody>
                    </table>
                </form>
            </div>
        </div>
    );
}
export default DisplayProductDetailsTable;
