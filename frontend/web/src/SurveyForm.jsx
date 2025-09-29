import { useState } from "react";

export default function SurveyForm() {
  const [mood, setMood] = useState(3);
  const [stress, setStress] = useState(3);
  const [text, setText] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/surveys/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          employee_id: null,  // NULL means anonymous
          mood_rating: parseInt(mood),
          stress_rating: parseInt(stress),
          free_text: text
        }),
      });

      if (!response.ok) {
        alert("Failed to submit survey ❌");
        return;
      }

      const data = await response.json();
      console.log("Inserted survey:", data);
      alert("Survey submitted ✅"); // This alert will show now
      setMood(3); // reset form
      setStress(3);
      setText("");
    } catch (err) {
      console.error(err);
      alert("Error! Check console.");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: "400px", margin: "20px" }}>
      <h2>Daily Survey</h2>
      <label>Mood (1-5): </label>
      <input type="number" min="1" max="5" value={mood} onChange={e => setMood(e.target.value)} /><br/><br/>
      <label>Stress (1-5): </label>
      <input type="number" min="1" max="5" value={stress} onChange={e => setStress(e.target.value)} /><br/><br/>
      <label>Notes: </label><br/>
      <textarea value={text} onChange={e => setText(e.target.value)} /><br/><br/>
      <button type="submit">Submit</button>
    </form>
  );
}
