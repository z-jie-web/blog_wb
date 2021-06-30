import { Row, Col } from 'antd';
import Card from '@/components/Card';
import ArticleItem, { IData } from '@/components/ArticleItem';
import data from '@/utils/constant';
import {linkTo} from '@/utils/helps';
import 'swiper/swiper.less';
import Swiper from './swiper';
import styles from './index.less';

const Index = () => {
  const { articleData } = data;

  const handleCheck=()=>{
    linkTo('/people')
  }

  const renderExtra = () => {
    return <span onClick={handleCheck}>查看更多 {`>`}</span>;
  };

  return (
    <div>
      <Swiper />
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        <Col span={16}>
          <Card title="个人文章" extra={renderExtra()}>
            {articleData.map((item: IData) => (
              <ArticleItem item={item} />
            ))}
          </Card>
        </Col>
        <Col span={8}>
          <Card title="学习链接" extra={renderExtra()}>
            11111
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Index;
