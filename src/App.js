import React, { useState } from "react";
import "./App.css";

const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: "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"
});
const openai = new OpenAIApi(configuration);

function App() {
  const [userInput, setUserInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false); 
  function onClear() {
    setUserInput("");
  }

  const handleChange = (event) => {
    setUserInput(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: userInput,
        max_tokens: 1000,
        temperature: 1
      });

      setMessages((messages) => [
        ...messages,
        [userInput, response.data.choices[0].text]
      ]);

      console.log(JSON.stringify(response.data.choices[0].text));
      onClear();
      setIsLoading(false);

      console.log(messages);
    } catch (error) {
      console.error("Error:", error);
      setIsLoading(false);
    }
  };

  function replaceWithBr(word) {
    return word.replace(/\n/g, "<br />");
  }

  function RenderMessage() {
    return (
      <ol className="message-list">
        {messages.map((message, index) => (
          <li key={index} className={`message-container`}>
            <div className={`message user`}>
              <strong>User:</strong> {message[0]}
            </div>
            <div className={`message gpt`}>
              <strong>ChatGPT:</strong>

              <p
                className={"inside"}
                dangerouslySetInnerHTML={{ __html: replaceWithBr(message[1]) }}
              />
            </div>
          </li>
        ))}
      </ol>
    );
  }

  return (
    <div className="App">
      <h1>ChatGPT Handler</h1>
      <h2 style={{ color: "Blue" }}> By Viswa Gullapalli </h2>
      <form onSubmit={handleSubmit}>
        <label>
          Enter your prompt:
          <input
            id="userInput"
            type="text"
            value={userInput}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Send</button>
        {isLoading && <span className="loading-spinner"></span>}
      </form>
      <div>
        <RenderMessage />
      </div>
    </div>
  );
}

export default App;
