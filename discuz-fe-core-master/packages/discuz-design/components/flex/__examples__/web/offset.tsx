import React from 'react';
import { Flex } from '@discuzq/design';
import './index.scss';

const { Row, Col } = Flex;

export default function FlexExample() {
  return (
    <div className="page">
      <div className="flex-section">
        <Row>
          <Col span={4}><div className="box-offset">col-4</div></Col>
          <Col span={4} offset={6}>
            <div className="box-offset">col-4-offset-4</div>
          </Col>
        </Row>
        <Row>
          <Col span={3} offset={3}>
            <div className="box-offset">col-3-offset-3</div>
          </Col>
          <Col span={3}>
            <div className="box-offset">col-3</div>
          </Col>
        </Row>
        <Row>
          <Col span={6} offset={6}>
            <div className="box-offset">col-6 col-offset-6</div>
          </Col>
        </Row>
      </div>
    </div>
  );
}
