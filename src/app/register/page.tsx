import { Page, NotConfigured } from "@/components/ui";
import { RegisterForm } from "@/components/auth-forms";
import { isAuthConfigured } from "@/lib/auth/server";

export default function P() {
  return (
    <Page title="Create your SONET account" intro="One account for the entire SONET ecosystem.">
      {!isAuthConfigured ? <NotConfigured name="Neon Auth" /> : <RegisterForm />}
    </Page>
  );
}
