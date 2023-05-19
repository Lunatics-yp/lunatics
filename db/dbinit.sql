CREATE TABLE "Forums" (
  "id" SERIAL PRIMARY KEY,
  "name" VARCHAR(255) NOT NULL
);

CREATE TABLE "Topics" (
  "id" SERIAL PRIMARY KEY,
  "name" VARCHAR(255) NOT NULL,
  "forum_id" INT NOT NULL,
  FOREIGN KEY ("forum_id") REFERENCES "Forums" ("id")
);

CREATE TABLE "Users" (
  "id" SERIAL PRIMARY KEY,
  "login" VARCHAR(255),
  "nickname" VARCHAR(255),
  "avatar" VARCHAR(255)
);

CREATE TABLE "Messages" (
  "id" SERIAL PRIMARY KEY,
  "user_id" INT NOT NULL,
  "text" TEXT NOT NULL,
  "topic_id" INT,
  "parent_message_id" INT,
  FOREIGN KEY ("topic_id") REFERENCES "Topics" ("id"),
  FOREIGN KEY ("user_id") REFERENCES "Users" ("id"),
  FOREIGN KEY ("parent_message_id") REFERENCES "Messages" ("id")
);

CREATE TABLE "Reactions" (
  "id" SERIAL PRIMARY KEY,
  "name" VARCHAR(255) NOT NULL,
  "image" VARCHAR(255) NOT NULL,
  UNIQUE ("name")
);

CREATE TABLE "MessagesReactions" (
  "message_id" INT NOT NULL,
  "user_id" INT NOT NULL,
  "reaction_id" INT NOT NULL,
  PRIMARY KEY ("message_id", "user_id"),
  FOREIGN KEY ("message_id") REFERENCES "Messages" ("id"),
  FOREIGN KEY ("user_id") REFERENCES "Users" ("id"),
  FOREIGN KEY ("reaction_id") REFERENCES "Reactions" ("id")
);

CREATE TABLE "Themes" (
  "id" SERIAL PRIMARY KEY,
  "name" VARCHAR(255),
  "description" TEXT NOT NULL,
  UNIQUE ("name")
);

CREATE TABLE "UsersThemes" (
  "user_id" INT NOT NULL,
  "theme_id" INT,
  PRIMARY KEY ("user_id"),
  FOREIGN KEY ("user_id") REFERENCES "Users" ("id"),
  FOREIGN KEY ("theme_id") REFERENCES "Themes" ("id")
);

CREATE INDEX idx_forums_id ON "Forums" ("id");
CREATE INDEX idx_topics_id ON "Topics" ("id");
CREATE INDEX idx_topics_forum ON "Topics" ("forum_id");
CREATE INDEX idx_users_id ON "Users" ("id");
CREATE INDEX idx_messages_id ON "Messages" ("id");
CREATE INDEX idx_messages_topic ON "Messages" ("topic_id");
CREATE INDEX idx_messages_parent ON "Messages" ("parent_message_id");
CREATE INDEX idx_reactions_id ON "Reactions" ("id");
CREATE INDEX idx_messagesreactions_message ON "MessagesReactions" ("message_id");
CREATE INDEX idx_messagesreactions_reaction ON "MessagesReactions" ("reaction_id");
CREATE INDEX idx_themes_id ON "Themes" ("id");
CREATE INDEX idx_usersthemes_user ON "UsersThemes" ("user_id");
