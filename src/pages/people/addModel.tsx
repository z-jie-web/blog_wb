import { useState } from 'react';
import { Select, Form, Input } from 'antd';
import Modal from '@/components/Modal';
import data from '@/utils/constant';
import { post } from '@/utils/request';
import { peopleAdd } from '@/api/people';
import BraftEditor from 'braft-editor';
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
  const [form] = Form.useForm();
  const [editorState, setEditorState] = useState(null);
  const { visible, handleOk, handleCancel } = props;

  const handleEditorChange = (editorState) => {
    console.log(editorState, 'editorStateeditorState');
    setEditorState(editorState);
  };

  const aHook = () => {};

  const submitContent = () => {
    console.log(form, 'formform');
    console.log(111111);
    form
      .validateFields()
      .then((values) => {
        form.resetFields();
        const htmlContent = editorState.toHTML();
        // console.log(htmlContent);
        console.log(values, 'sssssssssss');
        post(peopleAdd, { ...values, content: htmlContent }).then((res) => {
          console.log(res, 'ssss ');
        });
        // console.log(values, 'sssssssssss');
        // onCreate(values);
      })
      .catch((info) => {
        console.log('Validate Failed:', info);
      });
    // Pressing ctrl + s when the editor has focus will execute this method
    // Before the editor content is submitted to the server, you can directly call editorState.toHTML () to get the HTML content

    // const result = await saveEditorContent(htmlContent)
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
        initialValues={{}}
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
            // defaultValue={['a10', 'c12']}
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
