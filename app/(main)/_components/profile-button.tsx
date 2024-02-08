"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSession, signIn, signOut } from "next-auth/react";

export const ProfileButton = () => {
  const { data: session } = useSession();

  if (!session) {
    return (
      <Avatar
        className="h-7 w-7 cursor-pointer"
        onClick={() => signIn("kakao")}
      >
        <AvatarImage src="./user-fill.png" alt="@user" />
        <AvatarFallback>User</AvatarFallback>
      </Avatar>
    );
  }

  console.log(session);

  return (
    <Avatar className="h-7 w-7 cursor-pointer" onClick={() => signOut()}>
      <AvatarImage src={session.user!.image!} alt="@user" />
      <AvatarFallback>{session.user!.name}</AvatarFallback>
    </Avatar>
  );
};
