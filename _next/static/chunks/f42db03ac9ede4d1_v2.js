(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([
  "object" == typeof document ? document.currentScript : void 0,
  57440,
  (t, e, i) => {
    "use strict";
    var s = function (t, e) {
        if (!(t instanceof e))
          throw TypeError("Cannot call a class as a function");
      },
      n = (function () {
        function t(e) {
          var i =
            arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
          if ((s(this, t), !(e instanceof Node)))
            throw (
              "Can't initialize VanillaTilt because " + e + " is not a Node."
            );
          (this.width = null),
            (this.height = null),
            (this.clientWidth = null),
            (this.clientHeight = null),
            (this.left = null),
            (this.top = null),
            (this.gammazero = null),
            (this.betazero = null),
            (this.lastgammazero = null),
            (this.lastbetazero = null),
            (this.transitionTimeout = null),
            (this.updateCall = null),
            (this.event = null),
            (this.updateBind = this.update.bind(this)),
            (this.resetBind = this.reset.bind(this)),
            (this.element = e),
            (this.settings = this.extendSettings(i)),
            (this.reverse = this.settings.reverse ? -1 : 1),
            (this.resetToStart = t.isSettingTrue(
              this.settings["reset-to-start"],
            )),
            (this.glare = t.isSettingTrue(this.settings.glare)),
            (this.glarePrerender = t.isSettingTrue(
              this.settings["glare-prerender"],
            )),
            (this.fullPageListening = t.isSettingTrue(
              this.settings["full-page-listening"],
            )),
            (this.gyroscope = t.isSettingTrue(this.settings.gyroscope)),
            (this.gyroscopeSamples = this.settings.gyroscopeSamples),
            (this.elementListener = this.getElementListener()),
            this.glare && this.prepareGlare(),
            this.fullPageListening && this.updateClientSize(),
            this.addEventListeners(),
            this.reset(),
            !1 === this.resetToStart &&
              ((this.settings.startX = 0), (this.settings.startY = 0));
        }
        return (
          (t.isSettingTrue = function (t) {
            return "" === t || !0 === t || 1 === t;
          }),
          (t.prototype.getElementListener = function () {
            if (this.fullPageListening) return window.document;
            if ("string" == typeof this.settings["mouse-event-element"]) {
              var t = document.querySelector(
                this.settings["mouse-event-element"],
              );
              if (t) return t;
            }
            return this.settings["mouse-event-element"] instanceof Node
              ? this.settings["mouse-event-element"]
              : this.element;
          }),
          (t.prototype.addEventListeners = function () {
            (this.onMouseEnterBind = this.onMouseEnter.bind(this)),
              (this.onMouseMoveBind = this.onMouseMove.bind(this)),
              (this.onMouseLeaveBind = this.onMouseLeave.bind(this)),
              (this.onWindowResizeBind = this.onWindowResize.bind(this)),
              (this.onDeviceOrientationBind =
                this.onDeviceOrientation.bind(this)),
              this.elementListener.addEventListener(
                "mouseenter",
                this.onMouseEnterBind,
              ),
              this.elementListener.addEventListener(
                "mouseleave",
                this.onMouseLeaveBind,
              ),
              this.elementListener.addEventListener(
                "mousemove",
                this.onMouseMoveBind,
              ),
              (this.glare || this.fullPageListening) &&
                window.addEventListener("resize", this.onWindowResizeBind),
              this.gyroscope &&
                window.addEventListener(
                  "deviceorientation",
                  this.onDeviceOrientationBind,
                );
          }),
          (t.prototype.removeEventListeners = function () {
            this.elementListener.removeEventListener(
              "mouseenter",
              this.onMouseEnterBind,
            ),
              this.elementListener.removeEventListener(
                "mouseleave",
                this.onMouseLeaveBind,
              ),
              this.elementListener.removeEventListener(
                "mousemove",
                this.onMouseMoveBind,
              ),
              this.gyroscope &&
                window.removeEventListener(
                  "deviceorientation",
                  this.onDeviceOrientationBind,
                ),
              (this.glare || this.fullPageListening) &&
                window.removeEventListener("resize", this.onWindowResizeBind);
          }),
          (t.prototype.destroy = function () {
            clearTimeout(this.transitionTimeout),
              null !== this.updateCall && cancelAnimationFrame(this.updateCall),
              (this.element.style.willChange = ""),
              (this.element.style.transition = ""),
              (this.element.style.transform = ""),
              this.resetGlare(),
              this.removeEventListeners(),
              (this.element.vanillaTilt = null),
              delete this.element.vanillaTilt,
              (this.element = null);
          }),
          (t.prototype.onDeviceOrientation = function (t) {
            if (null !== t.gamma && null !== t.beta) {
              this.updateElementPosition(),
                this.gyroscopeSamples > 0 &&
                  ((this.lastgammazero = this.gammazero),
                  (this.lastbetazero = this.betazero),
                  null === this.gammazero
                    ? ((this.gammazero = t.gamma), (this.betazero = t.beta))
                    : ((this.gammazero = (t.gamma + this.lastgammazero) / 2),
                      (this.betazero = (t.beta + this.lastbetazero) / 2)),
                  (this.gyroscopeSamples -= 1));
              var e =
                  this.settings.gyroscopeMaxAngleX -
                  this.settings.gyroscopeMinAngleX,
                i =
                  this.settings.gyroscopeMaxAngleY -
                  this.settings.gyroscopeMinAngleY,
                s = e / this.width,
                n = i / this.height,
                r =
                  t.gamma - (this.settings.gyroscopeMinAngleX + this.gammazero),
                a = t.beta - (this.settings.gyroscopeMinAngleY + this.betazero);
              null !== this.updateCall && cancelAnimationFrame(this.updateCall),
                (this.event = {
                  clientX: r / s + this.left,
                  clientY: a / n + this.top,
                }),
                (this.updateCall = requestAnimationFrame(this.updateBind));
            }
          }),
          (t.prototype.onMouseEnter = function () {
            this.updateElementPosition(),
              (this.element.style.willChange = "transform"),
              this.setTransition();
          }),
          (t.prototype.onMouseMove = function (t) {
            null !== this.updateCall && cancelAnimationFrame(this.updateCall),
              (this.event = t),
              (this.updateCall = requestAnimationFrame(this.updateBind));
          }),
          (t.prototype.onMouseLeave = function () {
            this.setTransition(),
              this.settings.reset && requestAnimationFrame(this.resetBind);
          }),
          (t.prototype.reset = function () {
            this.onMouseEnter(),
              this.fullPageListening
                ? (this.event = {
                    clientX:
                      ((this.settings.startX + this.settings.max) /
                        (2 * this.settings.max)) *
                      this.clientWidth,
                    clientY:
                      ((this.settings.startY + this.settings.max) /
                        (2 * this.settings.max)) *
                      this.clientHeight,
                  })
                : (this.event = {
                    clientX:
                      this.left +
                      ((this.settings.startX + this.settings.max) /
                        (2 * this.settings.max)) *
                        this.width,
                    clientY:
                      this.top +
                      ((this.settings.startY + this.settings.max) /
                        (2 * this.settings.max)) *
                        this.height,
                  });
            var t = this.settings.scale;
            (this.settings.scale = 1),
              this.update(),
              (this.settings.scale = t),
              this.resetGlare();
          }),
          (t.prototype.resetGlare = function () {
            this.glare &&
              ((this.glareElement.style.transform =
                "rotate(180deg) translate(-50%, -50%)"),
              (this.glareElement.style.opacity = "0"));
          }),
          (t.prototype.getValues = function () {
            var t = void 0,
              e = void 0;
            return (
              this.fullPageListening
                ? ((t = this.event.clientX / this.clientWidth),
                  (e = this.event.clientY / this.clientHeight))
                : ((t = (this.event.clientX - this.left) / this.width),
                  (e = (this.event.clientY - this.top) / this.height)),
              (t = Math.min(Math.max(t, 0), 1)),
              (e = Math.min(Math.max(e, 0), 1)),
              {
                tiltX: (
                  this.reverse *
                  (this.settings.max - t * this.settings.max * 2)
                ).toFixed(2),
                tiltY: (
                  this.reverse *
                  (e * this.settings.max * 2 - this.settings.max)
                ).toFixed(2),
                percentageX: 100 * t,
                percentageY: 100 * e,
                angle:
                  Math.atan2(
                    this.event.clientX - (this.left + this.width / 2),
                    -(this.event.clientY - (this.top + this.height / 2)),
                  ) *
                  (180 / Math.PI),
              }
            );
          }),
          (t.prototype.updateElementPosition = function () {
            var t = this.element.getBoundingClientRect();
            (this.width = this.element.offsetWidth),
              (this.height = this.element.offsetHeight),
              (this.left = t.left),
              (this.top = t.top);
          }),
          (t.prototype.update = function () {
            var t = this.getValues();
            (this.element.style.transform =
              "perspective(" +
              this.settings.perspective +
              "px) rotateX(" +
              ("x" === this.settings.axis ? 0 : t.tiltY) +
              "deg) rotateY(" +
              ("y" === this.settings.axis ? 0 : t.tiltX) +
              "deg) scale3d(" +
              this.settings.scale +
              ", " +
              this.settings.scale +
              ", " +
              this.settings.scale +
              ")"),
              this.glare &&
                ((this.glareElement.style.transform =
                  "rotate(" + t.angle + "deg) translate(-50%, -50%)"),
                (this.glareElement.style.opacity =
                  "" + (t.percentageY * this.settings["max-glare"]) / 100)),
              this.element.dispatchEvent(
                new CustomEvent("tiltChange", { detail: t }),
              ),
              (this.updateCall = null);
          }),
          (t.prototype.prepareGlare = function () {
            if (!this.glarePrerender) {
              var t = document.createElement("div");
              t.classList.add("js-tilt-glare");
              var e = document.createElement("div");
              e.classList.add("js-tilt-glare-inner"),
                t.appendChild(e),
                this.element.appendChild(t);
            }
            (this.glareElementWrapper =
              this.element.querySelector(".js-tilt-glare")),
              (this.glareElement = this.element.querySelector(
                ".js-tilt-glare-inner",
              )),
              this.glarePrerender ||
                (Object.assign(this.glareElementWrapper.style, {
                  position: "absolute",
                  top: "0",
                  left: "0",
                  width: "100%",
                  height: "100%",
                  overflow: "hidden",
                  "pointer-events": "none",
                  "border-radius": "inherit",
                }),
                Object.assign(this.glareElement.style, {
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  "pointer-events": "none",
                  "background-image":
                    "linear-gradient(0deg, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 100%)",
                  transform: "rotate(180deg) translate(-50%, -50%)",
                  "transform-origin": "0% 0%",
                  opacity: "0",
                }),
                this.updateGlareSize());
          }),
          (t.prototype.updateGlareSize = function () {
            if (this.glare) {
              var t =
                (this.element.offsetWidth > this.element.offsetHeight
                  ? this.element.offsetWidth
                  : this.element.offsetHeight) * 2;
              Object.assign(this.glareElement.style, {
                width: t + "px",
                height: t + "px",
              });
            }
          }),
          (t.prototype.updateClientSize = function () {
            (this.clientWidth =
              window.innerWidth ||
              document.documentElement.clientWidth ||
              document.body.clientWidth),
              (this.clientHeight =
                window.innerHeight ||
                document.documentElement.clientHeight ||
                document.body.clientHeight);
          }),
          (t.prototype.onWindowResize = function () {
            this.updateGlareSize(), this.updateClientSize();
          }),
          (t.prototype.setTransition = function () {
            var t = this;
            clearTimeout(this.transitionTimeout),
              (this.element.style.transition =
                this.settings.speed + "ms " + this.settings.easing),
              this.glare &&
                (this.glareElement.style.transition =
                  "opacity " +
                  this.settings.speed +
                  "ms " +
                  this.settings.easing),
              (this.transitionTimeout = setTimeout(function () {
                (t.element.style.transition = ""),
                  t.glare && (t.glareElement.style.transition = "");
              }, this.settings.speed));
          }),
          (t.prototype.extendSettings = function (t) {
            var e = {
                reverse: !1,
                max: 15,
                startX: 0,
                startY: 0,
                perspective: 1e3,
                easing: "cubic-bezier(.03,.98,.52,.99)",
                scale: 1,
                speed: 300,
                transition: !0,
                axis: null,
                glare: !1,
                "max-glare": 1,
                "glare-prerender": !1,
                "full-page-listening": !1,
                "mouse-event-element": null,
                reset: !0,
                "reset-to-start": !0,
                gyroscope: !0,
                gyroscopeMinAngleX: -45,
                gyroscopeMaxAngleX: 45,
                gyroscopeMinAngleY: -45,
                gyroscopeMaxAngleY: 45,
                gyroscopeSamples: 10,
              },
              i = {};
            for (var s in e)
              if (s in t) i[s] = t[s];
              else if (this.element.hasAttribute("data-tilt-" + s)) {
                var n = this.element.getAttribute("data-tilt-" + s);
                try {
                  i[s] = JSON.parse(n);
                } catch (t) {
                  i[s] = n;
                }
              } else i[s] = e[s];
            return i;
          }),
          (t.init = function (e, i) {
            e instanceof Node && (e = [e]),
              e instanceof NodeList && (e = [].slice.call(e)),
              e instanceof Array &&
                e.forEach(function (e) {
                  "vanillaTilt" in e || (e.vanillaTilt = new t(e, i));
                });
          }),
          t
        );
      })();
    "u" > typeof document &&
      ((window.VanillaTilt = n),
      n.init(document.querySelectorAll("[data-tilt]"))),
      (e.exports = n);
  },
  52683,
  (t) => {
    "use strict";
    let e, i, s, n, r;
    var a,
      o = t.i(43476),
      l = t.i(71645);
    let h = [
        "transformPerspective",
        "x",
        "y",
        "z",
        "translateX",
        "translateY",
        "translateZ",
        "scale",
        "scaleX",
        "scaleY",
        "rotate",
        "rotateX",
        "rotateY",
        "rotateZ",
        "skew",
        "skewX",
        "skewY",
      ],
      u = new Set(h),
      d = (t, e, i) => (i > e ? e : i < t ? t : i),
      c = {
        test: (t) => "number" == typeof t,
        parse: parseFloat,
        transform: (t) => t,
      },
      p = { ...c, transform: (t) => d(0, 1, t) },
      m = { ...c, default: 1 },
      f = (t) => Math.round(1e5 * t) / 1e5,
      g = /-?(?:\d+(?:\.\d+)?|\.\d+)/gu,
      y =
        /^(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))$/iu,
      v = (t, e) => (i) =>
        !!(
          ("string" == typeof i && y.test(i) && i.startsWith(t)) ||
          (e && null != i && Object.prototype.hasOwnProperty.call(i, e))
        ),
      x = (t, e, i) => (s) => {
        if ("string" != typeof s) return s;
        let [n, r, a, o] = s.match(g);
        return {
          [t]: parseFloat(n),
          [e]: parseFloat(r),
          [i]: parseFloat(a),
          alpha: void 0 !== o ? parseFloat(o) : 1,
        };
      },
      b = { ...c, transform: (t) => Math.round(d(0, 255, t)) },
      w = {
        test: v("rgb", "red"),
        parse: x("red", "green", "blue"),
        transform: ({ red: t, green: e, blue: i, alpha: s = 1 }) =>
          "rgba(" +
          b.transform(t) +
          ", " +
          b.transform(e) +
          ", " +
          b.transform(i) +
          ", " +
          f(p.transform(s)) +
          ")",
      },
      T = {
        test: v("#"),
        parse: function (t) {
          let e = "",
            i = "",
            s = "",
            n = "";
          return (
            t.length > 5
              ? ((e = t.substring(1, 3)),
                (i = t.substring(3, 5)),
                (s = t.substring(5, 7)),
                (n = t.substring(7, 9)))
              : ((e = t.substring(1, 2)),
                (i = t.substring(2, 3)),
                (s = t.substring(3, 4)),
                (n = t.substring(4, 5)),
                (e += e),
                (i += i),
                (s += s),
                (n += n)),
            {
              red: parseInt(e, 16),
              green: parseInt(i, 16),
              blue: parseInt(s, 16),
              alpha: n ? parseInt(n, 16) / 255 : 1,
            }
          );
        },
        transform: w.transform,
      },
      S = (t) => ({
        test: (e) =>
          "string" == typeof e && e.endsWith(t) && 1 === e.split(" ").length,
        parse: parseFloat,
        transform: (e) => `${e}${t}`,
      }),
      P = S("deg"),
      E = S("%"),
      A = S("px"),
      M = S("vh"),
      C = S("vw"),
      k = {
        ...E,
        parse: (t) => E.parse(t) / 100,
        transform: (t) => E.transform(100 * t),
      },
      V = {
        test: v("hsl", "hue"),
        parse: x("hue", "saturation", "lightness"),
        transform: ({ hue: t, saturation: e, lightness: i, alpha: s = 1 }) =>
          "hsla(" +
          Math.round(t) +
          ", " +
          E.transform(f(e)) +
          ", " +
          E.transform(f(i)) +
          ", " +
          f(p.transform(s)) +
          ")",
      },
      j = {
        test: (t) => w.test(t) || T.test(t) || V.test(t),
        parse: (t) =>
          w.test(t) ? w.parse(t) : V.test(t) ? V.parse(t) : T.parse(t),
        transform: (t) =>
          "string" == typeof t
            ? t
            : t.hasOwnProperty("red")
              ? w.transform(t)
              : V.transform(t),
        getAnimatableNone: (t) => {
          let e = j.parse(t);
          return (e.alpha = 0), j.transform(e);
        },
      },
      R =
        /(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))/giu,
      L = "number",
      D = "color",
      B =
        /var\s*\(\s*--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)|#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\)|-?(?:\d+(?:\.\d+)?|\.\d+)/giu;
    function F(t) {
      let e = t.toString(),
        i = [],
        s = { color: [], number: [], var: [] },
        n = [],
        r = 0,
        a = e
          .replace(
            B,
            (t) => (
              j.test(t)
                ? (s.color.push(r), n.push(D), i.push(j.parse(t)))
                : t.startsWith("var(")
                  ? (s.var.push(r), n.push("var"), i.push(t))
                  : (s.number.push(r), n.push(L), i.push(parseFloat(t))),
              ++r,
              "${}"
            ),
          )
          .split("${}");
      return { values: i, split: a, indexes: s, types: n };
    }
    function N(t) {
      return F(t).values;
    }
    function I(t) {
      let { split: e, types: i } = F(t),
        s = e.length;
      return (t) => {
        let n = "";
        for (let r = 0; r < s; r++)
          if (((n += e[r]), void 0 !== t[r])) {
            let e = i[r];
            e === L
              ? (n += f(t[r]))
              : e === D
                ? (n += j.transform(t[r]))
                : (n += t[r]);
          }
        return n;
      };
    }
    let O = (t) =>
        "number" == typeof t ? 0 : j.test(t) ? j.getAnimatableNone(t) : t,
      W = {
        test: function (t) {
          return (
            isNaN(t) &&
            "string" == typeof t &&
            (t.match(g)?.length || 0) + (t.match(R)?.length || 0) > 0
          );
        },
        parse: N,
        createTransformer: I,
        getAnimatableNone: function (t) {
          let e = N(t);
          return I(t)(e.map(O));
        },
      },
      z = new Set(["brightness", "contrast", "saturate", "opacity"]);
    function U(t) {
      let [e, i] = t.slice(0, -1).split("(");
      if ("drop-shadow" === e) return t;
      let [s] = i.match(g) || [];
      if (!s) return t;
      let n = i.replace(s, ""),
        r = +!!z.has(e);
      return s !== i && (r *= 100), e + "(" + r + n + ")";
    }
    let $ = /\b([a-z-]*)\(.*?\)/gu,
      Y = {
        ...W,
        getAnimatableNone: (t) => {
          let e = t.match($);
          return e ? e.map(U).join(" ") : t;
        },
      },
      X = { ...c, transform: Math.round },
      H = {
        borderWidth: A,
        borderTopWidth: A,
        borderRightWidth: A,
        borderBottomWidth: A,
        borderLeftWidth: A,
        borderRadius: A,
        borderTopLeftRadius: A,
        borderTopRightRadius: A,
        borderBottomRightRadius: A,
        borderBottomLeftRadius: A,
        width: A,
        maxWidth: A,
        height: A,
        maxHeight: A,
        top: A,
        right: A,
        bottom: A,
        left: A,
        inset: A,
        insetBlock: A,
        insetBlockStart: A,
        insetBlockEnd: A,
        insetInline: A,
        insetInlineStart: A,
        insetInlineEnd: A,
        padding: A,
        paddingTop: A,
        paddingRight: A,
        paddingBottom: A,
        paddingLeft: A,
        paddingBlock: A,
        paddingBlockStart: A,
        paddingBlockEnd: A,
        paddingInline: A,
        paddingInlineStart: A,
        paddingInlineEnd: A,
        margin: A,
        marginTop: A,
        marginRight: A,
        marginBottom: A,
        marginLeft: A,
        marginBlock: A,
        marginBlockStart: A,
        marginBlockEnd: A,
        marginInline: A,
        marginInlineStart: A,
        marginInlineEnd: A,
        fontSize: A,
        backgroundPositionX: A,
        backgroundPositionY: A,
        rotate: P,
        rotateX: P,
        rotateY: P,
        rotateZ: P,
        scale: m,
        scaleX: m,
        scaleY: m,
        scaleZ: m,
        skew: P,
        skewX: P,
        skewY: P,
        distance: A,
        translateX: A,
        translateY: A,
        translateZ: A,
        x: A,
        y: A,
        z: A,
        perspective: A,
        transformPerspective: A,
        opacity: p,
        originX: k,
        originY: k,
        originZ: A,
        zIndex: X,
        fillOpacity: p,
        strokeOpacity: p,
        numOctaves: X,
      },
      G = {
        ...H,
        color: j,
        backgroundColor: j,
        outlineColor: j,
        fill: j,
        stroke: j,
        borderColor: j,
        borderTopColor: j,
        borderRightColor: j,
        borderBottomColor: j,
        borderLeftColor: j,
        filter: Y,
        WebkitFilter: Y,
      },
      q = (t) => G[t],
      _ = () => ({ translate: 0, scale: 1, origin: 0, originPoint: 0 }),
      K = () => ({ x: _(), y: _() }),
      Z = () => ({ min: 0, max: 0 }),
      J = () => ({ x: Z(), y: Z() }),
      Q = (t) => !!(t && t.getVelocity),
      tt = new Set(["width", "height", "top", "left", "right", "bottom", ...h]),
      te = (t) => (e) => e.test(t),
      ti = [c, A, E, P, C, M, { test: (t) => "auto" === t, parse: (t) => t }],
      ts = (t) => ti.find(te(t));
    var tn = t.i(47167);
    let tr = () => {},
      ta = () => {};
    tn.default;
    let to = (t) => (e) => "string" == typeof e && e.startsWith(t),
      tl = to("--"),
      th = to("var(--"),
      tu = (t) => !!th(t) && td.test(t.split("/*")[0].trim()),
      td =
        /var\(--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)$/iu;
    function tc(t) {
      return "string" == typeof t && t.split("/*")[0].includes("var(--");
    }
    let tp = /^var\(--(?:([\w-]+)|([\w-]+), ?([a-zA-Z\d ()%#.,-]+))\)/u,
      tm = (t) => (180 * t) / Math.PI,
      tf = (t) => ty(tm(Math.atan2(t[1], t[0]))),
      tg = {
        x: 4,
        y: 5,
        translateX: 4,
        translateY: 5,
        scaleX: 0,
        scaleY: 3,
        scale: (t) => (Math.abs(t[0]) + Math.abs(t[3])) / 2,
        rotate: tf,
        rotateZ: tf,
        skewX: (t) => tm(Math.atan(t[1])),
        skewY: (t) => tm(Math.atan(t[2])),
        skew: (t) => (Math.abs(t[1]) + Math.abs(t[2])) / 2,
      },
      ty = (t) => ((t %= 360) < 0 && (t += 360), t),
      tv = (t) => Math.sqrt(t[0] * t[0] + t[1] * t[1]),
      tx = (t) => Math.sqrt(t[4] * t[4] + t[5] * t[5]),
      tb = {
        x: 12,
        y: 13,
        z: 14,
        translateX: 12,
        translateY: 13,
        translateZ: 14,
        scaleX: tv,
        scaleY: tx,
        scale: (t) => (tv(t) + tx(t)) / 2,
        rotateX: (t) => ty(tm(Math.atan2(t[6], t[5]))),
        rotateY: (t) => ty(tm(Math.atan2(-t[2], t[0]))),
        rotateZ: tf,
        rotate: tf,
        skewX: (t) => tm(Math.atan(t[4])),
        skewY: (t) => tm(Math.atan(t[1])),
        skew: (t) => (Math.abs(t[1]) + Math.abs(t[4])) / 2,
      };
    function tw(t) {
      return +!!t.includes("scale");
    }
    function tT(t, e) {
      let i, s;
      if (!t || "none" === t) return tw(e);
      let n = t.match(/^matrix3d\(([-\d.e\s,]+)\)$/u);
      if (n) (i = tb), (s = n);
      else {
        let e = t.match(/^matrix\(([-\d.e\s,]+)\)$/u);
        (i = tg), (s = e);
      }
      if (!s) return tw(e);
      let r = i[e],
        a = s[1].split(",").map(tS);
      return "function" == typeof r ? r(a) : a[r];
    }
    function tS(t) {
      return parseFloat(t.trim());
    }
    let tP = (t) => t === c || t === A,
      tE = new Set(["x", "y", "z"]),
      tA = h.filter((t) => !tE.has(t)),
      tM = {
        width: ({ x: t }, { paddingLeft: e = "0", paddingRight: i = "0" }) =>
          t.max - t.min - parseFloat(e) - parseFloat(i),
        height: ({ y: t }, { paddingTop: e = "0", paddingBottom: i = "0" }) =>
          t.max - t.min - parseFloat(e) - parseFloat(i),
        top: (t, { top: e }) => parseFloat(e),
        left: (t, { left: e }) => parseFloat(e),
        bottom: ({ y: t }, { top: e }) => parseFloat(e) + (t.max - t.min),
        right: ({ x: t }, { left: e }) => parseFloat(e) + (t.max - t.min),
        x: (t, { transform: e }) => tT(e, "x"),
        y: (t, { transform: e }) => tT(e, "y"),
      };
    (tM.translateX = tM.x), (tM.translateY = tM.y);
    let tC = (t) => t,
      tk = {},
      tV = [
        "setup",
        "read",
        "resolveKeyframes",
        "preUpdate",
        "update",
        "preRender",
        "render",
        "postRender",
      ];
    function tj(t, e) {
      let i = !1,
        s = !0,
        n = { delta: 0, timestamp: 0, isProcessing: !1 },
        r = () => (i = !0),
        a = tV.reduce(
          (t, i) => (
            (t[i] = (function (t, e) {
              let i = new Set(),
                s = new Set(),
                n = !1,
                r = !1,
                a = new WeakSet(),
                o = { delta: 0, timestamp: 0, isProcessing: !1 },
                l = 0;
              function h(e) {
                a.has(e) && (u.schedule(e), t()), l++, e(o);
              }
              let u = {
                schedule: (t, e = !1, r = !1) => {
                  let o = r && n ? i : s;
                  return e && a.add(t), o.has(t) || o.add(t), t;
                },
                cancel: (t) => {
                  s.delete(t), a.delete(t);
                },
                process: (t) => {
                  if (((o = t), n)) {
                    r = !0;
                    return;
                  }
                  (n = !0),
                    ([i, s] = [s, i]),
                    i.forEach(h),
                    e,
                    (l = 0),
                    i.clear(),
                    (n = !1),
                    r && ((r = !1), u.process(t));
                },
              };
              return u;
            })(r, e ? i : void 0)),
            t
          ),
          {},
        ),
        {
          setup: o,
          read: l,
          resolveKeyframes: h,
          preUpdate: u,
          update: d,
          preRender: c,
          render: p,
          postRender: m,
        } = a,
        f = () => {
          let r = tk.useManualTiming ? n.timestamp : performance.now();
          (i = !1),
            tk.useManualTiming ||
              (n.delta = s
                ? 1e3 / 60
                : Math.max(Math.min(r - n.timestamp, 40), 1)),
            (n.timestamp = r),
            (n.isProcessing = !0),
            o.process(n),
            l.process(n),
            h.process(n),
            u.process(n),
            d.process(n),
            c.process(n),
            p.process(n),
            m.process(n),
            (n.isProcessing = !1),
            i && e && ((s = !1), t(f));
        };
      return {
        schedule: tV.reduce((e, r) => {
          let o = a[r];
          return (
            (e[r] = (e, r = !1, a = !1) => (
              !i && ((i = !0), (s = !0), n.isProcessing || t(f)),
              o.schedule(e, r, a)
            )),
            e
          );
        }, {}),
        cancel: (t) => {
          for (let e = 0; e < tV.length; e++) a[tV[e]].cancel(t);
        },
        state: n,
        steps: a,
      };
    }
    let {
        schedule: tR,
        cancel: tL,
        state: tD,
        steps: tB,
      } = tj(
        "u" > typeof requestAnimationFrame ? requestAnimationFrame : tC,
        !0,
      ),
      tF = new Set(),
      tN = !1,
      tI = !1,
      tO = !1;
    function tW() {
      if (tI) {
        let t = Array.from(tF).filter((t) => t.needsMeasurement),
          e = new Set(t.map((t) => t.element)),
          i = new Map();
        e.forEach((t) => {
          let e,
            s =
              ((e = []),
              tA.forEach((i) => {
                let s = t.getValue(i);
                void 0 !== s &&
                  (e.push([i, s.get()]), s.set(+!!i.startsWith("scale")));
              }),
              e);
          s.length && (i.set(t, s), t.render());
        }),
          t.forEach((t) => t.measureInitialState()),
          e.forEach((t) => {
            t.render();
            let e = i.get(t);
            e &&
              e.forEach(([e, i]) => {
                t.getValue(e)?.set(i);
              });
          }),
          t.forEach((t) => t.measureEndState()),
          t.forEach((t) => {
            void 0 !== t.suspendedScrollY &&
              window.scrollTo(0, t.suspendedScrollY);
          });
      }
      (tI = !1), (tN = !1), tF.forEach((t) => t.complete(tO)), tF.clear();
    }
    function tz() {
      tF.forEach((t) => {
        t.readKeyframes(), t.needsMeasurement && (tI = !0);
      });
    }
    class tU {
      constructor(t, e, i, s, n, r = !1) {
        (this.state = "pending"),
          (this.isAsync = !1),
          (this.needsMeasurement = !1),
          (this.unresolvedKeyframes = [...t]),
          (this.onComplete = e),
          (this.name = i),
          (this.motionValue = s),
          (this.element = n),
          (this.isAsync = r);
      }
      scheduleResolve() {
        (this.state = "scheduled"),
          this.isAsync
            ? (tF.add(this),
              tN || ((tN = !0), tR.read(tz), tR.resolveKeyframes(tW)))
            : (this.readKeyframes(), this.complete());
      }
      readKeyframes() {
        let {
          unresolvedKeyframes: t,
          name: e,
          element: i,
          motionValue: s,
        } = this;
        if (null === t[0]) {
          let n = s?.get(),
            r = t[t.length - 1];
          if (void 0 !== n) t[0] = n;
          else if (i && e) {
            let s = i.readValue(e, r);
            null != s && (t[0] = s);
          }
          void 0 === t[0] && (t[0] = r), s && void 0 === n && s.set(t[0]);
        }
        for (let e = 1; e < t.length; e++) t[e] ?? (t[e] = t[e - 1]);
      }
      setFinalKeyframe() {}
      measureInitialState() {}
      renderEndStyles() {}
      measureEndState() {}
      complete(t = !1) {
        (this.state = "complete"),
          this.onComplete(this.unresolvedKeyframes, this.finalKeyframe, t),
          tF.delete(this);
      }
      cancel() {
        "scheduled" === this.state &&
          (tF.delete(this), (this.state = "pending"));
      }
      resume() {
        "pending" === this.state && this.scheduleResolve();
      }
    }
    function t$(t, e) {
      let i = q(t);
      return (
        i !== Y && (i = W),
        i.getAnimatableNone ? i.getAnimatableNone(e) : void 0
      );
    }
    let tY = new Set(["auto", "none", "0"]);
    class tX extends tU {
      constructor(t, e, i, s, n) {
        super(t, e, i, s, n, !0);
      }
      readKeyframes() {
        let { unresolvedKeyframes: t, element: e, name: i } = this;
        if (!e || !e.current) return;
        super.readKeyframes();
        for (let i = 0; i < t.length; i++) {
          let s = t[i];
          if ("string" == typeof s && tu((s = s.trim()))) {
            let n = (function t(e, i, s = 1) {
              ta(
                s <= 4,
                `Max CSS variable fallback depth detected in property "${e}". This may indicate a circular fallback dependency.`,
                "max-css-var-depth",
              );
              let [n, r] = (function (t) {
                let e = tp.exec(t);
                if (!e) return [,];
                let [, i, s, n] = e;
                return [`--${i ?? s}`, n];
              })(e);
              if (!n) return;
              let a = window.getComputedStyle(i).getPropertyValue(n);
              if (a) {
                let t = a.trim();
                return /^-?(?:\d+(?:\.\d+)?|\.\d+)$/u.test(t)
                  ? parseFloat(t)
                  : t;
              }
              return tu(r) ? t(r, i, s + 1) : r;
            })(s, e.current);
            void 0 !== n && (t[i] = n),
              i === t.length - 1 && (this.finalKeyframe = s);
          }
        }
        if ((this.resolveNoneKeyframes(), !tt.has(i) || 2 !== t.length)) return;
        let [s, n] = t,
          r = ts(s),
          a = ts(n);
        if (tc(s) !== tc(n) && tM[i]) {
          this.needsMeasurement = !0;
          return;
        }
        if (r !== a)
          if (tP(r) && tP(a))
            for (let e = 0; e < t.length; e++) {
              let i = t[e];
              "string" == typeof i && (t[e] = parseFloat(i));
            }
          else tM[i] && (this.needsMeasurement = !0);
      }
      resolveNoneKeyframes() {
        let { unresolvedKeyframes: t, name: e } = this,
          i = [];
        for (let e = 0; e < t.length; e++)
          (null === t[e] ||
            (function (t) {
              if ("number" == typeof t) return 0 === t;
              if (null === t) return !0;
              return "none" === t || "0" === t || /^0[^.\s]+$/u.test(t);
            })(t[e])) &&
            i.push(e);
        i.length &&
          (function (t, e, i) {
            let s,
              n = 0;
            for (; n < t.length && !s; ) {
              let e = t[n];
              "string" == typeof e &&
                !tY.has(e) &&
                F(e).values.length &&
                (s = t[n]),
                n++;
            }
            if (s && i) for (let n of e) t[n] = t$(i, s);
          })(t, i, e);
      }
      measureInitialState() {
        let { element: t, unresolvedKeyframes: e, name: i } = this;
        if (!t || !t.current) return;
        "height" === i && (this.suspendedScrollY = window.pageYOffset),
          (this.measuredOrigin = tM[i](
            t.measureViewportBox(),
            window.getComputedStyle(t.current),
          )),
          (e[0] = this.measuredOrigin);
        let s = e[e.length - 1];
        void 0 !== s && t.getValue(i, s).jump(s, !1);
      }
      measureEndState() {
        let { element: t, name: e, unresolvedKeyframes: i } = this;
        if (!t || !t.current) return;
        let s = t.getValue(e);
        s && s.jump(this.measuredOrigin, !1);
        let n = i.length - 1,
          r = i[n];
        (i[n] = tM[e](
          t.measureViewportBox(),
          window.getComputedStyle(t.current),
        )),
          null !== r &&
            void 0 === this.finalKeyframe &&
            (this.finalKeyframe = r),
          this.removedTransforms?.length &&
            this.removedTransforms.forEach(([e, i]) => {
              t.getValue(e).set(i);
            }),
          this.resolveNoneKeyframes();
      }
    }
    let tH = (t) => 1e3 * t;
    function tG(t, e) {
      -1 === t.indexOf(e) && t.push(e);
    }
    function tq(t, e) {
      let i = t.indexOf(e);
      i > -1 && t.splice(i, 1);
    }
    class t_ {
      constructor() {
        this.subscriptions = [];
      }
      add(t) {
        return tG(this.subscriptions, t), () => tq(this.subscriptions, t);
      }
      notify(t, e, i) {
        let s = this.subscriptions.length;
        if (s)
          if (1 === s) this.subscriptions[0](t, e, i);
          else
            for (let n = 0; n < s; n++) {
              let s = this.subscriptions[n];
              s && s(t, e, i);
            }
      }
      getSize() {
        return this.subscriptions.length;
      }
      clear() {
        this.subscriptions.length = 0;
      }
    }
    function tK(t) {
      let e;
      return () => (void 0 === e && (e = t()), e);
    }
    let tZ = tK(() => void 0 !== window.ScrollTimeline),
      tJ = (t) => null !== t;
    function tQ(t, { repeat: e, repeatType: i = "loop" }, s, n = 1) {
      let r = t.filter(tJ),
        a = n < 0 || (e && "loop" !== i && e % 2 == 1) ? 0 : r.length - 1;
      return a && void 0 !== s ? s : r[a];
    }
    class t0 {
      constructor() {
        this.updateFinished();
      }
      get finished() {
        return this._finished;
      }
      updateFinished() {
        this._finished = new Promise((t) => {
          this.resolve = t;
        });
      }
      notifyFinished() {
        this.resolve();
      }
      then(t, e) {
        return this.finished.then(t, e);
      }
    }
    let t1 = { layout: 0, mainThread: 0, waapi: 0 },
      t5 = (t) => Array.isArray(t) && "number" == typeof t[0],
      t2 = {},
      t3 =
        ((n = tK(() => {
          try {
            document
              .createElement("div")
              .animate({ opacity: 0 }, { easing: "linear(0, 1)" });
          } catch (t) {
            return !1;
          }
          return !0;
        })),
        () => t2.linearEasing ?? n()),
      t4 = (t, e, i = 10) => {
        let s = "",
          n = Math.max(Math.round(e / i), 2);
        for (let e = 0; e < n; e++)
          s += Math.round(1e4 * t(e / (n - 1))) / 1e4 + ", ";
        return `linear(${s.substring(0, s.length - 2)})`;
      },
      t9 = ([t, e, i, s]) => `cubic-bezier(${t}, ${e}, ${i}, ${s})`,
      t6 = {
        linear: "linear",
        ease: "ease",
        easeIn: "ease-in",
        easeOut: "ease-out",
        easeInOut: "ease-in-out",
        circIn: t9([0, 0.65, 0.55, 1]),
        circOut: t9([0.55, 0, 1, 0.45]),
        backIn: t9([0.31, 0.01, 0.66, -0.59]),
        backOut: t9([0.33, 1.53, 0.69, 0.99]),
      };
    function t8(t) {
      return "function" == typeof t && "applyToOptions" in t;
    }
    class t7 extends t0 {
      constructor(t) {
        if (
          (super(),
          (this.finishedTime = null),
          (this.isStopped = !1),
          (this.manualStartTime = null),
          !t)
        )
          return;
        const {
          element: e,
          name: i,
          keyframes: s,
          pseudoElement: n,
          allowFlatten: r = !1,
          finalKeyframe: a,
          onComplete: o,
        } = t;
        (this.isPseudoElement = !!n),
          (this.allowFlatten = r),
          (this.options = t),
          ta(
            "string" != typeof t.type,
            'Mini animate() doesn\'t support "type" as a string.',
            "mini-spring",
          );
        const l = (function ({ type: t, ...e }) {
          return t8(t) && t3()
            ? t.applyToOptions(e)
            : (e.duration ?? (e.duration = 300),
              e.ease ?? (e.ease = "easeOut"),
              e);
        })(t);
        (this.animation = (function (
          t,
          e,
          i,
          {
            delay: s = 0,
            duration: n = 300,
            repeat: r = 0,
            repeatType: a = "loop",
            ease: o = "easeOut",
            times: l,
          } = {},
          h,
        ) {
          let u = { [e]: i };
          l && (u.offset = l);
          let d = (function t(e, i) {
            if (e)
              return "function" == typeof e
                ? t3()
                  ? t4(e, i)
                  : "ease-out"
                : t5(e)
                  ? t9(e)
                  : Array.isArray(e)
                    ? e.map((e) => t(e, i) || t6.easeOut)
                    : t6[e];
          })(o, n);
          Array.isArray(d) && (u.easing = d);
          let c = {
            delay: s,
            duration: n,
            easing: Array.isArray(d) ? "linear" : d,
            fill: "both",
            iterations: r + 1,
            direction: "reverse" === a ? "alternate" : "normal",
          };
          h && (c.pseudoElement = h);
          let p = t.animate(u, c);
          return p;
        })(e, i, s, l, n)),
          !1 === l.autoplay && this.animation.pause(),
          (this.animation.onfinish = () => {
            if (((this.finishedTime = this.time), !n)) {
              let t = tQ(s, this.options, a, this.speed);
              this.updateMotionValue
                ? this.updateMotionValue(t)
                : i.startsWith("--")
                  ? e.style.setProperty(i, t)
                  : (e.style[i] = t),
                this.animation.cancel();
            }
            o?.(), this.notifyFinished();
          });
      }
      play() {
        this.isStopped ||
          ((this.manualStartTime = null),
          this.animation.play(),
          "finished" === this.state && this.updateFinished());
      }
      pause() {
        this.animation.pause();
      }
      complete() {
        this.animation.finish?.();
      }
      cancel() {
        try {
          this.animation.cancel();
        } catch (t) {}
      }
      stop() {
        if (this.isStopped) return;
        this.isStopped = !0;
        let { state: t } = this;
        "idle" !== t &&
          "finished" !== t &&
          (this.updateMotionValue
            ? this.updateMotionValue()
            : this.commitStyles(),
          this.isPseudoElement || this.cancel());
      }
      commitStyles() {
        let t = this.options?.element;
        !this.isPseudoElement &&
          t?.isConnected &&
          this.animation.commitStyles?.();
      }
      get duration() {
        return (
          Number(this.animation.effect?.getComputedTiming?.().duration || 0) /
          1e3
        );
      }
      get iterationDuration() {
        let { delay: t = 0 } = this.options || {};
        return this.duration + t / 1e3;
      }
      get time() {
        return (Number(this.animation.currentTime) || 0) / 1e3;
      }
      set time(t) {
        (this.manualStartTime = null),
          (this.finishedTime = null),
          (this.animation.currentTime = tH(t));
      }
      get speed() {
        return this.animation.playbackRate;
      }
      set speed(t) {
        t < 0 && (this.finishedTime = null), (this.animation.playbackRate = t);
      }
      get state() {
        return null !== this.finishedTime
          ? "finished"
          : this.animation.playState;
      }
      get startTime() {
        return this.manualStartTime ?? Number(this.animation.startTime);
      }
      set startTime(t) {
        this.manualStartTime = this.animation.startTime = t;
      }
      attachTimeline({ timeline: t, observe: e }) {
        return (this.allowFlatten &&
          this.animation.effect?.updateTiming({ easing: "linear" }),
        (this.animation.onfinish = null),
        t && tZ())
          ? ((this.animation.timeline = t), tC)
          : e(this);
      }
    }
    let et = new Set(["opacity", "clipPath", "filter", "transform"]),
      { schedule: ee } = tj(queueMicrotask, !1);
    function ei() {
      e = void 0;
    }
    let es = {
      now: () => (
        void 0 === e &&
          es.set(
            tD.isProcessing || tk.useManualTiming
              ? tD.timestamp
              : performance.now(),
          ),
        e
      ),
      set: (t) => {
        (e = t), queueMicrotask(ei);
      },
    };
    class en {
      constructor(t, e = {}) {
        (this.canTrackVelocity = null),
          (this.events = {}),
          (this.updateAndNotify = (t) => {
            let e = es.now();
            if (
              (this.updatedAt !== e && this.setPrevFrameValue(),
              (this.prev = this.current),
              this.setCurrent(t),
              this.current !== this.prev &&
                (this.events.change?.notify(this.current), this.dependents))
            )
              for (let t of this.dependents) t.dirty();
          }),
          (this.hasAnimated = !1),
          this.setCurrent(t),
          (this.owner = e.owner);
      }
      setCurrent(t) {
        (this.current = t),
          (this.updatedAt = es.now()),
          null === this.canTrackVelocity &&
            void 0 !== t &&
            (this.canTrackVelocity = !isNaN(parseFloat(this.current)));
      }
      setPrevFrameValue(t = this.current) {
        (this.prevFrameValue = t), (this.prevUpdatedAt = this.updatedAt);
      }
      onChange(t) {
        return this.on("change", t);
      }
      on(t, e) {
        this.events[t] || (this.events[t] = new t_());
        let i = this.events[t].add(e);
        return "change" === t
          ? () => {
              i(),
                tR.read(() => {
                  this.events.change.getSize() || this.stop();
                });
            }
          : i;
      }
      clearListeners() {
        for (let t in this.events) this.events[t].clear();
      }
      attach(t, e) {
        (this.passiveEffect = t), (this.stopPassiveEffect = e);
      }
      set(t) {
        this.passiveEffect
          ? this.passiveEffect(t, this.updateAndNotify)
          : this.updateAndNotify(t);
      }
      setWithVelocity(t, e, i) {
        this.set(e),
          (this.prev = void 0),
          (this.prevFrameValue = t),
          (this.prevUpdatedAt = this.updatedAt - i);
      }
      jump(t, e = !0) {
        this.updateAndNotify(t),
          (this.prev = t),
          (this.prevUpdatedAt = this.prevFrameValue = void 0),
          e && this.stop(),
          this.stopPassiveEffect && this.stopPassiveEffect();
      }
      dirty() {
        this.events.change?.notify(this.current);
      }
      addDependent(t) {
        this.dependents || (this.dependents = new Set()),
          this.dependents.add(t);
      }
      removeDependent(t) {
        this.dependents && this.dependents.delete(t);
      }
      get() {
        return r && r.push(this), this.current;
      }
      getPrevious() {
        return this.prev;
      }
      getVelocity() {
        var t;
        let e = es.now();
        if (
          !this.canTrackVelocity ||
          void 0 === this.prevFrameValue ||
          e - this.updatedAt > 30
        )
          return 0;
        let i = Math.min(this.updatedAt - this.prevUpdatedAt, 30);
        return (
          (t = parseFloat(this.current) - parseFloat(this.prevFrameValue)),
          i ? (1e3 / i) * t : 0
        );
      }
      start(t) {
        return (
          this.stop(),
          new Promise((e) => {
            (this.hasAnimated = !0),
              (this.animation = t(e)),
              this.events.animationStart && this.events.animationStart.notify();
          }).then(() => {
            this.events.animationComplete &&
              this.events.animationComplete.notify(),
              this.clearAnimation();
          })
        );
      }
      stop() {
        this.animation &&
          (this.animation.stop(),
          this.events.animationCancel && this.events.animationCancel.notify()),
          this.clearAnimation();
      }
      isAnimating() {
        return !!this.animation;
      }
      clearAnimation() {
        delete this.animation;
      }
      destroy() {
        this.dependents?.clear(),
          this.events.destroy?.notify(),
          this.clearListeners(),
          this.stop(),
          this.stopPassiveEffect && this.stopPassiveEffect();
      }
    }
    function er(t, e) {
      return new en(t, e);
    }
    let ea = [...ti, j, W],
      eo = new WeakMap();
    function el(t) {
      return null !== t && "object" == typeof t && "function" == typeof t.start;
    }
    function eh(t) {
      return "string" == typeof t || Array.isArray(t);
    }
    let eu = [
        "animate",
        "whileInView",
        "whileFocus",
        "whileHover",
        "whileTap",
        "whileDrag",
        "exit",
      ],
      ed = ["initial", ...eu];
    function ec(t) {
      return el(t.animate) || ed.some((e) => eh(t[e]));
    }
    function ep(t) {
      return !!(ec(t) || t.variants);
    }
    let em = { current: null },
      ef = { current: !1 },
      eg = "u" > typeof window;
    function ey(t) {
      let e = [{}, {}];
      return (
        t?.values.forEach((t, i) => {
          (e[0][i] = t.get()), (e[1][i] = t.getVelocity());
        }),
        e
      );
    }
    function ev(t, e, i, s) {
      if ("function" == typeof e) {
        let [n, r] = ey(s);
        e = e(void 0 !== i ? i : t.custom, n, r);
      }
      if (
        ("string" == typeof e && (e = t.variants && t.variants[e]),
        "function" == typeof e)
      ) {
        let [n, r] = ey(s);
        e = e(void 0 !== i ? i : t.custom, n, r);
      }
      return e;
    }
    let ex = [
        "AnimationStart",
        "AnimationComplete",
        "Update",
        "BeforeLayoutMeasure",
        "LayoutMeasure",
        "LayoutAnimationStart",
        "LayoutAnimationComplete",
      ],
      eb = {};
    class ew {
      scrapeMotionValuesFromProps(t, e, i) {
        return {};
      }
      constructor(
        {
          parent: t,
          props: e,
          presenceContext: i,
          reducedMotionConfig: s,
          skipAnimations: n,
          blockInitialAnimation: r,
          visualState: a,
        },
        o = {},
      ) {
        (this.current = null),
          (this.children = new Set()),
          (this.isVariantNode = !1),
          (this.isControllingVariants = !1),
          (this.shouldReduceMotion = null),
          (this.shouldSkipAnimations = !1),
          (this.values = new Map()),
          (this.KeyframeResolver = tU),
          (this.features = {}),
          (this.valueSubscriptions = new Map()),
          (this.prevMotionValues = {}),
          (this.hasBeenMounted = !1),
          (this.events = {}),
          (this.propEventSubscriptions = {}),
          (this.notifyUpdate = () => this.notify("Update", this.latestValues)),
          (this.render = () => {
            this.current &&
              (this.triggerBuild(),
              this.renderInstance(
                this.current,
                this.renderState,
                this.props.style,
                this.projection,
              ));
          }),
          (this.renderScheduledAt = 0),
          (this.scheduleRender = () => {
            let t = es.now();
            this.renderScheduledAt < t &&
              ((this.renderScheduledAt = t), tR.render(this.render, !1, !0));
          });
        const { latestValues: l, renderState: h } = a;
        (this.latestValues = l),
          (this.baseTarget = { ...l }),
          (this.initialValues = e.initial ? { ...l } : {}),
          (this.renderState = h),
          (this.parent = t),
          (this.props = e),
          (this.presenceContext = i),
          (this.depth = t ? t.depth + 1 : 0),
          (this.reducedMotionConfig = s),
          (this.skipAnimationsConfig = n),
          (this.options = o),
          (this.blockInitialAnimation = !!r),
          (this.isControllingVariants = ec(e)),
          (this.isVariantNode = ep(e)),
          this.isVariantNode && (this.variantChildren = new Set()),
          (this.manuallyAnimateOnMount = !!(t && t.current));
        const { willChange: u, ...d } = this.scrapeMotionValuesFromProps(
          e,
          {},
          this,
        );
        for (const t in d) {
          const e = d[t];
          void 0 !== l[t] && Q(e) && e.set(l[t]);
        }
      }
      mount(t) {
        if (this.hasBeenMounted)
          for (let t in this.initialValues)
            this.values.get(t)?.jump(this.initialValues[t]),
              (this.latestValues[t] = this.initialValues[t]);
        (this.current = t),
          eo.set(t, this),
          this.projection &&
            !this.projection.instance &&
            this.projection.mount(t),
          this.parent &&
            this.isVariantNode &&
            !this.isControllingVariants &&
            (this.removeFromVariantTree = this.parent.addVariantChild(this)),
          this.values.forEach((t, e) => this.bindToMotionValue(e, t)),
          "never" === this.reducedMotionConfig
            ? (this.shouldReduceMotion = !1)
            : "always" === this.reducedMotionConfig
              ? (this.shouldReduceMotion = !0)
              : (ef.current ||
                  (function () {
                    if (((ef.current = !0), eg))
                      if (window.matchMedia) {
                        let t = window.matchMedia("(prefers-reduced-motion)"),
                          e = () => (em.current = t.matches);
                        t.addEventListener("change", e), e();
                      } else em.current = !1;
                  })(),
                (this.shouldReduceMotion = em.current)),
          (this.shouldSkipAnimations = this.skipAnimationsConfig ?? !1),
          this.parent?.addChild(this),
          this.update(this.props, this.presenceContext),
          (this.hasBeenMounted = !0);
      }
      unmount() {
        for (let t in (this.projection && this.projection.unmount(),
        tL(this.notifyUpdate),
        tL(this.render),
        this.valueSubscriptions.forEach((t) => t()),
        this.valueSubscriptions.clear(),
        this.removeFromVariantTree && this.removeFromVariantTree(),
        this.parent?.removeChild(this),
        this.events))
          this.events[t].clear();
        for (let t in this.features) {
          let e = this.features[t];
          e && (e.unmount(), (e.isMounted = !1));
        }
        this.current = null;
      }
      addChild(t) {
        this.children.add(t),
          this.enteringChildren ?? (this.enteringChildren = new Set()),
          this.enteringChildren.add(t);
      }
      removeChild(t) {
        this.children.delete(t),
          this.enteringChildren && this.enteringChildren.delete(t);
      }
      bindToMotionValue(t, e) {
        let i;
        if (
          (this.valueSubscriptions.has(t) && this.valueSubscriptions.get(t)(),
          e.accelerate && et.has(t) && this.current instanceof HTMLElement)
        ) {
          let {
              factory: i,
              keyframes: s,
              times: n,
              ease: r,
              duration: a,
            } = e.accelerate,
            o = new t7({
              element: this.current,
              name: t,
              keyframes: s,
              times: n,
              ease: r,
              duration: tH(a),
            }),
            l = i(o);
          this.valueSubscriptions.set(t, () => {
            l(), o.cancel();
          });
          return;
        }
        let s = u.has(t);
        s && this.onBindTransform && this.onBindTransform();
        let n = e.on("change", (e) => {
          (this.latestValues[t] = e),
            this.props.onUpdate && tR.preRender(this.notifyUpdate),
            s && this.projection && (this.projection.isTransformDirty = !0),
            this.scheduleRender();
        });
        "u" > typeof window &&
          window.MotionCheckAppearSync &&
          (i = window.MotionCheckAppearSync(this, t, e)),
          this.valueSubscriptions.set(t, () => {
            n(), i && i(), e.owner && e.stop();
          });
      }
      sortNodePosition(t) {
        return this.current &&
          this.sortInstanceNodePosition &&
          this.type === t.type
          ? this.sortInstanceNodePosition(this.current, t.current)
          : 0;
      }
      updateFeatures() {
        let t = "animation";
        for (t in eb) {
          let e = eb[t];
          if (!e) continue;
          let { isEnabled: i, Feature: s } = e;
          if (
            (!this.features[t] &&
              s &&
              i(this.props) &&
              (this.features[t] = new s(this)),
            this.features[t])
          ) {
            let e = this.features[t];
            e.isMounted ? e.update() : (e.mount(), (e.isMounted = !0));
          }
        }
      }
      triggerBuild() {
        this.build(this.renderState, this.latestValues, this.props);
      }
      measureViewportBox() {
        return this.current
          ? this.measureInstanceViewportBox(this.current, this.props)
          : J();
      }
      getStaticValue(t) {
        return this.latestValues[t];
      }
      setStaticValue(t, e) {
        this.latestValues[t] = e;
      }
      update(t, e) {
        (t.transformTemplate || this.props.transformTemplate) &&
          this.scheduleRender(),
          (this.prevProps = this.props),
          (this.props = t),
          (this.prevPresenceContext = this.presenceContext),
          (this.presenceContext = e);
        for (let e = 0; e < ex.length; e++) {
          let i = ex[e];
          this.propEventSubscriptions[i] &&
            (this.propEventSubscriptions[i](),
            delete this.propEventSubscriptions[i]);
          let s = t["on" + i];
          s && (this.propEventSubscriptions[i] = this.on(i, s));
        }
        (this.prevMotionValues = (function (t, e, i) {
          for (let s in e) {
            let n = e[s],
              r = i[s];
            if (Q(n)) t.addValue(s, n);
            else if (Q(r)) t.addValue(s, er(n, { owner: t }));
            else if (r !== n)
              if (t.hasValue(s)) {
                let e = t.getValue(s);
                !0 === e.liveStyle ? e.jump(n) : e.hasAnimated || e.set(n);
              } else {
                let e = t.getStaticValue(s);
                t.addValue(s, er(void 0 !== e ? e : n, { owner: t }));
              }
          }
          for (let s in i) void 0 === e[s] && t.removeValue(s);
          return e;
        })(
          this,
          this.scrapeMotionValuesFromProps(t, this.prevProps || {}, this),
          this.prevMotionValues,
        )),
          this.handleChildMotionValue && this.handleChildMotionValue();
      }
      getProps() {
        return this.props;
      }
      getVariant(t) {
        return this.props.variants ? this.props.variants[t] : void 0;
      }
      getDefaultTransition() {
        return this.props.transition;
      }
      getTransformPagePoint() {
        return this.props.transformPagePoint;
      }
      getClosestVariantNode() {
        return this.isVariantNode
          ? this
          : this.parent
            ? this.parent.getClosestVariantNode()
            : void 0;
      }
      addVariantChild(t) {
        let e = this.getClosestVariantNode();
        if (e)
          return (
            e.variantChildren && e.variantChildren.add(t),
            () => e.variantChildren.delete(t)
          );
      }
      addValue(t, e) {
        let i = this.values.get(t);
        e !== i &&
          (i && this.removeValue(t),
          this.bindToMotionValue(t, e),
          this.values.set(t, e),
          (this.latestValues[t] = e.get()));
      }
      removeValue(t) {
        this.values.delete(t);
        let e = this.valueSubscriptions.get(t);
        e && (e(), this.valueSubscriptions.delete(t)),
          delete this.latestValues[t],
          this.removeValueFromRenderState(t, this.renderState);
      }
      hasValue(t) {
        return this.values.has(t);
      }
      getValue(t, e) {
        if (this.props.values && this.props.values[t])
          return this.props.values[t];
        let i = this.values.get(t);
        return (
          void 0 === i &&
            void 0 !== e &&
            ((i = er(null === e ? void 0 : e, { owner: this })),
            this.addValue(t, i)),
          i
        );
      }
      readValue(t, e) {
        let i =
          void 0 === this.latestValues[t] && this.current
            ? (this.getBaseTargetFromProps(this.props, t) ??
              this.readValueFromInstance(this.current, t, this.options))
            : this.latestValues[t];
        if (null != i) {
          let s, n;
          if (
            "string" == typeof i &&
            ((s = i),
            /^-?(?:\d+(?:\.\d+)?|\.\d+)$/u.test(s) ||
              ((n = i), /^0[^.\s]+$/u.test(n)))
          )
            i = parseFloat(i);
          else {
            let s;
            (s = i), !ea.find(te(s)) && W.test(e) && (i = t$(t, e));
          }
          this.setBaseTarget(t, Q(i) ? i.get() : i);
        }
        return Q(i) ? i.get() : i;
      }
      setBaseTarget(t, e) {
        this.baseTarget[t] = e;
      }
      getBaseTarget(t) {
        let e,
          { initial: i } = this.props;
        if ("string" == typeof i || "object" == typeof i) {
          let s = ev(this.props, i, this.presenceContext?.custom);
          s && (e = s[t]);
        }
        if (i && void 0 !== e) return e;
        let s = this.getBaseTargetFromProps(this.props, t);
        return void 0 === s || Q(s)
          ? void 0 !== this.initialValues[t] && void 0 === e
            ? void 0
            : this.baseTarget[t]
          : s;
      }
      on(t, e) {
        return (
          this.events[t] || (this.events[t] = new t_()), this.events[t].add(e)
        );
      }
      notify(t, ...e) {
        this.events[t] && this.events[t].notify(...e);
      }
      scheduleRenderMicrotask() {
        ee.render(this.render);
      }
    }
    class eT extends ew {
      constructor() {
        super(...arguments), (this.KeyframeResolver = tX);
      }
      sortInstanceNodePosition(t, e) {
        return 2 & t.compareDocumentPosition(e) ? 1 : -1;
      }
      getBaseTargetFromProps(t, e) {
        let i = t.style;
        return i ? i[e] : void 0;
      }
      removeValueFromRenderState(t, { vars: e, style: i }) {
        delete e[t], delete i[t];
      }
      handleChildMotionValue() {
        this.childSubscription &&
          (this.childSubscription(), delete this.childSubscription);
        let { children: t } = this.props;
        Q(t) &&
          (this.childSubscription = t.on("change", (t) => {
            this.current && (this.current.textContent = `${t}`);
          }));
      }
    }
    function eS(t) {
      return t.replace(/([A-Z])/g, (t) => `-${t.toLowerCase()}`);
    }
    let eP = (t, e) => (e && "number" == typeof t ? e.transform(t) : t),
      eE = {
        x: "translateX",
        y: "translateY",
        z: "translateZ",
        transformPerspective: "perspective",
      },
      eA = h.length;
    function eM(t, e, i) {
      let { style: s, vars: n, transformOrigin: r } = t,
        a = !1,
        o = !1;
      for (let t in e) {
        let i = e[t];
        if (u.has(t)) {
          a = !0;
          continue;
        }
        if (tl(t)) {
          n[t] = i;
          continue;
        }
        {
          let e = eP(i, H[t]);
          t.startsWith("origin") ? ((o = !0), (r[t] = e)) : (s[t] = e);
        }
      }
      if (
        (!e.transform &&
          (a || i
            ? (s.transform = (function (t, e, i) {
                let s = "",
                  n = !0;
                for (let r = 0; r < eA; r++) {
                  let a = h[r],
                    o = t[a];
                  if (void 0 === o) continue;
                  let l = !0;
                  if ("number" == typeof o) l = o === +!!a.startsWith("scale");
                  else {
                    let t = parseFloat(o);
                    l = a.startsWith("scale") ? 1 === t : 0 === t;
                  }
                  if (!l || i) {
                    let t = eP(o, H[a]);
                    if (!l) {
                      n = !1;
                      let e = eE[a] || a;
                      s += `${e}(${t}) `;
                    }
                    i && (e[a] = t);
                  }
                }
                return (
                  (s = s.trim()),
                  i ? (s = i(e, n ? "" : s)) : n && (s = "none"),
                  s
                );
              })(e, t.transform, i))
            : s.transform && (s.transform = "none")),
        o)
      ) {
        let { originX: t = "50%", originY: e = "50%", originZ: i = 0 } = r;
        s.transformOrigin = `${t} ${e} ${i}`;
      }
    }
    let eC = { offset: "stroke-dashoffset", array: "stroke-dasharray" },
      ek = { offset: "strokeDashoffset", array: "strokeDasharray" },
      eV = ["offsetDistance", "offsetPath", "offsetRotate", "offsetAnchor"];
    function ej(
      t,
      {
        attrX: e,
        attrY: i,
        attrScale: s,
        pathLength: n,
        pathSpacing: r = 1,
        pathOffset: a = 0,
        ...o
      },
      l,
      h,
      u,
    ) {
      if ((eM(t, o, h), l)) {
        t.style.viewBox && (t.attrs.viewBox = t.style.viewBox);
        return;
      }
      (t.attrs = t.style), (t.style = {});
      let { attrs: d, style: c } = t;
      for (let t of (d.transform &&
        ((c.transform = d.transform), delete d.transform),
      (c.transform || d.transformOrigin) &&
        ((c.transformOrigin = d.transformOrigin ?? "50% 50%"),
        delete d.transformOrigin),
      c.transform &&
        ((c.transformBox = u?.transformBox ?? "fill-box"),
        delete d.transformBox),
      eV))
        void 0 !== d[t] && ((c[t] = d[t]), delete d[t]);
      void 0 !== e && (d.x = e),
        void 0 !== i && (d.y = i),
        void 0 !== s && (d.scale = s),
        void 0 !== n &&
          (function (t, e, i = 1, s = 0, n = !0) {
            t.pathLength = 1;
            let r = n ? eC : ek;
            (t[r.offset] = `${-s}`), (t[r.array] = `${e} ${i}`);
          })(d, n, r, a, !1);
    }
    let eR = new Set([
        "baseFrequency",
        "diffuseConstant",
        "kernelMatrix",
        "kernelUnitLength",
        "keySplines",
        "keyTimes",
        "limitingConeAngle",
        "markerHeight",
        "markerWidth",
        "numOctaves",
        "targetX",
        "targetY",
        "surfaceScale",
        "specularConstant",
        "specularExponent",
        "stdDeviation",
        "tableValues",
        "viewBox",
        "gradientTransform",
        "pathLength",
        "startOffset",
        "textLength",
        "lengthAdjust",
      ]),
      eL = (t) => "string" == typeof t && "svg" === t.toLowerCase();
    function eD(t, { style: e, vars: i }, s, n) {
      let r,
        a = t.style;
      for (r in e) a[r] = e[r];
      for (r in (n?.applyProjectionStyles(a, s), i)) a.setProperty(r, i[r]);
    }
    function eB(t, e) {
      return e.max === e.min ? 0 : (t / (e.max - e.min)) * 100;
    }
    let eF = {
        correct: (t, e) => {
          if (!e.target) return t;
          if ("string" == typeof t)
            if (!A.test(t)) return t;
            else t = parseFloat(t);
          let i = eB(t, e.target.x),
            s = eB(t, e.target.y);
          return `${i}% ${s}%`;
        },
      },
      eN = (t, e, i) => t + (e - t) * i,
      eI = {
        borderRadius: {
          ...eF,
          applyTo: [
            "borderTopLeftRadius",
            "borderTopRightRadius",
            "borderBottomLeftRadius",
            "borderBottomRightRadius",
          ],
        },
        borderTopLeftRadius: eF,
        borderTopRightRadius: eF,
        borderBottomLeftRadius: eF,
        borderBottomRightRadius: eF,
        boxShadow: {
          correct: (t, { treeScale: e, projectionDelta: i }) => {
            let s = W.parse(t);
            if (s.length > 5) return t;
            let n = W.createTransformer(t),
              r = +("number" != typeof s[0]),
              a = i.x.scale * e.x,
              o = i.y.scale * e.y;
            (s[0 + r] /= a), (s[1 + r] /= o);
            let l = eN(a, o, 0.5);
            return (
              "number" == typeof s[2 + r] && (s[2 + r] /= l),
              "number" == typeof s[3 + r] && (s[3 + r] /= l),
              n(s)
            );
          },
        },
      };
    function eO(t, { layout: e, layoutId: i }) {
      return (
        u.has(t) ||
        t.startsWith("origin") ||
        ((e || void 0 !== i) && (!!eI[t] || "opacity" === t))
      );
    }
    function eW(t, e, i) {
      let s = t.style,
        n = e?.style,
        r = {};
      if (!s) return r;
      for (let e in s)
        (Q(s[e]) ||
          (n && Q(n[e])) ||
          eO(e, t) ||
          i?.getValue(e)?.liveStyle !== void 0) &&
          (r[e] = s[e]);
      return r;
    }
    function ez(t, e, i) {
      let s = eW(t, e, i);
      for (let i in t)
        (Q(t[i]) || Q(e[i])) &&
          (s[
            -1 !== h.indexOf(i)
              ? "attr" + i.charAt(0).toUpperCase() + i.substring(1)
              : i
          ] = t[i]);
      return s;
    }
    class eU extends eT {
      constructor() {
        super(...arguments),
          (this.type = "svg"),
          (this.isSVGTag = !1),
          (this.measureInstanceViewportBox = J);
      }
      getBaseTargetFromProps(t, e) {
        return t[e];
      }
      readValueFromInstance(t, e) {
        if (u.has(e)) {
          let t = q(e);
          return (t && t.default) || 0;
        }
        return (e = eR.has(e) ? e : eS(e)), t.getAttribute(e);
      }
      scrapeMotionValuesFromProps(t, e, i) {
        return ez(t, e, i);
      }
      build(t, e, i) {
        ej(t, e, this.isSVGTag, i.transformTemplate, i.style);
      }
      renderInstance(t, e, i, s) {
        for (let i in (eD(t, e, void 0, s), e.attrs))
          t.setAttribute(eR.has(i) ? i : eS(i), e.attrs[i]);
      }
      mount(t) {
        (this.isSVGTag = eL(t.tagName)), super.mount(t);
      }
    }
    function e$({ top: t, left: e, right: i, bottom: s }) {
      return { x: { min: e, max: i }, y: { min: t, max: s } };
    }
    function eY(t) {
      return void 0 === t || 1 === t;
    }
    function eX({ scale: t, scaleX: e, scaleY: i }) {
      return !eY(t) || !eY(e) || !eY(i);
    }
    function eH(t) {
      return (
        eX(t) ||
        eG(t) ||
        t.z ||
        t.rotate ||
        t.rotateX ||
        t.rotateY ||
        t.skewX ||
        t.skewY
      );
    }
    function eG(t) {
      var e, i;
      return ((e = t.x) && "0%" !== e) || ((i = t.y) && "0%" !== i);
    }
    function eq(t, e, i, s, n) {
      return void 0 !== n && (t = s + n * (t - s)), s + i * (t - s) + e;
    }
    function e_(t, e = 0, i = 1, s, n) {
      (t.min = eq(t.min, e, i, s, n)), (t.max = eq(t.max, e, i, s, n));
    }
    function eK(t, { x: e, y: i }) {
      e_(t.x, e.translate, e.scale, e.originPoint),
        e_(t.y, i.translate, i.scale, i.originPoint);
    }
    function eZ(t, e) {
      (t.min = t.min + e), (t.max = t.max + e);
    }
    function eJ(t, e, i, s, n = 0.5) {
      let r = eN(t.min, t.max, n);
      e_(t, e, i, r, s);
    }
    function eQ(t, e) {
      eJ(t.x, e.x, e.scaleX, e.scale, e.originX),
        eJ(t.y, e.y, e.scaleY, e.scale, e.originY);
    }
    function e0(t, e) {
      return e$(
        (function (t, e) {
          if (!e) return t;
          let i = e({ x: t.left, y: t.top }),
            s = e({ x: t.right, y: t.bottom });
          return { top: i.y, left: i.x, bottom: s.y, right: s.x };
        })(t.getBoundingClientRect(), e),
      );
    }
    class e1 extends eT {
      constructor() {
        super(...arguments), (this.type = "html"), (this.renderInstance = eD);
      }
      readValueFromInstance(t, e) {
        if (u.has(e))
          return this.projection?.isProjecting
            ? tw(e)
            : ((t, e) => {
                let { transform: i = "none" } = getComputedStyle(t);
                return tT(i, e);
              })(t, e);
        {
          let i = window.getComputedStyle(t),
            s = (tl(e) ? i.getPropertyValue(e) : i[e]) || 0;
          return "string" == typeof s ? s.trim() : s;
        }
      }
      measureInstanceViewportBox(t, { transformPagePoint: e }) {
        return e0(t, e);
      }
      build(t, e, i) {
        eM(t, e, i.transformTemplate);
      }
      scrapeMotionValuesFromProps(t, e, i) {
        return eW(t, e, i);
      }
    }
    let e5 = [
      "animate",
      "circle",
      "defs",
      "desc",
      "ellipse",
      "g",
      "image",
      "line",
      "filter",
      "marker",
      "mask",
      "metadata",
      "path",
      "pattern",
      "polygon",
      "polyline",
      "rect",
      "stop",
      "switch",
      "symbol",
      "svg",
      "text",
      "tspan",
      "use",
      "view",
    ];
    function e2(t) {
      if ("string" != typeof t || t.includes("-"));
      else if (e5.indexOf(t) > -1 || /[A-Z]/u.test(t)) return !0;
      return !1;
    }
    let e3 = (0, l.createContext)({}),
      e4 = (0, l.createContext)({ strict: !1 }),
      e9 = (0, l.createContext)({
        transformPagePoint: (t) => t,
        isStatic: !1,
        reducedMotion: "never",
      }),
      e6 = (0, l.createContext)({});
    function e8(t) {
      return Array.isArray(t) ? t.join(" ") : t;
    }
    let e7 = () => ({
      style: {},
      transform: {},
      transformOrigin: {},
      vars: {},
    });
    function it(t, e, i) {
      for (let s in e) Q(e[s]) || eO(s, i) || (t[s] = e[s]);
    }
    let ie = () => ({ ...e7(), attrs: {} }),
      ii = new Set([
        "animate",
        "exit",
        "variants",
        "initial",
        "style",
        "values",
        "variants",
        "transition",
        "transformTemplate",
        "custom",
        "inherit",
        "onBeforeLayoutMeasure",
        "onAnimationStart",
        "onAnimationComplete",
        "onUpdate",
        "onDragStart",
        "onDrag",
        "onDragEnd",
        "onMeasureDragConstraints",
        "onDirectionLock",
        "onDragTransitionEnd",
        "_dragX",
        "_dragY",
        "onHoverStart",
        "onHoverEnd",
        "onViewportEnter",
        "onViewportLeave",
        "globalTapTarget",
        "propagate",
        "ignoreStrict",
        "viewport",
      ]);
    function is(t) {
      return (
        t.startsWith("while") ||
        (t.startsWith("drag") && "draggable" !== t) ||
        t.startsWith("layout") ||
        t.startsWith("onTap") ||
        t.startsWith("onPan") ||
        t.startsWith("onLayout") ||
        ii.has(t)
      );
    }
    let ir = (t) => !is(t);
    try {
      (a = (() => {
        let t = Error("Cannot find module '@emotion/is-prop-valid'");
        throw ((t.code = "MODULE_NOT_FOUND"), t);
      })().default),
        "function" == typeof a &&
          (ir = (t) => (t.startsWith("on") ? !is(t) : a(t)));
    } catch {}
    function ia(t) {
      return Q(t) ? t.get() : t;
    }
    let io = (0, l.createContext)(null),
      il = (t) => (e, i) => {
        let s,
          n = (0, l.useContext)(e6),
          r = (0, l.useContext)(io),
          a = () =>
            (function (
              { scrapeMotionValuesFromProps: t, createRenderState: e },
              i,
              s,
              n,
            ) {
              return {
                latestValues: (function (t, e, i, s) {
                  let n = {},
                    r = s(t, {});
                  for (let t in r) n[t] = ia(r[t]);
                  let { initial: a, animate: o } = t,
                    l = ec(t),
                    h = ep(t);
                  e &&
                    h &&
                    !l &&
                    !1 !== t.inherit &&
                    (void 0 === a && (a = e.initial),
                    void 0 === o && (o = e.animate));
                  let u = !!i && !1 === i.initial,
                    d = (u = u || !1 === a) ? o : a;
                  if (d && "boolean" != typeof d && !el(d)) {
                    let e = Array.isArray(d) ? d : [d];
                    for (let i = 0; i < e.length; i++) {
                      let s = ev(t, e[i]);
                      if (s) {
                        let { transitionEnd: t, transition: e, ...i } = s;
                        for (let t in i) {
                          let e = i[t];
                          if (Array.isArray(e)) {
                            let t = u ? e.length - 1 : 0;
                            e = e[t];
                          }
                          null !== e && (n[t] = e);
                        }
                        for (let e in t) n[e] = t[e];
                      }
                    }
                  }
                  return n;
                })(i, s, n, t),
                renderState: e(),
              };
            })(t, e, n, r);
        return i
          ? a()
          : (null === (s = (0, l.useRef)(null)).current && (s.current = a()),
            s.current);
      },
      ih = il({ scrapeMotionValuesFromProps: eW, createRenderState: e7 }),
      iu = il({ scrapeMotionValuesFromProps: ez, createRenderState: ie }),
      id = "u" > typeof window,
      ic = {
        animation: [
          "animate",
          "variants",
          "whileHover",
          "whileTap",
          "exit",
          "whileInView",
          "whileFocus",
          "whileDrag",
        ],
        exit: ["exit"],
        drag: ["drag", "dragControls"],
        focus: ["whileFocus"],
        hover: ["whileHover", "onHoverStart", "onHoverEnd"],
        tap: ["whileTap", "onTap", "onTapStart", "onTapCancel"],
        pan: ["onPan", "onPanStart", "onPanSessionStart", "onPanEnd"],
        inView: ["whileInView", "onViewportEnter", "onViewportLeave"],
        layout: ["layout", "layoutId"],
      },
      ip = !1;
    function im() {
      return (
        !(function () {
          if (ip) return;
          let t = {};
          for (let e in ic)
            t[e] = { isEnabled: (t) => ic[e].some((e) => !!t[e]) };
          (eb = t), (ip = !0);
        })(),
        eb
      );
    }
    let ig = Symbol.for("motionComponentSymbol"),
      iy = "data-" + eS("framerAppearId"),
      iv = (0, l.createContext)({});
    function ix(t) {
      return (
        t &&
        "object" == typeof t &&
        Object.prototype.hasOwnProperty.call(t, "current")
      );
    }
    let ib = id ? l.useLayoutEffect : l.useEffect;
    function iw(t, { forwardMotionProps: e = !1, type: i } = {}, s, n) {
      s &&
        (function (t) {
          let e = im();
          for (let i in t) e[i] = { ...e[i], ...t[i] };
          eb = e;
        })(s);
      let r = i ? "svg" === i : e2(t),
        a = r ? iu : ih;
      function h(i, s) {
        var h;
        let u,
          d,
          c,
          p = {
            ...(0, l.useContext)(e9),
            ...i,
            layoutId: (function ({ layoutId: t }) {
              let e = (0, l.useContext)(e3).id;
              return e && void 0 !== t ? e + "-" + t : t;
            })(i),
          },
          { isStatic: m } = p,
          f = (function (t) {
            let { initial: e, animate: i } = (function (t, e) {
              if (ec(t)) {
                let { initial: e, animate: i } = t;
                return {
                  initial: !1 === e || eh(e) ? e : void 0,
                  animate: eh(i) ? i : void 0,
                };
              }
              return !1 !== t.inherit ? e : {};
            })(t, (0, l.useContext)(e6));
            return (0, l.useMemo)(
              () => ({ initial: e, animate: i }),
              [e8(e), e8(i)],
            );
          })(i),
          g = a(i, m);
        if (!m && id) {
          (0, l.useContext)(e4).strict;
          let e = (function (t) {
            let { drag: e, layout: i } = im();
            if (!e && !i) return {};
            let s = { ...e, ...i };
            return {
              MeasureLayout:
                e?.isEnabled(t) || i?.isEnabled(t) ? s.MeasureLayout : void 0,
              ProjectionNode: s.ProjectionNode,
            };
          })(p);
          (u = e.MeasureLayout),
            (f.visualElement = (function (t, e, i, s, n, r) {
              let { visualElement: a } = (0, l.useContext)(e6),
                o = (0, l.useContext)(e4),
                h = (0, l.useContext)(io),
                u = (0, l.useContext)(e9),
                d = u.reducedMotion,
                c = u.skipAnimations,
                p = (0, l.useRef)(null),
                m = (0, l.useRef)(!1);
              (s = s || o.renderer),
                !p.current &&
                  s &&
                  ((p.current = s(t, {
                    visualState: e,
                    parent: a,
                    props: i,
                    presenceContext: h,
                    blockInitialAnimation: !!h && !1 === h.initial,
                    reducedMotionConfig: d,
                    skipAnimations: c,
                    isSVG: r,
                  })),
                  m.current &&
                    p.current &&
                    (p.current.manuallyAnimateOnMount = !0));
              let f = p.current,
                g = (0, l.useContext)(iv);
              f &&
                !f.projection &&
                n &&
                ("html" === f.type || "svg" === f.type) &&
                (function (t, e, i, s) {
                  let {
                    layoutId: n,
                    layout: r,
                    drag: a,
                    dragConstraints: o,
                    layoutScroll: l,
                    layoutRoot: h,
                    layoutCrossfade: u,
                  } = e;
                  (t.projection = new i(
                    t.latestValues,
                    e["data-framer-portal-id"]
                      ? void 0
                      : (function t(e) {
                          if (e)
                            return !1 !== e.options.allowProjection
                              ? e.projection
                              : t(e.parent);
                        })(t.parent),
                  )),
                    t.projection.setOptions({
                      layoutId: n,
                      layout: r,
                      alwaysMeasureLayout: !!a || (o && ix(o)),
                      visualElement: t,
                      animationType: "string" == typeof r ? r : "both",
                      initialPromotionConfig: s,
                      crossfade: u,
                      layoutScroll: l,
                      layoutRoot: h,
                    });
                })(p.current, i, n, g);
              let y = (0, l.useRef)(!1);
              (0, l.useInsertionEffect)(() => {
                f && y.current && f.update(i, h);
              });
              let v = i[iy],
                x = (0, l.useRef)(
                  !!v &&
                    !window.MotionHandoffIsComplete?.(v) &&
                    window.MotionHasOptimisedAnimation?.(v),
                );
              return (
                ib(() => {
                  (m.current = !0),
                    f &&
                      ((y.current = !0),
                      (window.MotionIsMounted = !0),
                      f.updateFeatures(),
                      f.scheduleRenderMicrotask(),
                      x.current &&
                        f.animationState &&
                        f.animationState.animateChanges());
                }),
                (0, l.useEffect)(() => {
                  f &&
                    (!x.current &&
                      f.animationState &&
                      f.animationState.animateChanges(),
                    x.current &&
                      (queueMicrotask(() => {
                        window.MotionHandoffMarkAsComplete?.(v);
                      }),
                      (x.current = !1)),
                    (f.enteringChildren = void 0));
                }),
                f
              );
            })(t, g, p, n, e.ProjectionNode, r));
        }
        return (0, o.jsxs)(e6.Provider, {
          value: f,
          children: [
            u && f.visualElement
              ? (0, o.jsx)(u, { visualElement: f.visualElement, ...p })
              : null,
            (function (t, e, i, { latestValues: s }, n, r = !1, a) {
              let o = (
                  (a ?? e2(t))
                    ? function (t, e, i, s) {
                        let n = (0, l.useMemo)(() => {
                          let i = ie();
                          return (
                            ej(i, e, eL(s), t.transformTemplate, t.style),
                            { ...i.attrs, style: { ...i.style } }
                          );
                        }, [e]);
                        if (t.style) {
                          let e = {};
                          it(e, t.style, t), (n.style = { ...e, ...n.style });
                        }
                        return n;
                      }
                    : function (t, e) {
                        let i,
                          s,
                          n = {},
                          r =
                            ((i = t.style || {}),
                            it((s = {}), i, t),
                            Object.assign(
                              s,
                              (function ({ transformTemplate: t }, e) {
                                return (0, l.useMemo)(() => {
                                  let i = e7();
                                  return (
                                    eM(i, e, t),
                                    Object.assign({}, i.vars, i.style)
                                  );
                                }, [e]);
                              })(t, e),
                            ),
                            s);
                        return (
                          t.drag &&
                            !1 !== t.dragListener &&
                            ((n.draggable = !1),
                            (r.userSelect =
                              r.WebkitUserSelect =
                              r.WebkitTouchCallout =
                                "none"),
                            (r.touchAction =
                              !0 === t.drag
                                ? "none"
                                : `pan-${"x" === t.drag ? "y" : "x"}`)),
                          void 0 === t.tabIndex &&
                            (t.onTap || t.onTapStart || t.whileTap) &&
                            (n.tabIndex = 0),
                          (n.style = r),
                          n
                        );
                      }
                )(e, s, n, t),
                h = (function (t, e, i) {
                  let s = {};
                  for (let n in t)
                    ("values" !== n || "object" != typeof t.values) &&
                      (ir(n) ||
                        (!0 === i && is(n)) ||
                        (!e && !is(n)) ||
                        (t.draggable && n.startsWith("onDrag"))) &&
                      (s[n] = t[n]);
                  return s;
                })(e, "string" == typeof t, r),
                u = t !== l.Fragment ? { ...h, ...o, ref: i } : {},
                { children: d } = e,
                c = (0, l.useMemo)(() => (Q(d) ? d.get() : d), [d]);
              return (0, l.createElement)(t, { ...u, children: c });
            })(
              t,
              i,
              ((h = f.visualElement),
              (d = (0, l.useRef)(s)),
              (0, l.useInsertionEffect)(() => {
                d.current = s;
              }),
              (c = (0, l.useRef)(null)),
              (0, l.useCallback)(
                (t) => {
                  t && g.onMount?.(t), h && (t ? h.mount(t) : h.unmount());
                  let e = d.current;
                  if ("function" == typeof e)
                    if (t) {
                      let i = e(t);
                      "function" == typeof i && (c.current = i);
                    } else c.current ? (c.current(), (c.current = null)) : e(t);
                  else e && (e.current = t);
                },
                [h],
              )),
              g,
              m,
              e,
              r,
            ),
          ],
        });
      }
      h.displayName = `motion.${"string" == typeof t ? t : `create(${t.displayName ?? t.name ?? ""})`}`;
      let u = (0, l.forwardRef)(h);
      return (u[ig] = t), u;
    }
    class iT {
      constructor(t) {
        (this.isMounted = !1), (this.node = t);
      }
      update() {}
    }
    function iS(t, e, i) {
      let s = t.getProps();
      return ev(s, e, void 0 !== i ? i : s.custom, t);
    }
    function iP(t, e) {
      if (t?.inherit && e) {
        let { inherit: i, ...s } = t;
        return { ...e, ...s };
      }
      return t;
    }
    function iE(t, e) {
      let i = t?.[e] ?? t?.default ?? t;
      return i !== t ? iP(i, t) : i;
    }
    let iA = (t) => Array.isArray(t);
    function iM(t, e) {
      let i = t.getValue("willChange");
      if (Q(i) && i.add) return i.add(e);
      if (!i && tk.WillChange) {
        let i = new tk.WillChange("auto");
        t.addValue("willChange", i), i.add(e);
      }
    }
    let iC = (t, e) => (i) => e(t(i)),
      ik = (...t) => t.reduce(iC);
    function iV(t, e, i) {
      return (i < 0 && (i += 1), i > 1 && (i -= 1), i < 1 / 6)
        ? t + (e - t) * 6 * i
        : i < 0.5
          ? e
          : i < 2 / 3
            ? t + (e - t) * (2 / 3 - i) * 6
            : t;
    }
    function ij(t, e) {
      return (i) => (i > 0 ? e : t);
    }
    let iR = (t, e, i) => {
        let s = t * t,
          n = i * (e * e - s) + s;
        return n < 0 ? 0 : Math.sqrt(n);
      },
      iL = [T, w, V];
    function iD(t) {
      let e = iL.find((e) => e.test(t));
      if (
        (tr(
          !!e,
          `'${t}' is not an animatable color. Use the equivalent color code instead.`,
          "color-not-animatable",
        ),
        !e)
      )
        return !1;
      let i = e.parse(t);
      return (
        e === V &&
          (i = (function ({ hue: t, saturation: e, lightness: i, alpha: s }) {
            (t /= 360), (i /= 100);
            let n = 0,
              r = 0,
              a = 0;
            if ((e /= 100)) {
              let s = i < 0.5 ? i * (1 + e) : i + e - i * e,
                o = 2 * i - s;
              (n = iV(o, s, t + 1 / 3)),
                (r = iV(o, s, t)),
                (a = iV(o, s, t - 1 / 3));
            } else n = r = a = i;
            return {
              red: Math.round(255 * n),
              green: Math.round(255 * r),
              blue: Math.round(255 * a),
              alpha: s,
            };
          })(i)),
        i
      );
    }
    let iB = (t, e) => {
        let i = iD(t),
          s = iD(e);
        if (!i || !s) return ij(t, e);
        let n = { ...i };
        return (t) => (
          (n.red = iR(i.red, s.red, t)),
          (n.green = iR(i.green, s.green, t)),
          (n.blue = iR(i.blue, s.blue, t)),
          (n.alpha = eN(i.alpha, s.alpha, t)),
          w.transform(n)
        );
      },
      iF = new Set(["none", "hidden"]);
    function iN(t, e) {
      return (i) => eN(t, e, i);
    }
    function iI(t) {
      return "number" == typeof t
        ? iN
        : "string" == typeof t
          ? tu(t)
            ? ij
            : j.test(t)
              ? iB
              : iz
          : Array.isArray(t)
            ? iO
            : "object" == typeof t
              ? j.test(t)
                ? iB
                : iW
              : ij;
    }
    function iO(t, e) {
      let i = [...t],
        s = i.length,
        n = t.map((t, i) => iI(t)(t, e[i]));
      return (t) => {
        for (let e = 0; e < s; e++) i[e] = n[e](t);
        return i;
      };
    }
    function iW(t, e) {
      let i = { ...t, ...e },
        s = {};
      for (let n in i)
        void 0 !== t[n] && void 0 !== e[n] && (s[n] = iI(t[n])(t[n], e[n]));
      return (t) => {
        for (let e in s) i[e] = s[e](t);
        return i;
      };
    }
    let iz = (t, e) => {
      let i = W.createTransformer(e),
        s = F(t),
        n = F(e);
      if (
        !(
          s.indexes.var.length === n.indexes.var.length &&
          s.indexes.color.length === n.indexes.color.length &&
          s.indexes.number.length >= n.indexes.number.length
        )
      )
        return (
          tr(
            !0,
            `Complex values '${t}' and '${e}' too different to mix. Ensure all colors are of the same type, and that each contains the same quantity of number and color values. Falling back to instant transition.`,
            "complex-values-different",
          ),
          ij(t, e)
        );
      if ((iF.has(t) && !n.values.length) || (iF.has(e) && !s.values.length))
        return iF.has(t) ? (i) => (i <= 0 ? t : e) : (i) => (i >= 1 ? e : t);
      return ik(
        iO(
          (function (t, e) {
            let i = [],
              s = { color: 0, var: 0, number: 0 };
            for (let n = 0; n < e.values.length; n++) {
              let r = e.types[n],
                a = t.indexes[r][s[r]],
                o = t.values[a] ?? 0;
              (i[n] = o), s[r]++;
            }
            return i;
          })(s, n),
          n.values,
        ),
        i,
      );
    };
    function iU(t, e, i) {
      return "number" == typeof t &&
        "number" == typeof e &&
        "number" == typeof i
        ? eN(t, e, i)
        : iI(t)(t, e);
    }
    let i$ = (t) => {
      let e = ({ timestamp: e }) => t(e);
      return {
        start: (t = !0) => tR.update(e, t),
        stop: () => tL(e),
        now: () => (tD.isProcessing ? tD.timestamp : es.now()),
      };
    };
    function iY(t) {
      let e = 0,
        i = t.next(e);
      for (; !i.done && e < 2e4; ) (e += 50), (i = t.next(e));
      return e >= 2e4 ? 1 / 0 : e;
    }
    function iX(t, e, i) {
      var s, n;
      let r = Math.max(e - 5, 0);
      return (s = i - t(r)), (n = e - r) ? (1e3 / n) * s : 0;
    }
    let iH = 0.01,
      iG = 2,
      iq = 0.005,
      i_ = 0.5;
    function iK(t, e) {
      return t * Math.sqrt(1 - e * e);
    }
    let iZ = ["duration", "bounce"],
      iJ = ["stiffness", "damping", "mass"];
    function iQ(t, e) {
      return e.some((e) => void 0 !== t[e]);
    }
    function i0(t = 0.3, e = 0.3) {
      let i,
        s =
          "object" != typeof t
            ? { visualDuration: t, keyframes: [0, 1], bounce: e }
            : t,
        { restSpeed: n, restDelta: r } = s,
        a = s.keyframes[0],
        o = s.keyframes[s.keyframes.length - 1],
        l = { done: !1, value: a },
        {
          stiffness: h,
          damping: u,
          mass: c,
          duration: p,
          velocity: m,
          isResolvedFromDuration: f,
        } = (function (t) {
          let e = {
            velocity: 0,
            stiffness: 100,
            damping: 10,
            mass: 1,
            isResolvedFromDuration: !1,
            ...t,
          };
          if (!iQ(t, iJ) && iQ(t, iZ))
            if (t.visualDuration) {
              let i = (2 * Math.PI) / (1.2 * t.visualDuration),
                s = i * i,
                n = 2 * d(0.05, 1, 1 - (t.bounce || 0)) * Math.sqrt(s);
              e = { ...e, mass: 1, stiffness: s, damping: n };
            } else {
              let i = (function ({
                duration: t = 800,
                bounce: e = 0.3,
                velocity: i = 0,
                mass: s = 1,
              }) {
                let n, r;
                tr(
                  t <= tH(10),
                  "Spring duration must be 10 seconds or less",
                  "spring-duration-limit",
                );
                let a = 1 - e;
                (a = d(0.05, 1, a)),
                  (t = d(0.01, 10, t / 1e3)),
                  a < 1
                    ? ((n = (e) => {
                        let s = e * a,
                          n = s * t;
                        return 0.001 - ((s - i) / iK(e, a)) * Math.exp(-n);
                      }),
                      (r = (e) => {
                        let s = e * a * t,
                          r = Math.pow(a, 2) * Math.pow(e, 2) * t,
                          o = Math.exp(-s),
                          l = iK(Math.pow(e, 2), a);
                        return (
                          ((s * i + i - r) * o * (-n(e) + 0.001 > 0 ? -1 : 1)) /
                          l
                        );
                      }))
                    : ((n = (e) =>
                        -0.001 + Math.exp(-e * t) * ((e - i) * t + 1)),
                      (r = (e) => t * t * (i - e) * Math.exp(-e * t)));
                let o = (function (t, e, i) {
                  let s = i;
                  for (let i = 1; i < 12; i++) s -= t(s) / e(s);
                  return s;
                })(n, r, 5 / t);
                if (((t = tH(t)), isNaN(o)))
                  return { stiffness: 100, damping: 10, duration: t };
                {
                  let e = Math.pow(o, 2) * s;
                  return {
                    stiffness: e,
                    damping: 2 * a * Math.sqrt(s * e),
                    duration: t,
                  };
                }
              })(t);
              (e = { ...e, ...i, mass: 1 }).isResolvedFromDuration = !0;
            }
          return e;
        })({ ...s, velocity: -((s.velocity || 0) / 1e3) }),
        g = m || 0,
        y = u / (2 * Math.sqrt(h * c)),
        v = o - a,
        x = Math.sqrt(h / c) / 1e3,
        b = 5 > Math.abs(v);
      if ((n || (n = b ? iH : iG), r || (r = b ? iq : i_), y < 1)) {
        let t = iK(x, y);
        i = (e) =>
          o -
          Math.exp(-y * x * e) *
            (((g + y * x * v) / t) * Math.sin(t * e) + v * Math.cos(t * e));
      } else if (1 === y)
        i = (t) => o - Math.exp(-x * t) * (v + (g + x * v) * t);
      else {
        let t = x * Math.sqrt(y * y - 1);
        i = (e) => {
          let i = Math.exp(-y * x * e),
            s = Math.min(t * e, 300);
          return (
            o -
            (i * ((g + y * x * v) * Math.sinh(s) + t * v * Math.cosh(s))) / t
          );
        };
      }
      let w = {
        calculatedDuration: (f && p) || null,
        next: (t) => {
          let e = i(t);
          if (f) l.done = t >= p;
          else {
            let s = 0 === t ? g : 0;
            y < 1 && (s = 0 === t ? tH(g) : iX(i, t, e));
            let a = Math.abs(o - e) <= r;
            l.done = Math.abs(s) <= n && a;
          }
          return (l.value = l.done ? o : e), l;
        },
        toString: () => {
          let t = Math.min(iY(w), 2e4),
            e = t4((e) => w.next(t * e).value, t, 30);
          return t + "ms " + e;
        },
        toTransition: () => {},
      };
      return w;
    }
    function i1({
      keyframes: t,
      velocity: e = 0,
      power: i = 0.8,
      timeConstant: s = 325,
      bounceDamping: n = 10,
      bounceStiffness: r = 500,
      modifyTarget: a,
      min: o,
      max: l,
      restDelta: h = 0.5,
      restSpeed: u,
    }) {
      let d,
        c,
        p = t[0],
        m = { done: !1, value: p },
        f = i * e,
        g = p + f,
        y = void 0 === a ? g : a(g);
      y !== g && (f = y - p);
      let v = (t) => -f * Math.exp(-t / s),
        x = (t) => y + v(t),
        b = (t) => {
          let e = v(t),
            i = x(t);
          (m.done = Math.abs(e) <= h), (m.value = m.done ? y : i);
        },
        w = (t) => {
          let e;
          if (
            ((e = m.value), (void 0 !== o && e < o) || (void 0 !== l && e > l))
          ) {
            var i;
            (d = t),
              (c = i0({
                keyframes: [
                  m.value,
                  ((i = m.value),
                  void 0 === o
                    ? l
                    : void 0 === l || Math.abs(o - i) < Math.abs(l - i)
                      ? o
                      : l),
                ],
                velocity: iX(x, t, m.value),
                damping: n,
                stiffness: r,
                restDelta: h,
                restSpeed: u,
              }));
          }
        };
      return (
        w(0),
        {
          calculatedDuration: null,
          next: (t) => {
            let e = !1;
            return (c || void 0 !== d || ((e = !0), b(t), w(t)),
            void 0 !== d && t >= d)
              ? c.next(t - d)
              : (e || b(t), m);
          },
        }
      );
    }
    i0.applyToOptions = (t) => {
      let e = (function (t, e = 100, i) {
        let s = i({ ...t, keyframes: [0, e] }),
          n = Math.min(iY(s), 2e4);
        return {
          type: "keyframes",
          ease: (t) => s.next(n * t).value / e,
          duration: n / 1e3,
        };
      })(t, 100, i0);
      return (
        (t.ease = e.ease),
        (t.duration = tH(e.duration)),
        (t.type = "keyframes"),
        t
      );
    };
    let i5 = (t, e, i) =>
      (((1 - 3 * i + 3 * e) * t + (3 * i - 6 * e)) * t + 3 * e) * t;
    function i2(t, e, i, s) {
      return t === e && i === s
        ? tC
        : (n) =>
            0 === n || 1 === n
              ? n
              : i5(
                  (function (t, e, i, s, n) {
                    let r,
                      a,
                      o = 0;
                    do
                      (r = i5((a = e + (i - e) / 2), s, n) - t) > 0
                        ? (i = a)
                        : (e = a);
                    while (Math.abs(r) > 1e-7 && ++o < 12);
                    return a;
                  })(n, 0, 1, t, i),
                  e,
                  s,
                );
    }
    let i3 = i2(0.42, 0, 1, 1),
      i4 = i2(0, 0, 0.58, 1),
      i9 = i2(0.42, 0, 0.58, 1),
      i6 = (t) => (e) => (e <= 0.5 ? t(2 * e) / 2 : (2 - t(2 * (1 - e))) / 2),
      i8 = (t) => (e) => 1 - t(1 - e),
      i7 = i2(0.33, 1.53, 0.69, 0.99),
      st = i8(i7),
      se = i6(st),
      si = (t) =>
        (t *= 2) < 1 ? 0.5 * st(t) : 0.5 * (2 - Math.pow(2, -10 * (t - 1))),
      ss = (t) => 1 - Math.sin(Math.acos(t)),
      sn = i8(ss),
      sr = i6(ss),
      sa = {
        linear: tC,
        easeIn: i3,
        easeInOut: i9,
        easeOut: i4,
        circIn: ss,
        circInOut: sr,
        circOut: sn,
        backIn: st,
        backInOut: se,
        backOut: i7,
        anticipate: si,
      },
      so = (t) => {
        if (t5(t)) {
          ta(
            4 === t.length,
            "Cubic bezier arrays must contain four numerical values.",
            "cubic-bezier-length",
          );
          let [e, i, s, n] = t;
          return i2(e, i, s, n);
        }
        return "string" == typeof t
          ? (ta(
              void 0 !== sa[t],
              `Invalid easing type '${t}'`,
              "invalid-easing-type",
            ),
            sa[t])
          : t;
      },
      sl = (t, e, i) => {
        let s = e - t;
        return 0 === s ? 1 : (i - t) / s;
      };
    function sh({
      duration: t = 300,
      keyframes: e,
      times: i,
      ease: s = "easeInOut",
    }) {
      var n;
      let r,
        a = Array.isArray(s) && "number" != typeof s[0] ? s.map(so) : so(s),
        o = { done: !1, value: e[0] },
        l = (function (t, e, { clamp: i = !0, ease: s, mixer: n } = {}) {
          let r = t.length;
          if (
            (ta(
              r === e.length,
              "Both input and output ranges must be the same length",
              "range-length",
            ),
            1 === r)
          )
            return () => e[0];
          if (2 === r && e[0] === e[1]) return () => e[1];
          let a = t[0] === t[1];
          t[0] > t[r - 1] && ((t = [...t].reverse()), (e = [...e].reverse()));
          let o = (function (t, e, i) {
              let s = [],
                n = i || tk.mix || iU,
                r = t.length - 1;
              for (let i = 0; i < r; i++) {
                let r = n(t[i], t[i + 1]);
                e && (r = ik(Array.isArray(e) ? e[i] || tC : e, r)), s.push(r);
              }
              return s;
            })(e, s, n),
            l = o.length,
            h = (i) => {
              if (a && i < t[0]) return e[0];
              let s = 0;
              if (l > 1) for (; s < t.length - 2 && !(i < t[s + 1]); s++);
              let n = sl(t[s], t[s + 1], i);
              return o[s](n);
            };
          return i ? (e) => h(d(t[0], t[r - 1], e)) : h;
        })(
          ((n =
            i && i.length === e.length
              ? i
              : (!(function (t, e) {
                  let i = t[t.length - 1];
                  for (let s = 1; s <= e; s++) {
                    let n = sl(0, e, s);
                    t.push(eN(i, 1, n));
                  }
                })((r = [0]), e.length - 1),
                r)),
          n.map((e) => e * t)),
          e,
          {
            ease: Array.isArray(a)
              ? a
              : e.map(() => a || i9).splice(0, e.length - 1),
          },
        );
      return {
        calculatedDuration: t,
        next: (e) => ((o.value = l(e)), (o.done = e >= t), o),
      };
    }
    let su = { decay: i1, inertia: i1, tween: sh, keyframes: sh, spring: i0 };
    function sd(t) {
      "string" == typeof t.type && (t.type = su[t.type]);
    }
    let sc = (t) => t / 100;
    class sp extends t0 {
      constructor(t) {
        super(),
          (this.state = "idle"),
          (this.startTime = null),
          (this.isStopped = !1),
          (this.currentTime = 0),
          (this.holdTime = null),
          (this.playbackSpeed = 1),
          (this.stop = () => {
            let { motionValue: t } = this.options;
            t && t.updatedAt !== es.now() && this.tick(es.now()),
              (this.isStopped = !0),
              "idle" !== this.state &&
                (this.teardown(), this.options.onStop?.());
          }),
          t1.mainThread++,
          (this.options = t),
          this.initAnimation(),
          this.play(),
          !1 === t.autoplay && this.pause();
      }
      initAnimation() {
        let { options: t } = this;
        sd(t);
        let {
            type: e = sh,
            repeat: i = 0,
            repeatDelay: s = 0,
            repeatType: n,
            velocity: r = 0,
          } = t,
          { keyframes: a } = t,
          o = e || sh;
        o !== sh &&
          "number" != typeof a[0] &&
          ((this.mixKeyframes = ik(sc, iU(a[0], a[1]))), (a = [0, 100]));
        let l = o({ ...t, keyframes: a });
        "mirror" === n &&
          (this.mirroredGenerator = o({
            ...t,
            keyframes: [...a].reverse(),
            velocity: -r,
          })),
          null === l.calculatedDuration && (l.calculatedDuration = iY(l));
        let { calculatedDuration: h } = l;
        (this.calculatedDuration = h),
          (this.resolvedDuration = h + s),
          (this.totalDuration = this.resolvedDuration * (i + 1) - s),
          (this.generator = l);
      }
      updateTime(t) {
        let e = Math.round(t - this.startTime) * this.playbackSpeed;
        null !== this.holdTime
          ? (this.currentTime = this.holdTime)
          : (this.currentTime = e);
      }
      tick(t, e = !1) {
        let {
          generator: i,
          totalDuration: s,
          mixKeyframes: n,
          mirroredGenerator: r,
          resolvedDuration: a,
          calculatedDuration: o,
        } = this;
        if (null === this.startTime) return i.next(0);
        let {
          delay: l = 0,
          keyframes: h,
          repeat: u,
          repeatType: c,
          repeatDelay: p,
          type: m,
          onUpdate: f,
          finalKeyframe: g,
        } = this.options;
        this.speed > 0
          ? (this.startTime = Math.min(this.startTime, t))
          : this.speed < 0 &&
            (this.startTime = Math.min(t - s / this.speed, this.startTime)),
          e ? (this.currentTime = t) : this.updateTime(t);
        let y = this.currentTime - l * (this.playbackSpeed >= 0 ? 1 : -1),
          v = this.playbackSpeed >= 0 ? y < 0 : y > s;
        (this.currentTime = Math.max(y, 0)),
          "finished" === this.state &&
            null === this.holdTime &&
            (this.currentTime = s);
        let x = this.currentTime,
          b = i;
        if (u) {
          let t = Math.min(this.currentTime, s) / a,
            e = Math.floor(t),
            i = t % 1;
          !i && t >= 1 && (i = 1),
            1 === i && e--,
            (e = Math.min(e, u + 1)) % 2 &&
              ("reverse" === c
                ? ((i = 1 - i), p && (i -= p / a))
                : "mirror" === c && (b = r)),
            (x = d(0, 1, i) * a);
        }
        let w = v ? { done: !1, value: h[0] } : b.next(x);
        n && (w.value = n(w.value));
        let { done: T } = w;
        v ||
          null === o ||
          (T =
            this.playbackSpeed >= 0
              ? this.currentTime >= s
              : this.currentTime <= 0);
        let S =
          null === this.holdTime &&
          ("finished" === this.state || ("running" === this.state && T));
        return (
          S && m !== i1 && (w.value = tQ(h, this.options, g, this.speed)),
          f && f(w.value),
          S && this.finish(),
          w
        );
      }
      then(t, e) {
        return this.finished.then(t, e);
      }
      get duration() {
        return this.calculatedDuration / 1e3;
      }
      get iterationDuration() {
        let { delay: t = 0 } = this.options || {};
        return this.duration + t / 1e3;
      }
      get time() {
        return this.currentTime / 1e3;
      }
      set time(t) {
        (t = tH(t)),
          (this.currentTime = t),
          null === this.startTime ||
          null !== this.holdTime ||
          0 === this.playbackSpeed
            ? (this.holdTime = t)
            : this.driver &&
              (this.startTime = this.driver.now() - t / this.playbackSpeed),
          this.driver?.start(!1);
      }
      get speed() {
        return this.playbackSpeed;
      }
      set speed(t) {
        this.updateTime(es.now());
        let e = this.playbackSpeed !== t;
        (this.playbackSpeed = t), e && (this.time = this.currentTime / 1e3);
      }
      play() {
        if (this.isStopped) return;
        let { driver: t = i$, startTime: e } = this.options;
        this.driver || (this.driver = t((t) => this.tick(t))),
          this.options.onPlay?.();
        let i = this.driver.now();
        "finished" === this.state
          ? (this.updateFinished(), (this.startTime = i))
          : null !== this.holdTime
            ? (this.startTime = i - this.holdTime)
            : this.startTime || (this.startTime = e ?? i),
          "finished" === this.state &&
            this.speed < 0 &&
            (this.startTime += this.calculatedDuration),
          (this.holdTime = null),
          (this.state = "running"),
          this.driver.start();
      }
      pause() {
        (this.state = "paused"),
          this.updateTime(es.now()),
          (this.holdTime = this.currentTime);
      }
      complete() {
        "running" !== this.state && this.play(),
          (this.state = "finished"),
          (this.holdTime = null);
      }
      finish() {
        this.notifyFinished(),
          this.teardown(),
          (this.state = "finished"),
          this.options.onComplete?.();
      }
      cancel() {
        (this.holdTime = null),
          (this.startTime = 0),
          this.tick(0),
          this.teardown(),
          this.options.onCancel?.();
      }
      teardown() {
        (this.state = "idle"),
          this.stopDriver(),
          (this.startTime = this.holdTime = null),
          t1.mainThread--;
      }
      stopDriver() {
        this.driver && (this.driver.stop(), (this.driver = void 0));
      }
      sample(t) {
        return (this.startTime = 0), this.tick(t, !0);
      }
      attachTimeline(t) {
        return (
          this.options.allowFlatten &&
            ((this.options.type = "keyframes"),
            (this.options.ease = "linear"),
            this.initAnimation()),
          this.driver?.stop(),
          t.observe(this)
        );
      }
    }
    let sm = { anticipate: si, backInOut: se, circInOut: sr };
    class sf extends t7 {
      constructor(t) {
        !(function (t) {
          "string" == typeof t.ease && t.ease in sm && (t.ease = sm[t.ease]);
        })(t),
          sd(t),
          super(t),
          void 0 !== t.startTime && (this.startTime = t.startTime),
          (this.options = t);
      }
      updateMotionValue(t) {
        let {
          motionValue: e,
          onUpdate: i,
          onComplete: s,
          element: n,
          ...r
        } = this.options;
        if (!e) return;
        if (void 0 !== t) return void e.set(t);
        let a = new sp({ ...r, autoplay: !1 }),
          o = Math.max(10, es.now() - this.startTime),
          l = d(0, 10, o - 10);
        e.setWithVelocity(
          a.sample(Math.max(0, o - l)).value,
          a.sample(o).value,
          l,
        ),
          a.stop();
      }
    }
    let sg = (t, e) =>
      "zIndex" !== e &&
      !!(
        "number" == typeof t ||
        Array.isArray(t) ||
        ("string" == typeof t &&
          (W.test(t) || "0" === t) &&
          !t.startsWith("url("))
      );
    function sy(t) {
      (t.duration = 0), (t.type = "keyframes");
    }
    let sv = new Set(["opacity", "clipPath", "filter", "transform"]),
      sx = tK(() => Object.hasOwnProperty.call(Element.prototype, "animate"));
    class sb extends t0 {
      constructor({
        autoplay: t = !0,
        delay: e = 0,
        type: i = "keyframes",
        repeat: s = 0,
        repeatDelay: n = 0,
        repeatType: r = "loop",
        keyframes: a,
        name: o,
        motionValue: l,
        element: h,
        ...u
      }) {
        super(),
          (this.stop = () => {
            this._animation && (this._animation.stop(), this.stopTimeline?.()),
              this.keyframeResolver?.cancel();
          }),
          (this.createdAt = es.now());
        const d = {
            autoplay: t,
            delay: e,
            type: i,
            repeat: s,
            repeatDelay: n,
            repeatType: r,
            name: o,
            motionValue: l,
            element: h,
            ...u,
          },
          c = h?.KeyframeResolver || tU;
        (this.keyframeResolver = new c(
          a,
          (t, e, i) => this.onKeyframesResolved(t, e, d, !i),
          o,
          l,
          h,
        )),
          this.keyframeResolver?.scheduleResolve();
      }
      onKeyframesResolved(t, e, i, s) {
        this.keyframeResolver = void 0;
        let {
          name: n,
          type: r,
          velocity: a,
          delay: o,
          isHandoff: l,
          onUpdate: h,
        } = i;
        (this.resolvedAt = es.now()),
          !(function (t, e, i, s) {
            let n = t[0];
            if (null === n) return !1;
            if ("display" === e || "visibility" === e) return !0;
            let r = t[t.length - 1],
              a = sg(n, e),
              o = sg(r, e);
            return (
              tr(
                a === o,
                `You are trying to animate ${e} from "${n}" to "${r}". "${a ? r : n}" is not an animatable value.`,
                "value-not-animatable",
              ),
              !!a &&
                !!o &&
                ((function (t) {
                  let e = t[0];
                  if (1 === t.length) return !0;
                  for (let i = 0; i < t.length; i++) if (t[i] !== e) return !0;
                })(t) ||
                  (("spring" === i || t8(i)) && s))
            );
          })(t, n, r, a) &&
            ((tk.instantAnimations || !o) && h?.(tQ(t, i, e)),
            (t[0] = t[t.length - 1]),
            sy(i),
            (i.repeat = 0));
        let u = {
            startTime: s
              ? this.resolvedAt && this.resolvedAt - this.createdAt > 40
                ? this.resolvedAt
                : this.createdAt
              : void 0,
            finalKeyframe: e,
            ...i,
            keyframes: t,
          },
          d =
            !l &&
            (function (t) {
              let {
                motionValue: e,
                name: i,
                repeatDelay: s,
                repeatType: n,
                damping: r,
                type: a,
              } = t;
              if (!(e?.owner?.current instanceof HTMLElement)) return !1;
              let { onUpdate: o, transformTemplate: l } = e.owner.getProps();
              return (
                sx() &&
                i &&
                sv.has(i) &&
                ("transform" !== i || !l) &&
                !o &&
                !s &&
                "mirror" !== n &&
                0 !== r &&
                "inertia" !== a
              );
            })(u),
          c = u.motionValue?.owner?.current,
          p = d ? new sf({ ...u, element: c }) : new sp(u);
        p.finished
          .then(() => {
            this.notifyFinished();
          })
          .catch(tC),
          this.pendingTimeline &&
            ((this.stopTimeline = p.attachTimeline(this.pendingTimeline)),
            (this.pendingTimeline = void 0)),
          (this._animation = p);
      }
      get finished() {
        return this._animation ? this.animation.finished : this._finished;
      }
      then(t, e) {
        return this.finished.finally(t).then(() => {});
      }
      get animation() {
        return (
          this._animation ||
            (this.keyframeResolver?.resume(), (tO = !0), tz(), tW(), (tO = !1)),
          this._animation
        );
      }
      get duration() {
        return this.animation.duration;
      }
      get iterationDuration() {
        return this.animation.iterationDuration;
      }
      get time() {
        return this.animation.time;
      }
      set time(t) {
        this.animation.time = t;
      }
      get speed() {
        return this.animation.speed;
      }
      get state() {
        return this.animation.state;
      }
      set speed(t) {
        this.animation.speed = t;
      }
      get startTime() {
        return this.animation.startTime;
      }
      attachTimeline(t) {
        return (
          this._animation
            ? (this.stopTimeline = this.animation.attachTimeline(t))
            : (this.pendingTimeline = t),
          () => this.stop()
        );
      }
      play() {
        this.animation.play();
      }
      pause() {
        this.animation.pause();
      }
      complete() {
        this.animation.complete();
      }
      cancel() {
        this._animation && this.animation.cancel(),
          this.keyframeResolver?.cancel();
      }
    }
    let sw = { type: "spring", stiffness: 500, damping: 25, restSpeed: 10 },
      sT = { type: "keyframes", duration: 0.8 },
      sS = { type: "keyframes", ease: [0.25, 0.1, 0.35, 1], duration: 0.3 },
      sP = (t) => null !== t,
      sE =
        (t, e, i, s = {}, n, r) =>
        (a) => {
          let o = iE(s, t) || {},
            l = o.delay || s.delay || 0,
            { elapsed: h = 0 } = s;
          h -= tH(l);
          let d = {
            keyframes: Array.isArray(i) ? i : [null, i],
            ease: "easeOut",
            velocity: e.getVelocity(),
            ...o,
            delay: -h,
            onUpdate: (t) => {
              e.set(t), o.onUpdate && o.onUpdate(t);
            },
            onComplete: () => {
              a(), o.onComplete && o.onComplete();
            },
            name: t,
            motionValue: e,
            element: r ? void 0 : n,
          };
          !(function ({
            when: t,
            delay: e,
            delayChildren: i,
            staggerChildren: s,
            staggerDirection: n,
            repeat: r,
            repeatType: a,
            repeatDelay: o,
            from: l,
            elapsed: h,
            ...u
          }) {
            return !!Object.keys(u).length;
          })(o) &&
            Object.assign(
              d,
              ((t, { keyframes: e }) =>
                e.length > 2
                  ? sT
                  : u.has(t)
                    ? t.startsWith("scale")
                      ? {
                          type: "spring",
                          stiffness: 550,
                          damping: 0 === e[1] ? 2 * Math.sqrt(550) : 30,
                          restSpeed: 10,
                        }
                      : sw
                    : sS)(t, d),
            ),
            d.duration && (d.duration = tH(d.duration)),
            d.repeatDelay && (d.repeatDelay = tH(d.repeatDelay)),
            void 0 !== d.from && (d.keyframes[0] = d.from);
          let c = !1;
          if (
            ((!1 !== d.type && (0 !== d.duration || d.repeatDelay)) ||
              (sy(d), 0 === d.delay && (c = !0)),
            (tk.instantAnimations ||
              tk.skipAnimations ||
              n?.shouldSkipAnimations) &&
              ((c = !0), sy(d), (d.delay = 0)),
            (d.allowFlatten = !o.type && !o.ease),
            c && !r && void 0 !== e.get())
          ) {
            let t = (function (t, { repeat: e, repeatType: i = "loop" }, s) {
              let n = t.filter(sP),
                r = e && "loop" !== i && e % 2 == 1 ? 0 : n.length - 1;
              return n[r];
            })(d.keyframes, o);
            if (void 0 !== t)
              return void tR.update(() => {
                d.onUpdate(t), d.onComplete();
              });
          }
          return o.isSync ? new sp(d) : new sb(d);
        };
    function sA(t, e, { delay: i = 0, transitionOverride: s, type: n } = {}) {
      let { transition: r, transitionEnd: a, ...o } = e,
        l = t.getDefaultTransition();
      r = r ? iP(r, l) : l;
      let h = r?.reduceMotion;
      s && (r = s);
      let u = [],
        d = n && t.animationState && t.animationState.getState()[n];
      for (let e in o) {
        let s = t.getValue(e, t.latestValues[e] ?? null),
          n = o[e];
        if (
          void 0 === n ||
          (d &&
            (function ({ protectedKeys: t, needsAnimating: e }, i) {
              let s = t.hasOwnProperty(i) && !0 !== e[i];
              return (e[i] = !1), s;
            })(d, e))
        )
          continue;
        let a = { delay: i, ...iE(r || {}, e) },
          l = s.get();
        if (
          void 0 !== l &&
          !s.isAnimating &&
          !Array.isArray(n) &&
          n === l &&
          !a.velocity
        )
          continue;
        let c = !1;
        if (window.MotionHandoffAnimation) {
          let i = t.props[iy];
          if (i) {
            let t = window.MotionHandoffAnimation(i, e, tR);
            null !== t && ((a.startTime = t), (c = !0));
          }
        }
        iM(t, e);
        let p = h ?? t.shouldReduceMotion;
        s.start(sE(e, s, n, p && tt.has(e) ? { type: !1 } : a, t, c));
        let m = s.animation;
        m && u.push(m);
      }
      if (a) {
        let e = () =>
          tR.update(() => {
            a &&
              (function (t, e) {
                let {
                  transitionEnd: i = {},
                  transition: s = {},
                  ...n
                } = iS(t, e) || {};
                for (let e in (n = { ...n, ...i })) {
                  var r;
                  let i = iA((r = n[e])) ? r[r.length - 1] || 0 : r;
                  t.hasValue(e) ? t.getValue(e).set(i) : t.addValue(e, er(i));
                }
              })(t, a);
          });
        u.length ? Promise.all(u).then(e) : e();
      }
      return u;
    }
    function sM(t, e, i, s = 0, n = 1) {
      let r = Array.from(t)
          .sort((t, e) => t.sortNodePosition(e))
          .indexOf(e),
        a = t.size,
        o = (a - 1) * s;
      return "function" == typeof i ? i(r, a) : 1 === n ? r * s : o - r * s;
    }
    function sC(t, e, i = {}) {
      let s = iS(t, e, "exit" === i.type ? t.presenceContext?.custom : void 0),
        { transition: n = t.getDefaultTransition() || {} } = s || {};
      i.transitionOverride && (n = i.transitionOverride);
      let r = s ? () => Promise.all(sA(t, s, i)) : () => Promise.resolve(),
        a =
          t.variantChildren && t.variantChildren.size
            ? (s = 0) => {
                let {
                  delayChildren: r = 0,
                  staggerChildren: a,
                  staggerDirection: o,
                } = n;
                return (function (t, e, i = 0, s = 0, n = 0, r = 1, a) {
                  let o = [];
                  for (let l of t.variantChildren)
                    l.notify("AnimationStart", e),
                      o.push(
                        sC(l, e, {
                          ...a,
                          delay:
                            i +
                            ("function" == typeof s ? 0 : s) +
                            sM(t.variantChildren, l, s, n, r),
                        }).then(() => l.notify("AnimationComplete", e)),
                      );
                  return Promise.all(o);
                })(t, e, s, r, a, o, i);
              }
            : () => Promise.resolve(),
        { when: o } = n;
      if (!o) return Promise.all([r(), a(i.delay)]);
      {
        let [t, e] = "beforeChildren" === o ? [r, a] : [a, r];
        return t().then(() => e());
      }
    }
    let sk = ed.length;
    function sV(t, e) {
      if (!Array.isArray(e)) return !1;
      let i = e.length;
      if (i !== t.length) return !1;
      for (let s = 0; s < i; s++) if (e[s] !== t[s]) return !1;
      return !0;
    }
    let sj = [...eu].reverse(),
      sR = eu.length;
    function sL(t = !1) {
      return {
        isActive: t,
        protectedKeys: {},
        needsAnimating: {},
        prevResolvedValues: {},
      };
    }
    function sD() {
      return {
        animate: sL(!0),
        whileInView: sL(),
        whileHover: sL(),
        whileTap: sL(),
        whileDrag: sL(),
        whileFocus: sL(),
        exit: sL(),
      };
    }
    let sB = 0;
    function sF(t) {
      return [t("x"), t("y")];
    }
    let sN = new Set(["BUTTON", "INPUT", "SELECT", "TEXTAREA", "A"]),
      sI = new Set(["INPUT", "SELECT", "TEXTAREA"]);
    function sO(t, e, i, s = { passive: !0 }) {
      return t.addEventListener(e, i, s), () => t.removeEventListener(e, i);
    }
    let sW = { x: !1, y: !1 };
    function sz(t) {
      return t.max - t.min;
    }
    function sU(t, e, i, s = 0.5) {
      (t.origin = s),
        (t.originPoint = eN(e.min, e.max, t.origin)),
        (t.scale = sz(i) / sz(e)),
        (t.translate = eN(i.min, i.max, t.origin) - t.originPoint),
        ((t.scale >= 0.9999 && t.scale <= 1.0001) || isNaN(t.scale)) &&
          (t.scale = 1),
        ((t.translate >= -0.01 && t.translate <= 0.01) || isNaN(t.translate)) &&
          (t.translate = 0);
    }
    function s$(t, e, i, s) {
      sU(t.x, e.x, i.x, s ? s.originX : void 0),
        sU(t.y, e.y, i.y, s ? s.originY : void 0);
    }
    function sY(t, e, i) {
      (t.min = i.min + e.min), (t.max = t.min + sz(e));
    }
    function sX(t, e, i) {
      (t.min = e.min - i.min), (t.max = t.min + sz(e));
    }
    function sH(t, e, i) {
      sX(t.x, e.x, i.x), sX(t.y, e.y, i.y);
    }
    function sG(t) {
      return "object" == typeof t && null !== t;
    }
    function sq(t) {
      return sG(t) && "ownerSVGElement" in t;
    }
    function s_(t, e, i) {
      if (null == t) return [];
      if (t instanceof EventTarget) return [t];
      if ("string" == typeof t) {
        let s = document;
        e && (s = e.current);
        let n = i?.[t] ?? s.querySelectorAll(t);
        return n ? Array.from(n) : [];
      }
      return Array.from(t).filter((t) => null != t);
    }
    let sK = new WeakMap(),
      sZ = (t, e, i) => (s, n) =>
        n && n[0]
          ? n[0][t + "Size"]
          : sq(s) && "getBBox" in s
            ? s.getBBox()[e]
            : s[i],
      sJ = sZ("inline", "width", "offsetWidth"),
      sQ = sZ("block", "height", "offsetHeight");
    function s0({ target: t, borderBoxSize: e }) {
      sK.get(t)?.forEach((i) => {
        i(t, {
          get width() {
            return sJ(t, e);
          },
          get height() {
            return sQ(t, e);
          },
        });
      });
    }
    function s1(t) {
      t.forEach(s0);
    }
    let s5 = new Set();
    function s2(t, e) {
      let n;
      return "function" == typeof t
        ? (s5.add(t),
          s ||
            ((s = () => {
              let t = {
                get width() {
                  return window.innerWidth;
                },
                get height() {
                  return window.innerHeight;
                },
              };
              s5.forEach((e) => e(t));
            }),
            window.addEventListener("resize", s)),
          () => {
            s5.delete(t),
              s5.size ||
                "function" != typeof s ||
                (window.removeEventListener("resize", s), (s = void 0));
          })
        : (!i && "u" > typeof ResizeObserver && (i = new ResizeObserver(s1)),
          (n = s_(t)).forEach((t) => {
            let s = sK.get(t);
            s || ((s = new Set()), sK.set(t, s)), s.add(e), i?.observe(t);
          }),
          () => {
            n.forEach((t) => {
              let s = sK.get(t);
              s?.delete(e), s?.size || i?.unobserve(t);
            });
          });
    }
    let s3 = (t) =>
      "mouse" === t.pointerType
        ? "number" != typeof t.button || t.button <= 0
        : !1 !== t.isPrimary;
    function s4(t) {
      return { point: { x: t.pageX, y: t.pageY } };
    }
    function s9(t, e, i, s) {
      return sO(t, e, (t) => s3(t) && i(t, s4(t)), s);
    }
    let s6 = ({ current: t }) => (t ? t.ownerDocument.defaultView : null),
      s8 = (t, e) => Math.abs(t - e),
      s7 = new Set(["auto", "scroll"]);
    class nt {
      constructor(
        t,
        e,
        {
          transformPagePoint: i,
          contextWindow: s = window,
          dragSnapToOrigin: n = !1,
          distanceThreshold: r = 3,
          element: a,
        } = {},
      ) {
        if (
          ((this.startEvent = null),
          (this.lastMoveEvent = null),
          (this.lastMoveEventInfo = null),
          (this.handlers = {}),
          (this.contextWindow = window),
          (this.scrollPositions = new Map()),
          (this.removeScrollListeners = null),
          (this.onElementScroll = (t) => {
            this.handleScroll(t.target);
          }),
          (this.onWindowScroll = () => {
            this.handleScroll(window);
          }),
          (this.updatePoint = () => {
            var t, e;
            if (!(this.lastMoveEvent && this.lastMoveEventInfo)) return;
            let i = ns(this.lastMoveEventInfo, this.history),
              s = null !== this.startEvent,
              n =
                ((t = i.offset),
                (e = { x: 0, y: 0 }),
                Math.sqrt(s8(t.x, e.x) ** 2 + s8(t.y, e.y) ** 2) >=
                  this.distanceThreshold);
            if (!s && !n) return;
            let { point: r } = i,
              { timestamp: a } = tD;
            this.history.push({ ...r, timestamp: a });
            let { onStart: o, onMove: l } = this.handlers;
            s ||
              (o && o(this.lastMoveEvent, i),
              (this.startEvent = this.lastMoveEvent)),
              l && l(this.lastMoveEvent, i);
          }),
          (this.handlePointerMove = (t, e) => {
            (this.lastMoveEvent = t),
              (this.lastMoveEventInfo = ne(e, this.transformPagePoint)),
              tR.update(this.updatePoint, !0);
          }),
          (this.handlePointerUp = (t, e) => {
            this.end();
            let {
              onEnd: i,
              onSessionEnd: s,
              resumeAnimation: n,
            } = this.handlers;
            if (
              ((this.dragSnapToOrigin || !this.startEvent) && n && n(),
              !(this.lastMoveEvent && this.lastMoveEventInfo))
            )
              return;
            let r = ns(
              "pointercancel" === t.type
                ? this.lastMoveEventInfo
                : ne(e, this.transformPagePoint),
              this.history,
            );
            this.startEvent && i && i(t, r), s && s(t, r);
          }),
          !s3(t))
        )
          return;
        (this.dragSnapToOrigin = n),
          (this.handlers = e),
          (this.transformPagePoint = i),
          (this.distanceThreshold = r),
          (this.contextWindow = s || window);
        const o = ne(s4(t), this.transformPagePoint),
          { point: l } = o,
          { timestamp: h } = tD;
        this.history = [{ ...l, timestamp: h }];
        const { onSessionStart: u } = e;
        u && u(t, ns(o, this.history)),
          (this.removeListeners = ik(
            s9(this.contextWindow, "pointermove", this.handlePointerMove),
            s9(this.contextWindow, "pointerup", this.handlePointerUp),
            s9(this.contextWindow, "pointercancel", this.handlePointerUp),
          )),
          a && this.startScrollTracking(a);
      }
      startScrollTracking(t) {
        let e = t.parentElement;
        for (; e; ) {
          let t = getComputedStyle(e);
          (s7.has(t.overflowX) || s7.has(t.overflowY)) &&
            this.scrollPositions.set(e, { x: e.scrollLeft, y: e.scrollTop }),
            (e = e.parentElement);
        }
        this.scrollPositions.set(window, {
          x: window.scrollX,
          y: window.scrollY,
        }),
          window.addEventListener("scroll", this.onElementScroll, {
            capture: !0,
            passive: !0,
          }),
          window.addEventListener("scroll", this.onWindowScroll, {
            passive: !0,
          }),
          (this.removeScrollListeners = () => {
            window.removeEventListener("scroll", this.onElementScroll, {
              capture: !0,
            }),
              window.removeEventListener("scroll", this.onWindowScroll);
          });
      }
      handleScroll(t) {
        let e = this.scrollPositions.get(t);
        if (!e) return;
        let i = t === window,
          s = i
            ? { x: window.scrollX, y: window.scrollY }
            : { x: t.scrollLeft, y: t.scrollTop },
          n = { x: s.x - e.x, y: s.y - e.y };
        (0 !== n.x || 0 !== n.y) &&
          (i
            ? this.lastMoveEventInfo &&
              ((this.lastMoveEventInfo.point.x += n.x),
              (this.lastMoveEventInfo.point.y += n.y))
            : this.history.length > 0 &&
              ((this.history[0].x -= n.x), (this.history[0].y -= n.y)),
          this.scrollPositions.set(t, s),
          tR.update(this.updatePoint, !0));
      }
      updateHandlers(t) {
        this.handlers = t;
      }
      end() {
        this.removeListeners && this.removeListeners(),
          this.removeScrollListeners && this.removeScrollListeners(),
          this.scrollPositions.clear(),
          tL(this.updatePoint);
      }
    }
    function ne(t, e) {
      return e ? { point: e(t.point) } : t;
    }
    function ni(t, e) {
      return { x: t.x - e.x, y: t.y - e.y };
    }
    function ns({ point: t }, e) {
      return {
        point: t,
        delta: ni(t, nn(e)),
        offset: ni(t, e[0]),
        velocity: (function (t, e) {
          if (t.length < 2) return { x: 0, y: 0 };
          let i = t.length - 1,
            s = null,
            n = nn(t);
          for (
            ;
            i >= 0 && ((s = t[i]), !(n.timestamp - s.timestamp > tH(0.1)));

          )
            i--;
          if (!s) return { x: 0, y: 0 };
          s === t[0] &&
            t.length > 2 &&
            n.timestamp - s.timestamp > 2 * tH(0.1) &&
            (s = t[1]);
          let r = (n.timestamp - s.timestamp) / 1e3;
          if (0 === r) return { x: 0, y: 0 };
          let a = { x: (n.x - s.x) / r, y: (n.y - s.y) / r };
          return a.x === 1 / 0 && (a.x = 0), a.y === 1 / 0 && (a.y = 0), a;
        })(e, 0.1),
      };
    }
    function nn(t) {
      return t[t.length - 1];
    }
    function nr(t, e, i) {
      return {
        min: void 0 !== e ? t.min + e : void 0,
        max: void 0 !== i ? t.max + i - (t.max - t.min) : void 0,
      };
    }
    function na(t, e) {
      let i = e.min - t.min,
        s = e.max - t.max;
      return (
        e.max - e.min < t.max - t.min && ([i, s] = [s, i]), { min: i, max: s }
      );
    }
    function no(t, e, i) {
      return { min: nl(t, e), max: nl(t, i) };
    }
    function nl(t, e) {
      return "number" == typeof t ? t : t[e] || 0;
    }
    let nh = new WeakMap();
    class nu {
      constructor(t) {
        (this.openDragLock = null),
          (this.isDragging = !1),
          (this.currentDirection = null),
          (this.originPoint = { x: 0, y: 0 }),
          (this.constraints = !1),
          (this.hasMutatedConstraints = !1),
          (this.elastic = J()),
          (this.latestPointerEvent = null),
          (this.latestPanInfo = null),
          (this.visualElement = t);
      }
      start(t, { snapToCursor: e = !1, distanceThreshold: i } = {}) {
        let { presenceContext: s } = this.visualElement;
        if (s && !1 === s.isPresent) return;
        let n = (t) => {
            e && this.snapToCursor(s4(t).point), this.stopAnimation();
          },
          r = (t, e) => {
            let {
              drag: i,
              dragPropagation: s,
              onDragStart: n,
            } = this.getProps();
            if (
              i &&
              !s &&
              (this.openDragLock && this.openDragLock(),
              (this.openDragLock = (function (t) {
                if ("x" === t || "y" === t)
                  if (sW[t]) return null;
                  else
                    return (
                      (sW[t] = !0),
                      () => {
                        sW[t] = !1;
                      }
                    );
                return sW.x || sW.y
                  ? null
                  : ((sW.x = sW.y = !0),
                    () => {
                      sW.x = sW.y = !1;
                    });
              })(i)),
              !this.openDragLock)
            )
              return;
            (this.latestPointerEvent = t),
              (this.latestPanInfo = e),
              (this.isDragging = !0),
              (this.currentDirection = null),
              this.resolveConstraints(),
              this.visualElement.projection &&
                ((this.visualElement.projection.isAnimationBlocked = !0),
                (this.visualElement.projection.target = void 0)),
              sF((t) => {
                let e = this.getAxisMotionValue(t).get() || 0;
                if (E.test(e)) {
                  let { projection: i } = this.visualElement;
                  if (i && i.layout) {
                    let s = i.layout.layoutBox[t];
                    s && (e = sz(s) * (parseFloat(e) / 100));
                  }
                }
                this.originPoint[t] = e;
              }),
              n && tR.update(() => n(t, e), !1, !0),
              iM(this.visualElement, "transform");
            let { animationState: r } = this.visualElement;
            r && r.setActive("whileDrag", !0);
          },
          a = (t, e) => {
            (this.latestPointerEvent = t), (this.latestPanInfo = e);
            let {
              dragPropagation: i,
              dragDirectionLock: s,
              onDirectionLock: n,
              onDrag: r,
            } = this.getProps();
            if (!i && !this.openDragLock) return;
            let { offset: a } = e;
            if (s && null === this.currentDirection) {
              (this.currentDirection = (function (t, e = 10) {
                let i = null;
                return (
                  Math.abs(t.y) > e
                    ? (i = "y")
                    : Math.abs(t.x) > e && (i = "x"),
                  i
                );
              })(a)),
                null !== this.currentDirection && n && n(this.currentDirection);
              return;
            }
            this.updateAxis("x", e.point, a),
              this.updateAxis("y", e.point, a),
              this.visualElement.render(),
              r && tR.update(() => r(t, e), !1, !0);
          },
          o = (t, e) => {
            (this.latestPointerEvent = t),
              (this.latestPanInfo = e),
              this.stop(t, e),
              (this.latestPointerEvent = null),
              (this.latestPanInfo = null);
          },
          l = () => {
            let { dragSnapToOrigin: t } = this.getProps();
            (t || this.constraints) && this.startAnimation({ x: 0, y: 0 });
          },
          { dragSnapToOrigin: h } = this.getProps();
        this.panSession = new nt(
          t,
          {
            onSessionStart: n,
            onStart: r,
            onMove: a,
            onSessionEnd: o,
            resumeAnimation: l,
          },
          {
            transformPagePoint: this.visualElement.getTransformPagePoint(),
            dragSnapToOrigin: h,
            distanceThreshold: i,
            contextWindow: s6(this.visualElement),
            element: this.visualElement.current,
          },
        );
      }
      stop(t, e) {
        let i = t || this.latestPointerEvent,
          s = e || this.latestPanInfo,
          n = this.isDragging;
        if ((this.cancel(), !n || !s || !i)) return;
        let { velocity: r } = s;
        this.startAnimation(r);
        let { onDragEnd: a } = this.getProps();
        a && tR.postRender(() => a(i, s));
      }
      cancel() {
        this.isDragging = !1;
        let { projection: t, animationState: e } = this.visualElement;
        t && (t.isAnimationBlocked = !1), this.endPanSession();
        let { dragPropagation: i } = this.getProps();
        !i &&
          this.openDragLock &&
          (this.openDragLock(), (this.openDragLock = null)),
          e && e.setActive("whileDrag", !1);
      }
      endPanSession() {
        this.panSession && this.panSession.end(), (this.panSession = void 0);
      }
      updateAxis(t, e, i) {
        let { drag: s } = this.getProps();
        if (!i || !nc(t, s, this.currentDirection)) return;
        let n = this.getAxisMotionValue(t),
          r = this.originPoint[t] + i[t];
        this.constraints &&
          this.constraints[t] &&
          (r = (function (t, { min: e, max: i }, s) {
            return (
              void 0 !== e && t < e
                ? (t = s ? eN(e, t, s.min) : Math.max(t, e))
                : void 0 !== i &&
                  t > i &&
                  (t = s ? eN(i, t, s.max) : Math.min(t, i)),
              t
            );
          })(r, this.constraints[t], this.elastic[t])),
          n.set(r);
      }
      resolveConstraints() {
        let { dragConstraints: t, dragElastic: e } = this.getProps(),
          i =
            this.visualElement.projection &&
            !this.visualElement.projection.layout
              ? this.visualElement.projection.measure(!1)
              : this.visualElement.projection?.layout,
          s = this.constraints;
        t && ix(t)
          ? this.constraints ||
            (this.constraints = this.resolveRefConstraints())
          : t && i
            ? (this.constraints = (function (
                t,
                { top: e, left: i, bottom: s, right: n },
              ) {
                return { x: nr(t.x, i, n), y: nr(t.y, e, s) };
              })(i.layoutBox, t))
            : (this.constraints = !1),
          (this.elastic = (function (t = 0.35) {
            return (
              !1 === t ? (t = 0) : !0 === t && (t = 0.35),
              { x: no(t, "left", "right"), y: no(t, "top", "bottom") }
            );
          })(e)),
          s !== this.constraints &&
            !ix(t) &&
            i &&
            this.constraints &&
            !this.hasMutatedConstraints &&
            sF((t) => {
              var e, s;
              let n;
              !1 !== this.constraints &&
                this.getAxisMotionValue(t) &&
                (this.constraints[t] =
                  ((e = i.layoutBox[t]),
                  (s = this.constraints[t]),
                  (n = {}),
                  void 0 !== s.min && (n.min = s.min - e.min),
                  void 0 !== s.max && (n.max = s.max - e.min),
                  n));
            });
      }
      resolveRefConstraints() {
        var t;
        let { dragConstraints: e, onMeasureDragConstraints: i } =
          this.getProps();
        if (!e || !ix(e)) return !1;
        let s = e.current;
        ta(
          null !== s,
          "If `dragConstraints` is set as a React ref, that ref must be passed to another component's `ref` prop.",
          "drag-constraints-ref",
        );
        let { projection: n } = this.visualElement;
        if (!n || !n.layout) return !1;
        let r = (function (t, e, i) {
            let s = e0(t, i),
              { scroll: n } = e;
            return n && (eZ(s.x, n.offset.x), eZ(s.y, n.offset.y)), s;
          })(s, n.root, this.visualElement.getTransformPagePoint()),
          a = ((t = n.layout.layoutBox), { x: na(t.x, r.x), y: na(t.y, r.y) });
        if (i) {
          let t = i(
            (function ({ x: t, y: e }) {
              return { top: e.min, right: t.max, bottom: e.max, left: t.min };
            })(a),
          );
          (this.hasMutatedConstraints = !!t), t && (a = e$(t));
        }
        return a;
      }
      startAnimation(t) {
        let {
            drag: e,
            dragMomentum: i,
            dragElastic: s,
            dragTransition: n,
            dragSnapToOrigin: r,
            onDragTransitionEnd: a,
          } = this.getProps(),
          o = this.constraints || {};
        return Promise.all(
          sF((a) => {
            if (!nc(a, e, this.currentDirection)) return;
            let l = (o && o[a]) || {};
            r && (l = { min: 0, max: 0 });
            let h = {
              type: "inertia",
              velocity: i ? t[a] : 0,
              bounceStiffness: s ? 200 : 1e6,
              bounceDamping: s ? 40 : 1e7,
              timeConstant: 750,
              restDelta: 1,
              restSpeed: 10,
              ...n,
              ...l,
            };
            return this.startAxisValueAnimation(a, h);
          }),
        ).then(a);
      }
      startAxisValueAnimation(t, e) {
        let i = this.getAxisMotionValue(t);
        return (
          iM(this.visualElement, t),
          i.start(sE(t, i, 0, e, this.visualElement, !1))
        );
      }
      stopAnimation() {
        sF((t) => this.getAxisMotionValue(t).stop());
      }
      getAxisMotionValue(t) {
        let e = `_drag${t.toUpperCase()}`,
          i = this.visualElement.getProps();
        return (
          i[e] ||
          this.visualElement.getValue(
            t,
            (i.initial ? i.initial[t] : void 0) || 0,
          )
        );
      }
      snapToCursor(t) {
        sF((e) => {
          let { drag: i } = this.getProps();
          if (!nc(e, i, this.currentDirection)) return;
          let { projection: s } = this.visualElement,
            n = this.getAxisMotionValue(e);
          if (s && s.layout) {
            let { min: i, max: r } = s.layout.layoutBox[e],
              a = n.get() || 0;
            n.set(t[e] - eN(i, r, 0.5) + a);
          }
        });
      }
      scalePositionWithinConstraints() {
        if (!this.visualElement.current) return;
        let { drag: t, dragConstraints: e } = this.getProps(),
          { projection: i } = this.visualElement;
        if (!ix(e) || !i || !this.constraints) return;
        this.stopAnimation();
        let s = { x: 0, y: 0 };
        sF((t) => {
          let e = this.getAxisMotionValue(t);
          if (e && !1 !== this.constraints) {
            var i, n;
            let r,
              a,
              o,
              l = e.get();
            s[t] =
              ((i = { min: l, max: l }),
              (n = this.constraints[t]),
              (r = 0.5),
              (a = sz(i)),
              (o = sz(n)) > a
                ? (r = sl(n.min, n.max - a, i.min))
                : a > o && (r = sl(i.min, i.max - o, n.min)),
              d(0, 1, r));
          }
        });
        let { transformTemplate: n } = this.visualElement.getProps();
        (this.visualElement.current.style.transform = n ? n({}, "") : "none"),
          i.root && i.root.updateScroll(),
          i.updateLayout(),
          (this.constraints = !1),
          this.resolveConstraints(),
          sF((e) => {
            if (!nc(e, t, null)) return;
            let i = this.getAxisMotionValue(e),
              { min: n, max: r } = this.constraints[e];
            i.set(eN(n, r, s[e]));
          }),
          this.visualElement.render();
      }
      addListeners() {
        let t;
        if (!this.visualElement.current) return;
        nh.set(this.visualElement, this);
        let e = this.visualElement.current,
          i = s9(e, "pointerdown", (t) => {
            let { drag: i, dragListener: s = !0 } = this.getProps(),
              n = t.target,
              r = n !== e && (sI.has(n.tagName) || !0 === n.isContentEditable);
            i && s && !r && this.start(t);
          }),
          s = () => {
            var i, s, n;
            let r,
              a,
              { dragConstraints: o } = this.getProps();
            ix(o) &&
              o.current &&
              ((this.constraints = this.resolveRefConstraints()),
              t ||
                ((i = e),
                (s = o.current),
                (r = s2(
                  i,
                  nd((n = () => this.scalePositionWithinConstraints())),
                )),
                (a = s2(s, nd(n))),
                (t = () => {
                  r(), a();
                })));
          },
          { projection: n } = this.visualElement,
          r = n.addEventListener("measure", s);
        n && !n.layout && (n.root && n.root.updateScroll(), n.updateLayout()),
          tR.read(s);
        let a = sO(window, "resize", () =>
            this.scalePositionWithinConstraints(),
          ),
          o = n.addEventListener(
            "didUpdate",
            ({ delta: t, hasLayoutChanged: e }) => {
              this.isDragging &&
                e &&
                (sF((e) => {
                  let i = this.getAxisMotionValue(e);
                  i &&
                    ((this.originPoint[e] += t[e].translate),
                    i.set(i.get() + t[e].translate));
                }),
                this.visualElement.render());
            },
          );
        return () => {
          a(), i(), r(), o && o(), t && t();
        };
      }
      getProps() {
        let t = this.visualElement.getProps(),
          {
            drag: e = !1,
            dragDirectionLock: i = !1,
            dragPropagation: s = !1,
            dragConstraints: n = !1,
            dragElastic: r = 0.35,
            dragMomentum: a = !0,
          } = t;
        return {
          ...t,
          drag: e,
          dragDirectionLock: i,
          dragPropagation: s,
          dragConstraints: n,
          dragElastic: r,
          dragMomentum: a,
        };
      }
    }
    function nd(t) {
      let e = !0;
      return () => {
        if (e) {
          e = !1;
          return;
        }
        t();
      };
    }
    function nc(t, e, i) {
      return (!0 === e || e === t) && (null === i || i === t);
    }
    let np = (t) => (e, i) => {
        t && tR.update(() => t(e, i), !1, !0);
      },
      nm = { hasAnimatedSinceResize: !0, hasEverUpdated: !1 };
    var nf = l;
    let ng = !1;
    class ny extends nf.Component {
      componentDidMount() {
        let {
            visualElement: t,
            layoutGroup: e,
            switchLayoutGroup: i,
            layoutId: s,
          } = this.props,
          { projection: n } = t;
        n &&
          (e.group && e.group.add(n),
          i && i.register && s && i.register(n),
          ng && n.root.didUpdate(),
          n.addEventListener("animationComplete", () => {
            this.safeToRemove();
          }),
          n.setOptions({
            ...n.options,
            layoutDependency: this.props.layoutDependency,
            onExitComplete: () => this.safeToRemove(),
          })),
          (nm.hasEverUpdated = !0);
      }
      getSnapshotBeforeUpdate(t) {
        let {
            layoutDependency: e,
            visualElement: i,
            drag: s,
            isPresent: n,
          } = this.props,
          { projection: r } = i;
        return (
          r &&
            ((r.isPresent = n),
            t.layoutDependency !== e &&
              r.setOptions({ ...r.options, layoutDependency: e }),
            (ng = !0),
            s || t.layoutDependency !== e || void 0 === e || t.isPresent !== n
              ? r.willUpdate()
              : this.safeToRemove(),
            t.isPresent !== n &&
              (n
                ? r.promote()
                : r.relegate() ||
                  tR.postRender(() => {
                    let t = r.getStack();
                    (t && t.members.length) || this.safeToRemove();
                  }))),
          null
        );
      }
      componentDidUpdate() {
        let { projection: t } = this.props.visualElement;
        t &&
          (t.root.didUpdate(),
          ee.postRender(() => {
            !t.currentAnimation && t.isLead() && this.safeToRemove();
          }));
      }
      componentWillUnmount() {
        let {
            visualElement: t,
            layoutGroup: e,
            switchLayoutGroup: i,
          } = this.props,
          { projection: s } = t;
        (ng = !0),
          s &&
            (s.scheduleCheckAfterUnmount(),
            e && e.group && e.group.remove(s),
            i && i.deregister && i.deregister(s));
      }
      safeToRemove() {
        let { safeToRemove: t } = this.props;
        t && t();
      }
      render() {
        return null;
      }
    }
    function nv(t) {
      let [e, i] = (function (t = !0) {
          let e = (0, l.useContext)(io);
          if (null === e) return [!0, null];
          let { isPresent: i, onExitComplete: s, register: n } = e,
            r = (0, l.useId)();
          (0, l.useEffect)(() => {
            if (t) return n(r);
          }, [t]);
          let a = (0, l.useCallback)(() => t && s && s(r), [r, s, t]);
          return !i && s ? [!1, a] : [!0];
        })(),
        s = (0, nf.useContext)(e3);
      return (0, o.jsx)(ny, {
        ...t,
        layoutGroup: s,
        switchLayoutGroup: (0, nf.useContext)(iv),
        isPresent: e,
        safeToRemove: i,
      });
    }
    let nx = ["TopLeft", "TopRight", "BottomLeft", "BottomRight"],
      nb = nx.length,
      nw = (t) => ("string" == typeof t ? parseFloat(t) : t),
      nT = (t) => "number" == typeof t || A.test(t);
    function nS(t, e) {
      return void 0 !== t[e] ? t[e] : t.borderRadius;
    }
    let nP = nA(0, 0.5, sn),
      nE = nA(0.5, 0.95, tC);
    function nA(t, e, i) {
      return (s) => (s < t ? 0 : s > e ? 1 : i(sl(t, e, s)));
    }
    function nM(t, e) {
      (t.min = e.min), (t.max = e.max);
    }
    function nC(t, e) {
      nM(t.x, e.x), nM(t.y, e.y);
    }
    function nk(t, e) {
      (t.translate = e.translate),
        (t.scale = e.scale),
        (t.originPoint = e.originPoint),
        (t.origin = e.origin);
    }
    function nV(t, e, i, s, n) {
      return (
        (t -= e),
        (t = s + (1 / i) * (t - s)),
        void 0 !== n && (t = s + (1 / n) * (t - s)),
        t
      );
    }
    function nj(t, e, [i, s, n], r, a) {
      !(function (t, e = 0, i = 1, s = 0.5, n, r = t, a = t) {
        if (
          (E.test(e) &&
            ((e = parseFloat(e)), (e = eN(a.min, a.max, e / 100) - a.min)),
          "number" != typeof e)
        )
          return;
        let o = eN(r.min, r.max, s);
        t === r && (o -= e),
          (t.min = nV(t.min, e, i, o, n)),
          (t.max = nV(t.max, e, i, o, n));
      })(t, e[i], e[s], e[n], e.scale, r, a);
    }
    let nR = ["x", "scaleX", "originX"],
      nL = ["y", "scaleY", "originY"];
    function nD(t, e, i, s) {
      nj(t.x, e, nR, i ? i.x : void 0, s ? s.x : void 0),
        nj(t.y, e, nL, i ? i.y : void 0, s ? s.y : void 0);
    }
    function nB(t) {
      return 0 === t.translate && 1 === t.scale;
    }
    function nF(t) {
      return nB(t.x) && nB(t.y);
    }
    function nN(t, e) {
      return t.min === e.min && t.max === e.max;
    }
    function nI(t, e) {
      return (
        Math.round(t.min) === Math.round(e.min) &&
        Math.round(t.max) === Math.round(e.max)
      );
    }
    function nO(t, e) {
      return nI(t.x, e.x) && nI(t.y, e.y);
    }
    function nW(t) {
      return sz(t.x) / sz(t.y);
    }
    function nz(t, e) {
      return (
        t.translate === e.translate &&
        t.scale === e.scale &&
        t.originPoint === e.originPoint
      );
    }
    class nU {
      constructor() {
        this.members = [];
      }
      add(t) {
        tG(this.members, t);
        for (let e = this.members.length - 1; e >= 0; e--) {
          let i = this.members[e];
          if (i === t || i === this.lead || i === this.prevLead) continue;
          let s = i.instance;
          s &&
            !1 === s.isConnected &&
            !1 !== i.isPresent &&
            !i.snapshot &&
            tq(this.members, i);
        }
        t.scheduleRender();
      }
      remove(t) {
        if (
          (tq(this.members, t),
          t === this.prevLead && (this.prevLead = void 0),
          t === this.lead)
        ) {
          let t = this.members[this.members.length - 1];
          t && this.promote(t);
        }
      }
      relegate(t) {
        let e,
          i = this.members.findIndex((e) => t === e);
        if (0 === i) return !1;
        for (let t = i; t >= 0; t--) {
          let i = this.members[t],
            s = i.instance;
          if (!1 !== i.isPresent && (!s || !1 !== s.isConnected)) {
            e = i;
            break;
          }
        }
        return !!e && (this.promote(e), !0);
      }
      promote(t, e) {
        let i = this.lead;
        if (t !== i && ((this.prevLead = i), (this.lead = t), t.show(), i)) {
          i.instance && i.scheduleRender(), t.scheduleRender();
          let s = i.options.layoutDependency,
            n = t.options.layoutDependency;
          if (void 0 === s || void 0 === n || s !== n) {
            let s = i.instance;
            !(s && !1 === s.isConnected && !i.snapshot) &&
              ((t.resumeFrom = i),
              e && (t.resumeFrom.preserveOpacity = !0),
              i.snapshot &&
                ((t.snapshot = i.snapshot),
                (t.snapshot.latestValues =
                  i.animationValues || i.latestValues)),
              t.root && t.root.isUpdating && (t.isLayoutDirty = !0));
          }
          let { crossfade: r } = t.options;
          !1 === r && i.hide();
        }
      }
      exitAnimationComplete() {
        this.members.forEach((t) => {
          let { options: e, resumingFrom: i } = t;
          e.onExitComplete && e.onExitComplete(),
            i && i.options.onExitComplete && i.options.onExitComplete();
        });
      }
      scheduleRender() {
        this.members.forEach((t) => {
          t.instance && t.scheduleRender(!1);
        });
      }
      removeLeadSnapshot() {
        this.lead && this.lead.snapshot && (this.lead.snapshot = void 0);
      }
    }
    let n$ = (t, e) => t.depth - e.depth;
    class nY {
      constructor() {
        (this.children = []), (this.isDirty = !1);
      }
      add(t) {
        tG(this.children, t), (this.isDirty = !0);
      }
      remove(t) {
        tq(this.children, t), (this.isDirty = !0);
      }
      forEach(t) {
        this.isDirty && this.children.sort(n$),
          (this.isDirty = !1),
          this.children.forEach(t);
      }
    }
    let nX = ["", "X", "Y", "Z"],
      nH = 0;
    function nG(t, e, i, s) {
      let { latestValues: n } = e;
      n[t] && ((i[t] = n[t]), e.setStaticValue(t, 0), s && (s[t] = 0));
    }
    function nq({
      attachResizeListener: t,
      defaultParent: e,
      measureScroll: i,
      checkIsScrollRoot: s,
      resetTransform: n,
    }) {
      return class {
        constructor(t = {}, i = e?.()) {
          (this.id = nH++),
            (this.animationId = 0),
            (this.animationCommitId = 0),
            (this.children = new Set()),
            (this.options = {}),
            (this.isTreeAnimating = !1),
            (this.isAnimationBlocked = !1),
            (this.isLayoutDirty = !1),
            (this.isProjectionDirty = !1),
            (this.isSharedProjectionDirty = !1),
            (this.isTransformDirty = !1),
            (this.updateManuallyBlocked = !1),
            (this.updateBlockedByResize = !1),
            (this.isUpdating = !1),
            (this.isSVG = !1),
            (this.needsReset = !1),
            (this.shouldResetTransform = !1),
            (this.hasCheckedOptimisedAppear = !1),
            (this.treeScale = { x: 1, y: 1 }),
            (this.eventHandlers = new Map()),
            (this.hasTreeAnimated = !1),
            (this.layoutVersion = 0),
            (this.updateScheduled = !1),
            (this.scheduleUpdate = () => this.update()),
            (this.projectionUpdateScheduled = !1),
            (this.checkUpdateFailed = () => {
              this.isUpdating &&
                ((this.isUpdating = !1), this.clearAllSnapshots());
            }),
            (this.updateProjection = () => {
              (this.projectionUpdateScheduled = !1),
                this.nodes.forEach(nZ),
                this.nodes.forEach(n3),
                this.nodes.forEach(n4),
                this.nodes.forEach(nJ);
            }),
            (this.resolvedRelativeTargetAt = 0),
            (this.linkedParentVersion = 0),
            (this.hasProjected = !1),
            (this.isVisible = !0),
            (this.animationProgress = 0),
            (this.sharedNodes = new Map()),
            (this.latestValues = t),
            (this.root = i ? i.root || i : this),
            (this.path = i ? [...i.path, i] : []),
            (this.parent = i),
            (this.depth = i ? i.depth + 1 : 0);
          for (let t = 0; t < this.path.length; t++)
            this.path[t].shouldResetTransform = !0;
          this.root === this && (this.nodes = new nY());
        }
        addEventListener(t, e) {
          return (
            this.eventHandlers.has(t) || this.eventHandlers.set(t, new t_()),
            this.eventHandlers.get(t).add(e)
          );
        }
        notifyListeners(t, ...e) {
          let i = this.eventHandlers.get(t);
          i && i.notify(...e);
        }
        hasListeners(t) {
          return this.eventHandlers.has(t);
        }
        mount(e) {
          if (this.instance) return;
          (this.isSVG = sq(e) && !(sq(e) && "svg" === e.tagName)),
            (this.instance = e);
          let { layoutId: i, layout: s, visualElement: n } = this.options;
          if (
            (n && !n.current && n.mount(e),
            this.root.nodes.add(this),
            this.parent && this.parent.children.add(this),
            this.root.hasTreeAnimated && (s || i) && (this.isLayoutDirty = !0),
            t)
          ) {
            let i,
              s = 0,
              n = () => (this.root.updateBlockedByResize = !1);
            tR.read(() => {
              s = window.innerWidth;
            }),
              t(e, () => {
                let t = window.innerWidth;
                if (t !== s) {
                  let e, r;
                  (s = t),
                    (this.root.updateBlockedByResize = !0),
                    i && i(),
                    (e = es.now()),
                    (r = ({ timestamp: t }) => {
                      let i = t - e;
                      i >= 250 && (tL(r), n(i - 250));
                    }),
                    tR.setup(r, !0),
                    (i = () => tL(r)),
                    nm.hasAnimatedSinceResize &&
                      ((nm.hasAnimatedSinceResize = !1),
                      this.nodes.forEach(n2));
                }
              });
          }
          i && this.root.registerSharedNode(i, this),
            !1 !== this.options.animate &&
              n &&
              (i || s) &&
              this.addEventListener(
                "didUpdate",
                ({
                  delta: t,
                  hasLayoutChanged: e,
                  hasRelativeLayoutChanged: i,
                  layout: s,
                }) => {
                  if (this.isTreeAnimationBlocked()) {
                    (this.target = void 0), (this.relativeTarget = void 0);
                    return;
                  }
                  let r =
                      this.options.transition || n.getDefaultTransition() || re,
                    {
                      onLayoutAnimationStart: a,
                      onLayoutAnimationComplete: o,
                    } = n.getProps(),
                    l = !this.targetLayout || !nO(this.targetLayout, s),
                    h = !e && i;
                  if (
                    this.options.layoutRoot ||
                    this.resumeFrom ||
                    h ||
                    (e && (l || !this.currentAnimation))
                  ) {
                    this.resumeFrom &&
                      ((this.resumingFrom = this.resumeFrom),
                      (this.resumingFrom.resumingFrom = void 0));
                    let e = { ...iE(r, "layout"), onPlay: a, onComplete: o };
                    (n.shouldReduceMotion || this.options.layoutRoot) &&
                      ((e.delay = 0), (e.type = !1)),
                      this.startAnimation(e),
                      this.setAnimationOrigin(t, h);
                  } else
                    e || n2(this),
                      this.isLead() &&
                        this.options.onExitComplete &&
                        this.options.onExitComplete();
                  this.targetLayout = s;
                },
              );
        }
        unmount() {
          this.options.layoutId && this.willUpdate(),
            this.root.nodes.remove(this);
          let t = this.getStack();
          t && t.remove(this),
            this.parent && this.parent.children.delete(this),
            (this.instance = void 0),
            this.eventHandlers.clear(),
            tL(this.updateProjection);
        }
        blockUpdate() {
          this.updateManuallyBlocked = !0;
        }
        unblockUpdate() {
          this.updateManuallyBlocked = !1;
        }
        isUpdateBlocked() {
          return this.updateManuallyBlocked || this.updateBlockedByResize;
        }
        isTreeAnimationBlocked() {
          return (
            this.isAnimationBlocked ||
            (this.parent && this.parent.isTreeAnimationBlocked()) ||
            !1
          );
        }
        startUpdate() {
          !this.isUpdateBlocked() &&
            ((this.isUpdating = !0),
            this.nodes && this.nodes.forEach(n9),
            this.animationId++);
        }
        getTransformTemplate() {
          let { visualElement: t } = this.options;
          return t && t.getProps().transformTemplate;
        }
        willUpdate(t = !0) {
          if (((this.root.hasTreeAnimated = !0), this.root.isUpdateBlocked())) {
            this.options.onExitComplete && this.options.onExitComplete();
            return;
          }
          if (
            (window.MotionCancelOptimisedAnimation &&
              !this.hasCheckedOptimisedAppear &&
              (function t(e) {
                if (((e.hasCheckedOptimisedAppear = !0), e.root === e)) return;
                let { visualElement: i } = e.options;
                if (!i) return;
                let s = i.props[iy];
                if (window.MotionHasOptimisedAnimation(s, "transform")) {
                  let { layout: t, layoutId: i } = e.options;
                  window.MotionCancelOptimisedAnimation(
                    s,
                    "transform",
                    tR,
                    !(t || i),
                  );
                }
                let { parent: n } = e;
                n && !n.hasCheckedOptimisedAppear && t(n);
              })(this),
            this.root.isUpdating || this.root.startUpdate(),
            this.isLayoutDirty)
          )
            return;
          this.isLayoutDirty = !0;
          for (let t = 0; t < this.path.length; t++) {
            let e = this.path[t];
            (e.shouldResetTransform = !0),
              e.updateScroll("snapshot"),
              e.options.layoutRoot && e.willUpdate(!1);
          }
          let { layoutId: e, layout: i } = this.options;
          if (void 0 === e && !i) return;
          let s = this.getTransformTemplate();
          (this.prevTransformTemplateValue = s
            ? s(this.latestValues, "")
            : void 0),
            this.updateSnapshot(),
            t && this.notifyListeners("willUpdate");
        }
        update() {
          if (((this.updateScheduled = !1), this.isUpdateBlocked())) {
            this.unblockUpdate(),
              this.clearAllSnapshots(),
              this.nodes.forEach(n0);
            return;
          }
          if (this.animationId <= this.animationCommitId)
            return void this.nodes.forEach(n1);
          (this.animationCommitId = this.animationId),
            this.isUpdating
              ? ((this.isUpdating = !1),
                this.nodes.forEach(n5),
                this.nodes.forEach(n_),
                this.nodes.forEach(nK))
              : this.nodes.forEach(n1),
            this.clearAllSnapshots();
          let t = es.now();
          (tD.delta = d(0, 1e3 / 60, t - tD.timestamp)),
            (tD.timestamp = t),
            (tD.isProcessing = !0),
            tB.update.process(tD),
            tB.preRender.process(tD),
            tB.render.process(tD),
            (tD.isProcessing = !1);
        }
        didUpdate() {
          this.updateScheduled ||
            ((this.updateScheduled = !0), ee.read(this.scheduleUpdate));
        }
        clearAllSnapshots() {
          this.nodes.forEach(nQ), this.sharedNodes.forEach(n6);
        }
        scheduleUpdateProjection() {
          this.projectionUpdateScheduled ||
            ((this.projectionUpdateScheduled = !0),
            tR.preRender(this.updateProjection, !1, !0));
        }
        scheduleCheckAfterUnmount() {
          tR.postRender(() => {
            this.isLayoutDirty
              ? this.root.didUpdate()
              : this.root.checkUpdateFailed();
          });
        }
        updateSnapshot() {
          !this.snapshot &&
            this.instance &&
            ((this.snapshot = this.measure()),
            !this.snapshot ||
              sz(this.snapshot.measuredBox.x) ||
              sz(this.snapshot.measuredBox.y) ||
              (this.snapshot = void 0));
        }
        updateLayout() {
          if (
            !this.instance ||
            (this.updateScroll(),
            !(this.options.alwaysMeasureLayout && this.isLead()) &&
              !this.isLayoutDirty)
          )
            return;
          if (this.resumeFrom && !this.resumeFrom.instance)
            for (let t = 0; t < this.path.length; t++)
              this.path[t].updateScroll();
          let t = this.layout;
          (this.layout = this.measure(!1)),
            this.layoutVersion++,
            (this.layoutCorrected = J()),
            (this.isLayoutDirty = !1),
            (this.projectionDelta = void 0),
            this.notifyListeners("measure", this.layout.layoutBox);
          let { visualElement: e } = this.options;
          e &&
            e.notify(
              "LayoutMeasure",
              this.layout.layoutBox,
              t ? t.layoutBox : void 0,
            );
        }
        updateScroll(t = "measure") {
          let e = !!(this.options.layoutScroll && this.instance);
          if (
            (this.scroll &&
              this.scroll.animationId === this.root.animationId &&
              this.scroll.phase === t &&
              (e = !1),
            e && this.instance)
          ) {
            let e = s(this.instance);
            this.scroll = {
              animationId: this.root.animationId,
              phase: t,
              isRoot: e,
              offset: i(this.instance),
              wasRoot: this.scroll ? this.scroll.isRoot : e,
            };
          }
        }
        resetTransform() {
          if (!n) return;
          let t =
              this.isLayoutDirty ||
              this.shouldResetTransform ||
              this.options.alwaysMeasureLayout,
            e = this.projectionDelta && !nF(this.projectionDelta),
            i = this.getTransformTemplate(),
            s = i ? i(this.latestValues, "") : void 0,
            r = s !== this.prevTransformTemplateValue;
          t &&
            this.instance &&
            (e || eH(this.latestValues) || r) &&
            (n(this.instance, s),
            (this.shouldResetTransform = !1),
            this.scheduleRender());
        }
        measure(t = !0) {
          var e;
          let i = this.measurePageBox(),
            s = this.removeElementScroll(i);
          return (
            t && (s = this.removeTransform(s)),
            rn((e = s).x),
            rn(e.y),
            {
              animationId: this.root.animationId,
              measuredBox: i,
              layoutBox: s,
              latestValues: {},
              source: this.id,
            }
          );
        }
        measurePageBox() {
          let { visualElement: t } = this.options;
          if (!t) return J();
          let e = t.measureViewportBox();
          if (!(this.scroll?.wasRoot || this.path.some(ra))) {
            let { scroll: t } = this.root;
            t && (eZ(e.x, t.offset.x), eZ(e.y, t.offset.y));
          }
          return e;
        }
        removeElementScroll(t) {
          let e = J();
          if ((nC(e, t), this.scroll?.wasRoot)) return e;
          for (let i = 0; i < this.path.length; i++) {
            let s = this.path[i],
              { scroll: n, options: r } = s;
            s !== this.root &&
              n &&
              r.layoutScroll &&
              (n.wasRoot && nC(e, t), eZ(e.x, n.offset.x), eZ(e.y, n.offset.y));
          }
          return e;
        }
        applyTransform(t, e = !1) {
          let i = J();
          nC(i, t);
          for (let t = 0; t < this.path.length; t++) {
            let s = this.path[t];
            !e &&
              s.options.layoutScroll &&
              s.scroll &&
              s !== s.root &&
              eQ(i, { x: -s.scroll.offset.x, y: -s.scroll.offset.y }),
              eH(s.latestValues) && eQ(i, s.latestValues);
          }
          return eH(this.latestValues) && eQ(i, this.latestValues), i;
        }
        removeTransform(t) {
          let e = J();
          nC(e, t);
          for (let t = 0; t < this.path.length; t++) {
            let i = this.path[t];
            if (!i.instance || !eH(i.latestValues)) continue;
            eX(i.latestValues) && i.updateSnapshot();
            let s = J();
            nC(s, i.measurePageBox()),
              nD(
                e,
                i.latestValues,
                i.snapshot ? i.snapshot.layoutBox : void 0,
                s,
              );
          }
          return eH(this.latestValues) && nD(e, this.latestValues), e;
        }
        setTargetDelta(t) {
          (this.targetDelta = t),
            this.root.scheduleUpdateProjection(),
            (this.isProjectionDirty = !0);
        }
        setOptions(t) {
          this.options = {
            ...this.options,
            ...t,
            crossfade: void 0 === t.crossfade || t.crossfade,
          };
        }
        clearMeasurements() {
          (this.scroll = void 0),
            (this.layout = void 0),
            (this.snapshot = void 0),
            (this.prevTransformTemplateValue = void 0),
            (this.targetDelta = void 0),
            (this.target = void 0),
            (this.isLayoutDirty = !1);
        }
        forceRelativeParentToResolveTarget() {
          this.relativeParent &&
            this.relativeParent.resolvedRelativeTargetAt !== tD.timestamp &&
            this.relativeParent.resolveTargetDelta(!0);
        }
        resolveTargetDelta(t = !1) {
          let e = this.getLead();
          this.isProjectionDirty ||
            (this.isProjectionDirty = e.isProjectionDirty),
            this.isTransformDirty ||
              (this.isTransformDirty = e.isTransformDirty),
            this.isSharedProjectionDirty ||
              (this.isSharedProjectionDirty = e.isSharedProjectionDirty);
          let i = !!this.resumingFrom || this !== e;
          if (
            !(
              t ||
              (i && this.isSharedProjectionDirty) ||
              this.isProjectionDirty ||
              this.parent?.isProjectionDirty ||
              this.attemptToResolveRelativeTarget ||
              this.root.updateBlockedByResize
            )
          )
            return;
          let { layout: s, layoutId: n } = this.options;
          if (!this.layout || !(s || n)) return;
          this.resolvedRelativeTargetAt = tD.timestamp;
          let r = this.getClosestProjectingParent();
          if (
            (r &&
              this.linkedParentVersion !== r.layoutVersion &&
              !r.options.layoutRoot &&
              this.removeRelativeTarget(),
            this.targetDelta ||
              this.relativeTarget ||
              (r && r.layout
                ? this.createRelativeTarget(
                    r,
                    this.layout.layoutBox,
                    r.layout.layoutBox,
                  )
                : this.removeRelativeTarget()),
            this.relativeTarget || this.targetDelta)
          ) {
            if (
              (this.target ||
                ((this.target = J()), (this.targetWithTransforms = J())),
              this.relativeTarget &&
                this.relativeTargetOrigin &&
                this.relativeParent &&
                this.relativeParent.target)
            ) {
              var a, o, l;
              this.forceRelativeParentToResolveTarget(),
                (a = this.target),
                (o = this.relativeTarget),
                (l = this.relativeParent.target),
                sY(a.x, o.x, l.x),
                sY(a.y, o.y, l.y);
            } else
              this.targetDelta
                ? (this.resumingFrom
                    ? (this.target = this.applyTransform(this.layout.layoutBox))
                    : nC(this.target, this.layout.layoutBox),
                  eK(this.target, this.targetDelta))
                : nC(this.target, this.layout.layoutBox);
            this.attemptToResolveRelativeTarget &&
              ((this.attemptToResolveRelativeTarget = !1),
              r &&
              !!r.resumingFrom == !!this.resumingFrom &&
              !r.options.layoutScroll &&
              r.target &&
              1 !== this.animationProgress
                ? this.createRelativeTarget(r, this.target, r.target)
                : (this.relativeParent = this.relativeTarget = void 0));
          }
        }
        getClosestProjectingParent() {
          if (
            !(
              !this.parent ||
              eX(this.parent.latestValues) ||
              eG(this.parent.latestValues)
            )
          )
            if (this.parent.isProjecting()) return this.parent;
            else return this.parent.getClosestProjectingParent();
        }
        isProjecting() {
          return !!(
            (this.relativeTarget ||
              this.targetDelta ||
              this.options.layoutRoot) &&
            this.layout
          );
        }
        createRelativeTarget(t, e, i) {
          (this.relativeParent = t),
            (this.linkedParentVersion = t.layoutVersion),
            this.forceRelativeParentToResolveTarget(),
            (this.relativeTarget = J()),
            (this.relativeTargetOrigin = J()),
            sH(this.relativeTargetOrigin, e, i),
            nC(this.relativeTarget, this.relativeTargetOrigin);
        }
        removeRelativeTarget() {
          this.relativeParent = this.relativeTarget = void 0;
        }
        calcProjection() {
          let t = this.getLead(),
            e = !!this.resumingFrom || this !== t,
            i = !0;
          if (
            ((this.isProjectionDirty || this.parent?.isProjectionDirty) &&
              (i = !1),
            e &&
              (this.isSharedProjectionDirty || this.isTransformDirty) &&
              (i = !1),
            this.resolvedRelativeTargetAt === tD.timestamp && (i = !1),
            i)
          )
            return;
          let { layout: s, layoutId: n } = this.options;
          if (
            ((this.isTreeAnimating = !!(
              (this.parent && this.parent.isTreeAnimating) ||
              this.currentAnimation ||
              this.pendingAnimation
            )),
            this.isTreeAnimating ||
              (this.targetDelta = this.relativeTarget = void 0),
            !this.layout || !(s || n))
          )
            return;
          nC(this.layoutCorrected, this.layout.layoutBox);
          let r = this.treeScale.x,
            a = this.treeScale.y;
          !(function (t, e, i, s = !1) {
            let n,
              r,
              a = i.length;
            if (a) {
              e.x = e.y = 1;
              for (let o = 0; o < a; o++) {
                r = (n = i[o]).projectionDelta;
                let { visualElement: a } = n.options;
                (!a ||
                  !a.props.style ||
                  "contents" !== a.props.style.display) &&
                  (s &&
                    n.options.layoutScroll &&
                    n.scroll &&
                    n !== n.root &&
                    eQ(t, { x: -n.scroll.offset.x, y: -n.scroll.offset.y }),
                  r && ((e.x *= r.x.scale), (e.y *= r.y.scale), eK(t, r)),
                  s && eH(n.latestValues) && eQ(t, n.latestValues));
              }
              e.x < 1.0000000000001 && e.x > 0.999999999999 && (e.x = 1),
                e.y < 1.0000000000001 && e.y > 0.999999999999 && (e.y = 1);
            }
          })(this.layoutCorrected, this.treeScale, this.path, e),
            t.layout &&
              !t.target &&
              (1 !== this.treeScale.x || 1 !== this.treeScale.y) &&
              ((t.target = t.layout.layoutBox), (t.targetWithTransforms = J()));
          let { target: o } = t;
          if (!o) {
            this.prevProjectionDelta &&
              (this.createProjectionDeltas(), this.scheduleRender());
            return;
          }
          this.projectionDelta && this.prevProjectionDelta
            ? (nk(this.prevProjectionDelta.x, this.projectionDelta.x),
              nk(this.prevProjectionDelta.y, this.projectionDelta.y))
            : this.createProjectionDeltas(),
            s$(
              this.projectionDelta,
              this.layoutCorrected,
              o,
              this.latestValues,
            ),
            (this.treeScale.x === r &&
              this.treeScale.y === a &&
              nz(this.projectionDelta.x, this.prevProjectionDelta.x) &&
              nz(this.projectionDelta.y, this.prevProjectionDelta.y)) ||
              ((this.hasProjected = !0),
              this.scheduleRender(),
              this.notifyListeners("projectionUpdate", o));
        }
        hide() {
          this.isVisible = !1;
        }
        show() {
          this.isVisible = !0;
        }
        scheduleRender(t = !0) {
          if ((this.options.visualElement?.scheduleRender(), t)) {
            let t = this.getStack();
            t && t.scheduleRender();
          }
          this.resumingFrom &&
            !this.resumingFrom.instance &&
            (this.resumingFrom = void 0);
        }
        createProjectionDeltas() {
          (this.prevProjectionDelta = K()),
            (this.projectionDelta = K()),
            (this.projectionDeltaWithTransform = K());
        }
        setAnimationOrigin(t, e = !1) {
          let i,
            s = this.snapshot,
            n = s ? s.latestValues : {},
            r = { ...this.latestValues },
            a = K();
          (this.relativeParent && this.relativeParent.options.layoutRoot) ||
            (this.relativeTarget = this.relativeTargetOrigin = void 0),
            (this.attemptToResolveRelativeTarget = !e);
          let o = J(),
            l =
              (s ? s.source : void 0) !==
              (this.layout ? this.layout.source : void 0),
            h = this.getStack(),
            u = !h || h.members.length <= 1,
            d = !!(
              l &&
              !u &&
              !0 === this.options.crossfade &&
              !this.path.some(rt)
            );
          (this.animationProgress = 0),
            (this.mixTargetDelta = (e) => {
              let s = e / 1e3;
              if (
                (n8(a.x, t.x, s),
                n8(a.y, t.y, s),
                this.setTargetDelta(a),
                this.relativeTarget &&
                  this.relativeTargetOrigin &&
                  this.layout &&
                  this.relativeParent &&
                  this.relativeParent.layout)
              ) {
                var h, c, p, m, f, g;
                sH(
                  o,
                  this.layout.layoutBox,
                  this.relativeParent.layout.layoutBox,
                ),
                  (p = this.relativeTarget),
                  (m = this.relativeTargetOrigin),
                  (f = o),
                  (g = s),
                  n7(p.x, m.x, f.x, g),
                  n7(p.y, m.y, f.y, g),
                  i &&
                    ((h = this.relativeTarget),
                    (c = i),
                    nN(h.x, c.x) && nN(h.y, c.y)) &&
                    (this.isProjectionDirty = !1),
                  i || (i = J()),
                  nC(i, this.relativeTarget);
              }
              l &&
                ((this.animationValues = r),
                (function (t, e, i, s, n, r) {
                  n
                    ? ((t.opacity = eN(0, i.opacity ?? 1, nP(s))),
                      (t.opacityExit = eN(e.opacity ?? 1, 0, nE(s))))
                    : r && (t.opacity = eN(e.opacity ?? 1, i.opacity ?? 1, s));
                  for (let n = 0; n < nb; n++) {
                    let r = `border${nx[n]}Radius`,
                      a = nS(e, r),
                      o = nS(i, r);
                    (void 0 !== a || void 0 !== o) &&
                      (a || (a = 0),
                      o || (o = 0),
                      0 === a || 0 === o || nT(a) === nT(o)
                        ? ((t[r] = Math.max(eN(nw(a), nw(o), s), 0)),
                          (E.test(o) || E.test(a)) && (t[r] += "%"))
                        : (t[r] = o));
                  }
                  (e.rotate || i.rotate) &&
                    (t.rotate = eN(e.rotate || 0, i.rotate || 0, s));
                })(r, n, this.latestValues, s, d, u)),
                this.root.scheduleUpdateProjection(),
                this.scheduleRender(),
                (this.animationProgress = s);
            }),
            this.mixTargetDelta(1e3 * !!this.options.layoutRoot);
        }
        startAnimation(t) {
          this.notifyListeners("animationStart"),
            this.currentAnimation?.stop(),
            this.resumingFrom?.currentAnimation?.stop(),
            this.pendingAnimation &&
              (tL(this.pendingAnimation), (this.pendingAnimation = void 0)),
            (this.pendingAnimation = tR.update(() => {
              var e, i, s;
              let n;
              (nm.hasAnimatedSinceResize = !0),
                t1.layout++,
                this.motionValue || (this.motionValue = er(0)),
                (this.currentAnimation =
                  ((e = this.motionValue),
                  (i = [0, 1e3]),
                  (s = {
                    ...t,
                    velocity: 0,
                    isSync: !0,
                    onUpdate: (e) => {
                      this.mixTargetDelta(e), t.onUpdate && t.onUpdate(e);
                    },
                    onStop: () => {
                      t1.layout--;
                    },
                    onComplete: () => {
                      t1.layout--,
                        t.onComplete && t.onComplete(),
                        this.completeAnimation();
                    },
                  }),
                  (n = Q(e) ? e : er(e)).start(sE("", n, i, s)),
                  n.animation)),
                this.resumingFrom &&
                  (this.resumingFrom.currentAnimation = this.currentAnimation),
                (this.pendingAnimation = void 0);
            }));
        }
        completeAnimation() {
          this.resumingFrom &&
            ((this.resumingFrom.currentAnimation = void 0),
            (this.resumingFrom.preserveOpacity = void 0));
          let t = this.getStack();
          t && t.exitAnimationComplete(),
            (this.resumingFrom =
              this.currentAnimation =
              this.animationValues =
                void 0),
            this.notifyListeners("animationComplete");
        }
        finishAnimation() {
          this.currentAnimation &&
            (this.mixTargetDelta && this.mixTargetDelta(1e3),
            this.currentAnimation.stop()),
            this.completeAnimation();
        }
        applyTransformsToTarget() {
          let t = this.getLead(),
            {
              targetWithTransforms: e,
              target: i,
              layout: s,
              latestValues: n,
            } = t;
          if (e && i && s) {
            if (
              this !== t &&
              this.layout &&
              s &&
              rr(this.options.animationType, this.layout.layoutBox, s.layoutBox)
            ) {
              i = this.target || J();
              let e = sz(this.layout.layoutBox.x);
              (i.x.min = t.target.x.min), (i.x.max = i.x.min + e);
              let s = sz(this.layout.layoutBox.y);
              (i.y.min = t.target.y.min), (i.y.max = i.y.min + s);
            }
            nC(e, i),
              eQ(e, n),
              s$(this.projectionDeltaWithTransform, this.layoutCorrected, e, n);
          }
        }
        registerSharedNode(t, e) {
          this.sharedNodes.has(t) || this.sharedNodes.set(t, new nU()),
            this.sharedNodes.get(t).add(e);
          let i = e.options.initialPromotionConfig;
          e.promote({
            transition: i ? i.transition : void 0,
            preserveFollowOpacity:
              i && i.shouldPreserveFollowOpacity
                ? i.shouldPreserveFollowOpacity(e)
                : void 0,
          });
        }
        isLead() {
          let t = this.getStack();
          return !t || t.lead === this;
        }
        getLead() {
          let { layoutId: t } = this.options;
          return (t && this.getStack()?.lead) || this;
        }
        getPrevLead() {
          let { layoutId: t } = this.options;
          return t ? this.getStack()?.prevLead : void 0;
        }
        getStack() {
          let { layoutId: t } = this.options;
          if (t) return this.root.sharedNodes.get(t);
        }
        promote({
          needsReset: t,
          transition: e,
          preserveFollowOpacity: i,
        } = {}) {
          let s = this.getStack();
          s && s.promote(this, i),
            t && ((this.projectionDelta = void 0), (this.needsReset = !0)),
            e && this.setOptions({ transition: e });
        }
        relegate() {
          let t = this.getStack();
          return !!t && t.relegate(this);
        }
        resetSkewAndRotation() {
          let { visualElement: t } = this.options;
          if (!t) return;
          let e = !1,
            { latestValues: i } = t;
          if (
            ((i.z ||
              i.rotate ||
              i.rotateX ||
              i.rotateY ||
              i.rotateZ ||
              i.skewX ||
              i.skewY) &&
              (e = !0),
            !e)
          )
            return;
          let s = {};
          i.z && nG("z", t, s, this.animationValues);
          for (let e = 0; e < nX.length; e++)
            nG(`rotate${nX[e]}`, t, s, this.animationValues),
              nG(`skew${nX[e]}`, t, s, this.animationValues);
          for (let e in (t.render(), s))
            t.setStaticValue(e, s[e]),
              this.animationValues && (this.animationValues[e] = s[e]);
          t.scheduleRender();
        }
        applyProjectionStyles(t, e) {
          if (!this.instance || this.isSVG) return;
          if (!this.isVisible) {
            t.visibility = "hidden";
            return;
          }
          let i = this.getTransformTemplate();
          if (this.needsReset) {
            (this.needsReset = !1),
              (t.visibility = ""),
              (t.opacity = ""),
              (t.pointerEvents = ia(e?.pointerEvents) || ""),
              (t.transform = i ? i(this.latestValues, "") : "none");
            return;
          }
          let s = this.getLead();
          if (!this.projectionDelta || !this.layout || !s.target) {
            this.options.layoutId &&
              ((t.opacity =
                void 0 !== this.latestValues.opacity
                  ? this.latestValues.opacity
                  : 1),
              (t.pointerEvents = ia(e?.pointerEvents) || "")),
              this.hasProjected &&
                !eH(this.latestValues) &&
                ((t.transform = i ? i({}, "") : "none"),
                (this.hasProjected = !1));
            return;
          }
          t.visibility = "";
          let n = s.animationValues || s.latestValues;
          this.applyTransformsToTarget();
          let r = (function (t, e, i) {
            let s = "",
              n = t.x.translate / e.x,
              r = t.y.translate / e.y,
              a = i?.z || 0;
            if (
              ((n || r || a) && (s = `translate3d(${n}px, ${r}px, ${a}px) `),
              (1 !== e.x || 1 !== e.y) &&
                (s += `scale(${1 / e.x}, ${1 / e.y}) `),
              i)
            ) {
              let {
                transformPerspective: t,
                rotate: e,
                rotateX: n,
                rotateY: r,
                skewX: a,
                skewY: o,
              } = i;
              t && (s = `perspective(${t}px) ${s}`),
                e && (s += `rotate(${e}deg) `),
                n && (s += `rotateX(${n}deg) `),
                r && (s += `rotateY(${r}deg) `),
                a && (s += `skewX(${a}deg) `),
                o && (s += `skewY(${o}deg) `);
            }
            let o = t.x.scale * e.x,
              l = t.y.scale * e.y;
            return (
              (1 !== o || 1 !== l) && (s += `scale(${o}, ${l})`), s || "none"
            );
          })(this.projectionDeltaWithTransform, this.treeScale, n);
          i && (r = i(n, r)), (t.transform = r);
          let { x: a, y: o } = this.projectionDelta;
          for (let e in ((t.transformOrigin = `${100 * a.origin}% ${100 * o.origin}% 0`),
          s.animationValues
            ? (t.opacity =
                s === this
                  ? (n.opacity ?? this.latestValues.opacity ?? 1)
                  : this.preserveOpacity
                    ? this.latestValues.opacity
                    : n.opacityExit)
            : (t.opacity =
                s === this
                  ? void 0 !== n.opacity
                    ? n.opacity
                    : ""
                  : void 0 !== n.opacityExit
                    ? n.opacityExit
                    : 0),
          eI)) {
            if (void 0 === n[e]) continue;
            let { correct: i, applyTo: a, isCSSVariable: o } = eI[e],
              l = "none" === r ? n[e] : i(n[e], s);
            if (a) {
              let e = a.length;
              for (let i = 0; i < e; i++) t[a[i]] = l;
            } else
              o
                ? (this.options.visualElement.renderState.vars[e] = l)
                : (t[e] = l);
          }
          this.options.layoutId &&
            (t.pointerEvents =
              s === this ? ia(e?.pointerEvents) || "" : "none");
        }
        clearSnapshot() {
          this.resumeFrom = this.snapshot = void 0;
        }
        resetTree() {
          this.root.nodes.forEach((t) => t.currentAnimation?.stop()),
            this.root.nodes.forEach(n0),
            this.root.sharedNodes.clear();
        }
      };
    }
    function n_(t) {
      t.updateLayout();
    }
    function nK(t) {
      let e = t.resumeFrom?.snapshot || t.snapshot;
      if (t.isLead() && t.layout && e && t.hasListeners("didUpdate")) {
        let { layoutBox: i, measuredBox: s } = t.layout,
          { animationType: n } = t.options,
          r = e.source !== t.layout.source;
        "size" === n
          ? sF((t) => {
              let s = r ? e.measuredBox[t] : e.layoutBox[t],
                n = sz(s);
              (s.min = i[t].min), (s.max = s.min + n);
            })
          : rr(n, e.layoutBox, i) &&
            sF((s) => {
              let n = r ? e.measuredBox[s] : e.layoutBox[s],
                a = sz(i[s]);
              (n.max = n.min + a),
                t.relativeTarget &&
                  !t.currentAnimation &&
                  ((t.isProjectionDirty = !0),
                  (t.relativeTarget[s].max = t.relativeTarget[s].min + a));
            });
        let a = K();
        s$(a, i, e.layoutBox);
        let o = K();
        r
          ? s$(o, t.applyTransform(s, !0), e.measuredBox)
          : s$(o, i, e.layoutBox);
        let l = !nF(a),
          h = !1;
        if (!t.resumeFrom) {
          let s = t.getClosestProjectingParent();
          if (s && !s.resumeFrom) {
            let { snapshot: n, layout: r } = s;
            if (n && r) {
              let a = J();
              sH(a, e.layoutBox, n.layoutBox);
              let o = J();
              sH(o, i, r.layoutBox),
                nO(a, o) || (h = !0),
                s.options.layoutRoot &&
                  ((t.relativeTarget = o),
                  (t.relativeTargetOrigin = a),
                  (t.relativeParent = s));
            }
          }
        }
        t.notifyListeners("didUpdate", {
          layout: i,
          snapshot: e,
          delta: o,
          layoutDelta: a,
          hasLayoutChanged: l,
          hasRelativeLayoutChanged: h,
        });
      } else if (t.isLead()) {
        let { onExitComplete: e } = t.options;
        e && e();
      }
      t.options.transition = void 0;
    }
    function nZ(t) {
      t.parent &&
        (t.isProjecting() || (t.isProjectionDirty = t.parent.isProjectionDirty),
        t.isSharedProjectionDirty ||
          (t.isSharedProjectionDirty = !!(
            t.isProjectionDirty ||
            t.parent.isProjectionDirty ||
            t.parent.isSharedProjectionDirty
          )),
        t.isTransformDirty || (t.isTransformDirty = t.parent.isTransformDirty));
    }
    function nJ(t) {
      t.isProjectionDirty = t.isSharedProjectionDirty = t.isTransformDirty = !1;
    }
    function nQ(t) {
      t.clearSnapshot();
    }
    function n0(t) {
      t.clearMeasurements();
    }
    function n1(t) {
      t.isLayoutDirty = !1;
    }
    function n5(t) {
      let { visualElement: e } = t.options;
      e &&
        e.getProps().onBeforeLayoutMeasure &&
        e.notify("BeforeLayoutMeasure"),
        t.resetTransform();
    }
    function n2(t) {
      t.finishAnimation(),
        (t.targetDelta = t.relativeTarget = t.target = void 0),
        (t.isProjectionDirty = !0);
    }
    function n3(t) {
      t.resolveTargetDelta();
    }
    function n4(t) {
      t.calcProjection();
    }
    function n9(t) {
      t.resetSkewAndRotation();
    }
    function n6(t) {
      t.removeLeadSnapshot();
    }
    function n8(t, e, i) {
      (t.translate = eN(e.translate, 0, i)),
        (t.scale = eN(e.scale, 1, i)),
        (t.origin = e.origin),
        (t.originPoint = e.originPoint);
    }
    function n7(t, e, i, s) {
      (t.min = eN(e.min, i.min, s)), (t.max = eN(e.max, i.max, s));
    }
    function rt(t) {
      return t.animationValues && void 0 !== t.animationValues.opacityExit;
    }
    let re = { duration: 0.45, ease: [0.4, 0, 0.1, 1] },
      ri = (t) =>
        "u" > typeof navigator &&
        navigator.userAgent &&
        navigator.userAgent.toLowerCase().includes(t),
      rs = ri("applewebkit/") && !ri("chrome/") ? Math.round : tC;
    function rn(t) {
      (t.min = rs(t.min)), (t.max = rs(t.max));
    }
    function rr(t, e, i) {
      return (
        "position" === t ||
        ("preserve-aspect" === t && !(0.2 >= Math.abs(nW(e) - nW(i))))
      );
    }
    function ra(t) {
      return t !== t.root && t.scroll?.wasRoot;
    }
    let ro = nq({
        attachResizeListener: (t, e) => sO(t, "resize", e),
        measureScroll: () => ({
          x:
            document.documentElement.scrollLeft ||
            document.body?.scrollLeft ||
            0,
          y:
            document.documentElement.scrollTop || document.body?.scrollTop || 0,
        }),
        checkIsScrollRoot: () => !0,
      }),
      rl = { current: void 0 },
      rh = nq({
        measureScroll: (t) => ({ x: t.scrollLeft, y: t.scrollTop }),
        defaultParent: () => {
          if (!rl.current) {
            let t = new ro({});
            t.mount(window),
              t.setOptions({ layoutScroll: !0 }),
              (rl.current = t);
          }
          return rl.current;
        },
        resetTransform: (t, e) => {
          t.style.transform = void 0 !== e ? e : "none";
        },
        checkIsScrollRoot: (t) =>
          "fixed" === window.getComputedStyle(t).position,
      });
    function ru(t, e) {
      let i = s_(t),
        s = new AbortController();
      return [i, { passive: !0, ...e, signal: s.signal }, () => s.abort()];
    }
    function rd(t, e, i) {
      let { props: s } = t;
      t.animationState &&
        s.whileHover &&
        t.animationState.setActive("whileHover", "Start" === i);
      let n = s["onHover" + i];
      n && tR.postRender(() => n(e, s4(e)));
    }
    let rc = (t, e) => !!e && (t === e || rc(t, e.parentElement)),
      rp = new WeakSet();
    function rm(t) {
      return (e) => {
        "Enter" === e.key && t(e);
      };
    }
    function rf(t, e) {
      t.dispatchEvent(
        new PointerEvent("pointer" + e, { isPrimary: !0, bubbles: !0 }),
      );
    }
    function rg(t) {
      return s3(t) && !(sW.x || sW.y);
    }
    let ry = new WeakSet();
    function rv(t, e, i) {
      let { props: s } = t;
      if (t.current instanceof HTMLButtonElement && t.current.disabled) return;
      t.animationState &&
        s.whileTap &&
        t.animationState.setActive("whileTap", "Start" === i);
      let n = s["onTap" + ("End" === i ? "" : i)];
      n && tR.postRender(() => n(e, s4(e)));
    }
    let rx = new WeakMap(),
      rb = new WeakMap(),
      rw = (t) => {
        let e = rx.get(t.target);
        e && e(t);
      },
      rT = (t) => {
        t.forEach(rw);
      },
      rS = { some: 0, all: 1 },
      rP = (function (t, e) {
        if ("u" < typeof Proxy) return iw;
        let i = new Map(),
          s = (i, s) => iw(i, s, t, e);
        return new Proxy((t, e) => s(t, e), {
          get: (n, r) =>
            "create" === r
              ? s
              : (i.has(r) || i.set(r, iw(r, void 0, t, e)), i.get(r)),
        });
      })(
        {
          animation: {
            Feature: class extends iT {
              constructor(t) {
                super(t),
                  t.animationState ||
                    (t.animationState = (function (t) {
                      let e = (e) =>
                          Promise.all(
                            e.map(({ animation: e, options: i }) =>
                              (function (t, e, i = {}) {
                                let s;
                                if (
                                  (t.notify("AnimationStart", e),
                                  Array.isArray(e))
                                )
                                  s = Promise.all(e.map((e) => sC(t, e, i)));
                                else if ("string" == typeof e) s = sC(t, e, i);
                                else {
                                  let n =
                                    "function" == typeof e
                                      ? iS(t, e, i.custom)
                                      : e;
                                  s = Promise.all(sA(t, n, i));
                                }
                                return s.then(() => {
                                  t.notify("AnimationComplete", e);
                                });
                              })(t, e, i),
                            ),
                          ),
                        i = sD(),
                        s = !0,
                        n = (e) => (i, s) => {
                          let n = iS(
                            t,
                            s,
                            "exit" === e ? t.presenceContext?.custom : void 0,
                          );
                          if (n) {
                            let { transition: t, transitionEnd: e, ...s } = n;
                            i = { ...i, ...s, ...e };
                          }
                          return i;
                        };
                      function r(r) {
                        let { props: a } = t,
                          o =
                            (function t(e) {
                              if (!e) return;
                              if (!e.isControllingVariants) {
                                let i = (e.parent && t(e.parent)) || {};
                                return (
                                  void 0 !== e.props.initial &&
                                    (i.initial = e.props.initial),
                                  i
                                );
                              }
                              let i = {};
                              for (let t = 0; t < sk; t++) {
                                let s = ed[t],
                                  n = e.props[s];
                                (eh(n) || !1 === n) && (i[s] = n);
                              }
                              return i;
                            })(t.parent) || {},
                          l = [],
                          h = new Set(),
                          u = {},
                          d = 1 / 0;
                        for (let e = 0; e < sR; e++) {
                          var c, p;
                          let m = sj[e],
                            f = i[m],
                            g = void 0 !== a[m] ? a[m] : o[m],
                            y = eh(g),
                            v = m === r ? f.isActive : null;
                          !1 === v && (d = e);
                          let x = g === o[m] && g !== a[m] && y;
                          if (
                            (x && s && t.manuallyAnimateOnMount && (x = !1),
                            (f.protectedKeys = { ...u }),
                            (!f.isActive && null === v) ||
                              (!g && !f.prevProp) ||
                              el(g) ||
                              "boolean" == typeof g)
                          )
                            continue;
                          if ("exit" === m && f.isActive && !0 !== v) {
                            f.prevResolvedValues &&
                              (u = { ...u, ...f.prevResolvedValues });
                            continue;
                          }
                          let b =
                              ((c = f.prevProp),
                              "string" == typeof (p = g)
                                ? p !== c
                                : !!Array.isArray(p) && !sV(p, c)),
                            w =
                              b ||
                              (m === r && f.isActive && !x && y) ||
                              (e > d && y),
                            T = !1,
                            S = Array.isArray(g) ? g : [g],
                            P = S.reduce(n(m), {});
                          !1 === v && (P = {});
                          let { prevResolvedValues: E = {} } = f,
                            A = { ...E, ...P },
                            M = (e) => {
                              (w = !0),
                                h.has(e) && ((T = !0), h.delete(e)),
                                (f.needsAnimating[e] = !0);
                              let i = t.getValue(e);
                              i && (i.liveStyle = !1);
                            };
                          for (let t in A) {
                            let e = P[t],
                              i = E[t];
                            if (!u.hasOwnProperty(t))
                              (iA(e) && iA(i) ? sV(e, i) : e === i)
                                ? void 0 !== e && h.has(t)
                                  ? M(t)
                                  : (f.protectedKeys[t] = !0)
                                : null != e
                                  ? M(t)
                                  : h.add(t);
                          }
                          (f.prevProp = g),
                            (f.prevResolvedValues = P),
                            f.isActive && (u = { ...u, ...P }),
                            s && t.blockInitialAnimation && (w = !1);
                          let C = x && b,
                            k = !C || T;
                          w &&
                            k &&
                            l.push(
                              ...S.map((e) => {
                                let i = { type: m };
                                if (
                                  "string" == typeof e &&
                                  s &&
                                  !C &&
                                  t.manuallyAnimateOnMount &&
                                  t.parent
                                ) {
                                  let { parent: s } = t,
                                    n = iS(s, e);
                                  if (s.enteringChildren && n) {
                                    let { delayChildren: e } =
                                      n.transition || {};
                                    i.delay = sM(s.enteringChildren, t, e);
                                  }
                                }
                                return { animation: e, options: i };
                              }),
                            );
                        }
                        if (h.size) {
                          let e = {};
                          if ("boolean" != typeof a.initial) {
                            let i = iS(
                              t,
                              Array.isArray(a.initial)
                                ? a.initial[0]
                                : a.initial,
                            );
                            i && i.transition && (e.transition = i.transition);
                          }
                          h.forEach((i) => {
                            let s = t.getBaseTarget(i),
                              n = t.getValue(i);
                            n && (n.liveStyle = !0), (e[i] = s ?? null);
                          }),
                            l.push({ animation: e });
                        }
                        let m = !!l.length;
                        return (
                          s &&
                            (!1 === a.initial || a.initial === a.animate) &&
                            !t.manuallyAnimateOnMount &&
                            (m = !1),
                          (s = !1),
                          m ? e(l) : Promise.resolve()
                        );
                      }
                      return {
                        animateChanges: r,
                        setActive: function (e, s) {
                          if (i[e].isActive === s) return Promise.resolve();
                          t.variantChildren?.forEach((t) =>
                            t.animationState?.setActive(e, s),
                          ),
                            (i[e].isActive = s);
                          let n = r(e);
                          for (let t in i) i[t].protectedKeys = {};
                          return n;
                        },
                        setAnimateFunction: function (i) {
                          e = i(t);
                        },
                        getState: () => i,
                        reset: () => {
                          i = sD();
                        },
                      };
                    })(t));
              }
              updateAnimationControlsSubscription() {
                let { animate: t } = this.node.getProps();
                el(t) && (this.unmountControls = t.subscribe(this.node));
              }
              mount() {
                this.updateAnimationControlsSubscription();
              }
              update() {
                let { animate: t } = this.node.getProps(),
                  { animate: e } = this.node.prevProps || {};
                t !== e && this.updateAnimationControlsSubscription();
              }
              unmount() {
                this.node.animationState.reset(), this.unmountControls?.();
              }
            },
          },
          exit: {
            Feature: class extends iT {
              constructor() {
                super(...arguments), (this.id = sB++);
              }
              update() {
                if (!this.node.presenceContext) return;
                let { isPresent: t, onExitComplete: e } =
                    this.node.presenceContext,
                  { isPresent: i } = this.node.prevPresenceContext || {};
                if (!this.node.animationState || t === i) return;
                let s = this.node.animationState.setActive("exit", !t);
                e &&
                  !t &&
                  s.then(() => {
                    e(this.id);
                  });
              }
              mount() {
                let { register: t, onExitComplete: e } =
                  this.node.presenceContext || {};
                e && e(this.id), t && (this.unmount = t(this.id));
              }
              unmount() {}
            },
          },
          inView: {
            Feature: class extends iT {
              constructor() {
                super(...arguments),
                  (this.hasEnteredView = !1),
                  (this.isInView = !1);
              }
              startObserver() {
                var t;
                let e;
                this.unmount();
                let { viewport: i = {} } = this.node.getProps(),
                  { root: s, margin: n, amount: r = "some", once: a } = i,
                  o = {
                    root: s ? s.current : void 0,
                    rootMargin: n,
                    threshold: "number" == typeof r ? r : rS[r],
                  },
                  l = (t) => {
                    let { isIntersecting: e } = t;
                    if (
                      this.isInView === e ||
                      ((this.isInView = e), a && !e && this.hasEnteredView)
                    )
                      return;
                    e && (this.hasEnteredView = !0),
                      this.node.animationState &&
                        this.node.animationState.setActive("whileInView", e);
                    let { onViewportEnter: i, onViewportLeave: s } =
                        this.node.getProps(),
                      n = e ? i : s;
                    n && n(t);
                  };
                return (
                  (t = this.node.current),
                  (e = (function ({ root: t, ...e }) {
                    let i = t || document;
                    rb.has(i) || rb.set(i, {});
                    let s = rb.get(i),
                      n = JSON.stringify(e);
                    return (
                      s[n] ||
                        (s[n] = new IntersectionObserver(rT, {
                          root: t,
                          ...e,
                        })),
                      s[n]
                    );
                  })(o)),
                  rx.set(t, l),
                  e.observe(t),
                  () => {
                    rx.delete(t), e.unobserve(t);
                  }
                );
              }
              mount() {
                this.startObserver();
              }
              update() {
                if ("u" < typeof IntersectionObserver) return;
                let { props: t, prevProps: e } = this.node;
                ["amount", "margin", "root"].some(
                  (function ({ viewport: t = {} }, { viewport: e = {} } = {}) {
                    return (i) => t[i] !== e[i];
                  })(t, e),
                ) && this.startObserver();
              }
              unmount() {}
            },
          },
          tap: {
            Feature: class extends iT {
              mount() {
                let { current: t } = this.node;
                if (!t) return;
                let { globalTapTarget: e, propagate: i } = this.node.props;
                this.unmount = (function (t, e, i = {}) {
                  let [s, n, r] = ru(t, i),
                    a = (t) => {
                      let s = t.currentTarget;
                      if (!rg(t) || ry.has(t)) return;
                      rp.add(s), i.stopPropagation && ry.add(t);
                      let r = e(s, t),
                        a = (t, e) => {
                          window.removeEventListener("pointerup", o),
                            window.removeEventListener("pointercancel", l),
                            rp.has(s) && rp.delete(s),
                            rg(t) &&
                              "function" == typeof r &&
                              r(t, { success: e });
                        },
                        o = (t) => {
                          a(
                            t,
                            s === window ||
                              s === document ||
                              i.useGlobalTarget ||
                              rc(s, t.target),
                          );
                        },
                        l = (t) => {
                          a(t, !1);
                        };
                      window.addEventListener("pointerup", o, n),
                        window.addEventListener("pointercancel", l, n);
                    };
                  return (
                    s.forEach((t) => {
                      (i.useGlobalTarget ? window : t).addEventListener(
                        "pointerdown",
                        a,
                        n,
                      ),
                        sG(t) &&
                          "offsetHeight" in t &&
                          (t.addEventListener("focus", (t) =>
                            ((t, e) => {
                              let i = t.currentTarget;
                              if (!i) return;
                              let s = rm(() => {
                                if (rp.has(i)) return;
                                rf(i, "down");
                                let t = rm(() => {
                                  rf(i, "up");
                                });
                                i.addEventListener("keyup", t, e),
                                  i.addEventListener(
                                    "blur",
                                    () => rf(i, "cancel"),
                                    e,
                                  );
                              });
                              i.addEventListener("keydown", s, e),
                                i.addEventListener(
                                  "blur",
                                  () => i.removeEventListener("keydown", s),
                                  e,
                                );
                            })(t, n),
                          ),
                          sN.has(t.tagName) ||
                            !0 === t.isContentEditable ||
                            t.hasAttribute("tabindex") ||
                            (t.tabIndex = 0));
                    }),
                    r
                  );
                })(
                  t,
                  (t, e) => (
                    rv(this.node, e, "Start"),
                    (t, { success: e }) =>
                      rv(this.node, t, e ? "End" : "Cancel")
                  ),
                  { useGlobalTarget: e, stopPropagation: i?.tap === !1 },
                );
              }
              unmount() {}
            },
          },
          focus: {
            Feature: class extends iT {
              constructor() {
                super(...arguments), (this.isActive = !1);
              }
              onFocus() {
                let t = !1;
                try {
                  t = this.node.current.matches(":focus-visible");
                } catch (e) {
                  t = !0;
                }
                t &&
                  this.node.animationState &&
                  (this.node.animationState.setActive("whileFocus", !0),
                  (this.isActive = !0));
              }
              onBlur() {
                this.isActive &&
                  this.node.animationState &&
                  (this.node.animationState.setActive("whileFocus", !1),
                  (this.isActive = !1));
              }
              mount() {
                this.unmount = ik(
                  sO(this.node.current, "focus", () => this.onFocus()),
                  sO(this.node.current, "blur", () => this.onBlur()),
                );
              }
              unmount() {}
            },
          },
          hover: {
            Feature: class extends iT {
              mount() {
                let { current: t } = this.node;
                t &&
                  (this.unmount = (function (t, e, i = {}) {
                    let [s, n, r] = ru(t, i);
                    return (
                      s.forEach((t) => {
                        let i,
                          s = !1,
                          r = !1,
                          a = (e) => {
                            i && (i(e), (i = void 0)),
                              t.removeEventListener("pointerleave", l);
                          },
                          o = (t) => {
                            (s = !1),
                              window.removeEventListener("pointerup", o),
                              window.removeEventListener("pointercancel", o),
                              r && ((r = !1), a(t));
                          },
                          l = (t) => {
                            if ("touch" !== t.pointerType) {
                              if (s) {
                                r = !0;
                                return;
                              }
                              a(t);
                            }
                          };
                        t.addEventListener(
                          "pointerenter",
                          (s) => {
                            if ("touch" === s.pointerType || sW.x || sW.y)
                              return;
                            r = !1;
                            let a = e(t, s);
                            "function" == typeof a &&
                              ((i = a),
                              t.addEventListener("pointerleave", l, n));
                          },
                          n,
                        ),
                          t.addEventListener(
                            "pointerdown",
                            () => {
                              (s = !0),
                                window.addEventListener("pointerup", o, n),
                                window.addEventListener("pointercancel", o, n);
                            },
                            n,
                          );
                      }),
                      r
                    );
                  })(
                    t,
                    (t, e) => (
                      rd(this.node, e, "Start"), (t) => rd(this.node, t, "End")
                    ),
                  ));
              }
              unmount() {}
            },
          },
          pan: {
            Feature: class extends iT {
              constructor() {
                super(...arguments), (this.removePointerDownListener = tC);
              }
              onPointerDown(t) {
                this.session = new nt(t, this.createPanHandlers(), {
                  transformPagePoint: this.node.getTransformPagePoint(),
                  contextWindow: s6(this.node),
                });
              }
              createPanHandlers() {
                let {
                  onPanSessionStart: t,
                  onPanStart: e,
                  onPan: i,
                  onPanEnd: s,
                } = this.node.getProps();
                return {
                  onSessionStart: np(t),
                  onStart: np(e),
                  onMove: np(i),
                  onEnd: (t, e) => {
                    delete this.session, s && tR.postRender(() => s(t, e));
                  },
                };
              }
              mount() {
                this.removePointerDownListener = s9(
                  this.node.current,
                  "pointerdown",
                  (t) => this.onPointerDown(t),
                );
              }
              update() {
                this.session &&
                  this.session.updateHandlers(this.createPanHandlers());
              }
              unmount() {
                this.removePointerDownListener(),
                  this.session && this.session.end();
              }
            },
          },
          drag: {
            Feature: class extends iT {
              constructor(t) {
                super(t),
                  (this.removeGroupControls = tC),
                  (this.removeListeners = tC),
                  (this.controls = new nu(t));
              }
              mount() {
                let { dragControls: t } = this.node.getProps();
                t && (this.removeGroupControls = t.subscribe(this.controls)),
                  (this.removeListeners = this.controls.addListeners() || tC);
              }
              update() {
                let { dragControls: t } = this.node.getProps(),
                  { dragControls: e } = this.node.prevProps || {};
                t !== e &&
                  (this.removeGroupControls(),
                  t && (this.removeGroupControls = t.subscribe(this.controls)));
              }
              unmount() {
                this.removeGroupControls(),
                  this.removeListeners(),
                  this.controls.isDragging || this.controls.endPanSession();
              }
            },
            ProjectionNode: rh,
            MeasureLayout: nv,
          },
          layout: { ProjectionNode: rh, MeasureLayout: nv },
        },
        (t, e) =>
          (e.isSVG ?? e2(t))
            ? new eU(e)
            : new e1(e, { allowProjection: t !== l.Fragment }),
      );
    var rE = t.i(57440);
    let rA = { ADMIN: "#b95353", STAFF: "#5865f2", SPONSOR: "#ffad56" },
      rM = { ADMIN: "admin.png", STAFF: "staff.png", SPONSOR: "sponsor.png" },
      rC = {
        MANAGER: "#e050bc",
        STAFF: "#0059b9",
        PARTNER: "#b4cbff",
        DEV: "#90cdf4",
      },
      rk = {
        MANAGER: "manager.webp",
        STAFF: "staff.png",
        PARTNER: "partner.webp",
        DEV: "dev.png",
      },
      rSunaColors = { ADMIN: "#b95353", STAFF: "#5865f2" },
      rSunaBadges = { ADMIN: "admin.png", STAFF: "staff.png" };
    function rV() {
      let [t, e] = (0, l.useState)(!0),
        [i, s] = (0, l.useState)(null),
        [n, r] = (0, l.useState)(!0),
        [f, g] = (0, l.useState)(!1),
        [x, y] = (0, l.useState)(!1),
        [b, k] = (0, l.useState)(null),
        [w, j] = (0, l.useState)(!1),
        a = (0, l.useRef)(null),
        h = (0, l.useRef)(null),
        u = (0, l.useRef)(null),
        d = (0, l.useRef)(null);
      (0, l.useEffect)(() => {
        (async () => {
          try {
            let t = await fetch("/api/profile.json", {
              cache: "no-store",
            });
            if (t.ok) {
              let e = await t.json();
              s(e);
            }
          } catch (t) {
            console.error("Failed to fetch profile:", t);
          } finally {
            r(!1);
          }
        })();
      }, []),
        (0, l.useEffect)(
          () => () => {
            a.current && (URL.revokeObjectURL(a.current), (a.current = null));
          },
          [],
        );
      let c = async () => {
        e(!1), u.current && (u.current.style.filter = "brightness(1)");
        let t = d.current;
        if (t)
          try {
            if (!a.current) {
              let e = await fetch("/miso/song.ogg", { cache: "no-store" }),
                i = await e.blob();
              (a.current = URL.createObjectURL(i)),
                (t.src = a.current),
                t.load();
            }
            (t.currentTime = 0), (t.volume = 1), await t.play();
          } catch (t) {
            console.log("Audio error:", t);
          }
      };
      (0, l.useEffect)(() => {
        if (!h.current || !i) return;
        rE.default.init(h.current, {
          max: 15,
          speed: 400,
          glare: !0,
          "max-glare": 0.1,
        });
        let t = setInterval(() => {
          void 0 !== window.bootstrap &&
            (void 0 === window.bootstrap ||
              document
                .querySelectorAll('[data-bs-toggle="tooltip"]')
                .forEach((t) => new window.bootstrap.Tooltip(t)),
            clearInterval(t));
        }, 100);
        return () => clearInterval(t);
      }, [i]);
      (0, l.useEffect)(() => {
        if (!x || b || w) return;
        (async () => {
          j(!0);
          try {
            let t = await fetch(
              "https://discord.com/api/guilds/822550944608026645/widget.json",
              { cache: "no-store" },
            );
            if (t.ok) {
              let e = await t.json();
              k(e);
            }
          } catch (t) {
            console.log("Discord widget fetch error:", t);
          } finally {
            j(!1);
          }
        })();
      }, [x, b, w]);
      (0, l.useEffect)(() => {
        if (!x) return;
        let t = (t) => {
          "Escape" === t.key && y(!1);
        };
        return (
          window.addEventListener("keydown", t),
          () => window.removeEventListener("keydown", t)
        );
      }, [x]);
      let p = (t, e, i = 256, s = null) =>
        s && s.generatedUrls && s.generatedUrls.avatar
          ? s.generatedUrls.avatar
          : e
            ? `https://cdn.discordapp.com/avatars/${t}/${e}.${e.startsWith("a_") ? "gif" : "webp"}?size=${i}`
            : "/cat/a_32a84abe96f9b0c79b4671e88ba71bbb.webp";
      if (n)
        return (0, o.jsx)("div", {
          className:
            "container h-100 d-flex align-items-center justify-content-center",
          children: (0, o.jsx)("div", {
            className: "spinner-border text-white",
            role: "status",
            children: (0, o.jsx)("span", {
              className: "visually-hidden",
              children: "Loading...",
            }),
          }),
        });
      if (!i)
        return (0, o.jsx)("div", {
          className:
            "container h-100 d-flex align-items-center justify-content-center",
          children: (0, o.jsx)("p", {
            className: "text-white",
            children: "Failed to load profile.",
          }),
        });
      let m =
        (i && i.generatedUrls && i.generatedUrls.banner) ||
        ((t, e, i = 600) =>
          e
            ? `https://cdn.discordapp.com/banners/${t}/${e}.${e.startsWith("a_") ? "gif" : "webp"}?size=${i}`
            : null)(i.id, i.banner || "");
      return (0, o.jsxs)(o.Fragment, {
        children: [
          (0, o.jsx)("audio", { ref: d, loop: !0, preload: "none" }),
          (0, o.jsx)("div", {
            style: {
              position: "fixed",
              inset: 0,
              zIndex: -1,
              background: "rgba(97, 51, 51, 0.84)",
              mixBlendMode: "multiply",
              pointerEvents: "none",
            },
          }),
          (0, o.jsx)("video", {
            ref: u,
            id: "bg-video",
            autoPlay: !0,
            loop: !0,
            muted: !0,
            playsInline: !0,
            style: {
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              zIndex: -2,
              filter: "brightness(0.2) saturate(1.4) hue-rotate(190deg)",
              transition: "filter 1.5s ease",
            },
            children: (0, o.jsx)("source", {
              src: "/miso/my_cat_hit_this.mp4",
              type: "video/webm",
            }),
          }),
          (0, o.jsx)("div", {
            className: `overlay ${!t ? "hidden" : ""}`,
            onClick: c,
            style: {
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background: "#000",
              zIndex: 9999,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              transition: "opacity 1s ease-in-out",
              cursor: "pointer",
              opacity: +!!t,
              pointerEvents: t ? "auto" : "none",
            },
            children: (0, o.jsx)("div", {
              className: "enter-text",
              style: { fontSize: "1rem", letterSpacing: "3px", opacity: 0.8 },
              children: "[ click to unlock ]",
            }),
          }),
          (0, o.jsx)(rP.div, {
            className:
              "container h-100 d-flex align-items-center justify-content-center",
            variants: {
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.1, delayChildren: 0.2 },
              },
            },
            initial: "hidden",
            animate: t ? "hidden" : "visible",
            children: (0, o.jsx)(rP.div, {
              variants: {
                hidden: { y: 20, opacity: 0 },
                visible: {
                  y: 0,
                  opacity: 1,
                  transition: { type: "spring", stiffness: 100, damping: 12 },
                },
              },
              children: (0, o.jsxs)("div", {
                ref: h,
                className: "glass-card",
                style: {
                  background: "rgba(25, 25, 25, 0.4)",
                  backdropFilter: "blur(15px)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "20px",
                  padding: "2rem",
                  width: "450px",
                  maxWidth: "90vw",
                  textAlign: "center",
                  opacity: +!t,
                  transformStyle: "preserve-3d",
                  boxShadow: "0 25px 50px rgba(0,0,0,0.5)",
                  position: "relative",
                  overflow: "hidden",
                },
                children: [
                  m &&
                    (0, o.jsxs)(o.Fragment, {
                      children: [
                        (0, o.jsx)("div", {
                          className: "card-banner",
                          style: {
                            position: "absolute",
                            top: 10,
                            left: 10,
                            width: "calc(100% - 20px)",
                            height: "125px",
                            backgroundImage: `url(${m})`,
                            backgroundSize: "100% auto",
                            backgroundPosition: "center top",
                            zIndex: 0,
                            borderRadius: "15px",
                          },
                        }),
                        (0, o.jsx)("div", {
                          className: "banner-overlay",
                          style: {
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100%",
                            background:
                              "linear-gradient(to bottom, rgba(0,0,0,0.4), transparent)",
                            borderRadius: "15px",
                          },
                        }),
                      ],
                    }),
                  (0, o.jsxs)("div", {
                    className: "content-3d",
                    style: {
                      transform: x
                        ? "translateZ(50px) scale(0.98)"
                        : "translateZ(50px) scale(1)",
                      position: "relative",
                      zIndex: 1,
                      opacity: x ? 0 : 1,
                      filter: x ? "blur(6px)" : "blur(0px)",
                      pointerEvents: x ? "none" : "auto",
                      transition:
                        "opacity 0.32s ease, transform 0.32s ease, filter 0.32s ease",
                    },
                    children: [
                      (0, o.jsxs)("div", {
                        className: "avatar-container",
                        style: {
                          position: "relative",
                          width: 120,
                          height: 120,
                          margin: "0 auto 15px",
                        },
                        children: [
                          (0, o.jsx)("img", {
                            src: p(i.id, i.avatar || "", 256, i),
                            className: "avatar-img",
                            alt: "miso's Avatar",
                            style: {
                              width: 120,
                              height: 120,
                              borderRadius: "50%",
                              border: "3px solid rgba(0,0,0,0.8",
                              objectFit: "cover",
                              boxShadow: "rgba(0,0,0,0.56) 0px 22px 70px 4px",
                              outline: "1px solid rgba(255,255,255,0.08",
                            },
                          }),
                          (0, o.jsx)("img", {
                              src: "https://cdn.discordapp.com/avatar-decoration-presets/a_8eec6d2e73acee219217e2d3da4af753.png?size=240&passthrough=true",
                              className:
                                "position-absolute top-0 start-0 w-100 h-100",
                              alt: "Decoration",
                              style: { position: "absolute", top: -18, left: -18, width: 156, height: 156, pointerEvents: "none", zIndex: 3, filter: "drop-shadow(0 0 14px rgba(176, 69, 255, 0.95))" },
                            }),
                        ],
                      }),
                      (0, o.jsxs)("h2", {
                        className: "fw-bold mb-1",
                        style: {
                          fontFamily:
                            "gg sans, gg sans Normal, ABC Ginto Nord, Whitney, Noto Sans, sans-serif",
                        },
                        children: [
                          (0, o.jsx)("span", {
                            className: "discord-name-style",
                            children: "ˡᵃˢᵗPapiGEGamer🐾ྀི",
                          }),
                          (0, o.jsx)("span", {
                            className: "status-indicator status-online ms-2",
                            "data-bs-toggle": "tooltip",
                            title: "Online",
                            style: {
                              display: "inline-block",
                              width: 10,
                              height: 10,
                              borderRadius: "50%",
                              backgroundColor: "#23a55a",
                              boxShadow: "0 0 8px #23a55a",
                              marginLeft: 5,
                            },
                          }),
                        ],
                      }),
                      (0, o.jsx)("div", { className: "mb-1" }),
                      (0, o.jsx)("div", {
                        className: "welcome-text",
                        style: {
                          fontSize: "1.2rem",
                          margin: "15px 0",
                          color: "#ffc7d4",
                        },
                        children: "✨ Welcome to my profile ♡⸝⸝ ✨",
                      }),
                      (0, o.jsxs)("div", {
                        className: "discord-widget",
                        style: {
                          position: "relative",
                          overflow: "hidden",
                          background: "rgba(0,0,0,0.25)",
                          borderRadius: 12,
                          padding: "10px 15px",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 12,
                          margin: "20px 0",
                          border: "1px solid rgba(255,255,255,0.08)",
                        },
                        children: [
                          (0, o.jsx)("video", {
                            autoPlay: !0,
                            loop: !0,
                            muted: !0,
                            playsInline: !0,
                            preload: "auto",
                            style: {
                              position: "absolute",
                              inset: 0,
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                              zIndex: 0,
                              opacity: 1,
                              filter: "blur(0px)",
                              pointerEvents: "none",
                            },
                            children: (0, o.jsx)("source", {
                              src: "https://cdn.discordapp.com/assets/collectibles/nameplates/nameplates/vengeance/asset.webm",
                              type: "video/webm",
                            }),
                          }),
                          (0, o.jsx)("img", {
                            src: p(i.id, i.avatar || "", 64, i),
                            className: "discord-pfp",
                            alt: "Discord",
                            style: {
                              width: 40,
                              height: 40,
                              borderRadius: "50%",
                              objectFit: "cover",
                            },
                          }),
                          (0, o.jsxs)("div", {
                            className: "text-start",
                            children: [
                              (0, o.jsxs)("div", {
                                className: "fw-bold text-white",
                                children: [
                                  (0, o.jsx)("span", {
                                    onClick: async () => {
                                      try {
                                        await navigator.clipboard.writeText(
                                          i.username,
                                        );
                                      } catch (t) {
                                        let e =
                                          document.createElement("textarea");
                                        (e.value = i.username),
                                          document.body.appendChild(e),
                                          e.select(),
                                          document.execCommand("copy"),
                                          document.body.removeChild(e);
                                      }
                                      g(!0), setTimeout(() => g(!1), 1e3);
                                    },
                                    title: "Click to copy",
                                    style: { cursor: "pointer" },
                                    children: f ? "¡Copiado!" : i.username,
                                  }),
                                  (0, o.jsxs)("span", {
                                    children: [
                                      (0, o.jsx)("img", {
                                        src: "/miso/badges/discord/bravery.png",
                                        alt: "Hypesquad Bravery",
                                        width: 22,
                                        height: 22,
                                        className: "ms-1",
                                        "data-bs-toggle": "tooltip",
                                        title: "Hypesquad Bravery",
                                      }),
                                      (0, o.jsx)("img", {
                                        src: "/miso/badges/discord/nitro.png",
                                        alt: "Nitro Gold",
                                        width: 22,
                                        height: 22,
                                        className: "ms-1",
                                        "data-bs-toggle": "tooltip",
                                        title: "Nitro Gold",
                                      }),
                                      (0, o.jsx)("img", {
                                        src: "/miso/badges/discord/booster-gem.png",
                                        alt: "Server Booster",
                                        width: 22,
                                        height: 22,
                                        className: "ms-1",
                                        "data-bs-toggle": "tooltip",
                                        title: "Server Booster",
                                      }),
                                      (0, o.jsx)("img", {
                                        src: "/miso/badges/discord/quest.png",
                                        alt: "Completed  a Quest",
                                        width: 22,
                                        height: 22,
                                        className: "ms-1",
                                        "data-bs-toggle": "tooltip",
                                        title: "Completed a Quest",
                                      }),
                                      (0, o.jsx)("img", {
                                        src: "/miso/badges/discord/apprentice.png",
                                        alt: "Orbs Apprentice",
                                        width: 22,
                                        height: 22,
                                        className: "ms-1",
                                        "data-bs-toggle": "tooltip",
                                        title: "Orbs Apprentice",
                                      }),
                                    ],
                                  }),
                                ],
                              }),
                              (0, o.jsxs)("div", {
                                className: "small opacity-75 text-white",
                                style: { fontSize: "12px" },
                                children: [
                                  (0, o.jsx)("img", {
                                    src: "/miso/fnlb.svg",
                                    alt: "FNLB",
                                    width: 16,
                                    height: 16,
                                    className: "",
                                  }),
                                  " discord.gg/fnlb",
                                ],
                              }),
                            ],
                          }),
                        ],
                      }),
                      (0, o.jsxs)("div", {
                        className: "roles-display discord-widget",
                        style: {
                          background: "rgba(255,255,255,0.05)",
                          borderRadius: 12,
                          padding: "10px 5px",
                          display: "flex",
                          alignItems: "center",
                          gap: 12,
                          margin: "20px 0",
                          border: "1px solid rgba(255,255,255,0.08)",
                        },
                        children: [
                          (0, o.jsx)("div", {
                            style: {
                              width: 28,
                              height: 28,
                              borderRadius: 8,
                              display: "grid",
                              placeItems: "center",
                              background: "rgba(255,255,255,0.06)",
                              border: "1px solid rgba(255,255,255,0.10)",
                              flex: "0 0 auto",
                            },
                            "data-bs-toggle": "tooltip",
                            title: "Suna",
                            children: (0, o.jsx)("img", {
                              src: "/cat/papi-icon.png",
                              alt: "Suna",
                              width: 24,
                              height: 24,
                              style: { display: "block" },
                            }),
                          }),
                          (0, o.jsx)("div", {
                            style: {
                              display: "flex",
                              flexWrap: "wrap",
                              gap: 8,
                              alignItems: "center",
                            },
                            children: Object.entries(rM).map(([t, e]) => {
                              let i = rA[t] ?? "#fff";
                              return (0, o.jsxs)(
                                "div",
                                {
                                  className: "role-badge",
                                  style: {
                                    padding: "1px 6px",
                                    borderRadius: 20,
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 6,
                                    background: `${i}20`,
                                    border: `1px solid ${i}40`,
                                    color: i,
                                  },
                                  children: [
                                    (0, o.jsx)("img", {
                                      src: `/miso/badges/suna/${e}`,
                                      alt: t,
                                      width: 16,
                                      height: 16,
                                      style: { display: "block" },
                                    }),
                                    (0, o.jsx)("span", {
                                      style: {
                                        fontWeight: 700,
                                        fontSize: "11px",
                                      },
                                      children: t,
                                    }),
                                  ],
                                },
                                t,
                              );
                            }),
                          }),
                        ],
                      }),
                      (0, o.jsxs)("div", {
                        className: "roles-display discord-widget",
                        style: {
                          background: "rgba(255,255,255,0.05)",
                          borderRadius: 12,
                          padding: "10px 5px",
                          display: "flex",
                          alignItems: "center",
                          gap: 12,
                          margin: "20px 0",
                          border: "1px solid rgba(255,255,255,0.08)",
                        },
                        children: [
                          (0, o.jsx)("div", {
                            style: {
                              width: 28,
                              height: 28,
                              borderRadius: 8,
                              display: "grid",
                              placeItems: "center",
                              background: "rgba(255,255,255,0.06)",
                              border: "1px solid rgba(255,255,255,0.10)",
                              flex: "0 0 auto",
                            },
                            "data-bs-toggle": "tooltip",
                            title: "FNLB",
                            children: (0, o.jsx)("img", {
                              src: "/cat/fnlb.png",
                              alt: "FNLB",
                              width: 24,
                              height: 24,
                              style: {
                                display: "block",
                                borderRadius: 6,
                                objectFit: "cover",
                              },
                            }),
                          }),
                          (0, o.jsx)("div", {
                            style: {
                              display: "flex",
                              flexWrap: "wrap",
                              gap: 8,
                              alignItems: "center",
                            },
                            children: Object.entries(rk).map(([t, e]) => {
                              let i = rC[t] ?? "#fff";
                              return (0, o.jsxs)(
                                "div",
                                {
                                  className: "role-badge",
                                  style: {
                                    padding: "1px 6px",
                                    borderRadius: 20,
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 6,
                                    background: `${i}20`,
                                    border: `1px solid ${i}40`,
                                    color: i,
                                  },
                                  children: [
                                    (0, o.jsx)("img", {
                                      src: `/miso/badges/fnlb/${e}`,
                                      alt: t,
                                      width: 16,
                                      height: 16,
                                      style: { display: "block" },
                                    }),
                                    (0, o.jsx)("span", {
                                      style: {
                                        fontWeight: 700,
                                        fontSize: "11px",
                                      },
                                      children: t,
                                    }),
                                  ],
                                },
                                t,
                              );
                            }),
                          }),
                        ],
                      }),
                      (0, o.jsxs)("div", {
                        className: "roles-display discord-widget nate-widget-trigger",
                        onClick: () => {
                          y(!0);
                        },
                        onKeyDown: (t) => {
                          ("Enter" === t.key || " " === t.key) &&
                            (t.preventDefault(), y(!0));
                        },
                        role: "button",
                        tabIndex: 0,
                        style: {
                          background: "rgba(255,255,255,0.05)",
                          borderRadius: 12,
                          padding: "10px 5px",
                          display: "flex",
                          alignItems: "center",
                          gap: 12,
                          margin: "20px 0",
                          border: "1px solid rgba(255,255,255,0.08)",
                          cursor: "pointer",
                        },
                        children: [
                          (0, o.jsx)("div", {
                            style: {
                              width: 28,
                              height: 28,
                              borderRadius: 8,
                              display: "grid",
                              placeItems: "center",
                              background: "rgba(255,255,255,0.06)",
                              border: "1px solid rgba(255,255,255,0.10)",
                              flex: "0 0 auto",
                            },
                            "data-bs-toggle": "tooltip",
                            title: "Nate Gentile",
                            children: (0, o.jsx)("img", {
                              src: "/cat/nate-gentile-icon.png",
                              alt: "Nate Gentile",
                              width: 24,
                              height: 24,
                              style: {
                                display: "block",
                                borderRadius: 6,
                                objectFit: "cover",
                              },
                            }),
                          }),
                          (0, o.jsx)("div", {
                            style: {
                              display: "flex",
                              flexWrap: "wrap",
                              gap: 8,
                              alignItems: "center",
                            },
                            children: Object.entries(rSunaBadges).map(
                              ([t, e]) => {
                                let i = rSunaColors[t] ?? "#fff";
                                return (0, o.jsxs)(
                                  "div",
                                  {
                                    className: "role-badge",
                                    style: {
                                      padding: "1px 6px",
                                      borderRadius: 20,
                                      display: "flex",
                                      alignItems: "center",
                                      gap: 6,
                                      background: `${i}20`,
                                      border: `1px solid ${i}40`,
                                      color: i,
                                    },
                                    children: [
                                      (0, o.jsx)("img", {
                                        src: `/miso/badges/suna/${e}`,
                                        alt: t,
                                        width: 16,
                                        height: 16,
                                        style: { display: "block" },
                                      }),
                                      (0, o.jsx)("span", {
                                        style: {
                                          fontWeight: 700,
                                          fontSize: "11px",
                                        },
                                        children: t,
                                      }),
                                    ],
                                  },
                                  t,
                                );
                              },
                            ),
                          }),
                        ],
                      }),
                      (0, o.jsxs)("div", {
                        className: "socials",
                        style: {
                          display: "flex",
                          justifyContent: "center",
                          gap: 20,
                          marginTop: 25,
                        },
                        children: [
                          (0, o.jsx)("a", {
                            href: `https://discord.com/users/${i.id}`,
                            target: "_blank",
                            rel: "noopener noreferrer",
                            className: "social-link",
                            "data-bs-toggle": "tooltip",
                            title: "Discord",
                            style: {
                              color: "white",
                              opacity: 0.75,
                              transition: "all 0.3s ease",
                            },
                            children: (0, o.jsx)("i", {
                              className: "fab fa-discord",
                            }),
                          }),
                          (0, o.jsx)("a", {
                            href: "https://open.spotify.com/user/31orhfc3wtdlzhcrdviiuhmn6pmu?si=9437b0102c894f1b",
                            target: "_blank",
                            rel: "noopener noreferrer",
                            className: "social-link",
                            "data-bs-toggle": "tooltip",
                            title: "Spotify",
                            children: (0, o.jsx)("i", {
                              className: "fab fa-spotify",
                            }),
                          }),
                          (0, o.jsx)("a", {
                            href: "https://www.instagram.com/papigegamer/",
                            target: "_blank",
                            rel: "noopener noreferrer",
                            className: "social-link",
                            "data-bs-toggle": "tooltip",
                            title: "Instagram",
                            children: (0, o.jsx)("i", {
                              className: "fab fa-instagram",
                            }),
                          }),
                          (0, o.jsx)("a", {
                            href: "https://steamcommunity.com/profiles/76561199208176643/",
                            target: "_blank",
                            rel: "noopener noreferrer",
                            className: "social-link",
                            "data-bs-toggle": "tooltip",
                            title: "Steam",
                            children: (0, o.jsx)("i", {
                              className: "fab fa-steam",
                            }),
                          }),
                          (0, o.jsx)("a", {
                            href: "https://fnlb.net/",
                            target: "_blank",
                            rel: "noopener noreferrer",
                            className: "social-link",
                            "data-bs-toggle": "tooltip",
                            title: "FNLB",
                            children: (0, o.jsx)("img", {
                              src: "/miso/fnlb.svg",
                              alt: "FNLB",
                              width: 18,
                              height: 18,
                              className: "",
                            }),
                          }),
                          (0, o.jsx)("a", {
                            href: "https://suna.my",
                            target: "_blank",
                            rel: "noopener noreferrer",
                            className: "social-link",
                            "data-bs-toggle": "tooltip",
                            title: "Suna",
                            style: {
                              color: "white",
                              opacity: 0.75,
                              transition: "all 0.3s ease",
                            },
                            children: (0, o.jsx)("img", {
                              src: "https://suna.my/suna/icon.png",
                              alt: "Suna",
                              width: 18,
                              height: 18,
                              className: "filter: grayscale(1)",
                            }),
                          }),
                          (0, o.jsx)("a", {
                            href: "https://donate.stripe.com/14AbJ17PjcujdcNdWug360k",
                            target: "_blank",
                            rel: "noopener noreferrer",
                            className: "social-link",
                            "data-bs-toggle": "tooltip",
                            title: "Donate",
                            children: (0, o.jsx)("i", {
                              className: "fas fa-dollar-sign",
                            }),
                          }),
                        ],
                      }),
                      (0, o.jsxs)("div", {
                        className: "mt-4 small opacity-50 text-white",
                        children: [
                          (0, o.jsx)("i", {
                            className: "fas fa-calendar me-2",
                          }),
                          "Account created:",
                          " ",
                          i.accountCreated ||
                            new Date(
                              parseInt(i.id) / 4194304 + 14200704e5,
                            ).toLocaleDateString(),
                        ],
                      }),
                    ],
                  }),
                  (0, o.jsx)("div", {
                    className: "discord-scene" + (x ? " show" : ""),
                    onClick: () => y(!1),
                    children: (0, o.jsxs)("div", {
                      className: "discord-scene-card",
                      onClick: (t) => t.stopPropagation(),
                      children: [
                        (0, o.jsxs)("div", {
                          className: "discord-scene-header",
                          children: [
                            (0, o.jsxs)("div", {
                              className: "discord-scene-title-wrap",
                              children: [
                                (0, o.jsx)("img", {
                                  src: "/cat/nate-gentile-icon.png",
                                  alt: "Nate Gentile",
                                  width: 20,
                                  height: 20,
                                  style: { borderRadius: 5, objectFit: "cover" },
                                }),
                                (0, o.jsx)("span", {
                                  className: "discord-scene-title",
                                  children: "FNLB Discord",
                                }),
                              ],
                            }),
                            (0, o.jsx)("button", {
                              type: "button",
                              className: "discord-scene-close",
                              onClick: () => y(!1),
                              children: "Volver",
                            }),
                          ],
                        }),
                        (0, o.jsx)("div", {
                          className: "discord-scene-body",
                          children: (0, o.jsx)("iframe", {
                            src: "https://discord.com/widget?id=822550944608026645&theme=dark",
                            width: "100%",
                            height: "390",
                            allowTransparency: "true",
                            frameBorder: "0",
                            sandbox:
                              "allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts",
                            style: {
                              border: "none",
                              borderRadius: 12,
                              width: "100%",
                              background: "rgba(0,0,0,0.25)",
                            },
                          }),
                        }),
                        (0, o.jsxs)("div", {
                          className: "discord-scene-footer",
                          children: [
                            (0, o.jsx)("span", {
                              children: w
                                ? "Cargando servidor..."
                                : b
                                  ? (b.presence_count ?? 0) + " online"
                                  : "Servidor de Discord",
                            }),
                            b &&
                              b.instant_invite &&
                              (0, o.jsx)("a", {
                                href: b.instant_invite,
                                target: "_blank",
                                rel: "noopener noreferrer",
                                className: "discord-scene-join",
                                children: "Unirse",
                              }),
                          ],
                        }),
                      ],
                    }),
                  }),
                ],
              }),
            }),
          }),
        ],
      });
    }
    t.s(["default", () => rV], 52683);
  },
]);











