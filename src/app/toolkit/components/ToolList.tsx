"use client";
import { useState, useEffect, useMemo } from "react";
import DatabaseManager from "@/lib/db/DatabaseManager";
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";
import SortableItem from "./SortableItem";
import Search from "@/ui/shared/Search";
import { useToolkit } from "@/context/ToolkitContext";

export interface ToolkitComponentData {
  id: string;
  name: string;
  categories: string[];
  checked: boolean;
  description?: string;
  infoUrl: string;
  imageUrl: string;
  timestamp?: string;
}

export default function ToolkitList() {
  const [mainData, setMainData] = useState<ToolkitComponentData[]>([]);
  const [displayedData, setDisplayedData] = useState<ToolkitComponentData[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const { selectedCategories } = useToolkit();

  // Fetch data from the database
  useEffect(() => {
    const fetchData = async () => {
      try {
        const items = await DatabaseManager.getFromDb("toolkit_items");
        if (items) {
          const data = items.map((doc) => doc.toJSON());
          setMainData(data);
          setDisplayedData(data);
        } else {
          console.log("No items found in toolkit_items collection.");
        }
      } catch (error) {
        console.error("Error fetching toolkit items from database:", error);
      }
    };
    fetchData();
  }, []);

  // Toggle item `checked` state
  const handleToggle = (id: string) => {
    setMainData((prevData) =>
      prevData.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
    setDisplayedData((prevData) =>
      prevData.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  // Delete an item
  const handleDelete = async (id: string) => {
    try {
      await DatabaseManager.deleteFromDb("toolkit_items", id);
      setMainData((prevData) => prevData.filter((item) => item.id !== id));
      setDisplayedData((prevData) => prevData.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error in handleDelete:", error);
    }
  };

  // Handle drag-and-drop reordering
  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) return;

    const reorderedData = [...displayedData];
    const [movedItem] = reorderedData.splice(source.index, 1);
    reorderedData.splice(destination.index, 0, movedItem);

    setDisplayedData(reorderedData);
  };

  // Handle search queries
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query) {
      const filtered = mainData.filter((item) =>
        item.name.toLowerCase().includes(query.toLowerCase())
      );
      setDisplayedData(filtered);
    } else {
      setDisplayedData(mainData); 
    }
  };

  // Clear search input
  const handleClearSearch = () => {
    setSearchQuery("");
    setDisplayedData(mainData);
  };

  // Filter data based on selected categories
  const filteredData = useMemo(() => {
    if (selectedCategories.length === 0) return mainData;
    return mainData.filter((item) =>
      item.categories.some((cat) => selectedCategories.includes(cat))
    );
  }, [mainData, selectedCategories]);

  // Apply category filtering
  useEffect(() => {
    if (selectedCategories.length > 0 && !searchQuery) {
      setDisplayedData(filteredData);
    }
  }, [filteredData, searchQuery]);

  return (
    <div className="toolkit-container">
      {/* Search Component */}
      <Search onSearch={handleSearch} onClear={handleClearSearch} />

      {/* Drag-and-Drop Context */}
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="toolkit">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="flex flex-col space-y-4"
            >
              {displayedData.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <SortableItem
                        item={item}
                        handleToggle={handleToggle}
                        handleDelete={handleDelete}
                      />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}

//     <div className="toolkit-container">
//       <Search items={data} onFilter={handleSearch}/>
//         <DragDropContext onDragEnd={onDragEnd}>
//           <Droppable droppableId="toolkit">
//             {(provided) => (
//               <div
//                 {...provided.droppableProps}
//                 ref={provided.innerRef}
//                 className="flex flex-col space-y-4"
//               >
//                 {finalFilteredData.map((item, index) => (
//                   <Draggable key={item.id} draggableId={item.id} index={index}>
//                     {(provided) => (
//                       <div
//                         ref={provided.innerRef}
//                         {...provided.draggableProps}
//                         {...provided.dragHandleProps}
//                       >
//                         <SortableItem
//                           key={item.id}
//                           item={item}
//                           handleToggle={handleToggle}
//                           handleDelete={handleDelete}
//                         />
//                       </div>
//                     )}
//                   </Draggable>
//                 ))}
//                 {provided.placeholder}
//               </div>
//             )}
//           </Droppable>
//         </DragDropContext>
//     </div>
