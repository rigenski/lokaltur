import { createBrowserClient} from "@supabase/ssr"
import { env } from "@/constants/env"

export function createClient() {
    return createBrowserClient(env.NEXT_PUBLIC_SUPABASE_URL, env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
}

export const MOCK_CHANNEL = "draw-guess-room"