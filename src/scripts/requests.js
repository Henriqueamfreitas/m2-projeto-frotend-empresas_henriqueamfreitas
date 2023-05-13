// We are going to define the URL base
const baseUrl = 'http://localhost:3333'
const stringfiedToken = JSON.parse(localStorage.getItem("@empresas:loginObject")) || ''
const token = stringfiedToken.authToken

const requestHeaders = { 
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,                                  
} 


// We are going to get an array with all the CATEGORIES from the API (Alimetício, varejo ...)
export async function getAllCategories(){
    const allCategories = await fetch(`${baseUrl}/categories/readAll`, {
        method: 'GET',
    })
    .then(async (res) => {
        if(res.ok){
            return res.json()
        } else{
            const response = await res.json()
            console.log(response.message)
        }
    })

    return allCategories
}

// We are going to get an array with all the COMPANIES from the API
export async function getAllCompanies(){
    const allCompanies = await fetch(`${baseUrl}/companies/readAll`, {
        method: 'GET',
    })
    .then(async (res) => {
        if(res.ok){
            return res.json()
        } else{
            const response = await res.json()
            console.log(response.message)
        }
    })

    return allCompanies
}

// We are going to create a function that recieves an object with name, email and password and create a 
// new user with that characteristics
export async function createNewUser(userBody){
    const user = await fetch(`${baseUrl}/employees/create`, {
        method: 'POST',
        headers: requestHeaders,
        body: JSON.stringify(userBody),
    })
    .then(async (res) => {
        if(res.ok){
            console.log('Usuário cadastrado')
            return res.json()
        } else{
            const response = await res.json()
            console.log(response.message)
        }
    })

    return user
}

// We are going to create a function that recieves an object with email and password and check if these 
// credentials are correct
export async function validateLoginUser(userBody){
    const user = await fetch(`${baseUrl}/auth/login`, {
        method: 'POST',
        headers: requestHeaders,
        body: JSON.stringify(userBody),
    })
    .then(async (res) => {
        if(res.ok){
            console.log("credenciais válidas")
            return res.json()
        } else{
            const response = await res.json()
            console.log(response.message)
        }
    })

    return user
}

// We are going to get an array with all the information from the logged user
export async function getLoggedUserInformation(){
    const userInformation = await fetch(`${baseUrl}/employees/profile`, {
        method: 'GET',
        headers: requestHeaders,
    })
    .then(async (res) => {
        if(res.ok){
            return res.json()
        } else{
            const response = await res.json()
            console.log(response.message)
        }
    })

    return userInformation
}

// We are going to create a function that recieves the category ID of the logged user and return
// an array with these department characteristics
export async function getCategoryInformation(categoryId){
    const categoryInformation = await fetch(`${baseUrl}/departments/readById/${categoryId}`, {
        method: 'GET',
        headers: requestHeaders,
    })
    .then(async (res) => {
        if(res.ok){
            return res.json()
        } else{
            const response = await res.json()
            console.log(response.message)
        }
    })

    return categoryInformation
}

// We are going to get an array with all the departments
export async function getAllDepartments(){
    const allDeparments = await fetch(`${baseUrl}/departments/readAll`, {
        method: 'GET',
        headers: requestHeaders,
    })
    .then(async (res) => {
        if(res.ok){
            return res.json()
        } else{
            const response = await res.json()
            console.log(response.message)
        }
    })

    return allDeparments
}

// We are going to create a function that recieves the company ID of the logged user and return
// an array with these company characteristics
export async function getCompanyById(companyId){
    const company = await fetch(`${baseUrl}/companies/readById/${companyId}`, {
        method: 'GET',
        headers: requestHeaders,
    })
    .then(async (res) => {
        if(res.ok){
            return res.json()
        } else{
            const response = await res.json()
            console.log(response.message)
        }
    })

    return company
}

// We are going to get an array with all the employees
export async function getAllEmployees(){
    const AllEmployees = await fetch(`${baseUrl}/employees/readAll`, {
        method: 'GET',
        headers: requestHeaders,
    })
    .then(async (res) => {
        if(res.ok){
            return res.json()
        } else{
            const response = await res.json()
            console.log(response.message)
        }
    })

    return AllEmployees
}

