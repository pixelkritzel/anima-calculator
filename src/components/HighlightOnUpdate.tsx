import * as React from 'react';

type IHighLightOnUpdateProps = {
  render: (isUpdate: boolean) => JSX.Element;
  resetAfter?: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  tracking: any;
};

export default class HighlightOnUpdate extends React.Component<IHighLightOnUpdateProps> {
  state = {
    isUpdate: false,
  };

  ref: HTMLSpanElement | null = null;

  timeoutId = 0;

  UNSAFE_componentWillReceiveProps(nextProps: IHighLightOnUpdateProps) {
    clearTimeout(this.timeoutId);
    this.setState({ isUpdate: this.props.tracking !== nextProps.tracking }, this.resetIsUpdate);
  }

  componentWillUnmount() {
    clearTimeout(this.timeoutId);
  }

  resetIsUpdate = () => {
    const { resetAfter } = this.props;
    if (resetAfter) {
      this.timeoutId = window.setTimeout(() => this.setState({ isUpdate: false }), resetAfter);
    }
  };

  render() {
    const { render } = this.props;
    return render(this.state.isUpdate);
  }
}
