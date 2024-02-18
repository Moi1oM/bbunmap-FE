"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSession, signIn, signOut } from "next-auth/react";

export const ProfileButton = ({ size = "sm" }) => {
  const { data: session } = useSession();

  let profileImageUrl = session?.user?.image;
  console.log("before", profileImageUrl);
  if (profileImageUrl && profileImageUrl.startsWith("http://")) {
    profileImageUrl = profileImageUrl.replace("http://", "https://");
  }
  console.log("after", profileImageUrl);

  const avatarSize = size === "lg" ? "h-20 w-20" : "h-7 w-7";

  if (!session) {
    return (
      <Avatar
        className={`${avatarSize} cursor-pointer`}
        onClick={() => signIn("kakao")}
      >
        <AvatarImage src="./user-fill.png" alt="@user" />
        <AvatarFallback>User</AvatarFallback>
      </Avatar>
    );
  }

  return (
    <Avatar
      className={`${avatarSize} cursor-pointer`}
      onClick={() => signOut()}
    >
      <AvatarImage src={profileImageUrl!} alt="@user" />
      <AvatarFallback>{session.user!.name}</AvatarFallback>
    </Avatar>
  );
};
