import Link from "next/link";
import { Page, Grid, Card } from "@/components/ui";

const APPS = [
  {
    title: "Sweet Calculator",
    body: "A clean, intuitive calculator for everyday math. It is made for the moments when you need an answer quickly and clearly, without clutter, confusion or extra steps getting in the way.",
  },
  {
    title: "Sweet AI",
    body: "An AI-powered assistant for learning and productivity. It helps you think, plan, write and learn faster, by turning a question or an idea into a clear next step.",
  },
  {
    title: "Sweet Note",
    body: "A minimal note-taking app for quick ideas. When a thought, a line, a lesson plan or a sudden idea arrives, it gives you a quiet place to keep it before it is lost.",
  },
  {
    title: "Sweet Traffic Hero",
    body: "A traffic safety awareness educational tool. It turns an everyday, important subject into learning that is easy to understand, easy to remember and easy to share.",
  },
  {
    title: "Sweet Learning English",
    body: "An interactive English learning companion. It is built for learners who want English to feel less like a subject to fear, and more like a skill they can use every day.",
  },
  {
    title: "Sweet Spoken English",
    body: "Practice spoken English with guided exercises. Speaking improves by speaking, so this app focuses on practice, confidence and fluency, step by step.",
  },
  {
    title: "Sweet Volunteering",
    body: "Track and manage volunteer activities. Good volunteer work deserves good organisation, so this app helps keep activities, people and progress in one clear place.",
  },
  {
    title: "SDG Tracker",
    body: "Monitor Sustainable Development Goals progress. It brings big global goals closer to daily life, by helping you see, track and follow progress in a simple way.",
  },
  {
    title: "All in One",
    body: "A multi-purpose productivity suite. Instead of jumping between many small tools, it brings everyday productivity together, so your work stays in one flow.",
  },
  {
    title: "Sweet Problem Solver",
    body: "A smart problem-solving assistant. When a problem feels large or tangled, it helps you break it down, look at it clearly and move toward a practical solution.",
  },
];

const TEACHING = [
  {
    title: "English grammar coaching",
    body: "Grammar is taught as a tool for clear communication, not as a list of rules to memorise. Learners build understanding sentence by sentence, until correct English starts to feel natural.",
  },
  {
    title: "Spoken English improvement",
    body: "Speaking improves with practice, encouragement and real conversation. These sessions focus on fluency, pronunciation and confidence, so learners can speak without fear of making mistakes.",
  },
  {
    title: "Writing improvement",
    body: "Good writing starts with clear thinking. Learners are guided from simple sentences to organised paragraphs and full pieces, with attention to structure, vocabulary and voice.",
  },
  {
    title: "Student mentoring",
    body: "Mentoring is about more than a lesson. It is about listening to a learner, understanding where they are stuck, and helping the next generation of learners and thinkers find their direction.",
  },
];

const WRITING = [
  {
    title: "Creative writing mentoring",
    body: "Writing has been a lifelong companion, from poetry to motivational books. Mentoring helps new writers find their own voice, shape their ideas, and keep writing even when it feels difficult.",
  },
  {
    title: "Poetry writing workshop",
    body: "Poetry explores human emotion and motivation in a few carefully chosen words. These workshops focus on feeling, image and rhythm, and on saying something true in a beautiful way.",
  },
  {
    title: "Story writing guidance",
    body: "A good story connects people. Guidance covers character, tension, turning points and endings, so a simple idea can grow into a story that readers remember.",
  },
];

