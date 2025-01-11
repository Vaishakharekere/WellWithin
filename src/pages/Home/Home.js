import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Home.css";
import Button from "../../components/Button/Button";
import bot from '../../images/health-bot.jpg';
import appointment from '../../images/appointment.png';
import history from '../../images/history.webp';
import disease from '../../images/disease.avif';

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="home">
      <div className="hero">
        <h1>Welcome to WellWithin</h1>
        <p>Your Personal Healthcare Companion</p>
        <Button content='Get Started' func={()=>navigate('/signup')}/>
      </div>

      <div className="features">
        <h1>Our Features</h1>
        <div className="feature">
            <div className="content">
                <h3>AI Health Assistant</h3>
                <p>Get instant health advice powered by AI.</p>
            </div>
            <img src={bot} alt="bot" />
        </div>
        <div className="feature">
            <div className="content">
                <h3>Appointments</h3>
                <p>Schedule and manage appointments with ease.</p>
            </div>
            <img src={appointment} alt="appointment" />
        </div>
        <div className="feature">
            <div className="content">
                <h3>Medical History</h3>
                <p>Securely store and access your medical records.</p>
            </div>
            <img src={history} alt="history" />
        </div>
        <div className="feature">
            <div className="content">
                <h3>Disease Detection</h3>
                <p>Upload images for accurate disease diagnosis.</p>
            </div>
            <img src={disease} alt="disease" />
        </div>
      </div>

      <div className="cta-section">
        <h2>Take Control of Your Health Today</h2>
        <Button content='Sign Up' func={()=>navigate('/signup')}/>
      </div>
    </div>
  );
};

export default Home;
