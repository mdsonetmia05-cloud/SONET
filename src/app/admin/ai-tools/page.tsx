import { Page, Empty } from "@/components/ui";
export default function P() {
  return (
    <Page title="AI Tools" intro="Tool registry: provider, access level, daily limits, status and documentation. A tool is shown as functional only after its backend works.">
      <Empty title="No items yet" body="Nothing has been published here yet. When real records exist in the database, they will appear here — no placeholder statistics are shown." />
    </Page>
  );
}
