import { describe, it, expect, afterEach } from "vitest";
import { render, cleanup } from "@testing-library/react";
import { MemoryRouter as Router } from "react-router-dom";
import PageSections from "../index";
import GlobalThemeWrapper from "@/theme";

describe("src/sections/index.tsx", () => {
  afterEach(cleanup);
  it("renders without error", () => {
    render(
      <GlobalThemeWrapper>
        <Router>
          <PageSections />
        </Router>
      </GlobalThemeWrapper>
    );
  });

  it("Should navigate to /rest/* by default", () => {
    const { getByTestId } = render(
      <GlobalThemeWrapper>
        <Router initialEntries={["/"]}>
          <PageSections />
        </Router>
      </GlobalThemeWrapper>
    );

    expect(getByTestId("requestBuilder")).toBeTruthy();
  });
});
