import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface DeviceGuardProps {
    redirectUrl: string;
    breakpoint?: number;
    waitForBoot?: boolean;
}

export const DeviceGuard = ({
    redirectUrl,
    breakpoint = 768,
    waitForBoot = false
}: DeviceGuardProps) => {
    const [showWarning, setShowWarning] = useState(false);
    const [countdown, setCountdown] = useState(10);
    const [viewportWidth, setViewportWidth] = useState(
        typeof window !== 'undefined' ? window.innerWidth : 0
    );
    const [bootComplete, setBootComplete] = useState(!waitForBoot);
    const [textVisible, setTextVisible] = useState(false);

    // listen for boot complete event
    useEffect(() => {
        if (!waitForBoot) return;

        const handleBootComplete = () => {
            setBootComplete(true);
        };

        window.addEventListener('bootComplete', handleBootComplete);
        return () => window.removeEventListener('bootComplete', handleBootComplete);
    }, [waitForBoot]);

    // check device and show warning when bootComplete changes to true
    useEffect(() => {
        const isMobile = window.innerWidth < breakpoint;
        setViewportWidth(window.innerWidth);

        if (isMobile && bootComplete) {
            setShowWarning(true);
            // delay text animation
            setTimeout(() => setTextVisible(true), 300);
        }
    }, [bootComplete, breakpoint]);

    // resize listener
    useEffect(() => {
        const handleResize = () => {
            const isMobile = window.innerWidth < breakpoint;
            setViewportWidth(window.innerWidth);

            if (isMobile && bootComplete) {
                setShowWarning(true);
                setTimeout(() => setTextVisible(true), 300);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [breakpoint, bootComplete]);

    // countdown timer
    useEffect(() => {
        if (!showWarning) return;

        const timer = setInterval(() => {
            setCountdown((prev) => {
                if (prev <= 1) {
                    window.location.href = redirectUrl;
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [showWarning, redirectUrl]);

    return (
        <AnimatePresence>
            {showWarning && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[9999] flex items-center justify-center bg-black px-4"
                >

                    <div className="absolute inset-0 pointer-events-none opacity-20">
                        <div
                            className="w-full h-full"
                            style={{
                                backgroundImage: `repeating-linear-gradient(
                  0deg,
                  rgba(0, 255, 0, 0.03) 0px,
                  transparent 1px,
                  transparent 2px,
                  rgba(0, 255, 0, 0.03) 3px
                )`
                            }}
                        />
                    </div>

                    {/* terminal window */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                        className="w-full max-w-3xl bg-black border border-green-500/30 shadow-[0_0_50px_rgba(34,197,94,0.3)] rounded-lg overflow-hidden"
                    >

                        <div className="bg-gray-900/80 border-b border-green-500/20 px-4 py-2 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div className="flex gap-1.5">
                                    <div className="w-3 h-3 rounded-full bg-red-500/70" />
                                    <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                                    <div className="w-3 h-3 rounded-full bg-green-500/70" />
                                </div>
                                <span className="text-green-400 text-xs font-mono ml-2">
                                    root@portfolio-os:~$
                                </span>
                            </div>
                            <span className="text-green-500/50 text-xs font-mono">
                                system_alert.sh
                            </span>
                        </div>

                        {/* terminal content */}
                        <div className="bg-black p-6 font-mono text-sm space-y-4 min-h-[500px]">
                            {textVisible && (
                                <>

                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.1 }}
                                    >
                                        <p className="text-green-400">
                                            $ ./check_viewport.sh
                                        </p>
                                    </motion.div>

                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.3 }}
                                        className="space-y-1"
                                    >
                                        <p className="text-gray-500">Analyzing system...</p>
                                        <p className="text-gray-500">Checking viewport dimensions...</p>
                                    </motion.div>

                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.6 }}
                                        className="border-l-2 border-red-500 pl-3 py-2 space-y-1"
                                    >
                                        <p className="text-red-400">
                                            <span className="text-red-500 font-bold">[ERROR]</span> Viewport dimensions insufficient
                                        </p>
                                        <p className="text-gray-400">
                                            <span className="text-gray-500">├─</span> Required: <span className="text-white">≥{breakpoint}px</span>
                                        </p>
                                        <p className="text-gray-400">
                                            <span className="text-gray-500">└─</span> Current: <span className="text-red-300">{viewportWidth}px</span>
                                        </p>
                                    </motion.div>

                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.9 }}
                                        className="border-l-2 border-yellow-500 pl-3 py-2 space-y-1"
                                    >
                                        <p className="text-yellow-400">
                                            <span className="text-yellow-500 font-bold">[WARNING]</span> Portfolio-OS requires desktop viewport
                                        </p>
                                        <p className="text-gray-400 text-xs">
                                            Windowed layouts, draggable components, and taskbar navigation are optimized for screens ≥{breakpoint}px wide.
                                        </p>
                                    </motion.div>
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 1.2 }}
                                        className="space-y-2 pt-2"
                                    >
                                        <p className="text-cyan-400">
                                            <span className="text-cyan-500">→</span> Initiating redirect to Portal...
                                        </p>
                                        <p className="text-gray-500 text-xs">
                                            Suggestion: Try{' '}
                                            <a
                                                href="https://durraniadil.github.io/Portfolio-App/"
                                                className="text-cyan-400 hover:text-cyan-300 underline"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                Portfolio-App
                                            </a>
                                            {' '}for mobile devices
                                        </p>
                                    </motion.div>

                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 1.5 }}
                                        className="pt-4"
                                    >
                                        <p className="text-green-400">
                                            $ echo "Make the right choice this time."
                                        </p>
                                        <p className="text-green-300">Make the right choice this time.</p>
                                    </motion.div>


                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 1.8 }}
                                        className="pt-6 space-y-3"
                                    >
                                        <div className="flex items-center gap-3">
                                            <p className="text-gray-500">Redirecting in:</p>
                                            <motion.span
                                                key={countdown}
                                                initial={{ scale: 0.5, opacity: 0 }}
                                                animate={{ scale: 0.8, opacity: 1 }}
                                                className="text-4xl font-bold text-green-400"
                                            >
                                                {countdown}s
                                            </motion.span>
                                        </div>

                                        {/* progress bar */}
                                        <div className="w-full h-2 bg-gray-900 border border-green-500/20 rounded overflow-hidden">
                                            <motion.div
                                                initial={{ width: '100%' }}
                                                animate={{ width: '0%' }}
                                                transition={{ duration: 10, ease: 'linear' }}
                                                className="h-full bg-green-500"
                                            />
                                        </div>

                                        <div className="flex items-center gap-2 text-gray-600 text-xs">
                                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                                            <span>Processing...</span>
                                        </div>
                                    </motion.div>

                                    <motion.div
                                        animate={{ opacity: [1, 0, 1] }}
                                        transition={{ repeat: Infinity, duration: 1 }}
                                        className="inline-block"
                                    >
                                        <span className="text-green-400">█</span>
                                    </motion.div>
                                </>
                            )}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
