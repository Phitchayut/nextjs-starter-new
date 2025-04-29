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

const ModalLayout: React.FC = () => {
  const { isOpen, modalData, closeModal, size } = useModalStore();

  // ถ้าไม่มีข้อมูลใน modalData จะตั้งค่าเป็นค่าเริ่มต้น
  const title = modalData?.title || 'Default Title';
  const content = modalData?.content || 'Default content';

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
      >
        <DialogHeader>
          <DialogTitle className="text-base font-medium text-default-700 text-center">
            {title}
          </DialogTitle>
        </DialogHeader>
        <ConfirmModal closeModal={closeModal} />
      </DialogContent>
    </Dialog>
  );
};

export default ModalLayout;
