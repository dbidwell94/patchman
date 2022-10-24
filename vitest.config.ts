import { defineConfig } from "vitest/config";
import { config } from "./vite.config";

export default defineConfig({
  test: {
    environment: "jsdom",
    mockReset: true,
  },
  ...config,
});
