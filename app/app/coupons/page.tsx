import { createClient } from '@/utils/supabase/server'

import { revalidatePath } from 'next/cache'

async function createCoupon(formData: FormData) {
  'use server'
  
  const credits = formData.get('credits')
  const supabase = await createClient()
  
  // TODO: Get authenticated user
  


  // TODO: Insert coupon
  

  revalidatePath('/app/coupons')
}

async function toggleCouponStatus(couponId: string) {
  'use server'
  
  const supabase = await createClient()

  // TODO: Get authenticated user
 

  // TODO: Toggle coupon status
  

  revalidatePath('/app/coupons')
}

export default async function Page() {
  const supabase = await createClient()
  // TODO: Get authenticated user
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return <div>Please sign in</div>

  // TODO: Get user's coupons
  

  // TODO: Calculate total credits
  return (
    <div className="flex flex-col gap-8 p-8">
      <div>
        <h2 className="text-2xl font-bold mb-4">Create New Coupon</h2>
        <form action={createCoupon} className="flex gap-4 items-end">
          <div className="flex flex-col gap-2">
            <label htmlFor="credits">Credits Amount</label>
            <input 
              type="number"
              id="credits"
              name="credits"
              className="border p-2 rounded"
              placeholder="Enter credits amount"
            />
          </div>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
            Create Coupon
          </button>
        </form>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">Your Coupons</h2>
        <div className="border rounded divide-y">
          <div className="p-4 flex justify-between items-center bg-gray-50">
            <p className="font-bold">Total Credits: </p>
          </div>
          {/* TODO - Uncomment when you get the coupons: Map through coupons */}
          {/* {coupons?.map((coupon) => (
            <div key={coupon.id} className="p-4 flex justify-between items-center">
              <div>
                <p className="font-bold">{coupon.credits} Credits</p>
                <p className="text-sm text-gray-500">Status: {coupon.is_active ? 'Active' : 'Inactive'}</p>
              </div>
              <form action={toggleCouponStatus.bind(null, coupon.id)}>
                <button type="submit" className="border px-4 py-2 rounded">
                  Toggle Status
                </button>
              </form>
            </div>
          ))} */}
        </div>
      </div>
    </div>
  )
}