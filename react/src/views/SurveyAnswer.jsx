import React, { useState, useEffect } from 'react';
import axiosClient from '../axios';

const SurveyAnswer = () => {
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    axiosClient.get("/survey-question-answer").then(({ data }) => {
        console.log('Data from survey', data);
        setAnswers(data); 
    });
  }, [])



  return (
    <div>
      <h1>Ответы на вопросы опросов</h1>
      <ul>
        {answers.map((answer) => (
          <ol key={answer.id}>
            {answer.answer}
          </ol>
        ))}
      </ul>
    </div>
  );
};

export default SurveyAnswer;
