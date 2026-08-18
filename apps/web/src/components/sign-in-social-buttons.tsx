import { SiGithub, SiGoogle } from "@icons-pack/react-simple-icons";
import { authClient } from "@repo/auth/auth-client";
import { Button } from "@repo/ui/components/button";
import { toast } from "@repo/ui/components/toast";
import { useMutation } from "@tanstack/react-query";

interface SocialLoginButtonProps {
  provider: string;
  icon: React.ReactNode;
  disabled?: boolean;
  callbackURL: string;
}

function SignInSocialButton(props: SocialLoginButtonProps) {
  const providerLabel =
    props.provider === "github"
      ? "GitHub"
      : props.provider.charAt(0).toUpperCase() + props.provider.slice(1);

  const mutation = useMutation({
    mutationFn: async () =>
      await authClient.signIn.social(
        {
          provider: props.provider,
          callbackURL: props.callbackURL,
        },
        {
          onError: ({ error }) => {
            toast.add({
              type: "error",
              description: error.message || `An error occurred during ${providerLabel} sign-in.`,
            });
          },
        },
      ),
  });

  return (
    <Button
      variant="outline"
      className="w-full"
      size="lg"
      type="button"
      disabled={mutation.isSuccess || mutation.isPending || props.disabled}
      onClick={() => mutation.mutate()}
    >
      {props.icon}
      Continue with {providerLabel}
    </Button>
  );
}

export function SocialSignInButtons({
  callbackURL,
  disabled,
}: Pick<SocialLoginButtonProps, "callbackURL" | "disabled">) {
  return (
    <>
      <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:border-t after:border-border">
        <span className="relative z-10 bg-background px-2 text-muted-foreground">Or</span>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <SignInSocialButton
          provider="github"
          callbackURL={callbackURL}
          disabled={disabled}
          icon={<SiGithub className="size-4" />}
        />
        <SignInSocialButton
          provider="google"
          callbackURL={callbackURL}
          disabled={disabled}
          icon={<SiGoogle className="size-4" />}
        />
      </div>
    </>
  );
}
