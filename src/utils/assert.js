"use strict";

const assert = (prop) => {
    if (prop === undefined) {
        throw new Error(`${prop} must be initialized`);
    }

    return prop;
};

module.exports = assert;
