import { Page, Empty } from "@/components/ui";
export default function P() {
  return (
    <Page title="Support & Chat Management" intro="Admin inbox: reply to conversations, change status and add internal notes. Only authorized admins can reply.">
      <Empty title="No items yet" body="Nothing has been published here yet. When real records exist in the database, they will appear here — no placeholder statistics are shown." />
    </Page>
  );
}
