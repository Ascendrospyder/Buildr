'use client';

import React, { useEffect, useState } from 'react';
import { Button } from './ui/button';

function VisitBtn({ shareUrl }: { shareUrl: string }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // checking if component is mounted if window not found error occurs

  const shareLink = `${window.location.origin}/submit/${shareUrl}`;

  return (
    <Button
      className='w-[200px] bg-[#bc0a63]'
      onClick={() => {
        window.open(shareLink, '_blank');
      }}
    >
      Visit Form
    </Button>
  );
}

export default VisitBtn;
