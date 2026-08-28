import { ThemeType } from "@/types";

// Antes Entries/Entry/Comments y Chat/ChatForm implementaban cada uno su
// propia burbuja de mensaje (misma estructura, copiada dos veces) y
// ninguna de las dos tenía un color de fondo real que distinguiera el
// mensaje propio del ajeno (solo la alineación izquierda/derecha).
type Props = {
  isOwn: boolean;
  initials?: string;
  fullName: string;
  message: string;
  timestamp?: string;
  theme?: ThemeType;
};

const MessageBubble: React.FC<Props> = ({ isOwn, initials, fullName, message, timestamp, theme }) => {
  return (
    <div className={`flex items-end gap-2 py-2 ${isOwn ? 'flex-row-reverse' : ''}`}>
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-200 text-sm font-semibold text-gray-600">
        {initials}
      </div>
      <div className={`flex max-w-[75%] flex-col ${isOwn ? 'items-end' : 'items-start'}`}>
        <span className="mb-1 text-xs text-gray-400">
          {!isOwn && <strong className="mr-1 text-gray-600">{fullName}</strong>}
          {timestamp}
        </span>
        <p
          className={`whitespace-pre-wrap break-words rounded-2xl px-3 py-2 text-sm ${
            isOwn
              ? `rounded-br-sm text-white-01 ${theme?.general.primaryBgColor ?? 'bg-gray-700'}`
              : 'rounded-bl-sm border border-gray-200 bg-white text-gray-700'
          }`}
        >
          {message}
        </p>
      </div>
    </div>
  );
};

export default MessageBubble;
