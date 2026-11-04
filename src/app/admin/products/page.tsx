import { Page, Empty } from "@/components/ui";
export default function P() {
  return (
    <Page title="Products" intro="Add, edit, duplicate, publish/unpublish, feature and archive products. Prices are managed here, never trusted from the browser.">
      <Empty title="No items yet" body="Nothing has been published here yet. When real records exist in the database, they will appear here — no placeholder statistics are shown." />
    </Page>
  );
}
