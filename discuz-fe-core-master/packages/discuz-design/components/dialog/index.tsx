import React from 'react';
import { baseComponentFactory } from '../../extends/baseComponent';
import { DialogViewAdapter } from './layouts/index';
import { DialogLogicalAdapter } from './adapters/index';
import { DialogProps } from './interface';
import { isCallable } from '../../utils/is-callable';
import EventEmitter from 'eventemitter3';
import report from '../../utils/report';

interface DialogState {
  visible: boolean;
  options: DialogProps;
  confirmDisabled: boolean;
}

export interface DialogLayoutProps extends DialogProps {}

interface DialogAdapter {}

class DialogEmitter extends EventEmitter {}

const dialogEmitter = new DialogEmitter();

export default class Dialog extends baseComponentFactory<DialogProps, DialogState, DialogLayoutProps, DialogAdapter>({
  viewAdapter: DialogViewAdapter,
  logicalAdapter: DialogLogicalAdapter,
}) {
  static confirm: ({ ...props }: DialogProps) => Promise<Boolean>;
  static info: ({ ...props }: DialogProps) => Promise<Boolean>;
  static waring: ({ ...props }: DialogProps) => Promise<Boolean>;
  static success: ({ ...props }: DialogProps) => Promise<Boolean>;
  static error: ({ ...props }: DialogProps) => Promise<Boolean>;

  onShow: (options: DialogProps) => void;
  onHide: () => void;

  constructor(props) {
    super(props);
    
    report({
      componentName: 'dialog'
    })

    this.state = {
      visible: this.props.defaultVisible ? this.props.defaultVisible : false,
      options: { ...this.props },
      confirmDisabled: this.props.confirmDisabled,
    };

    this.onShow = (options: DialogProps) => {
      this.setState({
        visible: true,
        options: { ...this.props, ...options },
      });
    };
    this.onHide = () => {
      this.setState({
        visible: false,
      });
    };

    if (this.props.inContext) {
      dialogEmitter.on('show', this.onShow);
      dialogEmitter.on('hide', this.onHide);
    }
  }

  static defaultProps = {
    maskClosable: true,
    mask: true,
    inContext: false,
    width: process.env.DISCUZ_ENV === 'web' ? 400 : 350,
    attach: '',
    title: '',
    type: 'confirm',
    confirmDisabled: false,
    confirmLoading: false,
    cancelBtn: '取消',
    confirmBtn: '确认',
    onCancel: () => {},
    onConfirm: () => { },
  };

  static show = () => {
    dialogEmitter.emit('show');
  };

  static hide = () => {
    dialogEmitter.emit('hide');
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { visible: prevVisible } = prevProps;
    const { visible: currentVisible } = this.props;
    if (currentVisible !== prevVisible && !currentVisible) {
      this.onClose();
    }
  }

  componentWillUnmount() {
    dialogEmitter.off('show', this.onShow);
    dialogEmitter.off('hide', this.onHide);
  }

  isControlledComponent = () => this.props.visible !== undefined;

  getDefaultState = (key: string) => this.state[key];

  onClose = () => {
    if (!this.isControlledComponent()) {
      this.setState({
        visible: false,
      });
    }
    if (this.state.options.onClose && isCallable(this.state.options.onClose)) {
      this.state.options.onClose();
    }
  };

  onCancel = async () => {
    if (isCallable(this.state.options.onCancel)) {
      await this.state.options.onCancel();
    }
  };

  onConfirm = async () => {
    if (isCallable(this.state.options.onConfirm)) {
      this.setState({ confirmDisabled: true });
      await this.state.options.onConfirm();
      this.setState({ confirmDisabled: false });
    }
  };

  render() {
    const { RenderComponent } = this;
    return (
      <RenderComponent
        {...this.state.options}
        confirmDisabled={this.state.confirmDisabled}
        visible={this.isControlledComponent() ? this.props.visible : this.getDefaultState('visible')}
        onClose={this.onClose}
        onCancel={this.onCancel}
        onConfirm={this.onConfirm}
      >
        {this.state.options.content || this.props.children}
      </RenderComponent>
    );
  }
}

const show = (type: DialogLayoutProps['type']) => {
  if (process.env.DISCUZ_ENV === 'mini') {
    return ({ ...props }: DialogProps) => {
      return new Promise<Boolean>((resolve) => {
        const { onConfirm, onCancel, ...restProps } = props;
        dialogEmitter.emit('show', {
          ...restProps,
          type,
          onConfirm: async () => {
            if (props.onConfirm && props.onConfirm() instanceof Promise) {
              await props.onConfirm();
              resolve(true);
            } else dialogEmitter.emit('hide');
          },
          onCancel: async () => {
            if (props.onCancel && props.onCancel() instanceof Promise) {
              await props.onCancel();
              resolve(false);
            } else dialogEmitter.emit('hide');
          },
        });
      });
    }
  }
  if (process.env.DISCUZ_ENV === 'web') {
    const ReactDOM = require('react-dom');
    return ({ ...props }: DialogProps) => {
      return new Promise<Boolean>((resolve) => {
        const el = document.createElement('div');
        ReactDOM.render(
          <Dialog
            {...props}
            type={type}
            inContext={true}
            onClose={() => {
              if (props.onClose && isCallable(props.onClose)) {
                props.onClose();
              }
              // TODO: 待增加销毁之后的动画
              ReactDOM.unmountComponentAtNode(el);
            }}
            onConfirm={async () => {
              if (props.onConfirm && props.onConfirm() instanceof Promise) {
                await props.onConfirm();
                resolve(true);
              }
              ReactDOM.unmountComponentAtNode(el);;
            }}
            onCancel={async () => {
              if (props.onCancel && props.onCancel() instanceof Promise) {
                await props.onCancel();
                resolve(false);
              }
              ReactDOM.unmountComponentAtNode(el);
            }}
          />,
          el,
        );
        dialogEmitter.emit('show', {});
      })
    };
  }
}

Dialog.confirm = show('confirm');
Dialog.info = show('info');
Dialog.success = show('success');
Dialog.waring = show('warning');
Dialog.error = show('error');
Dialog.hide = () => dialogEmitter.emit('hide');