import { useState, useEffect } from 'react';
import { Select, Form, Input } from 'antd';
import Modal from '@/components/Modal';
import data from '@/utils/constant';
import { post } from '@/utils/request';
import { peopleAdd, peopleEdit } from '@/api/people';
import BraftEditor from 'braft-editor';
import { IData } from '@/components/ArticleItem';
import 'braft-editor/dist/index.css';

const { Option } = Select;
const { labelData } = data;
const { TextArea } = Input;
interface IProps {
  visible: boolean;
  values?: IData | null;
  handleOk: () => void;
  handleCancel: () => void;
}

const Index = (props: IProps) => {
  const [form] = Form.useForm();
  const [editorState, setEditorState] = useState(null);
  const { visible, handleOk, handleCancel, values } = props;

  useEffect(() => {
    setEditorState(BraftEditor.createEditorState(values?.content));
  }, [values]);

  const handleEditorChange = (editorState: any) => {
    setEditorState(editorState);
  };

  const submitContent = () => {
    form
      .validateFields()
      .then((value) => {
        form.resetFields();
        const htmlContent = editorState.toHTML();
        post(values ? peopleEdit : peopleAdd, {
          ...value,
          _id: values?._id,
          content: htmlContent,
        }).then(() => {
          BraftEditor.createEditorState(null);
          handleCancel();
        });
      })
      .catch((info) => {
        console.log('Validate Failed:', info);
      });
  };

  return (
    <Modal
      title="新增"
      width={1080}
      visible={visible}
      onOk={submitContent}
      onCancel={handleCancel}
    >
      <Form
        form={form}
        name="basic"
        labelCol={{ span: 2 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ ...values }}
      >
        <Form.Item
          label="标签"
          name="label"
          rules={[{ required: true, message: 'Please select' }]}
        >
          <Select
            mode="multiple"
            allowClear
            style={{ width: '100%' }}
            placeholder="Please select"
          >
            {labelData.map((item) => (
              <Option value={item.id} key={item.id}>
                {item.title}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="描述"
          name="description"
          rules={[{ required: true, message: 'Please Input' }]}
        >
          <TextArea rows={2} placeholder="Please Input" />
        </Form.Item>
        <Form.Item label="封面地址" name="cover">
          <Input placeholder="Please Input" />
        </Form.Item>
      </Form>

      <BraftEditor
        value={editorState}
        onChange={handleEditorChange}
        onSave={submitContent}
      />
    </Modal>
  );
};

export default Index;
