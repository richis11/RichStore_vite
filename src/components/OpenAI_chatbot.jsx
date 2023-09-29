//import Head from "next/head";
import { useState } from "react";
//import styles from "./index.module.css";

export default function OpenAI_chatbot() {
  const [textInput, setTextInput] = useState("");
  const [result, setResult] = useState();

  async function onSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:3001/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ texto: textInput }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }

      setResult(data.result);
      setTextInput("");
      console.log(data.result)
    } catch(error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    }
  }

  return (
    <div>
      

      <main >
        {/* <img src="/dog.png" className={styles.icon} /> */}
        <h3>RICH STORE CHATBOT</h3>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="textInput"
            placeholder="Introduce texto..."
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
          />
          <input type="submit" value="Aceptar" />
        </form>
        <div >{result}</div>
        
      </main>
    </div>
  );
}
