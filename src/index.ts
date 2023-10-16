import { Hono } from "hono";
import { rwt } from "./twt";

const COUNT = 20;
const HALF = Math.floor(COUNT / 2);

const app = new Hono();
const TEST_ID = "1316793699926409219";
const TEST_LIST_ID = "";

/**
 * Routes
 * /User/likes **
 * /Timeline **
 * /List
 * /Search
 */

/**
 * Only media
 */

app.get("/", async (c) => {
  return c.text("HELLO WORLD");
});

app.get("/user/:userId/likes", async (c) => {
  const userId = c.req.param("userId");
  const userLikes = await rwt.user.likes(userId, COUNT);
  const onlyMedia = userLikes.list.filter((like) => !!like.media?.length);

  return c.json({ tweets: onlyMedia, next: userLikes.next });
});

app.get("/timeline/:userId", async (c) => {
  const userId = c.req.param("userId");
  const userTimeline = await rwt.user.timeline(userId, COUNT);
  const onlyMedia = userTimeline.list.filter((twt) => !!twt.media?.length);

  return c.json({ tweets: onlyMedia, next: userTimeline.next });
});

app.get("/list/:listId", async (c) => {});

app.get("/search", async (c) => {
  const { q } = c.req.query();
  const searchResults = await rwt.tweet.search({ words: [q] }, COUNT);
  const onlyMedia = searchResults.list.filter((res) => !!res?.media?.length);

  return c.json({ tweets: onlyMedia, next: searchResults.next });
});

export default app;
