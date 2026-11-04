import { Page, Empty } from "@/components/ui";
export default function P() {
  return (
    <Page title="Notifications" intro="System, course, payment, order, subscription and admin-message notifications. Mark all as read is available once connected.">
      <Empty title="No items yet" body="Nothing has been published here yet. When real records exist in the database, they will appear here — no placeholder statistics are shown." />
    </Page>
  );
}
