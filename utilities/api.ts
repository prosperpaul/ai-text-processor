


export const detectLanguage = async (text: string): Promise<string> => {
  try {
    const response = await fetch("https://chrome-ai-api/language-detect", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    if (data && data.language) {
      return data.language; 
    } else {
      return "unknown";
    }
  } catch (error) {
    console.error("Error detecting language:", error);
    return "error";
  }
};
