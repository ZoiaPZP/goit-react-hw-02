import Description from '../Description/Description';
import Feedback from '../Feedback/Feedback';
import Options from '../Options/Options';
import Notification from '../Notification/Notification';
import './App.css';
import { useState, useEffect } from 'react';

function App() {
  const [state, setState] = useState(() => {
    const savedState = window.localStorage.getItem('saved-state');
    if (savedState !== null) {
      return JSON.parse(savedState);
    }
    return {
      good: 0,
      neutral: 0,
      bad: 0,
    };
  });

  useEffect(() => {
    window.localStorage.setItem('saved-state', JSON.stringify(state));
  }, [state]);

  const updateFeedback = feedbackType => {
    if (feedbackType === 'reset') {
      setState({
        good: 0,
        neutral: 0,
        bad: 0,
      });
    } else {
      if (feedbackType in state) {
        setState({
          ...state,
          [feedbackType]: state[feedbackType] + 1,
        });
      }
    }
  };

  const totalFeedback = state.good + state.neutral + state.bad;
  const positiveFeedback = Math.round((state.good / totalFeedback) * 100);

  return (
    <>
      <Description />
      <Options callback={updateFeedback} feedback={totalFeedback} />
      {totalFeedback ? (
        <Feedback
          good={state.good}
          bad={state.bad}
          neutral={state.neutral}
          total={totalFeedback}
          positive={positiveFeedback}
        />
      ) : (
        <Notification />
      )}
    </>
  );
}
export default App;
