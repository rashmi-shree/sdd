import LoginPage from './pages/LoginPage/LoginPage';
import NavigationTiles from './pages/NavigationTiles/NavigationTiles';
import ViewInvoicePage from './pages/ViewInvoicePage/ViewInvoicePage';
import AddCustomerPage from './pages/AddCustomerPage/AddCustomerPage';
import GenerateInvoice from './pages/GenerateInvoice/GenerateInvoice';
import GenerateReport from './pages/GenerateReport/GenerateReport';
import Footer from './pages/Footer/Footer';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import axios from 'axios';
import {useState, useEffect } from 'react';
const api = axios.create({
  baseURL: `http://3.84.110.201:3001/`
})
function App() {
  const [logoutbtn, setlogoutbtn] = useState(false);
  const [isuserloggedin, setisuserloggedin] = useState("no");
  console.log("logoutbtn",logoutbtn);
  const logoutbuttonevent = (e) => {
    setlogoutbtn(e);
  }
  const isuserloggedinevent = () => {
    window.localStorage.setItem('isuserloggedin', isuserloggedin);
  }
  useEffect(() => {
    setlogoutbtn(JSON.parse(window.localStorage.getItem('logoutbtn')));
  }, []);
  useEffect(() => {
    setisuserloggedin(JSON.parse(window.localStorage.getItem('isuserloggedin')));
  }, []);

  useEffect(() => {
    window.localStorage.setItem('logoutbtn', logoutbtn);
  }, [logoutbtn]);
  useEffect(() => {
    window.localStorage.setItem('isuserloggedin', isuserloggedin);
  }, [isuserloggedin]);
  return (
    <Router>
        <Routes>
          <Route path="/" element={<LoginPage 
                                      api={api} 
                                      logoutbuttonevent={logoutbuttonevent}
                                      isuserloggedinevent={isuserloggedinevent}
                                    />
                                  }
          />
          <Route path="/main" element={<NavigationTiles/>}/>
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
                                        />}/>
          <Route path="/generatereport" element={<GenerateReport
                                          api={api}
                                        />}/>
        </Routes>
        <div>
          <Footer />
        </div>
      </Router>
  );
}

export default App;
