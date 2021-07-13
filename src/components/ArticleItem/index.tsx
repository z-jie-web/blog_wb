import { Card } from 'antd';
import { linkTo } from '@/utils/helps';
import dayjs from 'dayjs';
import styles from './index.less';

export interface IData {
  cover?: string;
  content: string;
  description: string;
  _id: string;
  date: string;
}

interface IProps {
  item: IData;
}

const Index = (props: IProps) => {
  console.log(props, 'propsprops');
  const { cover, description, _id, date } = props.item;
  console.log(_id);
  console.log(dayjs(date).format('YYYY-MM-DD HH:mm:ss'));

  const handleClick = (id: string) => {
    linkTo(`/people/detail?id=${_id}`);
  };

  const currentData = new Date();

  return (
    <Card.Grid className={styles.displayCard}>
      <div
        onClick={() => handleClick(_id)}
        key={`id${currentData}`}
        className={styles.displayItem}
      >
        <img className={styles.img} src={cover} alt="" />
        <div className={styles.right}>
          <div className={styles.content}>{description}</div>
          <div className={styles.footerContent}>
            {dayjs(date).format('YYYY-MM-DD HH:mm:ss')}
          </div>
        </div>
      </div>
    </Card.Grid>
  );
};

export default Index;
