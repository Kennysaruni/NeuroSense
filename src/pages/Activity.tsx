import { useState, useCallback, useRef } from 'react';
import { Volume2, Play, RefreshCw, CheckCircle2, ArrowRight, ArrowLeft, Mic, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const practiceWords = [
  { id: 1, word: 'Apple', image: 'https://images.unsplash.com/photo-1630563451961-ac2ff27616ab?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXBwbGV8ZW58MHx8MHx8fDA%3D', audio: 'apple.mp3' },
  { id: 2, word: 'Banana', image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?q=80&w=2080&auto=format&fit=crop', audio: 'banana.mp3' },
  { id: 3, word: 'Cat', image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=2043&auto=format&fit=crop', audio: 'cat.mp3' },
  { id: 4, word: 'Dog', image: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=1974&auto=format&fit=crop', audio: 'dog.mp3' },
  { id: 5, word: 'Elephant', image: 'https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?w=600&auto=format&fit=crop&q=60', audio: 'elephant.mp3' },
  { id: 6, word: 'Frog', image: 'https://images.unsplash.com/photo-1560840067-ddcaeb6831c2?w=600&auto=format&fit=crop&q=60', audio: 'frog.mp3' },
  { id: 7, word: 'Giraffe', image: 'https://images.unsplash.com/photo-1547149666-769b4e06bc9a?w=600&auto=format&fit=crop&q=60', audio: 'giraffe.mp3' },
  { id: 8, word: 'Hat', image: 'https://images.unsplash.com/photo-1521369909029-2afed882baee?w=600&auto=format&fit=crop&q=60', audio: 'hat.mp3' },
  { id: 9, word: 'Ice cream', image: 'https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?w=600&auto=format&fit=crop&q=60', audio: 'icecream.mp3' },
  { id: 10, word: 'Juice', image: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=600&auto=format&fit=crop&q=60', audio: 'juice.mp3' }
];

// Add SpeechRecognition typing
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

export default function Activity() {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showEncouragement, setShowEncouragement] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [speechFeedback, setSpeechFeedback] = useState('');
  
  const recognitionRef = useRef<any>(null);

  const currentWord = practiceWords[currentWordIndex];

  const playAudio = () => {
    if (isPlaying) return;

    if ('speechSynthesis' in window) {
      setIsPlaying(true);
      const utterance = new SpeechSynthesisUtterance(currentWord.word);
      utterance.rate = 0.85;

      utterance.onend = () => {
        setIsPlaying(false);
        setShowEncouragement(true);
        setTimeout(() => setShowEncouragement(false), 3000);
      };

      utterance.onerror = () => setIsPlaying(false);

      window.speechSynthesis.speak(utterance);
    } else {
      console.warn("Speech synthesis is not supported in this browser.");
    }
  };

  const startListening = useCallback(() => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      setSpeechFeedback("Speech recognition is not supported in this browser.");
      return;
    }

    if (isListening) return;

    try {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognitionRef.current = recognition;

      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        setIsListening(true);
        setSpeechFeedback("Listening...");
        setShowEncouragement(false);
      };

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript.toLowerCase().trim();
        const cleanedTranscript = transcript.replace(/[.,!?]/g, '');
        const targetWord = currentWord.word.toLowerCase();
        
        if (cleanedTranscript.includes(targetWord) || targetWord.includes(cleanedTranscript)) {
          setShowEncouragement(true);
          setSpeechFeedback("Great pronunciation!");
        } else {
          setSpeechFeedback(`You said: "${transcript}". Try again!`);
          setShowEncouragement(false);
        }
      };

      recognition.onerror = (event: any) => {
        setIsListening(false);
        if (event.error === 'not-allowed') {
          setSpeechFeedback("Microphone access denied.");
        } else if (event.error !== 'aborted') {
          setSpeechFeedback("Could not hear clearly. Try again.");
        }
      };

      recognition.onend = () => {
        setIsListening(false);
        setSpeechFeedback(prev => prev === "Listening..." ? "" : prev);
      };

      recognition.start();
    } catch (error) {
      setIsListening(false);
      console.error(error);
    }
  }, [currentWord.word, isListening]);

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  const nextWord = () => {
    if (currentWordIndex < practiceWords.length - 1) {
      stopListening();
      setCurrentWordIndex(currentWordIndex + 1);
      setShowEncouragement(false);
      setSpeechFeedback("");
    }
  };

  const prevWord = () => {
    if (currentWordIndex > 0) {
      stopListening();
      setCurrentWordIndex(currentWordIndex - 1);
      setShowEncouragement(false);
      setSpeechFeedback("");
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen py-12 flex flex-col items-center">
      <div className="max-w-3xl w-full px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex justify-between items-center">
          <Link to="/" className="inline-flex items-center text-slate-500 hover:text-brand-blue transition-colors font-medium">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back Home
          </Link>
          <div className="text-sm font-medium text-slate-500 bg-white px-4 py-2 rounded-full shadow-sm border border-slate-200">
            Word {currentWordIndex + 1} of {practiceWords.length}
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden relative">
          {/* Header */}
          <div className="bg-brand-blue/10 p-8 text-center border-b border-slate-100">
            <h1 className="text-3xl font-bold text-brand-blue mb-2">Speech Practice</h1>
            <p className="text-slate-600 text-lg">Listen, point, and say the word. Take your time!</p>
          </div>

          {/* Main Content */}
          <div className="p-8 md:p-12 flex flex-col items-center">
            <div className="relative w-64 h-64 md:w-80 md:h-80 mb-8 rounded-2xl overflow-hidden shadow-md border-4 border-white">
              <img
                src={currentWord.image}
                alt={currentWord.word}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <button
                onClick={playAudio}
                className="absolute inset-0 bg-black/20 hover:bg-black/10 transition-colors flex items-center justify-center group"
                aria-label={`Play audio for ${currentWord.word}`}
              >
                <div className={`w-20 h-20 rounded-full bg-white/90 flex items-center justify-center shadow-lg transform transition-transform ${isPlaying ? 'scale-95 bg-brand-blue text-white' : 'group-hover:scale-110 text-brand-blue'}`}>
                  {isPlaying ? <Volume2 className="w-10 h-10 animate-pulse" /> : <Play className="w-10 h-10 ml-2" />}
                </div>
              </button>
            </div>

            <h2 className="text-5xl md:text-6xl font-black text-slate-900 mb-8 tracking-tight">
              {currentWord.word}
            </h2>

            {/* Feedback / Encouragement Message */}
            <div className={`h-16 flex items-center justify-center transition-opacity duration-300 w-full`}>
              {showEncouragement ? (
                <div className="bg-brand-green/10 text-brand-green px-6 py-3 rounded-full font-bold text-lg flex items-center shadow-sm border border-brand-green/20">
                  <CheckCircle2 className="w-6 h-6 mr-2" />
                  {speechFeedback || "Great job! Try another one."}
                </div>
              ) : speechFeedback ? (
                <div className="bg-amber-50 text-amber-700 px-6 py-3 rounded-full font-medium text-md flex items-center shadow-sm border border-amber-200">
                  {speechFeedback === "Listening..." ? (
                    <Mic className="w-5 h-5 mr-2 animate-pulse text-amber-700" />
                  ) : (
                    <AlertCircle className="w-5 h-5 mr-2" />
                  )}
                  {speechFeedback}
                </div>
              ) : (
                <span className="opacity-0">Placeholder</span>
              )}
            </div>

            {/* Controls */}
            <div className="w-full flex flex-col sm:flex-row justify-center sm:justify-between items-center mt-8 pt-8 border-t border-slate-100 gap-4 sm:gap-0">
              <button
                onClick={prevWord}
                disabled={currentWordIndex === 0}
                className="hidden sm:flex items-center px-6 py-3 rounded-xl font-medium text-slate-600 hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Previous
              </button>

              <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                <button
                  onClick={playAudio}
                  className="flex justify-center items-center px-6 py-4 sm:py-3 rounded-xl font-bold text-white bg-brand-blue hover:bg-blue-800 shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5"
                >
                  <RefreshCw className="w-5 h-5 mr-2" />
                  Listen Again
                </button>
                <button
                  onClick={isListening ? stopListening : startListening}
                  className={`flex justify-center items-center px-6 py-4 sm:py-3 rounded-xl font-bold text-white shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 ${
                     isListening ? 'bg-red-500 hover:bg-red-600' : 'bg-brand-teal hover:bg-teal-700'
                  }`}
                >
                  <Mic className={`w-5 h-5 mr-2 ${isListening ? 'animate-bounce' : ''}`} />
                  {isListening ? 'Listening...' : 'Say It'}
                </button>
              </div>

              <button
                onClick={nextWord}
                disabled={currentWordIndex === practiceWords.length - 1}
                className="hidden sm:flex items-center px-6 py-3 rounded-xl font-medium text-slate-600 hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Next
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>

              {/* Mobile Only Prev/Next */}
              <div className="flex w-full sm:hidden justify-between gap-4">
                <button
                  onClick={prevWord}
                  disabled={currentWordIndex === 0}
                  className="flex-1 flex justify-center items-center px-4 py-4 rounded-xl font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ArrowLeft className="w-5 h-5 mr-2" />
                  Prev
                </button>
                <button
                  onClick={nextWord}
                  disabled={currentWordIndex === practiceWords.length - 1}
                  className="flex-1 flex justify-center items-center px-4 py-4 rounded-xl font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Next
                  <ArrowRight className="w-5 h-5 ml-2" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
