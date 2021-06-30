import { Pagination } from 'antd';
import styles from './index.less';

const Index = (props: any) => {
  const { children } = props;
  return (
    <Pagination defaultPageSize={6} className={styles.pagination} {...props}>
      {children}
    </Pagination>
  );
};

export default Index;
