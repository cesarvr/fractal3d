var util = {

  createEL: function(str){ 
    var div = document.createElement('div');
    div.innerHTML = str;
    return div;
  },

};

module.exports = util;
