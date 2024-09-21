import React, { useState } from 'react';
import Gemini from "services/Gemini";
import ReactMarkdown from 'react-markdown';

export default function Aireview() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [showfeedback, setShowFeedback] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleViewFeedback = () => {
    setShowFeedback(!showfeedback);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!selectedFile) {
      console.log('please select a file');
      return;
    }
    const formData = new FormData();
    formData.append('file', selectedFile);
    try {
      setLoading(true);
      const response = await Gemini.getAiReview(selectedFile);
      console.log(response);
      setFeedback(response.data.result); // Assuming the result is in markdown format
      setShowFeedback(true);
    } catch (error) {
      console.error("Error uploading file:", error);
      setFeedback("Error uploading file.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen py-16">
      {!showfeedback && <div className="max-w-3xl mx-auto px-6">
        <h1 className="text-4xl font-bold text-gray-900 text-center mb-8">
          Upload Your Resume for AI Feedback
        </h1>

        <p className="text-lg text-gray-700 text-center mb-8">
          Upload your resume to receive detailed feedback powered by AI. Get tips on strengths, areas of improvement, and personalized suggestions to boost your chances of landing your dream job.
        </p>

        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-8">
          <div className="mb-6">
            <label class="block mb-2 text-sm font-medium p-1 text-gray-900 dark:text-white"  htmlFor="resume">
              Upload Resume (PDF or Image)
            </label>
            <input
              type="file"
              accept=".pdf, image/*"
              onChange={handleFileChange}
             className="block w-full p-1 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-non dark:border-gray-600 dark:placeholder-gray-400"
              id="resume"
            />
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="bg-[#ffb274] text-white font-bold py-2 px-4 rounded-lg hover:bg-[#ffa65d] focus:outline-none"
              disabled={loading}
            >
              {loading ? "Uploading..." : "Get AI Feedback"}
            </button>
          </div>
        </form>
      </div>
      }
      {showfeedback && (<div className='flex  max-w-3xl mx-auto gap-5 items-center justify-around'>
        <div className='border-r-2 '>
        <img src='aibot2.gif' autoplay className='w-96' />
        <p className='font-bold'>Points Evaluated On</p>
        <ol>
          <li>1. Grammar</li>
          <li>2. Points Importance</li>
          <li>3. Action verbs</li>
          <li>4. Impact</li>
          <li>5. Experience/ Projects</li>
        </ol>
        </div>
        <div className="mt-8 bg-gray-100 w-full p-6 rounded-lg">
          <h3 className="text-2xl font-bold">AI Feedback</h3>
          <hr className='shadow-md border my-2' />
          <ReactMarkdown className="text-gray-700">
            {feedback}
          </ReactMarkdown>
          <div className=" my-2 pt-4">
            <button
              onClick={handleViewFeedback}
              className="bg-[#F8BD8D] text-white font-bold py-2 px-4 rounded-lg hover:bg-[#ffb274] focus:outline-none"
              disabled={loading}
            >
              {loading ? "Uploading..." : "Get another Feedback"}
            </button>
          </div>
        </div>
      </div>
      )}
    </div>
  );
}
