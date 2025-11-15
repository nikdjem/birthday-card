import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface BirthdayCard {
  id: string;
  recipient_name: string;
  personal_message: string;
  card_image: string;
  greeting_text: string;
  text_font: string;
  text_color: string;
  text_style: {
    bold: boolean;
    italic: boolean;
    shadow: boolean;
  };
  language: string;
  url_slug: string;
  created_at: string;
}
