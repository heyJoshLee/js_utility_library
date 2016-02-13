(function() {

  var findObjs = function(element, props, multiple) {
    var match = multiple ? [] : undefined;
    element.some(function(obj) {
      var all_match = true;
      for (var prop in props) {
          if (!(prop in obj) || obj[prop] !== props[prop]) {
            all_match = false;
          }
      }
      if (all_match) {
        if (multiple) {
          match.push(obj)
        } else {
          match = obj;
          return true;
        }
      }
    });
    return match;
  };

  var _ = function(element) {
    u = {
      first: function() {
        return element[0];
      },

      last: function() {
        return element[element.length - 1];
      },

      without: function() {
        var new_arr = [],
            args = Array.prototype.slice.call(arguments);

        element.forEach(function(el) {
          if (args.indexOf(el) === -1) {
            new_arr.push(el);
          }
        });
        return new_arr;
      },

      sample: function(qty) {
        var sampled = [],
          copy = element.slice(),
          get = function() {
              var idx = Math.floor(Math.random() * copy.length),
                  el = copy[idx];
                  copy.splice(idx, 1);
                  return el;
            };
          if (!qty) { return  get(); }
          while (qty) {
            sampled.push(get());
            qty--;
          }
          return sampled;
      },

      pluck: function(query) {
        var vals = [];

        element.forEach(function(obj) {
          if (obj[query]) {
            vals.push(obj[query]);
          }
        });
        return vals;
      },

      keys: function() {
        var keys = [];

        for (var prop in element) {
          keys.push(prop);
        }
        return keys;
      },

      values: function() {
        var values = [];
        for (var prop in element) {
          values.push(element[prop]);
        }
        return values;
      },

      findWhere: function(props) {
        return findObjs(element, props, false);
      },

      where: function(props) {
        return findObjs(element, props, true);
      },

      lastIndexOf: function(search) {
        var idx = -1;

        for(var i = element.length - 1; i >= 0; i--) {
          if (element[i] === search) {
            idx = i;
            break
          }
        }
        return idx;
      }
    };

    return u;
  };

  _.range = function(start, stop) {
    var range  = []
    if (stop === undefined) {
      stop = start;
      start = 0;
    }

    for(var i = start; i < stop; i++) {
      range.push(i);
    }
    return range;
  };

  window._ = _;
})();
