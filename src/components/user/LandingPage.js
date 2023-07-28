import { Link } from 'react-router-dom';
import { Button, Row, Col, Typography, Image } from 'antd';
import LandingPageNav from '../layout/LandingPageNav';
import Footernav from '../layout/Footer';

const { Title, Text } = Typography;

const LandingPage = () => {

  return (
    <div style={{ position: 'relative' }}>
      <LandingPageNav />
      <Row gutter={[16, 16]} justify="start" className='rowSection' >
        <Col className='heroColSection' sm={12} md={12} xl={12} xs={24}>
          <div>
            <Title className='title'>
              <b style={{ color: '#00B3B4' }}>OneTrackPlan</b>, The All-in-One Track and Plan Solution
            </Title>
            <Text className='text'>
              OneTrackPlan is a powerful web application designed specifically for
              social media managers and freelancers, offering an all-in-one solution
              for efficient task management, content planning, time tracking,
              and financial tracking.
            </Text>
            <div className='heroCTA'>
              <Link to={"/registration"}>
                <Button
                  className='ctaButtons'
                  type='primary'
                >
                  Register now!
                </Button>
              </Link>
            </div>
          </div>
        </Col>
        <Col className='heroColSection' sm={12} md={12} xl={12} xs={24}>
          <Image
            width={'90%'}
            src={require('../../image/herosectionimage.png')}
            preview={false}
          />

        </Col>
      </Row>

      <Row gutter={[16, 16]} justify="start" style={{ width: '100%' }} className='rowSection'>
        <Col className='colSection' xs={24} sm={12} md={12} lg={12} xl={12}>
          <div>
            <Title className='title'>
              OneTrackPlan also includes a financial tracking component
            </Title>
            <Text className='text'>
              Allowing users to keep a close eye on their income and expenses. Gain valuable insights into your earnings,
              monitor project profitability, and manage your finances effectively, all within the application
            </Text>
            <br /><br />
            <Text className='text'>
              The daily task manager in OneTrackPlan enables users to create, assign, and prioritize tasks efficiently. Stay on top of deadlines
              and milestones with reminders and notifications, ensuring that all social media activities are executed flawlessly.
            </Text>
          </div>
        </Col>
        <Col className='colSection' span={12} xs={24} sm={12} md={12} lg={12} xl={12}>
          <Image
            width={'90%'}
            src={require('../../image/registerimage.png')}
            preview={false}
          />
        </Col>
      </Row>

      <Row gutter={[16, 16]} justify="start" style={{ width: '100%' }} className='rowSection2'>

        <Col className='colSection' span={12} xs={24} sm={12} md={12} lg={12} xl={12}>
          <Image
            width={'90%'}
            src={require('../../image/loginimage.png')}
            preview={false}
          />
        </Col>

        <Col className='colSection' xs={24} sm={12} md={12} lg={12} xl={12}>
          <div>
            <Title className='title'>
              OneTrackPlan is the ultimate companion for managing social media tasks
            </Title>
            <Text className='text'>
              The content planner feature of OneTrackPlan allows users to effortlessly create and schedule social media posts,
              ensuring consistent and engaging content across multiple platforms. With an intuitive calendar view, users can visualize their
              content strategy, make adjustments easily, and collaborate with team members for seamless coordination.
            </Text>
          </div>
        </Col>
      </Row>
      <Footernav />
    </div>
  );
};

export default LandingPage;
