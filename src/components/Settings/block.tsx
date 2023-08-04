import React, { ReactNode } from 'react';
import { Switch, Divider, InputNumber } from '@arco-design/web-react';
import styles from './style/block.module.less';
import { useRecoilState } from 'recoil';
import { commonState } from '@/store';

export interface BlockProps {
  title?: ReactNode;
  options?: { name: string; value: string; type?: 'switch' | 'number' }[];
  children?: ReactNode;
}

export default function Block(props: BlockProps) {
  const { title, options, children } = props;

  const [comState, setComState] = useRecoilState(commonState);

  return (
    <div className={styles.block}>
      <h5 className={styles.title}>{title}</h5>
      {options &&
        options.map((option) => {
          const type = option.type || 'switch';

          return (
            <div className={styles['switch-wrapper']} key={option.value}>
              <span>{option.name}</span>
              {type === 'switch' && (
                <Switch
                  size="small"
                  checked={!!comState.settings[option.value]}
                  onChange={(checked) => {
                    const newSetting = {
                      ...comState.settings,
                      [option.value]: checked,
                    };
                    setComState({
                      ...comState,
                      settings: newSetting,
                    });
                    // set color week
                    if (checked && option.value === 'colorWeek') {
                      document.body.style.filter = 'invert(80%)';
                    }
                    if (!checked && option.value === 'colorWeek') {
                      document.body.style.filter = 'none';
                    }
                  }}
                />
              )}
              {type === 'number' && (
                <InputNumber
                  style={{ width: 80 }}
                  size="small"
                  value={comState.settings.menuWidth}
                  onChange={(value) => {
                    const newSetting = {
                      ...comState.settings,
                      [option.value]: value,
                    };
                    setComState({
                      ...comState,
                      settings: newSetting,
                    });
                  }}
                />
              )}
            </div>
          );
        })}
      {children}
      <Divider />
    </div>
  );
}
