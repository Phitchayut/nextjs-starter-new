// store/modalStore.ts
import create from 'zustand';

// Type สำหรับข้อมูลที่ส่งไปใน modal
interface ModalData {
  title: string;
  content: string;
}

interface ModalStore {
  isOpen: boolean;
  size: string;
  modalData: ModalData | null;
  openModal: (data: ModalData) => void;
  closeModal: () => void;
}

const useModalStore = create<ModalStore>((set) => ({
  isOpen: false,
  modalData: null,
  size: 'md',
  openModal: (data) => set({ isOpen: true, modalData: data }),
  closeModal: () => set({ isOpen: false, modalData: null }),
}));

export default useModalStore;
