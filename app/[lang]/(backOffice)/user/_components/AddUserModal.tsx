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
import { toast as reToast } from 'react-hot-toast';
import { Loader2 } from 'lucide-react';

type Props = {
  closeModal: () => void;
  extraObject: any;
};

const AddUserModal = ({ extraObject, closeModal }: Props) => {
  const { createUser, loading } = useUserStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof formUserValidateSchema>>({
    resolver: zodResolver(formUserValidateSchema),
  });

  const onSubmit = async (data: z.infer<typeof formUserValidateSchema>) => {
    try {
      await createUser(data);
      await reToast.success('Successfully added!');
      closeModal();
    } catch (err) {
      reToast.error('Failed to add user');
      console.error(err);
    }
  };

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
        <div className="mt-2 space-x-2">
          <Button color="success" type="submit" disabled={loading}>
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Submit
          </Button>
          <Button color="error" onClick={closeModal}>
            Cancel
          </Button>
        </div>
      </form>
    </>
  );
};

export default AddUserModal;
