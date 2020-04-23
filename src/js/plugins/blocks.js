class Blocks 
{
  configMerge(object1, object2){
    let finalObject = {};

    if(typeof(object1) == "array"){
      return "hello";
    }
    else {
      for (key1 in object1){

        finalObject[key1] = object1[key1];

        for(key2 in object2){
          if(key1 == key2){
            if(typeof(object1[key2]) == "object" || typeof(object1[key2]) == "array"){
              finalObject[key2] = this.configMerge(object1[key2], object2[key2]);
              delete object2[key2];
            }
            else {
              finalObject[key2] = object2[key2];
              delete object2[key2];
            }
          }
        }
      }
    }

    return finalObject;
  }
}

module.exports = new Blocks;