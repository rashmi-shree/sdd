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
import { useState } from 'react';
const api = axios.create({
  baseURL: `http://localhost:3000/`
})
function App() {
  const [logoutbtn, setlogoutbtn] = useState(false);
  const logoutbuttonevent = (e) => {
    setlogoutbtn(e);
  }
  return (
    <Router>
        <Routes>
          <Route path="/" element={<LoginPage 
                                      api={api} 
                                      logoutbuttonevent={logoutbuttonevent}
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
