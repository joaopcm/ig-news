import { render, screen } from "@testing-library/react";
import { mocked } from "ts-jest/utils";
import { useSession } from "next-auth/client";
import { useRouter } from "next/router";
import { getPrismicClient } from "../../services/prismic";
import Post, { getStaticProps } from "../../pages/posts/preview/[slug]";

jest.mock("next-auth/client");
jest.mock("next/router");
jest.mock("../../services/prismic");

const post = {
  slug: "my-new-post",
  title: "My new post",
  content: "<p>Post content</p>",
  updatedAt: "March, 10",
};

describe("PostPreview page", () => {
  it("should render correctly", () => {
    const useSessionMocked = mocked(useSession);
    useSessionMocked.mockReturnValueOnce([null, false]);

    render(<Post post={post} />);

    expect(screen.getByText(post.title)).toBeInTheDocument();
    expect(screen.getByText("Post content")).toBeInTheDocument();
    expect(screen.getByText("Wanna continue reading?")).toBeInTheDocument();
  });

  it("should redirect user to full post when user is subscribed", async () => {
    const useSessionMocked = mocked(useSession);
    const useRouterMocked = mocked(useRouter);
    const pushMock = jest.fn();

    useSessionMocked.mockReturnValueOnce([
      {
        activeSubscription: "fake-subscription",
      },
      false,
    ]);

    useRouterMocked.mockReturnValueOnce({
      push: pushMock,
    } as any);

    render(<Post post={post} />);

    expect(pushMock).toHaveBeenCalledWith("/posts/my-new-post");
  });

  it("should load initial data", async () => {
    const getPrismicClientMocked = mocked(getPrismicClient);

    getPrismicClientMocked.mockReturnValueOnce({
      getByUID: jest.fn().mockResolvedValueOnce({
        data: {
          title: [{ type: "heading", text: "My new post" }],
          content: [{ type: "paragraph", text: "Post content" }],
        },
        last_publication_date: "04-01-2021",
      }),
    } as any);

    const response = await getStaticProps({
      params: { slug: post.slug },
    } as any);

    expect(response).toEqual(
      expect.objectContaining({
        props: expect.objectContaining({
          post: expect.objectContaining({
            slug: post.slug,
            title: post.title,
            content: post.content,
            updatedAt: "April 01, 2021",
          }),
        }),
      })
    );
  });
});
