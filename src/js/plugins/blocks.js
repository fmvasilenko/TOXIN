class Blocks 
{
  mergeConfig(obj1, obj2){
    let finalObject = obj1;

    for(key2 in obj2){
      if(typeof(obj2[key2]) == "object"){
        let matched = false;
        for(key1 in obj1){
          if(key1 == key2){
            finalObject[key2] = this.mergeConfig(obj1[key2], obj2[key2]);
            matched = true;
          }
        }
        if(!matched){
          finalObject[key2] = obj2[key2];
        }
      }
      else {
        finalObject[key2] = obj2[key2];
      }
    }

    return finalObject;
  }
}

module.exports = new Blocks;