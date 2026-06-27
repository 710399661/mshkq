import React from 'react';
import { View, Text } from '@tarojs/components';
import Flex from '../../index';
import './index.scss';

const { Row, Col } = Flex;

export default function FlexExample() {
  return (
    <View className="page">
      <Text className="header">Flex 弹性布局</Text>
      <View className="section">
        <Text className="header">基本用法</Text>
        <Row>
          <Col span={6}>
            <View className="box-row" />
          </Col>
          <Col span={6}>
            <View className="box-row" />
          </Col>
        </Row>
      </View>
      <View className="section">
        <Text className="header">列宽均分</Text>
        <Row>
          <Col>
            <View className="box-row" />
          </Col>
        </Row>
        <Row>
          <Col>
            <View className="box-row" />
          </Col>
          <Col>
            <View className="box-row" />
          </Col>
        </Row>
        <Row>
          <Col>
            <View className="box-row" />
          </Col>
          <Col>
            <View className="box-row" />
          </Col>
          <Col>
            <View className="box-row" />
          </Col>
        </Row>
      </View>
      <View className="section">
        <Text className="header">折行展示（默认）</Text>
        <Row>
          <Col>
            <View className="box-row" />
          </Col>
          <Col span={6}>
            <View className="box-row" />
          </Col>
          <Col span={6}>
            <View className="box-row" />
          </Col>
          <Col span={6}>
            <View className="box-row" />
          </Col>
        </Row>
      </View>
      <View className="section">
        <Text className="header">单行展示（可滚动）</Text>
        <Row flexWrap="nowrap">
          <Col span={6}>
            <View className="box-row" />
          </Col>
          <Col span={4}>
            <View className="box-row" />
          </Col>
          <Col span={4}>
            <View className="box-row" />
          </Col>
          <Col span={8}>
            <View className="box-row" />
          </Col>
        </Row>
      </View>
      <View className="section">
        <Text className="header">嵌套栅格</Text>
        <Row>
          <Col span={7}>
            <View className="box box-container">
              <Row>
                <Col span={9}>
                  <View className="box-first box-container">
                    <Row>
                      <Col span={4}>
                        <View className="box-nested" />
                      </Col>
                      <Col span={8}>
                        <View className="box-nested" />
                      </Col>
                    </Row>
                  </View>
                </Col>
                <Col span={3}>
                  <View className="box-first box-container">
                    <Row>
                      <Col>
                        <View className="box-nested" />
                      </Col>
                    </Row>
                  </View>
                </Col>
              </Row>
            </View>
          </Col>
          <Col span={5}>
            <View className="box box-container">
              <Row>
                <Col>
                  <View className="box-first box-container">
                    <Row>
                      <Col span={6}>
                        <View className="box-nested" />
                      </Col>
                      <Col span={6}>
                        <View className="box-nested" />
                      </Col>
                    </Row>
                  </View>
                </Col>
              </Row>
            </View>
          </Col>
        </Row>
      </View>
      <View className="section">
        <Text className="header">自定义槽宽</Text>
        <Row gutter={0}>
          <Col>
            <View className="box" />
          </Col>
          <Col>
            <View className="box" />
          </Col>
          <Col>
            <View className="box" />
          </Col>
        </Row>
      </View>
      <View className="section">
        <Text className="header">Offsets</Text>
        <Row>
          <Col span={1} offset={11}>
            <View className="box-row" />
          </Col>
        </Row>
        <Row>
          <Col span={2} offset={10}>
            <View className="box-row" />
          </Col>
        </Row>
        <Row>
          <Col span={3} offset={9}>
            <View className="box-row" />
          </Col>
        </Row>
        <Row>
          <Col span={4} offset={8}>
            <View className="box-row" />
          </Col>
        </Row>
        <Row>
          <Col span={5} offset={7}>
            <View className="box-row" />
          </Col>
        </Row>
        <Row>
          <Col span={6} offset={6}>
            <View className="box-row" />
          </Col>
        </Row>
        <Row>
          <Col span={7} offset={5}>
            <View className="box-row" />
          </Col>
        </Row>
        <Row>
          <Col span={8} offset={4}>
            <View className="box-row" />
          </Col>
        </Row>
        <Row>
          <Col span={9} offset={3}>
            <View className="box-row" />
          </Col>
        </Row>
        <Row>
          <Col span={10} offset={2}>
            <View className="box-row" />
          </Col>
        </Row>
        <Row>
          <Col span={11} offset={1}>
            <View className="box-row" />
          </Col>
        </Row>
      </View>
      <View className="section">
        <Text className="header">垂直方向对齐</Text>
        <View className="container">
          <Row>
            <Col span={6}>
              <View className="box-large" />
            </Col>
            <Col>
              <View className="box" />
            </Col>
          </Row>
        </View>
        <View className="container">
          <Row align="flex-start">
            <Col span={6}>
              <View className="box-large" />
            </Col>
            <Col>
              <View className="box" />
            </Col>
          </Row>
        </View>
        <View className="container">
          <Row align="center">
            <Col span={6}>
              <View className="box-large" />
            </Col>
            <Col>
              <View className="box" />
            </Col>
          </Row>
        </View>
        <View className="container">
          <Row align="flex-end">
            <Col span={6}>
              <View className="box-large" />
            </Col>
            <Col>
              <View className="box" />
            </Col>
          </Row>
        </View>
      </View>
      <View className="section">
        <Text className="header">水平分布</Text>
        <View className="container">
          <Row>
            <Col>
              <View className="box box-wrap">
                <Row gutter={0}>
                  <Col className="flex-none">
                    <View className="box-nested">Box Start</View>
                  </Col>
                  <Col className="flex-none">
                    <View className="box-nested">Box Center</View>
                  </Col>
                  <Col className="flex-none">
                    <View className="box-nested">Box End</View>
                  </Col>
                </Row>
              </View>
            </Col>
          </Row>
        </View>
        <View className="container">
          <Row>
            <Col>
              <View className="box box-wrap">
                <Row justify="flex-end" gutter={0}>
                  <Col className="flex-none">
                    <View className="box-nested">Box Start</View>
                  </Col>
                  <Col className="flex-none">
                    <View className="box-nested">Box Center</View>
                  </Col>
                  <Col className="flex-none">
                    <View className="box-nested">Box End</View>
                  </Col>
                </Row>
              </View>
            </Col>
          </Row>
        </View>
        <View className="container">
          <Row>
            <Col>
              <View className="box box-wrap">
                <Row justify="center" gutter={0}>
                  <Col className="flex-none">
                    <View className="box-nested">Box Start</View>
                  </Col>
                  <Col className="flex-none">
                    <View className="box-nested">Box Center</View>
                  </Col>
                  <Col className="flex-none">
                    <View className="box-nested">Box End</View>
                  </Col>
                </Row>
              </View>
            </Col>
          </Row>
        </View>
        <View className="container">
          <Row>
            <Col>
              <View className="box box-wrap">
                <Row justify="space-around" gutter={0}>
                  <Col className="flex-none">
                    <View className="box-nested">Box Start</View>
                  </Col>
                  <Col className="flex-none">
                    <View className="box-nested">Box Center</View>
                  </Col>
                  <Col className="flex-none">
                    <View className="box-nested">Box End</View>
                  </Col>
                </Row>
              </View>
            </Col>
          </Row>
        </View>
        <View className="container">
          <Row>
            <Col>
              <View className="box box-wrap">
                <Row justify="space-between" gutter={0}>
                  <Col className="flex-none">
                    <View className="box-nested">Box Start</View>
                  </Col>
                  <Col className="flex-none">
                    <View className="box-nested">Box Center</View>
                  </Col>
                  <Col className="flex-none">
                    <View className="box-nested">Box End</View>
                  </Col>
                </Row>
              </View>
            </Col>
          </Row>
        </View>
        <View className="container">
          <Row>
            <Col>
              <View className="box box-wrap">
                <Row justify="space-evenly" gutter={0}>
                  <Col className="flex-none">
                    <View className="box-nested">Box Start</View>
                  </Col>
                  <Col className="flex-none">
                    <View className="box-nested">Box Center</View>
                  </Col>
                  <Col className="flex-none">
                    <View className="box-nested">Box End</View>
                  </Col>
                </Row>
              </View>
            </Col>
          </Row>
        </View>
      </View>
      <View className="section">
        <Text className="header">排序</Text>
        <View className="container">
          <Row>
            <Col>
              <View className="box box-container">
                <Row reverse>
                  <Col span={2}>
                    <View className="box-nested">1</View>
                  </Col>
                  <Col span={2}>
                    <View className="box-nested">2</View>
                  </Col>
                  <Col span={2}>
                    <View className="box-nested">3</View>
                  </Col>
                  <Col span={2}>
                    <View className="box-nested">4</View>
                  </Col>
                  <Col span={2}>
                    <View className="box-nested">5</View>
                  </Col>
                  <Col span={2}>
                    <View className="box-nested">6</View>
                  </Col>
                </Row>
              </View>
            </Col>
          </Row>
        </View>
        <View className="container">
          <Row>
            <Col>
              <View className="box box-container">
                <Row>
                  <Col span={2}>
                    <View className="box-first">1</View>
                  </Col>
                  <Col span={2}>
                    <View className="box-first">2</View>
                  </Col>
                  <Col span={2}>
                    <View className="box-first">3</View>
                  </Col>
                  <Col span={2}>
                    <View className="box-first">4</View>
                  </Col>
                  <Col span={2}>
                    <View className="box-first">5</View>
                  </Col>
                  <Col span={2} order={-1}>
                    <View className="box-nested">6</View>
                  </Col>
                </Row>
              </View>
            </Col>
          </Row>
        </View>
        <View className="container">
          <Row>
            <Col>
              <View className="box box-container">
                <Row>
                  <Col span={2} order={1}>
                    <View className="box-nested">1</View>
                  </Col>
                  <Col span={2}>
                    <View className="box-first">2</View>
                  </Col>
                  <Col span={2}>
                    <View className="box-first">3</View>
                  </Col>
                  <Col span={2}>
                    <View className="box-first">4</View>
                  </Col>
                  <Col span={2}>
                    <View className="box-first">5</View>
                  </Col>
                  <Col span={2}>
                    <View className="box-first">6</View>
                  </Col>
                </Row>
              </View>
            </Col>
          </Row>
        </View>
      </View>
    </View>
  );
}
