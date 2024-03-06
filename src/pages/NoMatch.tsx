import './NoMatch.css';

function NoMatch() {
  return (
    <div className='nomatch-container'>
      <h1 className='nomatch-title'>404 - Page Not Found</h1>
      <p className='nomatch-text'>Oops! The page you are looking for does not exist.</p>
    </div>
  );
}

export default NoMatch;