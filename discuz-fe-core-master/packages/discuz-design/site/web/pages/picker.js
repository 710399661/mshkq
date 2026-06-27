import React from 'react';


import Base from '../../../components/web-picker/__examples__/web/base';

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
    </View>
  );
}

export default Preview;
