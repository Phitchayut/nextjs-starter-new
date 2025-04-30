// store/modalStore.ts
import create from 'zustand';

interface ModalData {
  title?: string;
  bodyType?: string;
  size?: string;
  extraObject?: any;
}

interface ModalStore {
  isOpen: boolean;
  title?: string;
  bodyType?: string;
  size?: string;
  extraObject: any;
  openModal: (data: ModalData) => void;
  closeModal: () => void;
}

const useModalStore = create<ModalStore>((set) => ({
  isOpen: false,
  extraObject: {},
  size: 'md',
  bodyType: '',
  openModal: (data) =>
    set({
      isOpen: true,
      title: data.title,
      bodyType: data.bodyType,
      extraObject: data.extraObject,
      size: data.size,
    }),
  closeModal: () =>
    set({ isOpen: false, title: '', bodyType: '', extraObject: {} }),
}));

export default useModalStore;
