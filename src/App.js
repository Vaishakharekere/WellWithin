import { Route, Routes } from 'react-router-dom';
import './App.css';
import PatientDashboard from './pages/Dashboard/PatientDashboard';
import Home from './pages/Home/Home';
import Appointment from './pages/Appointments/Appointments';
import HistoryPage from './pages/HistoryPage/HistoryPage';
import Signup from './pages/auth/Signup';
import Login from './pages/auth/Login';
import DoctorDashboard from './pages/Dashboard/DoctorDashboard';
import { useAuth } from './context/authContext';
import AppointmentForm from './pages/Appointments/AppointmentForm';
import Chatroom from './components/Chatbot/ChatRoom';
import Skin from './pages/Diseasedetection/Skin';

function App() {
  const {user, role} = useAuth();
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={user ?  (role === 'doctor' ? <DoctorDashboard/> : <PatientDashboard/>) : <Home/>}/>
        <Route path='/appointments' element={<Appointment/>}/>
        <Route path='/history' element={<HistoryPage/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/appointment-form' element={<AppointmentForm/>}/>
        <Route path='/chat' element={<Chatroom/>}/>
        <Route path='/SkinDisease' element={<Skin/>}/>
      </Routes>
    </div>
  );
}

export default App;
