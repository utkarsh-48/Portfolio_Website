import { useState, useEffect, useRef, useCallback } from "react";
import { TerminalOutput } from "./TerminalOutput";
import { BootSequence } from "./BootSequence";
import { useTerminalSounds } from "../hooks/useTerminalSounds";
import { askAI } from "@/lib/llm";
interface HistoryEntry {
  command: string;
  output: React.ReactNode;
  timestamp: Date;
}
const ASCII_ART = `
██╗   ██╗████████╗██╗  ██╗ █████╗ ██████╗ ███████╗██╗  ██╗
██║   ██║╚══██╔══╝██║ ██╔╝██╔══██╗██╔══██╗██╔════╝██║  ██║
██║   ██║   ██║   █████╔╝ ███████║██████╔╝███████╗███████║
██║   ██║   ██║   ██╔═██╗ ██╔══██║██╔══██╗╚════██║██╔══██║
╚██████╔╝   ██║   ██║  ██╗██║  ██║██║  ██║███████║██║  ██║
 ╚═════╝    ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝
`;

const BANNER_INFO = `
Welcome to Utkarsh's Portfolio Terminal

BCA Student • India • Learning ML & Robotics
Aiming for ML Ops + Robotics

Type 'help' to get started
Portfolio v2.0.1 - Built with React & TypeScript
`;

