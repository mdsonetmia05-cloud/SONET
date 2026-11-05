import { Page, Grid, Card, Empty } from "@/components/ui";
const LINKS: [string, string, string][] = [
  ["My Profile", "/dashboard/profile", "Account, contact and academic profile."],
  ["My AI Tools", "/dashboard/ai-tools", "Tools, usage and daily limits."],
  ["My Courses", "/dashboard/courses", "Enrolled courses and progress."],
  ["My Products", "/dashboard/products", "Purchased and activated products."],
  ["My Orders", "/dashboard/orders", "Order and payment status, kept separate."],
  ["My Downloads", "/dashboard/downloads", "Secure downloads for purchased products."],
  ["My Subscriptions", "/dashboard/subscriptions", "Plans, renewal and cancellation."],
  ["Notifications", "/dashboard/notifications", "Course, payment and admin updates."],
  ["Chat with Super Admin", "/dashboard/support", "Support conversations and replies."],
  ["Account Security", "/dashboard/security", "Password, sessions and alerts."],
  ["Settings", "/dashboard/settings", "Language and notification preferences."],
];
export default function DashboardPage() {
  return (
    <Page title="My Dashboard" eyebrow="One account" intro="Welcome to SONET. Everything below shows real database information once you are signed in and Supabase is configured — with honest empty states until then.">
      <Grid>{LINKS.map(([t, h, d]) => <Card key={h} title={t} href={h}><p className="muted">{d}</p></Card>)}</Grid>
      <div style={{ marginTop: 24 }}><Empty title="No activity yet" body="When you enrol in a course, buy a product, use an AI tool or receive a notification, your recent activity will appear here. Nothing is invented to fill this space." /></div>
    </Page>
  );
}
