import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps'
var min=10
var max=100
Given("test", () => {
  cy.fixture('register.json').then((user) => {
  user.email='mail'+parseInt(Math.random() * (max - min) + min)+'@gmail.com'
         cy.writeFile('cypress/fixtures/register.json',user)
  })
})
When("créer un compte", () => {
  cy.fixture('register.json').then((user) => {
  cy.request({
method: 'POST',
 url:Cypress.config('url')+'account/register', // baseUrl is prepend to URL
  form: true, // indicates the body should be form urlencoded and sets Content-Type: application/x-www-form-urlencoded headers
  body: user
}).should(response=>{
expect(response.body['message']).to.eq('Account created')
expect(response.body['email']).to.eq(user['email'])
expect(response.status).to.eq(201)
})
 })
 })
