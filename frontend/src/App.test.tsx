import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import App from "./App";
import { dashboardRouter } from "./test/apiRouter";
import { mockFetch } from "./test/fetchMock";

describe("App (E2E-style flows)", () => {
  it("loads the dashboard and shows current conditions", async () => {
    mockFetch(dashboardRouter);
    render(<App />);
    // Current-conditions widget renders the first location's temperature.
    expect(await screen.findByText("18°C")).toBeInTheDocument();
  });

  it("navigates to Settings and shows the sign-in gate", async () => {
    mockFetch(dashboardRouter);
    render(<App />);
    await screen.findByText("18°C");

    fireEvent.click(screen.getByText("Settings"));

    // Anonymous users see the login form (gate to alert configuration).
    expect(await screen.findByLabelText(/email/i)).toBeInTheDocument();
  });
});
