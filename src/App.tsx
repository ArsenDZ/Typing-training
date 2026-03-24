/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useCallback, useRef, ChangeEvent, memo, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Timer, Infinity as InfinityIcon, RotateCcw, Globe, Code, Hash, Zap, AlertCircle, FileText, MousePointer2, Terminal } from 'lucide-react';
import { ENGLISH_WORDS, RUSSIAN_WORDS, HARD_WORDS_EN, HARD_WORDS_RU, CODE_SNIPPETS, TERMINAL_COMMANDS, LEFT_HAND_WORDS, RIGHT_HAND_WORDS, LEFT_HAND_PATTERNS, RIGHT_HAND_PATTERNS } from './constants';

type Mode = 'infinite' | 'timed';
type TypeMode = 'normal' | 'hard' | 'numbers' | 'code' | 'terminal' | 'mistakes' | 'custom' | 'left-hand' | 'right-hand';
type Language = 'en' | 'ru';
type TerminalPlatform = 'cmd' | 'powershell' | 'linux' | 'macos';
type TimeOption = 15 | 30 | 60 | 120;

const Word = memo(({ word, isCurrent, isPast, result, userInput, activeWordRef }: any) => {
  return (
    <div 
      ref={isCurrent ? activeWordRef : null}
      className="relative py-1"
    >
      {isCurrent && (
        <motion.div
          layoutId="active-word-bg"
          className="absolute inset-x-[-8px] inset-y-0 bg-white/5 rounded-lg -z-10"
          transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
        />
      )}
      
      <span className={`transition-colors duration-200 ${
        isCurrent ? 'text-white' : 
        isPast ? (result ? 'text-emerald-400/80' : 'text-rose-400/80') : 
        'text-white/10'
      }`}>
        {word.split('').map((char: string, charIdx: number) => {
          let charColor = '';
          const isCharCurrent = isCurrent && charIdx === userInput.length;
          
          if (isCurrent && charIdx < userInput.length) {
            charColor = userInput[charIdx] === char ? 'text-emerald-400' : 'text-rose-500';
          }
          return (
            <span key={charIdx} className={`relative ${charColor}`}>
              {char}
              {isCharCurrent && (
                <motion.div
                  layoutId="cursor"
                  className="absolute inset-x-0 bottom-0 h-0.5 bg-emerald-500"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ repeat: Infinity, duration: 0.8, repeatType: 'reverse' }}
                />
              )}
            </span>
          );
        })}
        {isCurrent && userInput.length > word.length && (
          <span className="text-rose-500 relative">
            {userInput.slice(word.length)}
            <motion.div
              layoutId="cursor"
              className="absolute inset-x-0 bottom-0 h-0.5 bg-rose-500"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ repeat: Infinity, duration: 0.8, repeatType: 'reverse' }}
            />
          </span>
        )}
      </span>
    </div>
  );
});

