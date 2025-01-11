import React from 'react'
import { TbMessageChatbot } from "react-icons/tb";
import './Chatbot.css'; 
import { useNavigate } from 'react-router-dom';


const Chatbot = () => {
  const navigate = useNavigate();

  return (
    <div className='chatbot'>
        <TbMessageChatbot onClick={()=>navigate('/chat')}/>
    </div>
  )
}

export default Chatbot;