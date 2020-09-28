/* eslint-disable no-param-reassign */
class Blocks {
  constructor() {
    this.pages2blocks = '../../common.blocks';
  }

  createConfig(...configs) {
    const mergedConfig = {};
    configs.forEach((config) => {
      this.mergeConfig(mergedConfig, config);
    });
    return mergedConfig;
  }

  mergeConfig(obj1, obj2) {
    // for(key2 in obj2)
    Object.entries(obj2).forEach(([key2]) => {
      if (typeof (obj2[key2]) === 'object') {
        let matched = false;
        Object.entries(obj1).forEach(([key1]) => {
          if (key1 === key2) {
            obj1[key2] = this.mergeConfig(obj1[key2], obj2[key2]);
            matched = true;
          }
        });

        if (!matched) {
          obj1[key2] = this.mergeConfig({}, obj2[key2]);
        }
      } else {
        obj1[key2] = obj2[key2];
      }
    });

    return obj1;
  }
}

module.exports = new Blocks();
