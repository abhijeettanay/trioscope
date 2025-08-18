import React, { useState } from "react";

const Feedback: React.FC = () => {
  const [feedback, setFeedback] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Feedback submitted:", feedback);
    setFeedback(""); // clear after submit
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-2xl">
      <h2 className="text-xl font-bold mb-4">We’d love your Feedback 💬</h2>
      
      <form onSubmit={handleSubmit} className="mb-6">
        <textarea
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          placeholder="Write your feedback here..."
          className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-400"
          rows={4}
        />
        <button
          type="submit"
          className="mt-3 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Submit
        </button>
      </form>

      <div className="bg-gray-100 p-4 rounded-lg">
        <h3 className="font-semibold mb-2">📞 Contact Us</h3>
        
        <p>Sales: +91 9122020097</p>
        <p>Email: abhijeettanay@gmail.com</p>
      </div>
    </div>
  );
};

export default Feedback;
