import { Page, Empty } from "@/components/ui";
export default function P() {
  return (
    <Page title="Pricing" intro="Free, Basic, Pro, Premium and Custom plans. Plan features and limits are configured in the admin subscription module.">
      <p>Until subscription plans are configured in the database, no price is presented as a live offer. Manual payment verification applies where a gateway is Not Configured.</p>
    </Page>
  );
}
