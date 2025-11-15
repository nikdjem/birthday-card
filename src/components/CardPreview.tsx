import { cardDesigns } from '../cardDesigns';

interface CardPreviewProps {
  selectedCardId: string;
  recipientName: string;
  personalMessage: string;
  greetingText: string;
  textFont: string;
  textColor: string;
  textStyle: {
    bold: boolean;
    italic: boolean;
    shadow: boolean;
  };
}

export function CardPreview({
  selectedCardId,
  recipientName,
  personalMessage,
  greetingText,
  textFont,
  textColor,
  textStyle,
}: CardPreviewProps) {
  const design = cardDesigns.find((d) => d.id === selectedCardId);

  if (!design) {
    return (
      <div className="flex items-center justify-center h-80 bg-gray-100 rounded-lg text-gray-500">
        Select a card to preview
      </div>
    );
  }

  const fontWeightClass = textStyle.bold ? 'font-bold' : 'font-normal';
  const fontStyleClass = textStyle.italic ? 'italic' : 'not-italic';
  const shadowClass = textStyle.shadow ? 'drop-shadow-lg' : '';

  return (
    <div className="w-full aspect-video rounded-lg overflow-hidden shadow-2xl">
      <div
        className="w-full h-full flex flex-col items-center justify-center p-8 relative"
        style={{
          background: design.image,
        }}
      >
        <div className="text-center space-y-4 z-10">
          <p
            className={`${fontWeightClass} ${fontStyleClass} ${shadowClass} transition-all`}
            style={{
              fontSize: '3rem',
              color: textColor,
              fontFamily: textFont,
              textShadow: textStyle.shadow
                ? '2px 2px 4px rgba(0,0,0,0.3)'
                : 'none',
            }}
          >
            {greetingText}
          </p>

          {recipientName && (
            <p
              className={`${fontWeightClass} ${fontStyleClass} ${shadowClass}`}
              style={{
                fontSize: '2.5rem',
                color: textColor,
                fontFamily: textFont,
                textShadow: textStyle.shadow
                  ? '2px 2px 4px rgba(0,0,0,0.3)'
                  : 'none',
              }}
            >
              {recipientName}
            </p>
          )}

          {personalMessage && (
            <p
              className="mt-6 max-w-xl italic text-lg"
              style={{
                color: textColor,
                fontFamily: textFont,
                textShadow: textStyle.shadow
                  ? '1px 1px 3px rgba(0,0,0,0.2)'
                  : 'none',
              }}
            >
              {personalMessage}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
