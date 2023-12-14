'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React, { useEffect } from 'react';

function ErrorPage({ error }: { error: Error }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className='flex w-full h-full flex-col items-center justify-center'>
      <h2 className='text-red-500 text-4xl text-bold my-3'>
        Hey, something went wrong!
      </h2>
      <Button asChild>
        <Link href={'/'}>Go Back</Link>
      </Button>
    </div>
  );
}

export default ErrorPage;
