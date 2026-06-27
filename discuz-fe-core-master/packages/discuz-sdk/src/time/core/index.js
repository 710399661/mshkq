class DZQTime {
  register(
    method,
    methodInterface,
    methodImpl,
  ) {
    if (!methodImpl) this[method] = methodInterface;
    this[method] = methodImpl;
  }
}

export default DZQTime;
