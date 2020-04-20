import * as React from 'react';

type IHighLightOnUpdateProps = {
  render: (isUpdate: boolean) => JSX.Element;
  resetAfter?: number;
  tracking: any; // tslint:disable-line no-any
};

export default class HighlightOnUpdate extends React.Component<IHighLightOnUpdateProps, {}> {
  state = {
    isUpdate: false,
  };

  ref: HTMLSpanElement | null;

  timeoutId: NodeJS.Timer;

  componentWillReceiveProps(nextProps: IHighLightOnUpdateProps) {
    clearTimeout(this.timeoutId);
    this.setState({ isUpdate: this.props.tracking !== nextProps.tracking }, this.resetIsUpdate);
  }

  componentWillUnmount() {
    clearTimeout(this.timeoutId);
  }

  resetIsUpdate = () => {
    const { resetAfter } = this.props;
    if (resetAfter) {
      this.timeoutId = setTimeout(() => this.setState({ isUpdate: false }), resetAfter);
    }
  };

  render() {
    const { render } = this.props;
    return render(this.state.isUpdate);
  }
}
