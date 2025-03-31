import css from './Options.module.css';

const Options = ({ callback, feedback }) => {
  return (
    <ul className={css.options}>
      <li>
        <button onClick={() => callback('good')}>Good</button>
      </li>
      <li>
        <button onClick={() => callback('neutral')}>Neutral</button>
      </li>
      <li>
        <button onClick={() => callback('bad')}>Bad</button>
      </li>
      {feedback > 0 && (
        <li>
          <button onClick={() => callback('reset')}>Reset</button>
        </li>
      )}
    </ul>
  );
};

export default Options;