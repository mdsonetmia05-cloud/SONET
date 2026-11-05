import { Page, Grid, Card } from "@/components/ui";
export default function P() {
  return (
    <Page title="SONET STUDIO" eyebrow="Creative digital products" intro="Downloadable products for creators, writers and small businesses.">
      <Grid><Card title="Digital eBooks"><p className="muted">Managed from the Super Admin panel and loaded from the database.</p></Card><Card title="Prompt Packs"><p className="muted">Managed from the Super Admin panel and loaded from the database.</p></Card><Card title="Canva Templates"><p className="muted">Managed from the Super Admin panel and loaded from the database.</p></Card><Card title="Graphics & Design Assets"><p className="muted">Managed from the Super Admin panel and loaded from the database.</p></Card><Card title="Amazon KDP resources"><p className="muted">Managed from the Super Admin panel and loaded from the database.</p></Card><Card title="Business Templates"><p className="muted">Managed from the Super Admin panel and loaded from the database.</p></Card><Card title="Downloadable Digital Products"><p className="muted">Managed from the Super Admin panel and loaded from the database.</p></Card></Grid><p style={{ marginTop: 20 }}>A tool or product in this division is shown as functional only after its backend integration works. Unconfigured integrations are labelled Not Configured.</p>
    </Page>
  );
}
