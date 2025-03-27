export const sendEmailRecoveryAccount = async (
  email: string,
  token: string,
): Promise<boolean> => {
  console.log(`Sending recovery account with email: ${email}, token: ${token}`);
  return new Promise((resolve) => {
    resolve(true);
  });
};
