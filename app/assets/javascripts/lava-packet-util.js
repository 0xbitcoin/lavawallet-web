/*
LAVA PACKET UTIL for NODEJS
javascript library for NODEJS

Version 0.10

*/



var sampleLavaPacket = {
  method: "transfer",
  from: "0xb11ca87e32075817c82cc471994943a4290f4a14",
  to: "0x357FfaDBdBEe756aA686Ef6843DA359E2a85229c",
  walletAddress:"0x1d0d66272025d7c59c40257813fc0d7ddf2c4826",
  tokenAddress:"0x9d2cc383e677292ed87f63586086cff62a009010",
  tokenAmount:200000000,
  relayerReward:100000000,
  expires:3365044,
  nonce:0xc18f687c56f1b2749af7d6151fa351,
  signature:"0x0" //fix
}


export default class LavaPacketHelper {


  static serializePacketData (obj, prefix) {
    var str = [],
      p;
    for (p in obj) {
      if (obj.hasOwnProperty(p)) {
        var k = prefix ? prefix + "[" + p + "]" : p,
          v = obj[p];
        str.push((v !== null && typeof v === "object") ?
          serialize(v, k) :
          encodeURIComponent(k) + "=" + encodeURIComponent(v));
      }
    }
    return str.join("&");
  }


  static async sendLavaPacket(lavaNodeURL, lavaPacketData)
  {


      if(!lavaNodeURL.startsWith("http://"))
      {
        lavaNodeURL = "http://"+lavaNodeURL;
      }

      if(!lavaNodeURL.endsWith("/lavapacket"))
      {
        lavaNodeURL = lavaNodeURL+"/lavapacket";
      }

      return new Promise(async resolve => {

        var xhr = new XMLHttpRequest();

        xhr.open('POST', lavaNodeURL);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');


        xhr.onreadystatechange = function() {
          if (xhr.readyState === 4) {
            //var response = JSON.parse(xhr.responseText);
              if (xhr.status === 200  ) {
                 console.log('successful');
                 resolve({success:true, packet: lavaPacketData})
              } else {
                 console.log('failed');
                 resolve({success:false, message: 'Request failed.  Returned status of ' + xhr.status});

              }
          }
        }

        xhr.send(LavaPacketHelper.serializePacketData( lavaPacketData ));

      })


  }

}
