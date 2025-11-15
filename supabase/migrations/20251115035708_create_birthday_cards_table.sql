/*
  # Create birthday_cards table

  1. New Tables
    - `birthday_cards`
      - `id` (uuid, primary key) - Unique identifier
      - `recipient_name` (text) - Name of the birthday recipient
      - `personal_message` (text) - Custom message from card creator
      - `card_image` (text) - Identifier of the selected card image
      - `greeting_text` (text) - Customized greeting (e.g., "Happy Birthday")
      - `text_font` (text) - Font style for greeting
      - `text_color` (text) - Color of greeting text (hex code)
      - `text_style` (jsonb) - Additional text styling options (bold, italic, shadow, etc.)
      - `language` (text) - Language code (en/bg)
      - `url_slug` (text) - Unique shareable URL slug
      - `created_at` (timestamptz) - Card creation timestamp
  
  2. Security
    - Enable RLS on `birthday_cards` table
    - Add policy for public read access (anyone can view cards by URL)
    - Add policy for public insert (anyone can create cards)
*/

CREATE TABLE IF NOT EXISTS birthday_cards (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  recipient_name text NOT NULL,
  personal_message text DEFAULT '',
  card_image text NOT NULL,
  greeting_text text NOT NULL,
  text_font text DEFAULT 'Arial',
  text_color text DEFAULT '#000000',
  text_style jsonb DEFAULT '{"bold": false, "italic": false, "shadow": false}',
  language text DEFAULT 'en',
  url_slug text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE birthday_cards ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read cards"
  ON birthday_cards
  FOR SELECT
  USING (true);

CREATE POLICY "Anyone can create cards"
  ON birthday_cards
  FOR INSERT
  WITH CHECK (true);
