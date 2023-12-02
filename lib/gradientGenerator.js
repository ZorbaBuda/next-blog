function createHex() {
  var hexCode1 = "";
  var hexValues1 = "0123456789abcdef";
  
  for ( var i = 0; i < 6; i++ ) {
    hexCode1 += hexValues1.charAt(Math.floor(Math.random() * hexValues1.length));
  }
  return hexCode1;
}

export default function generate() {
  
  var deg = Math.floor(Math.random() *360);
  
  var gradient = "linear-gradient(" + deg + "deg, " + "#" + createHex() + ", " + "#" + createHex() +")";
  // var gradient = "bg-[linear-gradient(" + deg + "deg,_" + "#" + createHex() + ",_" + "#" + createHex() +")]";


  // bg-[linear-gradient(152deg,_#fff,_#00bfd8_42%,_#0083f5)]
  // bg-[linear-gradient(180deg,_#0f1026_29%,_#1b2040_100%)]
  //linear-gradient(152deg, #00bfd8, #0083f5)
  

  return gradient;
 
}
