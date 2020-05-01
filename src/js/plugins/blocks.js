class Blocks 
{
  constructor(){
    this.pages2blocks = "../../common.blocks";
  }

  addElement() {
    let div = "<div> hello </div>";
    return div;
  }

  includeBlocks(fileNames = []) {
    let includes = "";

    fileNames.forEach( (name) => {
      includes += `include ${this.pages2blocks}/${name}/${name}.pug \n`;
    });

    return includes;
  }

  createConfig(...configs) {
    let mergedConfig = {};
    for (let config of configs) {
      this.mergeConfig(mergedConfig, config);
    }
    return mergedConfig;
  }
  
  mergeConfig(obj1, obj2){

    for(key2 in obj2){
      if(typeof(obj2[key2]) == "object"){
        let matched = false;
        for(key1 in obj1){
          if(key1 == key2){
            obj1[key2] = this.mergeConfig(obj1[key2], obj2[key2]);
            matched = true;
          }
        }
        if(!matched){
          obj1[key2] = this.mergeConfig({}, obj2[key2]);
        }
      }
      else {
        obj1[key2] = obj2[key2];
      }
    }

    return obj1;
  }
}

module.exports = new Blocks;