const AI_SKILLS = [
  {
    title: "AI Prompt Masterclass",
    body: "Learn the art of writing effective prompts for ChatGPT, Gemini and other AI tools. A good prompt is clear, specific and well structured, and this masterclass shows how to write one, test it, and improve it.",
  },
  {
    title: "AI Content Strategy",
    body: "Develop a content strategy powered by AI for maximum reach and engagement. It is not about posting more, it is about planning with purpose: knowing your audience, your message and the right format for each idea.",
  },
  {
    title: "AI Video Workshop",
    body: "Generate creative video concepts using AI-driven brainstorming techniques. From an initial idea to a clear concept, script direction and visual plan, the workshop turns imagination into a video people want to watch.",
  },
  {
    title: "Prompt writing, content creation and video generation",
    body: "At the heart of AI creativity are three skills: asking well, creating with purpose, and shaping ideas into video. Together they form a creative strategy that works for learning, teaching, business and storytelling.",
  },
];

const WORK = [
  {
    title: "Teaching",
    body: "Empowering students through quality English education. Teaching is at the centre of everything, because a learner who understands English gains confidence in study, work and life.",
  },
  {
    title: "Acting & Theatre",
    body: "Bringing classic literature to life through the art of performance and dramatic expression. On the stage, in productions such as Merchant of Venice, words become voice, movement and emotion, and a story becomes an experience.",
  },
  {
    title: "Writing & Author",
    body: "Exploring human emotion and motivation through writing. From poetry to motivational books, words are used to connect, inspire and spark change in the minds of readers across the globe.",
  },
  {
    title: "Volunteering",
    body: "Dedicated to making a meaningful impact through social service, education and youth empowerment. Volunteering is not a side activity, it is a way of serving communities and helping young people grow.",
  },
  {
    title: "Think & Spark",
    body: "A faceless YouTube podcast channel educating and inspiring global audiences. Through speaking on stage, capacity building training, teamwork and collaboration, Think & Spark turns ideas into conversations that teach and motivate.",
  },
  {
    title: "Adobe Stock Creator",
    body: "Creating visual content for the global marketplace. This work combines stock content strategy with AI image creation guidance and AI video generation guidance, so creators can make content that is useful, original and ready for the world.",
  },
];

const INTERESTS = [
  {
    title: "Football Player",
    body: "An active team player in university and local football matches. Football teaches teamwork, discipline and quick thinking, and it is a passion that continues beyond the classroom.",
  },
  {
    title: "Badminton Player",
    body: "Enjoys competitive and recreational badminton. It is fast, focused and full of energy, a sport that keeps both body and mind sharp.",
  },
  {
    title: "Chess Champion",
    body: "Championship certificates in strategic chess tournaments. Chess is a game of patience and planning, where every move matters and thinking ahead makes all the difference.",
  },
  {
    title: "Debate Champion",
    body: "Multiple recognitions in competitive debate events, along with public speaking. Debate builds clear thinking, confident speaking and the courage to stand behind an idea and defend it well.",
  },
];

const LANGUAGES = [
  {
    title: "Bangla",
    body: "Native. The language of home, heart and first stories, and the foundation for everything else.",
  },
  {
    title: "English",
    body: "Advanced. The language of teaching, writing and academic work, used every day in classrooms and in SONET.",
  },
  {
    title: "Hindi",
    body: "Fluent. A language for conversation, culture and connection across borders.",
  },
  {
    title: "Arabic",
    body: "Reading. A language learned for reading, opening a window to rich texts and traditions.",
  },
  {
    title: "Urdu",
    body: "Reading. A language of poetry and expression, learned for reading and appreciation.",
  },
  {
    title: "Korean",
    body: "Reading. A language learned out of curiosity and a love for learning new scripts and sounds.",
  },
];

