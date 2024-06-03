import React, { useState } from 'react';
import axios from 'axios'; // for making HTTP requests

const Earn = () => {
  const [question, setQuestion] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/questions', { question });
      console.log(response.data); // assuming the backend responds with the added question
      // Reset the form
      setQuestion('');
    } catch (error) {
      console.error('Error adding question:', error);
    }
  };

  return (
    <div>
      <h2>Add Question</h2>
      <form onSubmit={handleSubmit} className='p-5'>
        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Type your question here..."
          required
          className=' bg-slate-100 rounded-sm p-4'
        />
        <button type="submit" className=' bg-slate-100 block p-3 px-4 rounded-md '>Submit</button>
      </form>
    </div>
  );
};

export default Earn;
