import Link from "next/link";
import { Page, Grid, Card, Section } from "@/components/ui";
export default function AcademyPage() {
  return (
    <div>
      <Page title="SONET Academy" eyebrow="Bangladesh academic LMS" intro="A structured academic learning environment aligned to NCTB and the relevant education boards — not just English courses.">
        <p lang="bn">বাংলাদেশের শিক্ষার্থীদের জন্য প্রাক-প্রাথমিক থেকে দ্বাদশ শ্রেণি পর্যন্ত একাডেমিক লার্নিং প্ল্যাটফর্ম।</p>
        <p><Link href="/divisions/academy" className="btn">Academy overview</Link><Link href="/dashboard/courses" className="btn btn-secondary">My courses</Link></p>
      </Page>
      <Section title="How learning is organised" intro="Academic Year → Level → Class → Group → Subject → Chapter → Topic → Lesson → Materials → Assessment.">
        <Grid>
          <Card title="Choose your profile"><p>Level, class, board, program, medium, academic year and group.</p></Card>
          <Card title="See only your subjects"><p>Subjects configured for that exact combination — compulsory, optional and group-specific.</p></Card>
          <Card title="Learn chapter by chapter"><p>Notes, video and PDF materials, MCQ and creative-question practice.</p></Card>
          <Card title="Track progress"><p>Subject-wise progress, exam results, assignments and certificates.</p></Card>
        </Grid>
      </Section>
      <Section title="Who it is for">
        <Grid>
          <Card title="Pre-primary to Class 12"><p>General, Madrasah and Technical education, Bangla and English Version.</p></Card>
          <Card title="Admission & IELTS"><p>University admission preparation and English learning.</p></Card>
          <Card title="BCS & Job Preparation"><p>Government and private job preparation, with timed model tests.</p></Card>
        </Grid>
        <p className="muted">Boards: Dhaka, Mymensingh, Rajshahi, Cumilla, Jashore, Chattogram, Sylhet, Barishal, Dinajpur, Bangladesh Madrasah Education Board and Bangladesh Technical Education Board. Curriculum versions are preserved — prior years are never overwritten. No copyrighted textbook is reproduced in full; see docs/ACADEMY.md.</p>
      </Section>
    </div>
  );
}
