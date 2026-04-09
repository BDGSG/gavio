-- ============================================
-- GAVIO — Schema Supabase PostgreSQL
-- ============================================

-- Table produits
CREATE TABLE IF NOT EXISTS products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  cj_product_id TEXT,
  cj_variant_id TEXT,
  price INTEGER NOT NULL,           -- centimes
  compare_price INTEGER DEFAULT 0,  -- ancien prix barre centimes
  currency TEXT DEFAULT 'EUR',
  description TEXT DEFAULT '',
  features JSONB DEFAULT '[]'::jsonb,
  images JSONB DEFAULT '[]'::jsonb,
  stock INTEGER DEFAULT 0,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Table commandes
CREATE TABLE IF NOT EXISTS orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  product_id UUID REFERENCES products(id),
  quantity INTEGER DEFAULT 1,
  amount INTEGER NOT NULL,            -- centimes
  currency TEXT DEFAULT 'EUR',
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending','paid','processing','shipped','delivered','refunded','cancelled')),
  payment_method TEXT CHECK (payment_method IN ('stripe','paypal')),
  stripe_session_id TEXT,
  paypal_order_id TEXT,
  cj_order_id TEXT,
  tracking_number TEXT,
  shipping_address JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Index pour recherches frequentes
CREATE INDEX idx_orders_email ON orders(email);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_created ON orders(created_at DESC);
CREATE INDEX idx_products_slug ON products(slug);

-- Trigger updated_at automatique
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER products_updated_at BEFORE UPDATE ON products FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER orders_updated_at BEFORE UPDATE ON orders FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- RLS : seul l'admin (service_role) peut lire/ecrire
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Politique lecture publique des produits actifs
CREATE POLICY "Public can read active products" ON products
  FOR SELECT USING (active = true);

-- Politique admin full access
CREATE POLICY "Admin full access products" ON products
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Admin full access orders" ON orders
  FOR ALL USING (auth.role() = 'service_role');
