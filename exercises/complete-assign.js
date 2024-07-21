// This is an assign function that copies full descriptors.
function completeAssign(target, ...sources) {
    sources.forEach((source) => {
        const descriptors = Object.keys(source).reduce((descriptors, key) => {
            descriptors[key] = Object.getOwnPropertyDescriptor(source, key);
            return descriptors;
        }, {});

        // By default, Object.assign copies enumerable Symbols, too
        Object.getOwnPropertySymbols(source).forEach((sym) => {
            const descriptor = Object.getOwnPropertyDescriptor(source, sym);
            if (descriptor.enumerable) {
                descriptors[sym] = descriptor;
            }
        });
        Object.defineProperties(target, descriptors);
    });

    return target;
}
