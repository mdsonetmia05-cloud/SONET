import { Page, Grid, Card } from "@/components/ui";
export default function P() {
  return (
    <Page title="SONET MICROSTOCK" eyebrow="Stock content & training" intro="Contributor training and portfolio education for Adobe Stock, Shutterstock and Freepik.">
      <Grid><Card title="Microstock training"><p className="muted">Managed from the Super Admin panel and loaded from the database.</p></Card><Card title="Adobe Stock learning"><p className="muted">Managed from the Super Admin panel and loaded from the database.</p></Card><Card title="Shutterstock learning"><p className="muted">Managed from the Super Admin panel and loaded from the database.</p></Card><Card title="Freepik contributor resources"><p className="muted">Managed from the Super Admin panel and loaded from the database.</p></Card><Card title="Metadata & SEO"><p className="muted">Managed from the Super Admin panel and loaded from the database.</p></Card><Card title="AI image generation workflow"><p className="muted">Managed from the Super Admin panel and loaded from the database.</p></Card><Card title="Contributor account management education"><p className="muted">Managed from the Super Admin panel and loaded from the database.</p></Card><Card title="Course enrollment & student progress"><p className="muted">Managed from the Super Admin panel and loaded from the database.</p></Card></Grid><p style={{ marginTop: 20 }}>A tool or product in this division is shown as functional only after its backend integration works. Unconfigured integrations are labelled Not Configured.</p>
    </Page>
  );
}
