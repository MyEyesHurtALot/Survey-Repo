import { useState } from "react";
import firefighter from "./assets/firefighter.png";
import "./App.css";

function App() {
  const questions = [
    {
      text: "Is anybody in the household aged 55 or over?",
      type: "text",
    },
    {
      text: "Does the person live alone?",
      type: "text",
    },
    {
      text: "Would anyone be less able to react to a fire due to reduced mobility, or other forms of impairment or disability?",
      type: "text",
    },
    {
      text: "Does anybody smoke inside the home?",
      type: "text",
    },
    {
      text: "What is the type of residence?",
      type: "MultipleChoice",
      choices: ["Apartment", "House", "Condo", "Other"],
    },
    {
      text: "What is the age of the building?",
      type: "MultipleChoice",
      choices: ["10-20", "20-30", "30-40", "40-50"],
    },
    {
      text: "Is there a working home fire alarm device in the home?",
      type: "text",
    },
    {
      text: "Are there any PMD in the home?",
      type: "text",
    },
    {
      text: "Do any of the follow risks exist at home? (Candles or naked flames, Incense, Oil Burners)",
      type: "text",
    },
    {
      text: "Do any of the follow risks exist at home? (Overloaded plugs and sockets,Electric plugs without safety mark, Circuit breaker that trip, Unattended charging of devices or batteries overnight   )",
      type: "text",
    },
    {
      text: "Are there any of the escape routes blocked?",
      type: "text",
    },
    {
      text: "Are there any textile or upholstery, or other combustible such as sofa, mattress, clothings in close proximity to fire source or electrical appliances, along the route of escape?",
      type: "text",
    },
    // Add more questions here
  ];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0 && !submitted) {
      setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
    }
  };

  const handleAnswer = (answer : any) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [currentQuestionIndex]: answer,
    }));
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handleTextInputAnswer = (value : any) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [currentQuestionIndex]: value,
    }));
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    }
  };

  const submitHandler = async () => {

    
    // Create an object with properties q1 through q12
    const userAnswers = {
      q1: answers[0] ,
      q2: answers[1] ,
      q3: answers[2] ,
      q4: answers[3] ,
      q5: answers[4] ,
      q6: answers[5] ,
      q7: answers[6] ,
      q8: answers[7] ,
      q9: answers[8] ,
      q10: answers[9] ,
      q11: answers[10] ,
      q12: answers[11] ,
    };
  
    console.log("User answers:", userAnswers);
  
    try {
      // Replace '/' with the correct URL of your server and the route you want to make a POST request to
      const response = await fetch('http://localhost:4000/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userAnswers),
      });
      console.log('Response status:', response.status);
      console.log('Response body:', await response.text()); 
      if (response.ok) {
        setSubmitted(true);
      } else {
        // Handle error
        console.error('Error submitting survey');
      }
    } catch (error) {
      // Handle network error
      console.error('Network error:', error);
    }
  };

  const renderQuestion = (question : any) => {
    switch (question.type) {
      case "text":
        return (
          <div className="card">
            <button
              className="answer-buttons"
              onClick={() => handleAnswer("Yes")}
            >
              Yes
            </button>
            <button
              className="answer-buttons"
              onClick={() => handleAnswer("No")}
            >
              No
            </button>
          </div>
        );
      case "MultipleChoice":
        return (
          <div className="card">
            {question.choices.map((choice : any) => (
              <button
                className="answer-buttons"
                key={choice}
                onClick={() => handleAnswer(choice)}
              >
                {choice}
              </button>
            ))}
          </div>
        );
      case "TextInput":
        return (
          <input
            type="text"
            onChange={(e) => handleTextInputAnswer(e.target.value)}
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      <img
        src={firefighter}
        className="logo react banner-image"
        alt="React logo"
      />

      <div className="card">
        {submitted ? (
          <div>
            <h3 className="submit-message">Thank you for submitting!</h3>
          </div>
        ) : (
          <>
            <h3 className="question-heading">
              {questions[currentQuestionIndex].text}
            </h3>
            <div className="question-content">
              {renderQuestion(questions[currentQuestionIndex])}
            </div>

            <div className="button-container">
              <button
                onClick={
                  currentQuestionIndex === questions.length - 1
                    ? submitHandler
                    : handlePreviousQuestion
                }
                disabled={currentQuestionIndex === 0 || submitted}
                className="button"
              >
                {currentQuestionIndex === questions.length - 1
                  ? "Submit"
                  : "Previous"}
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default App;
