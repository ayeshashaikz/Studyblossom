import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Home, Timer, BookOpen, CheckSquare, Plus, Search, Star,
  Trash2, ExternalLink, Play, Pause, RotateCcw, X, Edit,
  Folder, Filter, Clock, CheckCircle2, ChevronRight,
  Youtube, FileText, Globe, Cloud, Layout, Check
} from 'lucide-react';

const fontStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@400;600;700&family=Poppins:wght@300;400;500;600&display=swap');
  
  :root {
    --blush: #FADADD;
    --lavender: #E6E6FA;
    --sage: #C8E6C9;
    --cream: #FFF8E7;
    --text-main: #4A4A4A;
  }

  body {
    margin: 0;
    font-family: 'Poppins', sans-serif;
    background: linear-gradient(135deg, var(--cream) 0%, var(--blush) 50%, var(--lavender) 100%);
    color: var(--text-main);
    overflow-x: hidden;
  }

  h1, h2, h3, .handwritten {
    font-family: 'Caveat', cursive;
  }

  /* Custom Scrollbar */
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }
  ::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.2); 
    border-radius: 10px;
  }
  ::-webkit-scrollbar-thumb {
    background: rgba(200, 200, 200, 0.5); 
    border-radius: 10px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: rgba(200, 200, 200, 0.8); 
  }
