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
import ArticleItem, { IData } from '@/components/ArticleItem';
import AddModel from './addModel';
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

const page = {
  current: 1,
  pageSize: 6,
};

const Index = () => {
  const { Search } = Input;
  const [active, setActive] = useState('1');
  const [dataList, setDataList] = useState([]);
  const [current, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const { labelData, articleData } = data;
  const title = labelData.find((item) => item.id === active)?.title;

  const getDataList = (params: object) => {
    setLoading(true);
    get('/people', { active, ...page, ...params }).then((res) => {
      const _res = res as IRes;
      console.log(res, 'resres');
      setDataList(_res.result);
      setTotal(_res.total);
      setLoading(false);
    });
  };

  useEffect(() => {
    getDataList({ current: 1 });
    setPage(1);
  }, [active]);

  const handlePageChange = (current: number) => {
    setPage(current);
    getDataList({ current });
  };

  const handleAdd = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const renderContent = () => {
    if (!isEmpty(dataList)) {
      return (
        <QueueAnim delay={300} className="queue-simple">
          {dataList.map((item: IData) => (
            <ArticleItem key={item._id} item={item} />
          ))}
        </QueueAnim>
      );
    }
    return <Empty />;
  };

  return (
    <div>
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        <Col span={4}>
          <Card title="标签选择">
            <QueueAnim delay={300} className="queue-simple">
              {labelData.map((item) => (
                <LabelItem
                  key={item.id}
                  setActive={setActive}
                  active={active}
                  item={item}
                />
              ))}
            </QueueAnim>
          </Card>
          <div className={styles.addButton}>
            <Button
              icon={<PlusOutlined />}
              onClick={handleAdd}
              shape="round"
              type="primary"
              size="large"
            >
              新增
            </Button>
          </div>
        </Col>
        <Col span={20}>
          <Card title={title} loading={loading}>
            {renderContent()}
          </Card>
          {!isEmpty(dataList) && (
            <Pagination
              total={total}
              pageSize={page.pageSize}
              current={current}
              onChange={handlePageChange}
            />
          )}
        </Col>
      </Row>
      <AddModel visible={visible} handleCancel={handleCancel} />
    </div>
  );
};

export default Index;
