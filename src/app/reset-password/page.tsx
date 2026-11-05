import { Page, NotConfigured } from "@/components/ui";
import { ResetForm } from "@/components/auth-forms";
import { isAuthConfigured } from "@/lib/auth/server";

export default function P() {
  return (
    <Page title="Reset password" intro="One account for the entire SONET ecosystem.">
      {!isAuthConfigured ? <NotConfigured name="Neon Auth" /> : <ResetForm />}
    </Page>
  );
}
