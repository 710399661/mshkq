import React from "react";
import { Divider, Flex } from '@discuzq/design';
import "./index.scss";

const { Row, Col } = Flex;

export default function FlexExample() {
  return (
    <div className="page">
      <div className="flex-section flex-align-section">
        <Divider orientation="left">Align center</Divider>
        <Row justify="center" align="center">
          <Col style={{padding: 0}}>
            <div className="box-align">col-4</div>
          </Col>
          <Col style={{padding: 0}}>
            <div className="box-align">col-4</div>
          </Col>
          <Col style={{padding: 0}}>
            <div className="box-align">col-4</div>
          </Col>
          <Col style={{padding: 0}}>
            <div className="box-align">col-4</div>
          </Col>
        </Row>

        <Divider orientation="left">Align stretch</Divider>
        <Row justify="space-around" align="stretch">
          <Col style={{padding: 0}}>
            <div className="box-align">col-4</div>
          </Col>
          <Col style={{padding: 0}}>
            <div className="box-align">col-4</div>
          </Col>
          <Col style={{padding: 0}}>
            <div className="box-align">col-4</div>
          </Col>
          <Col style={{padding: 0}}>
            <div className="box-align">col-4</div>
          </Col>
        </Row>

        <Divider orientation="left">Align flex-start</Divider>
        <Row justify="flex-start" align="flex-start">
          <Col style={{padding: 0}}>
            <div className="box-align">col-4</div>
          </Col>
          <Col style={{padding: 0}}>
            <div className="box-align">col-4</div>
          </Col>
          <Col style={{padding: 0}}>
            <div className="box-align">col-4</div>
          </Col>
          <Col style={{padding: 0}}>
            <div className="box-align">col-4</div>
          </Col>
        </Row>

        <Divider orientation="left">Align flex-end</Divider>
        <Row justify="flex-end" align="flex-end">
          <Col style={{padding: 0}}>
            <div className="box-align">col-4</div>
          </Col>
          <Col style={{padding: 0}}>
            <div className="box-align">col-4</div>
          </Col>
          <Col style={{padding: 0}}>
            <div className="box-align">col-4</div>
          </Col>
          <Col style={{padding: 0}}>
            <div className="box-align">col-4</div>
          </Col>
        </Row>

        <Divider orientation="left">Align baseline</Divider>
        <Row justify="space-around" align="baseline">
          <Col style={{padding: 0}}>
            <div className="box-align">col-4</div>
          </Col>
          <Col style={{padding: 0}}>
            <div className="box-align">col-4</div>
          </Col>
          <Col style={{padding: 0}}>
            <div className="box-align">col-4</div>
          </Col>
          <Col style={{padding: 0}}>
            <div className="box-align">col-4</div>
          </Col>
        </Row>
      </div>
    </div>
  );
}
