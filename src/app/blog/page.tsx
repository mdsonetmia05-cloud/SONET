import { Page, Grid, Card } from "@/components/ui";
export default function P() {
  return (
    <Page title="Journal & Updates" eyebrow="News & resources" intro="Latest updates, articles and educational resources from SONET.">
      <div className="empty"><strong>No posts yet</strong><p>Posts are published from the admin content module. When a real post exists in the database, it will appear here.</p></div>
    </Page>
  );
}
