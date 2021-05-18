export function renderIf(predicate: (...args: any) => any) {
    return function (
        target: any,
        propertyKey: string,
        descriptor: PropertyDescriptor
    ) {
        console.log('=============================+>', target);
        console.log('=============================+>', propertyKey);
        console.log('=============================+>', descriptor);
        console.log('=============================+>');
        //if (typeof descriptor.value === 'function') {
            //const originalRenderFunction = descriptor.value;

            //descriptor.value = function(...args: any): any {
                //if (predicate(this)) {
                    //return originalRenderFunction.call(this, ...args);
                //}

                //return null;
            //};
        //}

        return descriptor;
    };
}

export function hasProp<T extends {props: any}>(prop: keyof T['props']) {
    return function(instance: T) {
        return Boolean(instance.props[prop]);
    }
}
