import { Card } from 'antd';
import Texty from 'rc-texty';
import 'rc-texty/assets/index.css';
import styles from './index.less';

const Index = (props: any) => {
  const { children, title } = props;
  const renderTitle = () => {
    if (typeof title === 'string') {
      return <Texty>{title}</Texty>;
    }
    return title();
  };
  return (
    <Card
      className={styles.card}
      bordered={false}
      {...props}
      title={renderTitle()}
    >
      {children}
    </Card>
  );
};

export default Index;
