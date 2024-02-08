import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "../../components/ui/button";
import { ArrowRight } from "lucide-react";

export const RegisterButton = () => {
  const { data: session } = useSession();

  if (session) {
    return (
      <div>
        <Button size="sm" onClick={() => signOut()}>
          Sign out
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </div>
    );
  }

  return (
    <div>
      <Button size="sm" onClick={() => signIn("kakao")}>
        Sign in
        <ArrowRight className="h-4 w-4 ml-2" />
      </Button>
    </div>
  );
};
