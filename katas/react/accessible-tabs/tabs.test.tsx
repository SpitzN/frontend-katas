import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { Tabs, type Tab } from "./tabs";

const tabs: Tab[] = [
  { id: "profile", label: "Profile", content: <p>Profile panel</p> },
  { id: "billing", label: "Billing", content: <p>Billing panel</p> },
  { id: "team", label: "Team", content: <p>Team panel</p> },
];

const tab = (name: string) => screen.getByRole("tab", { name });

describe("Tabs", () => {
  it("renders a tablist with the first tab selected and its panel shown", () => {
    render(<Tabs tabs={tabs} />);
    expect(screen.getByRole("tablist")).toBeInTheDocument();
    expect(tab("Profile")).toHaveAttribute("aria-selected", "true");
    expect(tab("Billing")).toHaveAttribute("aria-selected", "false");
    expect(screen.getByRole("tabpanel", { name: "Profile" })).toHaveTextContent("Profile panel");
    expect(screen.queryByText("Billing panel")).not.toBeInTheDocument();
  });

  it("selects a tab on click", async () => {
    const user = userEvent.setup();
    render(<Tabs tabs={tabs} />);
    await user.click(tab("Team"));
    expect(tab("Team")).toHaveAttribute("aria-selected", "true");
    expect(screen.getByRole("tabpanel", { name: "Team" })).toHaveTextContent("Team panel");
  });

  it("moves and selects with the arrow keys, wrapping around", async () => {
    const user = userEvent.setup();
    render(<Tabs tabs={tabs} />);
    await user.click(tab("Profile"));
    await user.keyboard("{ArrowRight}");
    expect(tab("Billing")).toHaveFocus();
    expect(tab("Billing")).toHaveAttribute("aria-selected", "true");
    await user.keyboard("{ArrowRight}{ArrowRight}");
    expect(tab("Profile")).toHaveFocus();
    await user.keyboard("{ArrowLeft}");
    expect(tab("Team")).toHaveFocus();
    expect(screen.getByRole("tabpanel", { name: "Team" })).toBeInTheDocument();
  });

  it("jumps with Home and End", async () => {
    const user = userEvent.setup();
    render(<Tabs tabs={tabs} />);
    await user.click(tab("Billing"));
    await user.keyboard("{End}");
    expect(tab("Team")).toHaveFocus();
    await user.keyboard("{Home}");
    expect(tab("Profile")).toHaveFocus();
  });

  it("keeps only the selected tab in the Tab order", async () => {
    const user = userEvent.setup();
    render(
      <>
        <Tabs tabs={tabs} />
        <button type="button">After</button>
      </>,
    );
    await user.tab();
    expect(tab("Profile")).toHaveFocus();
    expect(tab("Billing")).toHaveAttribute("tabindex", "-1");
    await user.tab();
    expect(screen.getByRole("tabpanel", { name: "Profile" })).toHaveFocus();
  });
});
