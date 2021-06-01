class UserData {
  static hasEmptyRequiredFields(requiredValues){
    return requiredValues.some(value => value === '');
  }
}

export default UserData;
