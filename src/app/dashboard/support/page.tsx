import { Page, Empty } from "@/components/ui";
export default function P() {
  return (
    <Page title="Chat with Super Admin" intro="Authenticated users only. Start a conversation, send messages and see admin replies with timestamps and unread counts. Supabase Realtime is used when configured, otherwise a secure polling fallback.">
      <Empty title="No items yet" body="Nothing has been published here yet. When real records exist in the database, they will appear here — no placeholder statistics are shown." />
    </Page>
  );
}
