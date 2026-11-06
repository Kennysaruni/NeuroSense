import { useState, useCallback, useRef, useEffect } from 'react';
import {
  Volume2,
  Play,
  RefreshCw,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Mic,
  AlertCircle,
  Brain,
  MessageSquare,
  Trophy,
  RotateCcw,
} from 'lucide-react';
import { Link } from 'react-router-dom';

const practiceWords = [
  { id: 1, word: 'Apple', syllables: 'Ap - ple', image: 'https://images.unsplash.com/photo-1630563451961-ac2ff27616ab?w=600&auto=format&fit=crop&q=60' },
  { id: 2, word: 'Banana', syllables: 'Ba - na - na', image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?q=80&w=2080&auto=format&fit=crop' },
  { id: 3, word: 'Cat', syllables: 'Cat', image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=2043&auto=format&fit=crop' },
  { id: 4, word: 'Dog', syllables: 'Dog', image: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=1974&auto=format&fit=crop' },
  { id: 5, word: 'Elephant', syllables: 'El - e - phant', image: 'https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?w=600&auto=format&fit=crop&q=60' },
  { id: 6, word: 'Frog', syllables: 'Frog', image: 'https://images.unsplash.com/photo-1698435354321-0bccb1549b4d?w=600&auto=format&fit=crop&q=60' },
  { id: 7, word: 'Giraffe', syllables: 'Gi - raffe', image: 'https://plus.unsplash.com/premium_photo-1661813434310-98cca4c9135e?w=600&auto=format&fit=crop&q=60' },
  { id: 8, word: 'Hat', syllables: 'Hat', image: 'https://images.unsplash.com/photo-1521369909029-2afed882baee?w=600&auto=format&fit=crop&q=60' },
  { id: 9, word: 'Ice cream', syllables: 'Ice - cream', image: 'https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?w=600&auto=format&fit=crop&q=60' },
  { id: 10, word: 'Juice', syllables: 'Juice', image: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=600&auto=format&fit=crop&q=60' }
];

// Memory match cards
const MEMORY_EMOJIS = ['🍎', '🐱', '🐶', '🍌', '⚽', '🎈'];

interface MemoryCard {
  id: number;
  emoji: string;
  isFlipped: boolean;
  isMatched: boolean;
}

declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

export default function Activity() {
  const [activeTab, setActiveTab] = useState<'speech' | 'focus'>('speech');

  // Speech Practice State
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showEncouragement, setShowEncouragement] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [speechFeedback, setSpeechFeedback] = useState('');
  const recognitionRef = useRef<any>(null);

  const currentWord = practiceWords[currentWordIndex];

  // Focus Skills State (Memory Match)
  const [cards, setCards] = useState<MemoryCard[]>([]);
  const [selectedCards, setSelectedCards] = useState<number[]>([]);
  const [matchesCount, setMatchesCount] = useState(0);
  const [movesCount, setMovesCount] = useState(0);
  const [focusVictory, setFocusVictory] = useState(false);

  // Initialize Memory Game
  const startNewMemoryGame = () => {
    const pairs = [...MEMORY_EMOJIS, ...MEMORY_EMOJIS];
    // Shuffle
    const shuffled = pairs
      .sort(() => Math.random() - 0.5)
      .map((emoji, idx) => ({
        id: idx,
        emoji,
        isFlipped: false,
        isMatched: false,
      }));
    setCards(shuffled);
    setSelectedCards([]);
    setMatchesCount(0);
    setMovesCount(0);
    setFocusVictory(false);
  };

  useEffect(() => {
    startNewMemoryGame();
  }, []);

  const handleCardClick = (index: number) => {
    if (cards[index].isFlipped || cards[index].isMatched || selectedCards.length === 2) {
      return;
    }

    const newCards = [...cards];
    newCards[index].isFlipped = true;
    const newSelected = [...selectedCards, index];

    setCards(newCards);
    setSelectedCards(newSelected);

    if (newSelected.length === 2) {
      setMovesCount(prev => prev + 1);
      const [firstIdx, secondIdx] = newSelected;
      if (newCards[firstIdx].emoji === newCards[secondIdx].emoji) {
        // Match!
        newCards[firstIdx].isMatched = true;
        newCards[secondIdx].isMatched = true;
        setSelectedCards([]);
        setMatchesCount(prev => {
          const nextCount = prev + 1;
          if (nextCount === MEMORY_EMOJIS.length) {
            setFocusVictory(true);
            // Play victory sound
            if ('speechSynthesis' in window) {
              const cheer = new SpeechSynthesisUtterance("Fantastic job! You matched all the cards!");
              cheer.rate = 0.9;
              window.speechSynthesis.speak(cheer);
            }
          }
          return nextCount;
        });
      } else {
        // No match, flip back after brief pause
        setTimeout(() => {
          setCards(prevCards => {
            const resetCards = [...prevCards];
            resetCards[firstIdx].isFlipped = false;
            resetCards[secondIdx].isFlipped = false;
            return resetCards;
          });
          setSelectedCards([]);
        }, 900);
      }
    }
  };

  const playAudio = () => {
    if (isPlaying) return;

    if ('speechSynthesis' in window) {
      setIsPlaying(true);
      setShowEncouragement(false);
      setSpeechFeedback('');

      const utterance = new SpeechSynthesisUtterance(currentWord.word);
      utterance.rate = 0.85;

      utterance.onend = () => setIsPlaying(false);
      utterance.onerror = () => setIsPlaying(false);

      window.speechSynthesis.speak(utterance);
    } else {
      console.warn("Speech synthesis is not supported in this browser.");
    }
  };

  const startListening = useCallback(async () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      setSpeechFeedback("Speech recognition is not supported in this browser.");
      return;
    }

    if (isListening) return;

    try {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
          stream.getTracks().forEach(track => track.stop());
        } catch (err) {
          console.error("Microphone permission error:", err);
          setSpeechFeedback("Microphone access denied. Please allow microphone access.");
          return;
        }
      }

      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognitionRef.current = recognition;

      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        setIsListening(true);
        setSpeechFeedback("Listening... Say the word!");
        setShowEncouragement(false);
      };

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript.toLowerCase().trim();
        const cleanedTranscript = transcript.replace(/[.,!?]/g, '');
        const targetWord = currentWord.word.toLowerCase();

        if (cleanedTranscript.includes(targetWord) || targetWord.includes(cleanedTranscript)) {
          setShowEncouragement(true);
          setSpeechFeedback("Brilliant! Super clear!");
        } else {
          setSpeechFeedback(`You said: "${transcript}". Let's try again!`);
          setShowEncouragement(false);
        }
      };

      recognition.onerror = (event: any) => {
        setIsListening(false);
        if (event.error === 'not-allowed') {
          setSpeechFeedback("Microphone access denied.");
        } else if (event.error !== 'aborted') {
          setSpeechFeedback("Could not hear clearly. Try again!");
        }
      };

      recognition.onend = () => {
        setIsListening(false);
        setSpeechFeedback(prev => prev === "Listening... Say the word!" ? "" : prev);
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
    <div className="bg-slate-50 min-h-screen py-10 flex flex-col items-center font-sans">
      <div className="max-w-5xl w-full px-4 sm:px-6 lg:px-8">
        {/* Navigation bar */}
        <div className="mb-6 flex justify-between items-center">
          <Link
            to="/"
            className="inline-flex items-center text-slate-600 hover:text-brand-blue transition-colors font-bold text-base"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back Home
          </Link>

          {/* Activity Switcher Tabs */}
          <div className="flex bg-white p-1.5 rounded-2xl border-2 border-slate-200 shadow-sm gap-2">
            <button
              onClick={() => setActiveTab('speech')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl font-black text-sm transition-all ${
                activeTab === 'speech'
                  ? 'bg-brand-blue text-white shadow-md'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              <span>Speech Practice</span>
            </button>
            <button
              onClick={() => setActiveTab('focus')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl font-black text-sm transition-all ${
                activeTab === 'focus'
                  ? 'bg-brand-green text-white shadow-md'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Brain className="w-4 h-4" />
              <span>Focus Skills</span>
            </button>
          </div>
        </div>

        {/* ================= SPEECH PRACTICE TAB ================= */}
        {activeTab === 'speech' && (
          <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden relative">
            {/* Header */}
            <div className="bg-brand-blue/20 p-8 text-center border-b-[6px] border-brand-blue/30 relative overflow-hidden">
              <div className="absolute top-2 left-6 w-16 h-16 bg-white rounded-full opacity-40 animate-pulse" />
              <div className="absolute -bottom-4 right-10 w-24 h-24 bg-white rounded-full opacity-30" />
              <div className="inline-block bg-white/80 text-brand-blue text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-wider mb-2 border border-brand-blue/20">
                Word {currentWordIndex + 1} of {practiceWords.length}
              </div>
              <h1 className="text-4xl sm:text-5xl font-black text-brand-blue mb-2 drop-shadow-sm relative z-10">
                Speech Practice! 🎙️
              </h1>
              <p className="text-brand-blue font-bold text-lg sm:text-xl relative z-10">
                Listen, point, and say the word out loud!
              </p>
            </div>

            {/* Main Content */}
            <div className="p-8 md:p-12 flex flex-col items-center relative w-full">
              {/* Playful Floating Bubbles */}
              <div className="absolute top-10 right-10 md:right-32 w-8 h-8 rounded-full bg-brand-yellow/40 animate-bounce" style={{ animationDuration: '3s' }} />
              <div className="absolute top-20 left-10 md:left-24 w-12 h-12 rounded-full bg-brand-teal/30 animate-pulse" style={{ animationDuration: '4s' }} />
              <div className="absolute bottom-40 left-8 md:left-32 w-6 h-6 rounded-full bg-brand-pink/40 animate-bounce" style={{ animationDuration: '2.5s' }} />
              <div className="absolute bottom-20 right-16 md:right-40 w-10 h-10 rounded-full bg-brand-blue/30 animate-pulse" style={{ animationDuration: '3.5s' }} />

              {/* Word Image */}
              <div className="relative w-64 h-64 md:w-80 md:h-80 mb-6 rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-white transform rotate-0 hover:rotate-1 transition-transform duration-300 z-10">
                <img
                  src={currentWord.image}
                  alt={currentWord.word}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <button
                  onClick={playAudio}
                  className="absolute inset-0 bg-black/10 hover:bg-black/5 transition-colors flex items-center justify-center group cursor-pointer"
                  aria-label={`Play audio for ${currentWord.word}`}
                >
                  <div className={`w-24 h-24 rounded-full bg-white flex items-center justify-center shadow-xl transform transition-all duration-300 ${isPlaying ? 'opacity-0 scale-95' : 'opacity-80 group-hover:opacity-100 group-hover:scale-110 text-brand-blue'}`}>
                    {isPlaying ? <Volume2 className="w-12 h-12 animate-pulse text-brand-blue" /> : <Play className="w-12 h-12 ml-2 text-brand-blue" />}
                  </div>
                </button>
              </div>

              {/* Word Title & Syllable Guide */}
              <h2 className="text-5xl md:text-6xl font-black text-slate-800 mb-1 tracking-tight drop-shadow-md">
                {currentWord.word}
              </h2>
              <span className="text-lg font-bold text-brand-teal mb-4 bg-teal-50 px-4 py-1 rounded-full border border-teal-200">
                {currentWord.syllables}
              </span>

              {/* Feedback / Encouragement Message */}
              <div className={`flex items-center justify-center transition-all duration-300 w-full ${showEncouragement || speechFeedback ? 'h-16 mb-4 opacity-100' : 'h-0 opacity-0 overflow-hidden'}`}>
                {showEncouragement ? (
                  <div className="bg-brand-green/15 text-brand-green px-6 py-3 rounded-full font-black text-lg flex items-center shadow-sm border border-brand-green/30 animate-bounce">
                    <CheckCircle2 className="w-6 h-6 mr-2" />
                    {speechFeedback || "Great job! Try another one."}
                  </div>
                ) : speechFeedback ? (
                  <div className="bg-amber-50 text-amber-800 px-6 py-3 rounded-full font-bold text-base flex items-center shadow-sm border border-amber-200">
                    {speechFeedback.includes("Listening") ? (
                      <Mic className="w-5 h-5 mr-2 animate-pulse text-brand-pink" />
                    ) : (
                      <AlertCircle className="w-5 h-5 mr-2" />
                    )}
                    {speechFeedback}
                  </div>
                ) : null}
              </div>

              {/* Controls */}
              <div className="w-full flex flex-col sm:flex-row justify-center sm:justify-between items-center mt-4 pt-6 border-t-[4px] border-slate-100 gap-6 sm:gap-0 relative z-10">
                <button
                  onClick={prevWord}
                  disabled={currentWordIndex === 0}
                  className="hidden sm:flex items-center px-6 py-4 rounded-2xl font-black text-slate-700 bg-slate-200 border-b-[4px] border-slate-400 hover:bg-slate-300 active:border-b-0 active:translate-y-[4px] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  <ArrowLeft className="w-6 h-6 mr-2" />
                  Back
                </button>

                <div className="flex flex-col sm:flex-row gap-4 md:gap-6 w-full sm:w-auto">
                  <button
                    onClick={playAudio}
                    className="flex justify-center items-center px-8 py-4 rounded-2xl font-black text-xl text-brand-blue bg-brand-yellow border-b-[6px] border-yellow-500 hover:bg-yellow-400 active:border-b-0 active:translate-y-[6px] transition-all drop-shadow-md cursor-pointer"
                  >
                    <RefreshCw className="w-6 h-6 mr-3" />
                    Listen
                  </button>
                  <button
                    onClick={isListening ? stopListening : startListening}
                    className={`flex justify-center items-center px-8 py-4 rounded-2xl font-black text-xl text-white border-b-[6px] transition-all active:border-b-0 active:translate-y-[6px] drop-shadow-md cursor-pointer ${
                      isListening ? 'bg-brand-pink border-pink-700 hover:bg-pink-400' : 'bg-brand-teal border-teal-600 hover:bg-teal-400'
                    }`}
                  >
                    <Mic className={`w-6 h-6 mr-3 ${isListening ? 'animate-bounce' : ''}`} />
                    {isListening ? 'Listening...' : 'Say It! 🗣️'}
                  </button>
                </div>

                <button
                  onClick={nextWord}
                  disabled={currentWordIndex === practiceWords.length - 1}
                  className="hidden sm:flex items-center px-6 py-4 rounded-2xl font-black text-white bg-brand-blue border-b-[4px] border-blue-800 hover:bg-blue-600 active:border-b-0 active:translate-y-[4px] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  Next Word
                  <ArrowRight className="w-6 h-6 ml-2" />
                </button>

                {/* Mobile Prev / Next */}
                <div className="flex w-full sm:hidden justify-between gap-4 mt-4 relative z-10">
                  <button
                    onClick={prevWord}
                    disabled={currentWordIndex === 0}
                    className="flex-1 flex justify-center items-center px-4 py-3 rounded-2xl font-black text-slate-700 bg-slate-200 border-b-[4px] border-slate-400 hover:bg-slate-300 disabled:opacity-50 disabled:cursor-not-allowed active:border-b-0 active:translate-y-[4px] transition-all"
                  >
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    Back
                  </button>
                  <button
                    onClick={nextWord}
                    disabled={currentWordIndex === practiceWords.length - 1}
                    className="flex-1 flex justify-center items-center px-4 py-3 rounded-2xl font-black text-white bg-brand-blue border-b-[4px] border-blue-800 hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed active:border-b-0 active:translate-y-[4px] transition-all"
                  >
                    Next
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= FOCUS SKILLS TAB (MEMORY MATCH) ================= */}
        {activeTab === 'focus' && (
          <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden relative">
            {/* Header */}
            <div className="bg-brand-green/20 p-8 text-center border-b-[6px] border-brand-green/30 relative overflow-hidden">
              <div className="absolute top-2 left-6 w-16 h-16 bg-white rounded-full opacity-40 animate-pulse" />
              <div className="absolute -bottom-4 right-10 w-24 h-24 bg-white rounded-full opacity-30" />
              <div className="inline-block bg-white/80 text-brand-green text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-wider mb-2 border border-brand-green/20">
                Matches: {matchesCount} / {MEMORY_EMOJIS.length} • Moves: {movesCount}
              </div>
              <h1 className="text-4xl sm:text-5xl font-black text-brand-green mb-2 drop-shadow-sm relative z-10">
                Focus Memory Match! 🧠
              </h1>
              <p className="text-brand-green font-bold text-lg sm:text-xl relative z-10">
                Tap cards to find the matching friendly pairs!
              </p>
            </div>

            {/* Memory Cards Grid */}
            <div className="p-8 md:p-12 flex flex-col items-center">
              {focusVictory ? (
                <div className="text-center py-10 animate-bounce">
                  <div className="w-24 h-24 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-yellow-300 shadow-lg">
                    <Trophy className="w-12 h-12 text-brand-yellow" />
                  </div>
                  <h3 className="text-4xl md:text-5xl font-black text-slate-800 mb-3">
                    Super Job! You Won! 🎉
                  </h3>
                  <p className="text-xl font-bold text-slate-600 mb-6">
                    You completed the focus puzzle in {movesCount} moves!
                  </p>
                  <button
                    onClick={startNewMemoryGame}
                    className="inline-flex items-center px-8 py-4 bg-brand-green text-white font-black text-xl rounded-2xl border-b-[6px] border-green-700 hover:bg-green-600 active:border-b-0 active:translate-y-[6px] transition-all shadow-lg cursor-pointer"
                  >
                    <RotateCcw className="w-6 h-6 mr-3" />
                    Play Again!
                  </button>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-4 max-w-lg w-full mb-8">
                    {cards.map((card, index) => (
                      <button
                        key={card.id}
                        type="button"
                        onClick={() => handleCardClick(index)}
                        disabled={card.isFlipped || card.isMatched}
                        className={`h-24 sm:h-28 rounded-2xl border-[4px] font-black text-4xl sm:text-5xl flex items-center justify-center transition-all duration-200 transform cursor-pointer ${
                          card.isFlipped || card.isMatched
                            ? 'bg-white border-brand-green scale-105 shadow-md'
                            : 'bg-brand-teal/20 border-brand-teal/40 hover:bg-brand-teal/30 hover:scale-105 active:scale-95 shadow-sm'
                        }`}
                      >
                        {card.isFlipped || card.isMatched ? card.emoji : '❓'}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={startNewMemoryGame}
                    className="inline-flex items-center px-6 py-3 rounded-xl bg-slate-100 text-slate-700 font-bold hover:bg-slate-200 transition-colors border border-slate-300"
                  >
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Reset Cards
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
