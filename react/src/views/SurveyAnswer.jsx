import React, { useState, useEffect } from 'react';
import axiosClient from '../axios';

const SurveyAnswer = () => {
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    axiosClient.get("/survey-question-answer").then(({ data }) => {
      console.log('Data from survey', data);
      setAnswers(data);
    });
  }, []);

  const handleDeleteAll = (surveyAnswerId) => {
    axiosClient.delete(`/survey-answer/${surveyAnswerId}`).then(() => {
      setAnswers(prevAnswers => prevAnswers.filter(answer => answer.survey_answer_id !== surveyAnswerId));
    }).catch(error => {
      console.error('Error deleting answers:', error);
    });
  };

  const groupedAnswers = answers.reduce((acc, answer) => {
    const index = acc.findIndex(item => item.survey_answer_id === answer.survey_answer_id);
    if (index !== -1) {
      acc[index].responses.push({ id: answer.id, answer: answer.answer });
    } else {
      acc.push({
        survey_answer_id: answer.survey_answer_id,
        responses: [{ id: answer.id, answer: answer.answer }]
      });
    }
    return acc;
  }, []);

  const tableRows = groupedAnswers.map((group, index) => (
    <tr key={index}>
      <td className="border px-4 py-2">{group.responses[0].answer}</td>
      <td className="border px-4 py-2">{group.responses[1].answer}</td>
      <td className="border px-4 py-2">{group.responses[2].answer}</td>
      <td className="border px-4 py-2">{group.responses[3].answer}</td>
    </tr>
  ));

  return (
    <div className="mx-auto px-4">
      <div className="overflow-x-auto">
        <table className="min-w-full">  
          <thead>
            <tr>
              <th className="bg-gray-200 border px-4 py-2">ИМЯ</th>
              <th className="bg-gray-200 border px-4 py-2">Email</th>
              <th className="bg-gray-200 border px-4 py-2">Date</th>
              <th className="bg-gray-200 border px-4 py-2">Time</th>
            </tr>
          </thead>
          <tbody>
            {tableRows}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SurveyAnswer;
