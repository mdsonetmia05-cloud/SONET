import { Page, Empty } from "@/components/ui";
export default function P() {
  return (
    <Page title="My AI Tools" intro="Available tools, recently used tools, usage and daily limits — from real usage records only.">
      <Empty title="No items yet" body="Nothing has been published here yet. When real records exist in the database, they will appear here — no placeholder statistics are shown." />
    </Page>
  );
}
