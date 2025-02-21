



const ChatMessage = ({
  text = "",
  type = "user",
  detectedLanguage = "",
  summary = "",
  translations = "",
  onSummarize = () => {},
  onTranslate = () => {},
  selectedLang = "",
  setSelectedLang = (lang: string) => {},
}) => {
  const isEnglish = detectedLanguage === "en";
  const isLongText = text.length > 150;

  return (
    <div className={`p-4 my-2 rounded ${type === "user" ? "bg-blue-500 text-white" : "bg-gray-700 text-white"}`}>
      <p>{text}</p>

      {detectedLanguage && (
        <p className="text-sm mt-2">Detected Language: {detectedLanguage}</p>
      )}

      {isEnglish && isLongText && !summary && (
        <button
          className="bg-green-600 text-white px-2 py-1 rounded mt-2"
          onClick={onSummarize}
        >
          Summarize
        </button>
      )}

      {summary && (
        <div className="mt-2">
          <strong>Summary:</strong>
          <p>{summary}</p>
        </div>
      )}

      <div className="mt-2">
        <select
          className="bg-gray-800 text-white p-1 rounded"
          value={selectedLang}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSelectedLang(e.target.value)}
        >
          <option value="">Select Language</option>
          <option value="en">English</option>
          <option value="pt">Portuguese</option>
          <option value="es">Spanish</option>
          <option value="ru">Russian</option>
          <option value="tr">Turkish</option>
          <option value="fr">French</option>
        </select>
        <button
          className="bg-yellow-600 text-white px-2 py-1 rounded ml-2"
          onClick={onTranslate}
        >
          Translate
        </button>
      </div>

      {translations && (
        <div className="mt-2">
          <strong>Translation:</strong>
          <p>{translations}</p>
        </div>
      )}
    </div>
  );
};

export default ChatMessage;
