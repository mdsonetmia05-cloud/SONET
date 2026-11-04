import { Page, Empty } from "@/components/ui";
export default function P() {
  return (
    <Page title="Payments" intro="Manual payment verification: verify a transaction ID, then grant the entitlement. Gateway callbacks are verified server-side when a gateway is configured.">
      <Empty title="No items yet" body="Nothing has been published here yet. When real records exist in the database, they will appear here — no placeholder statistics are shown." />
    </Page>
  );
}
