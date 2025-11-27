import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send, ArrowLeft, Plane, User, Bot, Loader2 } from 'lucide-react';
import type { TravelFormData, ChatMessage } from '@/types/travel';

interface ChatInterfaceProps {
  travelData: TravelFormData;
  onBack: () => void;
}

const generateBotReply = (userText: string, travelData: TravelFormData): string => {
  const lower = userText.toLowerCase();
  const { fromCountry, toCountry, nationality, travelType } = travelData;

  if (lower.includes('documents') || lower.includes('what do i need') || lower.includes('requirements') || lower.includes('list')) {
    const baseDocuments = [
      '• Valid passport (minimum 6 months validity)',
      '• Completed visa application form',
      '• Recent passport-sized photographs (35x45mm)',
      '• Proof of accommodation/hotel booking',
      '• Return/onward flight tickets',
      '• Proof of sufficient financial means',
      '• Travel insurance certificate'
    ];
    
    const typeSpecific: Record<string, string[]> = {
      Tourism: ['• Hotel reservations for entire stay', '• Detailed travel itinerary', '• Tour bookings (if applicable)'],
      Business: ['• Official invitation letter from host company', '• Business registration documents', '• Letter from employer', '• Conference/meeting details'],
      Student: ['• University acceptance letter', '• Proof of tuition payment', '• Academic transcripts', '• Language proficiency certificate'],
      Transit: ['• Confirmed onward tickets', '• Transit visa (if layover >24 hours)', '• Boarding passes'],
      Work: ['• Employment contract', '• Work permit approval', '• Company sponsorship letter', '• Professional qualifications'],
      Medical: ['• Medical appointment letter', '• Doctor referral', '• Medical records', '• Hospital payment confirmation']
    };

    return `📋 **Document Requirements**\n\nFor ${nationality} citizens traveling from ${fromCountry} to ${toCountry} for ${travelType.toLowerCase()}:\n\n**General Documents:**\n${baseDocuments.join('\n')}\n\n**${travelType}-Specific:**\n${typeSpecific[travelType].join('\n')}\n\nWould you like details about visa fees or processing time?`;
  }

  if (lower.includes('visa') && (lower.includes('need') || lower.includes('required') || lower.includes('do i'))) {
    return `🛂 **Visa Requirements**\n\nFor ${nationality} passport holders traveling to ${toCountry}:\n\n**Visa Status:** Visa required for ${travelType.toLowerCase()} purposes\n\n**Visa Types Available:**\n• Single Entry (up to 30 days)\n• Multiple Entry (90 days within 180 days)\n• Long-term visa (for extended stays)\n\n**Application Methods:**\n• Online e-Visa portal\n• Embassy/Consulate appointment\n• Visa on arrival (select nationalities)\n\nShall I provide the step-by-step application process?`;
  }

  if (lower.includes('fee') || lower.includes('cost') || lower.includes('price') || lower.includes('how much')) {
    return `💰 **Visa Fees**\n\n**Standard Processing:**\n• Single Entry: $50-80 USD\n• Multiple Entry: $100-150 USD\n• Long-term: $150-300 USD\n\n**Additional Fees:**\n• Service fee: $15-30 USD\n• Rush processing: +$50 USD\n• Document attestation: $20-40 USD\n\n**Payment Methods:**\n• Credit/Debit card\n• Bank transfer\n• Online payment portals\n\nNote: Fees vary by nationality and visa type. Would you like processing timeline details?`;
  }

  if (lower.includes('time') || lower.includes('how long') || lower.includes('processing') || lower.includes('duration')) {
    return `⏱️ **Processing Timeline**\n\n**Standard Processing:** 5-15 business days\n**Express Processing:** 2-3 business days (+fee)\n**Rush Processing:** 24-48 hours (+premium fee)\n\n**Recommended Timeline:**\n• Apply at least 4-6 weeks before travel\n• Book appointment 2 weeks in advance\n• Prepare documents 1 week prior\n\n**Embassy Working Hours:**\n• Monday-Friday: 9:00 AM - 4:00 PM\n• Document submission: 9:00 AM - 12:00 PM\n\nAnything else you'd like to know?`;
  }

  if (lower.includes('step') || lower.includes('process') || lower.includes('how to apply') || lower.includes('procedure')) {
    return `📝 **Application Process**\n\n**Step 1:** Gather Required Documents\n• Passport, photos, proof of travel\n\n**Step 2:** Complete Application Form\n• Fill online or download PDF form\n\n**Step 3:** Book Appointment\n• Schedule at embassy/VFS center\n\n**Step 4:** Submit Application\n• Attend appointment with documents\n• Pay visa fee\n• Provide biometrics (if required)\n\n**Step 5:** Track & Collect\n• Use tracking number to monitor status\n• Collect passport with visa stamp\n\nNeed help with any specific step?`;
  }

  if (lower.includes('thank')) {
    return "You're welcome! 🌟 Safe travels! If you have more questions before your trip, feel free to ask.";
  }

  if (lower.includes('hello') || lower.includes('hi') || lower.includes('hey')) {
    return `Hello! 👋 I'm your Visa Advisor.\n\nI can help ${nationality} citizens with visa requirements for ${toCountry} (${travelType}).\n\nWhat would you like to know?`;
  }

  return `I can help you with:\n\n📋 **Documents** - Required paperwork\n🛂 **Visa Requirements** - Do you need a visa?\n💰 **Fees** - Costs and payments\n⏱️ **Timeline** - Processing duration\n📝 **Process** - Step-by-step guide\n\nWhat would you like to know about your trip from ${fromCountry} to ${toCountry}?`;
};

