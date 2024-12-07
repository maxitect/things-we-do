import { useAddToolForm } from "@/context/AddToolContext";

export default function AddInfoUrl() {
  const { formState, setFormState } = useAddToolForm();

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState(prev => ({ 
      ...prev,
      infoUrl: e.target.value
    }));
  };

  return (
    <div>
      <label htmlFor="infoUrl"
        className="text-white"
      >Link</label>

      <input
        type="url"
        id="infoUrl"
        value={formState.infoUrl}
        onChange={handleUrlChange}
        className="w-full p-2 rounded bg-twd-background text-white border border-gray-700"
      />
    </div>
  );
}
