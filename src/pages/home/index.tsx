import { useState, useEffect } from 'react';
import { Row, Col } from 'antd';
import Card from '@/components/Card';
import ArticleItem, { IData } from '@/components/ArticleItem';
import { linkTo } from '@/utils/helps';
import { get } from '@/utils/request';
import 'swiper/swiper.less';
import Swiper from './swiper';
import styles from './index.less';

interface ObjectOf<V> {
  [_: string]: V;
}
interface IRes {
  message: string;
  status: number;
  result: ObjectOf<IData>;
  total: number;
}

const Index = () => {
  const [dataList, setDataList] = useState([]);
  const [loading, setLoading] = useState(false);

  const getDataList = (params: object) => {
    setLoading(true);
    get('/people', { active: '1', ...params }).then((res) => {
      const _res = res as IRes;
      console.log(res, 'resres');
      setDataList(_res.result);
      setLoading(false);
    });
  };

  useEffect(() => {
    getDataList({ current: 1, pageSize: 5 });
  }, []);

  const handleCheck = () => {
    linkTo('/people');
  };

  const renderExtra = () => {
    return <span onClick={handleCheck}>查看更多 {`>`}</span>;
  };

  return (
    <div>
      <Swiper />
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        <Col span={16}>
          <Card title="个人文章" loading={loading} extra={renderExtra()}>
            {dataList.map((item: IData) => (
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
