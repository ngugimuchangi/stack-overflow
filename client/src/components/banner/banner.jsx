import { Link } from 'react-router-dom';
import Search from '../search/search';
import logo from '../../assets/logo.svg';
import './banner.css';

/**
 * Banner component
 *
 * @returns {JSX.Element} Banner component
 */
function Banner() {
  return (
    <header>
      <div className='header-content'>
        <Link to='/' className='logo-and-text'>
          <img src={logo} alt='logo' className='logo' />
          <h1>Fake Stack Overflow</h1>
        </Link>
        <Search />
      </div>
    </header>
  );
}

export default Banner;
