import { Card } from 'antd';
import { linkTo } from '@/utils/helps';
import dayjs from 'dayjs';
import styles from './index.less';

const { Meta } = Card;

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
  const { cover, description, _id, date } = props.item;

  const handleClick = () => {
    linkTo(`/people/detail?id=${_id}`);
  };

  const currentData = new Date();

  return (
    <Card
      hoverable
      className={styles.displayCard}
      cover={
        <img
          alt="example"
          src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
        />
      }
    >
      <Meta title="Europe Street beat" description="www.instagram.com" />
    </Card>
  );
};

export default Index;
