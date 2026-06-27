import React from 'react';
import { Flex, Divider } from '@discuzq/design';
import './index.scss';

const { Row, Col } = Flex;

export default function FlexExample() {
  return (
    <div className="page">
      <div className="flex-section flex-justify-section">
        <Divider orientation="left">flex-start</Divider>
        <Row justify="flex-start">
          <Col><div className="box-justify">col-4</div></Col>
          <Col><div className="box-justify">col-4</div></Col>
          <Col><div className="box-justify">col-4</div></Col>
          <Col><div className="box-justify">col-4</div></Col>
        </Row>

        <Divider orientation="center">center</Divider>
        <Row justify="center">
          <Col><div className="box-justify">col-4</div></Col>
          <Col><div className="box-justify">col-4</div></Col>
          <Col><div className="box-justify">col-4</div></Col>
          <Col><div className="box-justify">col-4</div></Col>
        </Row>

        <Divider orientation="right">flex-end</Divider>
        <Row justify="flex-end">
          <Col><div className="box-justify">col-4</div></Col>
          <Col><div className="box-justify">col-4</div></Col>
          <Col><div className="box-justify">col-4</div></Col>
          <Col><div className="box-justify">col-4</div></Col>
        </Row>

        <Divider orientation="left">space-between</Divider>
        <Row justify="space-between">
          <Col><div className="box-justify">col-4</div></Col>
          <Col><div className="box-justify">col-4</div></Col>
          <Col><div className="box-justify">col-4</div></Col>
          <Col><div className="box-justify">col-4</div></Col>
        </Row>

        <Divider orientation="center">space-around</Divider>
        <Row justify="space-around">
          <Col><div className="box-justify">col-4</div></Col>
          <Col><div className="box-justify">col-4</div></Col>
          <Col><div className="box-justify">col-4</div></Col>
          <Col><div className="box-justify">col-4</div></Col>
        </Row>

        <Divider orientation="right">space-evenly</Divider>
        <Row justify="space-evenly">
          <Col><div className="box-justify">col-4</div></Col>
          <Col><div className="box-justify">col-4</div></Col>
          <Col><div className="box-justify">col-4</div></Col>
          <Col><div className="box-justify">col-4</div></Col>
        </Row>
      </div>
    </div>
  );
}
