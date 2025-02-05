export const sendChatMessage = async (question, contextMessages, onChunk) => {
  const maxRetries = 3;
  const backendUrl = 'http://localhost:8000/generate_chat';  // Updated to match your working URL
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      console.log('Sending request with payload:', {
        question,
        context_messages: contextMessages
      });

      const response = await fetch(backendUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          question,
          context_messages: contextMessages
        }),
      });

      // Log the raw response for debugging
      const responseText = await response.text();
      console.log('Raw response:', responseText);

      if (!response.ok) {
        throw new Error(`Server error: ${response.status} - ${responseText}`);
      }

      let data;
      try {
        data = JSON.parse(responseText);
      } catch (e) {
        throw new Error(`Invalid JSON response: ${responseText}`);
      }

      if (!data) {
        throw new Error('Empty response from server');
      }

      // If we have a response, send it
      if (data.response || data.content) {
        onChunk(data.response || data.content);
        return;
      } else {
        throw new Error('Response missing expected fields');
      }
      
    } catch (error) {
      console.error(`Attempt ${attempt} failed:`, error);
      
      if (error.message.includes('ERR_CONNECTION_REFUSED')) {
        const errorMessage = 'Cannot connect to chat server. Please ensure the backend server is running at ' + backendUrl;
        if (attempt === maxRetries) {
          throw new Error(errorMessage);
        }
        // Wait before retrying (exponential backoff)
        await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 1000));
        continue;
      }
      
      // For other errors, throw immediately
      throw error;
    }
  }
}; 