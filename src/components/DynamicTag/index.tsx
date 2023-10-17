import React, { useState } from 'react';
import { Tag, Input } from '@arco-design/web-react';
import { IconPlus } from '@arco-design/web-react/icon';
import styles from './style/index.module.less';
import { Grid } from '@arco-design/web-react';
const Row = Grid.Row;
const Col = Grid.Col;
function DynamicTag({ tags, setTags }) {
  const [showInput, setShowInput] = useState(false);
  const [inputValue, setInputValue] = useState('');

  function addTag() {
    if (inputValue) {
      tags = [...tags, inputValue];
      setTags(tags);
      setInputValue('');
    }
    setShowInput(false);
  }

  function removeTag(removeTag: string) {
    const newTags = tags.filter((tag: string) => tag !== removeTag);
    setTags(newTags);
  }

  return (
    <Row>
      {tags?.map((tag: string, index: number) => {
        return (
          <Col key={tag + index} span={6} style={{ marginBottom: 10 }}>
            <Tag
              closable={index !== 0}
              onClose={() => removeTag(tag)}
              className={styles.tag}
            >
              {tag}
            </Tag>
          </Col>
        );
      })}
      {showInput ? (
        <Col span={6}>
          <Input
            autoFocus
            size="mini"
            value={inputValue}
            className={styles.tag}
            onPressEnter={addTag}
            onBlur={addTag}
            onChange={setInputValue}
          />
        </Col>
      ) : (
        <Col span={6}>
          <Tag
            icon={<IconPlus />}
            className={styles['add-tag']}
            tabIndex={0}
            onClick={() => setShowInput(true)}
            onKeyDown={(e) => {
              const keyCode = e.keyCode || e.which;
              if (keyCode === 13) {
                // enter
                setShowInput(true);
              }
            }}
          >
            新增
          </Tag>
        </Col>
      )}
    </Row>
  );
}

export default DynamicTag;
