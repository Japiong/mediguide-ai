import { Activity, User, AlertTriangle, Lightbulb, AlertCircle, Info } from 'lucide-react';

export function ChatBubble({ message, isUser }) {
  if (isUser) {
    return (
      <div className="flex justify-end gap-2.5 chat-bubble-enter">
        <div className="max-w-[75%]">
          <div className="bg-[var(--accent)] text-white px-4 py-3 rounded-2xl rounded-tr-sm text-sm leading-relaxed">
            {message.content}
          </div>
          <p className="text-xs text-[var(--text-muted)] text-right mt-1">You</p>
        </div>
        <div className="w-8 h-8 rounded-full bg-[var(--accent)]/20 flex items-center justify-center flex-shrink-0 mt-1">
          <User size={14} className="text-[var(--accent)]" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex gap-2.5 chat-bubble-enter">
      <div className="w-8 h-8 rounded-full bg-[var(--accent)] flex items-center justify-center flex-shrink-0 mt-1">
        <Activity size={14} className="text-white" />
      </div>
      <div className="max-w-[80%] flex-1">
        <div className="card px-4 py-3 space-y-3 text-sm">
          {message.response ? (
            <AIResponse data={message.response} />
          ) : (
            <p className="text-[var(--text-secondary)] leading-relaxed">{message.content}</p>
          )}
        </div>
        <p className="text-xs text-[var(--text-muted)] mt-1">MediGuide AI</p>
      </div>
    </div>
  );
}

function AIResponse({ data }) {
  return (
    <div className="space-y-3">
      {data.overview && (
        <p className="text-[var(--text-primary)] leading-relaxed">{data.overview}</p>
      )}

      {data.possibleCauses?.length > 0 && (
        <div>
          <div className="flex items-center gap-1.5 mb-1.5">
            <Info size={13} className="text-[var(--accent)]" />
            <span className="text-xs font-semibold text-[var(--accent)] uppercase tracking-wide">Possible Causes</span>
          </div>
          <ul className="space-y-1">
            {data.possibleCauses.map((cause, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] mt-1.5 flex-shrink-0" />
                {cause}
              </li>
            ))}
          </ul>
        </div>
      )}

      {data.generalAdvice?.length > 0 && (
        <div>
          <div className="flex items-center gap-1.5 mb-1.5">
            <Lightbulb size={13} className="text-amber-500" />
            <span className="text-xs font-semibold text-amber-600 dark:text-amber-400 uppercase tracking-wide">General Advice</span>
          </div>
          <ul className="space-y-1">
            {data.generalAdvice.map((advice, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 flex-shrink-0" />
                {advice}
              </li>
            ))}
          </ul>
        </div>
      )}

      {data.warningSigns?.length > 0 && (
        <div>
          <div className="flex items-center gap-1.5 mb-1.5">
            <AlertTriangle size={13} className="text-[var(--severe)]" />
            <span className="text-xs font-semibold text-[var(--severe)] uppercase tracking-wide">Warning Signs</span>
          </div>
          <ul className="space-y-1">
            {data.warningSigns.map((sign, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--severe)] mt-1.5 flex-shrink-0" />
                {sign}
              </li>
            ))}
          </ul>
        </div>
      )}

      {data.disclaimer && (
        <div className="border-t border-[var(--border)] pt-2.5">
          <p className="text-xs text-[var(--text-muted)] italic leading-relaxed">{data.disclaimer}</p>
        </div>
      )}
    </div>
  );
}

export function TypingIndicator() {
  return (
    <div className="flex gap-2.5 chat-bubble-enter">
      <div className="w-8 h-8 rounded-full bg-[var(--accent)] flex items-center justify-center flex-shrink-0">
        <Activity size={14} className="text-white" />
      </div>
      <div className="card px-4 py-3">
        <div className="loading-dots flex gap-1.5">
          <span /><span /><span />
        </div>
      </div>
    </div>
  );
}
