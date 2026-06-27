if (typeof window !== 'undefined') {
// creates a global "addWheelListener" method
// example: addWheelListener( elem, function( e ) { console.log( e.deltaY ); e.preventDefault(); } );
  (function (window, document) {
    let prefix = ''; let _addEventListener; let onwheel; let support;

    // detect event model
    if (window.addEventListener) {
      _addEventListener = 'addEventListener';
    } else {
      _addEventListener = 'attachEvent';
      prefix = 'on';
    }

    // detect available wheel event
    support = 'onwheel' in document.createElement('div') ? 'wheel' // 各个厂商的高版本浏览器都支持"wheel"
      : document.onmousewheel !== undefined ? 'mousewheel' // Webkit 和 IE一定支持"mousewheel"
        : 'DOMMouseScroll'; // 低版本firefox

    window.addWheelListener = function (elem, callback, useCapture) {
      _addWheelListener(elem, support, callback, useCapture);

      // handle MozMousePixelScroll in older Firefox
      if (support == 'DOMMouseScroll') {
        _addWheelListener(elem, 'MozMousePixelScroll', callback, useCapture);
      }
    };

    function _addWheelListener(elem, eventName, callback, useCapture) {
      elem[_addEventListener](prefix + eventName, support == 'wheel' ? callback : (originalEvent) => {
        !originalEvent && (originalEvent = window.event);

        // create a normalized event object
        const event = {
        // keep a ref to the original event object
          originalEvent,
          target: originalEvent.target || originalEvent.srcElement,
          type: 'wheel',
          deltaMode: originalEvent.type == 'MozMousePixelScroll' ? 0 : 1,
          deltaX: 0,
          deltaZ: 0,
          preventDefault() {
            originalEvent.preventDefault
              ? originalEvent.preventDefault()
              : originalEvent.returnValue = false;
          },
        };

        // calculate deltaY (and deltaX) according to the event
        if (support == 'mousewheel') {
          event.deltaY = - 1 / 40 * originalEvent.wheelDelta;
          // Webkit also support wheelDeltaX
          originalEvent.wheelDeltaX && (event.deltaX = - 1 / 40 * originalEvent.wheelDeltaX);
        } else {
          event.deltaY = originalEvent.detail;
        }

        // it's time to fire the callback
        return callback(event);
      }, useCapture || false);
    }
  }(window, document));
}

const DZQMouse = function (el, option = {}) {
  this.element = typeof el === 'string' ? document.querySelector(el) : el;

  this.start = this.start.bind(this);
  this.move = this.move.bind(this);
  this.end = this.end.bind(this);
  this.wheelDelta = this.wheelDelta.bind(this);
  this.dragStart = this.dragStart.bind(this);

  this.mouseMove = option.mouseMove.bind(this);
  this.zoomIn = option.zoomIn.bind(this);
  this.zoomOut = option.zoomOut.bind(this);

  this.startPosition = null;
  this.endPosition = null;
  this.currentPosition = null;

  this.element.addEventListener('mousedown', this.start, false);
  this.element.addEventListener('mousemove', this.move, false);
  this.element.addEventListener('mouseleave', this.end, false);
  this.element.addEventListener('mouseup', this.end, false);
  this.element.dragStart = this.dragStart;
  // @ts-ignore
  window.addWheelListener(document, this.wheelDelta, false);
};

DZQMouse.prototype = {
  dragStart(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    return false;
  },
  start(evt) {
    this.startPosition = {
      x: evt.clientX,
      y: evt.clientY,
    };
    this.endPosition = null;
    this.currentPosition = null;
  },
  move(evt) {
    if (!this.startPosition) return;
    if (this.endPosition) return;

    if (this.currentPosition) {
      evt.deltaX = evt.clientX - this.currentPosition.x;
      evt.deltaY = evt.clientY - this.currentPosition.y;
    } else {
      evt.deltaX = evt.clientX - this.startPosition.x;
      evt.deltaY = evt.clientY - this.startPosition.y;
    }

    this.currentPosition = {
      x: evt.clientX,
      y: evt.clientY,
    };

    this.mouseMove(evt);
  },
  end(evt) {
    this.endPosition = {
      x: evt.clientX,
      y: evt.clientY,
    };
    this.startPosition = null;
  },

  destroy() {
    this.element.removeEventListener('mousedown', this.start);
    this.element.removeEventListener('mousemove', this.move);
    this.element.removeEventListener('mouseleave', this.end);
    this.element.removeEventListener('mouseup', this.end);
  },
  wheelDelta(evt) {
    if (evt.deltaY >= 0) {
      if (this.zoomIn) {
        this.zoomIn({
          evt,
          zoom: (evt.deltaY / 100).toFixed(1),
        });
      }
    } else {
      if (this.zoomOut) {
        this.zoomOut({
          evt,
          zoom: -(evt.deltaY / 100).toFixed(1),
        });
      }
    }
  },
};

export default DZQMouse;
