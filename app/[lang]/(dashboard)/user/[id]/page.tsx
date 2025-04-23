'use client';
import { Button } from '@/components/ui/button';
import { CardContent } from '@/components/ui/card';
import Card from '@/components/ui/card-snippet';
import { useUserStore } from '@/store/user/userStore';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect } from 'react';

import fbIcon from '@/public/images/social/facebook-1.png';
import linkedinIcon from '@/public/images/social/linkedin-1.png';
import redditIcon from '@/public/images/social/reddit-circle.png';
import pinterestIcon from '@/public/images/social/pinterest-circle.png';

type Props = {
  params: {
    id: string;
  };
};

const socials = [
  {
    icon: fbIcon,
    link: '#',
  },
  {
    icon: linkedinIcon,
    link: '#',
  },
  {
    icon: redditIcon,
    link: '#',
  },
  {
    icon: pinterestIcon,
    link: '#',
  },
];
const socialsInfo = [
  {
    title: 'Followers',
    value: '16.5k',
  },
  {
    title: 'Following',
    value: '11.3k',
  },
  {
    title: 'Total Post',
    value: '1.4k',
  },
];

function User({ params }: Props) {
  const { user, fetchUser } = useUserStore();

  useEffect(() => {
    fetchUser(parseInt(params.id));
  }, [params.id]);

  return (
    <>
      <Card>
        <CardContent className="p-0">
          <div className="flex justify-center -mt-7">
            <div className="flex-none w-12 h-12 rounded-full">
              <Image
                src={
                  'https://images.unsplash.com/photo-1632850384791-99fda88d324b?q=80&w=2041&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                }
                alt="author image"
                width={100}
                height={100}
                className="w-full h-full object-cover rounded-full"
                priority={true}
              />
            </div>
          </div>

          <h3 className="text-base font-semibold text-default-900 text-center mt-3">
            {user?.name}
          </h3>
          <h5 className="text-sm text-default-600 text-center mt-1">
            {user?.email}
          </h5>
          <div className="mt-4 flex justify-center gap-3">
            {socials.map((item, index) => (
              <Link href={item.link} key={`user-card-${index}`}>
                <Image
                  src={item.icon}
                  alt="Social Icon"
                  className="w-5 h-5"
                  priority={true}
                />
              </Link>
            ))}
          </div>
          <div className="border border-dashed border-default-200 my-5"></div>
          <div className="mt-4 flex justify-between px-4">
            {socialsInfo.map((item, index) => (
              <div
                key={`user-card-${index}`}
                className="flex flex-col items-center text-center "
              >
                <h3 className="text-xs text-default-600 mb-0.5">
                  {item.title}
                </h3>
                <p className="text-base font-semibold text-default-900">
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      <Link href={`/user`}>
        <Button className="mt-3">Back</Button>
      </Link>
    </>
  );
}

export default User;
