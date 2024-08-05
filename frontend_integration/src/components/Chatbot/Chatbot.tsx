import React, {useState} from 'react';
import styles from './Chatbot.module.css';
import { fetchBotRecommendationsStream } from '../../services/api';
import chatIcon from '../../assets/chatbot.svg'
import sendIcon from '../../assets/send.svg'

interface Message {
    text: string;
    sender: 'bot' | 'user';
}

const Chatbot: React.FC = () => {
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([{ text: "Hello, I am the AI ChatBot! I’m here to help you with anything you’re looking for. Please provide your descriptions below and I’ll show the relative content.", sender: 'bot' }]);
    const [inputText, setInputText] = useState("");
    const [currentBotText, setCurrentBotText] = useState<string>("");
    const [loading, setLoading] = useState(false);

    const handleChat = () => {
        setIsChatOpen(!isChatOpen);
    };

    const handleSend = async () => {
        if (inputText.trim() !== "") {
          const userMessage: Message = { text: inputText, sender: 'user' };
          setMessages([...messages, userMessage]);
          setInputText("");
          setCurrentBotText("");
          setLoading(true);
          fetchBotRecommendationsStream(
            inputText,
            (chunk) => {
                setLoading(false);
                setCurrentBotText((prev) => {
                    const newBotText = prev + chunk;
                    setMessages((prevMessages) => {
                    const updatedMessages = [...prevMessages];
                    if (updatedMessages.length > 0 && updatedMessages[updatedMessages.length - 1].sender === 'bot') {
                        updatedMessages[updatedMessages.length - 1] = { text: newBotText, sender: 'bot' };
                    } else {
                        updatedMessages.push({ text: newBotText, sender: 'bot' });
                    }
                    return updatedMessages;
                    });
                    return newBotText;
                });
                },
            (error) => {
                setLoading(false); 
                console.error('Error fetching recommendations:', error);
                const errorMessage: Message = { text: "Sorry, something went wrong. Please try again later.", sender: 'bot' };
                setMessages((prevMessages) => [...prevMessages, errorMessage]);
            }
          );
        }
      };

    return (
        <div>
            <button className={styles.chatbot_button} onClick={handleChat}>
                <img src={chatIcon}/>
            </button>
            {isChatOpen && (
                <div className={styles.chatBox}>
                    <p className={styles.chatBox_header}>
                        Smart Librarian
                    </p>
                    <div className={styles.chatBox_inner}>
                        <div className={styles.chatBox_content}>
                            {messages.map((message, index) => (
                                <div key={index} className={`${styles.chat_message} ${styles[message.sender]}`}>
                                    <p>{message.text}</p>
                                </div>
                            ))}
                                {loading && <div className={styles.dots}><span></span><span></span><span></span></div>}
                        </div>
                        <div className={styles.chatBox_input}>
                            <input 
                                type="text" 
                                placeholder="Type your message..." 
                                value={inputText} 
                                onChange={(e) => setInputText(e.target.value)}
                            />
                            <button onClick={handleSend}>
                                <img src={sendIcon}/>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Chatbot;
