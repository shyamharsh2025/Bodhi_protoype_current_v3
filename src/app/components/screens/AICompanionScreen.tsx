import { ArrowLeft, Menu, Wind, Zap, MessageSquare, HelpCircle, Moon, RotateCcw, Mic, Send } from 'lucide-react';
import { useNavigate } from 'react-router';
import { useState, useRef, useEffect } from 'react';
import { VoicePoweredOrb } from '../VoicePoweredOrb';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

export default function AICompanionScreen() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages are added
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now(),
      text: text,
      sender: 'user',
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);

    // Clear input
    setInputValue('');

    // AI response after a short delay
    setTimeout(() => {
      const aiMessage: Message = {
        id: Date.now() + 1,
        text: 'How much time do you have?',
        sender: 'ai',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
    }, 800);
  };

  const handleButtonClick = (buttonText: string) => {
    handleSendMessage(buttonText);
  };

  const handleInputSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage(inputValue);
  };

  return (
    <div className="h-full flex flex-col bg-gradient-to-b from-[#E8ECFE] to-[#F5F7FF] relative">
      <style>{`
        @keyframes bro-orb-float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }

        @keyframes bro-orb-breathe {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.035); }
        }

        @keyframes bro-orb-glow {
          0%, 100% { opacity: 0.62; transform: scale(0.96); }
          50% { opacity: 0.92; transform: scale(1.06); }
        }

        @keyframes bro-orb-sheen {
          0%, 100% { transform: translate(-8px, -8px) scale(1); opacity: 0.78; }
          50% { transform: translate(8px, 8px) scale(1.08); opacity: 0.95; }
        }

        .bro-orb-character {
          animation: bro-orb-float 4.8s ease-in-out infinite;
        }

        .bro-orb-shell {
          animation: bro-orb-breathe 5.2s ease-in-out infinite;
        }

        .bro-orb-ambient {
          animation: bro-orb-glow 4s ease-in-out infinite;
        }

        .bro-orb-sheen {
          animation: bro-orb-sheen 6s ease-in-out infinite;
        }

        .chat-scrollbar::-webkit-scrollbar {
          width: 6px;
        }

        .chat-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }

        .chat-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(91, 79, 219, 0.3);
          border-radius: 10px;
        }

        .chat-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(91, 79, 219, 0.5);
        }
      `}</style>

      {/* Header */}
      <div className="flex items-center justify-between px-6 pt-4 pb-4 relative z-30">
        <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-full bg-white/40 backdrop-blur-sm flex items-center justify-center">
          <ArrowLeft className="w-5 h-5 text-[#5B4FDB]" />
        </button>
        <h1 className="text-[20px] font-bold text-[#5B4FDB]">AI Companion</h1>
        <button className="w-10 h-10 rounded-full bg-white/40 backdrop-blur-sm flex items-center justify-center">
          <Menu className="w-5 h-5 text-[#5B4FDB]" />
        </button>
      </div>

      {/* Fixed Bro character orb */}
      <div className="fixed top-[86px] left-1/2 -translate-x-1/2 z-20 pointer-events-none">
        <div className="relative flex w-[320px] flex-col items-center">
          <div className="bro-orb-character relative flex h-[228px] w-[228px] items-center justify-center">
            <div className="bro-orb-ambient absolute inset-[-30px] rounded-full bg-[radial-gradient(circle,rgba(88,64,212,0.30)_0%,rgba(122,112,255,0.19)_36%,rgba(104,152,249,0.08)_62%,transparent_76%)] blur-[30px]" />
            <div className="absolute inset-[20px] rounded-full bg-[rgba(88,64,212,0.18)] blur-[26px]" />

            <div className="bro-orb-shell relative h-[180px] w-[180px] overflow-hidden rounded-full bg-gradient-to-br from-[#E7E4FF] via-[#BDB7FF] to-[#8F86FF] p-2 shadow-[inset_0px_2px_0px_rgba(255,255,255,0.88),inset_0px_-18px_34px_rgba(49,42,130,0.18),0px_20px_42px_rgba(84,75,187,0.24)]">
              <div className="absolute inset-2 rounded-full bg-[rgba(88,64,212,0.20)] blur-[18px]" />
              <div className="relative h-full w-full rounded-full bg-[radial-gradient(circle_at_42%_34%,rgba(255,255,255,0.96)_0%,rgba(154,148,255,0.50)_18%,rgba(88,64,212,0.18)_52%,rgba(47,49,130,0.10)_100%)]">
                <VoicePoweredOrb enableVoiceControl={false} className="scale-[1.38]" />
              </div>
              <div className="pointer-events-none absolute inset-3 rounded-full border border-white/48" />
              <div className="bro-orb-sheen pointer-events-none absolute left-8 top-7 h-14 w-14 rounded-full bg-white/38 blur-[11px]" />
              <div className="pointer-events-none absolute right-8 top-11 h-6 w-6 rounded-full bg-white/44 blur-[5px]" />
              <div className="pointer-events-none absolute inset-x-9 bottom-5 h-5 rounded-full bg-[#2F3182]/12 blur-[8px]" />
            </div>
          </div>

          <div className="-mt-4 relative rounded-[24px] border border-white/75 bg-white/72 px-7 py-4 text-center shadow-[inset_0px_1px_0px_rgba(255,255,255,0.95),0px_12px_28px_rgba(84,75,187,0.10)] backdrop-blur-md">
            <div className="absolute left-1/2 top-[-7px] h-4 w-4 -translate-x-1/2 rotate-45 border-l border-t border-white/75 bg-white/72" />
            <h2 className="relative text-[24px] font-bold text-[#2D2E34] leading-8" style={{ fontFamily: 'Inter, sans-serif' }}>
              Hello Anusha
            </h2>
            <p className="relative mt-1 text-[14px] font-medium text-[#5A5B62] leading-5" style={{ fontFamily: 'Inter, sans-serif' }}>
              What's on your mind today?
            </p>
          </div>
        </div>
      </div>

      {/* Scrollable Chat Area */}
      <div
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto px-6 pb-[400px] pt-[372px] chat-scrollbar relative z-10"
      >
        {messages.map((message) => (
          <div
            key={message.id}
            className={`mb-4 flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[75%] px-5 py-3 rounded-3xl ${
                message.sender === 'user'
                  ? 'bg-gradient-to-br from-[#5B4FDB] to-[#7C3AED] text-white'
                  : 'bg-white/70 backdrop-blur-sm text-gray-800'
              } shadow-sm`}
            >
              <p className="text-[15px]">{message.text}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Fixed Bottom Section - Buttons and Input */}
      <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-[#F5F7FF] via-[#F5F7FF] to-transparent px-6 pt-4 pb-6 space-y-3 z-30">
        {/* Action Buttons - 2x3 Grid */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => handleButtonClick('Calm Down')}
            className="px-5 py-3.5 rounded-full bg-white/70 backdrop-blur-sm flex items-center justify-center gap-2.5 shadow-sm hover:bg-white/80 transition-colors"
          >
            <Wind className="w-5 h-5 text-[#5B4FDB]" strokeWidth={2} />
            <span className="text-[15px] font-semibold text-gray-800">Calm Down</span>
          </button>
          <button
            onClick={() => handleButtonClick('Focus Up')}
            className="px-5 py-3.5 rounded-full bg-white/70 backdrop-blur-sm flex items-center justify-center gap-2.5 shadow-sm hover:bg-white/80 transition-colors"
          >
            <Zap className="w-5 h-5 text-[#5B4FDB]" strokeWidth={2} />
            <span className="text-[15px] font-semibold text-gray-800">Focus Up</span>
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => handleButtonClick('Just Venting')}
            className="px-5 py-3.5 rounded-full bg-white/70 backdrop-blur-sm flex items-center justify-center gap-2.5 shadow-sm hover:bg-white/80 transition-colors"
          >
            <MessageSquare className="w-5 h-5 text-[#5B4FDB]" strokeWidth={2} />
            <span className="text-[15px] font-semibold text-gray-800">Just Venting</span>
          </button>
          <button
            onClick={() => handleButtonClick('Unsure')}
            className="px-5 py-3.5 rounded-full bg-white/70 backdrop-blur-sm flex items-center justify-center gap-2.5 shadow-sm hover:bg-white/80 transition-colors"
          >
            <HelpCircle className="w-5 h-5 text-[#5B4FDB]" strokeWidth={2} />
            <span className="text-[15px] font-semibold text-gray-800">Unsure</span>
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => handleButtonClick('Nap Down')}
            className="px-5 py-3.5 rounded-full bg-white/70 backdrop-blur-sm flex items-center justify-center gap-2.5 shadow-sm hover:bg-white/80 transition-colors"
          >
            <Moon className="w-5 h-5 text-[#5B4FDB]" strokeWidth={2} />
            <span className="text-[15px] font-semibold text-gray-800">Nap Down</span>
          </button>
          <button
            onClick={() => handleButtonClick('Post Reset')}
            className="px-5 py-3.5 rounded-full bg-white/70 backdrop-blur-sm flex items-center justify-center gap-2.5 shadow-sm hover:bg-white/80 transition-colors"
          >
            <RotateCcw className="w-5 h-5 text-[#5B4FDB]" strokeWidth={2} />
            <span className="text-[15px] font-semibold text-gray-800">Post Reset</span>
          </button>
        </div>

        {/* Input Field */}
        <form onSubmit={handleInputSubmit} className="relative pt-1">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ask me anything..."
            className="w-full px-6 py-4 pr-16 rounded-full bg-white/70 backdrop-blur-sm text-[15px] text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#5B4FDB]/30 shadow-sm"
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-[#5B4FDB] flex items-center justify-center shadow-lg hover:bg-[#4F46E5] transition-colors"
          >
            {inputValue ? (
              <Send className="w-5 h-5 text-white" />
            ) : (
              <Mic className="w-5 h-5 text-white" />
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
