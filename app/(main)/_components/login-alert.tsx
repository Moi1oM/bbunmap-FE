import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { signIn } from "next-auth/react";

export default function LoginPopup() {
  return (
    <AlertDialog>
      <AlertDialogTrigger>로그인이 필요해요!</AlertDialogTrigger>
      <AlertDialogContent className="items-center content-center">
        <AlertDialogHeader>
          <AlertDialogTitle>로그인 화면으로 이동하겠습니까?</AlertDialogTitle>
          <AlertDialogDescription>
            로그인 버튼을 누르면 로그인 화면으로 이동합니다.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="bg-black/10">취소</AlertDialogCancel>
          <AlertDialogAction
            className="bg-main"
            onClick={() => signIn("kakao")}
          >
            로그인
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
