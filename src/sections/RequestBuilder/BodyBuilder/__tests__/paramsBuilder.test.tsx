import { describe, it, expect, vi, afterEach } from "vitest";
import { render, cleanup } from "@testing-library/react";
import ParamsBuilder from "../paramsBuilder";
import GlobalThemeWrapper from "@/theme";

describe("src/sections/RequestBuilder/BodyBuilder/paramsBuilder.tsx", () => {
  afterEach(cleanup);
  it("Mounts without errors", () => {
    render(
      <GlobalThemeWrapper>
        <ParamsBuilder />
      </GlobalThemeWrapper>
    );
  });

  it("Mounts with placeholder text and an empty table", async () => {
    const { getAllByRole } = render(
      <GlobalThemeWrapper>
        <ParamsBuilder />
      </GlobalThemeWrapper>
    );

    const paramsTableRows = getAllByRole("row");
    expect(paramsTableRows.length).to.equal(2);
  });
});
