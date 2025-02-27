import { useState, useRef, useEffect } from 'react';
import { FaRobot, FaUser } from "react-icons/fa";

const ChatWindow = ({ chat = [], onSendMessage, onSendMessageFromButton, conversationId }) => {
  const [message, setMessage] = useState('');
  const [isBotLoading, setIsBotLoading] = useState(false); // Add state for bot loading
  const messagesEndRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!conversationId) {
      console.error("Conversation ID is missing!");
      return;
    }
    if (message.trim()) {
      onSendMessage(message);
      setMessage(''); // Clear the input after sending

      // Simulate bot response with loading indicator
      setIsBotLoading(true);
      setTimeout(() => {
        setIsBotLoading(false); // Simulate bot response after a delay
      }, 1500); // 1.5 seconds delay to simulate typing/loading
    }
    // scrollToBottom();
  };

  const scrollToBottom = () => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }, 100); // Small delay to wait for rendering
  };

  useEffect(() => {
    scrollToBottom();
  }, [chat, isBotLoading]);

  const handleButtonClick = (payload) => {
    onSendMessageFromButton(payload);  // This will send the payload back to the backend
    scrollToBottom();
  };

  return (
    <div className="chat-window flex flex-col flex-1 p-4 bg-gray-100 rounded-lg shadow-md max-w-2xl mx-auto">
      <div className="messages flex-grow mb-4 overflow-y-auto p-2">
        {chat.length === 0 ? (
          <div className="text-center text-gray-400 font-semibold">What can I help with?</div>
        ) : (
          chat.map((message, index) => (
            <div key={index} className="chat-message mb-3 flex flex-col">
              {message.user && (
                <div className="user-message bg-blue-500 text-white p-3 rounded-lg max-w-xs ml-auto shadow-md">
                  <div className="flex items-center font-semibold">
                    <FaUser className="mr-2" /> User
                  </div>
                  <div className="mt-1 text-sm">{message.user}</div>
                </div>
              )}
              {message.bot && (
                <div className="bot-message bg-gray-300 text-black p-3 rounded-lg max-w-xs mr-auto shadow-md mt-2">
                  <div className="flex items-center font-semibold">
                    <FaRobot className="mr-2" /> Bot
                  </div>
                  <div className="mt-1 text-sm"> {message.bot}</div>
                </div>
              )}
              {message.buttons && message.buttons.length > 0 && (
                <div className="button-container mt-2 flex flex-wrap gap-2">
                  {message.buttons.map((button, index) => (
                    <button
                      key={index}
                      className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-1 rounded-md shadow-md"
                      onClick={() => handleButtonClick(button.payload)}
                    >
                      {button.title}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))
        )}

        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSubmit} className="flex p-2 bg-white rounded-lg shadow-md">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          className="border-none flex-grow p-2 rounded-md text-gray-800 outline-none"
        />
        <button type="submit" className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md ml-2 shadow-md">
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatWindow;


// import React, { useState, useRef, useEffect } from 'react';
// import { FaRobot, FaUser } from "react-icons/fa";

// const ChatWindow = ({ chat = [], onSendMessage, conversationId }) => {
//   const [message, setMessage] = useState('');
//   const messagesEndRef = useRef(null);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!conversationId) {
//       console.error("Conversation ID is missing!");
//       return;
//     }
//     if (message.trim()) {
//       onSendMessage(message);
//       setMessage(''); // Clear the input after sending
//     }
//     scrollToBottom()
//   };

//   const scrollToBottom = () => {
//     setTimeout(() => {
//       messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
//     }, 100); // Small delay to wait for rendering
//   };

//   const handleButtonClick = (payload) => {
//     onSendMessage(payload);  // This will send the payload back to the backend
//   };

//   return (
//     <div className="chat-window flex flex-col flex-1 p-4 bg-gray-100 rounded-lg shadow-md max-w-2xl mx-auto">
//       <div className="messages flex-grow mb-4 overflow-y-auto p-2">
//         {chat.length === 0 ? (
//           <div className="text-center text-gray-400 font-semibold">What can I help with?</div>
//         ) : (
//           chat.map((message, index) => (
//             <div key={index} className="chat-message mb-3 flex flex-col">
//               {message.user && (
//                 <div className="user-message bg-blue-500 text-white p-3 rounded-lg max-w-xs ml-auto shadow-md">
//                   <div className="flex items-center font-semibold">
//                     <FaUser className="mr-2" /> User
//                   </div>
//                   <div className="mt-1 text-sm">{message.user}</div>
//                 </div>
//               )}
//               {message.bot && (
//                 <div className="bot-message bg-gray-300 text-black p-3 rounded-lg max-w-xs mr-auto shadow-md mt-2">
//                   <div className="flex items-center font-semibold">
//                     <FaRobot className="mr-2" /> Bot
//                   </div>
//                   <div className="mt-1 text-sm">{message.bot}</div>
//                 </div>
//               )}
//               {message.buttons && message.buttons.length > 0 && (
//                 <div className="button-container mt-2 flex flex-wrap gap-2">
//                   {message.buttons.map((button, index) => (
//                     <button
//                       key={index}
//                       className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-1 rounded-md shadow-md"
//                       onClick={() => handleButtonClick(button.payload)}
//                     >
//                       {button.title}
//                     </button>
//                   ))}
//                 </div>
//               )}
//             </div>
//           ))
//         )}
//         <div ref={messagesEndRef} />
//       </div>
//       <form onSubmit={handleSubmit} className="flex p-2 bg-white rounded-lg shadow-md">
//         <input
//           type="text"
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//           placeholder="Type a message..."
//           className="border-none flex-grow p-2 rounded-md text-gray-800 outline-none"
//         />
//         <button type="submit" className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md ml-2 shadow-md">
//           Send
//         </button>
//       </form>
//     </div>
//   );
// };

// export default ChatWindow;

