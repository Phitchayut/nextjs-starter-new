import React from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

type Props = {
  closeModal: () => void
};

const ConfirmModal = ({closeModal}: Props) => {
  return (
    <>
      <div className="mt-8 flex items-center space-x-3 justify-center">
        <Button color="error" variant="outline" onClick={closeModal}>
          Cancel
        </Button>
        <Button type="submit" color="success">
          OK
        </Button>
      </div>
    </>
  );
};

export default ConfirmModal;
