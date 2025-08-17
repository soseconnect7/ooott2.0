/*
  # Create products table for OTT subscriptions

  1. New Tables
    - `products`
      - `id` (uuid, primary key)
      - `name` (text) - Product name like "Netflix Premium"
      - `description` (text) - Product description
      - `price` (decimal) - Price in rupees
      - `plan_type` (text) - Plan duration/type like "1 Month / 4 Devices"
      - `thumbnail_url` (text) - URL to product logo/image
      - `category` (text) - Category like "streaming", "music", etc.
      - `benefits` (jsonb) - Array of benefits/features
      - `stock_available` (boolean) - Whether product is available
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on `products` table
    - Add policy for public read access (customers can view products)
    - Add policy for authenticated users to manage products (admin only)
*/

CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL,
  price decimal(10,2) NOT NULL,
  plan_type text NOT NULL,
  thumbnail_url text NOT NULL,
  category text NOT NULL DEFAULT 'streaming',
  benefits jsonb DEFAULT '[]'::jsonb,
  stock_available boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read products (for catalog)
CREATE POLICY "Anyone can view products"
  ON products
  FOR SELECT
  USING (true);

-- Only authenticated users can manage products (admin panel)
CREATE POLICY "Authenticated users can manage products"
  ON products
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Insert sample products
INSERT INTO products (name, description, price, plan_type, thumbnail_url, category, benefits, stock_available) VALUES 
(
  'Netflix Premium',
  'Watch unlimited movies and TV shows in 4K Ultra HD quality. Download content for offline viewing.',
  15.00,
  '1 Month / 4 Devices',
  'https://images.pexels.com/photos/1040160/pexels-photo-1040160.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=1',
  'streaming',
  '["4K Ultra HD streaming", "Watch on 4 devices simultaneously", "Download for offline viewing", "No ads", "Access to Netflix Originals"]'::jsonb,
  true
),
(
  'YouTube Premium',
  'Enjoy ad-free YouTube videos, background play, and access to YouTube Music Premium.',
  12.00,
  '1 Month / Personal',
  'https://images.pexels.com/photos/1618843/pexels-photo-1618843.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=1',
  'streaming',
  '["Ad-free YouTube experience", "Background play", "YouTube Music Premium included", "Download videos for offline viewing", "YouTube Originals"]'::jsonb,
  true
),
(
  'Spotify Premium',
  'Stream music ad-free with unlimited skips and offline downloads.',
  25.00,
  '1 Month / Individual',
  'https://images.pexels.com/photos/167635/pexels-photo-167635.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=1',
  'music',
  '["Ad-free music streaming", "Unlimited skips", "High quality audio", "Download for offline listening", "Access to exclusive content"]'::jsonb,
  true
),
(
  'ChatGPT Plus',
  'Access to GPT-4, faster response times, and priority access during peak hours.',
  450.00,
  '1 Month / Individual',
  'https://images.pexels.com/photos/8386422/pexels-photo-8386422.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=1',
  'ai',
  '["Access to GPT-4", "Faster response times", "Priority access during peak hours", "Latest features and updates"]'::jsonb,
  true
),
(
  'Prime Video',
  'Watch thousands of movies and TV shows including Prime Originals.',
  35.00,
  '1 Month / Family',
  'https://images.pexels.com/photos/1040160/pexels-photo-1040160.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=1',
  'streaming',
  '["Thousands of movies and shows", "Prime Originals", "Multiple device support", "HD streaming", "Download for offline viewing"]'::jsonb,
  true
),
(
  'Disney+ Hotstar',
  'Stream Disney movies, Marvel shows, and live sports in high quality.',
  28.00,
  '1 Month / 4 Devices',
  'https://images.pexels.com/photos/1040160/pexels-photo-1040160.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=1',
  'streaming',
  '["Disney and Marvel content", "Live sports streaming", "Multiple language support", "Kids-safe content", "Download for offline viewing"]'::jsonb,
  true
);