describe('Login Page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/'); // Uygulamanın çalıştığından emin olun
  });

  it('Başlık doğru mu?', () => {
    cy.contains('Kayıt Ol').should('exist');
  });

  it('Geçersiz email hatası veriyor mu?', () => {
    cy.get('[cy-data="email-input"]').type('wrongemail'); 
    cy.get('[cy-data="password-input"]').click(); // Input dışına çık
    cy.contains('Geçerli bir email adresi giriniz.').should('be.visible');
  });

  it('Geçersiz şifre hatası veriyor mu?', () => {
    cy.get('[cy-data="password-input"]').type('weakpass'); // Zayıf şifre
    cy.get('[cy-data="email-input"]').click(); // Input dışına çık
    cy.contains('En az 8 karakter, en az bir büyük harf').should('be.visible');
  });

  it('Şartlar kutusunu işaretlemeden buton aktif olmuyor mu?', () => {
    cy.get('[cy-data="email-input"]').type('test@example.com');
    cy.get('[cy-data="password-input"]').type('Test@1234');
    cy.get('[cy-data="password-input"]').should('be.disabled'); // Butonun disabled olduğunu kontrol et
  });

  it('Başarılı giriş sonrası success sayfasına yönlendiriyor mu?', () => {
    cy.get('[cy-data="email-input"]').type('test@example.com');
    cy.get('[cy-data="password-input"]').type('Test@1234');
    cy.get('[cy-data="terms-input"]').click();
    cy.get('[cy-data="button-input"]').click();
    cy.url().should('include', '/success');
  });
});
