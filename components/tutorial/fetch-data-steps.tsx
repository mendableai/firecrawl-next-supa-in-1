import { TutorialStep } from "./tutorial-step";
import { CodeBlock } from "./code-block";

const create = `
create table coupons (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users not null,
  credits integer not null,
  is_active boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);
`.trim();

const server = `import { createClient } from '@/utils/supabase/server'

export default async function Page() {
  const supabase = createClient()
  const { data: coupons } = await supabase.from('coupons').select()

  return <pre>{JSON.stringify(coupons, null, 2)}</pre>
}
`.trim();

const client = `'use client'

import { createClient } from '@/utils/supabase/client'
import { useEffect, useState } from 'react'

export default function Page() {
  const [coupons, setCoupons] = useState<any[] | null>(null)
  const supabase = createClient()

  useEffect(() => {
    const getData = async () => {
      const { data } = await supabase.from('coupons').select()
      setCoupons(data)
    }
    getData()
  }, [])

  return <pre>{JSON.stringify(coupons, null, 2)}</pre>
}
`.trim();

export default function FetchDataSteps() {
  return (
    <ol className="flex flex-col gap-6">
      <TutorialStep title="Create a coupons table">
        <p>
          Head over to the{" "}
          <a
            href="https://supabase.com/dashboard/project/_/editor"
            className="font-bold hover:underline text-foreground/80"
            target="_blank"
            rel="noreferrer"
          >
            Table Editor
          </a>{" "}
          for your Supabase project to create a table.
          <a
            href="https://supabase.com/dashboard/project/_/sql/new"
            className="font-bold hover:underline text-foreground/80"
            target="_blank"
            rel="noreferrer"
          >
            SQL Editor
          </a>{" "}
          and click RUN!
        </p>
        <CodeBlock code={create} />
      </TutorialStep>
      <h3 className="text-xl font-bold">Now it is your turn!</h3>
      <TutorialStep title="Create a way to give coupons to users">
        <p>Only authenticated users should be able to see and give themselves their coupons. Coupons are a pack of credits that can be active or inactive. Create a page in `/app/coupons` that allows users to give themselves coupons. They should be able to select the number of credits inside the coupon.</p>
      </TutorialStep>
      <TutorialStep title="Create a way for users to view their coupons">
        <p>Only authenticated users should be able to view their coupons. 1 coupon entry per table row.</p>
      </TutorialStep>
      <TutorialStep title="Create a way for users to toggle their coupons to inactive">
        <p>Only authenticated users should be able to toggle their coupons to inactive. Allow for you to toggle individual coupons to inactive.</p>
      </TutorialStep>

      <h3 className="mt-8 text-xl font-bold">Query coupons fetch example for reference</h3>
      
        <p>
          To create a Supabase client and query data from an Async Server
          Component, create a new page.tsx file at{" "}
          <span className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-xs font-medium text-secondary-foreground border">
            /app/coupons/page.tsx
          </span>{" "}
          and add the following.
        </p>
        <CodeBlock code={server} />
        <p>Alternatively, you can use a Client Component. (If you choose to do that, make sure you either have supabase being called in the server component or have the supabase client being called in the client component but make sure to have RLS enabled)</p>
        <CodeBlock code={client} />

      
    </ol>
  );
}
