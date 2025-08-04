interface TerminalOutputProps {
  command: string;
  output: React.ReactNode;
}

export const TerminalOutput = ({ command, output }: TerminalOutputProps) => {
  return (
    <div className="mb-2">
      {/* Command prompt line */}
      <div className="flex items-center">
        <span className="terminal-prompt-user text-sm md:text-base">
          utkarsh
        </span>
        <span className="terminal-prompt-symbol">@</span>
        <span className="terminal-prompt-host">portfolio</span>
        <span className="terminal-prompt-symbol">:</span>
        <span className="terminal-prompt-path">~</span>
        <span className="terminal-prompt-symbol">$ </span>
        <span className="text-foreground">{command}</span>
      </div>

      {/* Command output */}
      {output && <div className="mt-1">{output}</div>}
    </div>
  );
};
