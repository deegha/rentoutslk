import React from 'react';
import { useFormContext } from 'react-hook-form';

const QuestionsForm = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div>
      <h2>Add up to 3 questions</h2>
      <label>
        Question 1
        <select {...register('question1')}>
          <option value="">Select a question</option>
          <option value="Can you provide references from previous landlords?">
            Can you provide references from previous landlords?
          </option>
          <option value="Do you have any pets?">Do you have any pets?</option>
        </select>
        {errors.question1 && <span>{errors.question1.message}</span>}
      </label>
      <label>
        Question 2
        <select {...register('question2')}>
          <option value="">Select a question</option>
          <option value="Can you provide references from previous landlords?">
            Can you provide references from previous landlords?
          </option>
          <option value="Do you have any pets?">Do you have any pets?</option>
        </select>
        {errors.question2 && <span>{errors.question2.message}</span>}
      </label>
      <label>
        Custom question
        <input
          {...register('customQuestion')}
          placeholder="Type your own question"
        />
        {errors.customQuestion && <span>{errors.customQuestion.message}</span>}
      </label>
    </div>
  );
};

export default QuestionsForm;
