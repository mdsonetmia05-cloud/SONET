import { Page, Grid, Card } from "@/components/ui";
export default function P() {
  return (
    <Page title="Pricing" eyebrow="Plans" intro="Free, Basic, Pro, Premium and Custom plans. Plan features and limits are configured in the admin subscription module — no price is presented as a live offer until it is configured there.">
      <Grid>
      <Card title="Free"><p>Public and free resources. Start with one SONET account.</p></Card>
      <Card title="Basic"><p>Core tools and learning, with standard limits.</p></Card>
      <Card title="Pro"><p>Higher AI limits, premium products and priority support.</p></Card>
      <Card title="Premium"><p>Full eligible premium access across divisions.</p></Card>
      <Card title="Custom"><p>For teams, schools and organisations — configured on request.</p></Card>
    </Grid><p className="muted" style={{marginTop:20}}>Manual payment verification applies where a gateway is Not Configured. Renewal, upgrade, downgrade and cancellation are managed from Dashboard → Subscriptions.</p>
    </Page>
  );
}
