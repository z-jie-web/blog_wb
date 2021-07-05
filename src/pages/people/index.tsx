import { useState } from 'react';
import { Row, Col, Input, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import Card from '@/components/Card';
import Pagination from '@/components/Pagination';
import data from '@/utils/constant';
import LabelItem from '@/components/LabelItem';
import ArticleItem, { IData } from '@/components/ArticleItem';
import AddModel from './addModel';
import styles from './index.less';

const Index = () => {
  const { Search } = Input;
  const [active, setActive] = useState('1');
  const [page, setPage] = useState(1);
  const [visible, setVisible] = useState(false);
  const { labelData, articleData } = data;
  const title = labelData.find((item) => item.id === active)?.title;

  const handleSearch = (params: string) => {
    console.log(params, 'paramsparams');
  };

  const handlePageChange = (page: number) => {
    setPage(page);
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

  const renderSearch = (
    <Search placeholder="请输入关键字" onSearch={handleSearch} enterButton />
  );

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
          <Card title={title} extra={renderSearch}>
            {articleData.map((item: IData) => (
              <ArticleItem key={item.id} item={item} />
            ))}
          </Card>
          <Pagination total={50} current={page} onChange={handlePageChange} />
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
