import React from "react";
import { Flex } from '@discuzq/design';
import "./index.scss";

const { Row, Col } = Flex;

export default function FlexExample() {
  return (
    <div className="page">
      <div className="flex-section flex-base-section">
        <Row style={{ margin: 0 }}>
          <Col style={{ padding: 0 }}>
            <div className="box-row" style={{backgroundColor: 'rgba(0,146,255,.75)'}}>100%</div>
          </Col>
        </Row>
        <Row style={{ margin: 0 }}>
          <Col style={{ padding: 0 }}>
            <div className="box-row">25%</div>
          </Col>
          <Col style={{ padding: 0 }}>
            <div
              style={{ backgroundColor: "rgba(255,255,255,.2)", color: "#999" }}
              className="box-row"
            >
              25%
            </div>
          </Col>
          <Col style={{ padding: 0 }}>
            <div className="box-row">25%</div>
          </Col>
          <Col style={{ padding: 0 }}>
            <div
              style={{ backgroundColor: "rgba(255,255,255,.2)", color: "#999" }}
              className="box-row"
            >
              25%
            </div>
          </Col>
        </Row>
        <Row style={{ margin: 0 }}>
          <Col style={{ padding: 0 }}>
            <div className="box-row">33.33%</div>
          </Col>
          <Col style={{ padding: 0 }}>
            <div
              style={{ backgroundColor: "rgba(255,255,255,.2)", color: "#999" }}
              className="box-row"
            >
              33.33%
            </div>
          </Col>
          <Col style={{ padding: 0 }}>
            <div className="box-row">33.33%</div>
          </Col>
        </Row>
        <Row style={{ margin: 0 }}>
          <Col style={{ padding: 0 }}>
            <div className="box-row" style={{backgroundColor: 'rgba(0,146,255,.75)'}}>50%</div>
          </Col>
          <Col style={{ padding: 0 }}>
            <div
              style={{ backgroundColor: "rgba(255,255,255,.2)", color: "#999" }}
              className="box-row"
            >
              50%
            </div>
          </Col>
        </Row>
        <Row style={{ margin: 0 }}>
          <Col span={8} style={{ padding: 0 }}>
            <div className="box-row">66.66%</div>
          </Col>
          <Col span={4} style={{ padding: 0 }}>
            <div
              style={{ backgroundColor: "rgba(255,255,255,.2)", color: "#999" }}
              className="box-row"
            >
              33.33%
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}
