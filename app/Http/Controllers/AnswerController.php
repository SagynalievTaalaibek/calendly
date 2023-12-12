<?php

namespace App\Http\Controllers;

use App\Models\SurveyQuestionAnswer;
use Illuminate\Http\Request;

class AnswerController extends Controller
{
    public function index()
    {
        // Вывод всех записей модели SurveyQuestionAnswer
        $surveyQuestionAnswers = SurveyQuestionAnswer::all();
        return response()->json($surveyQuestionAnswers);
    }

    public function show($id)
    {
        // Вывод конкретной записи модели SurveyQuestionAnswer по ее ID
        $surveyQuestionAnswer = SurveyQuestionAnswer::findOrFail($id);
        return response()->json($surveyQuestionAnswer);
    }

    public function store(Request $request)
    {
        // Создание новой записи модели SurveyQuestionAnswer
        $validatedData = $request->validate([
            'survey_question_id' => 'required',
            'survey_answer_id' => 'required',
            'answer' => 'required',
        ]);

        $surveyQuestionAnswer = SurveyQuestionAnswer::create($validatedData);
        return response()->json($surveyQuestionAnswer, 201);
    }

    public function update(Request $request, $id)
    {
        // Обновление записи модели SurveyQuestionAnswer по ее ID
        $validatedData = $request->validate([
            'survey_question_id' => 'required',
            'survey_answer_id' => 'required',
            'answer' => 'required',
        ]);

        $surveyQuestionAnswer = SurveyQuestionAnswer::findOrFail($id);
        $surveyQuestionAnswer->update($validatedData);
        return response()->json($surveyQuestionAnswer, 200);
    }

    public function destroy($id)
    {
        // Удаление записи модели SurveyQuestionAnswer по ее ID
        $surveyQuestionAnswer = SurveyQuestionAnswer::findOrFail($id);
        $surveyQuestionAnswer->delete();
        return response()->json(null, 204);
    }

    public function deleteAnswersBySurvey(Survey $survey)
    {
        try {
            // Находим и удаляем все ответы для данного опроса
            SurveyQuestionAnswer::where('survey_answer_id', $survey->id)->delete();
            
            return response()->json(['message' => 'All answers for the survey have been deleted'], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Failed to delete answers'], 500);
        }
    }
}
