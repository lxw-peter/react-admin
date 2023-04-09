import React, { useState } from 'react';
import Transform from '../components/Transfer';
import type { TransferDirection, RecordType } from '../components/Transfer';
import { CheckboxValueType } from 'antd/lib/checkbox/Group';

const mockData: RecordType[] = Array.from({ length: 20 }).map((_, i) => ({
  key: i.toString(),
  label: `content${i + 1}`,
  value: `description of content${i + 1}`,
}));

const initialTargetKeys = mockData.filter((item) => Number(item.key) > 10).map((item) => item.key);

function Dashboard() {
  const [targetKeys, setTargetKeys] = useState<CheckboxValueType[]>(initialTargetKeys);
  const [selectedKeys, setSelectedKeys] = useState<CheckboxValueType[]>([]);
  const onChange = (
    nextTargetKeys: CheckboxValueType[],
    direction: TransferDirection,
    moveKeys: CheckboxValueType[]
  ) => {
    console.log('targetKeys:', nextTargetKeys);
    console.log('direction:', direction);
    console.log('moveKeys:', moveKeys);
    setTargetKeys(nextTargetKeys);
  };

  const onSelectChange = (
    sourceSelectedKeys: CheckboxValueType[],
    targetSelectedKeys: CheckboxValueType[]
  ) => {
    console.log('sourceSelectedKeys:', sourceSelectedKeys);
    console.log('targetSelectedKeys:', targetSelectedKeys);
    setSelectedKeys([...sourceSelectedKeys, ...targetSelectedKeys]);
  };

  return (
    <div>
      <div>文章详情</div>
      <Transform
        dataSource={mockData}
        targetKeys={targetKeys}
        selectedKeys={selectedKeys}
        onChange={onChange}
        onSelectChange={onSelectChange}
      />
    </div>
  );
}

export default Dashboard;
