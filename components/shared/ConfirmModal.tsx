import React from 'react';
import { Button } from '@/components/ui/button';
import { CONFIRMATION_MODAL_CLOSE_TYPES } from '@/utils/Constant';
import { useUserStore } from '@/store/user/userStore';
import { toast as reToast } from 'react-hot-toast';

type Props = {
  closeModal: () => void;
  extraObject: any;
};

const ConfirmModal = ({ extraObject, closeModal }: Props) => {
  const { message, type } = extraObject;
  const { deleteUser } = useUserStore();
  const processWithYes = async () => {
    closeModal();
    if (type === CONFIRMATION_MODAL_CLOSE_TYPES.DELETE_USER) {
      await deleteUser(extraObject.id);
      await reToast.success('Successfully Deleted!');
    }
  };

  return (
    <>
      <h3 className="text-2xl text-center">Are you sure ?</h3>
      <div className="flex items-center space-x-3 justify-center">
        <Button color="error" variant="outline" onClick={closeModal}>
          Cancel
        </Button>
        <Button type="submit" color="success" onClick={processWithYes}>
          OK
        </Button>
      </div>
    </>
  );
};

export default ConfirmModal;
