import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ChatWindow from './ChatWindow';

const url = import.meta.env.VITE_URL;

const ChatApp = () => {
  const [chats, setChats] = useState(() => {
    const storedChats = localStorage.getItem('chats');
    return storedChats ? JSON.parse(storedChats) : [];
  });
  const [selectedChatIndex, setSelectedChatIndex] = useState(() => {
    const storedIndex = localStorage.getItem('selectedChatIndex');
    return storedIndex ? parseInt(storedIndex, 10) : 0;
  });
  const [conversations, setConversations] = useState(() => {
    const storedConversations = localStorage.getItem('conversations');
    return storedConversations ? JSON.parse(storedConversations) : [];
  });
  const [isChatOpen, setIsChatOpen] = useState(false);  // Manage chat window visibility
  const userId = 'user124'; // Replace with actual user ID logic

  useEffect(() => {
    const storedChats = JSON.parse(localStorage.getItem('chats')) || [];
    if (storedChats.length === 0) {
        const dummyMessage = [{ bot: "I'm Loopi's friendly chatbot, here to provide quick answers to your frequently asked questions. How can I assist you today?" }];
        setChats([dummyMessage]);
        localStorage.setItem('chats', JSON.stringify([dummyMessage]));
    } else {
        setChats(storedChats);
    }
  }, []);

  const handleSendMessage = async (message) => {
    const updatedChats = [...chats];

    if (!updatedChats[selectedChatIndex]) {
        updatedChats[selectedChatIndex] = [];
    }
    updatedChats[selectedChatIndex].push({ user: message });
    setChats([...updatedChats]);
    localStorage.setItem('chats', JSON.stringify(updatedChats));

    try {
        const response = await axios.post(url, {
            message: message,
            conversation_id: 1
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const botResponse = response.data?.text || 'No response';
        const buttons = response.data?.buttons || [];

        updatedChats[selectedChatIndex].push({ bot: botResponse, buttons: buttons });
        setChats([...updatedChats]);
        localStorage.setItem('chats', JSON.stringify(updatedChats));
    } catch (error) {
        console.error('Error sending message:', error);
    }
  };

  const handleSendMessageFromButton = async (message) => {
    const updatedChats = [...chats];
    try {
        const response = await axios.post(url, {
            message: message,
            conversation_id: 1
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const botResponse = response.data?.text || 'No response';
        const buttons = response.data?.buttons || [];

        updatedChats[selectedChatIndex].push({ bot: botResponse, buttons: buttons });
        setChats([...updatedChats]);
        localStorage.setItem('chats', JSON.stringify(updatedChats));
    } catch (error) {
        console.error('Error sending message:', error);
    }
  };

  // Toggle chat window visibility
  const toggleChatWindow = () => {
    setIsChatOpen(!isChatOpen);
  };

  return (
    <div className="chat-app h-screen flex flex-col text-gray-100">
      {/* Chat Window */}
      {isChatOpen && (
        <div className="chat-window-container">
          <ChatWindow
            chat={chats[selectedChatIndex] || []}
            onSendMessage={handleSendMessage}
            onSendMessageFromButton={handleSendMessageFromButton}
            conversationId={1}
          />
        </div>
      )}

      {/* Chat Bubble */}
      <button
        onClick={toggleChatWindow}
        className="fixed bottom-10 right-10 p-4 rounded-full bg-blue-500 text-white shadow-lg hover:bg-blue-600 focus:outline-none"
        aria-label="Chat with us"
      >
        <span className="text-2xl">💬</span>
      </button>
    </div>
  );
};

export default ChatApp;




// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// // import ChatSidebar from './ChatSidebar';
// import ChatWindow from './ChatWindow';

// const ChatApp = () => {
//   const [chats, setChats] = useState(() => {
//     const storedChats = localStorage.getItem('chats');
//     return storedChats ? JSON.parse(storedChats) : [];
//   });
//   const [selectedChatIndex, setSelectedChatIndex] = useState(() => {
//     const storedIndex = localStorage.getItem('selectedChatIndex');
//     return storedIndex ? parseInt(storedIndex, 10) : 0;
//   });
//   const [conversations, setConversations] = useState(() => {
//     const storedConversations = localStorage.getItem('conversations');
//     return storedConversations ? JSON.parse(storedConversations) : [];
//   });
//   const userId = 'user124'; // Replace with actual user ID logic

//   // useEffect(() => {
//   //   const fetchChatHistory = async () => {
//   //     try {
//   //       const currentConversationId = conversations[selectedChatIndex]?.conversationId;
//   //       if (currentConversationId) {
//   //         const response = await axios.get(`http://localhost:5001/history?user_id=${userId}&conversation_id=${currentConversationId}`);
//   //         const data = response.data;

//   //         const formattedData = data.map(chat => ({
//   //           user: chat.user_message,
//   //           bot: chat.bot_response
//   //         }));
//   //         const updatedChats = [...chats];
//   //         updatedChats[selectedChatIndex] = formattedData;
//   //         setChats(updatedChats);
//   //         localStorage.setItem('chats', JSON.stringify(updatedChats)); // Store chats in localStorage
//   //       }
//   //     } catch (error) {
//   //       console.error("Error fetching chat history:", error);
//   //     }
//   //   };

//   //   fetchChatHistory();
//   // }, [userId, conversations, selectedChatIndex]);

//   useEffect(() => {
//     // Check if there are existing chats in localStorage
//     const storedChats = JSON.parse(localStorage.getItem('chats')) || [];

//     // If no chats exist, initialize with a dummy first message
//     if (storedChats.length === 0) {
//         const dummyMessage = [{ bot: "I'm Loopi's friendly chatbot, here to provide quick answers to your frequently asked questions. How can I assist you today? To enhance your experience, we may process personal data collected during this chat." }];
//         setChats([dummyMessage]);  // Set initial message
//         localStorage.setItem('chats', JSON.stringify([dummyMessage])); // Store in localStorage
//     } else {
//         setChats(storedChats); // Load existing chats from localStorage
//     }

//     console.log("chats", storedChats);
// }, []);

//   const handleSendMessage = async (message) => {
//     const updatedChats = [...chats];

//     if (!updatedChats[selectedChatIndex]) {
//         updatedChats[selectedChatIndex] = [];
//     }
//     updatedChats[selectedChatIndex].push({ user: message });
//     setChats([...updatedChats]);
//     localStorage.setItem('chats', JSON.stringify(updatedChats)); // Store chats in localStorage

//     // const currentConversationId = conversations[selectedChatIndex]?.conversationId;

//     // if (!currentConversationId) {
//     //     console.error("Conversation ID is missing!");
//     //     return;
//     // }

//     try {
//         const response = await axios.post('http://localhost:8000/chat', {
//             message: message,
//             conversation_id: 1
//         }, {
//             headers: {
//                 'Content-Type': 'application/json'
//             }
//         });

//         console.log("response", response)
//         const botResponse = response.data?.text || 'No response';
//         const buttons = response.data?.buttons || [];  // Extract buttons if available
//         console.log("buttons", buttons)

//         updatedChats[selectedChatIndex].push({ bot: botResponse, buttons: buttons  });
//         setChats([...updatedChats]);
//         localStorage.setItem('chats', JSON.stringify(updatedChats)); // Store chats in localStorage

//     } catch (error) {
//         console.error('Error sending message:', error);
//     }
//   };

//   const handleSendMessageFromButton = async (message) => {
//     const updatedChats = [...chats];
//     try {
//         const response = await axios.post('http://localhost:8000/chat', {
//             message: message,
//             conversation_id: 1
//         }, {
//             headers: {
//                 'Content-Type': 'application/json'
//             }
//         });

//         const botResponse = response.data?.text || 'No response';
//         const buttons = response.data?.buttons || [];  // Extract buttons if available

//         updatedChats[selectedChatIndex].push({ bot: botResponse, buttons: buttons  });
//         setChats([...updatedChats]);
//         localStorage.setItem('chats', JSON.stringify(updatedChats)); // Store chats in localStorage

//     } catch (error) {
//         console.error('Error sending message:', error);
//     }
//   }

//   // const startNewConversation = async () => {
//   //   try {
//   //       const response = await axios.post('http://localhost:5001/new_conversation', {
//   //           user_id: userId
//   //       });
//   //       const newConversationId = response.data.conversation_id;  // Save the conversation ID
//   //       const newConversations = [...conversations, { conversationId: newConversationId }];
//   //       setConversations(newConversations);  // Update the conversations state
//   //       localStorage.setItem('conversations', JSON.stringify(newConversations));  // Store conversations in localStorage
//   //       const newChats = [...chats, []]; // Add a new empty chat array
//   //       setChats(newChats);
//   //       localStorage.setItem('chats', JSON.stringify(newChats)); // Store chats in localStorage
//   //       const newIndex = newConversations.length - 1;
//   //       setSelectedChatIndex(newIndex); // Select the new conversation
//   //       localStorage.setItem('selectedChatIndex', newIndex); // Store selectedChatIndex in localStorage
//   //       console.log('New conversation started:', newConversationId);
//   //   } catch (error) {
//   //       console.error('Error starting a new conversation:', error);
//   //   }
//   // };

//   // const deleteConversation = async (index) => {
//   //   const conversationId = conversations[index]?.conversationId;

//   //   if (!conversationId) {
//   //       console.error("Conversation ID is missing!");
//   //       return;
//   //   }

//   //   try {
//   //       await axios.delete(`http://localhost:5001/conversation`, {
//   //           data: {
//   //               user_id: userId,
//   //               conversation_id: conversationId
//   //           }
//   //       });

//   //       const newConversations = conversations.filter((_, i) => i !== index);
//   //       const newChats = chats.filter((_, i) => i !== index);

//   //       setConversations(newConversations);
//   //       setChats(newChats);

//   //       localStorage.setItem('conversations', JSON.stringify(newConversations));
//   //       localStorage.setItem('chats', JSON.stringify(newChats));

//   //       if (selectedChatIndex >= newConversations.length) {
//   //           setSelectedChatIndex(newConversations.length - 1);
//   //           localStorage.setItem('selectedChatIndex', newConversations.length - 1);
//   //       }
//   //   } catch (error) {
//   //       console.error('Error deleting conversation:', error);
//   //   }
//   // };

//   // const selectChat = (index) => {
//   //   setSelectedChatIndex(index);
//   //   localStorage.setItem('selectedChatIndex', index); // Store selectedChatIndex in localStorage
//   // };

//   return (
//     <div className="chat-app h-screen flex text-gray-100">
//       {/* <ChatSidebar
//         chats={chats}
//         selectChat={selectChat}
//         startNewConversation={startNewConversation}
//         deleteConversation={deleteConversation}
//         selectedChatIndex={selectedChatIndex}
//       /> */}
//       <ChatWindow
//         chat={chats[selectedChatIndex] || []}
//         onSendMessage={handleSendMessage}
//         onSendMessageFromButton={handleSendMessageFromButton}
//         conversationId={1}
//         // conversationId={conversations[selectedChatIndex]?.conversationId}
//       />
//     </div>
//   );
// };

// export default ChatApp;