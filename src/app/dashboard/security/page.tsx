import { Page, Empty } from "@/components/ui";
export default function P() {
  return (
    <Page title="Account Security" intro="Change password, review sessions and security alerts. Ordinary users cannot grant themselves admin roles.">
      <Empty title="No items yet" body="Nothing has been published here yet. When real records exist in the database, they will appear here — no placeholder statistics are shown." />
    </Page>
  );
}
