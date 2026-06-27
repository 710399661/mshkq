import React from 'react';

import Base from '../../../components/divider/__examples__/web/base';
import Text from '../../../components/divider/__examples__/web/text';
import Dashed from '../../../components/divider/__examples__/web/dashed';
import Mode from '../../../components/divider/__examples__/web/mode';

function View(props) {
  return <div>{props.children}</div>;
}

function Title(props) {
  return <h1>{props.children}</h1>;
}

function Preview() {
  return (
    <View>
      <Title>基础用法</Title>
      <Base></Base>

      <Title>设置文案</Title>
      <Text></Text>

      <Title>虚线</Title>
      <Dashed></Dashed>

      <Title>垂直分割</Title>
      <Mode></Mode>
    </View>
  );
}

export default Preview;
