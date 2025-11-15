import { useEffect, useState } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import { supabase, BirthdayCard } from '../supabaseClient';
import { cardDesigns } from '../cardDesigns';
import { getTranslation, Language } from '../i18n';
import { Link } from 'lucide-react';

export function CardDisplay() {
  const params = useParams<{ slug?: string }>();
  const slug = params.slug;
  const [card, setCard] = useState<BirthdayCard | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCard = async () => {
      if (!slug) {
        setError('No card slug provided');
        setIsLoading(false);
        return;
      }

      try {
        const { data, error: fetchError } = await supabase
          .from('birthday_cards')
          .select('*')
          .eq('url_slug', slug)
          .maybeSingle();

        if (fetchError) {
          setError('Failed to load card');
          return;
        }

        if (!data) {
          setError('Card not found');
          return;
        }

        setCard(data as BirthdayCard);
      } catch (err) {
        console.error(err);
        setError('An error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCard();
  }, [slug]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading card...</p>
        </div>
      </div>
    );
  }

  if (error || !card) {
    const t = getTranslation('en');
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {t.noCardFound}
          </h1>
          <p className="text-gray-600 mb-6">{error}</p>
          <a
            href="/"
            className="inline-flex items-center gap-2 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            {t.backToHome}
          </a>
        </div>
      </div>
    );
  }

  const t = getTranslation(card.language as Language);
  const design = cardDesigns.find((d) => d.id === card.card_image);

  const fontWeightClass = card.text_style.bold ? 'font-bold' : 'font-normal';
  const fontStyleClass = card.text_style.italic ? 'italic' : 'not-italic';
  const shadowClass = card.text_style.shadow ? 'drop-shadow-lg' : '';

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <RouterLink
          to="/"
          className="inline-flex items-center gap-2 px-4 py-2 text-blue-600 hover:text-blue-700 mb-8 transition-colors"
        >
          ← {t.backToHome}
        </RouterLink>

        <div className="bg-white rounded-lg shadow-2xl overflow-hidden">
          <div
            className="w-full aspect-video flex flex-col items-center justify-center p-8 relative"
            style={{
              background: design?.image || '#f3f4f6',
            }}
          >
            <div className="text-center space-y-4 z-10">
              <p
                className={`${fontWeightClass} ${fontStyleClass} ${shadowClass} transition-all`}
                style={{
                  fontSize: '4rem',
                  color: card.text_color,
                  fontFamily: card.text_font,
                  textShadow: card.text_style.shadow
                    ? '3px 3px 6px rgba(0,0,0,0.3)'
                    : 'none',
                }}
              >
                {card.greeting_text}
              </p>

              <p
                className={`${fontWeightClass} ${fontStyleClass} ${shadowClass}`}
                style={{
                  fontSize: '3rem',
                  color: card.text_color,
                  fontFamily: card.text_font,
                  textShadow: card.text_style.shadow
                    ? '3px 3px 6px rgba(0,0,0,0.3)'
                    : 'none',
                }}
              >
                {card.recipient_name}
              </p>

              {card.personal_message && (
                <p
                  className="mt-8 max-w-2xl italic text-xl"
                  style={{
                    color: card.text_color,
                    fontFamily: card.text_font,
                    textShadow: card.text_style.shadow
                      ? '2px 2px 4px rgba(0,0,0,0.2)'
                      : 'none',
                  }}
                >
                  {card.personal_message}
                </p>
              )}
            </div>
          </div>

          <div className="bg-gray-50 px-8 py-6 text-center text-sm text-gray-600 flex items-center justify-center gap-2">
            <Link size={16} />
            {t.createdBy}
          </div>
        </div>
      </div>
    </div>
  );
}
