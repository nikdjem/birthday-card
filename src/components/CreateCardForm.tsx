import { useState } from 'react';
import { supabase } from '../supabaseClient';
import { cardDesigns } from '../cardDesigns';
import { Language, getTranslation } from '../i18n';
import { CardDesignSelector } from './CardDesignSelector';
import { TextCustomizer } from './TextCustomizer';
import { CardPreview } from './CardPreview';
import { Copy, Check } from 'lucide-react';

interface CreateCardFormProps {
  language: Language;
}

function generateSlug(): string {
  return Math.random().toString(36).substring(2, 10) +
    Math.random().toString(36).substring(2, 10);
}

export function CreateCardForm({ language }: CreateCardFormProps) {
  const t = getTranslation(language);
  const [recipientName, setRecipientName] = useState('');
  const [personalMessage, setPersonalMessage] = useState('');
  const [selectedCardId, setSelectedCardId] = useState(cardDesigns[0].id);
  const [greetingText, setGreetingText] = useState(
    language === 'en' ? 'Happy Birthday' : 'Честит Рожден Ден'
  );
  const [textFont, setTextFont] = useState('Arial');
  const [textColor, setTextColor] = useState('#000000');
  const [textStyle, setTextStyle] = useState({
    bold: false,
    italic: false,
    shadow: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [generatedUrl, setGeneratedUrl] = useState('');
  const [copyFeedback, setCopyFeedback] = useState(false);
  const [error, setError] = useState('');

  const handleGenerateCard = async () => {
    setError('');

    if (!recipientName.trim()) {
      setError(t.required);
      return;
    }

    if (!selectedCardId) {
      setError(t.selectImage);
      return;
    }

    setIsLoading(true);

    try {
      const slug = generateSlug();
      const cardData = {
        recipient_name: recipientName,
        personal_message: personalMessage,
        card_image: selectedCardId,
        greeting_text: greetingText,
        text_font: textFont,
        text_color: textColor,
        text_style: textStyle,
        language,
        url_slug: slug,
      };

      const { error: insertError } = await supabase
        .from('birthday_cards')
        .insert([cardData]);

      if (insertError) {
        setError('Failed to create card. Please try again.');
        return;
      }

      const shareUrl = `${window.location.origin}/card/${slug}`;
      setGeneratedUrl(shareUrl);
    } catch (err) {
      setError('An error occurred. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyUrl = async () => {
    if (!generatedUrl) return;

    try {
      await navigator.clipboard.writeText(generatedUrl);
      setCopyFeedback(true);
      setTimeout(() => setCopyFeedback(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  if (generatedUrl) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-300 rounded-xl p-8 text-center mb-8 shadow-lg">
          <div className="mb-6">
            <div className="inline-block p-3 bg-green-200 rounded-full mb-4">
              <Check size={32} className="text-green-700" />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-green-900 mb-2">
            {t.shareCard}
          </h2>
          <p className="text-green-800 mb-8 text-lg">
            Your birthday card has been created! Share this link:
          </p>
          <div className="flex flex-col sm:flex-row gap-2 bg-white p-4 rounded-lg border border-green-200 mb-6 shadow-md">
            <input
              type="text"
              value={generatedUrl}
              readOnly
              className="flex-1 outline-none font-mono text-sm px-3 py-2 break-all"
            />
            <button
              onClick={handleCopyUrl}
              className="flex items-center justify-center gap-2 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium whitespace-nowrap"
            >
              {copyFeedback ? (
                <>
                  <Check size={18} />
                  {t.copiedToClipboard}
                </>
              ) : (
                <>
                  <Copy size={18} />
                  {t.copyLink}
                </>
              )}
            </button>
          </div>
          <button
            onClick={() => {
              setGeneratedUrl('');
              setRecipientName('');
              setPersonalMessage('');
              setSelectedCardId(cardDesigns[0].id);
              setError('');
            }}
            className="px-8 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-semibold shadow-md"
          >
            {t.createCard}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t.recipientName}
            </label>
            <input
              type="text"
              value={recipientName}
              onChange={(e) => setRecipientName(e.target.value)}
              placeholder={t.recipientNamePlaceholder}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t.personalMessage}
            </label>
            <textarea
              value={personalMessage}
              onChange={(e) => setPersonalMessage(e.target.value)}
              placeholder={t.personalMessagePlaceholder}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            />
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              {t.selectCardDesign}
            </h3>
            <CardDesignSelector
              selectedCardId={selectedCardId}
              onSelectCard={setSelectedCardId}
            />
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              {t.customizeGreeting}
            </h3>
            <TextCustomizer
              greetingText={greetingText}
              onGreetingTextChange={setGreetingText}
              textFont={textFont}
              onTextFontChange={setTextFont}
              textColor={textColor}
              onTextColorChange={setTextColor}
              textStyle={textStyle}
              onTextStyleChange={setTextStyle}
              t={t}
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          <button
            onClick={handleGenerateCard}
            disabled={isLoading}
            className="w-full px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isLoading ? t.generating : t.generateCard}
          </button>
        </div>

        <div>
          <div className="sticky top-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {t.preview}
            </h3>
            <CardPreview
              selectedCardId={selectedCardId}
              recipientName={recipientName}
              personalMessage={personalMessage}
              greetingText={greetingText}
              textFont={textFont}
              textColor={textColor}
              textStyle={textStyle}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
