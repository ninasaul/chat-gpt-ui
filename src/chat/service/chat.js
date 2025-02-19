export const sendChatMessage = async (question, contextMessages, onChunk, persona) => {
  const maxRetries = 3;
  const backendUrl = 'http://34.68.23.90:8000/generate_chat';
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      console.log('Sending request with payload:', {
        question,
        context_messages: contextMessages,
        segment: persona?.title || null
      });

      const response = await fetch(backendUrl, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'text/event-stream',
        },
        body: JSON.stringify({
          question,
          context_messages: contextMessages,
          segment: persona?.title || null,
        }),
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      // Get the response as a readable stream
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';
      let fullResponse = ''; // Track the full response

      while (true) {
        const { done, value } = await reader.read();
        
        if (done) {
          break;
        }

        // Decode the chunk and add it to our buffer
        buffer += decoder.decode(value, { stream: true });
        
        // Process complete lines from the buffer
        const lines = buffer.split('\n');
        buffer = lines.pop() || ''; // Keep the last incomplete line in the buffer

        for (const line of lines) {
          if (line.trim() === '') continue;
          
          // Handle SSE format (lines starting with "data: ")
          if (line.startsWith('data: ')) {
            const data = line.slice(6); // Remove "data: " prefix
            
            if (data === '[DONE]') {
              return;
            }

            try {
              const parsed = JSON.parse(data);
              
              if (parsed.response !== undefined) {
                fullResponse += parsed.response; // Accumulate the full response
                onChunk(fullResponse); // Send the accumulated response
              } else if (parsed.suggestions) {
                // Handle suggestions if needed
                onChunk(fullResponse, parsed.suggestions); // Pass suggestions as second parameter
              }
            } catch (e) {
              console.warn('Failed to parse SSE data:', e);
            }
          }
        }
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