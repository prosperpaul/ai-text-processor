
import { useState } from "react";

const TextInput = ({ onSend }: { onSend: (text: string) => void }) => {
  const [input, setInput] = useState("");

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault(); // ✅ Prevent form submission reload
    if (input.trim()) {
      onSend(input);
      setInput("");
    } else {
      alert("Please enter some text!");
    }
  };

  return (
    <form className="flex border-t p-2" onSubmit={handleSend}>
      <textarea
        className="flex-1 bg-gray-800 rounded p-2 text-white border-none resize-none"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type a message..."
        rows={3}
      />
      <button
        type="submit"
        className="bg-blue-700 rounded p-2 ml-2 text-white"
        aria-label="Send Message"
      >
        📤
      </button>
    </form>
  );
};

export default TextInput;
