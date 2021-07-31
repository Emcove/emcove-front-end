class UserData {
  static hasEmptyRequiredFields(requiredValues) {
    return requiredValues.some(value => value === '');
  }
  static hasBusiness(){
    const user = localStorage.getItem('user');
    if(user){
      const business = JSON.parse(user).entrepreneurship;
      if(business){
        return true;
      }
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
      const business = JSON.parse(user).entrepreneurship;
      if(business){
        return business.name === businessName;
      }
    }

    return false;
  }
}

export default UserData;
