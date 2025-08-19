/*
  # Initial Schema for College Budget Management App

  1. New Tables
    - `profiles` - User profiles with budget settings
    - `expenses` - User expenses with categories
    - `budget_categories` - Budget allocations per category
    - `contacts` - Payment contacts for users
    - `transactions` - Payment transactions
    - `subscriptions` - User subscriptions management
    - `split_bills` - Shared expenses between users
    - `group_funds` - Collaborative savings goals
    - `investments` - User investment tracking
    - `loans` - Peer-to-peer loans
    - `achievements` - User achievements and streaks

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to manage their own data
*/

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  name text NOT NULL,
  email text UNIQUE NOT NULL,
  total_savings numeric DEFAULT 0,
  monthly_budget numeric DEFAULT 8000,
  points integer DEFAULT 0,
  saver_streak integer DEFAULT 0,
  budgeting_streak integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create expenses table
CREATE TABLE IF NOT EXISTS expenses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  title text NOT NULL,
  amount numeric NOT NULL,
  category text NOT NULL CHECK (category IN ('food', 'transport', 'entertainment', 'study', 'other')),
  date date DEFAULT CURRENT_DATE,
  created_at timestamptz DEFAULT now()
);

-- Create budget_categories table
CREATE TABLE IF NOT EXISTS budget_categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  name text NOT NULL,
  allocated numeric NOT NULL DEFAULT 0,
  spent numeric DEFAULT 0,
  icon text DEFAULT '💰',
  color text DEFAULT 'bg-gray-500',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create contacts table
CREATE TABLE IF NOT EXISTS contacts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  name text NOT NULL,
  phone text NOT NULL,
  upi_id text NOT NULL,
  is_frequent boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Create transactions table
CREATE TABLE IF NOT EXISTS transactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  contact_id uuid REFERENCES contacts(id) ON DELETE SET NULL,
  type text NOT NULL CHECK (type IN ('sent', 'received')),
  amount numeric NOT NULL,
  description text,
  status text DEFAULT 'completed' CHECK (status IN ('completed', 'pending', 'failed')),
  date timestamptz DEFAULT now()
);

-- Create subscriptions table
CREATE TABLE IF NOT EXISTS subscriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  name text NOT NULL,
  amount numeric NOT NULL,
  billing_cycle text NOT NULL CHECK (billing_cycle IN ('monthly', 'yearly')),
  next_billing date NOT NULL,
  status text DEFAULT 'active' CHECK (status IN ('active', 'paused', 'cancelled')),
  autopay boolean DEFAULT false,
  category text DEFAULT 'other' CHECK (category IN ('entertainment', 'productivity', 'education', 'other')),
  icon text DEFAULT '📱',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create split_bills table
CREATE TABLE IF NOT EXISTS split_bills (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  creator_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  title text NOT NULL,
  total_amount numeric NOT NULL,
  paid_by uuid REFERENCES auth.users(id),
  settled boolean DEFAULT false,
  date timestamptz DEFAULT now()
);

-- Create split_bill_participants table
CREATE TABLE IF NOT EXISTS split_bill_participants (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  split_bill_id uuid REFERENCES split_bills(id) ON DELETE CASCADE,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  amount_owed numeric NOT NULL,
  paid boolean DEFAULT false
);

-- Create group_funds table
CREATE TABLE IF NOT EXISTS group_funds (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  creator_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  title text NOT NULL,
  target_amount numeric NOT NULL,
  current_amount numeric DEFAULT 0,
  deadline date NOT NULL,
  description text,
  created_at timestamptz DEFAULT now()
);

-- Create group_fund_contributors table
CREATE TABLE IF NOT EXISTS group_fund_contributors (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  group_fund_id uuid REFERENCES group_funds(id) ON DELETE CASCADE,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  amount numeric NOT NULL DEFAULT 0,
  contributed_at timestamptz DEFAULT now()
);

