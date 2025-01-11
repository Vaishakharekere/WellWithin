import React, { useState } from 'react';
import { MdOutlineHome } from "react-icons/md";
import { RiTodoLine } from "react-icons/ri";
import { GrAnalytics } from "react-icons/gr";
import { FaRegCalendarAlt } from "react-icons/fa";
import { IoIosNotificationsOutline } from "react-icons/io";
import { IoIosLogOut } from "react-icons/io";
import demo from '../../images/demoprofile.jpeg';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './PatientDashboard.css';
import { useAuth } from '../../context/authContext';

const PatientDashboard = () => {
  const {logout} = useAuth();
  const [date, setDate] = useState(new Date());

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  return (
    <div className="patient-dashboard">
      <div className="main-content">
        <div className="first-row">
            <div className="welcome">
                Hello, Jane Doe! 👋
            </div>
            <div className="notifications">
                <IoIosNotificationsOutline cursor='pointer'/>
            </div>
        </div>
        <div className="second-row">
            <div className="logs">
                <div className="visited">
                    <h1>12</h1><p>Appointments Attended</p>
                </div>
                <div className="upcoming">
                    <p>Upcoming Appointments</p>
                    <div className="details">
                        <img src={demo} alt="demo" />
                        <div>
                            <p>Dr. John Smith</p>
                            <p>10:00am 20 Jan 2025</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="health-stats">
                <h1>Health Stats</h1>
                <p>Blood Pressure: 120/80</p>
                <p>Weight: 68kg</p>
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
                <p>Jane Doe</p>
                <p>Patient</p>
            </div>
            <div className="logout">
                <IoIosLogOut cursor='pointer' onClick={()=>logout()}/>
            </div>
        </div>
    </div>
  );
};

export default PatientDashboard;
