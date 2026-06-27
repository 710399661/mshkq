import BaseComponent from './baseComponent';

export const controlledComponentFactory = <
  P extends Object = {},
  S extends Object = {},
  V extends Object = {},
  L extends Object = {}
>({
    viewAdapter,
    logicalAdapter,
  }) => class ControlledComponent extends BaseComponent<P, S, V, L> {
    onChange = null;
    constructor(props) {
      super(props, {
        viewAdapter,
        logicalAdapter,
      });

      this.onChange = (...args) => {
        this.internalOnChange();

        if (this.props.onChange) {
          this.props.onChange.bind(this, args)();
        }
      };
    }

    getDefaultState() {}

    internalOnChange() {
      console.log('internal change');
    }
  };
