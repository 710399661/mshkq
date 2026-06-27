/* eslint-disable no-undef */
/**
 * 站点配置的一些变量，通过 ../../config/*.js 中 defineConstants 进行配置定义的
 * 用于配置一些全局变量供代码中进行使用
 * 之所以统一放到这里是避免代码中引用的时候报 eslint undef 问题
 */
// 请求域名
export const envHost = ENV_HOST;
// 当前环境版本
export const envVersion = ENV_VERSION;
