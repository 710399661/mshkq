import { Divider } from '@discuzq/design';
import React from "react";

export default function Base() {
  return (
    <div className="page">
      <div className="divider-section">
        <Divider orientation="left">居左</Divider>
        <p>
          白日何短短，百年苦易满。 苍穹浩茫茫，万劫太极长。
          麻姑垂两鬓，一半已成霜。 天公见玉女，大笑亿千场。
          吾欲揽六龙，回车挂扶桑。 北斗酌美酒，劝龙各一觞。
          富贵非所愿，与人驻颜光。
        </p>
        <Divider>居中</Divider>
        <p>
          译文: 白天何其太短暂，百年光阴很快就过去了。
          苍穹浩渺无际，万劫之世实在是太长了。
          就连以长寿著名的仙女麻姑，头发也白了一半了。
          天公和玉女玩投壶的游戏，每中一次即大笑，也笑了千亿次了。
          我想驾日车揽六龙，转车东回，挂车于扶桑之上。
          用北斗酌酒浆，每条龙都各劝其一觞酒，让它们都沉睡不醒，不能再驾日出发。
          富贵荣华非我所愿，只愿为人们留住光阴，永驻青春。
        </p>
        <Divider orientation="right">居右</Divider>
      </div>
    </div>
  );
}
