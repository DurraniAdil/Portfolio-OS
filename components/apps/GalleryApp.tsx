
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const images = [
    {
        id: 1,
        src: `${import.meta.env.BASE_URL}media/bard-photo.png`,
        title: 'The Bard',
        description: 'Creative & Artist'
    },
    {
        id: 2,
        src: `${import.meta.env.BASE_URL}media/dev-photo.png`,
        title: 'The Developer',
        description: 'Builder & Engineer'
    },
    {
        id: 3,
        src: `${import.meta.env.BASE_URL}media/ops-photo.png`,
        title: 'The Strategist',
        description: 'Operations & Systems'
    }
];

export const GalleryApp: React.FC = () => {
    const [selectedId, setSelectedId] = useState<number | null>(null);

    return (
        <div className="h-full flex flex-col bg-zinc-950 text-white font-sans selection:bg-pink-500/30">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-black opacity-20 pointer-events-none" />

            {/* header area */}
            <header className="h-16 shrink-0 flex items-center justify-between px-8 border-b border-white/5 bg-black/40 backdrop-blur-md relative z-10">
                <h1 className="text-lg font-black tracking-tighter uppercase flex items-center gap-2">
                    <span>📸</span> Gallery
                </h1>
                <div className="text-[9px] font-black text-white/30 uppercase tracking-[0.2em]">
                    {images.length} Items
                </div>
            </header>

            {/* main grid area */}
            <main className="flex-1 overflow-y-auto custom-scrollbar p-8 relative z-10">
                <div className="max-w-4xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {images.map((img) => (
                            <motion.div
                                key={img.id}
                                layoutId={`card-${img.id}`}
                                onClick={() => setSelectedId(img.id)}
                                className="group relative aspect-[3/4] bg-white/5 border border-white/10 rounded-2xl overflow-hidden cursor-pointer hover:border-white/30 transition-colors"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <img
                                    src={img.src}
                                    alt={img.title}
                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />

                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                                    <h3 className="text-xl font-bold text-white mb-1">{img.title}</h3>
                                    <p className="text-xs text-white/60 uppercase tracking-widest">{img.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </main>

            {/* lightbox modal */}
            <AnimatePresence>
                {selectedId && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedId(null)}
                        className="fixed inset-0 bg-black/90 backdrop-blur-xl z-[9999] flex items-center justify-center p-8"
                    >
                        {images.map((img) => {
                            if (img.id !== selectedId) return null;
                            return (
                                <motion.div
                                    key={img.id}
                                    layoutId={`card-${img.id}`}
                                    className="relative max-w-5xl max-h-[85vh] w-full bg-zinc-900 rounded-3xl overflow-hidden border border-white/10 shadow-2xl flex flex-col md:flex-row"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <div className="flex-1 relative bg-black flex items-center justify-center overflow-hidden">
                                        <img
                                            src={img.src}
                                            alt={img.title}
                                            className="max-w-full max-h-[85vh] object-contain"
                                        />
                                    </div>

                                    <div className="w-full md:w-80 bg-zinc-900 border-l border-white/5 p-8 flex flex-col justify-center shrink-0">
                                        <h2 className="text-3xl font-black text-white mb-2">{img.title}</h2>
                                        <p className="text-sm text-white/50 uppercase tracking-widest font-bold mb-6">{img.description}</p>
                                        <div className="h-px w-full bg-white/10 mb-6" />
                                        <p className="text-sm text-white/70 leading-relaxed">
                                            A high-resolution capture from the portfolio archives.
                                            Displaying uncompressed raw data.
                                        </p>

                                        <button
                                            onClick={() => setSelectedId(null)}
                                            className="mt-12 w-full py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-xs font-black uppercase tracking-widest transition-all"
                                        >
                                            Close View
                                        </button>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
