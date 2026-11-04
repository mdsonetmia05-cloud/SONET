import { Page, Empty } from "@/components/ui";
export default function P() {
  return (
    <Page title="Marketplace" intro="Digital products, courses, templates, eBooks and prompt packs — all manageable from Super Admin.">
      <p>Search and filtering are applied to the real product catalogue once Supabase is configured. Prices are recalculated server-side at checkout; browser totals are never trusted.</p>
    </Page>
  );
}
