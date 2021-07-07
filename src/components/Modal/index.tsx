import { Modal } from 'antd';
import styles from './index.less';

const Index = (props: any) => {
  const { children } = props;
  return (
    <Modal className={styles.modal} bordered={false} {...props}>
      {children}
    </Modal>
  );
};

export default Index;
