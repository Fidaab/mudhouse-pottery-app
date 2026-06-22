import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ptuplosztoxiodywhdda.supabase.co'
const supabaseKey = 'sb_publishable_3kJUrRMeXUlJcXgo43HjYA_hFsGA8oa'

export const supabase = createClient(supabaseUrl, supabaseKey)
