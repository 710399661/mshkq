import React from 'react';
import { Flex } from '@discuzq/design';
import './index.scss';

const { Row, Col } = Flex;

export default function FlexExample() {
  return (
    <div className="page">
      <div className="flex-section">
        <Row>
          <Col span={7}>
            <div className="box box-container">
              <Row>
                <Col span={9}>
                  <div className="box-first box-container">
                    <Row>
                      <Col span={4}>
                        <div className="box-nested" />
                      </Col>
                      <Col span={8}>
                        <div className="box-nested" />
                      </Col>
                    </Row>
                  </div>
                </Col>
                <Col span={3}>
                  <div className="box-first box-container">
                    <Row>
                      <Col>
                        <div className="box-nested" />
                      </Col>
                    </Row>
                  </div>
                </Col>
              </Row>
            </div>
          </Col>
          <Col span={5}>
            <div className="box box-container">
              <Row>
                <Col>
                  <div className="box-first box-container">
                    <Row>
                      <Col span={6}>
                        <div className="box-nested" />
                      </Col>
                      <Col span={6}>
                        <div className="box-nested" />
                      </Col>
                    </Row>
                  </div>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}