export default function P() {
  return (
    <Page
      title="Founder"
      intro="Founder of SONET Ecosystem. One account, one platform, endless possibilities — built from teaching, writing, creativity and AI."
    >
      <section className="founder-section">
        <article
          className="card"
          style={{ display: "flex", gap: 24, flexWrap: "wrap", alignItems: "flex-start" }}
        >
          <div
            aria-hidden="true"
            className="founder-avatar"
            style={{
              width: 120,
              height: 120,
              minWidth: 120,
              borderRadius: "50%",
              background: "var(--accent-soft)",
              color: "var(--accent)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 36,
              fontWeight: 800,
            }}
          >
            SM
          </div>
          <div style={{ flex: "1 1 320px" }}>
            <p>
              <span className="badge">Founder</span>
            </p>
            <h3 style={{ fontSize: 24 }}>Md. Sonet Mia</h3>
            <p className="muted">Writer · Educator · AI Creator · Digital Thinker</p>
            <p>
              An English graduate, educator, writer and digital creator from Tangail, Bangladesh,
              blending teaching, creativity and AI tools to build educational content and
              innovative digital ideas.
            </p>
            <p>
              <a
                href="https://mdsonetmia.vercel.app"
                target="_blank"
                rel="noreferrer"
                className="btn"
              >
                View full profile →
              </a>{" "}
              <Link href="/contact" className="btn btn-secondary">
                Contact
              </Link>
            </p>
          </div>
        </article>
      </section>

      <section className="founder-section" style={{ animationDelay: "0.08s" }}>
        <h2>The Story Behind the Vision</h2>
        <p>
          From a young age, I have been captivated by the beauty of language and the power of
          stories. Growing up in Tangail, Bangladesh, my curiosity led me through the worlds of
          literature, teaching and technology, and each world opened another door.
        </p>
        <p>
          As an English graduate, I combine my love for language with modern digital tools,
          creating educational content, exploring AI-driven creativity, and mentoring the next
          generation of learners and thinkers. My dedication to community service shapes
          everything I do, from volunteering to building applications that serve others.
        </p>
        <p>
          That is why SONET exists. It is not just a platform, it is an ecosystem where learning,
          creativity, tools and technology live together, so a learner, a teacher, a writer and a
          creator can all find their place under one account.
        </p>
      </section>

      <section className="founder-section" style={{ animationDelay: "0.16s" }}>
        <h2>Academic Journey</h2>
        <p>
          A passion for language, communication and lifelong learning. Studying English was never
          only about grammar or literature, it was about understanding how people think, feel and
          connect through words. That passion continues today, in every course, every lesson and
          every piece of content SONET creates.
        </p>
      </section>

      <section className="founder-section" style={{ animationDelay: "0.24s" }}>
        <h2>Programs & Applications</h2>
        <p className="muted">
          Useful educational and productivity applications that make learning easier and smarter.
          Each one started with a simple, everyday need, and grew into a tool that anyone can use.
        </p>
        <div className="founder-grid">
          <Grid>
            {APPS.map((app) => (
              <Card key={app.title} title={app.title}>
                <p>{app.body}</p>
              </Card>
            ))}
          </Grid>
        </div>
      </section>

      <section className="founder-section" style={{ animationDelay: "0.32s" }}>
        <h2>Teaching Services</h2>
        <p className="muted">
          Empowering students through quality English education. Teaching here is personal,
          practical and patient, because every learner learns at a different pace.
        </p>
        <div className="founder-grid">
          <Grid>
            {TEACHING.map((item) => (
              <Card key={item.title} title={item.title}>
                <p>{item.body}</p>
              </Card>
            ))}
          </Grid>
        </div>
      </section>

      <section className="founder-section" style={{ animationDelay: "0.4s" }}>
        <h2>Writing & Author</h2>
        <p className="muted">
          Words that inspire. Writing has been a lifelong companion, and through it, human emotion
          and motivation are explored in poetry, stories and motivational books.
        </p>
        <div className="founder-grid">
          <Grid>
            {WRITING.map((item) => (
              <Card key={item.title} title={item.title}>
                <p>{item.body}</p>
              </Card>
            ))}
          </Grid>
        </div>
        <p>
          Book a session for English guidance, or book a writing consultation, and start with a
          conversation about where you are and where your writing wants to go.
        </p>
      </section>

      <section className="founder-section" style={{ animationDelay: "0.48s" }}>
        <h2>AI-Powered Creativity</h2>
        <p className="muted">
          Harnessing artificial intelligence to build, create and innovate. AI is treated here as
          a creative partner, not a replacement for thinking, and the focus is always on clear
          ideas, good prompts and meaningful output.
        </p>
        <div className="founder-grid">
          <Grid>
            {AI_SKILLS.map((item) => (
              <Card key={item.title} title={item.title}>
                <p>{item.body}</p>
              </Card>
            ))}
          </Grid>
        </div>
      </section>

      <section className="founder-section" style={{ animationDelay: "0.56s" }}>
        <h2>Work & Projects</h2>
        <p className="muted">
          Recognition and growth, dedicated to continuous learning, service and excellence.
        </p>
        <div className="founder-grid">
          <Grid>
            {WORK.map((item) => (
              <Card key={item.title} title={item.title}>
                <p>{item.body}</p>
              </Card>
            ))}
          </Grid>
        </div>
      </section>

      <section className="founder-section" style={{ animationDelay: "0.64s" }}>
        <h2>Beyond the Classroom — Interests & Sports</h2>
        <p className="muted">
          From creative pursuits to competitive sports, moments of passion and growth. Life beyond
          the classroom is where teamwork, strategy and confidence are practised in a different way.
        </p>
        <div className="founder-grid">
          <Grid>
            {INTERESTS.map((item) => (
              <Card key={item.title} title={item.title}>
                <p>{item.body}</p>
              </Card>
            ))}
          </Grid>
        </div>
      </section>

      <section className="founder-section" style={{ animationDelay: "0.72s" }}>
        <h2>Languages</h2>
        <p className="muted">
          Language proficiency, built over years of learning, teaching and curiosity. Each language
          opens a new way of seeing the world.
        </p>
        <div className="founder-grid">
          <Grid>
            {LANGUAGES.map((item) => (
              <Card key={item.title} title={item.title}>
                <p>{item.body}</p>
              </Card>
            ))}
          </Grid>
        </div>
      </section>

      <section className="founder-section" style={{ animationDelay: "0.8s" }}>
        <h2>How the founder&apos;s work shapes SONET</h2>
        <div className="founder-grid">
          <Grid>
            <Card title="Academy — Teaching first">
              <p>
                English teaching and student mentoring shape SONET Academy, from Pre-primary to
                Class 12 and on to admission, IELTS, BCS and job preparation. The classroom
                experience becomes the design for the platform: clear lessons, guided practice
                and mentoring that does not leave a learner alone.
              </p>
            </Card>
            <Card title="AI — Creator-led tools">
              <p>
                AI prompt craft, content creation and video ideas shape SONET AI, built for
                learners and creators, not just for experts. The tools are made to be approachable,
                so a first-time user can start creating with confidence.
              </p>
            </Card>
            <Card title="Microstock — Real contributor work">
              <p>
                Stock content creation and contributor guidance shape SONET Microstock, grounded
                in practical, marketplace-ready work. It is about learning by doing, and about
                creating content the world can actually use.
              </p>
            </Card>
            <Card title="Studio — Writing that connects">
              <p>
                Poetry, stories and motivational writing shape SONET Studio, where words are used
                to connect, inspire and spark change. Studio is where creativity becomes a product,
                a book, a pack or a template that someone else can learn from.
              </p>
            </Card>
          </Grid>
        </div>
      </section>

      <section className="founder-section" style={{ animationDelay: "0.88s" }}>
        <h2>Let&apos;s Work Together</h2>
        <p>
          If you want to learn English, improve your writing, explore AI creativity, or build
          something with SONET, the best place to start is a conversation. Book a session, get in
          touch, and let us turn an idea into a clear, practical next step.
        </p>
        <p>
          Photos, full biography and gallery are on the personal site:{" "}
          <a href="https://mdsonetmia.vercel.app" target="_blank" rel="noreferrer">
            mdsonetmia.vercel.app
          </a>
        </p>
      </section>
    </Page>
  );
}
