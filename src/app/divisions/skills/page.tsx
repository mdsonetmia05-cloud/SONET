import { Page, Grid, Card } from "@/components/ui";
export default function P() {
  return (
    <Page title="SONET SKILLS" eyebrow="Skills & career" intro="Practical skills and career learning paths, from AI to freelancing.">
      <Grid><Card title="SkillVerse"><p className="muted">Managed from the Super Admin panel and loaded from the database.</p></Card><Card title="AI Skills"><p className="muted">Managed from the Super Admin panel and loaded from the database.</p></Card><Card title="English Communication"><p className="muted">Managed from the Super Admin panel and loaded from the database.</p></Card><Card title="Freelancing"><p className="muted">Managed from the Super Admin panel and loaded from the database.</p></Card><Card title="No-code Automation"><p className="muted">Managed from the Super Admin panel and loaded from the database.</p></Card><Card title="Career Development"><p className="muted">Managed from the Super Admin panel and loaded from the database.</p></Card><Card title="Professional Learning Paths"><p className="muted">Managed from the Super Admin panel and loaded from the database.</p></Card></Grid><p style={{ marginTop: 20 }}>A tool or product in this division is shown as functional only after its backend integration works. Unconfigured integrations are labelled Not Configured.</p>
    </Page>
  );
}
