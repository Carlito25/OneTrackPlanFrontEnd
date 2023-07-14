import { Link } from 'react-router-dom';
import { Button } from 'antd';


const LandingPage = () => {

  return (
    <div>
      {/* Render the login page */}
      {/* <Login /> */}
      <h1>Hello</h1>
      <Link to={"/login"}>
        <Button 
          type='primary'
        >
          Login
        </Button>
      </Link>

      <Link to={"/registration"}>
        <Button 
          type='default'
        >
          Registration
        </Button>
      </Link>
    </div>
  );
};

export default LandingPage;
