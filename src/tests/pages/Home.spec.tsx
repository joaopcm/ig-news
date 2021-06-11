import { render, screen } from "@testing-library/react";
import { mocked } from "ts-jest/utils";
import { stripe } from "../../services/stripe";
import Home, { getStaticProps } from "../../pages";

jest.mock("next/router");
jest.mock("next-auth/client", () => {
  return {
    useSession: () => [null, false],
  };
});
jest.mock("../../services/stripe");

describe("Home page", () => {
  it("should render correctly", () => {
    render(<Home product={{ priceId: "fake-price-id", amount: "$9.99" }} />);

    expect(screen.getByText("for $9.99 month")).toBeInTheDocument();
  });

  it("should load initial data", async () => {
    const retrieveStripePricesMocked = mocked(stripe.prices.retrieve);
    retrieveStripePricesMocked.mockResolvedValueOnce({
      id: "fake-id",
      unit_amount: 999,
    } as never);

    const response = await getStaticProps({});

    expect(response).toEqual(
      expect.objectContaining({
        props: {
          product: {
            priceId: "fake-id",
            amount: "$9.99",
          },
        },
      })
    );
  });
});
