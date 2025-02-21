import { useState } from 'react';

export default function AiTextTranslator() {
  const [text, setText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [summary, setSummary] = useState('');
  const [selectedLang, setSelectedLang] = useState('es');
  const [loading, setLoading] = useState(false);
  const [detectedLanguage, setDetectedLanguage] = useState('');

  const endpoints = [
    'https://cors-anywhere.herokuapp.com/https://libretranslate.de/translate',
    'https://cors-anywhere.herokuapp.com/https://translate.astian.org/translate'
  ];

  const handleTranslate = async () => {
    if (!text.trim()) {
      alert('Please enter some text to translate.');
      return;
    }
    setLoading(true);

    let data = null;
    let success = false;
    let errorMsg = '';

    for (const endpoint of endpoints) {
      try {
        const response = await fetch(endpoint, {
          method: 'POST',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            q: text,
            source: detectedLanguage || 'en',
            target: selectedLang,
            format: 'text'
          })
        });

        if (!response.ok) {
          const errorDetails = await response.text();
          throw new Error(`HTTP error! Status: ${response.status}, Details: ${errorDetails}`);
        }

        data = await response.json();
        success = true;
        break;
      } catch (error) {
        console.error(`Error translating text with endpoint ${endpoint}:`, error);
        errorMsg = error instanceof Error ? error.message : String(error);
      }
    }

    if (success && data) {
      setTranslatedText(data.translatedText);
    } else {
      alert(`Failed to translate text using all endpoints. Error: ${errorMsg}`);
    }
    setLoading(false);
  };

  const detectLanguage = async () => {
    setDetectedLanguage('en');
  };

  const handleSummarize = async () => {
    const summaryContent = text.substring(0, 150) + '...';
    setSummary(summaryContent);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-700 to-indigo-800 p-4 sm:p-8">
      <div className="w-full max-w-2xl bg-white p-6 sm:p-8 rounded-lg border border-gray-300 shadow-2xl">
        <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-center text-indigo-700">AI Text Translator</h1>

        <textarea
          className="w-full p-4 rounded-lg border border-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none text-gray-800 font-medium"
          rows={5}
          placeholder="Enter text to translate..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          onBlur={detectLanguage}
        />

        <div className="flex flex-col sm:flex-row gap-4 mt-6">
          <select
            className="w-full sm:w-1/3 p-3 rounded-lg border border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
            value={selectedLang}
            onChange={(e) => setSelectedLang(e.target.value)}
          >
            <option value="en">English</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
            <option value="de">German</option>
            <option value="it">Italian</option>
            <option value="sw">Swahili</option>
            <option value="ch">Chinese</option>
            <option value="ar">Arabic</option>
            <option value="pt">Portuguese</option>
          </select>

          <button
            onClick={handleTranslate}
            className="w-full sm:w-2/3 bg-indigo-600 text-white p-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-semibold"
            disabled={loading}
          >
            {loading ? 'Translating...' : 'Translate'}
          </button>
        </div>

        {text.length > 150 && detectedLanguage === 'en' && !summary && (
          <button
            className="mt-6 bg-green-600 text-white p-4 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 font-semibold"
            onClick={handleSummarize}
          >
            Summarize
          </button>
        )}

        {summary && (
          <div className="mt-6 p-4 bg-gray-100 rounded-lg border border-gray-300 shadow-md">
            <h2 className="text-xl font-semibold mb-2 text-indigo-700">Summary:</h2>
            <p className="text-gray-800 whitespace-pre-wrap font-medium">{summary}</p>
          </div>
        )}

        {translatedText && (
          <div className="mt-6 p-4 bg-gray-100 rounded-lg border border-gray-300 shadow-md">
            <h2 className="text-xl font-semibold mb-2 text-indigo-700">Translated Text:</h2>
            <p className="text-gray-800 whitespace-pre-wrap font-medium">{translatedText}</p>
          </div>
        )}
      </div>
    </div>
  );
} 
