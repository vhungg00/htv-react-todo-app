import React from 'react'
import { Link } from 'react-router-dom';

import { ScreenUrlPath } from '@/typing/ScreenUrlPath';

const NotFound: React.FC = () => {
  return (
    <div className='container' style={{ margin: '100px 0' }}>
      <img src="/img/404.png" alt="" className="w-100 h-100" />
      <div className="text-center fw-bold">
        <h1 className="mt-3">Oops! Page Not Found.</h1>
        <p className="opacity-75 my-4">The page you are looking for is not avaible or doesn't belong to this website!</p>
        <Link to={ScreenUrlPath.Root} className='fd-btn w-25 mx-auto'><i className="bi bi-link-45deg me-2"></i>GO TO HOME</Link>
      </div>
    </div>
  )
};

export default NotFound;