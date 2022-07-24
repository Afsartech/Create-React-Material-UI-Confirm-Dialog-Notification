const KEYS = {
    userTypes: 'userTypes',
    userTypeId: 'userTypeId'
}

export const getDepartmentCollection = () => ([
    { id: '1', title: 'Admin' },
    { id: '2', title: 'Vendor' },
    { id: '3', title: 'Tenant' },
    { id: '4', title: 'Property Manager' },
    { id: '5', title: 'Owner' },
])

export function insertuserType(data) {
    let userTypes = getAlluserTypes();
    data['id'] = generateuserTypeId()
    userTypes.push(data)
    localStorage.setItem(KEYS.userTypes, JSON.stringify(userTypes))
}

export function updateuserType(data) {
    let userTypes = getAlluserTypes();
    let recordIndex = userTypes.findIndex(x => x.id == data.id);
    userTypes[recordIndex] = { ...data }
    localStorage.setItem(KEYS.userTypes, JSON.stringify(userTypes));
}

export function deleteuserType(id) {
    let userTypes = getAlluserTypes();
    userTypes = userTypes.filter(x => x.id != id)
    localStorage.setItem(KEYS.userTypes, JSON.stringify(userTypes));
}

export function generateuserTypeId() {
    if (localStorage.getItem(KEYS.userTypeId) == null)
        localStorage.setItem(KEYS.userTypeId, '0')
    var id = parseInt(localStorage.getItem(KEYS.userTypeId))
    localStorage.setItem(KEYS.userTypeId, (++id).toString())
    return id;
}

export function getAlluserTypes() {
    if (localStorage.getItem(KEYS.userTypes) == null)
        localStorage.setItem(KEYS.userTypes, JSON.stringify([]))
    let userTypes = JSON.parse(localStorage.getItem(KEYS.userTypes));
    //map departmentID to department title
    let departments = getDepartmentCollection();
    return userTypes.map(x => ({
        ...x,
        department: departments[x.departmentId - 1].title
    }))
}