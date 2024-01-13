"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAppStore } from "@/store/store";
import { db } from "@/firebase";
import { useUser } from "@clerk/nextjs";
import { doc, updateDoc } from "firebase/firestore";
import { Input } from "./ui/input";

function RenameModal() {
  const { user } = useUser();

  const [
    fileId,
    setFileId,
    filename,
    setFilename,
    isRenameModalOpen,
    setIsRenameModalOpen,
  ] = useAppStore((state) => [
    state?.fileId,
    state?.setFileId,
    state?.filename,
    state?.setFilename,
    state?.isRenameModalOpen,
    state?.setIsRenameModalOpen,
  ]);

  const [input, setInput] = useState("");

  const renameFile = async () => {
    if (user || !fileId) {
      return;
    }
    await updateDoc(doc(db, "users", user!?.id!, "files", fileId), {
      filename: input,
    });
    setIsRenameModalOpen(false);
    setFileId(null);
    setFilename(null);
    setInput("");
  };

  return (
    <Dialog
      open={isRenameModalOpen}
      onOpenChange={(isOpen: boolean) => {
        setIsRenameModalOpen(isOpen);
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="pb-2">Rename the File</DialogTitle>

          <Input
            id="link"
            defaultValue={filename || ""}
            onChange={(e) => setInput(e.target.value)}
            onKeyDownCapture={(e) => {
              if (e?.key === "Enter") {
                renameFile();
              }
            }}
          />

          <div className="flex space-x-2 py-3">
            <Button
              size={"sm"}
              className="px-3 flex-1"
              variant={"ghost"}
              onClick={() => {
                setIsRenameModalOpen(false);
                setFileId(null);
                setFilename(null);
                setInput("");
              }}
            >
              <span className="sr-only">Cancel</span>

              <span>Cancel</span>
            </Button>

            <Button
              type="submit"
              size={"sm"}
              className="px-3 flex-1"
              onClick={() => {
                renameFile();
              }}
            >
              <span className="sr-only">Rename</span>

              <span>Rename</span>
            </Button>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default RenameModal;
