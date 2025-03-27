export const defaultTemplateRecoveryPassword = (resetUrl: string) => {
  return `
  <div style="font-family: Arial, sans-serif; text-align: center; padding: 20px;">
    <h2 style="color: #333;">Recuperação de Senha</h2>
    <p style="color: #555;">Clique no botão abaixo para redefinir sua senha:</p>
    <a href="${resetUrl}" 
       style="display: inline-block; padding: 10px 20px; margin: 10px 0; font-size: 16px; color: white; 
              background-color: #007bff; text-decoration: none; border-radius: 5px;">
      Redefinir Senha
    </a>
    <p style="color: #999; font-size: 12px;">Se você não solicitou essa alteração, ignore este e-mail.</p>
  </div>
`;
};
