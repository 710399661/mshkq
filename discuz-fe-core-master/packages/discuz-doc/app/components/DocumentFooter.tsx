import React from 'react';
import { Button } from '@discuz/design';

export function DocumentMainContentFooter({ children }: { children?: React.ReactNode }) {
    return (
        <div className="dzq-site-home__footer">
            <div className='dzq-site-home__wrap'>
                <div className="dzq-site-home__link">
                    <div className="dzq-site-home__footer_link">
                        <div className={"dzq-site-home__link-group"}>
                            <p>官方信息</p>
                            <div><a href="https://discuz.com/" target="_blank">Discuz! Q 官网</a></div>
                            <div><a href="https://discuz.chat/" target="_blank">Discuz! Q 演示站</a></div>
                            <div><a href='https://cloud.tencent.com/act/event/discuzq' target="_blank">Discuz! Q 活动信息</a></div>
                        </div>
                        <div className={"dzq-site-home__link-group"}>
                            <p>资源工具</p>
                            <div><a href={"./#/plugin/start"}>插件开发</a></div>
                            <div><a href={"./#/components/install"}>组件库资源</a></div>
                            <div><a href={"./#/api/get:_apiv3_check.user.get.redpacket"}>API开发文档</a></div>
                        </div>
                        <div className={"dzq-site-home__link-group"}>
                            <p>联系我们</p>
                            <div><a href='https://wj.qq.com/s2/9012844/a441/' target="_blank">成为开发者</a></div>
                            <div><a href='https://discuz.chat/?categoryId=3&sequence=0' target="_blank">需求反馈</a></div>
                        </div>
                    </div>
                    <div className={"dzq-site-home__footer_copyright"}><a href={"./"}>Discuz! Q 开发者中心 Copyright © 2021 Discuz! Q</a></div>
                </div>
                <div className="dzq-site-home__info">
                    <p>关注我们</p>
                    <span>关注Discuz! 公众号了解最新动态</span>
                    <img src='https://imgcache.qq.com/operation/dianshi/other/orcode.dbb05450e0b9d5d22185343f05e2217b2e130662.png' />
                </div>
            </div>
        </div>
    )
}
