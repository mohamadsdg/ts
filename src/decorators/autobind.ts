export function autobind(_: any, _2: string, descript: PropertyDescriptor) {
  const originalMethod = descript.value;
  const adjDescriptor = {
    configurable: true,
    enumerable: true,
    get() {
      return originalMethod.bind(this);
    }
  };
  return adjDescriptor;
}
