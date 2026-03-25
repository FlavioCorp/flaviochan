import { createClient } from 'https://esm.sh/@supabase/supabase-js'

const SUPABASE_URL = "https://oepkkkwalynruxusxaah.supabase.co"
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9lcGtra3dhbHlucnV4dXN4YWFoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjgwNzk0MjMsImV4cCI6MjA4MzY1NTQyM30.WeadNuUAsJTrQ62mVhT2TnS7XjvARCXJ9M4O7eI759E"

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)
