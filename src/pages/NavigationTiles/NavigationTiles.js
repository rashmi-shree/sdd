import React from "react";
import CustomizedCard from '../../components/atoms/CustomizedCard/CustomizedCard';
import ReceiptIcon from '@mui/icons-material/Receipt';
import AddReactionIcon from '@mui/icons-material/AddReaction';
import SummarizeIcon from '@mui/icons-material/Summarize';
import { useNavigate } from 'react-router-dom';
import HeaderWithLogout from '../../pages/Header/HeaderWithLogout';
import '../../style/style.css';

const NavigationTiles = () => {
  let navigate = useNavigate();
  return (
    <nav>
      <div>
        <HeaderWithLogout />
      </div>
      <div className="container">
        <div className="row rowcontainer">
          <div className=" col-md-6 col-sm-6">
            <CustomizedCard
              onClick={() => {
                navigate('/viewinvoice')
              }}
              cardname={<ReceiptIcon className="navigationicon" />}
              cardlabel="View Invoice"
            />
          </div>
          <div className="col-md-6 col-sm-6">
            <CustomizedCard
              onClick={() => {
                navigate('/addcustomerpage')
              }}
              cardlabel="customer management"
              cardname={<AddReactionIcon className="navigationicon" />}
            />
          </div>
          <div className="col-md-6 col-sm-6">
            <CustomizedCard
              onClick={() => {
                navigate('/generateinvoice')
              }}
              cardlabel="generate invoice"
              cardname={<ReceiptIcon className="navigationicon" />}
            />
          </div>
          <div className="col-md-6 col-sm-6">
            <CustomizedCard
              onClick={() => {
                navigate('/generatereport')
              }}
              cardlabel="generate report"
              cardname={<SummarizeIcon className="navigationicon" />}
            />
          </div>
          <div className="col-md-6 col-sm-6">
            <CustomizedCard
              onClick={() => {
                navigate('/generatereport')
              }}
              cardlabel="Employee Management"
              cardname={<SummarizeIcon className="navigationicon" />}
            />
          </div>
        </div>
      </div>
    </nav>
  );
}
export default NavigationTiles;