import React, { useState } from 'react';

const NewGoal = ({ onGoalSubmit }) => {
  const [newGoal, setNewGoal] = useState('');

  const handleAddNewGoal = e => {
    e.preventDefault();

    const goal = {
      id: Math.random().toString(),
      text: newGoal,
    };

    setNewGoal('');

    onGoalSubmit(goal);
  };

  return (
    <div>
      <form onSubmit={handleAddNewGoal}>
        <input
          type='text'
          value={newGoal}
          onChange={e => setNewGoal(e.target.value)}
        />
        <button type='submit'>Add Goal</button>
      </form>
    </div>
  );
};

export default NewGoal;
