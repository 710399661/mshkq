import React from 'react';
import BScroll from 'better-scroll';
import ReactDOM from 'react-dom';
import classnames from 'classnames';
import { WebPickerWrapperProps } from '../../interface';
import { ConfigContext } from '../../../../extends/configContext';

export default class PickerWrapper extends React.PureComponent<WebPickerWrapperProps> {
    static defaultProps = {
        wrapperKey: '',
        height: 187,
        data: []
    }
    static contextType = ConfigContext;

    private wrapper: HTMLDivElement | null
    private wheelScroll: any
    private BScrollObj: any
    private currIndex: number

    constructor( props ) {
        super( props );
        this.touchEnd = this.touchEnd.bind( this );
        this.touchStart = this.touchStart.bind( this );
    }

    componentDidUpdate(): void {
        if ( this.props.data.selectedIndex ) {
            this.BScrollObj.wheelTo( this.props.data.selectedIndex );
        }
        this.BScrollObj.refresh();
    }

    componentDidMount (): void {
        const { scrollType = new Date().getTime() } = this.props.data;
        const initBScrollConfig = this.resetBScrollConfig();
        const wrapperNode: any = this.wrapper ? ReactDOM.findDOMNode( this.wrapper ) : null;
        if ( wrapperNode ) {
            this.BScrollObj = wrapperNode && new BScroll( wrapperNode, initBScrollConfig );
            // 某种情况下会出现无法滚动到指定的selectedIndex
            requestAnimationFrame( () => {
                this.BScrollObj.wheelTo( initBScrollConfig.wheel.selectedIndex );
                this.addActiveItem();
                this.BScrollObj.refresh();
            } );
            this.BScrollObj.on( 'beforeScrollStart', this.touchStart );
            this.BScrollObj.on( 'scrollEnd', this.touchEnd );
            this.BScrollObj.on( 'scrollCancel', this.touchEnd );
            this.props.initBScrollCallback( scrollType, this.BScrollObj );
        }
    }

    componentWillUnmount():void {
        this.BScrollObj.off( 'beforeScrollStart', this.touchStart );
        this.BScrollObj.off( 'scrollEnd', this.touchEnd );
        this.BScrollObj.off( 'scrollCancel', this.touchEnd );
    }

    resetBScrollConfig(): any {
        const { clsPrefix } = this.context;
        const { data } = this.props;
        const wheel = {
            selectedIndex: data.selectIndex ? data.selectIndex : 0,
            rotate: 0,
            adjustTime: 0,
            wheelWrapperClass: `${clsPrefix}-ws`,
            wheelItemClass: `${clsPrefix}-wi`
        };
        let initBScrollConfig: any = {};
        if ( data.scrollData ) {
            initBScrollConfig = data.scrollData;
            if ( initBScrollConfig.wheel ) {
                initBScrollConfig.wheel = Object.assign( {}, initBScrollConfig.wheel, wheel );
            }
        } else {
            initBScrollConfig.wheel = wheel;
        }
        return initBScrollConfig;
    }

    getWrapper ( div ): void {
        this.wrapper = div;
    }

    getWheelScroll ( div ): void {
        this.wheelScroll = ReactDOM.findDOMNode( div );
    }

    touchEnd(): void {
        const { wrapperIndex, scrollType } = this.props.data;
        this.addActiveItem();
        this.props.onTouchEnd && this.props.onTouchEnd( scrollType != null ? scrollType : wrapperIndex, this.BScrollObj.getSelectedIndex() );
    }

    touchStart(): void {
        this.removeActiveItem();
        this.props.onTouchStart && this.props.onTouchStart( this.props.wrapperIndex );
    }

    removeActiveItem (): void {
        const { clsPrefix } = this.context;
        if ( this.wheelScroll.children[this.currIndex] ) {
            this.wheelScroll.children[this.currIndex].className = this.wheelScroll.children[this.currIndex].className.replace(` ${clsPrefix}-web-picker__wi-active`, '');
        }
    }

    addActiveItem (): void {
        const { clsPrefix } = this.context;
        this.currIndex = this.BScrollObj.getSelectedIndex();
        if ( this.wheelScroll && this.wheelScroll.children[this.currIndex] ) {
            this.wheelScroll.children[this.currIndex].className = `${this.wheelScroll.children[this.currIndex].className} ${clsPrefix}-web-picker__wi-active`;
        }
    }

    renderItem(): Array<any> {
        const { data } = this.props;
        const { clsPrefix } = this.context;
        const liCls = classnames(
            data.itemClassName,
            `${clsPrefix}-web-picker__wi`,
        );
        const timestamp = new Date().getTime();
        const liNodeList = data.listData.map( ( item, key ) => (
            <li
                className={item.className ? classnames(liCls, item.className) : liCls}
                data-key={item.dataKey ? item.dataKey : item.text}
                key={`${timestamp}-${key}-item`}
            >
                {item.text}
            </li>
        ) );

        return liNodeList;
    }

    render (): JSX.Element {
        const { clsPrefix } = this.context;
        const { data, wrapperKey, height } = this.props;
        const ulCls = classnames(
            data.className,
            `${clsPrefix}-web-picker__wrapper--ws`,
        );
        return (
            <div
                key={wrapperKey}
                className={`${clsPrefix}-web-picker__wrapper wrapper`}
                ref={( refs ) => { this.getWrapper( refs ); }}
            >
                <ul
                    className={ulCls}
                    ref={( refs ) => { this.getWheelScroll( refs ); }}
                    style={{
                        marginTop: `${height/2-25}px`
                    }}
                >
                    {this.renderItem()}
                </ul>
                <div className={`${clsPrefix}-web-picker__wrapper-bg`} />
            </div>
        );
    }
}