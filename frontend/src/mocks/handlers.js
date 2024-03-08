import { rest } from "msw";

const baseURL = "/api";

const handlers = [
  rest.get(`${baseURL}dj-rest-auth/user/`, (req, res, ctx) =>
    res(
      ctx.json({
        pk: 22,
        username: "Frank",
        email: "",
        first_name: "",
        last_name: "",
        profile_id: 25,
        profile_image:
          "https://res.cloudinary.com/drffvkjy6/image/upload/v1708609893/avatar_unisex_dj6lm5.webp",
      })
    )
  ),
  // mocks a request to log a user out
  rest.post(`${baseURL}dj-rest-auth/logout/`, (req, res, ctx) =>
    res(ctx.status(200))
  ),
];
export default handlers;
