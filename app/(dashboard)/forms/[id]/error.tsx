'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React, { useEffect } from 'react';

function ErrorPage({ error }: { error: Error }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className='flex w-full h-full items-center justify-center'>
      <div className='border rounded-lg border-red-500 p-4 my-4 text-center'>
        <h2 className='text-red-500 text-4xl font-bold my-4 animate-pulse'>
          Hey, something went wrong!
        </h2>
        <div className='w-[200px] mx-auto'>
          <Button asChild className='w-full bg-[#bc0a63]'>
            <Link href={'/'}>Go Back</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ErrorPage;
