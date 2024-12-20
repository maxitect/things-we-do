/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from "@testing-library/react";
import { useDatabase } from "@/context/DatabaseContext";
import { useToolkit } from "@/context/ToolkitContext";
import CategoriesBar from "@/app/toolkit/components/CategoriesBar";

// Mock contexts
jest.mock("@/context/DatabaseContext", () => ({
  useDatabase: jest.fn(),
}));

jest.mock("@/context/ToolkitContext", () => ({
  useToolkit: jest.fn(),
}));

describe("CategoriesBar", () => {
  let mockDatabase: any;
  let mockToolkitContext: any;
  let mockOpenModal: jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();

    mockDatabase = {
      getFromDb: jest.fn(),
    };

    mockToolkitContext = {
      selectedCategories: [],
      setSelectedCategories: jest.fn(),
    };

    mockOpenModal = jest.fn();

    (useDatabase as jest.Mock).mockReturnValue(mockDatabase);
    (useToolkit as jest.Mock).mockReturnValue(mockToolkitContext);
  });

  it("renders the CategoriesBar and fetches categories", async () => {
    // Mock database response
    mockDatabase.getFromDb.mockResolvedValueOnce([
      { id: "1", name: "Category 1", timestamp: "2024-12-10" },
      { id: "2", name: "Category 2", timestamp: "2024-12-11" },
    ]);

    render(
      <CategoriesBar openModal={mockOpenModal} refreshCategories={false} />
    );

    // Wait for categories to load and check if they are rendered
    await waitFor(() => {
      expect(screen.getByText("Category 1")).toBeInTheDocument();
      expect(screen.getByText("Category 2")).toBeInTheDocument();
    });
  });

  it("handles category selection and deselection", async () => {
    mockDatabase.getFromDb.mockResolvedValueOnce([
      { id: "1", name: "Category 1", timestamp: "2024-12-10" },
    ]);
    // Initialize mock context with state tracking
    mockToolkitContext = {
      selectedCategories: [],
      setSelectedCategories: jest.fn(),
    };
    (useToolkit as jest.Mock).mockReturnValue(mockToolkitContext);

    // Wrap initial render in act
    await act(async () => {
      render(
        <CategoriesBar openModal={mockOpenModal} refreshCategories={false} />
      );
    });

    // Wait for initial render to complete
    await waitFor(() => {
      expect(screen.getByText("Category 1")).toBeInTheDocument();
    });

    const category1Button = screen.getByText("Category 1");
    const allButton = screen.getByText("All");

    // First click - select category
    await act(async () => {
      fireEvent.click(category1Button);
    });

    // Verify category is selected
    expect(mockToolkitContext.setSelectedCategories).toHaveBeenCalledWith([
      "Category 1",
    ]);

    // Second click - should select "All"
    await act(async () => {
      fireEvent.click(allButton);
    });

    // Verify "All" is selected
    expect(mockToolkitContext.setSelectedCategories).toHaveBeenCalledWith([]);
  });

  it("handles the 'All' button click to reset categories", async () => {
    mockDatabase.getFromDb.mockResolvedValueOnce([
      { id: "1", name: "Category 1", timestamp: "2024-12-10" },
    ]);

    render(
      <CategoriesBar openModal={mockOpenModal} refreshCategories={false} />
    );

    // Wait for categories to load
    await waitFor(() => {
      expect(screen.getByText("Category 1")).toBeInTheDocument();
    });

    const allButton = screen.getByText("All");

    // Simulate clicking the "All" button
    fireEvent.click(allButton);
    expect(mockToolkitContext.setSelectedCategories).toHaveBeenCalledWith([]);
  });
});
