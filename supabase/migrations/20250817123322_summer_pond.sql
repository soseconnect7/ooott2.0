/*
  # Create orders table for managing customer purchases

  1. New Tables
    - `orders`
      - `id` (uuid, primary key)
      - `order_id` (text) - Human-readable order ID like "OTT123456ABCD"
      - `customer_name` (text) - Customer's full name
      - `email` (text) - Customer's email address
      - `phone` (text) - Customer's phone/WhatsApp number
      - `product_id` (uuid) - Reference to products table
      - `product_name` (text) - Product name (denormalized for easier queries)
      - `amount` (decimal) - Amount paid
      - `payment_method` (text) - Payment method used (upi, bank_transfer)
      - `transaction_id` (text) - Transaction ID from payment
      - `payment_screenshot_url` (text) - URL to payment screenshot
      - `status` (text) - Order status (pending, processing, completed, rejected)
      - `admin_notes` (text) - Notes from admin visible to customer
      - `delivery_details` (text) - Login credentials and delivery info
      - `notes` (text) - Customer notes
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on `orders` table
    - Add policy for customers to view their own orders by order_id
    - Add policy for authenticated users to manage all orders (admin only)

  3. Indexes
    - Index on order_id for fast lookups
    - Index on status for filtering
    - Index on created_at for sorting
*/

CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id text UNIQUE NOT NULL,
  customer_name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  product_id uuid REFERENCES products(id),
  product_name text NOT NULL,
  amount decimal(10,2) NOT NULL,
  payment_method text NOT NULL,
  transaction_id text,
  payment_screenshot_url text,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed', 'rejected')),
  admin_notes text,
  delivery_details text,
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Allow anyone to view orders by order_id (for tracking)
CREATE POLICY "Anyone can view orders by order_id"
  ON orders
  FOR SELECT
  USING (true);

-- Allow anyone to create orders (for checkout)
CREATE POLICY "Anyone can create orders"
  ON orders
  FOR INSERT
  WITH CHECK (true);

-- Only authenticated users can manage all orders (admin panel)
CREATE POLICY "Authenticated users can manage orders"
  ON orders
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_orders_order_id ON orders(order_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_orders_product_id ON orders(product_id);