// We are going to create a function that recieves an object with department information and create
// a department with these characteristics
export async function createNewDepartment(departmentBody){
    const newDepartment = await fetch(`${baseUrl}/departments/create`, {
        method: 'POST',
        headers: requestHeaders,
        body: JSON.stringify(departmentBody),
    })
    .then(async (res) => {
        if(res.ok){
            return res.json()
        } else{
            const response = await res.json()
            console.log(response.message)
        }
    })

    return newDepartment
}

// We are going to get an array with all the employees that are unemployed
export async function getAllUnemployed(){
    const allUnemployed = await fetch(`${baseUrl}/employees/outOfWork`, {
        method: 'GET',
        headers: requestHeaders,
    })
    .then(async (res) => {
        if(res.ok){
            return res.json()
        } else{
            const response = await res.json()
            console.log(response.message)
        }
    })

    return allUnemployed
}

// We are going to create a function that recieves an object with departmentId and an UserId and assign
// this employee to this department
export async function hireEmployee(departmentId, employeeId){
    const newEmployee = await fetch(`${baseUrl}/employees/hireEmployee/${employeeId}`, {
        method: 'PATCH',
        headers: requestHeaders,
        body: JSON.stringify(departmentId),
    })
    .then(async (res) => {
        if(res.ok){
            return res.json()
        } else{
            const response = await res.json()
            console.log(response.message)
        }
    })

    return newEmployee
}

// We are going to create a function that recieves an UserId and fire him
export async function fireEmployee(employeeId){
    const firedEmployee = await fetch(`${baseUrl}/employees/dismissEmployee/${employeeId}`, {
        method: 'PATCH',
        headers: requestHeaders,
    })
    .then(async (res) => {
        if(res.ok){
            return res.json()
        } else{
            const response = await res.json()
            console.log(response.message)
        }
    })

    return firedEmployee
}

// We are going to create a function that recieves an object with updated departments 
// descriptions and update it
export async function updateDepartment(departmentBody, departmentId){
    const departmentUpdated = await fetch(`${baseUrl}/departments/update/${departmentId}`, {
        method: 'PATCH',
        headers: requestHeaders,
        body: JSON.stringify(departmentBody), 
    })
    .then(async (res) => {
        if(res.ok){
            return res.json()
        } else{
            const response = await res.json()
            console.log(response.message)
        }
    })

    return departmentUpdated
}

// We are going to create a function that recieves the department Id and remove it
export async function removeDepartment(departmentId){
    const departmentRemoved = await fetch(`${baseUrl}/departments/delete/${departmentId}`, {
        method: 'DELETE',
        headers: requestHeaders
    })
    .then(async (res) => {
        if(res.ok){
            return res.json()
        } else{
            const response = await res.json()
            console.log(response.message)
        }
    })

    return departmentRemoved
}

// We are going to create a function that recieves an object with updated user 
// descriptions and update it
export async function updateEmployee(employeeBody, employeeId){
    const employeeUpdated = await fetch(`${baseUrl}/employees/updateEmployee/${employeeId}`, {
        method: 'PATCH',
        headers: requestHeaders,
        body: JSON.stringify(employeeBody), 
    })
    .then(async (res) => {
        if(res.ok){
            return res.json()
        } else{
            const response = await res.json()
            console.log(response.message)
        }
    })

    return employeeUpdated
}

// We are going to create a function that recieves the employee Id and remove it
export async function removeEmployee(employeeId){
    const employeeRemoved = await fetch(`${baseUrl}/employees/deleteEmployee/${employeeId}`, {
        method: 'DELETE',
        headers: requestHeaders
    })
    .then(async (res) => {
        if(res.ok){
            return res.json()
        } else{
            const response = await res.json()
            console.log(response.message)
        }
    })

    return employeeRemoved
}

// We are going to create a function that recieves the company Id and returns all the departments in it
export async function readDepartmentsByCompany(companyId){
    const departments = await fetch(`${baseUrl}/departments/readByCompany/${companyId}`, {
        method: 'GET',
        headers: requestHeaders
    })
    .then(async (res) => {
        if(res.ok){
            return res.json()
        } else{
            const response = await res.json()
            console.log(response.message)
        }
    })

    return departments
}

// We are going to create a function that recieves the company Id and returns all the employees in it
export async function readEmployeesByCompany(companyId){
    const employees = await fetch(`${baseUrl}/companies/readById/${companyId}`, {
        method: 'GET',
        headers: requestHeaders
    })
    .then(async (res) => {
        if(res.ok){
            return res.json()
        } else{
            const response = await res.json()
            console.log(response.message)
        }
    })

    return employees
}
