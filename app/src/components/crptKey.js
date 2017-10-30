  // ############################################################################
  // Password Encrypt: Deveopler: Bandon Fizer Git: Http://Github.com/Track7Dev
  // @ Copyright 2017 Track Seven Entertainment & Designs 
  // ############################################################################
  
  export const PassEncrypt = (p) => {
  const pArr = p.split('');
  for(let i = 0; i < pArr.length; i++) {
    if(pArr[i] === "A"){ pArr[i] = "Z"; }
    else  if(pArr[i] === "B"){ pArr[i] = "Y"; }
    else  if(pArr[i] === "C"){ pArr[i] = "X"; }
    else  if(pArr[i] === "D"){ pArr[i] = "W"; }
    else  if(pArr[i] === "E"){ pArr[i] = "V"; }
    else  if(pArr[i] === "F"){ pArr[i] = "U"; }
    else  if(pArr[i] === "G"){ pArr[i] = "T"; }
    else  if(pArr[i] === "H"){ pArr[i] = "S"; }
    else  if(pArr[i] === "I"){ pArr[i] = "R"; }
    else  if(pArr[i] === "J"){ pArr[i] = "Q"; }
    else  if(pArr[i] === "K"){ pArr[i] = "P"; }
    else  if(pArr[i] === "L"){ pArr[i] = "O"; }
    else  if(pArr[i] === "M"){ pArr[i] = "N"; }
    else  if(pArr[i] === "N"){ pArr[i] = "M"; }
    else  if(pArr[i] === "O"){ pArr[i] = "L"; }
    else  if(pArr[i] === "P"){ pArr[i] = "K"; }
    else  if(pArr[i] === "Q"){ pArr[i] = "J"; }
    else  if(pArr[i] === "R"){ pArr[i] = "I"; }
    else  if(pArr[i] === "S"){ pArr[i] = "H"; }
    else  if(pArr[i] === "T"){ pArr[i] = "G"; }
    else  if(pArr[i] === "U"){ pArr[i] = "F"; }
    else  if(pArr[i] === "V"){ pArr[i] = "E"; }
    else  if(pArr[i] === "W"){ pArr[i] = "D"; }
    else  if(pArr[i] === "X"){ pArr[i] = "C"; }
    else  if(pArr[i] === "Y"){ pArr[i] = "B"; }
    else  if(pArr[i] === "Z"){ pArr[i] = "A"; }
    else  if(pArr[i] === "a"){ pArr[i] = "z"; }
    else  if(pArr[i] === "b"){ pArr[i] = "y"; }
    else  if(pArr[i] === "c"){ pArr[i] = "x"; }
    else  if(pArr[i] === "d"){ pArr[i] = "w"; }
    else  if(pArr[i] === "e"){ pArr[i] = "v"; }
    else  if(pArr[i] === "f"){ pArr[i] = "u"; }
    else  if(pArr[i] === "g"){ pArr[i] = "t"; }
    else  if(pArr[i] === "h"){ pArr[i] = "s"; }
    else  if(pArr[i] === "i"){ pArr[i] = "r"; }
    else  if(pArr[i] === "j"){ pArr[i] = "q"; }
    else  if(pArr[i] === "k"){ pArr[i] = "p"; }
    else  if(pArr[i] === "l"){ pArr[i] = "o"; }
    else  if(pArr[i] === "m"){ pArr[i] = "n"; }
    else  if(pArr[i] === "n"){ pArr[i] = "m"; }
    else  if(pArr[i] === "o"){ pArr[i] = "l"; }
    else  if(pArr[i] === "p"){ pArr[i] = "k"; }
    else  if(pArr[i] === "q"){ pArr[i] = "j"; }
    else  if(pArr[i] === "r"){ pArr[i] = "i"; }
    else  if(pArr[i] === "s"){ pArr[i] = "h"; }
    else  if(pArr[i] === "t"){ pArr[i] = "g"; }
    else  if(pArr[i] === "u"){ pArr[i] = "f"; }
    else  if(pArr[i] === "v"){ pArr[i] = "e"; }
    else  if(pArr[i] === "w"){ pArr[i] = "d"; }
    else  if(pArr[i] === "x"){ pArr[i] = "c"; }
    else  if(pArr[i] === "y"){ pArr[i] = "b"; }
    else  if(pArr[i] === "z"){ pArr[i] = "a"; }
    
  }
  for(let i = 0; i < pArr.length; i++) {
    if(pArr[i] === "A"){ pArr[i] = 77; }
    else  if(pArr[i] === "B"){ pArr[i] = 76; }
    else  if(pArr[i] === "C"){ pArr[i] = 75; }
    else  if(pArr[i] === "D"){ pArr[i] = 74; }
    else  if(pArr[i] === "E"){ pArr[i] = 73; }
    else  if(pArr[i] === "F"){ pArr[i] = 72; }
    else  if(pArr[i] === "G"){ pArr[i] = 71; }
    else  if(pArr[i] === "H"){ pArr[i] = 70; }
    else  if(pArr[i] === "I"){ pArr[i] = 69; }
    else  if(pArr[i] === "J"){ pArr[i] = 68; }
    else  if(pArr[i] === "K"){ pArr[i] = 67; }
    else  if(pArr[i] === "L"){ pArr[i] = 66; }
    else  if(pArr[i] === "M"){ pArr[i] = 65; }
    else  if(pArr[i] === "N"){ pArr[i] = 64; }
    else  if(pArr[i] === "O"){ pArr[i] = 63; }
    else  if(pArr[i] === "P"){ pArr[i] = 62; }
    else  if(pArr[i] === "Q"){ pArr[i] = 61; }
    else  if(pArr[i] === "R"){ pArr[i] = 60; }
    else  if(pArr[i] === "S"){ pArr[i] = 59; }
    else  if(pArr[i] === "T"){ pArr[i] = 58; }
    else  if(pArr[i] === "U"){ pArr[i] = 57; }
    else  if(pArr[i] === "V"){ pArr[i] = 56; }
    else  if(pArr[i] === "W"){ pArr[i] = 55; }
    else  if(pArr[i] === "X"){ pArr[i] = 54; }
    else  if(pArr[i] === "Y"){ pArr[i] = 53; }
    else  if(pArr[i] === "Z"){ pArr[i] = 52; }
    else  if(pArr[i] === "a"){ pArr[i] = 51; }
    else  if(pArr[i] === "b"){ pArr[i] = 50; }
    else  if(pArr[i] === "c"){ pArr[i] = 49; }
    else  if(pArr[i] === "d"){ pArr[i] = 48; }
    else  if(pArr[i] === "e"){ pArr[i] = 47; }
    else  if(pArr[i] === "f"){ pArr[i] = 46; }
    else  if(pArr[i] === "g"){ pArr[i] = 45; }
    else  if(pArr[i] === "h"){ pArr[i] = 44; }
    else  if(pArr[i] === "i"){ pArr[i] = 43; }
    else  if(pArr[i] === "j"){ pArr[i] = 42; }
    else  if(pArr[i] === "k"){ pArr[i] = 41; }
    else  if(pArr[i] === "l"){ pArr[i] = 40; }
    else  if(pArr[i] === "m"){ pArr[i] = 39; }
    else  if(pArr[i] === "n"){ pArr[i] = 38; }
    else  if(pArr[i] === "o"){ pArr[i] = 37; }
    else  if(pArr[i] === "p"){ pArr[i] = 36; }
    else  if(pArr[i] === "q"){ pArr[i] = 35; }
    else  if(pArr[i] === "r"){ pArr[i] = 34; }
    else  if(pArr[i] === "s"){ pArr[i] = 33; }
    else  if(pArr[i] === "t"){ pArr[i] = 32; }
    else  if(pArr[i] === "u"){ pArr[i] = 31; }
    else  if(pArr[i] === "v"){ pArr[i] = 30; }
    else  if(pArr[i] === "w"){ pArr[i] = 29; }
    else  if(pArr[i] === "x"){ pArr[i] = 28; }
    else  if(pArr[i] === "y"){ pArr[i] = 27; }
    else  if(pArr[i] === "z"){ pArr[i] = 26; }
    if(!Number.isNaN(pArr[i])){pArr[i] = pArr[i] * 777};
    
  }
  return pArr.join(''); 
}