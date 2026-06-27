import { Divider } from '@discuzq/design';
import React from "react";
import "./index.scss";

export default function Base() {
  return (
    <div className="page">
      <div className="divider-section">
        <p>
          帝高阳之苗裔兮，朕皇考曰伯庸。 摄提贞于孟陬兮，惟庚寅吾以降。
          皇览揆余初度兮，肇锡余以嘉名： 名余曰正则兮，字余曰灵均。
          纷吾既有此内美兮，又重之以修能。 扈江离与辟芷兮，纫秋兰以为佩。
          汩余若将不及兮，恐年岁之不吾与。 朝搴阰之木兰兮，夕揽洲之宿莽。
          日月忽其不淹兮，春与秋其代序。
        </p>
        <Divider></Divider>
        <p>
          惟草木之零落兮，恐美人之迟暮。(惟 通：唯)
          不抚壮而弃秽兮，何不改乎此度？ 乘骐骥以驰骋兮，来吾道夫先路！
          昔三后之纯粹兮，固众芳之所在。 杂申椒与菌桂兮，岂惟纫夫蕙茝！
          彼尧、舜之耿介兮，既遵道而得路。 何桀纣之猖披兮，夫惟捷径以窘步。
          惟夫党人之偷乐兮，路幽昧以险隘。
        </p>
      </div>
    </div>
  );
}
