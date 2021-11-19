class UserData {
  static hasEmptyRequiredFields(requiredValues) {
    return requiredValues.some(value => value === '');
  }
  static hasBusiness(){
    const user = localStorage.getItem('user');
    if(user){
      return JSON.parse(user).hasEntrepreneurship;
    }
    return false;
  }
  static getUserFromStorage() {
    const user = localStorage.getItem('user');
    if (user) {
      return JSON.parse(user);
    }

    return null;
  }

  static isUserBusiness(businessName){
    const user = localStorage.getItem('user');
    
    if (user) {
      const parseUser = JSON.parse(user);
      if(parseUser.hasEntrepreneurship){
        return parseUser.entrepreneurshipName === businessName;
      }
    }

    return false;
  }
}

export default UserData;
