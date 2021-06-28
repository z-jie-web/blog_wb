import styles from './index.less';
import Swiper from './swiper';
import 'swiper/swiper.less';

const Index = () => {



  return (
    <div>
      <Swiper/>

      <h1 className={styles.title}>Page index</h1>
    </div>
  );
}

export default Index