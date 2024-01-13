"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAppStore } from "@/store/store";
import { deleteObject, ref } from "firebase/storage";
import { db, storage } from "@/firebase";
import { useUser } from "@clerk/nextjs";
import { deleteDoc, doc } from "firebase/firestore";

function DeleteModal() {
  const { user } = useUser();

  const [fileId, setFileId, isDeleteModalOpen, setIsDeleteModalOpen] =
    useAppStore((state) => [
      state?.fileId,
      state?.setFileId,
      state?.isDeleteModalOpen,
      state?.setIsDeleteModalOpen,
    ]);

  const deleteFile = async () => {
    if (!user || !fileId) {
      return;
    }
    const fileRef = ref(storage, `users/${user?.id}/files/${fileId}`);
    try {
      deleteObject(fileRef).then(async () => {
        deleteDoc(doc(db, "users", user?.id!, "files", fileId)).then(() => {
          setFileId(null);
        });
      });
    } catch (err) {
      console.log("Error while deleting file", err);
    } finally {
      setIsDeleteModalOpen(false);
    }
  };

  return (
    <Dialog
      open={isDeleteModalOpen}
      onOpenChange={(isOpen: boolean) => {
        setIsDeleteModalOpen(isOpen);
      }}
    >
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Are you sure you wan to delete?</DialogTitle>

          <DialogDescription>
            This action cannot be undone. This will permanently delet your file!
          </DialogDescription>
        </DialogHeader>

        <div className="flex space-x-2 py-3">
          <Button
            size={"sm"}
            className="px-3 flex-1"
            variant={"ghost"}
            onClick={() => {
              setIsDeleteModalOpen(false);
              setFileId(null);
            }}
          >
            <span className="sr-only">Cancel</span>

            <span>Cancel</span>
          </Button>

          <Button
            type="submit"
            size={"sm"}
            className="px-3 flex-1"
            variant={"destructive"}
            onClick={() => {
              deleteFile();
            }}
          >
            <span className="sr-only">Delete</span>

            <span>Delete</span>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default DeleteModal;
