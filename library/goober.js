var r = { data: '' },
  t = function (t) {
    try {
      var e = t ? t.querySelector('#_goober') : self._goober
      return (
        e ||
          (((e = (t || document.head).appendChild(
            document.createElement('style')
          )).innerHTML = ' '),
          (e.id = '_goober')),
        e.firstChild
      )
    } catch (r) {}
    return r
  },
  e = function (r) {
    var e = t(r),
      n = e.data
    return (e.data = ''), n
  },
  n = /(?:([a-z0-9-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(})/gi,
  a = /\/\*.*?\*\/|\s{2,}|\n/gm,
  o = function (r, t, e) {
    var n = '',
      a = '',
      c = ''
    for (var i in r) {
      var u = r[i]
      if ('object' == typeof u) {
        var s = t + ' ' + i
        ;/&/g.test(i) && (s = i.replace(/&/g, t)),
          '@' == i[0] && ((s = t), 'f' == i[1] && (s = i)),
          /@k/.test(i)
            ? (a += i + '{' + o(u, '', '') + '}')
            : (a += o(u, s, s == t ? i : e || ''))
      } else
        /^@i/.test(i)
          ? (c = i + ' ' + u + ';')
          : (n += i.replace(/[A-Z]/g, '-$&').toLowerCase() + ':' + u + ';')
    }
    if (n.charCodeAt(0)) {
      var f = t + '{' + n + '}'
      return e ? a + e + '{' + f + '}' : c + f + a
    }
    return c + a
  },
  c = {},
  i = function (r, t, e, i) {
    var u = JSON.stringify(r),
      s =
        c[u] ||
        (c[u] =
          '.go' +
          u.split('').reduce(function (r, t) {
            return (101 * r + t.charCodeAt(0)) >>> 0
          }, 11))
    return (
      (function (r, t, e) {
        t.data.indexOf(r) < 0 && (t.data = e ? r + t.data : t.data + r)
      })(
        c[s] ||
          (c[s] = o(
            r[0]
              ? (function (r) {
                  for (var t, e = [{}]; (t = n.exec(r.replace(a, ''))); )
                    t[4] && e.shift(),
                      t[3]
                        ? e.unshift((e[0][t[3]] = e[0][t[3]] || {}))
                        : t[4] || (e[0][t[1]] = t[2])
                  return e[0]
                })(r)
              : r,
            e ? '' : s
          )),
        t,
        i
      ),
      s.slice(1)
    )
  },
  u = function (r, t, e) {
    return r.reduce(function (r, n, a) {
      var o = t[a]
      if (o && o.call) {
        var c = o(e),
          i = (c && c.props && c.props.className) || (/^go/.test(c) && c)
        o = i ? '.' + i : c && c.props ? '' : c
      }
      return r + n + (null == o ? '' : o)
    }, '')
  }
function s(r) {
  var e = this || {},
    n = r.call ? r(e.p) : r
  return i(
    n.map ? u(n, [].slice.call(arguments, 1), e.p) : n,
    t(e.target),
    e.g,
    e.o
  )
}
var f,
  l = s.bind({ g: 1 }),
  d = function (r) {
    return (f = r)
  }
function p(r) {
  var t = this || {}
  return function () {
    var e = arguments
    return function (n) {
      var a = (t.p = Object.assign({}, n)),
        o = a.className
      return (
        (t.o = /\s*go[0-9]+/g.test(o)),
        (a.className = s.apply(t, e) + (o ? ' ' + o : '')),
        f(r, a)
      )
    }
  }
}
export { p as styled, d as setPragma, e as extractCss, s as css, l as glob }
