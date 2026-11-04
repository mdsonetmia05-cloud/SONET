import { Page, Empty } from "@/components/ui";
export default function P() {
  return (
    <Page title="Roles & Permissions" intro="Roles and permissions are separate from subscription status and enrollment. A user may hold several roles at once.">
      <Empty title="No items yet" body="Nothing has been published here yet. When real records exist in the database, they will appear here — no placeholder statistics are shown." />
    </Page>
  );
}
