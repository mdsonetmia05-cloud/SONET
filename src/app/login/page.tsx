import { Page, NotConfigured } from "@/components/ui";
import { LoginForm } from "@/components/auth-forms";
import { isAuthConfigured } from "@/lib/auth/server";

export default function P() {
  return (
    <Page title="Sign In" intro="One account for the entire SONET ecosystem.">
      {!isAuthConfigured ? <NotConfigured name="Neon Auth" /> : <LoginForm />}
    </Page>
  );
}
