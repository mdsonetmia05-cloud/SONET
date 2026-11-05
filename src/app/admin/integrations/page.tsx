import { Page, Empty } from "@/components/ui";
export default function P() {
  return (
    <Page title="Integrations" intro="Neon database, Neon Auth, AI providers (Gemini, Groq, Mistral) and payment gateways (bKash, Nagad, Card) — each clearly Not Configured until credentials exist and are tested.">
      <Empty title="No items yet" body="Nothing has been published here yet. When real records exist in the database, they will appear here — no placeholder statistics are shown." />
    </Page>
  );
}
