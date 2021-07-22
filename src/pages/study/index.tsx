import { useState, useEffect } from 'react';
import { Row, Col, Input, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { isEmpty } from 'lodash'; // 引入JS工具库
import Card from '@/components/Card';
import Empty from '@/components/Empty';
import Pagination from '@/components/Pagination';
import data from '@/utils/constant';
import QueueAnim from 'rc-queue-anim';
import { get } from '@/utils/request';
import LabelItem from '@/components/LabelItem';
import MetaItem, { IData } from '@/components/MetaItem';
// import AddModel from './addModel';
import styles from './index.less';

const page = {
  current: 1,
  pageSize: 6,
};

export default function IndexPage() {
  const [loading, setLoading] = useState(false);
  const [dataList, setDataList] = useState([]);
  const [current, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const getDataList = (params: object) => {
    setLoading(true);
    get('/people', { active: '1', ...page, ...params }).then((res) => {
      const _res = res as any;
      console.log(res, 'resres');
      setDataList(_res.result);
      setTotal(_res.total);
      setLoading(false);
    });
  };

  useEffect(() => {
    getDataList({ current: 1 });
    setPage(1);
  }, []);

  const renderContent = () => {
    if (!isEmpty(dataList)) {
      return (
        <>
          {dataList.map((item: IData) => (
            <Col span={6} key={item._id}>
              <MetaItem key={item._id} item={item} />
            </Col>
          ))}
        </>
      );
    }
    return <Empty />;
  };

  return (
    <Card title="学习乐园" loading={loading}>
      <Row gutter={{ xs: 6, sm: 9, md: 18, lg: 24 }}>{renderContent()}</Row>
    </Card>
  );
}
