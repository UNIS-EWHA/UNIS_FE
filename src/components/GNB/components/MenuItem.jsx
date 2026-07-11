import { NavLink } from 'react-router-dom';

function MenuItem({ name, path, onClick }) {
  return (
    <li>
      <NavLink
        to={path}
        onClick={onClick}
        className={({ isActive }) =>
          isActive ? 'text-blue-mint' : 'text-white'
        }
      >
        {name}
      </NavLink>
    </li>
  );
}

export default MenuItem;
