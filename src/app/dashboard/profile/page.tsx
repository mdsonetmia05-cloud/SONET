import { Page, Empty } from "@/components/ui";
export default function P() {
  return (
    <Page title="My Profile" intro="Update your name, contact details and academic profile.">
      <Empty title="No items yet" body="Nothing has been published here yet. When real records exist in the database, they will appear here — no placeholder statistics are shown." />
    </Page>
  );
}
