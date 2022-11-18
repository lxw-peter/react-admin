import { DeleteOutlined, EditOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { Space, Form, Input, Button, Table, Card, Modal } from 'antd';
import React, { useState } from 'react';

function MedicineCategories() {
  const [isShow, setIsShow] = useState(false);
  return (
    <>
      <Card
        title="药品分类"
        extra={<Button type="primary" icon={<PlusOutlined />} onClick={() => setIsShow(true)} />}
      >
        <Space direction="vertical" style={{ width: '100%' }}>
          <Form layout="inline">
            <Form.Item label="药品名称">
              <Input placeholder="请输入关键词"></Input>
            </Form.Item>
            <Form.Item>
              <Button type="primary" icon={<SearchOutlined />}></Button>
            </Form.Item>
          </Form>
          <Table
            columns={[
              {
                title: '序号',
                width: '80px',
                align: 'center',
                render(value, record, i) {
                  return <>{i + 1}</>;
                },
              },
              { title: '名称', width: 120 },
              { title: '封面' },
              { title: '简介' },
              {
                title: '操作',
                render() {
                  return (
                    <Space>
                      <Button type="primary" icon={<EditOutlined />} size="small" />
                      <Button type="primary" icon={<DeleteOutlined />} size="small" />
                    </Space>
                  );
                },
              },
            ]}
          />
        </Space>
      </Card>
      <Modal
        open={isShow}
        title="新增药品"
        destroyOnClose
        maskClosable={false}
        onCancel={() => setIsShow(false)}
      >
        <Form>
          <Form.Item label="名字" name="name">
            <Input />
          </Form.Item>
          <Form.Item label="主图"></Form.Item>
          <Form.Item label="简介" name="desc">
            <Input.TextArea placeholder="请输入简介" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default MedicineCategories;
