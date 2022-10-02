import React from "react";
import RoutingPage from "./pages/RoutingPage/RoutingPage";
// import LoginPage from './pages/LoginPage/LoginPage';
// import NavigationTiles from './pages/NavigationTiles/NavigationTiles';
// import ViewInvoicePage from './pages/ViewInvoicePage/ViewInvoicePage';
// import AddCustomerPage from './pages/AddCustomerPage/AddCustomerPage';
// import GenerateInvoice from './pages/GenerateInvoice/GenerateInvoice';
// import GenerateReport from './pages/GenerateReport/GenerateReport';
// import EmployeeManagementPage from './pages/EmployeeManagementPage/EmployeeManagementPage';
// import Footer from './pages/Footer/Footer';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
// import axios from 'axios';
// import { useState, useEffect } from 'react';
// const api = axios.create({
//   baseURL: `http://3.84.110.201:3001/`
// })
function App() {
  // const [logoutbtn, setlogoutbtn] = useState(false);
  // console.log("logoutbtn", logoutbtn);
  // const logoutbuttonevent = (e) => {
  //   setlogoutbtn(e);
  // }
  // useEffect(() => {
  //   setlogoutbtn(JSON.parse(window.localStorage.getItem('logoutbtn')));
  // }, []);
  // useEffect(() => {
  //   window.localStorage.setItem('logoutbtn', logoutbtn);
  // }, [logoutbtn]);
  
  return (
    <Router>
      <RoutingPage />
    </Router>
    // <Router>
    //   <Routes>
    //     <Route path="/" element={<LoginPage
    //       api={api}
    //       logoutbuttonevent={logoutbuttonevent}
    //     />
    //     }
    //     />
    //     <Route path="/main" element={<NavigationTiles
    //     />}
    //     />
    //     <Route path="/viewinvoice" element={<ViewInvoicePage
    //       api={api}
    //     />}
    //     />
    //     <Route path="/addcustomerpage" element={<AddCustomerPage
    //       api={api}
    //     />}
    //     />
    //     <Route path="/generateinvoice" element={<GenerateInvoice
    //       api={api}
    //     />} />
    //     <Route path="/generatereport" element={<GenerateReport
    //       api={api}
    //     />} />
    //     <Route path="/employeemanagement" element={<EmployeeManagementPage
    //       api={api}
    //     />} />
    //   </Routes>
    //   <div>
    //     <Footer />
    //   </div>
    // </Router>
  );
}
export default App;