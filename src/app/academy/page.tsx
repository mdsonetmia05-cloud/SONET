// SONET Academy — Bangladesh academic LMS entry point.
// Default student language is Bengali (bn); English is also supported.
// Full structure (boards, classes, subjects, curriculum versions) lives
// in supabase/migrations and supabase/seed.sql — never hardcoded here
// beyond this navigation shell.
export default function AcademyPage() {
  return (
    <section>
      <h1>SONET Academy</h1>
      <p lang="bn">বাংলাদেশের শিক্ষার্থীদের জন্য প্রাক-প্রাথমিক থেকে দ্বাদশ শ্রেণি পর্যন্ত একাডেমিক লার্নিং প্ল্যাটফর্ম।</p>
      <p>Bangladesh academic learning: Pre-primary to Class 12, plus university
      admission, IELTS, BCS and job preparation. Boards: Dhaka, Mymensingh,
      Rajshahi, Cumilla, Jashore, Chattogram, Sylhet, Barishal, Dinajpur,
      Bangladesh Madrasah Education Board and Bangladesh Technical Education Board.</p>
      <p>Students select level, class, board, medium, academic year and group,
      then see only the subjects configured for that combination, with
      chapter → topic → lesson learning, timed exams and subject-wise progress.</p>
      <p>Curriculum versions are never overwritten — prior years, results,
      lessons and progress are preserved. See <code>docs/ACADEMY.md</code>.</p>
    </section>
  );
}
