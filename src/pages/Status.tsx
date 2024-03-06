import { useNavigate } from 'react-router-dom';
import './Status.css';

function Status() {
  const { orderNr, eta } = history.state.usr;
  const navigate = useNavigate();

  const handleOkClick = () => {
    navigate('/menu'); 
  };

  return (
    <div className="status-container">
      <p className="status-order">Ordernummer: {orderNr}</p>
      <div className='innercol'>
        <div className="status-image"></div>
        <div className="status-info">
          <h4>Din beställning är på väg!</h4>
          <p className="status-time">Beräknad leveranstid: <span className="bold">{eta}</span> minuter</p>
        </div>
      </div>
      <button className="ok" onClick={handleOkClick}>Ok, cool!</button>
    </div>
  );
}

export default Status;