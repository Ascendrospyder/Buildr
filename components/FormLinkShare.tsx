'use client';

import React, { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { toast } from './ui/use-toast';
import { IoCopyOutline } from 'react-icons/io5';

function FormLinkShare({ shareUrl }: { shareUrl: string }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // checking if component is mounted if window not found error occurs

  const shareLink = `${window.location.origin}/submit/${shareUrl}`;

  return (
    <div className='flex flex-grow gap-4 items-center  '>
      <Input value={shareLink} readOnly />
      <Button
        className='max-w-[250px] bg-[#bc0a63]'
        onClick={() => {
          navigator.clipboard.writeText(shareLink);
          toast({
            title: 'Successfully copied url to clipboard 🥳',
          });
        }}
      >
        <IoCopyOutline className='m-2 h-4 w-4' />
      </Button>
    </div>
  );
}

export default FormLinkShare;
