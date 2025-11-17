// src/supabaseClient.js

import { createClient } from '@supabase/supabase-js'

// Grabs the URL and Key from your .env file
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY

// Creates your one, special connection to the "Diary"
export const supabase = createClient(supabaseUrl, supabaseKey)
