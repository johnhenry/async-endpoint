//     
import map from "./array-like/map.js";
import forEach from "./array-like/for-each.js";
import filter from "./array-like/filter.js";
import reduce from "./array-like/reduce.js";
import reduceRight from "./array-like/reduce-right.js";
export default class extends Array      {
               
                   
                     
                             
                          
  constructor(...args       ) {
    super(...args);
  }
  valueOf() {
    return this._latest;
  }
  push(value     ) {
    if (this._resumeIteration) {
      this._resumeIteration(value);
      return 1;
    }
    return super.push(value);
  }
  unshift(value     ) {
    if (this._resumeIteration) {
      this._resumeIteration(value);
      return 1;
    }
    return super.unshift(value);
  }
  unfreeze() {
    delete this._frozen;
  }
  freeze() {
    this._frozen === true;
    if (this._resumeIteration) {
      this._resumeIteration(this._latest);
    }
  }
  clear(count         = Infinity) {
    while (this.length && count--) {
      super.shift();
    }
  }
  cancel() {
    this._canceled = true;
    this.clear();
    if (this._endIteration) {
      this._endIteration();
    }
  }
  set value(val     ) {
    this._latest = val;
    this.freeze();
  }
  get value()      {
    return this._latest;
  }
  filter(condition     )      {
    // $FlowFixMe
    return filter(this, condition);
  }
  map(mapper     )      {
    // $FlowFixMe
    return map(this, mapper);
  }
  forEach(callback     )      {
    // $FlowFixMe
    return map(this, callback);
  }
  reduce(...args       )      {
    // $FlowFixMe
    return reduce(this, ...args);
  }
  reduceRight(...args       )      {
    // $FlowFixMe
    return reduceRight(this, ...args);
  }
  async next() {
    if (this._canceled === true) {
      return { done: true };
    }
    if (this._frozen === true) {
      return { value: this._latest, done: true };
    }
    if (this.length) {
      this._latest = this.shift();
      return { value: this._latest };
    }
    return new Promise(resolve => {
      this._resumeIteration = value => {
        delete this._resumeIteration;
        delete this._endIteration;
        this._latest = value;
        resolve({ value });
      };
      this._endIteration = () => {
        delete this._resumeIteration;
        delete this._endIteration;
        resolve({ done: true });
      };
    });
  }
  // $FlowFixMe
  [Symbol.asyncIterator]() {
    return this;
  }
}

//# sourceMappingURL=async-array.js.map
