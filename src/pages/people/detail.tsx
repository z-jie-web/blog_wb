import { useState, useEffect } from 'react';
import { Select, Form, Input } from 'antd';
import Modal from '@/components/Modal';
import data from '@/utils/constant';
import { get } from '@/utils/request';
import { peopleDetail } from '@/api/people';
import BraftEditor from 'braft-editor';
import styles from './index.less';
import 'braft-editor/dist/index.css';

const { Option } = Select;
const { labelData } = data;
const { TextArea } = Input;
interface IProps {
  visible: boolean;
  handleOk: () => void;
  handleCancel: () => void;
}

const Index = (props: IProps) => {
  const [editorState, setEditorState] = useState(null);
  const { id } = props.location.query;

  useEffect(() => {
    get(peopleDetail, { id }).then((res) => {
      console.log(res, 'resres');
      const content = BraftEditor.createEditorState(res.result[0].content);
      setEditorState(content);
    });
  }, []);

  console.log(editorState?.toHTML(), 'editorState');
  return (
    <div className={styles.container}>
      222{editorState?.toHTML()}
      {/* <BraftEditor
        value={editorState}
     
      /> */}
    </div>
  );
};

export default Index;
