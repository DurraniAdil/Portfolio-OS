import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Note {
    id: string;
    title: string;
    content: string;
    createdAt: number;
    color: string;
}

const PASTEL_COLORS = [
    { name: 'Rose Quartz', light: '#FFD6E8', dark: '#7A2E4A', accent: '#FF85B3' },
    { name: 'Lavender Dream', light: '#E7D4FF', dark: '#4A2E5E', accent: '#B68FFF' },
    { name: 'Sky Mist', light: '#D6F0FF', dark: '#2E4A5E', accent: '#85CFFF' },
    { name: 'Mint Breeze', light: '#D4FFE8', dark: '#2E5E4A', accent: '#8FFFB3' },
    { name: 'Peach Glow', light: '#FFE8D4', dark: '#5E4A2E', accent: '#FFB385' },
    { name: 'Lemon Sorbet', light: '#FFFAD4', dark: '#5E5A2E', accent: '#FFF485' },
];

export const EditorApp: React.FC = () => {
    const [notes, setNotes] = useState<Note[]>(() => {
        const saved = localStorage.getItem('durranios-notes');
        return saved ? JSON.parse(saved) : [];
    });
    const [activeNoteId, setActiveNoteId] = useState<string | null>(null);
    const [isDarkMode, setIsDarkMode] = useState(() => {
        return localStorage.getItem('durranios-theme') === 'dark';
    });
    const [showColorPicker, setShowColorPicker] = useState(false);
    const [copiedToast, setCopiedToast] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    useEffect(() => {
        localStorage.setItem('durranios-notes', JSON.stringify(notes));
    }, [notes]);

    useEffect(() => {
        localStorage.setItem('durranios-theme', isDarkMode ? 'dark' : 'light');
    }, [isDarkMode]);

    const activeNote = notes.find(n => n.id === activeNoteId);

    const createNewNote = (color: string = PASTEL_COLORS[0].light) => {
        const newNote: Note = {
            id: Date.now().toString(),
            title: 'Untitled Note',
            content: '',
            createdAt: Date.now(),
            color,
        };
        setNotes(prev => [newNote, ...prev]);
        setActiveNoteId(newNote.id);
        setShowColorPicker(false);
    };

    const updateNote = (id: string, updates: Partial<Note>) => {
        setNotes(prev => prev.map(n => n.id === id ? { ...n, ...updates } : n));
    };

    const deleteNote = (id: string) => {
        setNotes(prev => prev.filter(n => n.id !== id));
        if (activeNoteId === id) {
            setActiveNoteId(null);
        }
        setShowDeleteConfirm(false);
    };

    const clearNote = () => {
        if (activeNoteId) {
            updateNote(activeNoteId, { content: '', title: 'Untitled Note' });
        }
    };

    const copyToClipboard = async () => {
        if (activeNote) {
            await navigator.clipboard.writeText(`${activeNote.title}\n\n${activeNote.content}`);
            setCopiedToast(true);
            setTimeout(() => setCopiedToast(false), 2000);
        }
    };

    const getColorStyle = (note: Note) => {
        const colorDef = PASTEL_COLORS.find(c => c.light === note.color);
        return isDarkMode ? colorDef?.dark || '#1f2937' : note.color;
    };

    const getAccentColor = (note: Note) => {
        const colorDef = PASTEL_COLORS.find(c => c.light === note.color);
        return colorDef?.accent || '#FF85B3';
    };

    const formatDate = (timestamp: number) => {
        const date = new Date(timestamp);
        const now = new Date();
        const diffMs = now.getTime() - date.getTime();
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMs / 3600000);
        const diffDays = Math.floor(diffMs / 86400000);

        if (diffMins < 1) return 'Just now';
        if (diffMins < 60) return `${diffMins}m ago`;
        if (diffHours < 24) return `${diffHours}h ago`;
        if (diffDays < 7) return `${diffDays}d ago`;
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    };

    const filteredNotes = notes.filter(note =>
        note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        note.content.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const wordCount = activeNote?.content.split(/\s+/).filter(w => w).length || 0;
    const charCount = activeNote?.content.length || 0;

    return (
        <div className={`h-full flex ${isDarkMode ? 'bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950' : 'bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50'} transition-all duration-700`}>

            <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-20">
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 90, 0],
                    }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className={`absolute -top-40 -right-40 w-80 h-80 rounded-full blur-3xl ${isDarkMode ? 'bg-purple-500' : 'bg-pink-300'}`}
                />
                <motion.div
                    animate={{
                        scale: [1, 1.3, 1],
                        rotate: [0, -90, 0],
                    }}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                    className={`absolute -bottom-40 -left-40 w-80 h-80 rounded-full blur-3xl ${isDarkMode ? 'bg-blue-500' : 'bg-blue-300'}`}
                />
            </div>

            <motion.div
                initial={{ x: -320 }}
                animate={{ x: 0 }}
                transition={{ type: "spring", damping: 25 }}
                className={`w-80 flex-shrink-0 flex flex-col backdrop-blur-xl ${isDarkMode ? 'bg-slate-900/50 border-slate-700/50' : 'bg-white/60 border-white/80'} border-r shadow-2xl relative z-10`}
            >
                <div className={`p-6 border-b ${isDarkMode ? 'border-slate-700/50' : 'border-purple-100/50'}`}>
                    <div className="flex items-center justify-between mb-4">
                        <motion.h1
                            className="text-xl font-bold tracking-tight flex items-center gap-2"
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                        >

                            <span className={`bg-gradient-to-r ${isDarkMode ? 'from-pink-400 to-purple-400' : 'from-pink-600 to-purple-600'} bg-clip-text text-transparent`}>
                                Notes
                            </span>
                        </motion.h1>
                        <motion.button
                            whileHover={{ scale: 1.1, rotate: 180 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setIsDarkMode(!isDarkMode)}
                            className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all shadow-lg ${isDarkMode ? 'bg-gradient-to-br from-slate-800 to-slate-700 text-amber-300' : 'bg-gradient-to-br from-purple-100 to-pink-100 text-purple-600'}`}
                        >
                            {isDarkMode ? '☀️' : '🌙'}
                        </motion.button>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="mb-4"
                    >
                        <div className="relative">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search notes..."
                                className={`w-full pl-10 pr-4 py-2.5 rounded-xl text-sm transition-all ${isDarkMode
                                    ? 'bg-slate-800/50 border-slate-700 text-white placeholder-slate-500 focus:bg-slate-800'
                                    : 'bg-white/80 border-purple-100 text-gray-800 placeholder-gray-400 focus:bg-white'
                                    } border-2 focus:border-purple-400 focus:outline-none focus:ring-4 focus:ring-purple-400/20`}
                            />
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-lg">🔍</span>
                        </div>
                    </motion.div>

                    <div className="relative">
                        <motion.button
                            whileHover={{ scale: 1.02, y: -2 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setShowColorPicker(!showColorPicker)}
                            className={`w-full py-3 px-4 rounded-2xl font-semibold text-sm transition-all flex items-center justify-center gap-2 shadow-lg ${isDarkMode
                                ? 'bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white'
                                : 'bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-400 hover:to-purple-400 text-white'
                                } shadow-purple-500/30 hover:shadow-purple-500/50`}
                        >
                            <motion.span
                                animate={{ rotate: showColorPicker ? 45 : 0 }}
                                transition={{ type: "spring", stiffness: 200 }}
                                className="text-xl"
                            >
                                +
                            </motion.span>
                            <span>New Note</span>
                        </motion.button>

                        <AnimatePresence>
                            {showColorPicker && (
                                <motion.div
                                    initial={{ opacity: 0, y: -20, scale: 0.9 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: -20, scale: 0.9 }}
                                    transition={{ type: "spring", damping: 25 }}
                                    className={`absolute top-16 left-0 right-0 p-4 rounded-2xl shadow-2xl z-20 backdrop-blur-xl ${isDarkMode ? 'bg-slate-800/95 border border-slate-700' : 'bg-white/95 border border-purple-100'}`}
                                >
                                    <p className={`text-xs font-semibold mb-3 ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>
                                        Choose a color palette
                                    </p>
                                    <div className="grid grid-cols-3 gap-3">
                                        {PASTEL_COLORS.map((color, index) => (
                                            <motion.button
                                                key={color.name}
                                                initial={{ opacity: 0, scale: 0 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{ delay: index * 0.05 }}
                                                whileHover={{ scale: 1.15, rotate: 5 }}
                                                whileTap={{ scale: 0.95 }}
                                                onClick={() => createNewNote(color.light)}
                                                className="relative w-full aspect-square rounded-xl transition-all border-2 border-white/50 shadow-lg hover:shadow-xl overflow-hidden group"
                                                style={{ backgroundColor: isDarkMode ? color.dark : color.light }}
                                                title={color.name}
                                            >
                                                <div className="absolute inset-0 bg-white/0 group-hover:bg-white/20 transition-colors" />
                                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <span className="text-2xl">✨</span>
                                                </div>
                                            </motion.button>
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                {/* notes list, dont touch works fine for now */}
                <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
                    <AnimatePresence mode="popLayout">
                        {filteredNotes.length === 0 ? (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="text-center py-16"
                            >
                                <motion.div
                                    animate={{ y: [0, -10, 0] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                    className="text-6xl mb-4 opacity-40"
                                >
                                    📝
                                </motion.div>
                                <p className={`text-sm font-medium ${isDarkMode ? 'text-slate-500' : 'text-gray-400'}`}>
                                    {searchQuery ? 'No notes found' : 'No notes yet'}
                                </p>
                                <p className={`text-xs mt-1 ${isDarkMode ? 'text-slate-600' : 'text-gray-400'}`}>
                                    {searchQuery ? 'Try a different search' : 'Create your first note'}
                                </p>
                            </motion.div>
                        ) : (
                            filteredNotes.map((note, index) => (
                                <motion.button
                                    key={note.id}
                                    layout
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ delay: index * 0.03 }}
                                    whileHover={{ scale: 1.02, x: 4 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => setActiveNoteId(note.id)}
                                    className={`w-full p-4 rounded-2xl text-left transition-all group relative overflow-hidden shadow-lg hover:shadow-xl ${activeNoteId === note.id
                                        ? 'ring-2 ring-offset-2 ' + (isDarkMode ? 'ring-purple-500 ring-offset-slate-900' : 'ring-purple-400 ring-offset-purple-50')
                                        : ''
                                        }`}
                                    style={{
                                        backgroundColor: getColorStyle(note),
                                        boxShadow: activeNoteId === note.id ? `0 8px 32px ${getAccentColor(note)}40` : undefined
                                    }}
                                >

                                    <motion.div
                                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                                        initial={{ x: '-100%' }}
                                        whileHover={{ x: '100%' }}
                                        transition={{ duration: 0.6 }}
                                    />

                                    <div className="relative z-10">
                                        <div className="flex items-start justify-between mb-2">
                                            <p className={`font-bold text-base truncate flex-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                                                {note.title}
                                            </p>
                                            <span
                                                className="w-2 h-2 rounded-full ml-2 flex-shrink-0 mt-2"
                                                style={{ backgroundColor: getAccentColor(note) }}
                                            />
                                        </div>
                                        <p className={`text-sm mb-3 line-clamp-2 leading-relaxed ${isDarkMode ? 'text-white/70' : 'text-gray-700'}`}>
                                            {note.content || 'Empty note...'}
                                        </p>
                                        <div className="flex items-center justify-between">
                                            <span className={`text-[10px] font-mono font-semibold ${isDarkMode ? 'text-white/50' : 'text-gray-500'}`}>
                                                {formatDate(note.createdAt)}
                                            </span>
                                            <motion.button
                                                whileHover={{ scale: 1.3, rotate: 10 }}
                                                whileTap={{ scale: 0.8 }}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setActiveNoteId(note.id);
                                                    setShowDeleteConfirm(true);
                                                }}
                                                className={`opacity-0 group-hover:opacity-100 transition-all p-1.5 rounded-lg ${isDarkMode ? 'hover:bg-red-500/30' : 'hover:bg-red-100'}`}
                                            >
                                                <span className="text-sm">🗑️</span>
                                            </motion.button>
                                        </div>
                                    </div>
                                </motion.button>
                            ))
                        )}
                    </AnimatePresence>
                </div>

                {/* stats for footer */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className={`p-4 border-t ${isDarkMode ? 'border-slate-700/50 bg-slate-900/30' : 'border-purple-100/50 bg-white/30'} backdrop-blur-sm`}
                >
                    <div className="flex items-center justify-center gap-2 text-xs">
                        <span className={`font-mono font-semibold ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`}>
                            {notes.length}
                        </span>
                        <span className={`${isDarkMode ? 'text-slate-500' : 'text-gray-500'}`}>
                            {notes.length === 1 ? 'note' : 'notes'}
                        </span>
                        <span className={`mx-2 ${isDarkMode ? 'text-slate-700' : 'text-gray-300'}`}>•</span>
                        <span className={`${isDarkMode ? 'text-slate-500' : 'text-gray-400'} font-medium`}>
                            Pastel Notes v2.0
                        </span>
                    </div>
                </motion.div>
            </motion.div>

            {/* text area*/}
            <div className="flex-1 flex flex-col relative z-10">
                {activeNote ? (
                    <>
                        {/* tool bar, future addtions */}
                        <motion.div
                            initial={{ y: -50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            className={`flex items-center justify-between p-4 border-b backdrop-blur-xl ${isDarkMode ? 'border-slate-700/50 bg-slate-900/30' : 'border-purple-100/50 bg-white/40'}`}
                        >
                            <div className="flex items-center gap-3">
                                <motion.div
                                    whileHover={{ scale: 1.2, rotate: 180 }}
                                    className="w-6 h-6 rounded-xl border-2 border-white/70 shadow-lg"
                                    style={{ backgroundColor: getColorStyle(activeNote) }}
                                />
                                <div>
                                    <p className={`text-xs font-semibold ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>
                                        Currently editing
                                    </p>
                                    <p className={`text-[10px] font-mono ${isDarkMode ? 'text-slate-500' : 'text-gray-400'}`}>
                                        {wordCount} words • {charCount} chars
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <motion.button
                                    whileHover={{ scale: 1.05, y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={copyToClipboard}
                                    className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 shadow-md ${isDarkMode
                                        ? 'bg-slate-800/80 hover:bg-slate-700 text-slate-300'
                                        : 'bg-white/80 hover:bg-white text-gray-700'
                                        }`}
                                >
                                    <span>📋</span> Copy
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.05, y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={clearNote}
                                    className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 shadow-md ${isDarkMode
                                        ? 'bg-slate-800/80 hover:bg-slate-700 text-slate-300'
                                        : 'bg-white/80 hover:bg-white text-gray-700'
                                        }`}
                                >
                                    <span>✨</span> Clear
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.05, y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setShowDeleteConfirm(true)}
                                    className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 shadow-md ${isDarkMode
                                        ? 'bg-red-900/50 hover:bg-red-800/70 text-red-300'
                                        : 'bg-red-50 hover:bg-red-100 text-red-600'
                                        }`}
                                >
                                    <span>🗑️</span> Delete
                                </motion.button>
                            </div>
                        </motion.div>

                        {/* Editor Content */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.1 }}
                            className="flex-1 p-8 overflow-hidden"
                            style={{
                                backgroundColor: isDarkMode
                                    ? `${getColorStyle(activeNote)}40`
                                    : `${getColorStyle(activeNote)}60`
                            }}
                        >
                            <motion.div
                                initial={{ scale: 0.95, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                className={`h-full max-w-4xl mx-auto rounded-3xl p-8 backdrop-blur-md shadow-2xl ${isDarkMode ? 'bg-black/30' : 'bg-white/70'
                                    }`}
                                style={{
                                    boxShadow: `0 20px 60px ${getAccentColor(activeNote)}30`
                                }}
                            >
                                {/* title input area */}
                                <input
                                    type="text"
                                    value={activeNote.title}
                                    onChange={(e) => updateNote(activeNote.id, { title: e.target.value })}
                                    placeholder="✏️ Note title..."
                                    className={`w-full text-3xl font-bold bg-transparent border-none outline-none mb-6 pb-4 border-b-2 placeholder:opacity-40 transition-all ${isDarkMode
                                        ? 'text-white placeholder:text-white/40 border-white/20 focus:border-white/40'
                                        : 'text-gray-900 placeholder:text-gray-400 border-gray-200 focus:border-gray-400'
                                        }`}
                                />

                                {/* Content Textarea Area */}
                                <textarea
                                    value={activeNote.content}
                                    onChange={(e) => updateNote(activeNote.id, { content: e.target.value })}
                                    placeholder="Start writing your thoughts..."
                                    className={`w-full h-[calc(100%-6rem)] bg-transparent border-none outline-none resize-none text-base leading-loose placeholder:opacity-40 ${isDarkMode
                                        ? 'text-white/90 placeholder:text-white/30'
                                        : 'text-gray-800 placeholder:text-gray-400'
                                        }`}
                                    style={{ fontFamily: "'Inter', 'SF Pro Display', system-ui, sans-serif" }}
                                />
                            </motion.div>
                        </motion.div>
                    </>
                ) : (
                    /* state for when its empty */
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex-1 flex flex-col items-center justify-center"
                    >
                        <img
                            src={`${import.meta.env.BASE_URL}media/login.png`}
                            alt="User"
                            className="w-30 h-30"
                        />
                        <h2 className={`text-2xl font-bold mb-2 ${isDarkMode ? 'text-slate-300' : 'text-gray-700'}`}>
                            Select a note or create a new one
                        </h2>
                        <p className={`text-sm ${isDarkMode ? 'text-slate-500' : 'text-gray-500'}`}>
                            Your thoughts deserve a beautiful home
                        </p>
                    </motion.div>
                )}
            </div>

            <AnimatePresence>
                {showDeleteConfirm && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
                        onClick={() => setShowDeleteConfirm(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                            className={`max-w-md w-full p-6 rounded-3xl shadow-2xl ${isDarkMode ? 'bg-slate-800' : 'bg-white'
                                }`}
                        >
                            <div className="text-center mb-6">
                                <div className="text-5xl mb-4">⚠️</div>
                                <h3 className={`text-xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                                    Delete this note?
                                </h3>
                                <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-gray-600'}`}>
                                    This action cannot be undone
                                </p>
                            </div>
                            <div className="flex gap-3">
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => setShowDeleteConfirm(false)}
                                    className={`flex-1 py-3 rounded-xl font-semibold transition-all ${isDarkMode
                                        ? 'bg-slate-700 hover:bg-slate-600 text-white'
                                        : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                                        }`}
                                >
                                    Cancel
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => activeNoteId && deleteNote(activeNoteId)}
                                    className="flex-1 py-3 rounded-xl font-semibold bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-lg shadow-red-500/30"
                                >
                                    Delete
                                </motion.button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>


            <AnimatePresence>
                {copiedToast && (
                    <motion.div
                        initial={{ opacity: 0, y: 50, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 50, scale: 0.9 }}
                        className={`fixed bottom-8 right-8 px-6 py-4 rounded-2xl font-semibold text-sm shadow-2xl flex items-center gap-3 ${isDarkMode
                            ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white'
                            : 'bg-gradient-to-r from-green-500 to-emerald-500 text-white'
                            }`}
                    >
                        <span className="text-xl">✅</span>
                        <span>Copied to clipboard!</span>
                    </motion.div>
                )}
            </AnimatePresence>

            <style>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: ${isDarkMode ? 'rgba(139, 92, 246, 0.3)' : 'rgba(168, 85, 247, 0.3)'};
                    border-radius: 999px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: ${isDarkMode ? 'rgba(139, 92, 246, 0.5)' : 'rgba(168, 85, 247, 0.5)'};
                }
            `}</style>
        </div>
    );
};
