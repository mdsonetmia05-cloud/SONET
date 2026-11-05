import { Page, Grid, Card } from "@/components/ui";
export default function P() {
  return (
    <Page title="Divisions" eyebrow="Ecosystem" intro="Six independently manageable divisions under one parent brand — one account, one dashboard.">
      <Grid>
      <Card title="SONET AI" href="/divisions/ai"><p>AI tools & SaaS.</p></Card>
      <Card title="SONET ACADEMY" href="/divisions/academy"><p>Bangladesh academic LMS.</p></Card>
      <Card title="SONET MICROSTOCK" href="/divisions/microstock"><p>Stock training & resources.</p></Card>
      <Card title="SONET STUDIO" href="/divisions/studio"><p>Creative digital products.</p></Card>
      <Card title="SONET SKILLS" href="/divisions/skills"><p>Skills & career paths.</p></Card>
      <Card title="SONET LAB" href="/divisions/lab"><p>Research & prototypes.</p></Card>
    </Grid>
    </Page>
  );
}
