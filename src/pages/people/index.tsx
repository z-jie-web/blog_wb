import { useState, useEffect } from 'react';
import { Row, Col, Input, Button, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import Card from '@/components/Card';
import Pagination from '@/components/Pagination';
import data from '@/utils/constant';
import { get } from '@/utils/request';
import LabelItem from '@/components/LabelItem';
import ArticleItem, { IData } from '@/components/ArticleItem';
import AddModel from './addModel';
import styles from './index.less';

interface IRes {
  message: string;
  status: number;
  result: Array<IData>;
  total: number;
}

const page = {
  current: 1,
  pageSize: 2,
};

const Index = () => {
  const { Search } = Input;
  const [active, setActive] = useState('1');
  const [dataList, setDataList] = useState([]);
  const [current, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [visible, setVisible] = useState(false);
  const { labelData, articleData } = data;
  const title = labelData.find((item) => item.id === active)?.title;

  const getDataList = (params: object) => {
    get('/people', { active, ...page, ...params }).then(
      (res: IRes | unknown) => {
        console.log(res, 'resres');
        setDataList(res.result);
        setTotal(res.total);
      },
    );
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

  const handleOk = () => {
    console.log('add');
  };

  return (
    <div>
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        <Col span={4}>
          <Card title="你感兴趣的标签">
            {labelData.map((item) => (
              <LabelItem
                key={item.id}
                setActive={setActive}
                active={active}
                item={item}
              />
            ))}
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
          <Card title={title}>
            {dataList.map((item: IData) => (
              <ArticleItem key={item._id} item={item} />
            ))}
          </Card>
          <Pagination
            total={total}
            pageSize={page.pageSize}
            current={current}
            onChange={handlePageChange}
          />
        </Col>
      </Row>
      <AddModel
        visible={visible}
        handleCancel={handleCancel}
        handleOk={handleOk}
      />
    </div>
  );
};

export default Index;
