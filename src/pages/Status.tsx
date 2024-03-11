import { useNavigate } from 'react-router-dom';
import './Status.css';

function Status() {
  const historyState = history.state.usr || {};
  const { orderNr, eta } = historyState;
  const navigate = useNavigate();

  const handleOkClick = () => {
    navigate('/menu');
  };

  return (
    <div className="status-container">
      {orderNr ? (
        <>
          <p className="status-order">Ordernummer: {orderNr}</p>
          <div className='innercol'>
            <div className="status-image"></div>
            <div className="status-info">
              <h4>Din beställning är på väg!</h4>
              <p className="status-time">Beräknad leveranstid: <span className="bold">{eta}</span> minuter</p>
            </div>
          </div>
          <button className="ok" onClick={handleOkClick}>Ok, cool!</button>
        </>
      ) : (
        <p>Ingen beställning har lagts ännu!</p>
      )}
    </div>
  );
}

export default Status;