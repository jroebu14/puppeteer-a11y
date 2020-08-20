module.exports = {
  name: 'Headings must be in ascending order',

  type: 'automated',

  failsForEach:
    'visible heading (<h2> to <h8>) that does follow the next' +
    ' highest-level heading. For example, a <h3> can only come after' +
    ' a <h2>',

  test: function ({ $, fail, warn }) {
    function eachCons(a, n) {
      var r = []
      for (var i = 0; i < a.length - n + 1; i++) {
        r.push(range(a, i, n))
      }
      return r
    }

    function range(a, i, n) {
      var r = []
      for (var j = 0; j < n; j++) {
        r.push(a[i + j])
      }
      return r
    }

    var headings = $('h1, h2, h3, h4, h5, h6, h7, h8')
    var headingLevels = headings.map(function (index, heading) {
      return { heading: heading, level: parseInt(heading.tagName[1]) }
    })
    eachCons(headingLevels, 2).forEach(function (pair) {
      if (pair[1].level > pair[0].level + 1) {
        fail('Headings are not in order:', pair[0].heading, pair[1].heading)
      }
    })
    if (headingLevels.length > 0 && headingLevels[0].level > 1) {
      warn('First heading was not a main heading:', headingLevels[0].heading)
    }
  },
}
