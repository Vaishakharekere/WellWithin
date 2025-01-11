import React, { useState } from 'react';
import './ChatRoom.css';
import axios from 'axios';

const Chatroom = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (input.trim() === '') return;

    // Add user message to the chat
    setMessages([...messages, { text: input, sender: 'You' }]);
    setInput(''); // Clear input field

    setLoading(true); // Set loading state while waiting for AI response

    try {
      // Sending user query to the server
      const response = await axios.post('http://localhost:5000/api/chat', { query: input });

      // AI's response
      const aiResponse = response.data.reply;

      // Add AI response to the chat
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: aiResponse, sender: 'AI' },
      ]);
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: 'Sorry, something went wrong. Please try again later.', sender: 'AI' },
      ]);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="chatroom">
      <h2>Simple Chatroom</h2>

      <div className="messages">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.sender.toLowerCase()}`}>
            <span className="sender">{message.sender}: </span>
            <span className="text">{message.text}</span>
          </div>
        ))}
        {loading && <div className="loading">AI is thinking...</div>}
      </div>

      <div className="input-container">
        <input
          type="text"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chatroom;
