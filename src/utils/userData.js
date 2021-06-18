class UserData {
  static hasEmptyRequiredFields(requiredValues) {
    return requiredValues.some(value => value === '');
  }

  static getUserFromStorage() {
    const user = localStorage.getItem('user');
    if (user) {
      return JSON.parse(user);
    }

    return null;
  }
}

export default UserData;
