/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useCallback, useRef, ChangeEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Timer, Infinity as InfinityIcon, RotateCcw, Globe, Code, Hash, Zap, AlertCircle, FileText } from 'lucide-react';
import { ENGLISH_WORDS, RUSSIAN_WORDS, HARD_WORDS_EN, HARD_WORDS_RU, CODE_SNIPPETS, TERMINAL_COMMANDS } from './constants';

type Mode = 'infinite' | 'timed';
type TypeMode = 'normal' | 'hard' | 'numbers' | 'code' | 'terminal' | 'mistakes' | 'custom';
type Language = 'en' | 'ru';
type TerminalPlatform = 'cmd' | 'powershell' | 'linux' | 'macos';
type TimeOption = 15 | 30 | 60 | 120;

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
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [correctChars, setCorrectChars] = useState(0);
  const [errorChars, setErrorChars] = useState(0);
  const [totalChars, setTotalChars] = useState(0);
  
  const [mistakes, setMistakes] = useState<Set<string>>(new Set());
  const [customText, setCustomText] = useState('');
  const [showCustomInput, setShowCustomInput] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

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
        batch = Array.from({ length: 20 }, (): string => terminalSource[Math.floor(Math.random() * terminalSource.length)]);
        break;
      case 'mistakes':
        if (mistakes.size > 0) {
          const mistakeList: string[] = Array.from(mistakes);
          batch = Array.from({ length: 50 }, (): string => mistakeList[Math.floor(Math.random() * mistakeList.length)]);
        } else {
          // Fallback to normal if no mistakes yet
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
      default:
        const source = lang === 'en' ? ENGLISH_WORDS : RUSSIAN_WORDS;
        batch = Array.from({ length: 100 }, (): string => source[Math.floor(Math.random() * source.length)]);
    }
    
    setWords(batch);
  }, [mistakes, customText]);

  const resetGame = useCallback(() => {
    setIsActive(false);
    setIsFinished(false);
    setTimeLeft(mode === 'timed' ? timeLimit : 0);
    setUserInput('');
    setCurrentIndex(0);
    setCurrentLineIndex(0);
    setCorrectChars(0);
    setErrorChars(0);
    setTotalChars(0);
    generateWords(language, typeMode);
    if (timerRef.current) clearInterval(timerRef.current);
    setTimeout(() => inputRef.current?.focus(), 0);
  }, [mode, timeLimit, language, typeMode, generateWords]);

  useEffect(() => {
    resetGame();
  }, [mode, timeLimit, language, typeMode, terminalPlatform]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        e.preventDefault();
        resetGame();
      }
      if ((typeMode === 'code' || typeMode === 'terminal') && e.key === 'Enter' && isActive) {
        const currentLine = words[currentLineIndex];
        if (userInput === currentLine) {
          setCurrentLineIndex((prev) => prev + 1);
          setUserInput('');
          setCurrentIndex(0);
          
          // Generate more code if needed
          if (currentLineIndex >= words.length - 5) {
            if (typeMode === 'code') {
              const moreCode = Array.from({ length: 20 }, () => CODE_SNIPPETS[Math.floor(Math.random() * CODE_SNIPPETS.length)]);
              setWords((prev) => [...prev, ...moreCode]);
            } else if (typeMode === 'terminal') {
              const terminalSource = TERMINAL_COMMANDS[terminalPlatform];
              const moreTerminal = Array.from({ length: 20 }, () => terminalSource[Math.floor(Math.random() * terminalSource.length)]);
              setWords((prev) => [...prev, ...moreTerminal]);
            }
          }
        }
      }
      if (!isActive && !isFinished && e.key.length === 1 && !showCustomInput) {
        setIsActive(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isActive, isFinished, resetGame, showCustomInput, typeMode, words, currentLineIndex, userInput]);

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
    const currentLine = (typeMode === 'code' || typeMode === 'terminal') ? words[currentLineIndex] : words.join(' ');
    
    if ((typeMode === 'code' || typeMode === 'terminal') && value.length > currentLine.length) return;

    if (value.length < userInput.length) {
      setUserInput(value);
      setCurrentIndex(Math.max(0, value.length));
      return;
    }

    const lastChar = value[value.length - 1];
    const targetChar = currentLine[currentIndex];

    if (lastChar === targetChar) {
      setCorrectChars((prev) => prev + 1);
    } else {
      setErrorChars((prev) => prev + 1);
      if (typeMode !== 'code') {
        const wordsArray = currentLine.split(' ');
        let charCount = 0;
        for (const word of wordsArray) {
          if (currentIndex >= charCount && currentIndex < charCount + word.length) {
            setMistakes((prev) => new Set(prev).add(word));
            break;
          }
          charCount += word.length + 1;
        }
      }
    }

    setTotalChars((prev) => prev + 1);
    setUserInput(value);
    setCurrentIndex(value.length);

    if (typeMode !== 'code' && value.length > currentLine.length - 50 && typeMode !== 'custom') {
      const source = language === 'en' ? ENGLISH_WORDS : RUSSIAN_WORDS;
      const moreWords = Array.from({ length: 50 }, () => source[Math.floor(Math.random() * source.length)]);
      setWords((prev) => [...prev, ...moreWords]);
    }
  };

  const calculateWPM = () => {
    const timeElapsed = mode === 'timed' ? (timeLimit - timeLeft) : (totalChars / 5 / 1); // rough estimate for infinite
    if (timeElapsed === 0) return 0;
    return Math.round((correctChars / 5) / (timeElapsed / 60));
  };

  const calculateAccuracy = () => {
    if (totalChars === 0) return 100;
    return Math.round((correctChars / totalChars) * 100);
  };

  const typeModes: { id: TypeMode; label: string; icon: any }[] = [
    { id: 'normal', label: 'Normal', icon: Zap },
    { id: 'hard', label: 'Hard', icon: AlertCircle },
    { id: 'numbers', label: 'Numbers', icon: Hash },
    { id: 'code', label: 'Code', icon: Code },
    { id: 'terminal', label: 'Terminal', icon: FileText },
    { id: 'mistakes', label: 'Mistakes', icon: AlertCircle },
    { id: 'custom', label: 'Custom', icon: FileText },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 md:p-8">
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
          <div className="flex justify-center gap-2 px-6 py-3 glass rounded-2xl">
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
                onClick={() => setLanguage(language === 'en' ? 'ru' : 'en')}
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
        <main className={`relative glass rounded-3xl p-8 md:p-12 min-h-[300px] flex flex-col justify-center overflow-hidden ${(typeMode === 'code' || typeMode === 'terminal') ? 'font-mono' : ''}`}>
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
              {(typeMode === 'code' || typeMode === 'terminal') ? (
                <motion.div
                  key={currentLineIndex}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="w-full flex flex-col items-center gap-6"
                >
                  <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-white/20">
                    <Zap size={10} />
                    <span>{typeMode === 'terminal' ? `${terminalPlatform} mode` : 'code mode'}</span>
                  </div>
                  <div className="text-3xl md:text-4xl leading-relaxed tracking-wide text-center break-all max-w-4xl">
                    {words[currentLineIndex]?.split('').map((char, i) => {
                      let color = 'text-white/20';
                      let isCurrent = i === currentIndex;
                      
                      if (i < currentIndex) {
                        color = userInput[i] === char ? 'text-[#4ade80]' : 'text-[#f87171]';
                      }

                      return (
                        <span
                          key={i}
                          className={`relative transition-colors duration-150 ${color} ${isCurrent ? 'text-white' : ''}`}
                        >
                          {isCurrent && (
                            <motion.span
                              layoutId="cursor-code"
                              className="absolute -bottom-1 left-0 w-full h-0.5 bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.8)]"
                              initial={false}
                              transition={{ type: 'spring', bounce: 0.2, duration: 0.3 }}
                            />
                          )}
                          {char}
                        </span>
                      );
                    })}
                  </div>
                  {userInput === words[currentLineIndex] && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-[10px] font-bold uppercase tracking-[0.3em] text-emerald-400/50 animate-pulse"
                    >
                      Press Enter to continue
                    </motion.div>
                  )}
                </motion.div>
              ) : (
                <div className="text-2xl md:text-3xl leading-relaxed h-32 overflow-hidden w-full">
                  <div 
                    className="transition-transform duration-300 ease-out"
                    style={{ transform: `translateY(-${Math.floor(currentIndex / 45) * 3}rem)` }}
                  >
                    {words.join(' ').split('').map((char, i) => {
                      let color = 'text-white/20';
                      let isCurrent = i === currentIndex;
                      
                      if (i < currentIndex) {
                        color = userInput[i] === char ? 'text-[#4ade80]' : 'text-[#f87171]';
                      }

                      return (
                        <span
                          key={i}
                          className={`relative transition-colors duration-150 ${color} ${isCurrent ? 'text-white' : ''}`}
                        >
                          {isCurrent && (
                            <motion.span
                              layoutId="cursor-normal"
                              className="absolute -bottom-1 left-0 w-full h-0.5 bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)]"
                              initial={false}
                              transition={{ type: 'spring', bounce: 0.2, duration: 0.3 }}
                            />
                          )}
                          {char}
                        </span>
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
                className="absolute inset-0 bg-[#0a0a0a]/80 backdrop-blur-md flex flex-col items-center justify-center space-y-6 p-8 rounded-3xl z-20"
              >
                <h2 className="text-4xl font-bold text-white tracking-tight">Test Complete</h2>
                <div className="grid grid-cols-3 gap-8 w-full max-w-md">
                  <div className="text-center space-y-1">
                    <p className="text-white/40 text-xs uppercase tracking-widest">WPM</p>
                    <p className="text-4xl font-bold text-emerald-400">{calculateWPM()}</p>
                  </div>
                  <div className="text-center space-y-1">
                    <p className="text-white/40 text-xs uppercase tracking-widest">Accuracy</p>
                    <p className="text-4xl font-bold text-blue-400">{calculateAccuracy()}%</p>
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
              <p className="text-2xl font-bold text-white/90">{calculateWPM()}</p>
            </div>
            <div className="space-y-1">
              <p className="text-[10px] uppercase tracking-[0.2em] text-white/30 font-bold">Accuracy</p>
              <p className="text-2xl font-bold text-white/90">{calculateAccuracy()}%</p>
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
