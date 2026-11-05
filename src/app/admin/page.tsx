import { Page, Grid, Card, Empty } from "@/components/ui";
const LINKS: [string, string][] = [
  ["Users", "/admin/users"], ["Roles & Permissions", "/admin/roles"], ["Divisions", "/admin/divisions"],
  ["Products", "/admin/products"], ["AI Tools", "/admin/ai-tools"], ["Academy", "/admin/academy"],
  ["Courses", "/admin/courses"], ["Orders", "/admin/orders"], ["Payments", "/admin/payments"],
  ["Subscriptions", "/admin/subscriptions"], ["Coupons", "/admin/coupons"], ["Content", "/admin/content"],
  ["Support & Chat", "/admin/support"], ["Analytics", "/admin/analytics"], ["Audit Logs", "/admin/audit-logs"],
  ["Integrations", "/admin/integrations"], ["Settings", "/admin/settings"],
];
export default function AdminPage() {
  return (
    <Page title="Super Admin" eyebrow="Control centre" intro="Manage the whole ecosystem from one place. Statistics below come from real database counts only — zero or an empty state when data is unavailable, never fabricated figures.">
      <Grid>{LINKS.map(([t, h]) => <Card key={h} title={t} href={h} />)}</Grid>
      <div style={{ marginTop: 24 }}><Empty title="No statistics yet" body="Admin overview statistics appear once the database is connected and real records exist. Destructive actions ask for confirmation and are recorded in audit logs." /></div>
    </Page>
  );
}
