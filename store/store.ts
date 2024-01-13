import { create } from "zustand";

interface AppState {
  isDeleteModalOpen: boolean;
  setIsDeleteModalOpen: (open: boolean) => void;

  isRenameModalOpen: boolean;
  setIsRenameModalOpen: (open: boolean) => void;

  fileId: string | null;
  setFileId: (fileId: string | null) => void;

  filename: string | null;
  setFilename: (filename: string | null) => void;
}

export const useAppStore = create<AppState>()((set) => ({
  isDeleteModalOpen: false,
  setIsDeleteModalOpen: (open: boolean) =>
    set((state) => ({ isDeleteModalOpen: open })),

  isRenameModalOpen: false,
  setIsRenameModalOpen: (open: boolean) =>
    set((state) => ({ isRenameModalOpen: open })),

  fileId: null,
  setFileId: (fileId: string | null) => set((state) => ({ fileId: fileId })),

  filename: null,
  setFilename: (filename: string | null) =>
    set((state) => ({ filename: filename })),
}));
