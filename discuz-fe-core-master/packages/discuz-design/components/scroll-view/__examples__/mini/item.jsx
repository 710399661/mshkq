import React from 'react';
import { View, Image, Text } from '@tarojs/components';

const Item = ({ data: item }) => (
  <View className="list-item">
    <View className="list-item-h">
      <View className="img">
        {item.user.avatarUrl && item.user.avatarUrl !== '' ? (
          <Image
            src={
              item.type === 5 && item.question && item.question.is_answer === 1 && item.question.beUser
                ? item.question.beUser.avatarUrl
                : item.user.avatarUrl
            }
          />
        ) : (
          <View className="default-avatar">{item.user.username[0].toUpperCase()}</View>
        )}
      </View>
      <View className="info">
        <Text className="name">
          {item.type === 5 && item.question && item.question.is_answer === 1 && item.question.beUser
            ? item.question.beUser.username
            : item.user.username}
        </Text>
        <View className="sub-box">
          <Text className="date">2021-11-11 14:22:22</Text>
          {item.type === '5' && (
            <View className="question-box">
              {item.question && item.question.is_answer === 0 && (
                <View className="question-box-content">
                  向<Text>@{item.question?.beUser?.username || '匿名用户'}</Text>提问：
                </View>
              )}
              {item.question && item.question.is_answer === 1 && (
                <View className="question-box-content">
                  回答了<Text>@{item.user?.username || '匿名用户'}</Text>的提问：
                </View>
              )}
            </View>
          )}
        </View>
      </View>
    </View>

    <View className="list-item-content">
      {item.type === 1 ? (
        <View className="title">
          发布了：<Text>{item.title}</Text>
        </View>
      ) : (
        <View className="body">{item.firstPost.summary_component}</View>
      )}
      {item.firstPost.images && item.firstPost.images.length > 0 && (
        <View className="image-list">
          {item.firstPost.images.slice(0, 9).map((data, key) => (
            <View
              className={`image-item image-count-${
                item.firstPost.images.length >= 3 ? 3 : item.firstPost.images.length
              }`}
              style={{ backgroundImage: `url(${data.thumbUrl})` }}
              key={key}
            >
              <Image src={data.thumbUrl} />
            </View>
          ))}
        </View>
      )}

      {item.type === 2 && item.threadVideo && (
        <View className="video-main">
          <Image className="play" src="/video.svg" />
          <View className="bgimg" style={{ backgroundImage: `url(${item.threadVideo.cover_url})` }} />
        </View>
      )}
    </View>

    <View className="list-item-f">
      <View className="item">
        <Text className="qui-icon icon-like"></Text>
        <Text>赞{item.firstPost.likeCount || ''}</Text>
      </View>
      <View className="item">
        <Text>评论</Text>
      </View>
      <View className="item">
        <Text className="qui-icon icon-share"></Text>
        <Text>分享</Text>
      </View>
    </View>
  </View>
);

export default Item;
