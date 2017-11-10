import React from 'react';
import './score.css';

const Score = ({voteUp, voteDown, score}) => {
  return (
    <div className='Score'>
      <button className='Score-button Score-button--up' onClick={voteUp}>
        +1
      </button>
      <div className='Score-votes'>
        {score}
      </div>
      <button className='Score-button Score-button--down' onClick={voteDown}>
        -1
      </button>
    </div>
  );
}

export default Score;