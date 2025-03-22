import StdRegister from './components/StdRegister';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Login from './components/Login';
import { Navbar } from './components/Navbar'; // Admin Navbar
import { StdNavbar } from './components/StdNavbar'; // Student Navbar
import { SnackbarProvider } from 'notistack';
import Register from './components/Register';
import OtpVerify from './components/OtpVerify';
import StdOtpVerify from './components/StdOtpVerify';
import { AdminHome } from './components/AdminHome';
import { Profile } from './components/Profile';
import { Fess } from './components/Fess';
import { StdDetails } from './components/StdDetails';
import { OutPass } from './components/OutPass';
import { StdOutPass } from './components/StdOutpass';
import { OutpassView } from './components/OutpassView';
import { Approval } from './components/Approval';
import { StdUpdates } from './components/StdUpdates';
import { StdComplaint } from './components/StdComplaint';
import { Complaintall } from './components/Complaintall';
import { FeesViews } from './components/FeesViews';
import { UpdateFess } from './components/UpdateFees';
import { StdFessview } from './components/StdFessview';
import { MyDetails } from './components/MyDetails';
import { Inactive } from './components/Inactive';
import { Online } from './components/Online';
import Contact from './components/Contact';
import { About } from './components/About';
import Stdadminreg from './components/Stdadminreg';
import { StdOutPassView } from './components/StdOutPassView';
import { DownloadStdFees } from './components/DownloadStdFees';
import { RoomList } from './components/RoomList';
import { Footer } from './components/Footer';
import { AdminStdOtpVerify } from './components/AdminStdOtpVerify';

// Define admin and student routes
const adminRoutes = [
  '/adminhome',
  '/fees',
  '/stddetails',
  '/update/:id',
  '/addadmin',
  '/adminoutpass',
  '/stdoutpassview',
  '/approvaloutpass',
  '/allcomplaints',
  '/allfesspayments',
  '/updatefess/:id',
  '/inactive/:id',
  '/stdreg',
  '/roomallocation',
  '/downloadadminfess/:id'
];

const studentRoutes = [
  '/stdnavbar',
  '/requeststdoutpass',
  '/stdcomplaints',
  '/fessstatement',
  '/stdhome',
  '/mydetails',
  '/contact',
  '/about',
  '/stdoutview',
  '/downloadstdfess/:id'
];

function AppContent() {
  const location = useLocation();


  const isAdminRoute = adminRoutes.some((route) =>
    location.pathname.startsWith(route.replace(':id', ''))
  );
  const isStudentRoute = studentRoutes.some((route) =>
    location.pathname.startsWith(route.replace(':id', ''))
  );

  return (
    <>

      {isAdminRoute && <Navbar />}
    
      {isStudentRoute && <StdNavbar />}
      <Routes>
        {/* Login and Registration */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<StdRegister />} />
        <Route path="/reg" element={<StdRegister />} />
        <Route path="/stdotp" element={<StdOtpVerify />} />
        <Route path="/adminreg" element={<Register />} />
        <Route path="/otp" element={<OtpVerify />} />
        <Route path="/adminstdotp" element={<AdminStdOtpVerify />} />


        {/* Student Routes */}
        <Route path="/stdnavbar" element={<StdNavbar />} />
        <Route path="/stdoutview" element={<StdOutPassView />} />
        <Route path="/requeststdoutpass" element={<StdOutPass />} />
        <Route path="/stdcomplaints" element={<StdComplaint />} />
        <Route path="/fessstatement" element={<StdFessview />} />
        <Route path="/stdhome" element={<Profile />} />
        <Route path="/mydetails" element={<MyDetails />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About/>} />
        <Route path="/roomallocation" element={<RoomList/>} />
        <Route path="/downloadstdfess/:id" element={<DownloadStdFees/>} />
        

        {/* Admin Routes */}
        <Route path="/adminhome" element={<AdminHome />} />
        <Route path="/fees" element={<Fess />} />
        <Route path="/stddetails" element={<StdDetails />} />
        <Route path="/update/:id" element={<StdUpdates />} />
        <Route path="/addadmin" element={<Register />} />
        <Route path="/adminoutpass" element={<OutPass />} />
        <Route path="/stdoutpassview" element={<OutpassView />} />
        <Route path="/approvaloutpass" element={<Approval />} />
        <Route path="/allcomplaints" element={<Complaintall />} />
        <Route path="/allfesspayments" element={<FeesViews />} />
        <Route path="/updatefess/:id" element={<UpdateFess />} />
        <Route path='/inactive/:id' element={<Inactive/>}/>
        <Route path='/stdreg' element={<Stdadminreg/>}/>
        <Route path="/downloadadminfess/:id" element={<DownloadStdFees/>} />
      </Routes>
      <Footer/>
    </>
  );
}

function App() {
  return (
    <SnackbarProvider maxSnack={3}
    anchorOrigin={{
      vertical: 'top',   
      horizontal: 'right',
    }}  classes={{ containerRoot: "custom-snackbar" }}>
      <BrowserRouter>
        <AppContent />
        <Online />
      </BrowserRouter>
    </SnackbarProvider>
  );
}

export default App;