const Keyboard = memo(({ activeSide, activeKeys, nextChar, language }: { activeSide: 'left' | 'right', activeKeys: string[], nextChar?: string, language: string }) => {
  const leftKeys = ['Q', 'W', 'E', 'R', 'T', 'A', 'S', 'D', 'F', 'G', 'Z', 'X', 'C', 'V', 'B'];
  const rightKeys = ['Y', 'U', 'I', 'O', 'P', 'H', 'J', 'K', 'L', 'N', 'M'];
  
  const ruToEn: Record<string, string> = {
    'й': 'Q', 'ц': 'W', 'у': 'E', 'к': 'R', 'е': 'T', 'н': 'Y', 'г': 'U', 'ш': 'I', 'щ': 'O', 'з': 'P',
    'ф': 'A', 'ы': 'S', 'в': 'D', 'а': 'F', 'п': 'G', 'р': 'H', 'о': 'J', 'л': 'K', 'д': 'L',
    'я': 'Z', 'ч': 'X', 'с': 'C', 'м': 'V', 'и': 'B', 'т': 'N', 'ь': 'M'
  };

  const rows = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['Z', 'X', 'C', 'V', 'B', 'N', 'M']
  ];

  return (
    <div className="flex flex-col gap-1 items-center opacity-40 scale-75 md:scale-90 transition-all duration-500 hover:opacity-100 group">
      {rows.map((row, i) => (
        <div key={i} className="flex gap-1">
          {row.map(key => {
            const isLeft = leftKeys.includes(key);
            const isRight = rightKeys.includes(key);
            const isActiveSide = (activeSide === 'left' && isLeft) || (activeSide === 'right' && isRight);
            const isPressed = activeKeys.includes(key.toLowerCase());
            
            let isNext = false;
            if (nextChar) {
              const char = nextChar.toLowerCase();
              if (language === 'ru') {
                isNext = ruToEn[char] === key;
              } else {
                isNext = char.toUpperCase() === key;
              }
            }
            
            return (
              <div 
                key={key}
                className={`w-8 h-8 md:w-9 md:h-9 rounded-lg flex items-center justify-center text-[10px] md:text-xs font-bold border transition-all duration-200 ${
                  isActiveSide 
                    ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300 shadow-[0_0_10px_rgba(16,185,129,0.1)]' 
                    : 'bg-white/5 border-white/10 text-white/10'
                } ${isPressed ? 'scale-90 bg-emerald-500 text-white shadow-[0_0_20px_rgba(16,185,129,0.6)] border-emerald-400' : ''} ${
                  isNext ? 'animate-pulse border-emerald-400 bg-emerald-400/40 text-white shadow-[0_0_15px_rgba(16,185,129,0.4)]' : ''
                }`}
              >
                {key}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
});

export default function App() {
  const [mode, setMode] = useState<Mode>('timed');
  const [typeMode, setTypeMode] = useState<TypeMode>('normal');
  const [language, setLanguage] = useState<Language>('en');
  const [terminalPlatform, setTerminalPlatform] = useState<TerminalPlatform>('linux');
  const [timeLimit, setTimeLimit] = useState<TimeOption>(30);
  const [timeLeft, setTimeLeft] = useState<number>(30);
  const [isActive, setIsActive] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const [words, setWords] = useState<string[]>([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [wordResults, setWordResults] = useState<(boolean | null)[]>([]);
  const [correctChars, setCorrectChars] = useState(0);
  const [errorChars, setErrorChars] = useState(0);
  const [totalChars, setTotalChars] = useState(0);
  const startTimeRef = useRef<number | null>(null);
  
  const [pressedKeys, setPressedKeys] = useState<Set<string>>(new Set());
  const [mistakes, setMistakes] = useState<Set<string>>(new Set());
  const [customText, setCustomText] = useState('');
  const [showCustomInput, setShowCustomInput] = useState(false);
  const activeWordRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isActive && !isFinished) {
      activeWordRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [currentWordIndex, isActive, isFinished]);

  useEffect(() => {
    if (isFinished) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [isFinished]);

  const generateWords = useCallback((lang: Language, tMode: TypeMode) => {
    let batch: string[] = [];
    
    switch (tMode) {
      case 'hard':
        const hardSource = lang === 'en' ? HARD_WORDS_EN : HARD_WORDS_RU;
        batch = Array.from({ length: 50 }, (): string => hardSource[Math.floor(Math.random() * hardSource.length)]);
        break;
      case 'numbers':
        batch = Array.from({ length: 50 }, (): string => Math.floor(Math.random() * 100000).toString());
        break;
      case 'code':
        batch = Array.from({ length: 20 }, (): string => CODE_SNIPPETS[Math.floor(Math.random() * CODE_SNIPPETS.length)]);
        break;
      case 'terminal':
        const terminalSource = TERMINAL_COMMANDS[terminalPlatform];
        // Provide full commands for character-by-character typing
        batch = Array.from({ length: 20 }, (): string => terminalSource[Math.floor(Math.random() * terminalSource.length)]);
        break;
      case 'mistakes':
        if (mistakes.size > 0) {
          const mistakeList: string[] = Array.from(mistakes);
          batch = Array.from({ length: 50 }, (): string => mistakeList[Math.floor(Math.random() * mistakeList.length)]);
        } else {
          const source = lang === 'en' ? ENGLISH_WORDS : RUSSIAN_WORDS;
          batch = Array.from({ length: 50 }, (): string => source[Math.floor(Math.random() * source.length)]);
        }
        break;
      case 'custom':
        if (customText.trim()) {
          batch = customText.split(/\s+/);
        } else {
          const source = lang === 'en' ? ENGLISH_WORDS : RUSSIAN_WORDS;
          batch = Array.from({ length: 50 }, (): string => source[Math.floor(Math.random() * source.length)]);
        }
        break;
      case 'left-hand':
        const leftSource = [...LEFT_HAND_WORDS, ...LEFT_HAND_PATTERNS];
        batch = Array.from({ length: 50 }, (): string => leftSource[Math.floor(Math.random() * leftSource.length)]);
        break;
      case 'right-hand':
        const rightSource = [...RIGHT_HAND_WORDS, ...RIGHT_HAND_PATTERNS];
        batch = Array.from({ length: 50 }, (): string => rightSource[Math.floor(Math.random() * rightSource.length)]);
        break;
      default:
        const source = lang === 'en' ? ENGLISH_WORDS : RUSSIAN_WORDS;
        batch = Array.from({ length: 100 }, (): string => source[Math.floor(Math.random() * source.length)]);
    }
    
    setWords(batch);
    setWordResults(new Array(batch.length).fill(null));
  }, [mistakes, customText, terminalPlatform]);

  const resetGame = useCallback(() => {
    setIsActive(false);
    setIsFinished(false);
    setTimeLeft(mode === 'timed' ? timeLimit : 0);
    setUserInput('');
    setCurrentWordIndex(0);
    setWordResults([]);
    setCorrectChars(0);
    setErrorChars(0);
    setTotalChars(0);
    startTimeRef.current = null;
    generateWords(language, typeMode);
    if (timerRef.current) clearInterval(timerRef.current);
    setTimeout(() => inputRef.current?.focus(), 0);
  }, [mode, timeLimit, language, typeMode, generateWords]);

  useEffect(() => {
    resetGame();
  }, [mode, timeLimit, language, typeMode, terminalPlatform]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      setPressedKeys((prev) => new Set(prev).add(e.key.toLowerCase()));
      if (e.key === 'Tab') {
        e.preventDefault();
        resetGame();
      }
      if ((typeMode === 'code' || typeMode === 'terminal') && e.key === 'Enter' && isActive) {
        const currentLine = words[currentWordIndex];
        if (userInput === currentLine) {
          setCurrentWordIndex((prev) => prev + 1);
          setUserInput('');
          
          // Generate more content if needed
          if (currentWordIndex >= words.length - 5) {
            if (typeMode === 'code') {
              const moreCode = Array.from({ length: 20 }, () => CODE_SNIPPETS[Math.floor(Math.random() * CODE_SNIPPETS.length)]);
              setWords((prev) => [...prev, ...moreCode]);
              setWordResults((prev) => [...prev, ...new Array(20).fill(null)]);
            } else {
              const terminalSource = TERMINAL_COMMANDS[terminalPlatform];
              const moreCommands = Array.from({ length: 20 }, () => terminalSource[Math.floor(Math.random() * terminalSource.length)]);
              setWords((prev) => [...prev, ...moreCommands]);
              setWordResults((prev) => [...prev, ...new Array(20).fill(null)]);
            }
          }
        }
      }
      if (!isActive && !isFinished && e.key.length === 1 && !showCustomInput) {
        setIsActive(true);
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      setPressedKeys((prev) => {
        const next = new Set(prev);
        next.delete(e.key.toLowerCase());
        return next;
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [isActive, isFinished, resetGame, showCustomInput, typeMode, words, currentWordIndex, userInput]);

  useEffect(() => {
    if (isActive && mode === 'timed') {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsActive(false);
            setIsFinished(true);
            if (timerRef.current) clearInterval(timerRef.current);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isActive, mode]);

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    if (isFinished) return;
    const value = e.target.value;
    const currentWord = words[currentWordIndex];
    
    if (!currentWord) return;

    if (typeMode === 'left-hand' || typeMode === 'right-hand') {
      const isDeletion = value.length < userInput.length;
      if (!isDeletion) {
        const lastChar = value[value.length - 1]?.toLowerCase();
        if (lastChar && lastChar !== ' ') {
          // EN: qwert asdfg zxcvb
          // RU: йцуке фывап ячсми
          const leftHandKeys = 'qwertasdfgzxcvbйцукефывапячсми'.split('');
          // EN: yuiop hjkl nm
          // RU: нгшщз ролд ть
          const rightHandKeys = 'yuiophjklnmнгшщзролдть'.split('');
          
          const allowedKeys = typeMode === 'left-hand' ? leftHandKeys : rightHandKeys;
          if (!allowedKeys.includes(lastChar)) {
            return;
          }
        }
      }
    }

    if (!isActive && value.length > 0) {
      setIsActive(true);
      startTimeRef.current = Date.now();
    }

    // Code & Terminal Mode (Line-by-line / Command-by-command)
    if (typeMode === 'code' || typeMode === 'terminal') {
      if (value.length > currentWord.length) return;
      
      if (value.length < userInput.length) {
        setUserInput(value);
        return;
      }

      const lastChar = value[value.length - 1];
      const targetChar = currentWord[value.length - 1];

      if (lastChar === targetChar) {
        setCorrectChars((prev) => prev + 1);
      } else {
        setErrorChars((prev) => prev + 1);
      }
      setTotalChars((prev) => prev + 1);
      setUserInput(value);
      return;
    }

    // Word-by-word modes (Space to advance)
    if (value.endsWith(' ')) {
      if (value.length === 1) return; // Prevent skipping with just a space
      
      const typedWord = value.trim();
      const isCorrect = typedWord === currentWord;

      // For one-hand modes, we still allow advancing like in other modes
      // but the keys themselves are restricted by the logic above.
      
      // Update results
      const newResults = [...wordResults];
      newResults[currentWordIndex] = isCorrect;
      setWordResults(newResults);

      if (!isCorrect) {
        setMistakes((prev) => new Set(prev).add(currentWord));
      } else {
        // Count the space as a correct character
        setCorrectChars((prev) => prev + 1);
      }
      setTotalChars((prev) => prev + 1);

      // Advance
      setCurrentWordIndex((prev) => prev + 1);
      setUserInput('');

      // Generate more words if needed
      if (currentWordIndex >= words.length - 10 && mode === 'infinite') {
        let moreWords: string[] = [];
        if (typeMode === 'hard') {
          const hardSource = language === 'en' ? HARD_WORDS_EN : HARD_WORDS_RU;
          moreWords = Array.from({ length: 50 }, () => hardSource[Math.floor(Math.random() * hardSource.length)]);
        } else if (typeMode === 'numbers') {
          moreWords = Array.from({ length: 50 }, () => Math.floor(Math.random() * 100000).toString());
        } else if (typeMode === 'terminal') {
          const terminalSource = TERMINAL_COMMANDS[terminalPlatform];
          const rawCommands = Array.from({ length: 10 }, () => terminalSource[Math.floor(Math.random() * terminalSource.length)]);
          moreWords = rawCommands.join(' ').split(' ');
        } else if (typeMode === 'left-hand') {
          const leftSource = [...LEFT_HAND_WORDS, ...LEFT_HAND_PATTERNS];
          moreWords = Array.from({ length: 50 }, () => leftSource[Math.floor(Math.random() * leftSource.length)]);
        } else if (typeMode === 'right-hand') {
          const rightSource = [...RIGHT_HAND_WORDS, ...RIGHT_HAND_PATTERNS];
          moreWords = Array.from({ length: 50 }, () => rightSource[Math.floor(Math.random() * rightSource.length)]);
        } else {
          const source = language === 'en' ? ENGLISH_WORDS : RUSSIAN_WORDS;
          moreWords = Array.from({ length: 50 }, () => source[Math.floor(Math.random() * source.length)]);
        }
        
        setWords((prev) => [...prev, ...moreWords]);
        setWordResults((prev) => [...prev, ...new Array(moreWords.length).fill(null)]);
      }
      return;
    }

    // Character tracking within current word
    if (value.length < userInput.length) {
      setUserInput(value);
      return;
    }

    const lastChar = value[value.length - 1];
    const targetChar = currentWord[value.length - 1];

    if (lastChar === targetChar) {
      setCorrectChars((prev) => prev + 1);
    } else {
      setErrorChars((prev) => prev + 1);
    }
    setTotalChars((prev) => prev + 1);
    setUserInput(value);
  };

  const calculateWPM = useCallback(() => {
    let timeElapsed = 0;
    if (mode === 'timed') {
      timeElapsed = timeLimit - timeLeft;
    } else if (startTimeRef.current) {
      timeElapsed = (Date.now() - startTimeRef.current) / 1000;
    }
    
    if (timeElapsed <= 0) return 0;
    return Math.round((correctChars / 5) / (timeElapsed / 60));
  }, [mode, timeLimit, timeLeft, correctChars]);

  const calculateAccuracy = useCallback(() => {
    if (totalChars === 0) return 100;
    const accuracy = Math.max(0, ((totalChars - errorChars) / totalChars) * 100);
    return Math.round(accuracy);
  }, [totalChars, errorChars]);

  const wpm = useMemo(() => calculateWPM(), [calculateWPM]);
  const accuracy = useMemo(() => calculateAccuracy(), [calculateAccuracy]);

  const activeKeys = useMemo(() => Array.from(pressedKeys), [pressedKeys]);

  const typeModes: { id: TypeMode; label: string; icon: any }[] = [
    { id: 'normal', label: 'Normal', icon: Zap },
    { id: 'hard', label: 'Hard', icon: AlertCircle },
    { id: 'numbers', label: 'Numbers', icon: Hash },
    { id: 'code', label: 'Code', icon: Code },
    { id: 'terminal', label: 'Terminal', icon: Terminal },
    { id: 'left-hand', label: 'Left Hand', icon: MousePointer2 },
    { id: 'right-hand', label: 'Right Hand', icon: MousePointer2 },
    { id: 'mistakes', label: 'Mistakes', icon: AlertCircle },
    { id: 'custom', label: 'Custom', icon: FileText },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-start md:justify-center py-12 pb-24 px-4 md:px-8">
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-500/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/10 blur-[120px] rounded-full" />
      </div>

      <div className="w-full max-w-5xl z-10 space-y-6">
        {/* Mode Selector */}
        <div className="flex flex-wrap justify-center gap-2 px-6 py-3 glass rounded-2xl">
          {typeModes.map((m) => (
            <button
              key={m.id}
              onClick={() => {
                setTypeMode(m.id);
                if (m.id === 'custom') setShowCustomInput(true);
                else setShowCustomInput(false);
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${typeMode === m.id ? 'bg-white/10 text-white shadow-lg border border-white/10' : 'text-white/30 hover:text-white/50 hover:bg-white/5'}`}
            >
              <m.icon size={16} />
              <span className="text-xs font-bold uppercase tracking-wider">{m.label}</span>
            </button>
          ))}
        </div>

        {/* Terminal Platform Selector */}
        {typeMode === 'terminal' && (
          <div className="flex flex-col items-center gap-4 p-6 glass rounded-2xl">
            <div className="flex items-center gap-2 text-white/40 text-xs font-bold uppercase tracking-widest">
              <Terminal size={14} />
              <span>Select Platform</span>
            </div>
            <div className="flex justify-center gap-2">
              {(['linux', 'macos', 'cmd', 'powershell'] as TerminalPlatform[]).map((p) => (
                <button
                  key={p}
                  onClick={() => setTerminalPlatform(p)}
                  className={`px-4 py-2 rounded-xl transition-all text-xs font-bold uppercase tracking-wider ${terminalPlatform === p ? 'bg-white/10 text-white border border-white/10' : 'text-white/30 hover:text-white/50 hover:bg-white/5'}`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* One-Hand Keyboard Hint */}
        {(typeMode === 'left-hand' || typeMode === 'right-hand') && (
          <div className="flex flex-col items-center gap-6 p-6 glass rounded-2xl">
            <div className="flex items-center gap-2 text-white/40 text-xs font-bold uppercase tracking-widest">
              <MousePointer2 size={14} />
              <span>{typeMode === 'left-hand' ? 'Left' : 'Right'} Hand Training</span>
            </div>
            <Keyboard 
              activeSide={typeMode === 'left-hand' ? 'left' : 'right'} 
              activeKeys={activeKeys} 
              nextChar={words[currentWordIndex]?.[userInput.length]}
              language={language}
            />
          </div>
        )}

        {/* Top Navigation */}
        <header className="flex flex-wrap items-center justify-between gap-4 px-6 py-4 glass rounded-2xl">
          <div className="flex items-center gap-6">
            <div className="flex bg-white/5 p-1 rounded-xl">
              <button
                onClick={() => setMode('timed')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${mode === 'timed' ? 'bg-white/10 text-white shadow-lg' : 'text-white/40 hover:text-white/60'}`}
              >
                <Timer size={18} />
                <span className="text-sm font-medium">Timed</span>
              </button>
              <button
                onClick={() => setMode('infinite')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${mode === 'infinite' ? 'bg-white/10 text-white shadow-lg' : 'text-white/40 hover:text-white/60'}`}
              >
                <InfinityIcon size={18} />
                <span className="text-sm font-medium">Infinite</span>
              </button>
            </div>

            {mode === 'timed' && (
              <div className="flex gap-2">
                {[15, 30, 60, 120].map((t) => (
                  <button
                    key={t}
                    onClick={() => setTimeLimit(t as TimeOption)}
                    className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-medium transition-all ${timeLimit === t ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'text-white/30 hover:text-white/50 hover:bg-white/5'}`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="flex items-center gap-3">
            {['normal', 'hard', 'mistakes'].includes(typeMode) && (
              <button
                onClick={resetGame}
                title="Refresh words"
                className="p-2 rounded-xl bg-white/5 text-white/40 hover:text-white hover:bg-white/10 transition-all border border-white/5"
              >
                <RotateCcw size={18} />
              </button>
            )}

            {typeMode !== 'code' && typeMode !== 'terminal' && typeMode !== 'numbers' && (
              <button
                onClick={() => {
                  const newLang = language === 'en' ? 'ru' : 'en';
                  setLanguage(newLang);
                  // Explicitly reset game with new language to ensure it works
                  setTimeout(() => resetGame(), 0);
                }}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 text-white/60 hover:text-white hover:bg-white/10 transition-all border border-white/5"
              >
                <Globe size={18} />
                <span className="text-sm font-medium uppercase">{language}</span>
              </button>
            )}
          </div>
        </header>

        {/* Custom Text Input */}
        <AnimatePresence>
          {showCustomInput && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="glass rounded-2xl p-6 space-y-4">
                <textarea
                  value={customText}
                  onChange={(e) => setCustomText(e.target.value)}
                  placeholder="Paste your custom text here..."
                  className="w-full h-32 bg-white/5 border border-white/10 rounded-xl p-4 text-white/80 focus:outline-none focus:border-emerald-500/50 transition-all resize-none font-mono text-sm"
                />
                <div className="flex justify-end">
                  <button
                    onClick={() => {
                      setShowCustomInput(false);
                      resetGame();
                    }}
                    className="px-6 py-2 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-xl text-sm font-bold hover:bg-emerald-500/30 transition-all"
                  >
                    Start Practice
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Typing Area */}
        <main className={`relative glass rounded-3xl p-8 md:p-12 min-h-[300px] flex flex-col justify-center ${(typeMode === 'code' || typeMode === 'terminal') ? 'font-mono' : ''}`}>
          <input
            ref={inputRef}
            type="text"
            className="absolute opacity-0 pointer-events-none"
            value={userInput}
            onChange={handleInput}
            autoFocus
          />

          <div 
            className="relative select-none cursor-text min-h-[120px] flex items-center justify-center"
            onClick={() => inputRef.current?.focus()}
          >
            <AnimatePresence mode="wait">
              {typeMode === 'code' || typeMode === 'terminal' ? (
                <motion.div
                  key={currentWordIndex}
                  ref={activeWordRef}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="w-full flex flex-col items-center gap-6"
                >
                  <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-white/20">
                    <Zap size={10} />
                    <span>{typeMode === 'code' ? 'code mode' : `${terminalPlatform} mode`}</span>
                  </div>
                  
                  <div className={`relative w-full max-w-4xl p-8 rounded-2xl border border-white/5 overflow-hidden ${typeMode === 'terminal' ? 'bg-black/40' : 'bg-white/5'}`}>
                    {typeMode === 'terminal' && (
                      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500/50 via-blue-500/50 to-emerald-500/50 opacity-30" />
                    )}
                    
                    <div className="flex items-start gap-4">
                      {typeMode === 'terminal' && (
                        <span className="text-emerald-500 font-bold shrink-0 mt-1 opacity-80">
                          {terminalPlatform === 'cmd' ? 'C:\\Users\\Admin>' : 
                           terminalPlatform === 'powershell' ? 'PS C:\\Users\\Admin>' : 
                           terminalPlatform === 'linux' ? 'user@linux:~$ ' : 
                           'user@macbook:~$ '}
                        </span>
                      )}
                      
                      <div className="text-2xl md:text-3xl leading-relaxed tracking-wide break-all">
                        {words[currentWordIndex]?.split('').map((char, i) => {
                          let color = 'text-white/20';
                          let isCurrent = i === userInput.length;
                          
                          if (i < userInput.length) {
                            color = userInput[i] === char ? 'text-[#4ade80]' : 'text-[#f87171]';
                          }

                          return (
                            <span
                              key={i}
                              className={`relative transition-colors duration-150 ${color} ${isCurrent ? 'text-white' : ''}`}
                            >
                              {char}
                              {isCurrent && (
                                <motion.div
                                  className="absolute left-0 bottom-0 w-full h-[2px] bg-emerald-500"
                                  animate={{ opacity: [1, 0, 1] }}
                                  transition={{ repeat: Infinity, duration: 1 }}
                                />
                              )}
                            </span>
                          );
                        })}
                        {userInput.length === words[currentWordIndex]?.length && (
                          <motion.div
                            className="inline-block w-3 h-6 bg-emerald-500 ml-1 align-middle"
                            animate={{ opacity: [1, 0, 1] }}
                            transition={{ repeat: Infinity, duration: 1 }}
                          />
                        )}
                      </div>
                    </div>
                  </div>

                  {userInput === words[currentWordIndex] && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-[10px] font-bold uppercase tracking-[0.3em] text-emerald-400/50 animate-pulse"
                    >
                      Press Enter to execute
                    </motion.div>
                  )}
                </motion.div>
              ) : (
                <div className="text-2xl md:text-3xl leading-relaxed w-full max-w-4xl">
                  <div className="flex flex-wrap justify-center gap-x-4 gap-y-2">
                    {words.slice(Math.max(0, currentWordIndex - 10), currentWordIndex + 40).map((word, idx) => {
                      const wordIdx = Math.max(0, currentWordIndex - 10) + idx;
                      const isCurrent = wordIdx === currentWordIndex;
                      const isPast = wordIdx < currentWordIndex;
                      const result = wordResults[wordIdx];

                      return (
                        <Word
                          key={`${wordIdx}-${word}`}
                          word={word}
                          isCurrent={isCurrent}
                          isPast={isPast}
                          result={result}
                          userInput={isCurrent ? userInput : ''}
                          activeWordRef={isCurrent ? activeWordRef : null}
                        />
                      );
                    })}
                  </div>
                </div>
              )}
            </AnimatePresence>
          </div>

          <AnimatePresence>
            {isFinished && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="absolute inset-0 bg-[#0a0a0a]/80 backdrop-blur-md flex flex-col items-center justify-center space-y-6 p-8 rounded-3xl z-20 overflow-y-auto"
              >
                <h2 className="text-4xl font-bold text-white tracking-tight">Test Complete</h2>
                <div className="grid grid-cols-3 gap-8 w-full max-w-md">
                  <div className="text-center space-y-1">
                    <p className="text-white/40 text-xs uppercase tracking-widest">WPM</p>
                    <p className="text-4xl font-bold text-emerald-400">{wpm}</p>
                  </div>
                  <div className="text-center space-y-1">
                    <p className="text-white/40 text-xs uppercase tracking-widest">Accuracy</p>
                    <p className="text-4xl font-bold text-blue-400">{accuracy}%</p>
                  </div>
                  <div className="text-center space-y-1">
                    <p className="text-white/40 text-xs uppercase tracking-widest">Errors</p>
                    <p className="text-4xl font-bold text-rose-400">{errorChars}</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <button
                    onClick={resetGame}
                    className="flex items-center gap-3 px-8 py-4 bg-emerald-500 text-white rounded-2xl font-bold hover:bg-emerald-400 transition-all shadow-[0_8px_24px_rgba(16,185,129,0.2)] active:scale-95"
                  >
                    <RotateCcw size={20} />
                    Restart
                  </button>
                  {mistakes.size > 0 && typeMode !== 'mistakes' && (
                    <button
                      onClick={() => {
                        setTypeMode('mistakes');
                        resetGame();
                      }}
                      className="flex items-center gap-3 px-8 py-4 bg-white/10 text-white rounded-2xl font-bold hover:bg-white/20 transition-all active:scale-95"
                    >
                      Practice Mistakes
                    </button>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>

        {/* Bottom Stats */}
        <footer className="flex items-center justify-between px-8 py-6 glass rounded-2xl">
          <div className="flex gap-12">
            <div className="space-y-1">
              <p className="text-[10px] uppercase tracking-[0.2em] text-white/30 font-bold">WPM</p>
              <p className="text-2xl font-bold text-white/90">{wpm}</p>
            </div>
            <div className="space-y-1">
              <p className="text-[10px] uppercase tracking-[0.2em] text-white/30 font-bold">Accuracy</p>
              <p className="text-2xl font-bold text-white/90">{accuracy}%</p>
            </div>
            <div className="space-y-1">
              <p className="text-[10px] uppercase tracking-[0.2em] text-white/30 font-bold">Errors</p>
              <p className="text-2xl font-bold text-white/90">{errorChars}</p>
            </div>
            {mode === 'timed' && (
              <div className="space-y-1">
                <p className="text-[10px] uppercase tracking-[0.2em] text-white/30 font-bold">Time</p>
                <p className={`text-2xl font-bold ${timeLeft <= 5 ? 'text-rose-400 animate-pulse' : 'text-white/90'}`}>
                  {timeLeft}s
                </p>
              </div>
            )}
          </div>

          <div className="flex items-center gap-4 text-white/20 text-xs">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/5">
              <span className="font-bold">TAB</span>
              <span>to restart</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
