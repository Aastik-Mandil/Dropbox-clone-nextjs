import React from "react";
import { auth } from "@clerk/nextjs";
import Dropzone from "@/components/Dropzone";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase";
import { FileType } from "@/typings";

async function Dashboard() {
  const { userId } = auth();

  const docResults = await getDocs(collection(db, "users", userId, "files"));
  const skeletonFiles: FileType[] = docResults.docs?.map((doc) => ({
    id: doc?.id,
    filename: doc.data().filename || doc?.id,
    timestamp: new Date(doc.data()?.timestamp?.seconds * 1000) || undefined,
    fullName: doc.data().fullName,
    downloadURL: doc.data().downloadURL,
    type: doc.data().type,
    size: doc.data().size,
  }));

  return (
    <div className="">
      <Dropzone />

      <section className="">
        <h2 className="">All Files</h2>

        <div className=""></div>
      </section>
    </div>
  );
}

export default Dashboard;
