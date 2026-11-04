-- Initial catalogue only. Subject-to-class mappings are configured by
-- Admin in class_subjects / curricula — a subject listed here does NOT
-- mean it applies to every class, board or year.
insert into education_boards (name, board_type) values
 ('Dhaka','general'),('Mymensingh','general'),('Rajshahi','general'),
 ('Cumilla','general'),('Jashore','general'),('Chattogram','general'),
 ('Sylhet','general'),('Barishal','general'),('Dinajpur','general'),
 ('Bangladesh Madrasah Education Board','madrasah'),
 ('Bangladesh Technical Education Board','technical')
on conflict (name) do nothing;

insert into education_programs (name) values
 ('General Education'),('Madrasah Education'),('Technical & Vocational Education'),
 ('English Version Education'),('English Medium Supplementary Learning')
on conflict (name) do nothing;

insert into education_levels (name, display_order) values
 ('Pre-primary',1),('Primary',2),('Secondary',3),('Higher Secondary',4),
 ('University Admission',5),('English Learning',6),('IELTS',7),
 ('Job Preparation',8),('BCS Preparation',9),('Technical & Vocational',10),('Madrasah',11)
on conflict (name) do nothing;

insert into subjects (name) values
 ('Bangla'),('Bangla 1st Paper'),('Bangla 2nd Paper'),
 ('English'),('English 1st Paper'),('English 2nd Paper'),
 ('Mathematics'),('Primary Science'),('Bangladesh & Global Studies'),
 ('Religion & Moral Education'),('Physical Education'),('Arts & Crafts'),
 ('Science'),('ICT'),('Religion Studies'),('Agriculture Studies'),
 ('Home Science'),('Work & Life Oriented Education'),
 ('Physics'),('Chemistry'),('Biology'),('Higher Mathematics'),
 ('Accounting'),('Finance & Banking'),('Business Entrepreneurship'),
 ('History of Bangladesh & World Civilization'),('Geography & Environment'),
 ('Civics & Citizenship'),('Economics'),('General Science'),
 ('Business Organization & Management'),('Finance, Banking & Insurance'),
 ('Production Management & Marketing'),('Civics & Good Governance'),
 ('Sociology'),('Social Work'),('History'),('Islamic History & Culture'),
 ('Geography'),('Logic'),('Psychology')
on conflict (name) do nothing;
-- 41 subjects above. Classes (Pre-primary, Class 1-12, admission tracks)
-- and the 206 class-subject mappings from the live app are configured
-- through the Admin academic module, not hard-coded in the frontend.
