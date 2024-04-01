import React, { useState } from "react";

const Qna = ({ que, options, ans }) => {
  const [selectedOption, setSelectedOption] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [showSubmit, setShowSubmit] = useState(true);
  const [correctAnswer, setCorrectAnswer] = useState("");

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
    setShowPopup(false); // Hide popup when option changes
  };

  const handleSubmit = () => {
    if (selectedOption === ans) {
      setShowPopup(true);
    } else {
      setShowPopup(true);
      setCorrectAnswer(ans);
    }
    setShowSubmit(false); // Hide submit button after submission
  };

  return (
    <div className="main">
      <div
        className="mt-20 items-center"
        style={{ backgroundColor: "#2196BA", height: "60px" }}
      >
        <div
          className="flex justify-center mx-auto"
          style={{ color: "white", fontWeight: "bold", fontFamily: "Raleway" }}
        >
          <div className="mt-4"> QnA for Above Reading</div>
        </div>
      </div>
      <div
        className="theqna mt-5 w-full flex flex-col items-center justify-center mb-10"
        style={{ fontFamily: "Raleway" }}
      >
        <div className="question">
          <div htmlFor="question" className="text-xl flex">
            <div className="font-bold">Q.1</div>
            <div className="ml-3 font-bold">{que}</div>
          </div>
          <div className="options pl-9 p-3">
            {options.map((option, index) => (
              <div key={index} className="op">
                <input
                  type="radio"
                  id={`option${index + 1}`}
                  name="question"
                  value={option}
                  onChange={handleOptionChange}
                  disabled={!showSubmit} // Disable options after submission
                />
                <label
                  htmlFor={`option${index + 1}`}
                  className={`text-xl ml-3 ${
                    selectedOption === option ? "text-blue-500" : ""
                  }`}
                >
                  {option}
                </label>
                <br />
              </div>
            ))}
          </div>
        </div>
        {showSubmit && (
          <div className="submitbutton flex justify-center">
            <button className="submit" onClick={handleSubmit}>
              Submit
            </button>
          </div>
        )}
        {showPopup && (
          <div className="popup">
            {selectedOption === ans ? (
              <p className="bg-green-200 p-1 rounded-lg">Nice job! You selected the correct answer.</p>
            ) : (
              <p className="bg-red-200 p-2 rounded-lg">Oops! The correct answer is: <span className="font-bold">{correctAnswer}</span></p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Qna;
