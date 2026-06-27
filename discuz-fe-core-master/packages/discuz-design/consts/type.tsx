export const StyledProps = {
  style: {},
  className: '',
};

export const CanaryProps = {};

export const CombineProps = (props: Object[] = [CanaryProps]) => props.reduce((a, b) => Object.assign(a, b));
