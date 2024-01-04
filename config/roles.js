const allRoles = {
  user: ['manageMasters', 'getMasters', 'getAllMasters', 'manageCodes',
    'getCodes', 'manageTeams', 'getUsers', 'manageUsers', 'manageAccess', 'getAccess'],
  admin: ['getUsers', 'manageUsers', 'manageMasters', 'getMasters', 'getAllMasters', 'manageCodes',
    'getCodes', 'manageTeams', 'getUsers', 'manageUsers', 'manageAccess', 'getAccess'],
  manager: ['getManager', 'manageMasters', 'getMasters', 'getAllMasters', 'manageCodes',
    'getCodes', 'manageTeams', 'getUsers', 'manageUsers', 'manageAccess', 'getAccess'],
  engineer: ['manageMasters', 'getMasters', 'getAllMasters', 'manageCodes',
    'getCodes', 'manageTeams', 'getUsers', 'manageUsers', 'manageAccess', 'getAccess'],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
