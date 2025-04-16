
-- Create the plans table
CREATE TABLE IF NOT EXISTS public.plans (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  interval TEXT NOT NULL CHECK (interval IN ('MONTHLY', 'YEARLY')),
  features TEXT[] NOT NULL DEFAULT '{}',
  recommended BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create the subscriptions table
CREATE TABLE IF NOT EXISTS public.subscriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  plan_id UUID NOT NULL REFERENCES public.plans(id),
  asaas_customer_id TEXT NOT NULL,
  asaas_subscription_id TEXT NOT NULL,
  status TEXT NOT NULL,
  next_due_date DATE NOT NULL,
  value DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for plans
CREATE POLICY "Plans are viewable by everyone" 
  ON public.plans FOR SELECT 
  USING (true);

CREATE POLICY "Plans are insertable by authenticated admins only" 
  ON public.plans FOR INSERT 
  TO authenticated 
  USING (EXISTS (
    SELECT 1 FROM auth.users
    WHERE auth.users.id = auth.uid()
    AND auth.users.email IN (SELECT unnest(current_setting('app.admin_emails', true)::text[]))
  ));

CREATE POLICY "Plans are updatable by authenticated admins only" 
  ON public.plans FOR UPDATE 
  TO authenticated 
  USING (EXISTS (
    SELECT 1 FROM auth.users
    WHERE auth.users.id = auth.uid()
    AND auth.users.email IN (SELECT unnest(current_setting('app.admin_emails', true)::text[]))
  ));

CREATE POLICY "Plans are deletable by authenticated admins only" 
  ON public.plans FOR DELETE 
  TO authenticated 
  USING (EXISTS (
    SELECT 1 FROM auth.users
    WHERE auth.users.id = auth.uid()
    AND auth.users.email IN (SELECT unnest(current_setting('app.admin_emails', true)::text[]))
  ));

-- Create RLS policies for subscriptions
CREATE POLICY "Users can view their own subscriptions" 
  ON public.subscriptions FOR SELECT 
  TO authenticated 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own subscriptions" 
  ON public.subscriptions FOR INSERT 
  TO authenticated 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own subscriptions" 
  ON public.subscriptions FOR UPDATE 
  TO authenticated 
  USING (auth.uid() = user_id);

-- Add default plans
INSERT INTO public.plans (name, description, price, interval, features, recommended)
VALUES
  ('Basic', 'Essential features for beginners', 29.90, 'MONTHLY', ARRAY['Basic features', 'Limited access', 'Email support'], false),
  ('Standard', 'Perfect for regular users', 59.90, 'MONTHLY', ARRAY['All basic features', 'Premium access', 'Priority support', 'Advanced analytics'], true),
  ('Premium', 'For professional users with advanced needs', 99.90, 'MONTHLY', ARRAY['All standard features', 'Unlimited access', '24/7 support', 'Custom solutions', 'Dedicated account manager'], false);
