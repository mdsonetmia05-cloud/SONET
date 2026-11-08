import Link from "next/link";
import { Page, Grid, Card, Section } from "@/components/ui";

const CATALOGUE = [
  { title: "11", body: "Education boards" },
  { title: "16", body: "Classes" },
  { title: "41", body: "Subjects" },
  { title: "206", body: "Class-subject mappings" },
];

const PATHS = [
  {
    title: "Pre-primary to Class 12",
    body: "NCTB-aligned classes, subjects, chapters, topics and lessons. General, Madrasah and Technical education, in Bangla and English Version.",
  },
  {
    title: "University Admission",
    body: "Focused preparation for university admission tests, with structured practice and timed model tests.",
  },
  {
    title: "IELTS",
    body: "English preparation for study and work abroad, with guided practice in reading, writing, listening and speaking.",
  },
  {
    title: "BCS & Job Preparation",
    body: "Government and private job preparation, with timed model tests and subject-wise progress.",
  },
];

const STEPS = [
  {
    title: "1. Choose your profile",
    body: "Level, class, board, program, medium, academic year and group.",
  },
  {
    title: "2. See only your subjects",
    body: "Subjects configured for that exact combination — compulsory, optional and group-specific.",
  },
  {
    title: "3. Learn chapter by chapter",
    body: "Notes, video and PDF materials, MCQ and creative-question practice.",
  },
  {
    title: "4. Test and track progress",
    body: "Timed exams with auto-grading, subject-wise progress, exam results, assignments and certificates.",
  },
];

const BOARDS = [
  "Dhaka",
  "Mymensingh",
  "Rajshahi",
  "Cumilla",
  "Jashore",
  "Chattogram",
  "Sylhet",
  "Barishal",
  "Dinajpur",
  "Bangladesh Madrasah Education Board",
  "Bangladesh Technical Education Board",
];

export default function AcademyPage() {
  return (
    <div>
      <Page title="SONET Academy" eyebrow="Bangladesh academic LMS" intro="A structured academic learning environment aligned to NCTB and the relevant education boards — not just English courses.">
        <p lang="bn">বাংলাদেশের শিক্ষার্থীদের জন্য প্রাক-প্রাথমিক থেকে দ্বাদশ শ্রেণি পর্যন্ত একাডেমিক লার্নিং প্ল্যাটফর্ম।</p>
        <p><Link href="/divisions/academy" className="btn">Academy overview</Link><Link href="/dashboard/courses" className="btn btn-secondary">My courses</Link></p>
      </Page>

      <Section title="Find your class" intro="Level, class, board, medium and academic year — an example selection is shown below. After sign-in, students choose their own profile and see only the subjects configured for that combination.">
        <article className="card card-soft">
          <Grid>
            <Card title="Level"><p>General</p></Card>
            <Card title="Class"><p>Class 9</p></Card>
            <Card title="Board"><p>Dhaka</p></Card>
            <Card title="Medium"><p>Bangla</p></Card>
            <Card title="Academic year"><p>2026</p></Card>
          </Grid>
          <p><Link href="/register" className="btn">Create your profile</Link><Link href="/login" className="btn btn-secondary">Sign in to continue</Link></p>
        </article>
      </Section>

      <Section title="Catalogue" intro="The seeded academic catalogue — counts from the database seed, not student or sales numbers.">
        <Grid>
          {CATALOGUE.map((item) => (
            <Card key={item.body} title={item.title}><p>{item.body}</p></Card>
          ))}
        </Grid>
      </Section>

      <Section title="Learning paths" intro="Choose the path that fits where you are now, and where you want to go next.">
        <Grid>
          {PATHS.map((item) => (
            <Card key={item.title} title={item.title}><p>{item.body}</p></Card>
          ))}
        </Grid>
      </Section>

      <Section title="How learning is organised" intro="Academic Year → Level → Class → Group → Subject → Chapter → Topic → Lesson → Materials → Assessment.">
        <Grid>
          {STEPS.map((item) => (
            <Card key={item.title} title={item.title}><p>{item.body}</p></Card>
          ))}
        </Grid>
      </Section>

      <Section title="Who it is for">
        <Grid>
          <Card title="Pre-primary to Class 12"><p>General, Madrasah and Technical education, Bangla and English Version.</p></Card>
          <Card title="Admission & IELTS"><p>University admission preparation and English learning.</p></Card>
          <Card title="BCS & Job Preparation"><p>Government and private job preparation, with timed model tests.</p></Card>
        </Grid>
        <p className="muted">Boards: {BOARDS.join(", ")}. Curriculum versions are preserved — prior years are never overwritten. No copyrighted textbook is reproduced in full; see docs/ACADEMY.md.</p>
      </Section>

      <Section title="Library — Book Finder" intro="Search millions of books from Open Library by title, author or subject — covers, authors, first published year and details, free with no account.">
        <Grid>
          <Card title="Book Finder" href="/academy/books" hrefLabel="Search books →">
            <p>Find books for study and reading: covers, authors, descriptions and links to read them on Open Library.</p>
          </Card>
        </Grid>
      </Section>

      <Section title="Start learning">
        <div className="cta-band">
          <p><strong>Ready to start?</strong></p>
          <p className="muted">Create an account, choose your class and board, and see your subjects.</p>
          <p><Link href="/register" className="btn">Get started</Link><Link href="/divisions/academy" className="btn btn-secondary">Academy overview</Link></p>
          <p className="muted">Lessons, exams and progress load from the database after sign-in. Until a database is connected, this page shows the catalogue honestly, without invented students, sales or results.</p>
        </div>
      </Section>
    </div>
  );
}
