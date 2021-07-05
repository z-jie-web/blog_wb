import { linkTo } from '@/utils/helps';
import dayjs from 'dayjs';
import styles from './index.less';

export interface IData {
  src?: string;
  content: string;
  id: string;
}

interface IProps {
  item: IData;
}

const Index = (props: IProps) => {
  const { src, content, id } = props.item;

  const handleClick = (id: string) => {
    linkTo(`/people/detail?id=${id}`);
  };

  const currentData = new Date();

  return (
    <div
      onClick={() => handleClick(id)}
      key={`id${currentData}`}
      className={styles.displayItem}
    >
      <img className={styles.img} src={src} alt="" />
      <div>
        <div className={styles.content}>{content}</div>
        <div className={styles.footerContent}>
          {dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss')}
        </div>
      </div>
    </div>
  );
};

export default Index;
