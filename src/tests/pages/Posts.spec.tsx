import { render, screen } from "@testing-library/react";
import { mocked } from "ts-jest/utils";
import { getPrismicClient } from "../../services/prismic";
import Posts, { getStaticProps } from "../../pages/posts";

jest.mock("../../services/prismic");

const posts = [
  {
    slug: "my-new-post",
    title: "My new post",
    excerpt: "Post excerpt",
    updatedAt: "March, 10",
  },
];

describe("Posts page", () => {
  it("should render correctly", () => {
    render(<Posts posts={posts} />);

    expect(screen.getByText(posts[0].title)).toBeInTheDocument();
  });

  it("should load initial data", async () => {
    const getPrismicClientMocked = mocked(getPrismicClient);
    getPrismicClientMocked.mockReturnValueOnce({
      query: jest.fn().mockResolvedValueOnce({
        results: [
          {
            uid: "my-new-post",
            data: {
              title: [{ type: "heading", text: "My new post" }],
              content: [
                { type: "paragraph", text: "Lorem impsum dolor sit amet" },
              ],
            },
            last_publication_date: "04-01-2021",
          },
        ],
      }),
    } as never);

    const response = await getStaticProps({});

    expect(response).toEqual(
      expect.objectContaining({
        props: {
          posts: [
            {
              slug: "my-new-post",
              title: "My new post",
              excerpt: "Lorem impsum dolor sit amet",
              updatedAt: "April 01, 2021",
            },
          ],
        },
      })
    );
  });
});