-- Create investments table
CREATE TABLE IF NOT EXISTS investments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  type text NOT NULL CHECK (type IN ('gold', 'stocks', 'mutual_fund', 'crypto')),
  symbol text NOT NULL,
  amount numeric NOT NULL,
  current_value numeric NOT NULL,
  change_amount numeric DEFAULT 0,
  change_percent numeric DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create loans table
CREATE TABLE IF NOT EXISTS loans (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  borrower_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  lender_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  amount numeric NOT NULL,
  interest_rate numeric DEFAULT 0,
  due_date date NOT NULL,
  status text DEFAULT 'active' CHECK (status IN ('active', 'paid', 'overdue')),
  description text,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE expenses ENABLE ROW LEVEL SECURITY;
ALTER TABLE budget_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE split_bills ENABLE ROW LEVEL SECURITY;
ALTER TABLE split_bill_participants ENABLE ROW LEVEL SECURITY;
ALTER TABLE group_funds ENABLE ROW LEVEL SECURITY;
ALTER TABLE group_fund_contributors ENABLE ROW LEVEL SECURITY;
ALTER TABLE investments ENABLE ROW LEVEL SECURITY;
ALTER TABLE loans ENABLE ROW LEVEL SECURITY;

-- Create RLS Policies

-- Profiles policies
CREATE POLICY "Users can read own profile"
  ON profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Expenses policies
CREATE POLICY "Users can manage own expenses"
  ON expenses FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

-- Budget categories policies
CREATE POLICY "Users can manage own budget categories"
  ON budget_categories FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

-- Contacts policies
CREATE POLICY "Users can manage own contacts"
  ON contacts FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

-- Transactions policies
CREATE POLICY "Users can manage own transactions"
  ON transactions FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

-- Subscriptions policies
CREATE POLICY "Users can manage own subscriptions"
  ON subscriptions FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

-- Split bills policies
CREATE POLICY "Users can read split bills they're involved in"
  ON split_bills FOR SELECT
  TO authenticated
  USING (
    auth.uid() = creator_id OR 
    auth.uid() = paid_by OR
    EXISTS (
      SELECT 1 FROM split_bill_participants 
      WHERE split_bill_id = id AND user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create split bills"
  ON split_bills FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = creator_id);

-- Split bill participants policies
CREATE POLICY "Users can read split bill participants for their bills"
  ON split_bill_participants FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM split_bills 
      WHERE id = split_bill_id AND (creator_id = auth.uid() OR paid_by = auth.uid())
    ) OR user_id = auth.uid()
  );

-- Group funds policies
CREATE POLICY "Users can read group funds they're involved in"
  ON group_funds FOR SELECT
  TO authenticated
  USING (
    auth.uid() = creator_id OR
    EXISTS (
      SELECT 1 FROM group_fund_contributors 
      WHERE group_fund_id = id AND user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create group funds"
  ON group_funds FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = creator_id);

-- Group fund contributors policies
CREATE POLICY "Users can read contributors for their group funds"
  ON group_fund_contributors FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM group_funds 
      WHERE id = group_fund_id AND creator_id = auth.uid()
    ) OR user_id = auth.uid()
  );

CREATE POLICY "Users can contribute to group funds"
  ON group_fund_contributors FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Investments policies
CREATE POLICY "Users can manage own investments"
  ON investments FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

-- Loans policies
CREATE POLICY "Users can read loans they're involved in"
  ON loans FOR SELECT
  TO authenticated
  USING (auth.uid() = borrower_id OR auth.uid() = lender_id);

CREATE POLICY "Users can create loans"
  ON loans FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = borrower_id OR auth.uid() = lender_id);

-- Create functions for updating timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_budget_categories_updated_at BEFORE UPDATE ON budget_categories FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_subscriptions_updated_at BEFORE UPDATE ON subscriptions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_investments_updated_at BEFORE UPDATE ON investments FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();