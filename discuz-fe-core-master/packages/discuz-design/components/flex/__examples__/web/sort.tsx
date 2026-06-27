import React from "react";
import { Flex, Divider } from '@discuzq/design';
import "./index.scss";

const { Row, Col } = Flex;

export default function FlexExample() {
  return (
    <div className="page">
      <div className="flex-section">
        <Divider orientation="left">Reverse 倒序排列</Divider>
        <div className="container">
          <Row>
            <Col>
              <div className="box box-container">
                <Row reverse>
                  <Col span={2}>
                    <div className="box-nested">1</div>
                  </Col>
                  <Col span={2}>
                    <div className="box-nested">2</div>
                  </Col>
                  <Col span={2}>
                    <div className="box-nested">3</div>
                  </Col>
                  <Col span={2}>
                    <div className="box-nested">4</div>
                  </Col>
                  <Col span={2}>
                    <div className="box-nested">5</div>
                  </Col>
                  <Col span={2}>
                    <div className="box-nested">6</div>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </div>
        <Divider orientation="left">Order 指定元素排列</Divider>
        <div className="container">
          <Row>
            <Col>
              <div className="box box-container">
                <Row>
                  <Col span={2}>
                    <div className="box-first">1</div>
                  </Col>
                  <Col span={2}>
                    <div className="box-first">2</div>
                  </Col>
                  <Col span={2}>
                    <div className="box-first">3</div>
                  </Col>
                  <Col span={2}>
                    <div className="box-first">4</div>
                  </Col>
                  <Col span={2}>
                    <div className="box-first">5</div>
                  </Col>
                  <Col span={2} order={-1}>
                    <div className="box-nested">6</div>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </div>
        <div className="container">
          <Row>
            <Col>
              <div className="box box-container">
                <Row>
                  <Col span={2} order={1}>
                    <div className="box-nested">1</div>
                  </Col>
                  <Col span={2}>
                    <div className="box-first">2</div>
                  </Col>
                  <Col span={2}>
                    <div className="box-first">3</div>
                  </Col>
                  <Col span={2}>
                    <div className="box-first">4</div>
                  </Col>
                  <Col span={2}>
                    <div className="box-first">5</div>
                  </Col>
                  <Col span={2}>
                    <div className="box-first">6</div>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
}
