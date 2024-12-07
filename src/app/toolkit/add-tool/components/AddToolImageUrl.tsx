import { useAddToolForm } from "@/context/AddToolContext";
// import * as Icons from "@heroicons/react/24/outline";

export default function AddImageUrl() {
  const { formState, setFormState } = useAddToolForm();

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState(prev => ({ 
      ...prev,
      imageUrl: e.target.value
    }));
  };

  return (
    <div>
      <label htmlFor="imageUrl"
        className="text-white"
      >Image URL</label>

      <input
        type="url"
        id="imageUrl"
        value={formState.imageUrl}
        onChange={handleUrlChange}
        className="w-full p-2 rounded bg-twd-background text-white border border-gray-700"
      />
    </div>
  );
}