import Head from "next/head";
import { useState } from "react";

export default function CharacterCounter() {
  const [text, setText] = useState("");

  return (
    <>
      <Head>
        <title>Character Counter</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main style={{ padding: "2rem", fontFamily: "sans-serif" }}>
        <h1>Character Counter</h1>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={10}
          cols={50}
          style={{ width: "100%", fontSize: "1rem" }}
          placeholder="Type here..."
        />
        <p>Character Count: {text.length}</p>
      </main>
    </>
  );
}
