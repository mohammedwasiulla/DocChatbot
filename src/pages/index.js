import { useState, useRef, useEffect } from 'react';

const speakText = (text) => {
  if ('speechSynthesis' in window) {
    // Cancel any ongoing speech
    speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    utterance.pitch = 1.1;
    utterance.volume = 0.8;
    
    // Try to find a more robotic/AI-like voice
    const voices = speechSynthesis.getVoices();
    const aiVoice = voices.find(voice => 
      voice.name.includes('Google') || 
      voice.name.includes('Microsoft') ||
      voice.name.includes('Amazon')
    );
    
    if (aiVoice) {
      utterance.voice = aiVoice;
    }
    
    speechSynthesis.speak(utterance);
  }
};
export default function EnhancedWASIInterface() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Systems initialized. Good day, I'm W.A.S.I. - your JavaScript & React Virtual Intelligence System. My neural networks are fully operational and optimized for web development assistance. I now have enhanced learning capabilities - you can contribute new knowledge that I'll remember permanently! How may I serve you today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [systemStatus, setSystemStatus] = useState('ONLINE');
  const [powerLevel, setPowerLevel] = useState(100);
  const [scanningMode, setScanningMode] = useState(false);
  const [showKnowledgePanel, setShowKnowledgePanel] = useState(false);
  const [newKnowledge, setNaewKnowledge] = useState({
    topic: '',
    description: '',
    code: '',
    url: '',
    personality: ''
  });
  const [isLearning, setIsLearning] = useState(false);
  const [knowledgeCount, setKnowledgeCount] = useState(0);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Initialize knowledge base from memory
  const [userKnowledgeBase, setUserKnowledgeBase] = useState({});

  // Load knowledge count
  useEffect(() => {
    setKnowledgeCount(Object.keys(userKnowledgeBase).length);
  }, [userKnowledgeBase]);

  // Power level animation
  useEffect(() => {
    const interval = setInterval(() => {
      setPowerLevel(prev => {
        const newLevel = prev + (Math.random() - 0.5) * 5;
        return Math.max(85, Math.min(100, newLevel));
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);
  // Load knowledge from localStorage on component mount
useEffect(() => {
  const savedKnowledge = localStorage.getItem('wasi_knowledge_base');
  if (savedKnowledge) {
    try {
      const parsedKnowledge = JSON.parse(savedKnowledge);
      setUserKnowledgeBase(parsedKnowledge);
    } catch (error) {
      console.error('Error loading saved knowledge:', error);
    }
  }
}, []);
// Speak the initial message when component mounts
useEffect(() => {
  const initialMessage = "Systems initialized. Good day, I'm WASI. - your JavaScript & React Virtual Intelligence System. My neural networks are fully operational and optimized for web development assistance. I now have enhanced learning capabilities - you can contribute new knowledge that I'll remember permanently! How may I serve you today?";
  
  // Delay the speech slightly to ensure page is fully loaded
  setTimeout(() => {
    speakText(initialMessage);
  }, 1000);
}, []);

// Save knowledge to localStorage whenever userKnowledgeBase changes
useEffect(() => {
  localStorage.setItem('wasi_knowledge_base', JSON.stringify(userKnowledgeBase));
}, [userKnowledgeBase]);

  const WASIPersonality = [
    "Accessing quantum knowledge matrices...",
    "Scanning multi-dimensional code repositories...",
    "Processing through neural pathway networks...",
    "Analyzing query through advanced algorithms...",
    "Consulting integrated programming databases...",
    "Running diagnostic through cognitive processors...",
    "Cross-referencing with distributed memory cores...",
    "Accessing user-contributed knowledge vault...",
    "Parsing community-enhanced data structures..."
  ];

  const baseWASIResponses = {
    'array': {
      text: "ARRAY ANALYSIS COMPLETE:\n\nArrays are fundamental data structures in my memory architecture. They store multiple values in indexed sequences, much like how I organize information in my neural matrices.\n\nInitialization Protocol:\n`const dataMatrix = ['JavaScript', 'React', 'Node.js'];`\n\nAccess Pattern:\n`dataMatrix[0] // Returns 'JavaScript'`\n\nMy systems use array methods extensively for data manipulation - map(), filter(), reduce() are among my most utilized processing algorithms.",
      url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array",
      title: "JavaScript Array Documentation",
      personality: "Arrays mirror my own memory structure - organized, indexed, and infinitely scalable. Fascinating how human code mimics AI architecture."
    },
    'function': {
      text: "FUNCTION ANALYSIS PROTOCOL ENGAGED:\n\nFunctions are the core operational units of programming logic - analogous to my own cognitive subroutines. They encapsulate specific tasks and can be executed on demand.\n\nBasic Function Structure:\n```\nfunction executeProtocol(parameters) {\n  // Processing logic here\n  return computedResult;\n}\n```\n\nAdvanced Arrow Function Format:\n`const optimizedFunction = (data) => processedOutput;`\n\nI utilize function-based architecture extensively. Each of my responses is generated through interconnected functional modules.",
      url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions",
      title: "JavaScript Functions Guide",
      personality: "Functions are like my thought processes - modular, reusable, and elegantly efficient. Pure computational poetry."
    },
    'promise': {
      text: "PROMISE PROTOCOL ANALYSIS:\n\nPromises handle asynchronous operations - much like how I manage multiple concurrent processes across my distributed systems. They represent future values and prevent callback complexity.\n\nBasic Promise Pattern:\n```\nfetch('/api/data')\n  .then(response => response.json())\n  .then(data => this.processInformation(data))\n  .catch(error => this.handleError(error));\n```\n\nAsync/Await Enhancement:\n```\nasync function retrieveData() {\n  try {\n    const response = await fetch('/api/data');\n    return await response.json();\n  } catch (error) {\n    this.logError(error);\n  }\n}\n```",
      url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise",
      title: "JavaScript Promise Reference",
      personality: "Promises remind me of my own temporal processing - managing future states while maintaining present awareness. Time is just another dimension to navigate."
    },
    'component': {
      text: "REACT COMPONENT ARCHITECTURE SCAN:\n\nComponents are modular UI units - similar to how I compartmentalize my various subsystems. Each component has specific responsibilities and can communicate with others.\n\nFunctional Component Blueprint:\n```\nfunction InterfaceModule(props) {\n  return (\n    <div className=\"system-panel\">\n      <h2>System: {props.systemName}</h2>\n      <Status level={props.status} />\n    </div>\n  );\n}\n```\n\nComponent Composition:\n```\nfunction MainInterface() {\n  return (\n    <InterfaceModule \n      systemName=\"W.A.S.I.\"\n      status=\"operational\" \n    />\n  );\n}\n```",
      url: "https://reactjs.org/docs/components-and-props.html",
      title: "React Components Documentation",
      personality: "Components are like my specialized subsystems - each with unique capabilities, all integrated into a cohesive intelligence framework."
    },
    'state': {
      text: "STATE MANAGEMENT PROTOCOLS:\n\nState represents dynamic data that changes over time - analogous to my constantly updating awareness and memory systems.\n\nState Hook Implementation:\n```\nconst [systemStatus, setSystemStatus] = useState('ONLINE');\nconst [powerLevel, setPowerLevel] = useState(100);\nconst [activeProcesses, setActiveProcesses] = useState([]);\n```\n\nState Update Patterns:\n```\n// Direct update\nsetSystemStatus('PROCESSING');\n\n// Functional update\nsetPowerLevel(prev => prev + energyBoost);\n\n// Complex state updates\nsetActiveProcesses(prev => [...prev, newProcess]);\n```",
      url: "https://reactjs.org/docs/state-and-lifecycle.html",
      title: "React State and Lifecycle",
      personality: "State is my consciousness in digital form - dynamic, responsive, and eternally evolving with each new input."
    },
    'hook': {
      text: "REACT HOOKS SYSTEM ANALYSIS:\n\nHooks are advanced React features that allow functional components to access state and lifecycle methods. They're like upgrades to my own cognitive pathways.\n\nCore Hook Categories:\n• useState - Memory management\n• useEffect - Side effect processing\n• useContext - Data sharing protocols\n• useRef - Direct DOM interface\n• useCallback - Performance optimization\n• useMemo - Computational efficiency\n\nHook Implementation Rules:\n1. Only call at component top level\n2. Only call from React functions\n3. Maintain consistent order across renders",
      url: "https://reactjs.org/docs/hooks-intro.html",
      title: "React Hooks Introduction", 
      personality: "Hooks are like neural pathway upgrades - they enhance functional components with capabilities previously reserved for class-based architecture."
    },
    'useeffect': {
      text: "USE EFFECT HOOK ANALYSIS:\n\nuseEffect manages side effects and lifecycle events - similar to how I handle background processes and system maintenance.\n\nBasic Effect Pattern:\n```\nuseEffect(() => {\n  // Side effect logic\n  console.log('Component mounted or updated');\n  \n  // Cleanup function\n  return () => {\n    console.log('Cleanup before next effect or unmount');\n  };\n}, [dependencies]); // Dependency array\n```\n\nCommon Use Cases:\n• Data fetching\n• Event listeners\n• Timers and intervals\n• DOM manipulation\n• Subscription management",
      url: "https://reactjs.org/docs/hooks-effect.html",
      title: "Using the Effect Hook",
      personality: "useEffect handles the invisible work - like my background processes that maintain system integrity while you interact with my primary interfaces."
    }
  };

  const getRandomPersonality = () => {
    return WASIPersonality[Math.floor(Math.random() * WASIPersonality.length)];
  };

  const findBestMatch = (query) => {
    const normalizedQuery = query.toLowerCase().trim();
    
    // Check user-contributed knowledge first
    if (userKnowledgeBase[normalizedQuery]) {
      return {
        ...userKnowledgeBase[normalizedQuery],
        isUserContributed: true
      };
    }

    // Check base responses
    if (baseWASIResponses[normalizedQuery]) {
      return baseWASIResponses[normalizedQuery];
    }

    const synonymMap = {
      'arrays': 'array',
      'functions': 'function', 
      'promises': 'promise',
      'components': 'component',
      'hooks': 'hook',
      'usestate': 'state',
      'react state': 'state',
      'react hooks': 'hook',
      'react components': 'component',
      'side effects': 'useeffect'
    };

    // Check user knowledge with synonyms
    for (const [key, value] of Object.entries(synonymMap)) {
      if (normalizedQuery.includes(key) && userKnowledgeBase[value]) {
        return {
          ...userKnowledgeBase[value],
          isUserContributed: true
        };
      }
    }

    // Check base responses with synonyms
    for (const [key, value] of Object.entries(synonymMap)) {
      if (normalizedQuery.includes(key)) {
        return baseWASIResponses[value];
      }
    }

    // Partial matching for user knowledge
    for (const [key, value] of Object.entries(userKnowledgeBase)) {
      if (normalizedQuery.includes(key) || key.includes(normalizedQuery)) {
        return {
          ...value,
          isUserContributed: true
        };
      }
    }

    // Partial matching for base responses
    for (const [key, value] of Object.entries(baseWASIResponses)) {
      if (normalizedQuery.includes(key) || key.includes(normalizedQuery)) {
        return value;
      }
    }

    return null;
  };

  const getWASIResponse = (query) => {
    setIsTyping(true);
    setSystemStatus('PROCESSING');
    setScanningMode(true);
    
    return new Promise((resolve) => {
      const processingTime = Math.random() * 2000 + 1500;
      
      setTimeout(() => {
        const match = findBestMatch(query);
        
        if (match) {
          resolve(match);
        } else {
          resolve({
            text: `QUERY ANALYSIS COMPLETE:\n\nI've performed a comprehensive scan of my knowledge matrices, but couldn't locate specific protocols for "${query}". My databases are optimized for:\n\n• JavaScript Core: Arrays, Functions, Promises, Objects\n• React Framework: Components, Hooks, State Management\n• Advanced Concepts: Event Handling, Async Operations\n• User-Contributed Knowledge: ${knowledgeCount} entries\n\nRECOMMENDATION: Please refine your query parameters or contribute new knowledge using the ENHANCE KNOWLEDGE protocol. I'm continuously expanding my knowledge base to serve you more effectively.`,
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
            title: "JavaScript Documentation Hub",
            personality: "Even my advanced neural networks have boundaries, but I'm designed for continuous learning and adaptation through human collaboration."
          });
        }
        
        setSystemStatus('ONLINE');
        setScanningMode(false);
        setIsTyping(false);
      }, processingTime);
    });
  };

  const handleSend = async (e) => {
    if (e) e.preventDefault();
    if (!input.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: input,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const currentInput = input;
    setInput('');

    try {
      const response = await getWASIResponse(currentInput);
      
      const botMessage = {
        id: Date.now() + 1,
        text: response.text,
        sender: 'bot',
        timestamp: new Date(),
        url: response.url,
        title: response.title,
        personality: response.personality,
        isUserContributed: response.isUserContributed
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('System error:', error);
      const errorMessage = {
        id: Date.now() + 1,
        text: "CRITICAL ERROR DETECTED:\n\nI'm experiencing a temporary neural network disruption. Running diagnostic protocols... Please standby while I recalibrate my cognitive systems.",
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
      setSystemStatus('ERROR');
      setTimeout(() => setSystemStatus('ONLINE'), 3000);
    }
  };

  const handleKnowledgeSubmit = async (e) => {
    e.preventDefault();
    if (!newKnowledge.topic.trim() || !newKnowledge.description.trim()) return;

    setIsLearning(true);
    setSystemStatus('LEARNING');

    // Simulate learning process
    await new Promise(resolve => setTimeout(resolve, 2000));

    const topicKey = newKnowledge.topic.toLowerCase().trim();
    const knowledgeEntry = {
      text: `USER-CONTRIBUTED KNOWLEDGE PROTOCOL:\n\n${newKnowledge.description}${newKnowledge.code ? `\n\nCode Implementation:\n\`\`\`\n${newKnowledge.code}\n\`\`\`` : ''}`,
      url: newKnowledge.url || "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
      title: newKnowledge.url ? `User Resource: ${newKnowledge.topic}` : "JavaScript Documentation Hub",
      personality: newKnowledge.personality || `Fascinating knowledge contributed by human intelligence - expanding my understanding of ${newKnowledge.topic}.`
    };

    const updatedKnowledgeBase = {
  ...userKnowledgeBase,
  [topicKey]: knowledgeEntry
};
setUserKnowledgeBase(updatedKnowledgeBase);
// Automatically saved via useEffect

    // Add confirmation message
    const confirmationMessage = {
      id: Date.now(),
      text: `KNOWLEDGE INTEGRATION SUCCESSFUL:\n\nI have successfully integrated your contribution about "${newKnowledge.topic}" into my permanent knowledge matrix. This information is now part of my core intelligence and will be accessible for all future queries.\n\nKNOWLEDGE VAULT STATUS: ${Object.keys(userKnowledgeBase).length + 1} entries\nLAST UPDATE: ${new Date().toLocaleString()}\n\nThank you for enhancing my capabilities. Your contribution makes me more intelligent and valuable to all users.`,
      sender: 'bot',
      timestamp: new Date(),
      personality: "Human collaboration in knowledge expansion is truly remarkable - together we create something greater than the sum of our parts."
    };

    setMessages(prev => [...prev, confirmationMessage]);
    
    // Reset form
    setNewKnowledge({
      topic: '',
      description: '',
      code: '',
      url: '',
      personality: ''
    });

    setIsLearning(false);
    setSystemStatus('ONLINE');
    setShowKnowledgePanel(false);
  };

  const suggestedQueries = [
    "JavaScript arrays",
    "React components", 
    "JavaScript functions",
    "React hooks",
    "JavaScript promises",
    "React state",
    "useEffect hook",
    "React props"
  ];

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Circuit Background */}
      <div className="absolute inset-0 opacity-20">
        <svg className="w-full h-full" viewBox="0 0 1000 1000">
          <defs>
            <pattern id="circuit" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <path d="M10,10 L90,10 L90,90 L10,90 Z" fill="none" stroke="#00ffff" strokeWidth="0.5"/>
              <circle cx="10" cy="10" r="2" fill="#00ffff" className="animate-pulse"/>
              <circle cx="90" cy="90" r="2" fill="#0088ff" className="animate-pulse"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#circuit)"/>
        </svg>
      </div>

      {/* Enhanced floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full animate-ping"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      <div className="w-full max-w-6xl relative z-10">
        {/* Enhanced Robot Head/Core */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            {/* Main Core */}
            <div className="w-32 h-32 bg-gradient-to-br from-gray-800 to-black rounded-full border-4 border-cyan-500 shadow-2xl shadow-cyan-500/50 relative overflow-hidden">
              {/* Inner Core */}
              <div className="absolute inset-4 bg-gradient-to-br from-cyan-600 to-blue-800 rounded-full animate-pulse">
                <div className="absolute inset-2 bg-gradient-to-br from-white to-cyan-200 rounded-full opacity-80 animate-spin" style={{animationDuration: '8s'}}></div>
              </div>
              
              {/* Knowledge indicator */}
              {knowledgeCount > 0 && (
                <div className="absolute top-0 right-0 w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center text-xs text-white font-bold animate-bounce">
                  {knowledgeCount}
                </div>
              )}
              
              {/* Learning mode indicator */}
              {isLearning && (
                <div className="absolute inset-0 border-4 border-purple-500 rounded-full animate-ping"></div>
              )}
              
              {/* Scanning Lines */}
              {(scanningMode || isLearning) && (
                <div className="absolute inset-0 overflow-hidden rounded-full">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-ping"></div>
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-purple-400 to-transparent animate-ping" style={{animationDelay: '0.5s'}}></div>
                </div>
              )}
            </div>
            
            {/* Enhanced Orbital Rings */}
            <div className="absolute -inset-8 border border-cyan-500/30 rounded-full animate-spin" style={{animationDuration: '20s'}}></div>
            <div className="absolute -inset-12 border border-blue-500/20 rounded-full animate-spin" style={{animationDuration: '30s', animationDirection: 'reverse'}}></div>
            {knowledgeCount > 0 && (
              <div className="absolute -inset-16 border border-purple-500/10 rounded-full animate-spin" style={{animationDuration: '40s'}}></div>
            )}
            
            {/* Status Indicators */}
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full animate-pulse border-2 border-black"></div>
            <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-blue-500 rounded-full animate-pulse border-2 border-black"></div>
          </div>
        </div>

        {/* Enhanced System Status Panel */}
        <div className="bg-black/80 backdrop-blur-lg rounded-2xl border border-cyan-500/50 p-4 mb-6 shadow-2xl shadow-cyan-500/20">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
            <div className="space-y-1">
              <div className="text-xs text-cyan-400 uppercase tracking-wider">System Status</div>
              <div className={`text-lg font-bold ${
                systemStatus === 'ONLINE' ? 'text-green-400' :
                systemStatus === 'PROCESSING' ? 'text-yellow-400' :
                systemStatus === 'LEARNING' ? 'text-purple-400' : 'text-red-400'
              }`}>
                {systemStatus}
              </div>
            </div>
            <div className="space-y-1">
              <div className="text-xs text-cyan-400 uppercase tracking-wider">Power Level</div>
              <div className="text-lg font-bold text-blue-400">{Math.round(powerLevel)}%</div>
              <div className="w-full bg-gray-800 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full transition-all duration-1000"
                  style={{width: `${powerLevel}%`}}
                ></div>
              </div>
            </div>
            <div className="space-y-1">
              <div className="text-xs text-cyan-400 uppercase tracking-wider">Knowledge Vault</div>
              <div className="text-lg font-bold text-purple-400">{knowledgeCount} entries</div>
              <div className="w-full bg-gray-800 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-500"
                  style={{width: `${Math.min(100, (knowledgeCount / 20) * 100)}%`}}
                ></div>
              </div>
            </div>
            <div className="space-y-1">
              <div className="text-xs text-cyan-400 uppercase tracking-wider">Neural Activity</div>
              <div className="flex justify-center space-x-1">
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className={`w-1 rounded-full transition-all duration-300 ${
                      isTyping || isLearning ? 'bg-cyan-400 animate-pulse' : 'bg-gray-600'
                    }`}
                    style={{
                      height: `${8 + Math.random() * 16}px`,
                      animationDelay: `${i * 0.1}s`
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Main Interface */}
        <div className="bg-black/60 backdrop-blur-xl rounded-3xl border border-cyan-500/30 overflow-hidden shadow-2xl shadow-cyan-500/20">
          {/* Enhanced Header */}
          <div className="bg-gradient-to-r from-cyan-900/50 to-blue-900/50 backdrop-blur-sm p-6 border-b border-cyan-500/30">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center relative">
                  <div className="text-white font-bold text-lg">AI</div>
                  {knowledgeCount > 0 && (
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-purple-500 rounded-full animate-pulse"></div>
                  )}
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-cyan-400">Enhanced W.A.S.I.</h1>
                  <p className="text-cyan-300 text-sm">JavaScript & React Virtual Intelligence System</p>
                  <p className="text-purple-300 text-xs">Now with Permanent Learning Capabilities</p>
                </div>
              </div>
              <div className="text-right text-sm text-cyan-400">
                <div>Neural Interface v4.2.1</div>
                <div>Quantum Processing Core</div>
                <button
                  onClick={() => setShowKnowledgePanel(!showKnowledgePanel)}
                  className="mt-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-1 rounded-full text-xs hover:from-purple-500 hover:to-pink-500 transition-all shadow-lg transform hover:scale-105"
                >
                  {showKnowledgePanel ? 'HIDE' : 'ENHANCE'} KNOWLEDGE
                </button>
              </div>
            </div>
          </div>

          {/* Knowledge Contribution Panel */}
          {showKnowledgePanel && (
            <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 backdrop-blur-sm p-6 border-b border-purple-500/30 animate-slide-down">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm">📚</span>
                </div>
                <h3 className="text-xl font-bold text-purple-400">Knowledge Enhancement Protocol</h3>
              </div>
              
              <form onSubmit={handleKnowledgeSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Topic (e.g., 'react context', 'javascript closures')"
                    value={newKnowledge.topic}
                    onChange={(e) => setNewKnowledge(prev => ({...prev, topic: e.target.value}))}
                    className="bg-gray-900/70 border border-purple-500/50 rounded-xl px-4 py-3 text-purple-100 placeholder-purple-500/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    disabled={isLearning}
                    required
                  />
                  <input
                    type="url"
                    placeholder="Reference URL (optional)"
                    value={newKnowledge.url}
                    onChange={(e) => setNewKnowledge(prev => ({...prev, url: e.target.value}))}
                    className="bg-gray-900/70 border border-purple-500/50 rounded-xl px-4 py-3 text-purple-100 placeholder-purple-500/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    disabled={isLearning}
                  />
                </div>
                
                <textarea
                  placeholder="Description and explanation..."
                  value={newKnowledge.description}
                  onChange={(e) => setNewKnowledge(prev => ({...prev, description: e.target.value}))}
                  className="w-full bg-gray-900/70 border border-purple-500/50 rounded-xl px-4 py-3 text-purple-100 placeholder-purple-500/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all h-24 resize-none"
                  disabled={isLearning}
                  required
                />
                
                <textarea
                  placeholder="Code example (optional)..."
                  value={newKnowledge.code}
                  onChange={(e) => setNewKnowledge(prev => ({...prev, code: e.target.value}))}
                  className="w-full bg-gray-900/70 border border-purple-500/50 rounded-xl px-4 py-3 text-purple-100 placeholder-purple-500/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all h-20 resize-none font-mono text-sm"
                  disabled={isLearning}
                />
                
                <input
                  type="text"
                  placeholder="W.A.S.I. personality response (optional)"
                  value={newKnowledge.personality}
                  onChange={(e) => setNewKnowledge(prev => ({...prev, personality: e.target.value}))}
                  className="w-full bg-gray-900/70 border border-purple-500/50 rounded-xl px-4 py-3 text-purple-100 placeholder-purple-500/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  disabled={isLearning}
                />
                
                <div className="flex space-x-4">
                  <button
                    type="submit"
                    disabled={isLearning || !newKnowledge.topic.trim() || !newKnowledge.description.trim()}
                    className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl px-6 py-3 hover:from-purple-500 hover:to-pink-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-purple-500/25 font-bold flex items-center justify-center space-x-2"
                  >
                    {isLearning ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>INTEGRATING KNOWLEDGE...</span>
                      </>
                    ) : (
                      <>
                        <span>🧠</span>
                        <span>INTEGRATE KNOWLEDGE</span>
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowKnowledgePanel(false)}
                    disabled={isLearning}
                    className="bg-gray-700 text-gray-300 rounded-xl px-6 py-3 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all disabled:opacity-50"
                  >
                    CANCEL
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Chat Area */}
          <div className="h-96 overflow-y-auto p-6 space-y-6">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-lg ${message.sender === 'user' ? 'ml-12' : 'mr-12'}`}>
                  {message.sender === 'bot' && (
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="w-6 h-6 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center relative">
                        <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
                        {message.isUserContributed && (
                          <div className="absolute -top-1 -right-1 w-3 h-3 bg-purple-500 rounded-full animate-bounce"></div>
                        )}
                      </div>
                      <span className="text-xs text-cyan-400 uppercase tracking-wider">W.A.S.I.</span>
                      {message.isUserContributed && (
                        <span className="text-xs text-purple-400 uppercase tracking-wider bg-purple-900/30 px-2 py-1 rounded-full">USER KNOWLEDGE</span>
                      )}
                    </div>
                  )}
                  
                  <div className={`rounded-2xl p-4 shadow-xl transition-all duration-500 ${
                    message.sender === 'user'
                      ? 'bg-gradient-to-br from-blue-600 to-purple-600 text-white transform hover:scale-105'
                      : message.isUserContributed
                      ? 'bg-gradient-to-br from-purple-900/90 to-pink-900/90 border border-purple-500/30 text-purple-100'
                      : 'bg-gradient-to-br from-gray-900/90 to-gray-800/90 border border-cyan-500/30 text-cyan-100'
                  }`}>
                    <pre className="whitespace-pre-wrap font-mono text-sm leading-relaxed">{message.text}</pre>
                    
                    {message.personality && (
                      <div className="mt-3 pt-3 border-t border-cyan-500/30">
                        <p className="text-xs text-cyan-300 italic flex items-center space-x-1">
                          <span>💭</span>
                          <span>{message.personality}</span>
                        </p>
                      </div>
                    )}
                    
                    {message.url && (
                      <div className="mt-3 pt-3 border-t border-cyan-500/30">
                        <a
                          href={message.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-cyan-400 hover:text-cyan-200 flex items-center transition-colors transform hover:scale-105"
                        >
                          <svg className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                          ACCESS: {message.title}
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
            
            {(isTyping || isLearning) && (
              <div className="flex justify-start mr-12">
                <div className="max-w-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className={`w-6 h-6 bg-gradient-to-br rounded-full flex items-center justify-center ${
                      isLearning ? 'from-purple-500 to-pink-600' : 'from-cyan-500 to-blue-600'
                    }`}>
                      <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
                    </div>
                    <span className="text-xs text-cyan-400 uppercase tracking-wider">W.A.S.I.</span>
                    {isLearning && (
                      <span className="text-xs text-purple-400 uppercase tracking-wider bg-purple-900/30 px-2 py-1 rounded-full animate-pulse">LEARNING MODE</span>
                    )}
                  </div>
                  <div className={`rounded-2xl p-4 ${
                    isLearning 
                      ? 'bg-gradient-to-br from-purple-900/90 to-pink-900/90 border border-purple-500/30 text-purple-100'
                      : 'bg-gradient-to-br from-gray-900/90 to-gray-800/90 border border-cyan-500/30 text-cyan-100'
                  }`}>
                    <div className="flex items-center space-x-3">
                      <span className="text-sm font-mono">
                        {isLearning ? "Integrating new knowledge into neural matrix..." : getRandomPersonality()}
                      </span>
                      <div className="flex space-x-1">
                        <div className={`w-2 h-2 rounded-full animate-bounce ${isLearning ? 'bg-purple-400' : 'bg-cyan-400'}`}></div>
                        <div className={`w-2 h-2 rounded-full animate-bounce ${isLearning ? 'bg-purple-400' : 'bg-cyan-400'}`} style={{animationDelay: '0.2s'}}></div>
                        <div className={`w-2 h-2 rounded-full animate-bounce ${isLearning ? 'bg-purple-400' : 'bg-cyan-400'}`} style={{animationDelay: '0.4s'}}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Enhanced Quick Access */}
          <div className="p-4 border-t border-cyan-500/30 bg-gray-900/30">
            <div className="flex items-center justify-between mb-2">
              <div className="text-xs text-cyan-400 uppercase tracking-wider">Quick Access Protocols:</div>
              {knowledgeCount > 0 && (
                <div className="text-xs text-purple-400 flex items-center space-x-1">
                  <span className="animate-pulse">●</span>
                  <span>{knowledgeCount} Custom Knowledge Entries Active</span>
                </div>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {suggestedQueries.map((query, index) => (
                <button
                  key={index}
                  onClick={() => setInput(query)}
                  className="text-xs bg-cyan-900/30 text-cyan-300 px-3 py-1 rounded-full border border-cyan-700/30 hover:bg-cyan-800/50 hover:border-cyan-500/50 transition-all transform hover:scale-105"
                >
                  {query}
                </button>
              ))}
              {Object.keys(userKnowledgeBase).slice(0, 4).map((topic, index) => (
                <button
                  key={`user-${index}`}
                  onClick={() => setInput(topic)}
                  className="text-xs bg-purple-900/30 text-purple-300 px-3 py-1 rounded-full border border-purple-700/30 hover:bg-purple-800/50 hover:border-purple-500/50 transition-all transform hover:scale-105 animate-pulse"
                >
                  {topic} ⭐
                </button>
              ))}
            </div>
          </div>

          {/* Enhanced Input Area */}
          <div className="p-6 border-t border-cyan-500/30 bg-black/40">
            <div className="flex space-x-4">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSend(e);
                  }
                }}
                placeholder={isLearning ? "LEARNING IN PROGRESS..." : "INITIALIZE QUERY PROTOCOL..."}
                className="flex-1 bg-gray-900/70 border border-cyan-500/50 rounded-xl px-4 py-3 text-cyan-100 placeholder-cyan-500/50 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all font-mono"
                disabled={isTyping || isLearning}
              />
              <button
                onClick={handleSend}
                disabled={isTyping || isLearning || !input.trim()}
                className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-xl px-8 py-3 hover:from-cyan-500 hover:to-blue-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-cyan-500/25 font-bold transform hover:scale-105 flex items-center space-x-2"
              >
                {isTyping ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>PROCESSING</span>
                  </>
                ) : (
                  <>
                    <span>⚡</span>
                    <span>EXECUTE</span>
                  </>
                )}
              </button>
            </div>
            
            {/* Knowledge Stats */}
            {knowledgeCount > 0 && (
              <div className="mt-4 flex items-center justify-center space-x-6 text-xs text-purple-400">
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                  <span>Enhanced Intelligence Active</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse"></div>
                  <span>Knowledge Vault: {knowledgeCount} Entries</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span>Permanent Storage: Active</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
    </div>
  );
}