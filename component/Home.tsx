
                                                     
import { useState } from 'react'; 

export default function AiTextTranslator() {

  const [text, setText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [summary, setSummary] = useState(''); 
  const [selectedLang, setSelectedLang] = useState('es'); 
  const [loading, setLoading] = useState(false); 
  const [detectedLanguage, setDetectedLanguage] = useState(''); 

// Handle Translation 
  const handleTranslate = async () => { if (!text.trim()) { 
    alert('Please enter some text to translate.'); return; } setLoading(true);

// List of translation API endpoints to try as fallbacks 
 const endpoints = [ 'https://translate.argosopentech.com/translate', 'https://libretranslate.de/translate', 'https://libretranslate.com/translate', ];

  let data = null; let success = false; let errorMsg = '';
               
  for (const endpoint of endpoints) 
     { 
       try
          { const response = await fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json', }, body: JSON.stringify({ q: text, source: detectedLanguage || 'en', 
                    
       }),
          }); 

          if (!response.ok) { 
          const errorDetails = await response.text(); 
            throw new Error(`HTTP error! Status: ${response.status}, 
            Details: ${errorDetails}`); }
            data = await response.json(); success = true; break; } 
            catch (error: any) { 
            console.error(`Error translating text with endpoint ${endpoint}:`, error); errorMsg = error.message; } } 
              if (success && data) { setTranslatedText(data.translatedText); 

             } else { alert(`Failed to translate text using all endpoints. Error: ${errorMsg}`); } setLoading(false); };

        // Handle Language Detection  
          const detectLanguage = async () => {
              
        // Placeholder language detection 
                         
          setDetectedLanguage('en'); };

// Summarize the text if it's in English and longer than 150 characters 
         const handleSummarize = async () => { const summaryContent = text.substring(0, 150) + '...'; 
          setSummary(summaryContent); };

        return ( 

          <div className="min-h-screen flex items-center justify-center bg-gray-700 p-4"> <div className="w-full max-w-xl bg-white p-8 rounded-lg border border-gray-300 shadow-lg"> 
            <h1 className="text-3xl font-semibold mb-6 text-center">AI Text Translator</h1>

            <textarea className="w-full p-4 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none font-semibold" rows={5} 
              placeholder="Enter text to translate..." 
              value={text} 
              onChange={(e) => setText(e.target.value)} 
              onBlur={detectLanguage} />
                             
       {/* Action Buttons - Language Selector and Translate Button */}

       <div className="flex flex-col sm:flex-row gap-4 mt-4">

          <select className="w-full sm:w-1/3 p-3 rounded-lg border border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 font-semibold" value={selectedLang} onChange={(e) => setSelectedLang(e.target.value)} > 

            <option value="en">Eglish</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
            <option value="de">German</option> 
            <option value="it">Italian</option>
            <option value="sw">Swahil</option>
            <option value="ch">Chinese</option>
            <option value="arb">Arabic</option>
            <option value="pt">Portuguese</option> 
            </select> 
                  
               <button onClick={handleTranslate} className="w-full sm:w-2/3 bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 font-semibold" disabled={loading} > {loading ? 'Translating...' : 'Translate'} 
               </button> 
                    </div>
                                      
        {/* Summarize Button */} 
                                      
      {text.length > 150 && detectedLanguage === 'en' && !summary && ( 
        <button className="mt-4 bg-green-600 text-white p-3 rounded-lg disabled:bg-gray-500" onClick={handleSummarize} > Summarize
        </button>
          )}
                                           
        {/* Display Summarized or Translated Text */}

    {summary && ( <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-300 shadow-md">
          <h2 className="text-xl font-semibold mb-2">Summary:</h2> 
            <p className="text-gray-700 whitespace-pre-wrap font-semibold">{summary}</p> 
          </div> 
               )} 
              {translatedText && ( <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-300 shadow-md">
                <h2 className="text-xl font-semibold mb-2">Translated Text:</h2> 
              <p className="text-gray-700 whitespace-pre-wrap font-semibold">{translatedText}</p> 
         </div> )} 
        </div> 
    </div> );
   }
                                                     