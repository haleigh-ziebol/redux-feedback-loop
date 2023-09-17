-- Database should be prime_feedback

-- Switch to "prime_feedback" before making:
-- Table to store the feedback
CREATE TABLE "feedback" (
  "id" serial primary key,
  "user_email" VARCHAR(255),
  "feeling" INT not null,
  "understanding" INT not null,
  "support" INT not null,
  "comments" text,
  "flagged" boolean default false,
  "date" date not null default CURRENT_DATE
); 

-- Sample feedback item
INSERT INTO "feedback" ("user_email", "feeling", "understanding", "support", "comments")
VALUES ('test@test.com',4, 4, 5, 'Doing Great!');


CREATE TABLE "users" (
  "email" VARCHAR(255) PRIMARY KEY,
  "hashed_password" VARCHAR(255),
  "admin" boolean default false
);

--Admin
INSERT INTO "users" ("email", "hashed_password")
VALUES ('admin@admin.com', )