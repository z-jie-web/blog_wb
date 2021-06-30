import { linkTo } from '@/utils/helps';
import classnames from 'classnames';
import styles from './index.less';
// import './index.less';

export interface IData {
  title: string;
  id: string;
}

interface IProps {
  item: IData;
  active: string;
  setActive: (id: string) => void;
}

const Index = (props: IProps) => {
  const { title, id } = props.item;
  const { active, setActive } = props;

  const handleClick = (id: string) => {
    setActive(id);
  };

  return (
    <div
      onClick={() => handleClick(id)}
      key={id}
      className={styles.displayItem}
    >
      <div
        className={classnames({
          content: true,
          active: active === id,
        })}
      >
        {title}
      </div>
    </div>
  );
};

export default Index;
