import React, {useState} from 'react';
import styles from './Chatbot.module.css';
import { fetchRecommendationsStream } from '../../services/api';

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
          fetchRecommendationsStream(
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
                <svg width="62" height="62" viewBox="0 0 62 62" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="62" height="62" rx="8" fill="transparent"/>
                    <mask id="mask0_1_274" style={{"mask":"luminance"}} maskUnits="userSpaceOnUse" x="2" y="2" width="57" height="57">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M2.5835 2.58411H58.1071V58.1098H2.5835V2.58411Z" fill="white"/>
                    </mask>
                    <g mask="url(#mask0_1_274)">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M15.7803 50.8279C17.2786 50.8279 18.6917 51.3962 20.1875 51.9981C29.3505 56.2348 40.1876 54.3076 47.2479 47.2499C56.5634 37.9293 56.5634 22.7677 47.2479 13.4522C42.7374 8.94169 36.7389 6.45911 30.3529 6.45911C23.9643 6.45911 17.9632 8.94427 13.4553 13.4548C6.39246 20.5124 4.47046 31.3495 8.66838 40.4248C9.27288 41.9205 9.85671 43.3775 9.85671 44.8914C9.85671 46.4026 9.33746 47.9242 8.88021 49.2675C8.50304 50.3732 7.93213 52.042 8.29896 52.4089C8.65804 52.7809 10.3372 52.1944 11.4455 51.8147C12.7759 51.36 14.2845 50.8382 15.7803 50.8279ZM30.2883 58.1103C26.341 58.1103 22.3678 57.2759 18.6504 55.5554C17.555 55.1162 16.5295 54.7029 15.7932 54.7029C14.9459 54.708 13.8066 55.1007 12.7061 55.4804C10.4483 56.2554 7.63763 57.2216 5.55804 55.1498C3.48621 53.0754 4.44204 50.2724 5.21188 48.0172C5.59163 46.9064 5.98171 45.7594 5.98171 44.8914C5.98171 44.1784 5.63813 43.269 5.11113 41.9593C0.272542 31.5097 2.50971 18.9159 10.717 10.7139C15.956 5.47227 22.9284 2.58411 30.3503 2.58411C37.7722 2.58411 44.7472 5.46969 49.9862 10.7113C60.8155 21.5406 60.8155 39.1589 49.9862 49.9883C44.6775 55.2996 37.5294 58.1103 30.2883 58.1103Z" fill="#F7F5FF"/>
                    </g>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M40.5487 34.0044C39.1227 34.0044 37.9551 32.8497 37.9551 31.4211C37.9551 29.9925 39.0995 28.8378 40.5255 28.8378H40.5487C41.9747 28.8378 43.1321 29.9925 43.1321 31.4211C43.1321 32.8497 41.9747 34.0044 40.5487 34.0044Z" fill="#F7F5FF"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M30.1928 34.0044C28.7668 34.0044 27.5991 32.8497 27.5991 31.4211C27.5991 29.9925 28.741 28.8378 30.1695 28.8378H30.1928C31.6188 28.8378 32.7761 29.9925 32.7761 31.4211C32.7761 32.8497 31.6188 34.0044 30.1928 34.0044Z" fill="#F7F5FF"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M19.8359 34.0044C18.4099 34.0044 17.2422 32.8497 17.2422 31.4211C17.2422 29.9925 18.3866 28.8378 19.8126 28.8378H19.8359C21.2619 28.8378 22.4192 29.9925 22.4192 31.4211C22.4192 32.8497 21.2619 34.0044 19.8359 34.0044Z" fill="#F7F5FF"/>
                </svg>
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
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <mask id="mask0_1_1891" style={{"mask":"luminance"}} maskUnits="userSpaceOnUse" x="2" y="3" width="20" height="20">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M2 3.00037H21.499V22.4994H2V3.00037Z" fill="white"/>
                                </mask>
                                <g mask="url(#mask0_1_1891)">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M10.8049 14.8178L14.4619 20.7508C14.6219 21.0108 14.8719 21.0078 14.9729 20.9938C15.0739 20.9798 15.3169 20.9178 15.4049 20.6228L19.9779 5.17777C20.0579 4.90477 19.9109 4.71877 19.8449 4.65277C19.7809 4.58677 19.5979 4.44577 19.3329 4.52077L3.87695 9.04677C3.58394 9.13277 3.51994 9.37877 3.50594 9.47977C3.49194 9.58277 3.48794 9.83777 3.74695 10.0008L9.74794 13.7538L15.0499 8.39577C15.3409 8.10177 15.8159 8.09877 16.1109 8.38977C16.4059 8.68077 16.4079 9.15677 16.1169 9.45077L10.8049 14.8178ZM14.8949 22.4998C14.1989 22.4998 13.5609 22.1458 13.1849 21.5378L9.30794 15.2468L2.95194 11.2718C2.26694 10.8428 1.90894 10.0788 2.01994 9.27577C2.12994 8.47277 2.68094 7.83477 3.45494 7.60777L18.9109 3.08177C19.6219 2.87377 20.3839 3.07077 20.9079 3.59277C21.4319 4.11977 21.6269 4.88977 21.4149 5.60377L16.8419 21.0478C16.6129 21.8248 15.9729 22.3738 15.1719 22.4808C15.0779 22.4928 14.9869 22.4998 14.8949 22.4998Z" fill="white"/>
                                </g>
                            </svg>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Chatbot;
