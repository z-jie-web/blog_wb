import { Empty } from 'antd';
import styles from './index.less';

const defaultSrc =
  'https://img1.baidu.com/it/u=4035469828,2701794859&fm=26&fmt=auto&gp=0.jpg';
const Index = (props: any) => {
  const { src = defaultSrc, des = '没有，满意了吧！' } = props;

  return <Empty className={styles.empty} image={src} description={des} />;
};

export default Index;
