import React from 'react';

function GoalList({ goals }) {
  return (
    <div>
      <ul>
        {goals.map(goal => (
          <li key={goal.id}>{goal.text}</li>
        ))}
      </ul>
    </div>
  );
}

export default GoalList;
