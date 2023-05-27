CREATE TABLE "Users" (
  "id" INT NOT NULL PRIMARY KEY,
  "login" VARCHAR(255) NOT NULL,
  "display_name" VARCHAR(255),
  "avatar" VARCHAR(255)
);

CREATE TABLE "Forums" (
  "id" SERIAL PRIMARY KEY,
  "name" VARCHAR(255) NOT NULL,
  "user_id" INT NOT NULL,
  "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY ("user_id") REFERENCES "Users" ("id") ON DELETE CASCADE
);

CREATE TABLE "Topics" (
  "id" SERIAL PRIMARY KEY,
  "name" VARCHAR(255) NOT NULL,
  "forum_id" INT NOT NULL,
  "user_id" INT NOT NULL,
  "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY ("forum_id") REFERENCES "Forums" ("id") ON DELETE CASCADE,
  FOREIGN KEY ("user_id") REFERENCES "Users" ("id") ON DELETE CASCADE
);

CREATE TABLE "Messages" (
  "id" SERIAL PRIMARY KEY,
  "user_id" INT NOT NULL,
  "text" TEXT NOT NULL,
  "topic_id" INT NOT NULL,
  "parent_message_id" INT,
  "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY ("topic_id") REFERENCES "Topics" ("id") ON DELETE CASCADE,
  FOREIGN KEY ("user_id") REFERENCES "Users" ("id") ON DELETE CASCADE,
  FOREIGN KEY ("parent_message_id") REFERENCES "Messages" ("id") ON DELETE CASCADE
);

CREATE TABLE "MessagesReactions" (
  "message_id" INT NOT NULL,
  "user_id" INT NOT NULL,
  "reaction_id" INT NOT NULL,
  PRIMARY KEY ("message_id", "user_id"),
  FOREIGN KEY ("message_id") REFERENCES "Messages" ("id") ON DELETE CASCADE,
  FOREIGN KEY ("user_id") REFERENCES "Users" ("id") ON DELETE CASCADE
);

CREATE TABLE "UserTheme" (
  "user_id" INT NOT NULL,
  "theme_name" VARCHAR(255),
  PRIMARY KEY ("user_id"),
  FOREIGN KEY ("user_id") REFERENCES "Users" ("id"),
);

CREATE INDEX idx_forums_id ON "Forums" ("id");
CREATE INDEX idx_topics_id ON "Topics" ("id");
CREATE INDEX idx_topics_forum ON "Topics" ("forum_id");
CREATE INDEX idx_users_id ON "Users" ("id");
CREATE INDEX idx_messages_id ON "Messages" ("id");
CREATE INDEX idx_messages_topic ON "Messages" ("topic_id");
CREATE INDEX idx_messages_parent ON "Messages" ("parent_message_id");
CREATE INDEX idx_messagesreactions_message ON "MessagesReactions" ("message_id");
CREATE INDEX idx_messagesreactions_reaction ON "MessagesReactions" ("reaction_id");
CREATE INDEX idx_usersthemes_user ON "UsersThemes" ("user_id");

