import { getAllDepartments, getCompanyById, getAllEmployees, getAllCompanies, createNewDepartment } from './requests.js'
import {  renderDepartment, renderUser, renderModalUser } from './render.js'

const allDepartments = await getAllDepartments()
const allEmployees = await getAllEmployees()
const allCompanies = await getAllCompanies()
// console.log(allDepartments)
// console.log(allEmployees)
// console.log(allCompanies)


// We are going to edit the logout, redirect to the login html page and clear the localStorage
const logoutButton = document.querySelector('.header__buttons--logout')
const loginPath = '/src/pages/login.html'
function redirectPage(button, path){
    button.addEventListener('click', (event)=>{
        event.preventDefault()
        localStorage.clear()
        location.replace(path)
    })
}

// We are going to get all the COMPANIES from the API and render them on the select in the Admin.html page
async function renderSelect(){
    // We are getting an array with all the companies from the API and assigning them to the variables 
    // allCompanies
    const allCompanies = await getAllCompanies()
    // We are getting the 'select' from the HTML document
    const select = document.querySelector('.select')

    allCompanies.forEach((company) => {
        // We are going to create the HTML element
        const option = document.createElement('option')
        
        // We are going to assign value to the element
        option.innerHTML = company.name
        
        // We are going to assign class and id to the element
        option.value = company.id
        option.classList = 'select__option'

        // We are going to establish the hirarchy between the elements
        select.append(option)
    })
}

// We are going to create the function that filters the departments and employees based on what 
// is in the select and show them on the Admin.HTML page
async function handleSelect(){
    const select = document.querySelector('.select')
    const departmentContainer = document.querySelector('.department__cards')
    const employeeContainer = document.querySelector('.users__cards')
    
    select.addEventListener('click', () => {
        const value = select.value        
        const filteredDepartment = allDepartments.filter((department) => department.company_id === value)
        const filteredEmployee = allEmployees.filter((employee) => employee.company_id === value)

        if(value === ''){
            departmentContainer.innerHTML = ''
            employeeContainer.innerHTML = ''
            renderDepartment(allDepartments)
            renderUser(allEmployees)
        } else{
            departmentContainer.innerHTML = ''
            employeeContainer.innerHTML = ''
            renderDepartment(filteredDepartment)
            renderUser(filteredEmployee)
        }
    })
}

// We are going to get all the EMPLOYEES from the API and render them on the select in the createDeparmtnet 
// modal. Its the same idea as the renderSelect(), but we apply it on the createDepartment modal and with
// employees instead of companies
async function renderModalCompanySelect(){
    // We are getting an array with all the companies from the API and assigning them to the variables 
    // allCompanies
    const allCompanies = await getAllCompanies()
    // We are getting the 'select' from the HTML document
    const select = document.querySelector('.createDepartment__form--select')

    allCompanies.forEach((company) => {
        // We are going to create the HTML element
        const option = document.createElement('option')
        
        // We are going to assign value to the element
        option.innerHTML = company.name
        
        // We are going to assign class and id to the element
        option.value = company.id
        option.classList = 'form__select--option'

        // We are going to establish the hirarchy between the elements
        select.append(option)
    })
}


/////////////////////////////// VOLTAR AQUI -  NÃO FIZ NADA AINDA ///////////////////////////////
// We are going to get all the EMPLOYEES from the API and render them on the select in the seeDeparmtnet 
// modal. Its the same idea as the renderSelect(), but we apply it on the see department modal and with
// employees instead of companies
async function renderModalSelect(){
    // We are getting an array with all the companies from the API and assigning them to the variables 
    // allCompanies
    const allCompanies = await getAllCompanies()
    // We are getting the 'select' from the HTML document
    const select = document.querySelector('.select')

    allCompanies.forEach((company) => {
        // We are going to create the HTML element
        const option = document.createElement('option')
        
        // We are going to assign value to the element
        option.innerHTML = company.name
        
        // We are going to assign class and id to the element
        option.value = company.id
        option.classList = 'select__option'

        // We are going to establish the hirarchy between the elements
        select.append(option)
    })
}

/////////////////////////////// VOLTAR AQUI -  NÃO FIZ NADA AINDA ///////////////////////////////
// We are going to create the function that filters the employees based on what 
// is in the select and show them on the modal. Its the same idea as the handleSelect(), but we 
// apply it on the see department modal with employees instead of companies
async function handleModalSelect(){
    const select = document.querySelector('.select')
    const departmentContainer = document.querySelector('.department__cards')
    const employeeContainer = document.querySelector('.users__cards')
    
    select.addEventListener('click', () => {
        const value = select.value        
        const filteredDepartment = allDepartments.filter((department) => department.company_id === value)
        const filteredEmployee = allEmployees.filter((employee) => employee.company_id === value)

        if(value === ''){
            departmentContainer.innerHTML = ''
            employeeContainer.innerHTML = ''
            renderDepartment(allDepartments)
            renderUser(allEmployees)
        } else{
            departmentContainer.innerHTML = ''
            employeeContainer.innerHTML = ''
            renderDepartment(filteredDepartment)
            renderUser(filteredEmployee)
        }
    })
}



// We are going to create a function that opens the create category modal
function handleCreateDepartmentModal(){
    const openButton = document.querySelector('.department__top--button')
    const modal = document.querySelector('.createDepartment__container')
    const closeButton = document.querySelector('.createDepartment__form--closeButton')
    const createButton = document.querySelector('.createDepartment__form--createButton')
    renderModalCompanySelect()

    openButton.addEventListener('click', (event) => {
        event.preventDefault()
        
        modal.showModal()
        closeModal(closeButton, modal)
    })

    createButton.addEventListener('click', (event) => {
        event.preventDefault()
        let department = {}
        let count = 0
        const inputs = document.querySelectorAll('.createDepartment__form--input')
        const select = document.querySelector('.createDepartment__form--select')

        inputs.forEach((input) => {
            if(input.value === ''){
                count+=1
            }
            department[input.name] = input.value
        })
        
        department['company_id'] = select.value
        if(select.value === ''){
            count+=1
        }

        if(count !== 0){
            count = 0
            alert('Por favor, preencha todos os campos')
        } else{
            // console.log(department)
            createNewDepartment(department)
            renderDepartment(allDepartments)
            modal.close()
        }        
    })
}


export const createButton = document.querySelector('.seeDepartment__hireButton')

export function handleSeeDepartmentModal(){
    const modal = document.querySelector('.seeDepartment__container')
    const openButtons = document.querySelectorAll('.card__buttons--seeDepartment')
    const closeButton = document.querySelector('.seeDepartment__closeButton')

    openButtons.forEach((button) => {
        button.addEventListener('click', (event) => {
            modal.showModal()
            localStorage.setItem("@empresas:departmentId", event.target.dataset.departmentId)
            renderModalUser(allEmployees)
            closeModal(closeButton, modal)
        })
    })
}

// We are going to create a function that closes any modal
function closeModal(button, modal){
    button.addEventListener('click', (event) => {
        event.preventDefault()
        modal.close()
    })
}



handleCreateDepartmentModal()
redirectPage(logoutButton, loginPath)
renderDepartment(allDepartments)
renderUser(allEmployees)
renderSelect()
handleSelect()
