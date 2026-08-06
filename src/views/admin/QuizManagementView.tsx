import React, { useState } from 'react';
import { Quiz, Question, Module } from '../../types';
import { HelpCircle, Plus, Edit, Trash2, CheckCircle2 } from 'lucide-react';

interface QuizManagementViewProps {
  quizzes: Quiz[];
  questions: Question[];
  modules: Module[];
  onRefresh: () => void;
}

export const QuizManagementView: React.FC<QuizManagementViewProps> = ({
  quizzes,
  questions,
  modules,
  onRefresh,
}) => {
  return (
    <div className="space-y-6 pb-12 animate-fadeIn">
      <div className="bg-white rounded-3xl p-6 lg:p-8 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-700 mb-2">
            Assessment Management
          </span>
          <h2 className="text-2xl font-extrabold text-slate-900">Quiz & Question Bank Editor</h2>
          <p className="text-xs text-slate-500 mt-1">Manage multiple-choice questions, passing percentages, and explanation notes.</p>
        </div>
      </div>

      <div className="space-y-6">
        {quizzes.map(quiz => {
          const quizQuestions = questions.filter(q => q.quizId === quiz.quizId);
          return (
            <div key={quiz.quizId} className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <span className="text-xs font-bold font-mono text-blue-600 uppercase">{quiz.quizId}</span>
                  <h3 className="text-lg font-bold text-slate-900">{quiz.title}</h3>
                  <p className="text-xs text-slate-500">Pass Mark: {quiz.passPercentage}% | Questions: {quizQuestions.length}</p>
                </div>
              </div>

              <div className="space-y-3">
                {quizQuestions.map((q, idx) => (
                  <div key={q.questionId} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 text-xs space-y-2">
                    <p className="font-bold text-slate-900">{idx + 1}. {q.question}</p>
                    <div className="grid grid-cols-2 gap-2 text-slate-600">
                      <p>A: {q.optionA}</p>
                      <p>B: {q.optionB}</p>
                      <p>C: {q.optionC}</p>
                      <p>D: {q.optionD}</p>
                    </div>
                    <p className="text-emerald-700 font-bold">Correct Answer: Option {q.correctAnswer}</p>
                    {q.explanation && <p className="text-slate-500 italic">Note: {q.explanation}</p>}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
