import React, { useState } from 'react';
import GoalList from './components/GoalList/GoalList';
import NewGoal from './components/NewGoal/NewGoal';

const App = () => {
  const [goalList, setGoalList] = useState([
    {
      id: '1',
      text: 'Create an entire MERN app',
    },
    {
      id: '2',
      text: 'Sucessfully understand the MERN stack',
    },
  ]);

  const onGoalSubmit = newGoal => {
    setGoalList(prevGoal => prevGoal.concat(newGoal));
  };

  return (
    <div>
      <h1>My Goals</h1>
      <NewGoal onGoalSubmit={onGoalSubmit} />
      <GoalList goals={goalList} />
    </div>
  );
};

export default App;
