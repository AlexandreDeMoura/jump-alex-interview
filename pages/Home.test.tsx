import { act } from "@testing-library/react";
import { RouterContext } from "next/dist/shared/lib/router-context";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { createMockRouter } from "../test-utils/createMockRouter";
import { QueryClient, QueryClientProvider } from "react-query";
import Home from "./index";

const queryClient = new QueryClient();

describe("Home page", () => {
  it("", async () => {
    await act(async () => {
      render(
        <QueryClientProvider client={queryClient}>
          <RouterContext.Provider value={createMockRouter({})}>
            <Home />
          </RouterContext.Provider>
        </QueryClientProvider>
      );
    });
  });
});
