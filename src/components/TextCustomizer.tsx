interface TextCustomizerProps {
  greetingText: string;
  onGreetingTextChange: (text: string) => void;
  textFont: string;
  onTextFontChange: (font: string) => void;
  textColor: string;
  onTextColorChange: (color: string) => void;
  textStyle: {
    bold: boolean;
    italic: boolean;
    shadow: boolean;
  };
  onTextStyleChange: (style: {
    bold: boolean;
    italic: boolean;
    shadow: boolean;
  }) => void;
  t: Record<string, string>;
}

const fontOptions = [
  'Arial',
  'Georgia',
  'Times New Roman',
  'Courier New',
  'Trebuchet MS',
  'Comic Sans MS',
  'Impact',
];

export function TextCustomizer({
  greetingText,
  onGreetingTextChange,
  textFont,
  onTextFontChange,
  textColor,
  onTextColorChange,
  textStyle,
  onTextStyleChange,
  t,
}: TextCustomizerProps) {
  const toggleStyle = (key: 'bold' | 'italic' | 'shadow') => {
    onTextStyleChange({
      ...textStyle,
      [key]: !textStyle[key],
    });
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {t.greetingText}
        </label>
        <input
          type="text"
          value={greetingText}
          onChange={(e) => onGreetingTextChange(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Happy Birthday"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {t.textFont}
        </label>
        <select
          value={textFont}
          onChange={(e) => onTextFontChange(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          {fontOptions.map((font) => (
            <option key={font} value={font}>
              {font}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {t.textColor}
        </label>
        <div className="flex gap-2 items-center">
          <input
            type="color"
            value={textColor}
            onChange={(e) => onTextColorChange(e.target.value)}
            className="w-12 h-10 border border-gray-300 rounded cursor-pointer"
          />
          <input
            type="text"
            value={textColor}
            onChange={(e) => onTextColorChange(e.target.value)}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
            placeholder="#000000"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {t.textStyle}
        </label>
        <div className="flex gap-3">
          <button
            onClick={() => toggleStyle('bold')}
            className={`px-4 py-2 rounded-lg font-bold transition-colors ${
              textStyle.bold
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            B
          </button>
          <button
            onClick={() => toggleStyle('italic')}
            className={`px-4 py-2 rounded-lg italic transition-colors ${
              textStyle.italic
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            I
          </button>
          <button
            onClick={() => toggleStyle('shadow')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              textStyle.shadow
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
            style={{
              textShadow: textStyle.shadow
                ? '1px 1px 2px rgba(0,0,0,0.3)'
                : 'none',
            }}
          >
            {t.shadow}
          </button>
        </div>
      </div>
    </div>
  );
}
