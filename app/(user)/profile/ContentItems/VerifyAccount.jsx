import Link from 'next/link';
import React from 'react'
import Heading from '../UIItems/Heading';
import { useTranslation } from '@/app/providers/Transslations';

const VerifyAccount = () => {
  const { translate } = useTranslation();

  return (
    <Link
      href={"/verify-account"}
      className="w-full rounded-2xl bg-white dark:bg-darknav dark:border-darkinput dark:text-gray-300 p-3 md:p-6 border-2 border-gray-300 flex items-center gap-4 group
      hover:border-primary animation
      "
    >
      <div className="size-8 rounded-full border group-hover:bg-primary animation " />
      <Heading text={translate("profile.verify_account")} actions={[]} />
    </Link>
  );
};

export default VerifyAccount