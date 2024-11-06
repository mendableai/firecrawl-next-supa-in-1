import { createClient } from '@/utils/supabase/server'

export default async function Page() {
  const supabase = await createClient()
  const { data: coupons } = await supabase.from('coupons').select()

  return <pre>{JSON.stringify(coupons, null, 2)}</pre>
}