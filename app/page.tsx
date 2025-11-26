'use client';

import { useState, useEffect } from 'react';
import { Clock, Cloud, Link as LinkIcon, FileText, Focus, Mail, Youtube, MessageSquare, Github, Sun, CloudRain, CloudSnow, Wind } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { fallbackQuotes } from '@/lib/quotes';

type TodoItem = {
  id: number;
  text: string;
  completed: boolean;
};

export default function Home() {
  const [time, setTime] = useState<Date | null>(null);
  const [weather, setWeather] = useState<any>(null);
  const [notes, setNotes] = useState('');
  const [focusMode, setFocusMode] = useState(false);
  const [focusTimer, setFocusTimer] = useState(25 * 60);
  const [timerActive, setTimerActive] = useState(false);
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [newTodo, setNewTodo] = useState('');
  const [showConfetti, setShowConfetti] = useState(false);
  const [quote, setQuote] = useState<{ content: string; author: string } | null>(null);

  useEffect(() => {
    // Initialize time only on the client to avoid SSR/client mismatches
    setTime(new Date());
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const playDing = () => {
    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      const audioCtx = new AudioContext();
      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();

      oscillator.type = 'sine';
      oscillator.frequency.value = 880;
      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);

      const now = audioCtx.currentTime;
      gainNode.gain.setValueAtTime(0, now);
      gainNode.gain.linearRampToValueAtTime(0.4, now + 0.01);
      gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.3);

      oscillator.start(now);
      oscillator.stop(now + 0.3);
    } catch (error) {
      console.error('Audio error:', error);
    }
  };

  const triggerConfetti = () => {
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 1200);
  };

  useEffect(() => {
    const savedNotes = localStorage.getItem('lifeos-notes');
    if (savedNotes) setNotes(savedNotes);
  }, []);

  useEffect(() => {
    const fetchQuote = async () => {
      try {
        const res = await fetch('https://api.quotable.io/random?tags=inspirational');
        if (!res.ok) {
          throw new Error(`Failed to fetch quote: ${res.status}`);
        }
        const data = await res.json();
        if (data?.content && data?.author) {
          setQuote({ content: data.content, author: data.author });
        } else {
          throw new Error('Quote response missing fields');
        }
      } catch (err) {
        console.error('Quote fetch error:', err);
        // Fallback to a random quote from the local repository
        const randomIndex = Math.floor(Math.random() * fallbackQuotes.length);
        setQuote(fallbackQuotes[randomIndex]);
      }
    };

    fetchQuote();
  }, []);

  useEffect(() => {
    fetch('https://api.open-meteo.com/v1/forecast?latitude=52.3676&longitude=4.9041&current=temperature_2m,weather_code,wind_speed_10m&temperature_unit=celsius&windspeed_unit=kmh')
      .then(res => res.json())
      .then(data => setWeather(data))
      .catch(err => console.error('Weather fetch error:', err));
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timerActive && focusTimer > 0) {
      interval = setInterval(() => {
        setFocusTimer(prev => prev - 1);
      }, 1000);
    } else if (focusTimer === 0) {
      setTimerActive(false);
      setFocusMode(false);
      setFocusTimer(25 * 60);
    }
    return () => clearInterval(interval);
  }, [timerActive, focusTimer]);

  const handleNotesChange = (value: string) => {
    setNotes(value);
    localStorage.setItem('lifeos-notes', value);
  };

  const toggleFocusMode = () => {
    if (!focusMode) {
      setFocusMode(true);
      setTimerActive(true);
      setFocusTimer(25 * 60);
    } else {
      setFocusMode(false);
      setTimerActive(false);
      setFocusTimer(25 * 60);
    }
  };

  const addTodo = () => {
    const trimmed = newTodo.trim();
    if (!trimmed) return;
    setTodos((prev) => [
      ...prev,
      {
        id: Date.now(),
        text: trimmed,
        completed: false,
      },
    ]);
    setNewTodo('');
  };

  const toggleTodo = (id: number, nextChecked: boolean) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: nextChecked } : todo
      )
    );
    if (nextChecked) {
      triggerConfetti();
      playDing();
    }
  };

  const removeTodo = (id: number) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const getWeatherIcon = (code: number) => {
    if (code === 0) return <Sun className="w-8 h-8" />;
    if (code <= 3) return <Cloud className="w-8 h-8" />;
    if (code <= 67) return <CloudRain className="w-8 h-8" />;
    if (code <= 77) return <CloudSnow className="w-8 h-8" />;
    return <Wind className="w-8 h-8" />;
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const quickLinks = [
    { name: 'Gmail', icon: Mail, url: 'https://mail.google.com', color: 'from-red-500 to-orange-500' },
    { name: 'YouTube', icon: Youtube, url: 'https://youtube.com', color: 'from-red-600 to-red-700' },
    { name: 'ChatGPT', icon: MessageSquare, url: 'https://chat.openai.com', color: 'from-emerald-500 to-teal-500' },
    { name: 'GitHub', icon: Github, url: 'https://github.com', color: 'from-slate-600 to-slate-800' },
  ];

  return (
    <div className={`relative min-h-screen animated-bg p-4 md:p-8 transition-all duration-500 ${focusMode ? 'opacity-60' : 'opacity-100'}`}>
      {showConfetti && (
        <div className="pointer-events-none fixed inset-0 z-40 overflow-hidden">
          {Array.from({ length: 80 }).map((_, index) => (
            <span
              key={index}
              className="confetti-piece"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 0.5}s`,
                backgroundColor: ['#22c55e', '#3b82f6', '#f97316', '#e11d48', '#a855f7'][index % 5],
              }}
            />
          ))}
        </div>
      )}
      <div className="relative max-w-7xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-8 tracking-tight">
          Personal Life OS
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-fr">
          <Card className="glass-card col-span-1 md:col-span-2 p-8 hover:bg-white/10 transition-all duration-300">
            <div className="flex items-center gap-3 mb-6">
              <Clock className="w-6 h-6 text-blue-400" />
              <h2 className="text-xl font-semibold text-white">Current Time</h2>
            </div>
            <div className="text-7xl md:text-8xl font-bold text-white mb-4 font-mono tracking-tight">
              {time
                ? time.toLocaleTimeString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                    hour12: false,
                  })
                : '--:--:--'}
            </div>
            <div className="text-2xl text-white/70">
              {time
                ? time.toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })
                : 'Loading date...'}
            </div>
          </Card>

          <Card className="glass-card col-span-1 md:col-span-1 p-6 hover:bg-white/10 transition-all duration-300">
            <div className="flex items-center gap-3 mb-4">
              <Cloud className="w-6 h-6 text-cyan-400" />
              <div>
                <h2 className="text-xl font-semibold text-white">Weather</h2>
                <p className="text-sm text-white/60">Amsterdam</p>
              </div>
            </div>
            {weather ? (
              <div className="space-y-4">
                <div className="flex items-center justify-center text-white">
                  {getWeatherIcon(weather.current?.weather_code || 0)}
                </div>
                <div className="text-5xl font-bold text-white text-center">
                  {Math.round(weather.current?.temperature_2m || 0)}°C
                </div>
                <div className="text-sm text-white/60 text-center">
                  Wind: {Math.round(weather.current?.wind_speed_10m || 0)} km/h
                </div>
              </div>
            ) : (
              <div className="text-white/50 text-center">Loading...</div>
            )}
          </Card>

          <Card className="glass-card col-span-1 md:col-span-1 p-6 hover:bg-white/10 transition-all duration-300">
            <div className="flex items-center gap-3 mb-6">
              <Focus className="w-6 h-6 text-purple-400" />
              <h2 className="text-xl font-semibold text-white">Focus Mode</h2>
            </div>
            <div className="space-y-4">
              <div className="text-5xl font-bold text-white text-center font-mono">
                {formatTime(focusTimer)}
              </div>
              <Button
                onClick={toggleFocusMode}
                className={`w-full ${focusMode ? 'bg-red-500 hover:bg-red-600' : 'bg-purple-500 hover:bg-purple-600'} text-white rounded-2xl h-12 text-lg font-semibold transition-all`}
              >
                {focusMode ? 'End Focus' : 'Start Focus'}
              </Button>
            </div>
          </Card>

          <Card className="glass-card col-span-1 md:col-span-1 p-6 hover:bg-white/10 transition-all duration-300">
            <div className="flex items-center gap-3 mb-6">
              <FileText className="w-6 h-6 text-emerald-400" />
              <h2 className="text-xl font-semibold text-white">Todo List</h2>
            </div>
            <div className="space-y-4">
              <div className="flex gap-2">
                <Input
                  value={newTodo}
                  onChange={(e) => setNewTodo(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') addTodo();
                  }}
                  placeholder="Add a new task..."
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/40 rounded-2xl"
                />
                <Button
                  onClick={addTodo}
                  className="shrink-0 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white"
                >
                  Add
                </Button>
              </div>
              <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                {todos.length === 0 ? (
                  <p className="text-sm text-white/50">No tasks yet. Add your first one!</p>
                ) : (
                  todos.map((todo) => (
                    <div
                      key={todo.id}
                      className="flex items-center justify-between gap-3 rounded-2xl bg-white/5 border border-white/10 px-3 py-2 backdrop-blur-md"
                    >
                      <button
                        type="button"
                        onClick={() => toggleTodo(todo.id, !todo.completed)}
                        className="flex items-center gap-3 text-left flex-1"
                      >
                        <Checkbox
                          checked={todo.completed}
                          onCheckedChange={(checked) => {
                            const nextChecked = checked === true;
                            toggleTodo(todo.id, nextChecked);
                          }}
                          className="border-white/40 data-[state=checked]:bg-emerald-500 data-[state=checked]:border-emerald-500"
                        />
                        <span
                          className={`text-sm md:text-base text-white ${
                            todo.completed ? 'line-through text-white/40' : ''
                          }`}
                        >
                          {todo.text}
                        </span>
                      </button>
                      <button
                        type="button"
                        onClick={() => removeTodo(todo.id)}
                        className="text-xs text-white/40 hover:text-red-400 transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          </Card>

          <Card className="glass-card col-span-1 md:col-span-2 lg:col-span-2 p-6 hover:bg-white/10 transition-all duration-300">
            <div className="flex items-center gap-3 mb-6">
              <LinkIcon className="w-6 h-6 text-green-400" />
              <h2 className="text-xl font-semibold text-white">Quick Links</h2>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {quickLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`bg-gradient-to-br ${link.color} rounded-2xl p-6 flex flex-col items-center justify-center gap-3 hover:scale-105 transition-transform duration-200 shadow-lg`}
                >
                  <link.icon className="w-10 h-10 text-white" />
                  <span className="text-white font-semibold">{link.name}</span>
                </a>
              ))}
            </div>
          </Card>

          <Card className="glass-card col-span-1 md:col-span-2 lg:col-span-2 p-6 hover:bg-white/10 transition-all duration-300">
            <div className="flex items-center gap-3 mb-4">
              <FileText className="w-6 h-6 text-amber-400" />
              <h2 className="text-xl font-semibold text-white">Quick Notes</h2>
            </div>
            <Textarea
              value={notes}
              onChange={(e) => handleNotesChange(e.target.value)}
              placeholder="Type your notes here... They will be saved automatically."
              className="min-h-[200px] bg-white/5 border-white/10 text-white placeholder:text-white/40 rounded-2xl resize-none focus:bg-white/10 transition-all"
            />
          </Card>

          <Card className="glass-card col-span-1 md:col-span-2 lg:col-span-2 p-5 hover:bg-white/10 transition-all duration-300">
            <div className="flex items-center gap-3 mb-3">
              <MessageSquare className="w-6 h-6 text-sky-400" />
              <h2 className="text-xl font-semibold text-white">Words of Wisdom</h2>
            </div>
            {quote ? (
              <div className="space-y-2 max-w-xl">
                <p className="text-base md:text-lg italic text-white/90 leading-relaxed">"{quote.content}"</p>
                <p className="text-sm md:text-base font-semibold text-white mt-1">— {quote.author}</p>
              </div>
            ) : (
              <p className="text-sm text-white/60">Loading inspirational quote...</p>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