`;

interface GlassCardProps {
  children?: React.ReactNode;
  className?: string;
  onClick?: () => void;
  style?: React.CSSProperties;
}

const GlassCard = ({ children, className = "", onClick, style }: GlassCardProps) => (
  <div
    onClick={onClick}
    style={style}
    className={`bg-white/40 backdrop-blur-md border border-white/60 shadow-[0_8px_32px_0_rgba(31,38,135,0.07)] rounded-[24px] ${className}`}
  >
    {children}
  </div>
);

const FloatingBackground = () => {
  const elements = useMemo(() => Array.from({ length: 15 }).map((_, i) => ({
    id: i,
    type: Math.random() > 0.5 ? '🌸' : '🦋',
    x: Math.random() * 100,
    delay: Math.random() * 20,
    duration: 15 + Math.random() * 20,
    scale: 0.5 + Math.random() * 1
  })), []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {elements.map((el) => (
        <motion.div
          key={el.id}
          className="absolute text-2xl opacity-40"
          initial={{ top: '110vh', left: `${el.x}vw`, scale: el.scale, rotate: 0 }}
          animate={{
            top: '-10vh',
            left: [`${el.x}vw`, `${el.x + 5}vw`, `${el.x - 5}vw`, `${el.x}vw`],
            rotate: 360
          }}
          transition={{
            duration: el.duration,
            repeat: Infinity,
            delay: el.delay,
            ease: "linear"
          }}
        >
          {el.type}
        </motion.div>
      ))}
    </div>
  );
};

const INITIAL_RESOURCES = [
  { id: 1, title: 'Cell Biology Crash Course', subject: 'Biology', type: 'YouTube', link: 'https://youtube.com', date: '2023-10-24', isFavorite: true, tags: ['exam-prep', 'video'] },
  { id: 2, title: 'Calculus III Formula Sheet', subject: 'Math', type: 'PDF', link: '#', date: '2023-10-20', isFavorite: false, tags: ['formulas', 'reference'] },
  { id: 3, title: 'React Hooks Documentation', subject: 'Computer Science', type: 'Website', link: 'https://react.dev', date: '2023-10-25', isFavorite: true, tags: ['coding', 'docs'] },
  { id: 4, title: 'World War II Timeline', subject: 'History', type: 'Notes', link: '#', date: '2023-10-18', isFavorite: false, tags: ['essay', 'timeline'] },
  { id: 5, title: 'Physics Lab Data', subject: 'Physics', type: 'Drive', link: '#', date: '2023-10-26', isFavorite: false, tags: ['lab', 'raw-data'] },
];

const INITIAL_TASKS = [
  { id: 1, text: 'Review Biology chapter 4', priority: 'High', completed: false },
  { id: 2, text: 'Submit Math assignment', priority: 'Medium', completed: false },
  { id: 3, text: 'Read History primary sources', priority: 'Low', completed: false },
];

const QUOTES = [
  "Small steps every day lead to big results. 🌸",
  "Focus on being productive instead of busy. ✨",
  "Believe you can and you're halfway there. 🦋",
  "Your potential is endless. 🌿"
];

const LandingPage = ({ onEnter }) => (
  <div className="min-h-screen flex items-center justify-center relative z-10 p-6">
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <GlassCard className="p-12 text-center max-w-lg w-full flex flex-col items-center">
        <motion.div
          initial={{ rotate: -10 }}
          animate={{ rotate: 10 }}
          transition={{ repeat: Infinity, duration: 2, repeatType: 'reverse', ease: "easeInOut" }}
          className="text-6xl mb-6"
        >
          🌸
        </motion.div>
        <h1 className="text-6xl font-bold mb-4 text-[#FFB6C1] drop-shadow-sm">StudyBloom</h1>
        <p className="text-lg text-gray-600 mb-10 font-light">
          Your peaceful corner for focused learning, resource organization, and daily productivity.
        </p>
        <motion.button
          whileHover={{ scale: 1.05, backgroundColor: "#F8C8DC" }}
          whileTap={{ scale: 0.95 }}
          onClick={onEnter}
          className="bg-[#FADADD] text-gray-800 px-8 py-4 rounded-full font-medium shadow-lg flex items-center gap-2 text-lg transition-colors border border-white/50"
        >
          Get Started <ChevronRight className="w-5 h-5" />
        </motion.button>
      </GlassCard>
    </motion.div>
  </div>
);

const Dashboard = ({ focusTime, tasksDue }) => {
  const quote = useMemo(() => QUOTES[Math.floor(Math.random() * QUOTES.length)], []);
  const dateStr = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });

  return (
    <div className="p-8 space-y-6 max-w-5xl mx-auto h-full overflow-y-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
        <h1 className="text-5xl font-bold mb-2">Good Morning, Ayesha 🌸</h1>
        <p className="text-gray-500 font-medium ml-2">{dateStr}</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <GlassCard className="p-6 md:col-span-2 flex flex-col justify-center relative overflow-hidden group">
          <div className="absolute top-0 right-0 -mt-8 -mr-8 text-[#C8E6C9] opacity-20 group-hover:scale-110 transition-transform duration-700">
            <Layout size={180} />
          </div>
          <h2 className="text-2xl handwritten text-gray-400 mb-2">Quote of the day</h2>
          <p className="text-2xl font-medium leading-relaxed italic">"{quote}"</p>
        </GlassCard>

        <GlassCard className="p-6 flex flex-col items-center justify-center text-center">
          <h2 className="text-xl font-semibold mb-4 text-gray-500">Current Mood</h2>
          <div className="text-6xl cursor-pointer hover:scale-110 transition-transform">
            ✨
          </div>
        </GlassCard>

        <GlassCard className="p-6 flex items-center gap-4 bg-gradient-to-br from-white/40 to-[#FADADD]/30">
          <div className="p-4 bg-white/60 rounded-2xl shadow-sm text-[#FF69B4]">
            <Clock size={32} />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Focus Time</p>
            <p className="text-3xl font-bold">{Math.round(focusTime / 60)} <span className="text-lg font-normal text-gray-500">hrs</span> {focusTime % 60} <span className="text-lg font-normal text-gray-500">mins</span></p>
          </div>
        </GlassCard>

        <GlassCard className="p-6 flex items-center gap-4 bg-gradient-to-br from-white/40 to-[#E6E6FA]/40">
          <div className="p-4 bg-white/60 rounded-2xl shadow-sm text-[#9370DB]">
            <CheckCircle2 size={32} />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Tasks Due</p>
            <p className="text-3xl font-bold">{tasksDue}</p>
          </div>
        </GlassCard>

        <GlassCard className="p-6 flex items-center gap-4 bg-gradient-to-br from-white/40 to-[#C8E6C9]/40">
          <div className="p-4 bg-white/60 rounded-2xl shadow-sm text-[#4CAF50]">
            <BookOpen size={32} />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Next Up</p>
            <p className="text-xl font-bold truncate max-w-[150px]">Biology Review</p>
          </div>
        </GlassCard>
      </div>
    </div>
  );
};

const FocusTimer = ({ addFocusTime }) => {
  const [duration, setDuration] = useState(25 * 60); // in seconds
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [sessions, setSessions] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => time - 1);
      }, 1000);
    } else if (isActive && timeLeft === 0) {
      setIsActive(false);
      setSessions(s => s + 1);
      addFocusTime(duration / 60);
      setShowCelebration(true);
      setTimeout(() => setShowCelebration(false), 5000);
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft, duration, addFocusTime]);

  const toggleTimer = () => setIsActive(!isActive);
  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(duration);
    setShowCelebration(false);
  };

  const setPreset = (mins) => {
    setDuration(mins * 60);
    setTimeLeft(mins * 60);
    setIsActive(false);
    setShowCelebration(false);
  };

  const progress = 1 - timeLeft / duration;
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="p-8 max-w-4xl mx-auto h-full flex flex-col items-center justify-center">
      <div className="w-full mb-8 flex justify-between items-center">
        <h2 className="text-4xl handwritten font-bold text-gray-700">Deep Focus 🌿</h2>
        <div className="flex gap-4 text-sm font-medium text-gray-600 bg-white/50 px-4 py-2 rounded-full shadow-sm backdrop-blur-sm">
          <span>🎯 {sessions} Sessions</span>
        </div>
      </div>

      <GlassCard className="w-full p-8 md:p-12 flex flex-col items-center relative overflow-hidden">
        {/* Animated Background Elements */}
        <motion.div
          className="absolute top-10 left-10 text-4xl opacity-60"
          animate={{ x: [0, 50, 0], y: [0, -10, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          ☁️
        </motion.div>
        <motion.div
          className="absolute top-24 right-20 text-3xl opacity-50"
          animate={{ x: [0, -40, 0], y: [0, 15, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        >
          ☁️
        </motion.div>

        {/* Timer Presets */}
        <div className="flex gap-3 mb-12 z-10">
          {[25, 45, 60, 90].map(mins => (
            <button
              key={mins}
              onClick={() => setPreset(mins)}
              className={`px-4 py-2 rounded-full font-medium transition-all ${duration === mins * 60
                  ? 'bg-[#C8E6C9] text-gray-800 shadow-md scale-105'
                  : 'bg-white/50 text-gray-500 hover:bg-white/80'
                }`}
            >
              {mins}m
            </button>
          ))}
        </div>

        {/* The Forest Scene Animation */}
        <div className="w-full max-w-2xl h-48 relative mb-12 flex items-center z-10">
          {/* Branch */}
          <div className="absolute top-1/2 left-0 w-full h-4 bg-gradient-to-r from-[#8B5A2B] to-[#6b4423] rounded-full shadow-inner transform -translate-y-1/2">
            <motion.div
              className="absolute -top-3 left-10 text-xl"
              animate={{ rotate: [-5, 5, -5] }} transition={{ duration: 3, repeat: Infinity }}
            >🍃</motion.div>
            <motion.div
              className="absolute -bottom-4 right-20 text-2xl"
              animate={{ rotate: [5, -5, 5] }} transition={{ duration: 4, repeat: Infinity }}
            >🌿</motion.div>
            <motion.div
              className="absolute -top-5 right-1/3 text-lg"
              animate={{ rotate: [-10, 10, -10] }} transition={{ duration: 3.5, repeat: Infinity }}
            >🍃</motion.div>
          </div>

          {/* Koala & Progress Tracking */}
          <div className="absolute top-1/2 left-0 w-full h-full transform -translate-y-1/2 pointer-events-none">
            <motion.div
              className="absolute text-5xl z-20 drop-shadow-lg"
              style={{ top: '50%', marginTop: '-42px' }}
              initial={{ left: '0%' }}
              animate={{ left: `calc(${progress * 100}% - 24px)` }}
              transition={{ type: 'tween', ease: 'linear', duration: 1 }}
            >
              <motion.div
                animate={isActive ? { y: [-2, 2, -2], rotate: [-2, 2, -2] } : {}}
                transition={{ duration: 1, repeat: Infinity }}
              >
                🐨
              </motion.div>
            </motion.div>
          </div>

          {/* Celebration */}
          <AnimatePresence>
            {showCelebration && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5, y: -20 }}
                animate={{ opacity: 1, scale: 1, y: -40 }}
                exit={{ opacity: 0 }}
                className="absolute right-0 top-1/2 text-2xl font-bold text-[#FF69B4] flex items-center gap-2 z-30"
                style={{ right: '-20px' }}
              >
                Great Job! ✨🌸
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Digital Timer */}
        <div className="text-7xl font-light tabular-nums tracking-tight mb-10 text-gray-800 drop-shadow-sm z-10">
          {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
        </div>

        {/* Controls */}
        <div className="flex gap-6 z-10">
          <button
            onClick={toggleTimer}
            className={`w-16 h-16 rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-105 ${isActive ? 'bg-[#FFB6C1] text-white' : 'bg-[#C8E6C9] text-gray-800'
              }`}
          >
            {isActive ? <Pause size={28} /> : <Play size={28} className="ml-1" />}
          </button>
          <button
            onClick={resetTimer}
            className="w-16 h-16 rounded-full flex items-center justify-center shadow-md bg-white/60 text-gray-600 hover:bg-white hover:scale-105 transition-all"
          >
            <RotateCcw size={24} />
          </button>
        </div>
      </GlassCard>
    </div>
  );
};

const ResourcesVault = () => {
  const [resources, setResources] = useState(INITIAL_RESOURCES);
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState('All');
  const [isFormOpen, setIsFormOpen] = useState(false);

  // Form State
  const [formData, setFormData] = useState({ title: '', subject: '', type: 'Website', link: '', isFavorite: false });

  const types = ['All', 'YouTube', 'PDF', 'Website', 'Notes', 'Drive'];

  const getTypeColor = (type) => {
    switch (type) {
      case 'YouTube': return 'bg-red-100 text-red-600 border-red-200';
      case 'PDF': return 'bg-orange-100 text-orange-600 border-orange-200';
      case 'Website': return 'bg-blue-100 text-blue-600 border-blue-200';
      case 'Notes': return 'bg-purple-100 text-purple-600 border-purple-200';
      case 'Drive': return 'bg-green-100 text-green-600 border-green-200';
      default: return 'bg-gray-100 text-gray-600 border-gray-200';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'YouTube': return <Youtube size={14} className="mr-1" />;
      case 'PDF': return <FileText size={14} className="mr-1" />;
      case 'Website': return <Globe size={14} className="mr-1" />;
      case 'Notes': return <Edit size={14} className="mr-1" />;
      case 'Drive': return <Cloud size={14} className="mr-1" />;
      default: return null;
    }
  };

  const filteredResources = useMemo(() => {
    return resources.filter(r => {
      const matchesSearch = r.title.toLowerCase().includes(search.toLowerCase()) || r.subject.toLowerCase().includes(search.toLowerCase());
      const matchesType = filterType === 'All' || r.type === filterType;
      return matchesSearch && matchesType;
    }).sort((a, b) => Number(b.isFavorite) - Number(a.isFavorite));
  }, [resources, search, filterType]);

  const toggleFavorite = (id) => {
    setResources(resources.map(r => r.id === id ? { ...r, isFavorite: !r.isFavorite } : r));
  };

  const deleteResource = (id) => {
    setResources(resources.filter(r => r.id !== id));
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.link) return;

    const newRes = {
      ...formData,
      id: Date.now(),
      date: new Date().toISOString().split('T')[0],
      tags: []
    };
    setResources([newRes, ...resources]);
    setIsFormOpen(false);
    setFormData({ title: '', subject: '', type: 'Website', link: '', isFavorite: false });
  };

  return (
    <div className="p-8 max-w-6xl mx-auto h-full flex flex-col">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-4xl handwritten font-bold mb-2">Resource Vault 📚</h1>
          <p className="text-gray-500">Organize and access your study materials.</p>
        </div>
        <button
          onClick={() => setIsFormOpen(true)}
          className="bg-[#E6E6FA] text-indigo-900 px-5 py-2.5 rounded-full font-medium shadow-sm hover:shadow-md transition-all flex items-center gap-2 border border-white/60"
        >
          <Plus size={18} /> Add Resource
        </button>
      </div>

      <GlassCard className="flex-1 flex flex-col p-6 overflow-hidden min-h-[500px]">
        {/* Controls */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search by title or subject..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white/50 border border-white/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E6E6FA] transition-all placeholder-gray-400"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
            {types.map(type => (
              <button
                key={type}
                onClick={() => setFilterType(type)}
                className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all border ${filterType === type
                    ? 'bg-white shadow-sm border-white text-gray-800'
                    : 'bg-white/30 border-white/40 text-gray-600 hover:bg-white/50'
                  }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Table Container */}
        <div className="flex-1 overflow-auto rounded-xl border border-white/40 bg-white/20">
          <table className="w-full text-left border-collapse">
            <thead className="bg-white/40 sticky top-0 backdrop-blur-md z-10 text-sm text-gray-600 font-medium">
              <tr>
                <th className="p-4 w-12 text-center"></th>
                <th className="p-4">Title</th>
                <th className="p-4">Subject</th>
                <th className="p-4">Type</th>
                <th className="p-4 hidden md:table-cell">Date Added</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence>
                {filteredResources.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-12 text-center text-gray-500">
                      <Folder size={48} className="mx-auto mb-4 opacity-20" />
                      No resources found. Try adjusting your search!
                    </td>
                  </tr>
                ) : (
                  filteredResources.map((res) => (
                    <motion.tr
                      key={res.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="border-b border-white/20 hover:bg-white/30 transition-colors group"
                    >
                      <td className="p-4 text-center">
                        <button onClick={() => toggleFavorite(res.id)} className="focus:outline-none transition-transform hover:scale-110">
                          <Star size={18} className={res.isFavorite ? "fill-yellow-400 text-yellow-400" : "text-gray-300"} />
                        </button>
                      </td>
                      <td className="p-4 font-medium text-gray-800">{res.title}</td>
                      <td className="p-4 text-gray-600 text-sm">{res.subject}</td>
                      <td className="p-4">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${getTypeColor(res.type)}`}>
                          {getTypeIcon(res.type)} {res.type}
                        </span>
                      </td>
                      <td className="p-4 text-sm text-gray-500 hidden md:table-cell">{res.date}</td>
                      <td className="p-4 text-right space-x-2">
                        <a href={res.link} target="_blank" rel="noreferrer" className="inline-block p-2 text-gray-400 hover:text-blue-500 hover:bg-white/50 rounded-lg transition-colors">
                          <ExternalLink size={16} />
                        </a>
                        <button onClick={() => deleteResource(res.id)} className="inline-block p-2 text-gray-400 hover:text-red-500 hover:bg-white/50 rounded-lg transition-colors">
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </motion.tr>
                  ))
                )}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </GlassCard>

      {/* Add Resource Modal overlay */}
      <AnimatePresence>
        {isFormOpen && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/20 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }}
              className="bg-white/80 backdrop-blur-xl border border-white shadow-2xl rounded-3xl p-6 w-full max-w-md relative"
            >
              <button onClick={() => setIsFormOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-700">
                <X size={20} />
              </button>
              <h2 className="text-2xl handwritten font-bold mb-6">Add New Resource</h2>

              <form onSubmit={handleAddSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                  <input required type="text" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} className="w-full px-4 py-2 bg-white/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E6E6FA]" placeholder="e.g. React Tutorial" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                  <input required type="text" value={formData.subject} onChange={e => setFormData({ ...formData, subject: e.target.value })} className="w-full px-4 py-2 bg-white/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E6E6FA]" placeholder="e.g. Web Development" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                    <select value={formData.type} onChange={e => setFormData({ ...formData, type: e.target.value })} className="w-full px-4 py-2 bg-white/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E6E6FA]">
                      {types.filter(t => t !== 'All').map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                  <div className="flex flex-col justify-end pb-2">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" checked={formData.isFavorite} onChange={e => setFormData({ ...formData, isFavorite: e.target.checked })} className="rounded text-[#FADADD] focus:ring-[#FADADD] w-4 h-4" />
                      <span className="text-sm font-medium text-gray-700">Favorite</span>
                    </label>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Link (URL)</label>
                  <input required type="url" value={formData.link} onChange={e => setFormData({ ...formData, link: e.target.value })} className="w-full px-4 py-2 bg-white/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E6E6FA]" placeholder="https://..." />
                </div>
                <button type="submit" className="w-full py-3 mt-4 bg-[#E6E6FA] hover:bg-[#d8d8f8] text-indigo-900 font-medium rounded-xl transition-colors shadow-sm">
                  Save Resource
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const ConfettiParticle = ({ delay }) => {
  const angle = Math.random() * Math.PI * 2;
  const velocity = 50 + Math.random() * 100;
  const x = Math.cos(angle) * velocity;
  const y = Math.sin(angle) * velocity;
  const colors = ['#FADADD', '#E6E6FA', '#C8E6C9', '#FFD700', '#FF69B4'];
  const color = colors[Math.floor(Math.random() * colors.length)];

  return (
    <motion.div
      initial={{ x: 0, y: 0, scale: 0, opacity: 1 }}
      animate={{
        x: x,
        y: y + 50, // Slight gravity effect
        scale: Math.random() > 0.5 ? 1 : 0.5,
        opacity: 0
      }}
      transition={{ duration: 0.8, ease: "easeOut", delay }}
      className="absolute w-3 h-3 rounded-full z-50 pointer-events-none"
      style={{ backgroundColor: color }}
    />
  );
};

const TodoList = ({ tasks, setTasks }) => {
  const [newTask, setNewTask] = useState('');
  const [animatingId, setAnimatingId] = useState(null);

  const handleToggle = (id) => {
    const task = tasks.find(t => t.id === id);
    if (!task.completed) {
      setAnimatingId(id);
      setTimeout(() => setAnimatingId(null), 1000);
    }

    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const handleAdd = (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;
    setTasks([{ id: Date.now(), text: newTask, priority: 'Medium', completed: false }, ...tasks]);
    setNewTask('');
  };

  const deleteBtn = (id, e) => {
    e.stopPropagation();
    setTasks(tasks.filter(t => t.id !== id));
  };

  const getPriorityColor = (p) => {
    if (p === 'High') return 'bg-red-100 text-red-600 border-red-200';
    if (p === 'Medium') return 'bg-yellow-100 text-yellow-700 border-yellow-200';
    return 'bg-green-100 text-green-600 border-green-200';
  };

  return (
    <div className="p-8 max-w-3xl mx-auto h-full flex flex-col">
      <div className="mb-8">
        <h1 className="text-4xl handwritten font-bold mb-2">Daily Tasks 📝</h1>
        <p className="text-gray-500">What needs to get done today?</p>
      </div>

      <GlassCard className="p-6 flex-1 flex flex-col min-h-[500px]">
        <form onSubmit={handleAdd} className="mb-6 relative">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Add a new task..."
            className="w-full pl-4 pr-12 py-4 bg-white/50 border border-white/60 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#FADADD] transition-all shadow-sm text-lg"
          />
          <button type="submit" className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 bg-[#FADADD] text-gray-700 rounded-xl hover:shadow-md transition-all">
            <Plus size={20} />
          </button>
        </form>

        <div className="flex-1 overflow-y-auto pr-2 space-y-3 hide-scrollbar">
          <AnimatePresence>
            {tasks.map(task => (
              <motion.div
                key={task.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className={`p-4 rounded-2xl border flex items-center gap-4 cursor-pointer transition-all ${task.completed ? 'bg-white/30 border-white/20' : 'bg-white/60 border-white shadow-sm hover:shadow-md'
                  }`}
                onClick={() => handleToggle(task.id)}
              >
                <div className="relative">
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${task.completed ? 'bg-[#C8E6C9] border-[#C8E6C9] text-white' : 'border-gray-300'
                    }`}>
                    {task.completed && <Check size={14} strokeWidth={3} />}
                  </div>

                  {/* Confetti Explosion Anchor */}
                  {animatingId === task.id && (
                    <div className="absolute top-1/2 left-1/2 w-0 h-0">
                      {Array.from({ length: 20 }).map((_, i) => (
                        <ConfettiParticle key={i} delay={0} />
                      ))}
                    </div>
                  )}
                </div>

                <div className={`flex-1 text-lg transition-all ${task.completed ? 'text-gray-400 line-through' : 'text-gray-800'}`}>
                  {task.text}
                </div>

                {!task.completed && (
                  <span className={`text-xs px-2.5 py-1 rounded-full border ${getPriorityColor(task.priority)}`}>
                    {task.priority}
                  </span>
                )}

                <button onClick={(e) => deleteBtn(task.id, e)} className="p-2 text-gray-300 hover:text-red-400 hover:bg-white/50 rounded-lg transition-colors opacity-0 group-hover:opacity-100 sm:opacity-100">
                  <Trash2 size={16} />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
          {tasks.length === 0 && (
            <div className="text-center py-12 text-gray-400">
              <CheckSquare size={48} className="mx-auto mb-4 opacity-20" />
              <p>All caught up! Time to relax. 🌸</p>
            </div>
          )}
        </div>
      </GlassCard>
    </div>
  );
};


export default function App() {
  const [currentView, setCurrentView] = useState('landing');
  const [focusTimeMinutes, setFocusTimeMinutes] = useState(120); // Seeded 2 hours
  const [tasks, setTasks] = useState(INITIAL_TASKS);

  const pendingTasksCount = useMemo(() => tasks.filter(t => !t.completed).length, [tasks]);

  const navItems = [
    { id: 'dashboard', icon: Home, label: 'Dashboard' },
    { id: 'timer', icon: Timer, label: 'Focus Timer' },
    { id: 'resources', icon: BookOpen, label: 'Vault' },
    { id: 'todo', icon: CheckSquare, label: 'To-Do' },
  ];

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: fontStyles }} />
      <div className="min-h-screen w-full relative flex text-gray-800 selection:bg-[#FADADD] selection:text-gray-900">
        <FloatingBackground />

        <AnimatePresence mode="wait">
          {currentView === 'landing' ? (
            <motion.div key="landing" className="w-full h-full absolute inset-0 z-20" exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.5 }}>
              <LandingPage onEnter={() => setCurrentView('dashboard')} />
            </motion.div>
          ) : (
            <motion.div key="app" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex w-full h-screen z-10">

              {/* Sidebar Navigation */}
              <div className="w-24 md:w-64 border-r border-white/40 bg-white/20 backdrop-blur-md flex flex-col py-8 px-4 h-full shrink-0">
                <div className="hidden md:flex items-center gap-3 px-4 mb-12">
                  <span className="text-3xl">🌸</span>
                  <span className="font-bold text-2xl text-gray-700 handwritten tracking-wide">StudyBloom</span>
                </div>

                <nav className="flex-1 space-y-3">
                  {navItems.map(item => {
                    const active = currentView === item.id;
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.id}
                        onClick={() => setCurrentView(item.id)}
                        className={`w-full flex items-center justify-center md:justify-start gap-4 px-4 py-4 md:py-3 rounded-2xl transition-all ${active
                            ? 'bg-white/60 shadow-sm text-gray-900 font-medium scale-100 md:scale-105'
                            : 'text-gray-500 hover:bg-white/40 hover:text-gray-700'
                          }`}
                      >
                        <Icon size={22} className={active ? "text-[#FF69B4]" : ""} />
                        <span className="hidden md:block">{item.label}</span>
                      </button>
                    );
                  })}
                </nav>

                {/* Small user profile placeholder at bottom */}
                <div className="mt-auto hidden md:flex items-center gap-3 px-4 py-3 bg-white/30 rounded-2xl border border-white/50">
                  <div className="w-10 h-10 rounded-full bg-[#E6E6FA] flex items-center justify-center font-bold text-indigo-400">A</div>
                  <div>
                    <p className="text-sm font-medium">Ayesha</p>
                    <p className="text-xs text-gray-500">Student Pro</p>
                  </div>
                </div>
              </div>

              {/* Main Content Area */}
              <main className="flex-1 h-full overflow-hidden relative">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentView}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="h-full w-full absolute inset-0 overflow-y-auto"
                  >
                    {currentView === 'dashboard' && <Dashboard focusTime={focusTimeMinutes} tasksDue={pendingTasksCount} />}
                    {currentView === 'timer' && <FocusTimer addFocusTime={(mins) => setFocusTimeMinutes(prev => prev + mins)} />}
                    {currentView === 'resources' && <ResourcesVault />}
                    {currentView === 'todo' && <TodoList tasks={tasks} setTasks={setTasks} />}
                  </motion.div>
                </AnimatePresence>
              </main>

            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}