const tryRequire = require('try-require');

function getManufacturer(node) {
  return `${node.manufacturer} (${node.manufacturerid})`;
}

function getValueInstanceId(value) {
  return `${value.class_id}-${value.instance}`
}

function getValueId(value) {
  return `${value.class_id}-${value.instance}-${value.index}`
}

function getClassValues(node, classId) {
  const values = node.classes.get(classId);
  if (!values) {
    return null;
  }

  return [ ...values ].map(id => node.values.get(id));
}

function getValueByIndex(values, index) {
  if (!values) {
    return null;
  }

  return values.find(v => v.index === index);
}

function getOrAddService(accessory, service, name) {
  return accessory.getService(service) || accessory.addService(service, name);
}

function getNodeConfig(node) {
  const pathToConfig = `../devices/${node.manufacturerid}/${node.productid}`;
  return tryRequire(pathToConfig, require) || {};
}


module.exports = {
  getManufacturer,
  getValueInstanceId,
  getValueId,
  getClassValues,
  getValueByIndex,
  getOrAddService,
  getNodeConfig
}
