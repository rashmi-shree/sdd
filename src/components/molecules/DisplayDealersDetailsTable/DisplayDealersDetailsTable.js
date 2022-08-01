import React,{useState, useEffect} from "react";
import CustomizedSearchBar from "../../atoms/CustomizedSearchBar/CustomizedSearchBar";
import OpenModal from '../OpenModal/OpenModal';
import CustomizedEditIcon from "../../atoms/CustomizedEditIcon/CustomizedEditIcon";
import CustomizedDeleteIcon from "../../atoms/CustomizedDeleteIcon/CustomizedDeleteIcon";
import CustomizedBtn from "../../atoms/CustomizedBtn/CustomizedBtn";
import '../../../style/style.css';

const DisplayDealersDetailsTable = ({
    currentstatus,
    api
}) => {
    const [dealersdetailsdata, setDealersdetailsdata] = useState({});
    const [filterflag, setfilterflag] = useState(false);
    const [rowdata, setrowdata] = useState({});
    const [searchvalue, setSearchvalue] = React.useState('');
    const [changedmodalview, setChangedmodalview] = useState('');
    const [modalview, setmodalview] = useState();
    const [open, setOpen] = useState(false);
    const openevent = (e) =>{
      setOpen(e)
    }
    useEffect(()=>{
        if(filterflag && currentstatus){
            gstinstatusfilterdealersdata();
        }else {
            displayDealersDetailsData();
        }
    },[currentstatus])
    const rowdataevent = (e) => {
        setrowdata(e);
    }
    const displayDealersDetailsData = () => {
        api.get('dealers/displayDealersDetailsData')
        .then((res)=>{
            setDealersdetailsdata(res.data);
            setfilterflag(true);
        })
    }
    useEffect(()=>{
        if (searchvalue === ""){
            displayDealersDetailsData();
        }
    },[searchvalue])
    const gstinstatusfilterdealersdata = () => {
        api.post('dealers/gstinstatusfilterdealersdata',{
            params:{
                status:currentstatus
            }
        })
        .then((res)=>{
            setDealersdetailsdata(res.data);
        })
    }
    const searchHandle = (e) => {
        setSearchvalue(e.target.value);
      }
      const modalviewchange = () =>{
        setChangedmodalview("adddealersform");
    }
      const searchclicked = () => {
        api.post('dealers/gstinstatusfilterdealersdata',{
            params:{
                proprietor_name:searchvalue,
                proprietor_phone_number:searchvalue
            }
        })
        .then((res)=>{
            setDealersdetailsdata(res.data);
        })
      }
      const deleteevent = (id) => {
        api.delete(`http://3.84.110.201:3001/dealers/deletefromdealersdetailstable`, 
        { 
            data: { 
                id:id 
            }
         })
         .then((res)=>{
            displayDealersDetailsData();
         })
    }
    return(
        <div>
             <OpenModal 
                api={api}
                modalview={modalview}
                open={open}
                openevent={openevent}
                displayDealersDetailsData={displayDealersDetailsData}
                rowdata={rowdata}
            />
            <CustomizedSearchBar 
            labelname="proprietor name /proprietor phone number"
            Btnname="search"
            onHandleChangeEvent={searchHandle}
            goEventClicked={searchclicked}
            />
            <div className="adddealersbtnstyle">
                <CustomizedBtn 
                    BtnName="Add Dealers"
                    onClick={()=>{
                        setmodalview("adddealersform");
                        openevent(true);
                    }}
                />
            </div>
            <div className='table-responsive'>
                <table className="table table-striped table-bordered tablebackground">
                    <thead className="theadalter">
                        <tr>
                            <th>GSTIN Number</th>
                            <th>Enterprise Name</th>
                            <th>Enterprise Address</th>
                            <th>Proprietor Name</th>
                            <th>Proprietor Phone Number</th>
                            <th>GSTIN Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            dealersdetailsdata && dealersdetailsdata.length 
                            ?  dealersdetailsdata.map((data, i)=> (
                            <tr key={i}>
                                <td>{data.gstin_number}</td>
                                <td>{data.enterprise_name}</td>
                                <td>{data.enterprise_address}</td>
                                <td>{data.proprietor_name}</td>
                                <td>{data.proprietor_phone_number}</td>
                                <td>{data.gstin_status}</td>
                                <td>
                                    <div className="editdeletecontainer">
                                        <CustomizedEditIcon
                                            onClick={()=>{
                                                rowdataevent(data);
                                                setmodalview("editdealersreport");
                                                openevent(true);
                                            }}
                                        />
                                        <CustomizedDeleteIcon onClick={()=>(deleteevent(data.gstin_number))} />
                                    </div>
                                </td>
                            </tr>
                            ))
                            : 
                                <tr>
                                    <td colSpan={7}>No Record!</td>
                                </tr>
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
}
export default DisplayDealersDetailsTable;