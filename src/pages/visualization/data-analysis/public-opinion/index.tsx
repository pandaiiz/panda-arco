import React, { useState, useEffect, useMemo } from 'react';
import PublicOpinionCard, { PublicOpinionCardProps } from './card';
import axios from 'axios';
import { Grid } from '@arco-design/web-react';
import locale from '../locale';

const { Row, Col } = Grid;

const cardInfo = [
  {
    key: 'visitor',
    type: 'line',
  },
  {
    key: 'content',
    type: 'interval',
  },
  {
    key: 'comment',
    type: 'line',
  },
  {
    key: 'share',
    type: 'pie',
  },
];

function PublicOpinion() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<PublicOpinionCardProps[]>(
    cardInfo.map((item) => ({
      ...item,
      chartType: item.type as 'line' | 'pie' | 'interval',
      title: item.key,
    }))
  );

  const getData = async () => {
    const requestList = cardInfo.map(async (info) => {
      const { data } = await axios
        .get(`/api/data-analysis/overview?type=${info.type}`)
        .catch(() => ({ data: {} }));
      return {
        ...data,
        key: info.key,
        chartType: info.type,
      };
    });
    const result = await Promise.all(requestList).finally(() =>
      setLoading(false)
    );
    setData(result);
  };

  useEffect(() => {
    getData();
  }, []);

  const formatData = useMemo(() => {
    return data.map((item) => ({
      ...item,
      title: item.key,
    }));
  }, [data]);

  return (
    <div>
      <Row gutter={20}>
        {formatData.map((item, index) => (
          <Col span={6} key={index}>
            <PublicOpinionCard
              {...item}
              compareTime={'较昨日'}
              loading={loading}
            />
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default PublicOpinion;
