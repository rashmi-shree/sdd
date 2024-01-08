import React from "react";
import {
    Routes,
    Route
  } from 'react-router-dom';
import axios from 'axios';
import LoginPage from '../LoginPage/LoginPage';
import NavigationTiles from '../NavigationTiles/NavigationTiles';
import ViewInvoicePage from '../ViewInvoicePage/ViewInvoicePage';
import AddCustomerPage from "../AddCustomerPage/AddCustomerPage";
import GenerateInvoice from '../GenerateInvoice/GenerateInvoice';
import GenerateReport from '../GenerateReport/GenerateReport';
import EmployeeManagementPage from '../EmployeeManagementPage/EmployeeManagementPage';
import Footer from '../Footer/Footer';

const RoutingPage = () => {
    const api = axios.create({
      // production
        baseURL: `http://51.20.133.36:5001/`,
        // localhost
        // baseURL: `http://localhost:5001/`
      })
    return(
    <div>
    <>
      <Routes>
        <Route path="/" element={<LoginPage
          api={api}
        />
        }
        />
        <Route path="/main" element={<NavigationTiles
        api={api}
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
    );
}
export default RoutingPage;