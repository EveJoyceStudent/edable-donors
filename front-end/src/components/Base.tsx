import { Outlet } from 'react-router-dom';

function BasePage() {
  return (
    <>
      {/* An <Outlet> renders whatever child route is currently active,
          so you can think about this <Outlet> as a placeholder for
        the child routes we defined above. */}        
      <Outlet/>
    </>
  );
}

export default BasePage;