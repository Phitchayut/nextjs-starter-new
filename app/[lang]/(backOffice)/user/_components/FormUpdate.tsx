'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { formUserValidateSchema } from '@/lib/validation/user/userValidation';
import { useUserStore } from '@/store/user/userStore';
import { useRouter } from 'next/navigation';
import { toast as reToast } from 'react-hot-toast';
import { useEffect } from 'react';

type Props = {
  userId: string;
};

const FormUpdate = ({ userId }: Props) => {
  const router = useRouter();
  const { user,loading, fetchUser,updateUser } = useUserStore();
  useEffect(() => {
    fetchUser(parseInt(userId));
  }, [userId]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<z.infer<typeof formUserValidateSchema>>({
    resolver: zodResolver(formUserValidateSchema),
  });

  useEffect(() => {
    if (user) {
      reset({
        name: user.name,
        email: user.email,
      });
    }
  }, [user]);

  const onSubmit = async (data: z.infer<typeof formUserValidateSchema>) => {
    try {
      await updateUser({data, id: parseInt(userId)});
      await reToast.success('Successfully updated!');
      await router.push('/user');
    } catch (err) {
      reToast.error('Failed to updated user');
      console.error(err);
    }
  };

//   if (loading) return <p>Loading user...</p>;

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex flex-col gap-2">
          <Label
            htmlFor="name"
            className={cn('', {
              'text-error': errors.name,
            })}
          >
            Name
          </Label>
          <Input
            type="name"
            {...register('name')}
            placeholder="Enter your name"
            className={cn('', {
              'border-error focus:border-error': errors.name,
            })}
          />
          {errors.name && (
            <p
              className={cn('text-xs', {
                'text-error': errors.name,
              })}
            >
              {errors.name.message}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <Label
            htmlFor="email"
            className={cn('', {
              'text-error': errors.email,
            })}
          >
            Email
          </Label>
          <Input
            type="email"
            {...register('email')}
            placeholder="Enter your email"
            className={cn('', {
              'border-error focus:border-error': errors.email,
            })}
          />
          {errors.email && (
            <p
              className={cn('text-xs', {
                'text-error': errors.email,
              })}
            >
              {errors.email.message}
            </p>
          )}
        </div>
        <div className="mt-2">
          <Button color="success" type="submit" disabled={loading}>
            Submit
          </Button>
        </div>
      </form>
    </>
  );
};

export default FormUpdate;
