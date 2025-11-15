import { cardDesigns } from '../cardDesigns';

interface CardDesignSelectorProps {
  selectedCardId: string;
  onSelectCard: (cardId: string) => void;
}

export function CardDesignSelector({
  selectedCardId,
  onSelectCard,
}: CardDesignSelectorProps) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {cardDesigns.map((design) => (
          <button
            key={design.id}
            onClick={() => onSelectCard(design.id)}
            className={`relative h-32 rounded-lg overflow-hidden transition-all transform hover:scale-105 ${
              selectedCardId === design.id
                ? 'ring-4 ring-blue-500 shadow-lg'
                : 'ring-2 ring-gray-200 hover:ring-gray-300'
            }`}
          >
            <div
              className="w-full h-full"
              style={{
                background: design.image,
              }}
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
              <span className="text-white text-xs font-medium text-center px-2">
                {design.name}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
