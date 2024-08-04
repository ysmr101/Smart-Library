import React, { useState, useEffect, useRef } from 'react';
import Chat from '../../assets/Chat.svg';


interface Message {
  type: 'user' | 'bot';
  text: string;
}

const ChatBot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      type: 'bot',
      text: "Hello, I am the AI ChatBot! I'm here to help you with anything you’re looking for. Please provide your descriptions below and I’ll show the relative content.",
    },
  ]);
  const [userInput, setUserInput] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(event.target.value);
  };

  const handleSendMessage = async () => {
    if (!userInput.trim()) return;

    const userMessage: Message = { type: 'user', text: userInput };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    setUserInput('');
    setLoading(true);

    try {
      const response = await fetch(`http://127.0.0.1:8000/books/mistral?query=${encodeURIComponent(userInput)}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch response: ${response.status} - ${response.statusText}`);
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder('utf-8');

      let botMessageText = '';
      setMessages((prevMessages) => [...prevMessages, { type: 'bot', text: botMessageText }]);

      if (reader) {
        let done = false;
        while (!done) {
          const { value, done: streamDone } = await reader.read();
          done = streamDone;
          if (value) {
            const chunk = decoder.decode(value, { stream: !done });
            botMessageText += chunk;

            setMessages((prevMessages) => {
              const updatedMessages = [...prevMessages];
              updatedMessages[updatedMessages.length - 1] = { type: 'bot', text: botMessageText };
              return updatedMessages;
            });
          }
        }
      }
    } catch (error) {
      console.error('Error fetching bot response:', error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { type: 'bot', text: 'Sorry, something went wrong. Please try again.' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4" ref={dropdownRef}>
      <button
          onClick={toggleDropdown}
          aria-label="ChatBot Toggle"
      >

        <img src={Chat} alt="Chat Icon" className="h-6 w-6"/>
      </button>

      {isOpen && (
          <div
              className="origin-bottom-right absolute bottom-14 right-0 w-80 h-96 rounded-lg shadow-lg bg-gray-900 text-white flex flex-col"
          role="dialog"
          aria-modal="true"
        >
          <h1 className="text-xl font-semibold mb-2 p-3 text-center border-b border-gray-700">AI ChatBot</h1>
          <div className="flex-grow p-3 overflow-y-auto custom-scrollbar">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`mb-3 p-2 rounded-lg ${
                  message.type === 'bot' ? 'bg-blue-600 text-left' : 'bg-gray-700 text-right'
                }`}
              >
                {message.text}
              </div>
            ))}
            {loading && (
                <div className="bg-blue-600 p-2 rounded-lg mb-3 text-left animate-pulse">
                  <div className="loader"></div>
                </div>
            )}
          </div>
          <div className="p-3 border-t border-gray-700">
            <div className="flex items-center">
              <input
                type="text"
                value={userInput}
                onChange={handleInputChange}
                placeholder="Insert text"
                className="bg-gray-800 text-white placeholder-gray-400 p-2 rounded-l-lg w-full focus:outline-none"
              />
              <button
                onClick={handleSendMessage}
                className="bg-blue-600 p-2 rounded-r-lg hover:bg-blue-700 focus:outline-none"
                disabled={loading}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBot;
