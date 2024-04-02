//<reference types="Cypress" />

describe("Central de Atendimento ao Cliente TAT", () => {
    beforeEach(() => {
        cy.visit("./src/index.html")
    })

    it("Title Validation", () => {
        cy.title().should("be.equal", "Central de Atendimento ao Cliente TAT")
    })

    it(" test Preencher os campos obrigatórios e envia o formulário", () => {
        const Text = "solicito o cancelamento do programa, porque quero sair deste projeto que não há mais chance de sucesso"

        cy.get('input[id="firstName"]').type("Anderson Gularte") // preencher campo nome
        cy.get('input[id="lastName"]').type("Wodnoff") // preencher campo sobrenome
        cy.get('#email').type("andersonwodnff@hotmail.com")  // preencher o email
        cy.get('textarea[id="open-text-area"]').type(Text)
        cy.contains('button', 'Enviar').click()
        cy.get('.success').should('be.visible') // validando a mensagem depois do click
    })

    it(" test delay", () => {
        const Text = "solicito o cancelamento do programa, porque quero sair deste projeto que não há mais chance de sucesso"
        cy.get('input[id="firstName"]').type("Anderson Gularte") // preencher campo nome
        cy.get('input[id="lastName"]').type("Wodnoff") // preencher campo sobrenome
        cy.get('#email').type("andersonwodnff@hotmail.com")  // preencher o email
        cy.get('textarea[id="open-text-area"]').type(Text, {delay: 0})

        //cy.contains('button','Enviar' )

    })

    it("test mensagem de erro ao submeter formulario com email invalido", () => {
        cy.get('input[id="firstName"]').type("Anderson Gularte")
        cy.get('input[id="lastName"]').type("Wodnoff")
        cy.get('#email').type("andersonwodnff@ggg,com")
        cy.get('#phone').type("51985776172")
        cy.get('textarea[id="open-text-area"]').type('teste')
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')
    })

    it(" test incluindo telefone invalido, campo deve continuar vazio", () => {
        cy.get('#phone')
            .type("lfgmnnfenfgjk")
            .should('have.value', '')

    })

    it(" test exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário", () => {
        cy.get('input[id="firstName"]').type("Anderson Gularte")
        cy.get('input[id="lastName"]').type("Wodnoff")
        cy.get('#email').type("andersonwodnff@hotmail.com")
        cy.get('#phone-checkbox').check()  // esta tornando o telefone obrigatorio
        cy.get('textarea[id="open-text-area"]').type('teste')
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')
    })

    it(' test preenche e limpa os campos nome, sobrenome, email e telefone', () => {

        cy.get('input[id="firstName"]').type("Anderson Gularte")
            .should('have.value', 'Anderson Gularte')
            .clear().should('have.value', '')

        cy.get('input[id="lastName"]').type("Wodnoff")
            .should('have.value', 'Wodnoff')
            .clear().should('have.value', '')


        cy.get('#email').type("andersonwodnff@hotmail.com")
            .should('have.value', 'andersonwodnff@hotmail.com')
            .clear().should('have.value', '')

        cy.get('#phone').type("51985776172")
           .should('have.value', '51985776172')
           .clear().should('have.value', '')
    })

    it('test exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {

        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
    })


    // comando customizado reduz as linhas do comando de teste, como mostra abaixo
    // elementos estao em commands.js , e vem para o teste ao inves de preencher todos elemento no proprio teste
    it('test enviar o formulário com sucesso usando um comando customizado', () => {
        cy.fillMandatoryFieldsAndSubmit()


    })


    //select
    it('test selecionar um produto de cada por seu texto', () => {
        cy.get('#product')
            .select('youtube').should('value', 'youtube')

        cy.get('#product')
            .select('Mentoria').should('value', 'mentoria')

        cy.get('#product')
            .select('Blog').should('value', 'blog')


    })

    it('test marcar o tipo de atendimento "Feedback', () => {

        cy.get('input[type="radio"]').check("feedback")
          .should('value', 'feedback')

    })

    it('test marcar cada tipo de atendimento', () => {

        // cy.get('input[type="radio"]').check('ajuda')
        //     .should('value', 'ajuda')
        // cy.get('input[type="radio"]').check('elogio')
        //     .should('value', 'elogio')
        // cy.get('input[type="radio"]').check('feedback')
        //     .should('value', 'feedback')

        //outra forma de selecionar os tres itens
        cy.get('input[type="radio"]')
            .each(function ($radio){
               // cy.wrap($radio).check()
                cy.wrap($radio)//.should('be.checked')
            })
    })

    it('test marcar ambos checkboxes, depois desmarca o último', () => {

        cy.get('input[type="checkbox"]')
            .check()
            .last()
            .uncheck()
            .should('not.be.checked')
    })

    it('test selecionar um arquivo da pasta fixtures', () => {

        cy.get('input[type="file"]').selectFile('./cypress/fixtures/example.json')
            //.should('be.visible')
    })

    it('test selecionar um arquivo simulando um drag-and-drop', () =>{

        cy.get('input[type="file"]')
            .selectFile('./cypress/fixtures/example.json', {action: 'drag-drop'})
            .should('be.visible')

    })

    it('test selecionar um arquivo utilizando uma fixture para a qual foi dada um alias', ()=>{

        cy.fixture('example.json').as('file')
        cy.get('input[type="file"]')
            .selectFile('@file')
    })

    it('test verificar que a política de privacidade abre em outra aba sem clique',()=>{

        // cy.get('a[href="privacy.html"]') //LINK DENTRO DO IMPUT
        //     .should('have.attr', 'target', '_blank')

            //OUTRA OPÇÃO
           cy.get('#privacy a')
            .should('have.attr', 'target', '_blank')
    })

    it('test acessar a página da política de privacidade removendo o target e então clicando no link', () => {

        // cy.get('a[href="privacy.html"]')    //LINK DENTRO DO IMPUT
        //     .invoke('removeAttr', 'target')
        //     .click()

        //OUTRA OPÇÃO
        cy.get('#privacy a')
            .invoke('removeAttr', 'target')
            .click()

    })

    it.only('test testar a página da política de privacidade de forma independente',()=>{

        cy.visit("./src/privacy.html")
    })




})