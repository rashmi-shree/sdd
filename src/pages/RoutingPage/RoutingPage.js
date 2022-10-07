import React from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route
  } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';
import LoginPage from '../LoginPage/LoginPage';
import NavigationTiles from '../NavigationTiles/NavigationTiles';
import ViewInvoicePage from '../ViewInvoicePage/ViewInvoicePage';
import AddCustomerPage from "../AddCustomerPage/AddCustomerPage";
import GenerateInvoice from '../GenerateInvoice/GenerateInvoice';
import GenerateReport from '../GenerateReport/GenerateReport';
import EmployeeManagementPage from '../EmployeeManagementPage/EmployeeManagementPage';
import Footer from '../Footer/Footer';
import { useNavigate } from 'react-router-dom';

const RoutingPage = () => {
    let navigate = useNavigate();
    // const [user, setuser] = useState({});
    // const userevent = (e) => {
    //     setuser(e);
    // }
    // console.log("user",user);
    // useEffect(()=>{
    //     console.log("user",user);
    // navigate('/')
    // },[])
    const api = axios.create({
        baseURL: `http://3.84.110.201:3001/`
      })
      const [logoutbtn, setlogoutbtn] = useState(false);
  const logoutbuttonevent = (e) => {
    setlogoutbtn(e);
  }
  useEffect(() => {
    setlogoutbtn(JSON.parse(window.localStorage.getItem('logoutbtn')));
  }, []);
  useEffect(() => {
    window.localStorage.setItem('logoutbtn', logoutbtn);
  }, [logoutbtn]);
    return(
    //    <Router>
    <div>
    <>
      <Routes>
        <Route path="/" element={<LoginPage
          api={api}
          logoutbuttonevent={logoutbuttonevent}
        //   userevent={userevent}
        />
        }
        />
        <Route path="/main" element={<NavigationTiles
        />}
        />
        <Route path="/viewinvoice" element={<ViewInvoicePage
          api={api}
        />}
        />
        <Route path="/addcustomerpage" element={<AddCustomerPage
          api={api}
        />}
        />
        <Route path="/generateinvoice" element={<GenerateInvoice
          api={api}
        />} />
        <Route path="/generatereport" element={<GenerateReport
          api={api}
        />} />
        <Route path="/employeemanagement" element={<EmployeeManagementPage
          api={api}
        />} />
      </Routes>
      <div>
        <Footer />
      </div>
      </>
      </div>
    // </Router>
    
    );
}
export default RoutingPage;