export interface CardDesign {
  id: string;
  name: string;
  image: string;
  color: string;
}

export const cardDesigns: CardDesign[] = [
  {
    id: 'elegant-gold',
    name: 'Elegant Gold',
    image: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
    color: '#ffd700',
  },
  {
    id: 'vibrant-rainbow',
    name: 'Vibrant Rainbow',
    image: 'linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #4facfe 75%, #00f2fe 100%)',
    color: '#ffffff',
  },
  {
    id: 'sunset',
    name: 'Sunset',
    image: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a6f 25%, #c44569 50%, #f8b195 75%, #ffd89b 100%)',
    color: '#ffffff',
  },
  {
    id: 'forest-green',
    name: 'Forest Green',
    image: 'linear-gradient(135deg, #0d5c3e 0%, #1a8659 100%)',
    color: '#ffd700',
  },
  {
    id: 'ocean-blue',
    name: 'Ocean Blue',
    image: 'linear-gradient(135deg, #001a4d 0%, #003d99 50%, #0066cc 100%)',
    color: '#ffffff',
  },
  {
    id: 'pastel-pink',
    name: 'Pastel Pink',
    image: 'linear-gradient(135deg, #ffc0d9 0%, #ffd9e8 50%, #ffe8f1 100%)',
    color: '#d63384',
  },
  {
    id: 'midnight-purple',
    name: 'Midnight Purple',
    image: 'linear-gradient(135deg, #2a0845 0%, #5a189a 100%)',
    color: '#c77dff',
  },
  {
    id: 'coral-peach',
    name: 'Coral Peach',
    image: 'linear-gradient(135deg, #ff7f50 0%, #ff6b6b 50%, #ffb3b3 100%)',
    color: '#ffffff',
  },
  {
    id: 'mint-fresh',
    name: 'Mint Fresh',
    image: 'linear-gradient(135deg, #72ddf7 0%, #a8e6cf 50%, #c5f1e7 100%)',
    color: '#005f5f',
  },
  {
    id: 'golden-sunrise',
    name: 'Golden Sunrise',
    image: 'linear-gradient(135deg, #ffa500 0%, #ffb84d 50%, #ffcc99 100%)',
    color: '#2c3e50',
  },
];
