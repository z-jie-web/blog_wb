import { useState, useEffect } from 'react';
import { Select, Form, Input, Button } from 'antd';
import Modal from '@/components/Modal';
import data from '@/utils/constant';
import { get } from '@/utils/request';
import { peopleDetail, peopleEdit } from '@/api/people';
import BraftEditor from 'braft-editor';
import dayjs from 'dayjs';
import AddModel from './addModel';
import 'braft-editor/dist/index.css';
import 'braft-editor/dist/output.css';
import styles from './index.less';

interface IProps {
  visible: boolean;
  handleOk: () => void;
  handleCancel: () => void;
  location: any;
}

const Index = (props: IProps) => {
  const [editorState, setEditorState] = useState(null);
  const [values, setValues] = useState(null);
  const [visible, setVisible] = useState(false);
  const { id } = props.location.query;

  const getDetail = () => {
    get(peopleDetail, { id }).then((res) => {
      const content = BraftEditor.createEditorState(res.result[0].content);
      setEditorState(content);
      setValues(res.result[0]);
    });
  };

  useEffect(() => {
    getDetail();
  }, []);

  const handleAdd = () => {
    setVisible(true);
  };

  const handleCancel = (params: any) => {
    setVisible(false);
    if (params) {
      getDetail();
    }
  };
  console.log(editorState?.toHTML(), 'editorState');
  // console.log(editorState?.toHTML(), 'editorState');/
  return (
    <div className={styles.container}>
      <div className={styles.detailTitle}>{values?.description}</div>
      <div className={styles.detailDate}>
        {dayjs(values?.date).format('YYYY-MM-DD HH:mm:ss')}
        <a onClick={handleAdd}>编辑</a>
      </div>
      <div
        className="braft-output-content"
        dangerouslySetInnerHTML={{ __html: editorState?.toHTML() }}
      ></div>
      <AddModel values={values} visible={visible} handleCancel={handleCancel} />
    </div>
  );
};

export default Index;
