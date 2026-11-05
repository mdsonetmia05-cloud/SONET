import { Page } from "@/components/ui";
import { FAQS } from "@/lib/catalogue";
export default function Faq() {
  return (
    <Page title="Frequently Asked Questions" eyebrow="Help" intro="Answers about one account, payments, Academy and AI tools. Admin-managed FAQs replace this list once the CMS is connected.">
      {FAQS.map((f) => <details key={f.q}><summary>{f.q}</summary><p style={{ marginTop: 10 }}>{f.a}</p></details>)}
    </Page>
  );
}
