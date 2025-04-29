'use client';
import React, { use, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { Icon } from '@iconify/react';
import { useMediaQuery } from '@/hooks/use-media-query';
import { usePathname, useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import LogoTfac from '@/public/images/logo/tfac.png';

const LogInForm = () => {
  const router = useRouter();
  const pathname = usePathname();
  const isDesktop2xl = useMediaQuery('(max-width: 1530px)');
  const AuthURL = process.env.NEXT_PUBLIC_AUTH_URL;

  useEffect(() => {
    const token = Cookies.get('Authentication');
    if (token) {
      const localeMatch = pathname.match(/^\/(en|th)/);
      const locale = localeMatch ? localeMatch[1] : 'en';

      router.replace(`/${locale}/dashboard`);
    }
  }, [pathname, router]);

  const handleLogin = async () => {
    await router.push(`${AuthURL}/azure/login`);
  };
  return (
    <div className="w-full ">
      <div className="flex items-center justify-center">
        {/* <SiteLogo className="h-10 w-10 2xl:h-14 2xl:w-14 text-primary" /> */}
        <Image src={LogoTfac} alt="logo" className="h-20 w-20 text-primary" />
        {/* <h3 className="2xl:text-3xl text-2xl font-bold text-default-900"> TFAC BackOffice</h3> */}
      </div>
      <div className="2xl:mt-8 mt-6 2xl:text-3xl text-2xl text-center font-bold text-primary">
        TFAC BackOffice
      </div>
      <Button
        className="w-full"
        onClick={() => handleLogin()}
        size={!isDesktop2xl ? 'lg' : 'md'}
      >
        <Icon icon="codicon:azure" className="h-5 w-5 mr-2  " />
        Sign In with Azure AD
      </Button>
    </div>
  );
};

export default LogInForm;
