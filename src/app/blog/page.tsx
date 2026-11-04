import { Page, Empty } from "@/components/ui";
export default function P() {
  return (
    <Page title="Journal & Updates" intro="Latest updates, articles and educational resources from SONET.">
      <Empty title="No items yet" body="Nothing has been published here yet. When real records exist in the database, they will appear here — no placeholder statistics are shown." />
    </Page>
  );
}
