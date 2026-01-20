import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const CalculatorApp: React.FC = () => {
    const [display, setDisplay] = useState('0');
    const [equation, setEquation] = useState('');
    const [hasResult, setHasResult] = useState(false);

    const handleNumber = (num: string) => {
        if (hasResult) {
            setDisplay(num);
            setEquation('');
            setHasResult(false);
        } else if (display === '0' && num !== '.') {
            setDisplay(num);
        } else if (num === '.' && display.includes('.')) {
            return;
        } else {
            setDisplay(display + num);
        }
    };

    const handleOperator = (op: string) => {
        setEquation(display + ' ' + op + ' ');
        setDisplay('0');
        setHasResult(false);
    };

    const handleEquals = () => {
        try {
            const fullEquation = equation + display;
            const evalEquation = fullEquation.replace(/×/g, '*').replace(/÷/g, '/');
            const result = eval(evalEquation);
            const roundedResult = Math.round(result * 1000000000) / 1000000000;
            setDisplay(String(roundedResult));
            setEquation(fullEquation + ' =');
            setHasResult(true);
        } catch {
            setDisplay('Error');
            setEquation('');
            setHasResult(true);
        }
    };

    const handleClear = () => {
        setDisplay('0');
        setEquation('');
        setHasResult(false);
    };

    const handleBackspace = () => {
        if (display.length > 1) {
            setDisplay(display.slice(0, -1));
        } else {
            setDisplay('0');
        }
    };

    const handlePercentage = () => {
        const value = parseFloat(display) / 100;
        setDisplay(String(value));
    };

    const handlePlusMinus = () => {
        if (display !== '0') {
            setDisplay(display.startsWith('-') ? display.slice(1) : '-' + display);
        }
    };

    const buttons = [
        { label: 'CLR', action: handleClear, style: 'pixel-btn-danger', wide: false },
        { label: '±', action: handlePlusMinus, style: 'pixel-btn-secondary', wide: false },
        { label: '%', action: handlePercentage, style: 'pixel-btn-secondary', wide: false },
        { label: '÷', action: () => handleOperator('÷'), style: 'pixel-btn-operator', wide: false },

        { label: '7', action: () => handleNumber('7'), style: 'pixel-btn-primary', wide: false },
        { label: '8', action: () => handleNumber('8'), style: 'pixel-btn-primary', wide: false },
        { label: '9', action: () => handleNumber('9'), style: 'pixel-btn-primary', wide: false },
        { label: '×', action: () => handleOperator('×'), style: 'pixel-btn-operator', wide: false },

        { label: '4', action: () => handleNumber('4'), style: 'pixel-btn-primary', wide: false },
        { label: '5', action: () => handleNumber('5'), style: 'pixel-btn-primary', wide: false },
        { label: '6', action: () => handleNumber('6'), style: 'pixel-btn-primary', wide: false },
        { label: '−', action: () => handleOperator('-'), style: 'pixel-btn-operator', wide: false },

        { label: '1', action: () => handleNumber('1'), style: 'pixel-btn-primary', wide: false },
        { label: '2', action: () => handleNumber('2'), style: 'pixel-btn-primary', wide: false },
        { label: '3', action: () => handleNumber('3'), style: 'pixel-btn-primary', wide: false },
        { label: '+', action: () => handleOperator('+'), style: 'pixel-btn-operator', wide: false },

        { label: '⌫', action: handleBackspace, style: 'pixel-btn-secondary', wide: false },
        { label: '0', action: () => handleNumber('0'), style: 'pixel-btn-primary', wide: false },
        { label: '.', action: () => handleNumber('.'), style: 'pixel-btn-primary', wide: false },
        { label: '=', action: handleEquals, style: 'pixel-btn-equals', wide: false },
    ];

    return (
        <div className="h-full flex items-center justify-center p-4 bg-gradient-to-br from-purple-900 via-indigo-900 to-slate-900">
            {/* Pixelated noise overlay */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='4' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' /%3E%3C/svg%3E")`,
                    backgroundRepeat: 'repeat',
                    backgroundSize: '128px 128px'
                }}
            />

            <div className="relative">
                {/* Calculator Body with 8-bit border */}
                <div className="relative bg-slate-800 p-1"
                    style={{
                        boxShadow: `
                             4px 0 0 0 #1e293b,
                             -4px 0 0 0 #1e293b,
                             0 4px 0 0 #1e293b,
                             0 -4px 0 0 #1e293b,
                             4px 4px 0 0 #0f172a,
                             -4px -4px 0 0 #475569,
                             4px -4px 0 0 #334155,
                             -4px 4px 0 0 #334155,
                             8px 8px 0 0 rgba(0,0,0,0.4)
                         `
                    }}>

                    <div className="bg-gradient-to-br from-slate-700 to-slate-800 p-6 w-80">

                        <div className="mb-4 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 bg-red-500 animate-pulse"
                                    style={{
                                        boxShadow: '2px 2px 0 0 #991b1b, 0 0 8px rgba(239, 68, 68, 0.6)'
                                    }}
                                />
                                <span className="text-cyan-400 text-xs font-bold tracking-wider"
                                    style={{
                                        textShadow: '2px 2px 0 #0e7490',
                                        fontFamily: 'monospace',
                                        imageRendering: 'pixelated'
                                    }}>
                                    CALC-Y 8000
                                </span>
                            </div>
                            <div className="text-[8px] text-slate-500 font-mono">v1.0</div>
                        </div>

                        <div className="relative mb-6 bg-green-950 p-4 overflow-hidden"
                            style={{
                                boxShadow: `
                                     inset 3px 3px 0 0 rgba(0,0,0,0.6),
                                     inset -1px -1px 0 0 rgba(255,255,255,0.1),
                                     0 0 20px rgba(34, 197, 94, 0.3)
                                 `
                            }}>

                            <div className="absolute inset-0 pointer-events-none z-10"
                                style={{
                                    background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.3) 2px, rgba(0,0,0,0.3) 4px)',
                                    animation: 'flicker 0.15s infinite'
                                }}
                            />

                            <div className="absolute inset-0 bg-gradient-to-br from-green-400/10 via-transparent to-transparent pointer-events-none z-10" />

                            <div className="relative z-20">
                                <div className="text-right text-green-500/60 text-xs h-5 font-mono truncate mb-1"
                                    style={{
                                        textShadow: '0 0 4px rgba(34, 197, 94, 0.8)',
                                        fontFamily: 'monospace',
                                        letterSpacing: '0.05em'
                                    }}>
                                    {equation || '\u00A0'}
                                </div>

                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={display}
                                        initial={{ opacity: 0, y: -5 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 5 }}
                                        transition={{ duration: 0.1 }}
                                        className="text-right text-green-400 font-bold font-mono tracking-tight"
                                        style={{
                                            fontSize: display.length > 10 ? '1.5rem' : display.length > 7 ? '2rem' : '2.5rem',
                                            textShadow: '0 0 8px rgba(34, 197, 94, 1), 0 0 2px rgba(34, 197, 94, 0.8)',
                                            fontFamily: 'monospace',
                                            letterSpacing: '0.05em'
                                        }}
                                    >
                                        {display}
                                    </motion.div>
                                </AnimatePresence>
                            </div>
                        </div>

                        <div className="grid grid-cols-4 gap-2">
                            {buttons.map((btn, i) => (
                                <motion.button
                                    key={i}
                                    whileTap={{ scale: 0.92 }}
                                    onClick={btn.action}
                                    className={`
                                        relative h-14 flex items-center justify-center
                                        text-lg font-bold transition-all duration-75
                                        ${btn.style}
                                    `}
                                    style={{
                                        fontFamily: 'monospace',
                                        textShadow: '1px 1px 0 rgba(0,0,0,0.5)',
                                        imageRendering: 'pixelated'
                                    }}
                                >
                                    {btn.label}
                                </motion.button>
                            ))}
                        </div>

                        <div className="mt-4 flex items-center justify-center gap-2">
                            {[...Array(8)].map((_, i) => (
                                <div
                                    key={i}
                                    className="w-1 h-1 bg-slate-600"
                                    style={{
                                        boxShadow: 'inset 1px 1px 0 0 rgba(0,0,0,0.5)'
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes flicker {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.97; }
                }

                .pixel-btn-primary {
                    background: linear-gradient(180deg, #64748b 0%, #475569 100%);
                    color: #f1f5f9;
                    box-shadow: 
                        3px 0 0 0 #334155,
                        0 3px 0 0 #1e293b,
                        3px 3px 0 0 #1e293b,
                        inset -2px -2px 0 0 rgba(0,0,0,0.5),
                        inset 2px 2px 0 0 rgba(255,255,255,0.2);
                }
                
                .pixel-btn-primary:active {
                    background: linear-gradient(180deg, #475569 0%, #334155 100%);
                    box-shadow: 
                        2px 0 0 0 #1e293b,
                        0 2px 0 0 #0f172a,
                        2px 2px 0 0 #0f172a,
                        inset 2px 2px 0 0 rgba(0,0,0,0.5);
                    transform: translate(1px, 1px);
                }

                .pixel-btn-operator {
                    background: linear-gradient(180deg, #f97316 0%, #ea580c 100%);
                    color: #fff;
                    box-shadow: 
                        3px 0 0 0 #c2410c,
                        0 3px 0 0 #9a3412,
                        3px 3px 0 0 #9a3412,
                        inset -2px -2px 0 0 rgba(0,0,0,0.5),
                        inset 2px 2px 0 0 rgba(255,255,255,0.3);
                }
                
                .pixel-btn-operator:active {
                    background: linear-gradient(180deg, #ea580c 0%, #c2410c 100%);
                    box-shadow: 
                        2px 0 0 0 #9a3412,
                        0 2px 0 0 #7c2d12,
                        2px 2px 0 0 #7c2d12,
                        inset 2px 2px 0 0 rgba(0,0,0,0.5);
                    transform: translate(1px, 1px);
                }

                .pixel-btn-equals {
                    background: linear-gradient(180deg, #22c55e 0%, #16a34a 100%);
                    color: #fff;
                    box-shadow: 
                        3px 0 0 0 #15803d,
                        0 3px 0 0 #166534,
                        3px 3px 0 0 #166534,
                        inset -2px -2px 0 0 rgba(0,0,0,0.5),
                        inset 2px 2px 0 0 rgba(255,255,255,0.3),
                        0 0 12px rgba(34, 197, 94, 0.4);
                }
                
                .pixel-btn-equals:active {
                    background: linear-gradient(180deg, #16a34a 0%, #15803d 100%);
                    box-shadow: 
                        2px 0 0 0 #166534,
                        0 2px 0 0 #14532d,
                        2px 2px 0 0 #14532d,
                        inset 2px 2px 0 0 rgba(0,0,0,0.5);
                    transform: translate(1px, 1px);
                }

                .pixel-btn-danger {
                    background: linear-gradient(180deg, #ef4444 0%, #dc2626 100%);
                    color: #fff;
                    box-shadow: 
                        3px 0 0 0 #b91c1c,
                        0 3px 0 0 #991b1b,
                        3px 3px 0 0 #991b1b,
                        inset -2px -2px 0 0 rgba(0,0,0,0.5),
                        inset 2px 2px 0 0 rgba(255,255,255,0.3);
                }
                
                .pixel-btn-danger:active {
                    background: linear-gradient(180deg, #dc2626 0%, #b91c1c 100%);
                    box-shadow: 
                        2px 0 0 0 #991b1b,
                        0 2px 0 0 #7f1d1d,
                        2px 2px 0 0 #7f1d1d,
                        inset 2px 2px 0 0 rgba(0,0,0,0.5);
                    transform: translate(1px, 1px);
                }

                .pixel-btn-secondary {
                    background: linear-gradient(180deg, #6366f1 0%, #4f46e5 100%);
                    color: #fff;
                    box-shadow: 
                        3px 0 0 0 #4338ca,
                        0 3px 0 0 #3730a3,
                        3px 3px 0 0 #3730a3,
                        inset -2px -2px 0 0 rgba(0,0,0,0.5),
                        inset 2px 2px 0 0 rgba(255,255,255,0.3);
                }
                
                .pixel-btn-secondary:active {
                    background: linear-gradient(180deg, #4f46e5 0%, #4338ca 100%);
                    box-shadow: 
                        2px 0 0 0 #3730a3,
                        0 2px 0 0 #312e81,
                        2px 2px 0 0 #312e81,
                        inset 2px 2px 0 0 rgba(0,0,0,0.5);
                    transform: translate(1px, 1px);
                }
            `}</style>
        </div>
    );
};
