var aHero = function() {
   var rnd = Math.floor((Math.random() * 3) + 1) ;
   if (rnd == 1) return 'Q';
   else if (rnd == 2) return 'K';
   else return 'H';
};

var aBoy = function(){
  var rnd = Math.floor((Math.random() * 3) + 1) ;
  if (rnd == 1) return 'I';
  else if (rnd == 2) return 'O';
  else return 'U';
};

var aGirl = function(){
  var rnd = Math.floor((Math.random() * 3) + 1) ;
  return rnd;
};

var func = function(){
    var hero = aHero();
    var fun = function(){
      var boy = aBoy();
      var f = function(){
        var girl = aGirl();
        console.log(hero+boy+girl);
      };
      f();
    };
    fun();
    fun();
};
func();
