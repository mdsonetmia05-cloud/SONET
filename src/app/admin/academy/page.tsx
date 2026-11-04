import { Page, Empty } from "@/components/ui";
export default function P() {
  return (
    <Page title="Academy Administration" intro="Levels, classes, academic years, boards, groups, subjects, class-subject mappings, chapters, topics, materials and curriculum versions.">
      <Empty title="No items yet" body="Nothing has been published here yet. When real records exist in the database, they will appear here — no placeholder statistics are shown." />
    </Page>
  );
}
