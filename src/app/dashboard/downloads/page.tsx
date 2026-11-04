import { Page, Empty } from "@/components/ui";
export default function P() {
  return (
    <Page title="My Downloads" intro="Secure downloads for purchased products only. Paid files are served via signed, private storage URLs.">
      <Empty title="No items yet" body="Nothing has been published here yet. When real records exist in the database, they will appear here — no placeholder statistics are shown." />
    </Page>
  );
}
