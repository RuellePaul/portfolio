export function clamp(value: number, min: number, max: number) {
    return Math.min(max, Math.max(min, value));
}

export function interpolate(a: number, b: number, p: number) {
    return a + (b - a) * p;
}

export function relativeProgress(progress: number, start: number, end: number) {
    return clamp((progress - start) / (end - start), 0, 1);
}

export const easing = {
    linear: function (t: number, b = 0, _c = 1, d = 1) {
        let c = _c - b;
        return (c * t) / d + b;
    },
    inQuad: function (t: number, b = 0, _c = 1, d = 1) {
        let c = _c - b;
        return c * (t /= d) * t + b;
    },
    outQuad: function (t: number, b = 0, _c = 1, d = 1) {
        let c = _c - b;
        return -c * (t /= d) * (t - 2) + b;
    },
    inOutQuad: function (t: number, b = 0, _c = 1, d = 1) {
        let c = _c - b;
        if ((t /= d / 2) < 1) {
            return (c / 2) * t * t + b;
        } else {
            return (-c / 2) * (--t * (t - 2) - 1) + b;
        }
    },
    inCubic: function (t: number, b = 0, _c = 1, d = 1) {
        let c = _c - b;
        return c * (t /= d) * t * t + b;
    },
    outCubic: function (t: number, b = 0, _c = 1, d = 1) {
        let c = _c - b;
        return c * ((t = t / d - 1) * t * t + 1) + b;
    },
    inOutCubic: function (t: number, b = 0, _c = 1, d = 1) {
        let c = _c - b;
        if ((t /= d / 2) < 1) {
            return (c / 2) * t * t * t + b;
        } else {
            return (c / 2) * ((t -= 2) * t * t + 2) + b;
        }
    },
    inQuart: function (t: number, b = 0, _c = 1, d = 1) {
        let c = _c - b;
        return c * (t /= d) * t * t * t + b;
    },
    outQuart: function (t: number, b = 0, _c = 1, d = 1) {
        let c = _c - b;
        return -c * ((t = t / d - 1) * t * t * t - 1) + b;
    },
    inOutQuart: function (t: number, b = 0, _c = 1, d = 1) {
        let c = _c - b;
        if ((t /= d / 2) < 1) {
            return (c / 2) * t * t * t * t + b;
        } else {
            return (-c / 2) * ((t -= 2) * t * t * t - 2) + b;
        }
    },
    inQuint: function (t: number, b = 0, _c = 1, d = 1) {
        let c = _c - b;
        return c * (t /= d) * t * t * t * t + b;
    },
    outQuint: function (t: number, b = 0, _c = 1, d = 1) {
        let c = _c - b;
        return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
    },
    inOutQuint: function (t: number, b = 0, _c = 1, d = 1) {
        let c = _c - b;
        if ((t /= d / 2) < 1) {
            return (c / 2) * t * t * t * t * t + b;
        } else {
            return (c / 2) * ((t -= 2) * t * t * t * t + 2) + b;
        }
    },
    inSine: function (t: number, b = 0, _c = 1, d = 1) {
        let c = _c - b;
        return -c * Math.cos((t / d) * (Math.PI / 2)) + c + b;
    },
    outSine: function (t: number, b = 0, _c = 1, d = 1) {
        let c = _c - b;
        return c * Math.sin((t / d) * (Math.PI / 2)) + b;
    },
    inOutSine: function (t: number, b = 0, _c = 1, d = 1) {
        let c = _c - b;
        return (-c / 2) * (Math.cos((Math.PI * t) / d) - 1) + b;
    },
    inExpo: function (t: number, b = 0, _c = 1, d = 1) {
        let c = _c - b;
        return t === 0 ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
    },
    outExpo: function (t: number, b = 0, _c = 1, d = 1) {
        let c = _c - b;
        return t === d ? b + c : c * (-Math.pow(2, (-10 * t) / d) + 1) + b;
    },
    inOutExpo: function (t: number, b = 0, _c = 1, d = 1) {
        let c = _c - b;
        if (t === 0) {
            return b;
        }
        if (t === d) {
            return b + c;
        }
        if ((t /= d / 2) < 1) {
            return (c / 2) * Math.pow(2, 10 * (t - 1)) + b;
        } else {
            return (c / 2) * (-Math.pow(2, -10 * --t) + 2) + b;
        }
    },
    inCirc: function (t: number, b = 0, _c = 1, d = 1) {
        let c = _c - b;
        return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
    },
    outCirc: function (t: number, b = 0, _c = 1, d = 1) {
        let c = _c - b;
        return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
    },
    inOutCirc: function (t: number, b = 0, _c = 1, d = 1) {
        let c = _c - b;
        if ((t /= d / 2) < 1) {
            return (-c / 2) * (Math.sqrt(1 - t * t) - 1) + b;
        } else {
            return (c / 2) * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
        }
    },
    inElastic: function (t: number, b = 0, _c = 1, d = 1) {
        let c = _c - b;
        let a, p, s;
        s = 1.70158;
        p = 0;
        a = c;
        if (t === 0) {
            return b;
        } else if ((t /= d) === 1) {
            return b + c;
        }
        if (!p) {
            p = d * 0.3;
        }
        if (a < Math.abs(c)) {
            a = c;
            s = p / 4;
        } else {
            s = (p / (2 * Math.PI)) * Math.asin(c / a);
        }
        return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin(((t * d - s) * (2 * Math.PI)) / p)) + b;
    },
    outElastic: function (t: number, b = 0, _c = 1, d = 1) {
        let c = _c - b;
        let a, p, s;
        s = 1.70158;
        p = 0;
        a = c;
        if (t === 0) {
            return b;
        } else if ((t /= d) === 1) {
            return b + c;
        }
        if (!p) {
            p = d * 0.3;
        }
        if (a < Math.abs(c)) {
            a = c;
            s = p / 4;
        } else {
            s = (p / (2 * Math.PI)) * Math.asin(c / a);
        }
        return a * Math.pow(2, -10 * t) * Math.sin(((t * d - s) * (2 * Math.PI)) / p) + c + b;
    },
    inOutElastic: function (t: number, b = 0, _c = 1, d = 1) {
        let c = _c - b;
        let a, p, s;
        s = 1.70158;
        p = 0;
        a = c;
        if (t === 0) {
            return b;
        } else if ((t /= d / 2) === 2) {
            return b + c;
        }
        if (!p) {
            p = d * (0.3 * 1.5);
        }
        if (a < Math.abs(c)) {
            a = c;
            s = p / 4;
        } else {
            s = (p / (2 * Math.PI)) * Math.asin(c / a);
        }
        if (t < 1) {
            return -0.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin(((t * d - s) * (2 * Math.PI)) / p)) + b;
        } else {
            return a * Math.pow(2, -10 * (t -= 1)) * Math.sin(((t * d - s) * (2 * Math.PI)) / p) * 0.5 + c + b;
        }
    },
    inBounce: function (t: number, b = 0, _c = 1, d = 1) {
        let c = _c - b;
        let v;
        v = easing.outBounce(d - t, 0, c, d);
        return c - v + b;
    },
    outBounce: function (t: number, b = 0, _c = 1, d = 1) {
        let c = _c - b;
        if ((t /= d) < 1 / 2.75) {
            return c * (7.5625 * t * t) + b;
        } else if (t < 2 / 2.75) {
            return c * (7.5625 * (t -= 1.5 / 2.75) * t + 0.75) + b;
        } else if (t < 2.5 / 2.75) {
            return c * (7.5625 * (t -= 2.25 / 2.75) * t + 0.9375) + b;
        } else {
            return c * (7.5625 * (t -= 2.625 / 2.75) * t + 0.984375) + b;
        }
    },
    inOutBounce: function (t: number, b = 0, _c = 1, d = 1) {
        let c = _c - b;
        let v;
        if (t < d / 2) {
            v = easing.inBounce(t * 2, 0, c, d);
            return v * 0.5 + b;
        } else {
            v = easing.outBounce(t * 2 - d, 0, c, d);
            return v * 0.5 + c * 0.5 + b;
        }
    }
};
