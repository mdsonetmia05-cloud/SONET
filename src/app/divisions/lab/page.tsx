import { Page, Grid, Card } from "@/components/ui";
export default function P() {
  return (
    <Page title="SONET LAB" eyebrow="Research & development" intro="Where new SONET ideas are tested before they become products.">
      <Grid><Card title="Experimental SaaS"><p className="muted">Managed from the Super Admin panel and loaded from the database.</p></Card><Card title="AI Research"><p className="muted">Managed from the Super Admin panel and loaded from the database.</p></Card><Card title="Prototypes"><p className="muted">Managed from the Super Admin panel and loaded from the database.</p></Card><Card title="Beta Products"><p className="muted">Managed from the Super Admin panel and loaded from the database.</p></Card><Card title="Technology Experiments"><p className="muted">Managed from the Super Admin panel and loaded from the database.</p></Card></Grid><p style={{ marginTop: 20 }}>A tool or product in this division is shown as functional only after its backend integration works. Unconfigured integrations are labelled Not Configured.</p>
    </Page>
  );
}