export const ChatInterface: React.FC<ChatInterfaceProps> = ({ travelData, onBack }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const greeting: ChatMessage = {
      id: Date.now().toString(),
      from: 'bot',
      text: `👋 Welcome to Visa Advisor!\n\nI'll help you with visa and document requirements for your trip.\n\n**Your Details:**\n• Nationality: ${travelData.nationality}\n• From: ${travelData.fromCountry}\n• To: ${travelData.toCountry}\n• Purpose: ${travelData.travelType}\n\nHow can I assist you today? You can ask about:\n• Required documents\n• Visa requirements\n• Fees and costs\n• Processing time`,
      timestamp: new Date(),
    };
    setMessages([greeting]);
  }, [travelData]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = () => {
    const text = inputText.trim();
    if (!text || isTyping) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      from: 'user',
      text,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    setTimeout(() => {
      const botReply: ChatMessage = {
        id: (Date.now() + 1).toString(),
        from: 'bot',
        text: generateBotReply(text, travelData),
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botReply]);
      setIsTyping(false);
    }, 800 + Math.random() * 400);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const formatMessage = (text: string) => {
    return text.split('\n').map((line, i) => (
      <span key={i}>
        {line.split(/(\*\*.*?\*\*)/).map((part, j) => {
          if (part.startsWith('**') && part.endsWith('**')) {
            return <strong key={j} className="font-semibold">{part.slice(2, -2)}</strong>;
          }
          return part;
        })}
        {i < text.split('\n').length - 1 && <br />}
      </span>
    ));
  };

  const quickReplies = [
    'What documents do I need?',
    'Do I need a visa?',
    'How much does it cost?',
    'Processing time?'
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="gradient-header text-primary-foreground sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 py-3">
          <div className="flex items-center gap-3">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={onBack}
              className="text-primary-foreground hover:bg-primary-foreground/10 -ml-2"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="w-9 h-9 rounded-full bg-primary-foreground/20 flex items-center justify-center">
              <Plane className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="font-semibold text-sm">Visa Advisor</h1>
              <p className="text-xs text-primary-foreground/70 truncate">
                {travelData.nationality} • {travelData.fromCountry} → {travelData.toCountry}
              </p>
            </div>
            <span className="text-xs bg-primary-foreground/20 px-2 py-1 rounded-full hidden sm:block">
              {travelData.travelType}
            </span>
          </div>
        </div>
      </header>

      {/* Chat Messages */}
      <ScrollArea className="flex-1 p-4" ref={scrollRef}>
        <div className="max-w-2xl mx-auto space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex items-end gap-2 animate-fade-in ${
                message.from === 'user' ? 'flex-row-reverse' : 'flex-row'
              }`}
            >
              <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${
                message.from === 'user' 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-secondary text-muted-foreground'
              }`}>
                {message.from === 'user' ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
              </div>
              <div
                className={`max-w-[85%] px-4 py-3 ${
                  message.from === 'user' ? 'chat-bubble-user' : 'chat-bubble-bot'
                }`}
              >
                <p className="text-sm leading-relaxed whitespace-pre-wrap">
                  {formatMessage(message.text)}
                </p>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex items-end gap-2 animate-fade-in">
              <div className="w-7 h-7 rounded-full bg-secondary flex items-center justify-center">
                <Bot className="w-3.5 h-3.5 text-muted-foreground" />
              </div>
              <div className="chat-bubble-bot px-4 py-3">
                <div className="flex items-center gap-1">
                  <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          )}

          {/* Quick Replies - show only after first message */}
          {messages.length === 1 && !isTyping && (
            <div className="flex flex-wrap gap-2 pt-2">
              {quickReplies.map((reply) => (
                <button
                  key={reply}
                  onClick={() => {
                    setInputText(reply);
                    setTimeout(() => sendMessage(), 100);
                  }}
                  className="text-xs px-3 py-2 rounded-full border border-primary/30 text-primary hover:bg-primary/5 transition-colors"
                >
                  {reply}
                </button>
              ))}
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Input Area */}
      <div className="border-t border-border bg-card p-3 sticky bottom-0">
        <div className="max-w-2xl mx-auto flex gap-2">
          <input
            ref={inputRef}
            type="text"
            placeholder="Type your question..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={isTyping}
            className="input-field flex-1"
          />
          <Button 
            onClick={sendMessage} 
            disabled={!inputText.trim() || isTyping}
            className="h-12 w-12 rounded-xl gradient-primary hover:opacity-90"
          >
            <Send className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};
