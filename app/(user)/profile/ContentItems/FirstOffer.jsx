import Link from 'next/link';
import React from 'react'
import Heading from '../UIItems/Heading';

const FirstOffer = () => {
  return (
    <Link
      href={"/find-employee"}
      className="w-full rounded-2xl bg-white dark:bg-transparent p-3 md:p-6 border-2 border-gray-300 flex items-center gap-4 group
      hover:border-primary animation
      "
    >
      <div className="size-8 rounded-full border group-hover:bg-primary animation " />
      <Heading text={"Add your first offer"} actions={[]} />
    </Link>
  );
}

export default FirstOffer
