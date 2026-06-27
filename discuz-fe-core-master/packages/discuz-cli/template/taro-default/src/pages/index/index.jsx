import React, { Component } from 'react';
import { View, Button, Text } from '@tarojs/components';
import { observer, inject } from 'mobx-react';
import ThemePage from '@components/theme-page';
import { appTheme } from '@constants/app';
import './index.scss';

@inject('app')
@inject('site')
@observer
class Index extends Component {
  componentWillMount() { }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  render() {
    const { counter, envConfig } = this.props.site;
    const { theme, changeTheme } = this.props.app;
    return (
      <ThemePage>
        <View className='index'>
          <Text className='text'>{envConfig.host}</Text>
          <View className='text'>{theme}</View>
          <Text className='text'>{envConfig.version}</Text>
          <Button onClick={() => {
            changeTheme(theme === appTheme.light ? appTheme.dark : appTheme.light);
          }}>修改主题</Button>
        </View>
      </ThemePage>
    );
  }
}

export default Index;
