import { SignInButton, SignedOut, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import ThemeToggler from "./ThemeToggler";

function Header() {
  return (
    <header className="flex items-center justify-between">
      <Link href={"/"} className="flex items-center space-x-2">
        <div className="bg-[#0160fe] w-fit">
          <Image
            src="https://avatars.slack-edge.com/2019-04-15/608395662292_64108f1a3c1056b0d3c7_512.png"
            alt="logo"
            height={50}
            width={50}
          />
        </div>

        <h1 className="font-bold text-xl">Dropbox</h1>
      </Link>

      <div className="px-5 flex space-x-2 items-center">
        <ThemeToggler />

        <UserButton afterSignOutUrl="/" />

        <SignedOut>
          <SignInButton afterSignInUrl="/dashboard" mode="modal" />
        </SignedOut>
      </div>
    </header>
  );
}

export default Header;
