import { useState, useEffect, useRef } from "react";
import { FaPaperPlane } from "react-icons/fa";

interface Message {
    text: string;
    sender: "user" | "ai";
}

const ChatUI = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const chatEndRef = useRef<HTMLDivElement | null>(null);

    // Function to stream response from Phi-3 AI using Fetch
    async function chatWithPhi3(prompt: string) {
        try {
            setLoading(true);

            const response = await fetch("http://localhost:11434/api/generate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    model: "phi3",
                    prompt: prompt,
                    stream: true,
                }),
            });

            if (!response.body) throw new Error("Response body is null.");

            const reader = response.body.getReader();
            const decoder = new TextDecoder();
            let resultText = "";

            // Add AI message placeholder
            setMessages((prev) => [...prev, { text: "", sender: "ai" }]);

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                // Convert chunk to string
                const chunk = decoder.decode(value, { stream: true }).trim();

                // Handle multiple JSON objects in a single chunk
                const jsonObjects = chunk.split("\n").map((line) => {
                    try {
                        return JSON.parse(line);
                    } catch (e) {
                        console.error("JSON Parse Error:", e);
                        return null;
                    }
                });

                // Extract response text
                jsonObjects.forEach((json) => {
                    if (json && json.response) {
                        resultText += json.response;

                        // Update AI message dynamically
                        setMessages((prev) => {
                            const updatedMessages = [...prev];
                            updatedMessages[updatedMessages.length - 1].text = resultText;
                            return updatedMessages;
                        });
                    }
                });
            }
        } catch (error) {
            console.error("Streaming Error:", error);
            setMessages((prev) => [
                ...prev,
                { text: "Error processing your request.", sender: "ai" },
            ]);
        } finally {
            setLoading(false);
        }
    }


    const handleSend = async () => {
        if (!input.trim()) return;

        const userMessage: Message = { text: input, sender: "user" };
        setMessages([...messages, userMessage]);
        setInput("");

        await chatWithPhi3(input);
    };

    // Auto-scroll when messages update
    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return (
        <div className="flex flex-col h-[650px] bg-gray-100">
            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        className={`p-3 max-w-xs rounded-lg ${msg.sender === "user"
                            ? "ml-auto bg-blue-500 text-white"
                            : "mr-auto bg-gray-300 text-black"
                            }`}
                    >
                        {msg.text}
                    </div>
                ))}

                {/* Typing Indicator */}
                {loading && <div className="text-gray-500">AI is typing...</div>}

                {/* Invisible div to scroll into view */}
                <div ref={chatEndRef} />
            </div>

            {/* Input Box */}
            <div className="flex p-3 bg-white border-t">
                <input
                    type="text"
                    className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Type a message..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSend()}
                />
                <button
                    onClick={handleSend}
                    className="ml-2 bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
                    disabled={loading}
                >
                    <FaPaperPlane />
                </button>
            </div>
        </div>
    );
};

export default ChatUI;
