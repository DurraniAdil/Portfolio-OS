import React, { useState, useRef, useEffect } from 'react';
import { AppId } from '../../types';

interface TerminalAppProps {
  onOpenApp?: (id: AppId) => void;
}

const FILES = {
  'bio.txt': "Durrani: A multi-disciplinary creator. Architect by day, poet by night. I build systems that bridge the gap between human emotion and machine logic.",
  'stack.json': JSON.stringify({
    frontend: ["React", "Next.js", "TypeScript", "Tailwind"],
    backend: ["Node.js", "PostgreSQL", "Go", "Redis"],
    tools: ["Docker", "AWS", "Terraform", "Git"]
  }, null, 2),
  'manifesto.md': "# The Digital Craft\n\nCode is not just logic; it is a canvas. We are the painters of the modern age, using bits and pixels to create experiences that define reality for millions.",
  'contact.csv': "Platform,Handle\nLinkedIn,durrani-s\nGitHub,durrani-dev\nTwitter,@durrani_os"
};

const APP_LIST: AppId[] = ['studio', 'bard', 'peopleops', 'projects', 'resume', 'contact', 'terminal', 'weather', 'tictactoe'];

export const TerminalApp: React.FC<TerminalAppProps> = ({ onOpenApp }) => {
  const [history, setHistory] = useState<string[]>([
    "DurraniOS [Version 1.0.42]",
    "(c) Durrani Corporation. All rights reserved.",
    "",
    "Type 'help' to see available commands.",
    ""
  ]);
  const [input, setInput] = useState("");
  const [isHacking, setIsHacking] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  const handleTerminalClick = () => {
    inputRef.current?.focus();
  };

  const runHackSimulation = async () => {
    setIsHacking(true);
    const sequences = [
      "INITIALIZING BRUTE FORCE ATTACK...",
      "TARGET: LOCALHOST:8080",
      "BYPASSING FIREWALL [##########] 100%",
      "CRACKING ENCRYPTION SEEDS...",
      "PACKET INJECTION STARTED...",
      "0x4F2A -> BUFFER OVERFLOW EXPLOITED",
      "UPGRADING PRIVILEGES...",
      "ROOT ACCESS GRANTED.",
      "",
      "------------------------------------------",
      "   SYSTEM COMPROMISED: WELCOME DURRANI    ",
      "------------------------------------------",
      ""
    ];

    for (const line of sequences) {
      setHistory(prev => [...prev, line]);
      await new Promise(resolve => setTimeout(resolve, 150));
    }
    setIsHacking(false);
  };

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (isHacking) return;

    const trimmedInput = input.trim();
    if (!trimmedInput) {
      setHistory(prev => [...prev, "durrani@os:~$"]);
      setInput("");
      return;
    }

    const args = trimmedInput.split(" ");
    const cmd = args[0].toLowerCase();
    const newHistory = [...history, `durrani@os:~$ ${trimmedInput}`];

    switch (cmd) {
      case 'help':
        newHistory.push("Available commands:");
        newHistory.push("  help      - Display this message");
        newHistory.push("  ls        - List directory contents (files and apps)");
        newHistory.push("  cd [app]  - Change directory / Launch an application");
        newHistory.push("  cat [file]- Display the content of a file");
        newHistory.push("  whoami    - Display current user information");
        newHistory.push("  date      - Display the current system date and time");
        newHistory.push("  neofetch  - Display system information and branding");
        newHistory.push("  matrix    - Enter the digital rain");
        newHistory.push("  hack      - Execute kernel override sequence");
        newHistory.push("  clear     - Clear the terminal screen");
        newHistory.push("  sudo      - Attempt superuser execution");
        break;

      case 'ls':
        newHistory.push("Applications (launch with 'cd [app]'):");
        newHistory.push("  " + APP_LIST.join("    "));
        newHistory.push("");
        newHistory.push("Files in current directory:");
        newHistory.push("  " + Object.keys(FILES).join("    "));
        break;

      case 'cd':
        const target = args[1]?.toLowerCase() as AppId;
        if (!target) {
          newHistory.push("Usage: cd [application_name]");
        } else if (APP_LIST.includes(target)) {
          newHistory.push(`Opening ${target}...`);
          if (onOpenApp) {
            onOpenApp(target);
          }
        } else {
          newHistory.push(`cd: no such file or directory: ${args[1]}`);
        }
        break;

      case 'cat':
        if (args[1] && FILES[args[1] as keyof typeof FILES]) {
          newHistory.push(FILES[args[1] as keyof typeof FILES]);
        } else if (!args[1]) {
          newHistory.push("Usage: cat [filename]");
        } else {
          newHistory.push(`cat: ${args[1]}: No such file or directory`);
        }
        break;

      case 'whoami':
        newHistory.push("User: durrani");
        newHistory.push("Privileges: Lead Architect");
        newHistory.push("Status: Active Session");
        break;

      case 'date':
        newHistory.push(new Date().toString());
        break;

      case 'neofetch':
        newHistory.push("         .,-:;//;-,.");
        newHistory.push("     .okkkkkkkkkkkkkkkk.");
        newHistory.push("   .kkkkkkkkkkkkkkkkkkkkk.");
        newHistory.push("  .kkkkkkkkkkkkkkkkkkkkkkk.");
        newHistory.push("  OS: DurraniOS v1.0.4 x86_64");
        newHistory.push("  Kernel: 5.15.0-custom-durrani");
        newHistory.push("  Uptime: 1 hour, 24 mins");
        newHistory.push("  Shell: dsh 1.2");
        newHistory.push("  WM: Durrani-Glass");
        newHistory.push("  CPU: Intel i9-14900K (24) @ 6.0GHz");
        newHistory.push("  GPU: NVIDIA RTX 4090 Ti");
        newHistory.push("  Memory: 32GB / 64GB");
        break;

      case 'matrix':
        newHistory.push("Entering the grid...");
        window.dispatchEvent(new CustomEvent('startMatrix'));
        break;

      case 'hack':
        setHistory([...newHistory, ""]);
        setInput("");
        runHackSimulation();
        return;

      case 'sudo':
        newHistory.push("Password: [********]");
        newHistory.push("ERROR: User 'durrani' is not in the sudoers file. This incident will be reported.");
        break;

      case 'clear':
        setHistory([]);
        setInput("");
        return;

      default:
        newHistory.push(`dsh: command not found: ${cmd}`);
    }

    setHistory([...newHistory, ""]);
    setInput("");
  };

  return (
    <div
      className="mono bg-black text-green-500 p-4 pb-6 h-full flex flex-col overflow-hidden text-sm cursor-text font-mono selection:bg-green-500/30 selection:text-white"
      onClick={handleTerminalClick}
    >
      <div
        ref={scrollRef}
        className="flex-1 overflow-auto whitespace-pre-wrap mb-2 custom-scrollbar min-h-0"
      >
        {history.map((line, i) => (
          <div key={i} className={`break-words ${line && line.startsWith('durrani@os:~$') ? 'text-blue-400' : ''}`}>
            {line}
          </div>
        ))}
      </div>
      <form onSubmit={handleCommand} className="flex gap-2 shrink-0 items-center">
        <span className="text-yellow-400 font-bold shrink-0 whitespace-nowrap">durrani@os:~$</span>
        <input
          ref={inputRef}
          autoFocus
          disabled={isHacking}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="bg-transparent border-none outline-none flex-1 text-green-500 font-mono disabled:opacity-50 min-w-[50px]"
          spellCheck={false}
          autoComplete="off"
        />
      </form>
    </div>
  );
};