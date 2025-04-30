'use client';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import useModalStore from '@/store/modal/modalStore';
import { Button } from '../ui/button';
import ConfirmModal from './ConfirmModal';
import { MODAL_BODY_TYPES } from '@/utils/Constant';
import AddUserModal from '@/app/[lang]/(backOffice)/user/_components/AddUserModal';
import UpdateUserModal from '@/app/[lang]/(backOffice)/user/_components/UpdateUserModal';

const ModalLayout: React.FC = () => {
  const { isOpen, title, extraObject, bodyType, closeModal, size } =
    useModalStore();
  return (
    <Dialog open={isOpen}>
      <DialogContent
        size={
          size as
            | 'md'
            | 'xs'
            | 'sm'
            | 'lg'
            | 'xl'
            | '2xl'
            | '3xl'
            | '4xl'
            | '5xl'
            | 'full'
            | undefined
        }
        onOpenAutoFocus={(event) => event.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle className="text-base font-medium text-default-700 text-center">
            {title}
          </DialogTitle>
        </DialogHeader>
        {
          {
            [MODAL_BODY_TYPES.CONFIRMATION]: (
              <ConfirmModal extraObject={extraObject} closeModal={closeModal} />
            ),
            [MODAL_BODY_TYPES.ADD_USER]: (
              <AddUserModal extraObject={extraObject} closeModal={closeModal} />
            ),
            [MODAL_BODY_TYPES.UPDATE_USER]: (
              <UpdateUserModal extraObject={extraObject} closeModal={closeModal} />
            ),
          }[bodyType ?? '']
        }
      </DialogContent>
    </Dialog>
  );
};

export default ModalLayout;