const COMMANDS = {
  banner: () => (
    <div className="terminal-output">
      <pre className="terminal-success text-xs md:text-sm mb-4 overflow-x-auto">
        {ASCII_ART}
      </pre>
      <div className="terminal-info whitespace-pre-line">{BANNER_INFO}</div>
    </div>
  ),
  about: () => (
    <div className="terminal-output">
      <p className="mb-2">Hey there.</p>
      <p className="mb-2">
        I'm <span className="terminal-info">Utkarsh</span>, a BCA student from
        India.
      </p>
      <p className="mb-2">Right now, I'm focused on:</p>
      <ul className="list-disc list-inside ml-4 mb-2">
        <li>
          <span className="terminal-success">Machine Learning</span> – building
          intelligent systems
        </li>
        <li>
          <span className="terminal-info">Web Development</span> – creating
          fast, accessible UIs
        </li>
      </ul>
      <p className="mb-2">
        Next, I plan to dive into{" "}
        <span className="terminal-warning">Robotics</span> and ML Ops to connect
        software, data, and automation.
      </p>
      <p className="mb-2">
        Outside of tech, I enjoy reading and writing novels, riding my bike, and
        listening to music pretty much all the time.
      </p>
      <p>
        I also like messing with new tools, contributing to open source, and
        thinking about how to build smarter systems.
      </p>
    </div>
  ),
  projects: () => (
    <div className="terminal-output">
      <p className="mb-3 terminal-success">
        Here are some projects I'm working on and planning:
      </p>

      {/* Terminal Portfolio */}
      <div className="mb-4">
        <h3 className="terminal-warning font-bold">
          • Protfolio Website (Current)
        </h3>
        <p className="ml-4">
          This site itself — built to feel like a real terminal
        </p>
        <p className="ml-4 text-sm terminal-gray">
          Tech: React, TypeScript, Tailwind CSS
        </p>
        <p className="ml-4">
          <span className="terminal-blue">→</span>{" "}
          <a
            href="https://github.com/utkarsh-48/Portfolio_Website"
            className="underline text-blue-400 hover:text-blue-300"
            target="_blank"
            rel="noopener noreferrer"
          >
            github.com/utkarsh-48/terminal-portfolio
          </a>
        </p>
      </div>

      {/* E-commerce Cart */}
      <div className="mb-4">
        <h3 className="terminal-warning font-bold">
          • E-commerce Cart (Completed)
        </h3>
        <p className="ml-4">
          A simple cart system for managing orders and items
        </p>
        <p className="ml-4 text-sm terminal-gray">Tech: Python (CLI-based)</p>
        <p className="ml-4">
          <span className="terminal-blue">→</span>{" "}
          <a
            href="https://github.com/utkarsh-48/ecommerce-cart-python"
            className="underline text-blue-400 hover:text-blue-300"
            target="_blank"
            rel="noopener noreferrer"
          >
            github.com/utkarsh-48/ecommerce-cart-python
          </a>
        </p>
      </div>

      {/* Inventory Manager */}
      <div className="mb-4">
        <h3 className="terminal-warning font-bold">
          • Inventory Manager (Completed)
        </h3>
        <p className="ml-4">
          CLI tool to manage stock, orders, and product listings
        </p>
        <p className="ml-4 text-sm terminal-gray">Tech: Python (CLI-based)</p>
        <p className="ml-4">
          <span className="terminal-blue">→</span>{" "}
          <a
            href="https://github.com/utkarsh-48/Inventory_management"
            className="underline text-blue-400 hover:text-blue-300"
            target="_blank"
            rel="noopener noreferrer"
          >
            github.com/utkarsh-48/Inventory_management
          </a>
        </p>
      </div>

      {/* ML Stock Predictor */}
      <div className="mb-4">
        <h3 className="terminal-warning font-bold">
          • ML Stock Predictor (In Progress)
        </h3>
        <p className="ml-4">Real-time stock prediction using LSTM networks</p>
        <p className="ml-4 text-sm terminal-gray">
          Tech: Python, TensorFlow, Pandas, Streamlit
        </p>
        <p className="ml-4 terminal-info">→ Coming Soon</p>
      </div>

      {/* Smart Home Assistant */}
      <div className="mb-4">
        <h3 className="terminal-warning font-bold">
          • Smart Home Assistant (Planned)
        </h3>
        <p className="ml-4">
          Home automation with voice control and ML-based predictions
        </p>
        <p className="ml-4 text-sm terminal-gray">
          Tech: Python, TensorFlow, Raspberry Pi, Arduino
        </p>
        <p className="ml-4 terminal-info">→ Planned for Q2 2026</p>
      </div>

      {/* Game Bot */}
      <div className="mb-4">
        <h3 className="terminal-warning font-bold">
          • Autonomous Game Bot (Planned)
        </h3>
        <p className="ml-4">AI bot that learns to play simple games using RL</p>
        <p className="ml-4 text-sm terminal-gray">
          Tech: Python, OpenAI Gym, PyTorch, Computer Vision
        </p>
        <p className="ml-4 terminal-info">→ Planned for Q3 2026</p>
      </div>

      {/* Robotics Project */}
      <div className="mb-2">
        <h3 className="terminal-warning font-bold">
          • Robotics Project (Planned)
        </h3>
        <p className="ml-4">
          Autonomous robot with vision and basic path planning
        </p>
        <p className="ml-4 text-sm terminal-gray">
          Tech: ROS, Python, OpenCV, Arduino, 3D Printing
        </p>
        <p className="ml-4 terminal-info">→ Planned for Q4 2026</p>
      </div>

      <p className="mt-4 terminal-gray text-sm">
        Tip: I'm actively building and updating these. More to come soon.
      </p>
    </div>
  ),

  skills: () => (
    <div className="terminal-output">
      <div className="mb-4">
        <h3 className="terminal-success font-bold mb-2">
          Programming Languages:
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 ml-4">
          <span className="terminal-warning">• Python</span>
          <span className="terminal-warning">• JavaScript</span>
          <span className="terminal-warning">• TypeScript</span>
          <span className="terminal-warning">• C</span>
          <span className="terminal-warning">• Java</span>
          <span className="terminal-warning">• SQL</span>
        </div>
      </div>

      <div className="mb-4">
        <h3 className="terminal-success font-bold mb-2">ML/AI Technologies:</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 ml-4">
          <span className="terminal-blue">• TensorFlow</span>
          <span className="terminal-blue">• PyTorch</span>
          <span className="terminal-blue">• Scikit-learn</span>
          <span className="terminal-blue">• OpenCV</span>
          <span className="terminal-blue">• Pandas</span>
          <span className="terminal-blue">• NumPy</span>
        </div>
      </div>

      <div className="mb-4">
        <h3 className="terminal-success font-bold mb-2">Web Technologies:</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 ml-4">
          <span className="terminal-cyan">• React</span>
          <span className="terminal-cyan">• Node.js</span>
          <span className="terminal-cyan">• Express</span>
          <span className="terminal-cyan">• MongoDB</span>
          <span className="terminal-cyan">• PostgreSQL</span>
          <span className="terminal-cyan">• Docker</span>
        </div>
      </div>

      <div className="mb-2">
        <h3 className="terminal-success font-bold mb-2">
          Hardware & Robotics (next focus):
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 ml-4">
          <span className="terminal-purple">• Arduino</span>
          <span className="terminal-purple">• Raspberry Pi</span>
          <span className="terminal-purple">• ROS</span>
          <span className="terminal-purple">• Sensors</span>
          <span className="terminal-purple">• IoT</span>
          <span className="terminal-purple">• 3D Printing</span>
        </div>
      </div>
    </div>
  ),
  contact: () => (
    <div className="terminal-output">
      <p className="mb-3 terminal-success">
        Let's connect! Here's where you can find me:
      </p>

      <div className="space-y-2 ml-4">
        <div>
          <span className="terminal-warning">GitHub:</span>
          <a
            href="https://github.com/utkarsh-48"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2 terminal-blue hover:underline"
          >
            github.com/utkarsh-48
          </a>
        </div>

        <div>
          <span className="terminal-warning">LinkedIn:</span>
          <a
            href="https://www.linkedin.com/in/utkarsh-krishna-1a0210328/"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2 terminal-blue hover:underline"
          >
            linkedin.com/in/utkarsh-krishna
          </a>
        </div>

        <div>
          <span className="terminal-warning">Email:</span>
          <a
            href="mailto:utkarshthakur2602@gmail.com"
            className="ml-2 terminal-blue hover:underline"
          >
            utkarshthakur2602@gmail.com
          </a>
        </div>

        <div>
          <span className="terminal-warning">Location:</span>
          <span className="ml-2 terminal-info">India</span>
        </div>
      </div>

      <p className="mt-4 terminal-gray">
        Feel free to reach out for collaborations, discussions about
        ML/Robotics, or just to say hi!
      </p>
    </div>
  ),
  help: () => (
    <div className="terminal-output">
      <p className="mb-3 terminal-success">Available commands:</p>
      <div className="space-y-1 ml-4">
        <div>
          <span className="terminal-warning">banner</span> - Show the ASCII art
          banner and welcome message
        </div>
        <div>
          <span className="terminal-warning">about</span> - Learn more about me
          and my goals
        </div>
        <div>
          <span className="terminal-warning">projects</span> - View my portfolio
          projects
        </div>
        <div>
          <span className="terminal-warning">skills</span> - See my technical
          skills and technologies
        </div>
        <div>
          <span className="terminal-warning">contact</span> - Get my contact
          information
        </div>
        <div>
          <span className="terminal-warning">clear</span> - Clear the terminal
          screen
        </div>
        <div>
          <span className="terminal-warning">help</span> - Show this help
          message
        </div>
        <div>
          <span className="terminal-warning">ls</span> - List available commands
        </div>
        <div>
          <span className="terminal-warning">pwd</span> - Show current directory
        </div>
        <div>
          <span className="terminal-warning">date</span> - Show current
          date/time
        </div>
        <div>
          <span className="terminal-warning">whoami</span> - Show current user
        </div>
        <div>
          <span className="terminal-warning">resume</span> - Download my resume
        </div>
        <div>
          <span className="terminal-warning">theme</span> - Switch between
          light/dark themes
        </div>
        <div>
          <span className="terminal-warning">matrix</span> - Matrix effect
          (easter egg)
        </div>
        <div>
          <span className="terminal-warning">fortune</span> - Get a random
          programming quote
        </div>
        <div>
          <span className="terminal-warning">neofetch</span> - Show system
          information
        </div>
        <div>
          <span className="terminal-warning">demo</span> - Run interactive demo
        </div>
      </div>
      <p className="mt-3 terminal-gray">
        Pro tips: Use ↑/↓ arrow keys for command history, Tab for autocomplete
      </p>
    </div>
  ),
  clear: () => null,

  // New interactive commands
  ls: () => (
    <div className="terminal-output">
      <p className="terminal-success">Available commands:</p>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 ml-4 mt-2">
        {Object.keys(COMMANDS).map((cmd) => (
          <span key={cmd} className="terminal-warning">
            • {cmd}
          </span>
        ))}
      </div>
    </div>
  ),

  pwd: () => (
    <div className="terminal-output">
      <p className="terminal-info">/home/utkarsh/portfolio</p>
    </div>
  ),

  date: () => (
    <div className="terminal-output">
      <p className="terminal-info">{new Date().toLocaleString()}</p>
    </div>
  ),

  whoami: () => (
    <div className="terminal-output">
      <p className="terminal-success">utkarsh</p>
    </div>
  ),

  resume: () => (
    <div className="terminal-output">
      <p className="mb-2">
        <span className="terminal-success">Download my resume:</span>
      </p>
      <p
        className="terminal-blue cursor-pointer hover:underline"
        onClick={() => window.open("/resumebetterquality.pdf", "_blank")}
      >
        → Click here to download resume.pdf
      </p>
    </div>
  ),

  theme: () => {
    const setTheme = (theme: "light" | "dark") => {
      if (theme === "dark") {
        document.documentElement.classList.add("dark");
        localStorage.setItem("theme", "dark");
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("theme", "light");
      }
    };

    return (
      <div className="terminal-output">
        <p className="mb-2">Available themes:</p>
        <div className="space-y-1">
          <span
            className="terminal-warning cursor-pointer hover:underline"
            onClick={() => setTheme("light")}
          >
            • light
          </span>
          <br />
          <span
            className="terminal-warning cursor-pointer hover:underline"
            onClick={() => setTheme("dark")}
          >
            • dark
          </span>
        </div>
        <p className="mt-2 terminal-gray text-sm">
          Current theme:{" "}
          {document.documentElement.classList.contains("dark")
            ? "dark"
            : "light"}
        </p>
      </div>
    );
  },

  matrix: () => (
    <div className="terminal-output">
      <div className="matrix-effect text-green-500 font-mono text-xs">
        {Array.from({ length: 20 }, (_, i) => (
          <div
            key={i}
            className="matrix-line"
            style={{ "--i": i } as React.CSSProperties & { "--i": number }}
          >
            {Array.from({ length: 50 }, () =>
              String.fromCharCode(Math.random() * 94 + 33)
            ).join("")}
          </div>
        ))}
      </div>
    </div>
  ),

  fortune: () => (
    <div className="terminal-output">
      <p className="terminal-success">🔮 Your fortune:</p>
      <p className="terminal-info italic">
        {
          [
            "A bug in the hand is better than one as yet undetected.",
            "The best code is no code at all.",
            "Premature optimization is the root of all evil.",
            "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
            "The only way to learn a new programming language is by writing programs in it.",
            "The most damaging phrase in the language is 'We've always done it this way!'",
            "It's not a bug – it's an undocumented feature.",
            "The best error message is the one that never shows up.",
            "Code is like humor. When you have to explain it, it's bad.",
            "First, solve the problem. Then, write the code.",
          ][Math.floor(Math.random() * 10)]
        }
      </p>
    </div>
  ),

  neofetch: () => (
    <div className="terminal-output">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <p className="terminal-success">OS:</p>
          <p className="terminal-info">Ubuntu 22.04 LTS</p>
          <p className="terminal-success">Kernel:</p>
          <p className="terminal-info">Linux 5.15.0</p>
          <p className="terminal-success">Shell:</p>
          <p className="terminal-info">zsh 5.8</p>
          <p className="terminal-success">Terminal:</p>
          <p className="terminal-info">React Terminal v2.0.1</p>
        </div>
        <div>
          <p className="terminal-success">CPU:</p>
          <p className="terminal-info">Intel i7-12700K</p>
          <p className="terminal-success">Memory:</p>
          <p className="terminal-info">32GB DDR4</p>
          <p className="terminal-success">GPU:</p>
          <p className="terminal-info">RTX 3080</p>
          <p className="terminal-success">Editor:</p>
          <p className="terminal-info">VS Code</p>
        </div>
      </div>
    </div>
  ),

  demo: () => {
    // This will be handled specially in the component
    return (
      <div className="terminal-output">
        <p className="terminal-info">Running demo...</p>
      </div>
    );
  },
};
export const Terminal = () => {
  const [isBooted, setIsBooted] = useState(false);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [currentCommand, setCurrentCommand] = useState("");
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [hasBeenCleared, setHasBeenCleared] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const { playKeySound } = useTerminalSounds();
  const commandNames = Object.keys(COMMANDS);

  // Initialize theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light") {
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
    }
  }, []);

  // Show banner on first load
  useEffect(() => {
    if (isBooted && history.length === 0 && !hasBeenCleared) {
      const bannerEntry: HistoryEntry = {
        command: "",
        output: COMMANDS.banner(),
        timestamp: new Date(),
      };
      setHistory([bannerEntry]);
    }
  }, [history.length, isBooted, hasBeenCleared]);

  // Global keyboard shortcuts
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === "l") {
        e.preventDefault();
        setHistory([]);
        setHasBeenCleared(true);
      }
      if (e.ctrlKey && e.key === "k") {
        e.preventDefault();
        setCurrentCommand("");
      }
    };

    document.addEventListener("keydown", handleGlobalKeyDown);
    return () => document.removeEventListener("keydown", handleGlobalKeyDown);
  }, []);
  const executeCommand = useCallback(async (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();

    // Add to command history
    if (trimmedCmd && trimmedCmd !== "clear") {
      setCommandHistory((prev) => [...prev, trimmedCmd]);
    }

    if (trimmedCmd === "clear") {
      setHistory([]);
      setHasBeenCleared(true);
      return;
    }

    // Handle demo command specially
    if (trimmedCmd === "demo") {
      setIsLoading(true);
      await runDemo();
      setIsLoading(false);
      return;
    }

    setIsLoading(true);

    // Simulate processing time for certain commands
    if (["projects", "skills", "neofetch"].includes(trimmedCmd)) {
      await new Promise((resolve) => setTimeout(resolve, 500));
    }

    let output: React.ReactNode;
    if (trimmedCmd === "") {
      output = null;
    } else if (COMMANDS[trimmedCmd as keyof typeof COMMANDS]) {
      output = COMMANDS[trimmedCmd as keyof typeof COMMANDS]();
    } else {
      // AI fallback for unknown commands
      output = <span className="terminal-info">Thinking...</span>;
      const newEntry: HistoryEntry = {
        command: cmd,
        output,
        timestamp: new Date(),
      };
      setHistory((prev) => [...prev, newEntry]);
      try {
        const aiResponse = await askAI(cmd);
        const aiOutput: React.ReactNode = (
          <span className="terminal-ai-response">{aiResponse}</span>
        );
        setHistory((prev) => {
          // Replace the last entry ("Thinking...") with the AI response
          const updated = [...prev];
          updated[updated.length - 1] = {
            ...newEntry,
            output: aiOutput,
          };
          return updated;
        });
      } catch (err) {
        setHistory((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = {
            ...newEntry,
            output: (
              <span className="terminal-error">
                AI error: Could not get a response.
              </span>
            ),
          };
          return updated;
        });
      }
      setIsLoading(false);
      return;
    }
    const newEntry: HistoryEntry = {
      command: cmd,
      output,
      timestamp: new Date(),
    };
    setHistory((prev) => [...prev, newEntry]);
    setIsLoading(false);
  }, []);

  // Typing animation function
  const typeCommand = async (command: string) => {
    setIsTyping(true);
    setCurrentCommand("");

    for (let i = 0; i < command.length; i++) {
      setCurrentCommand(command.slice(0, i + 1));
      await new Promise((resolve) => setTimeout(resolve, 50));
    }

    setIsTyping(false);
    executeCommand(command);
  };

  // Demo function
  const runDemo = async () => {
    const demoCommands = ["about", "skills", "projects", "contact"];

    for (const cmd of demoCommands) {
      await typeCommand(cmd);
      await new Promise((resolve) => setTimeout(resolve, 2000));
    }
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCurrentCommand(value);
    playKeySound();

    // Autocomplete suggestions
    if (value) {
      const matches = commandNames.filter((cmd) =>
        cmd.toLowerCase().startsWith(value.toLowerCase())
      );
      setSuggestions(matches);
    } else {
      setSuggestions([]);
    }
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      executeCommand(currentCommand);
      setCurrentCommand("");
      setHistoryIndex(-1);
      setSuggestions([]);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const commandHistory = history
        .map((h) => h.command)
        .filter((cmd) => cmd.trim());
      if (commandHistory.length > 0) {
        const newIndex =
          historyIndex === -1
            ? commandHistory.length - 1
            : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setCurrentCommand(commandHistory[newIndex]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const commandHistory = history
        .map((h) => h.command)
        .filter((cmd) => cmd.trim());
      if (historyIndex !== -1) {
        const newIndex = Math.min(commandHistory.length - 1, historyIndex + 1);
        if (
          newIndex === commandHistory.length - 1 &&
          historyIndex === newIndex
        ) {
          setHistoryIndex(-1);
          setCurrentCommand("");
        } else {
          setHistoryIndex(newIndex);
          setCurrentCommand(commandHistory[newIndex]);
        }
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      if (suggestions.length === 1) {
        setCurrentCommand(suggestions[0]);
        setSuggestions([]);
      }
    }
  };

  // Auto-focus input and scroll to bottom
  useEffect(() => {
    if (isBooted && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isBooted]);
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  // Handle clicks to focus input
  const handleTerminalClick = () => {
    if (inputRef.current && isBooted) {
      inputRef.current.focus();
    }
  };
  if (!isBooted) {
    return <BootSequence onBootComplete={() => setIsBooted(true)} />;
  }
  return (
    <div
      ref={terminalRef}
      className="h-screen bg-background text-foreground font-mono p-4 overflow-y-auto cursor-text"
      onClick={handleTerminalClick}
    >
      <div className="max-w-4xl ml-0 md:ml-8">
        {/* Terminal history */}
        {history.map((entry, index) => (
          <TerminalOutput
            key={index}
            command={entry.command}
            output={entry.output}
          />
        ))}

        {/* Current prompt */}
        <div className="flex items-center">
          <span className="terminal-prompt-user text-sm md:text-base">
            utkarsh
          </span>
          <span className="terminal-prompt-symbol">@</span>
          <span className="terminal-prompt-host">portfolio</span>
          <span className="terminal-prompt-symbol">:</span>
          <span className="terminal-prompt-path">~</span>
          <span className="terminal-prompt-symbol">$ </span>
          {isLoading ? (
            <div className="terminal-loading ml-2"></div>
          ) : (
            <input
              ref={inputRef}
              type="text"
              value={currentCommand}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent border-none outline-none text-foreground caret-white"
              autoFocus
              spellCheck={false}
              disabled={isTyping}
            />
          )}
          {isTyping && <span className="terminal-cursor ml-1">|</span>}
        </div>

        {/* Autocomplete suggestions */}
        {suggestions.length > 0 && (
          <div className="mt-1 ml-0 md:ml-8">
            <div className="text-sm terminal-gray">
              Suggestions: {suggestions.join(", ")}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
