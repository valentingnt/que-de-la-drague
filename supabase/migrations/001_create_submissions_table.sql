CREATE TABLE IF NOT EXISTS submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  message TEXT NOT NULL,
  signature TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  user_agent TEXT,
  referrer TEXT
);

CREATE INDEX idx_submissions_created_at ON submissions(created_at DESC);

ALTER TABLE submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable insert for all users" ON submissions
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Enable read for all users" ON submissions
  FOR SELECT USING (true);

