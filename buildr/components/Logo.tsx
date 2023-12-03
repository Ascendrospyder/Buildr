import Link from 'next/link';
import React from 'react';

function Logo() {
  return (
    <Link
      href={'/'}
      className='font-bold text-3xl bg-gradient-to-r from-purple-600 to-blue-400 text-transparent bg-clip-text hover:cursor-pointer'
    >
      Buildr
    </Link>
  );
}

export default Logo;
