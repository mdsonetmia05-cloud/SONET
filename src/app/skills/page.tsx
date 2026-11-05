import { Page, Grid, Card } from "@/components/ui";
export default function P() {
  return (
    <Page title="SONET SKILLS" eyebrow="Skills & career" intro="Practical skills and career learning paths — SkillVerse, AI skills, English communication, freelancing and no-code automation.">
      <Grid>
      <Card title="SkillVerse"><p>Structured learning paths across AI, English and career skills.</p></Card>
      <Card title="AI Skills"><p>Prompting, content strategy and AI-assisted creation.</p></Card>
      <Card title="English Communication"><p>Grammar, spoken English and writing for study and work.</p></Card>
      <Card title="Freelancing"><p>Finding work, pricing, delivery and client communication.</p></Card>
      <Card title="No-code Automation"><p>Build workflows without writing code, step by step.</p></Card>
      <Card title="Career Development"><p>Portfolios, interviews and professional growth.</p></Card>
    </Grid>
    </Page>
  );
}
