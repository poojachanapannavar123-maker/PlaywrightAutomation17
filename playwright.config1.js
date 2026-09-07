// @ts-check
import { defineConfig, devices } from "@playwright/test";

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: "./tests",
  retries: 1, //to prevent flaky tests on adding retry

  /* Run tests in files in parallel */
  // for all the tests to load on this timing
  timeout: 60 * 1000,

  // timeout for verifying the conditions
  expect: {
    timeout: 5000,
  },

  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  // @ts-ignore
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: "html",
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  projects: [
    {
      name: "chromium",
      use: {
        name: "chromium",
        headless: false,
        actionTimeout: 30 * 1000,
        expect: {
          timeout: 30 * 1000,
        },
        navigationTimeout: 30 * 1000,
        screenshot: "on",
        trace: "on",
        // viewport: { width: 720, height: 720 },
        // how the browser should open when it's headed mode in what size and can test responsive size ..
        // ignoreHTTPSErrors:true,   ---> SSL configue
        // permissions:['gealocation'],    ---> allow browser default pop up

        video: "retain-on-failure", //record videos when the tests failures.
      },
    },
    {
      name: "safari",
      use: {
        name: "webkit",
        headless: true,
        // ...devices["iPhone 11"],
      },
    },
  ],

  /* Configure projects for major browsers */
});
