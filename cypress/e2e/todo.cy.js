

describe('Todo App', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })

  afterEach(() => {
  
    cy.request('POST', 'http://localhost:3000/delete/1')
  })

  it('create, complete, undo and delete a todo', () => {
  
    cy.get('input[name="todo"]').type('Buy groceries')
    cy.get('button[name="add"]').click()
    cy.contains('Buy groceries')

   
    cy.get('li#todo-1').find('button').contains('Complete').click()
    cy.contains('Buy groceries').should('have.class', 'completed')
    cy.contains('Undo')

   
    cy.get('li#todo-1').find('button').contains('Undo').click()
    cy.contains('Buy groceries').should('not.have.class', 'completed')
    cy.contains('Complete')

   
    cy.get('li#todo-1').find('button').contains('Delete').click()
    cy.get('li#todo-3').find('button').contains('Delete').click()
    cy.contains('Buy groceries').should('not.exist')
  })
})

describe('Custom Security Tests', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })

  afterEach(() => {
    
    cy.request('POST', 'http://localhost:3000/delete/1')
  })

  it('should sanitize user inputs to prevent XSS', () => {
    cy.get('input[name="todo"]').type('<script>alert("XSS")</script>')
    cy.get('button[name="add"]').click()
    cy.contains('<script>').should('not.exist')
  })
})
