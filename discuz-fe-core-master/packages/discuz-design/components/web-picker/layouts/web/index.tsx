import React from 'react';
import classnames from 'classnames';
import PickerWrapper from './pickerWrapper';
import { isFunction } from '../../../../utils/typeof';
import { WebPickerProps } from '../../interface';
import { ConfigContext } from '../../../../extends/configContext';

export class WebLayout extends React.Component<WebPickerProps> {
    static defaultProps = {
        className: '',
        height: 187,
        style: {},
        pickerData: []
    }
    static contextType = ConfigContext;

    private BScrollList: object = {};

    constructor(props) {
        super(props);
        this.initBScrollCallback = this.initBScrollCallback.bind(this);
    }
    shouldComponentUpdate(nextProps) {
        if (JSON.stringify(nextProps) != JSON.stringify(this.props)) {
            return true;
        }
        // 更新渲染数据的时候需要做判断，如果数据不一样将会重新渲染
        if (JSON.stringify(nextProps.pickerData) != JSON.stringify(this.props.pickerData)) {
            return true;
        }
        return false;
    }

    componentDidMount() {
        this.props.renderAfter && isFunction(this.props.renderAfter) && this.props.renderAfter(this.BScrollList);
    }

    initBScrollCallback(key, BScrollObj) {
        this.BScrollList[key] = BScrollObj;
    }

    renderPickerWrapper(): Array<any> {
        const { pickerData = [], prefixCls, onTouchEnd, onTouchStart, height } = this.props;
        const timestamp = new Date().getTime();
        const pickerWrapperNodes = pickerData.map((item, key) => (
            item ? <PickerWrapper
                height={height ? height : 187}
                key={`${timestamp}-${key}-cm`}
                wrapperIndex={key}
                wrapperKey={`${timestamp}-${key}-node`}
                data={item}
                prefixCls={prefixCls}
                initBScrollCallback={this.initBScrollCallback}
                onTouchStart={onTouchStart}
                onTouchEnd={onTouchEnd}
            /> : null
        ));
        return pickerWrapperNodes;
    }

    render(): JSX.Element {
        const { clsPrefix } = this.context;
        const { className, style, height } = this.props;
        const cls = classnames(
            className,
            `${clsPrefix}-web-picker`
        );
        return (
            <div
                className={cls}
                style={{...style, height: `${height}px`}}
            >
                {this.renderPickerWrapper()}
            </div>
        );
    }
}