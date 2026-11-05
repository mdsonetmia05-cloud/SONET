import { Page } from "@/components/ui";
export default function P() {
  return (
    <Page title="Contact" eyebrow="Get in touch" intro="Contact SONET support. Authenticated users can also use Dashboard → Support to chat with Super Admin.">
      <p>For account, order or course help, include your order or enrollment reference so support can find your record quickly.</p>
    <p><strong>Support:</strong> Dashboard → Support (chat with Super Admin, authenticated users only)<br />
    <strong>Founder:</strong> <a href="/about">Meet the Founder</a> · <a href="https://mdsonetmia.vercel.app">mdsonetmia.vercel.app</a></p>
    <p className="muted">Email delivery is Not Configured until a provider is added, so this page does not pretend a contact form has been sent.</p>
    </Page>
  );
}
