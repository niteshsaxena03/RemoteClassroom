"use client";

import { useState, useEffect, useRef } from "react";
import Vapi from "@vapi-ai/web";

const DoubtSolvingComponent = ({ question, context, onSessionEnd }) => {
  const [vapi, setVapi] = useState(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [volume, setVolume] = useState(0);
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState(null);
  const [sessionConfig, setSessionConfig] = useState(null);
  const messagesEndRef = useRef(null);

  // Initialize VAPI
  useEffect(() => {
    const initVapi = async () => {
      try {
        const response = await fetch('/api/vapi/doubt-solving', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ question, context })
        });

        if (!response.ok) throw new Error('Failed to initialize doubt solving session');

        const data = await response.json();
        setSessionConfig(data.config);

        const vapiInstance = new Vapi(data.config.webToken);
        setVapi(vapiInstance);

        // Set up event listeners
        vapiInstance.on('call-start', () => {
          console.log('Call started');
          setIsConnected(true);
          setIsConnecting(false);
          setError(null);
          addMessage('system', 'Voice assistant connected! You can now speak your question.');
        });

        vapiInstance.on('call-end', () => {
          console.log('Call ended');
          setIsConnected(false);
          setIsConnecting(false);
          addMessage('system', 'Voice session ended.');
        });

        vapiInstance.on('speech-start', () => {
          console.log('User started speaking');
          setIsSpeaking(true);
        });

        vapiInstance.on('speech-end', () => {
          console.log('User stopped speaking');
          setIsSpeaking(false);
        });

        vapiInstance.on('volume-level', (level) => {
          setVolume(level);
        });

        vapiInstance.on('message', (message) => {
          console.log('Message:', message);
          if (message.type === 'transcript' && message.transcript) {
            if (message.role === 'user') {
              addMessage('user', message.transcript);
            } else if (message.role === 'assistant') {
              addMessage('assistant', message.transcript);
            }
          }
        });

        vapiInstance.on('error', (error) => {
          console.error('VAPI Error:', error);
          setError('Voice assistant error: ' + error.message);
          setIsConnected(false);
          setIsConnecting(false);
        });

      } catch (err) {
        console.error('Failed to initialize VAPI:', err);
        setError('Failed to initialize voice assistant: ' + err.message);
      }
    };

    initVapi();

    return () => {
      if (vapi) {
        vapi.stop();
      }
    };
  }, [question, context]);

  // Auto scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const addMessage = (role, content) => {
    setMessages(prev => [...prev, {
      id: Date.now(),
      role,
      content,
      timestamp: new Date()
    }]);
  };

  const startCall = async () => {
    if (!vapi || !sessionConfig) {
      setError('Voice assistant not initialized');
      return;
    }

    try {
      setIsConnecting(true);
      setError(null);
      
      await vapi.start(sessionConfig.assistantId, sessionConfig.assistantOverrides);
    } catch (err) {
      console.error('Error starting call:', err);
      setError('Failed to start voice session: ' + err.message);
      setIsConnecting(false);
    }
  };

  const endCall = () => {
    if (vapi) {
      vapi.stop();
    }
    onSessionEnd?.();
  };

  const toggleMute = () => {
    if (vapi) {
      if (vapi.isMuted()) {
        vapi.unmute();
      } else {
        vapi.mute();
      }
    }
  };

  return (
    <div className="bg-gray-800/50 rounded-2xl p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold text-white">AI Doubt Solving Assistant</h3>
          <p className="text-gray-400 text-sm mt-1">
            Ask questions and get instant voice responses from our AI tutor
          </p>
        </div>
        <div className="flex items-center space-x-2">
          {volume > 0 && (
            <div className="flex items-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className={`w-1 h-6 rounded-full transition-colors ${
                    i < Math.floor(volume * 5) ? 'bg-green-400' : 'bg-gray-600'
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Question Context */}
      <div className="bg-blue-900/20 border border-blue-500/30 rounded-xl p-4">
        <h4 className="font-medium text-blue-400 mb-2">Your Question:</h4>
        <p className="text-gray-300">{question}</p>
        {context && (
          <>
            <h4 className="font-medium text-blue-400 mb-2 mt-3">Context:</h4>
            <p className="text-gray-300 text-sm">{context}</p>
          </>
        )}
      </div>

      {/* Status Indicator */}
      <div className="flex items-center space-x-3">
        <div className={`w-3 h-3 rounded-full ${
          isConnected ? 'bg-green-400' : isConnecting ? 'bg-yellow-400' : 'bg-gray-400'
        }`} />
        <span className="text-sm text-gray-400">
          {isConnected ? 'Connected' : isConnecting ? 'Connecting...' : 'Disconnected'}
        </span>
        {isSpeaking && (
          <span className="text-sm text-green-400 animate-pulse">🎤 Listening...</span>
        )}
      </div>

      {/* Error Display */}
      {error && (
        <div className="bg-red-900/20 border border-red-500/30 rounded-xl p-4">
          <p className="text-red-400 text-sm">{error}</p>
        </div>
      )}

      {/* Messages */}
      <div className="bg-gray-900/50 rounded-xl p-4 h-64 overflow-y-auto">
        <div className="space-y-3">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                  message.role === 'user'
                    ? 'bg-blue-600 text-white'
                    : message.role === 'assistant'
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-600 text-gray-300'
                }`}
              >
                <p className="text-sm">{message.content}</p>
                <p className="text-xs opacity-70 mt-1">
                  {message.timestamp.toLocaleTimeString()}
                </p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center space-x-4">
        {!isConnected && !isConnecting && (
          <button
            onClick={startCall}
            className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
            </svg>
            <span>Start Voice Session</span>
          </button>
        )}

        {(isConnected || isConnecting) && (
          <>
            <button
              onClick={toggleMute}
              className="flex items-center space-x-2 bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-3 rounded-xl font-semibold transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
              </svg>
              <span>Mute</span>
            </button>

            <button
              onClick={endCall}
              className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-4 py-3 rounded-xl font-semibold transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M3 3l18 18" />
              </svg>
              <span>End Session</span>
            </button>
          </>
        )}
      </div>

      {/* Instructions */}
      <div className="bg-gray-700/30 rounded-xl p-4">
        <h4 className="font-medium text-gray-300 mb-2">How to use:</h4>
        <ul className="text-gray-400 text-sm space-y-1">
          <li>• Click "Start Voice Session" to connect with the AI assistant</li>
          <li>• Speak clearly when you see the "🎤 Listening..." indicator</li>
          <li>• The AI will respond with voice and you'll see transcripts here</li>
          <li>• You can mute/unmute or end the session at any time</li>
        </ul>
      </div>
    </div>
  );
};

export default DoubtSolvingComponent;