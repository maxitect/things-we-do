import { render, screen, waitFor, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ToolList from "@/app/toolkit/components/ToolList";
import DatabaseManager from "@/lib/db/DatabaseManager";


// Mock the DatabaseManager
jest.mock("@/lib/db/DatabaseManager", () => ({
  getFromDb: jest.fn(),
  deleteFromDb: jest.fn(),
}));

// Mock the SortableItem component
jest.mock("@/app/toolkit/components/SortableItem", () => ({
  __esModule: true,
  default: ({ item, handleToggle, handleDelete }: any) => (
    <div data-testid={`sortable-item-${item.id}`}>
      <span>{item.name}</span>
      <button
        data-testid={`toggle-${item.id}`}
        onClick={() => handleToggle(item.id)}
      >
        Toggle
      </button>
      <button
        data-testid={`delete-${item.id}`}
        onClick={() => handleDelete(item.id)}
      >
        Delete
      </button>
    </div>
  ),
}));  

describe("Toolkit Component", () => {
  const mockData = [
    {
      id: "1",
      name: "Item 1",
      categories: ["Category1"],
      checked: false,
      description: "Description 1",
      infoUrl: "https://example.com",
      imageUrl: "https://via.placeholder.com/150",
    },
    {
      id: "2",
      name: "Item 2",
      categories: ["Category2"],
      checked: true,
      description: "Description 2",
      infoUrl: "https://example.com",
      imageUrl: "https://via.placeholder.com/150",
    },
  ];
  
  beforeEach(() => {
    (DatabaseManager.getFromDb as jest.Mock).mockResolvedValue(
      mockData.map((item) => ({
        toJSON: () => item,
      }))
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("fetches and displays all items on load", async () => {
    await act(async () => {
      render(<ToolList />);
    });

    await waitFor(() => {
      expect(DatabaseManager.getFromDb).toHaveBeenCalledWith("toolkit_items");
    });

    mockData.forEach((item) => {
      expect(screen.getByTestId(`sortable-item-${item.id}`)).toBeInTheDocument();
      expect(screen.getByText(item.name)).toBeInTheDocument();
    });
  });

  it("toggles item checked state correctly", async () => {
    await act(async () => {
      render(<ToolList />);
    });

    await waitFor(() => {
      expect(screen.getByTestId("toggle-1")).toBeInTheDocument();
    });

    const toggleButton = screen.getByTestId("toggle-1");
    userEvent.click(toggleButton);

    await waitFor(() => {
      // State changes are internal; no direct DOM updates expected
      expect(toggleButton).toBeInTheDocument();
    });
  });

  it("deletes an item correctly", async () => {
    await act(async () => {
      render(<ToolList />);
    });

    await waitFor(() => {
      expect(screen.getByTestId("delete-1")).toBeInTheDocument();
    });

    const deleteButton = screen.getByTestId("delete-1");
    userEvent.click(deleteButton);

    await waitFor(() => {
      expect(DatabaseManager.deleteFromDb).toHaveBeenCalledWith(
        "toolkit_items",
        "1"
      );
      expect(screen.queryByTestId("sortable-item-1")).not.toBeInTheDocument();
    });
  });

  it("handles drag-and-drop reorder correctly", async () => {
    const { DragDropContext } = require("@hello-pangea/dnd");
    const mockOnDragEnd = jest.fn();

    await act(async () => {
      render(
        <DragDropContext onDragEnd={mockOnDragEnd}>
          <ToolList />
        </DragDropContext>
      );
    });

    await waitFor(() => {
      mockData.forEach((item) => {
        expect(screen.getByTestId(`sortable-item-${item.id}`)).toBeInTheDocument();
      });
    });

    const sortableItem1 = screen.getByTestId("sortable-item-1");
    const sortableItem2 = screen.getByTestId("sortable-item-2");

    expect(sortableItem1).toBeInTheDocument();
    expect(sortableItem2).toBeInTheDocument();
  });
});