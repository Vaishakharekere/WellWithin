import React, { useEffect, useState } from 'react';
import { MdOutlineHome } from "react-icons/md";
import { RiTodoLine } from "react-icons/ri";
import { GrAnalytics } from "react-icons/gr";
import { FaRegCalendarAlt } from "react-icons/fa";
import { IoIosNotificationsOutline } from "react-icons/io";
import { IoIosLogOut } from "react-icons/io";
import demo from '../../images/demoprofile.jpeg';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './DoctorDashboard.css';
import { useAuth } from '../../context/authContext';
import axios from 'axios';

const Dashboard = () => {
  const [date, setDate] = useState(new Date()); 
  const [data,setData] = useState(null);
  const {uid,logout} = useAuth();

  useEffect(()=>{
    axios.get(`http://localhost:5000/api/users/${uid}`)
        .then((res)=>{
            setData(res.data.user);
        })
        .catch((err) => {
            console.log(err);
        })
  },[])

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  return (
    <div className="doctor-dashboard">
      <h1>Doctor's Dashboard</h1>
      <div className="main-content">
        <div className="first-row">
            <div className="welcome">
                Hello, {data.name}! 👋
            </div>
            <div className="notifications">
                <IoIosNotificationsOutline cursor='pointer'/>
            </div>
        </div>
        <div className="second-row">
            <div className="logs">
                <div className="visited">
                    <h1>42</h1><p>Patients Visited</p>
                </div>
                <div className="upcoming">
                    <p>Upcoming Appointments</p>
                    <div className="details">
                        <img src={demo} alt="demo" />
                        <div>
                            <p>Aliza Shah</p>
                            <p>8:00am 15 Jan 2025</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="analytics">
                <h1>Statistics</h1>
            </div>
        </div>
        <div className="third-row">
            <p>Calendar</p>
            <div className="calendar">
                <Calendar
                    onChange={handleDateChange}
                    value={date}
                />
            </div>
        </div>
      </div>
      <div className="profile">
            <div className="details">
                <img src={demo} alt="" />
                <p>Alan Colter</p>
                <p>Physician</p>
            </div>
            <div className="logout">
                <IoIosLogOut cursor='pointer'onClick={()=>logout()}/>
            </div>
        </div>
    </div>
  );
};

export default Dashboard;
