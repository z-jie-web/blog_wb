import { Card } from 'antd';
import styles from './index.less';

const Index = (props: any) => {
  const { children } = props;
  return <Card className={styles.card} bordered={false} {...props}>{children}</Card>;
};

export default Index;
