// !! PLEASE LEAVE ALL COMMENTS IN THIS FILE; THEY ARE USED FOR CATEGORY/TAG FUNCTIONALITY BUT MUST BE COMMENTED OUT TO ALLOW BUILDING ON THIS BRANCH

// import { useEffect, useState } from "react";
// import { useToolkitForm } from "@/context/ToolkitFormContext";
// import Button from "@/ui/shared/Button";
// import DatabaseManager from "@/lib/db/DatabaseManager";

export default function AddTags() {
  // const { formState, setFormState } = useToolkitForm();
  // const [categories, setCategories] = useState<string[]>([]);

  /* useEffect(() => {
    const fetchCategories = async () => {
      const allCategories = await DatabaseManager.getFromDb("categories");
      setCategories(allCategories.map((cat: any) => cat.name));
    };
    fetchCategories();
  }, []); */

  /* const toggleCategory = (category: string) => {
    setFormState((prev) => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter((c) => c !== category)
        : [...prev.categories, category],
    }));
  }; */

  return (
    <div>
      <p className="text-white">Tags</p>
      <div className="flex flex-wrap gap-2">
        <p>TODO: Add Categories</p>
        {/* {categories.map((category) => (
          <Button
            key={category}
            label={category}
            onClick={() => toggleCategory(category)}
            className={`${
              formState.categories.includes(category)
                ? "bg-twd-secondary-purple text-white"
                : "bg-twd-background text-white"
            } hover:bg-twd-secondary-purple`}
            ariaPressed={formState.categories.includes(category)}
          />
        ))} */}
      </div>
    </div>
  );
}
