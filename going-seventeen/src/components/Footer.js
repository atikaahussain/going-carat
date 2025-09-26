import { Link } from 'react-router-dom';
import '../style/Footer.css';

const Footer = () => {
  return (
    <div className="bottom">
      <div className='b-line-1'>
        <h3>Built and designed by Radiant.</h3>
        <div className='links'>
          <a href="https://instagram.com/radiantartt" className="fa-brands fa-instagram"></a>
          <a href="mailto:atikahussain248@gmail.com" className="fa fa-envelope"></a> 
          <Link to="/about" className='aboutme'>‧｡⋆About-me♬⋆｡˚</Link>
        </div>
      </div>
      <h3> All content belong to SEVENTEEN and PLEDIS Entertainment. </h3>
    </div>
  );
};

export default Footer;
