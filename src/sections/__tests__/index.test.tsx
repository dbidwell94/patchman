import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import PageSections from "../index";
import GlobalThemeWrapper from "@/theme";

describe("src/sections/index.tsx", () => {
  it("renders without error", () => {
    const {} = render(
      <GlobalThemeWrapper>
        <Router>
          <PageSections />
        </Router>
      </GlobalThemeWrapper>
    );
  });
});
