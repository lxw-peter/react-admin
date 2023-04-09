import { Button, Checkbox } from 'antd';
import { CheckboxValueType } from 'antd/lib/checkbox/Group';
import React, { useMemo, useState } from 'react';

export type TransferDirection = 'left' | 'right';
export interface RecordType {
  key: string;
  label: string;
  value: string;
}

export interface ITransfer {
  /** 初始数据 */
  dataSource: RecordType[];
  /** 目标元素key值 */
  targetKeys: CheckboxValueType[];
  /** 选中key值 */
  selectedKeys: CheckboxValueType[];
  /** 移动数据 */
  onChange: (targetKeys: string[], direction: TransferDirection, moveKeys: string[]) => void;
  /** 勾选数据 */
  onSelectChange: (sourceSelectedKeys: string[], targetSelectedKeys: string[]) => void;
}

function Transform({ dataSource, targetKeys, selectedKeys, onChange, onSelectChange }: ITransfer) {
  const [sourceSelectedKeys, setSourceSelectedKeys] = useState<CheckboxValueType[]>([]);
  const [targetSelectedKeys, setTargetSelectedKeys] = useState<CheckboxValueType[]>([]);

  const source = useMemo(() => {
    return dataSource.filter((item) => targetKeys.includes(item.key));
  }, [dataSource, targetKeys]);

  const handleSelectSource = (value: CheckboxValueType[]) => {
    console.log(value);
    onSelectChange(value, targetSelectedKeys);
    setSourceSelectedKeys(value);
  };

  const handleSelectTarget = (value: CheckboxValueType[]) => {
    console.log(value);
  };
  const handleMoveRight = () => {};
  const handleMoveLeft = () => {};

  return (
    <div>
      <div>
        <Checkbox.Group options={source} onChange={handleSelectSource} />
      </div>
      <div>
        <Button onClick={handleMoveRight}>右</Button>
        <Button onClick={handleMoveLeft}>左</Button>
      </div>
      <div>
        <Checkbox.Group options={source} onChange={handleSelectTarget} />
      </div>
    </div>
  );
}

export default Transform;
