import React, { ErrorInfo } from 'react';

type ErrorBoundaryState = {
  isError: boolean;
  errorMessage: string;
};

export default class ErrorBoundary extends React.Component<{}, ErrorBoundaryState> {
  constructor(props: any) {
    super(props);
    this.state = {
      isError: false,
      errorMessage: '',
    };
  }

  static getDerivedStateFromError(error: any) {
    return { isError: true };
  }

  componentDidCatch(error: Error | null, errorInfo: ErrorInfo) {
    console.error(errorInfo);
  }

  render() {
    if (this.state.isError) return <div>渲染异常</div>;

    return this.props.children;
  }
}
