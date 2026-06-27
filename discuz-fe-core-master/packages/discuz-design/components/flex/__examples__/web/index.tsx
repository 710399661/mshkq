import React from 'react';
import { Flex } from '@discuzq/design';
import './index.scss';

const { Row, Col } = Flex;

export default function FlexExample() {
  return (
    <div className="page">
      <span className="header">Flex 弹性布局</span>
      <div className="section">
        <span className="header">基本用法</span>
        <Row>
          <Col span={6}>
            <div className="box-row" />
          </Col>
          <Col span={6}>
            <div className="box-row" />
          </Col>
        </Row>
      </div>
      <div className="section">
        <span className="header">列宽均分</span>
        <Row>
          <Col>
            <div className="box-row" />
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="box-row" />
          </Col>
          <Col>
            <div className="box-row" />
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="box-row" />
          </Col>
          <Col>
            <div className="box-row" />
          </Col>
          <Col>
            <div className="box-row" />
          </Col>
        </Row>
      </div>
      <div className="section">
        <span className="header">折行展示（默认）</span>
        <Row>
          <Col>
            <div className="box-row" />
          </Col>
          <Col span={6}>
            <div className="box-row" />
          </Col>
          <Col span={6}>
            <div className="box-row" />
          </Col>
          <Col span={6}>
            <div className="box-row" />
          </Col>
        </Row>
      </div>
      <div className="section">
        <span className="header">单行展示（可滚动）</span>
        <Row flexWrap="nowrap">
          <Col span={6}>
            <div className="box-row" />
          </Col>
          <Col span={4}>
            <div className="box-row" />
          </Col>
          <Col span={4}>
            <div className="box-row" />
          </Col>
          <Col span={8}>
            <div className="box-row" />
          </Col>
        </Row>
      </div>
      <div className="section">
        <span className="header">嵌套栅格</span>
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
      <div className="section">
        <span className="header">自定义槽宽</span>
        <Row gutter={0}>
          <Col>
            <div className="box" />
          </Col>
          <Col>
            <div className="box" />
          </Col>
          <Col>
            <div className="box" />
          </Col>
        </Row>
      </div>
      <div className="section">
        <span className="header">Offsets</span>
        <Row>
          <Col span={1} offset={11}>
            <div className="box-row" />
          </Col>
        </Row>
        <Row>
          <Col span={2} offset={10}>
            <div className="box-row" />
          </Col>
        </Row>
        <Row>
          <Col span={3} offset={9}>
            <div className="box-row" />
          </Col>
        </Row>
        <Row>
          <Col span={4} offset={8}>
            <div className="box-row" />
          </Col>
        </Row>
        <Row>
          <Col span={5} offset={7}>
            <div className="box-row" />
          </Col>
        </Row>
        <Row>
          <Col span={6} offset={6}>
            <div className="box-row" />
          </Col>
        </Row>
        <Row>
          <Col span={7} offset={5}>
            <div className="box-row" />
          </Col>
        </Row>
        <Row>
          <Col span={8} offset={4}>
            <div className="box-row" />
          </Col>
        </Row>
        <Row>
          <Col span={9} offset={3}>
            <div className="box-row" />
          </Col>
        </Row>
        <Row>
          <Col span={10} offset={2}>
            <div className="box-row" />
          </Col>
        </Row>
        <Row>
          <Col span={11} offset={1}>
            <div className="box-row" />
          </Col>
        </Row>
      </div>
      <div className="section">
        <span className="header">垂直方向对齐</span>
        <div className="container">
          <Row>
            <Col span={6}>
              <div className="box-large" />
            </Col>
            <Col>
              <div className="box" />
            </Col>
          </Row>
        </div>
        <div className="container">
          <Row align="flex-start">
            <Col span={6}>
              <div className="box-large" />
            </Col>
            <Col>
              <div className="box" />
            </Col>
          </Row>
        </div>
        <div className="container">
          <Row align="center">
            <Col span={6}>
              <div className="box-large" />
            </Col>
            <Col>
              <div className="box" />
            </Col>
          </Row>
        </div>
        <div className="container">
          <Row align="flex-end">
            <Col span={6}>
              <div className="box-large" />
            </Col>
            <Col>
              <div className="box" />
            </Col>
          </Row>
        </div>
      </div>
      <div className="section">
        <span className="header">水平分布</span>
        <div className="container">
          <Row>
            <Col>
              <div className="box box-wrap">
                <Row gutter={0}>
                  <Col className="flex-none">
                    <div className="box-nested">Box Start</div>
                  </Col>
                  <Col className="flex-none">
                    <div className="box-nested">Box Center</div>
                  </Col>
                  <Col className="flex-none">
                    <div className="box-nested">Box End</div>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </div>
        <div className="container">
          <Row>
            <Col>
              <div className="box box-wrap">
                <Row justify="flex-end" gutter={0}>
                  <Col className="flex-none">
                    <div className="box-nested">Box Start</div>
                  </Col>
                  <Col className="flex-none">
                    <div className="box-nested">Box Center</div>
                  </Col>
                  <Col className="flex-none">
                    <div className="box-nested">Box End</div>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </div>
        <div className="container">
          <Row>
            <Col>
              <div className="box box-wrap">
                <Row justify="center" gutter={0}>
                  <Col className="flex-none">
                    <div className="box-nested">Box Start</div>
                  </Col>
                  <Col className="flex-none">
                    <div className="box-nested">Box Center</div>
                  </Col>
                  <Col className="flex-none">
                    <div className="box-nested">Box End</div>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </div>
        <div className="container">
          <Row>
            <Col>
              <div className="box box-wrap">
                <Row justify="space-around" gutter={0}>
                  <Col className="flex-none">
                    <div className="box-nested">Box Start</div>
                  </Col>
                  <Col className="flex-none">
                    <div className="box-nested">Box Center</div>
                  </Col>
                  <Col className="flex-none">
                    <div className="box-nested">Box End</div>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </div>
        <div className="container">
          <Row>
            <Col>
              <div className="box box-wrap">
                <Row justify="space-between" gutter={0}>
                  <Col className="flex-none">
                    <div className="box-nested">Box Start</div>
                  </Col>
                  <Col className="flex-none">
                    <div className="box-nested">Box Center</div>
                  </Col>
                  <Col className="flex-none">
                    <div className="box-nested">Box End</div>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </div>
        <div className="container">
          <Row>
            <Col>
              <div className="box box-wrap">
                <Row justify="space-evenly" gutter={0}>
                  <Col className="flex-none">
                    <div className="box-nested">Box Start</div>
                  </Col>
                  <Col className="flex-none">
                    <div className="box-nested">Box Center</div>
                  </Col>
                  <Col className="flex-none">
                    <div className="box-nested">Box End</div>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </div>
      </div>
      <div className="section">
        <span className="header">排序</span>
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
