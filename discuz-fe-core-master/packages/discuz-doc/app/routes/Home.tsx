import { DocumentMainContentFooter } from "@app/components/DocumentFooter";
import React from "react";

export default function Home() {
  return (
    <div
      className="dzq-site-home"
    >
      <div className="dzq-site-home__header">
        <img className={"dzq-site-home__banner"} src="https://imgcache.qq.com/operation/dianshi/other/banner.184c37ee8e1b9d10d85ca74f8e7f3b573b959f83.png" />
        <div className={'dzq-site-home__header_info'}>
          <p>唯有开发者的才华横溢，唯有产品经理的洞察妙思，才能助力站点的成功</p>
          <p>协助你稳定高效二次开发的组件库、API、SDK、开发文档、开发工具都在这里</p>
        </div>
      </div>
      <div className='dzq-site-home__main'>
        <div className='dzq-site-home__plugins'>
          <div className='dzq-site-home__wrap'>
            <div className='dzq-site-home__content_header'>
              <h4 className='dzq-site-home__title'>从一款插件开始</h4>
              <p className='dzq-site-home__titleMsg'>易用稳定的钩子机制，非破坏性的融合</p>
            </div>
            <div className='dzq-site-home__content'>
              <div className='dzq-site-home__plugins_left'>
                <p className='dzq-site-home__contentMsg'>助力开发者快速插件开发，同步官主流程迭代不脱钩。通过插件扩展站点能力，拓展私域流量经营场景</p>
                <div className='dzq-site-home__plugins_contentList'>
                  <div className='dzq-site-home__plugins_list'>
                    <div className='dzq-site-home__plugins_listImg'>
                      <img src="https://imgcache.qq.com/operation/dianshi/other/list-1.267a4f31eeb43abfa3e4c9d280c154e63d1c63a7.png" alt="" />
                    </div>
                    <div className='dzq-site-home__plugins_listMsg'>样式插件</div>
                  </div>
                  <div className='dzq-site-home__plugins_list'>
                    <div className='dzq-site-home__plugins_listImg'>
                      <img src="https://imgcache.qq.com/operation/dianshi/other/list-2.effe319d20e78274742393d98569887100fb4083.png" alt="" />
                    </div>
                    <div className='dzq-site-home__plugins_listMsg'>数据交互</div>
                  </div>
                  <div className='dzq-site-home__plugins_list'>
                    <div className='dzq-site-home__plugins_listImg'>
                      <img src="https://imgcache.qq.com/operation/dianshi/other/list-3.3947c1a21063b6a0c2d6a79c144d5d0d80eaf05e.png" alt="" />
                    </div>
                    <div className='dzq-site-home__plugins_listMsg'>能力扩充</div>
                  </div>
                  <div className='dzq-site-home__plugins_list'>
                    <div className='dzq-site-home__plugins_listImg'>
                      <img src="https://imgcache.qq.com/operation/dianshi/other/list-4.feef246f9dbc9b760462639bbb01141b305605e8.png" alt="" />
                    </div>
                    <div className='dzq-site-home__plugins_listMsg'>创新机制</div>
                  </div>
                </div>
              </div>
              <div className='dzq-site-home__plugins_right'>
                <img src='https://imgcache.qq.com/operation/dianshi/other/plugins.13bfb618ea7b8a4b847184f60c7bac09edb2c278.png' className='dzq-site-home__img'/>
              </div>
            </div>
          </div>
        </div>
        <div className='dzq-site-home__toolkit'>
          <div className='dzq-site-home__wrap'>
            <div className='dzq-site-home__content_header'>
              <h3 className='dzq-site-home__title'>你需要的工具包</h3>
              <p className='dzq-site-home__titleMsg'>官方开放，全面为你保驾护航</p>
            </div>
            <div className='dzq-site-home__content'>
              <div className='dzq-site-home__toolkit_left'>
                <img src='https://imgcache.qq.com/operation/dianshi/other/toolkit.a5268c6126f6dea109de72bd8f359d33806c7c59.png' className='dzq-site-home__img'/>
              </div>
              <div className='dzq-site-home__toolkit_right'>
                <p className='dzq-site-home__contentMsg'>安装部署指引、使用说明；UI组件库、API文档、SDK文档、命令行工具、构建助手；从文档到工具，全面开放，规范稳定帮助你高效率二次开发和深度使用</p>
                <a target='_blank' href='https://discuz.chat/?categoryId=3&sequence=0'>
                  <div className='dzq-site-home__button'>开放建议</div>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className='dzq-site-home__joinus'>
          <div className='dzq-site-home__wrap'>
            <div className='dzq-site-home__content_header'>
              <h3 className='dzq-site-home__title'>成为Discuz! Q 开发者</h3>
              <p className='dzq-site-home__titleMsg'>参与Discuz! Q 生态开发，助你技术变现</p>
            </div>
            <div className='dzq-site-home__content'>
              <div className='dzq-site-home__joinus_left'>
                <p className='dzq-site-home__contentMsg'>无论你是插件还是深度二开开发者，无论你是个人还是企业，欢迎加入Discuz! Q 生态开发。官方信任背书、技术资源扶持、友好商业授权，助力价值实现，技术变现</p>
                <a href='https://wj.qq.com/s2/9012844/a441/' target="_blank">
                  <div className='dzq-site-home__button'>前往加入</div>
                </a>
              </div>
              <div className='dzq-site-home__joinus_right'>
                <img src='https://imgcache.qq.com/operation/dianshi/other/joinus.dd7dff1c51cce1143a4446775dba35e450aa274e.png' className='dzq-site-home__img'/>
              </div>
            </div>
          </div>
        </div>
      </div>

      <DocumentMainContentFooter />
    </div>
  );
}
