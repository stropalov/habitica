import {
  generateUser,
  translate as t,
} from '../../../../../helpers/api-integration/v3';

describe.only('POST /user/reset-password', async () => {
  let endpoint = '/user/reset-password';
  let user;

  beforeEach(async () => {
    user = await generateUser();
  });

  afterEach(async () => {
  });

  it('resets password', async () => {
    let response = await user.post(endpoint, {
      email: user.auth.local.email,
    });
    expect(response).to.eql({code: 200, message: t('passwordReset')});
  });

  it('same message on error as on success', async () => {
    let response = await user.post(endpoint, {
      email: 'nonExistent@email.com',
    });
    expect(response).to.eql({code: 200, message: t('passwordReset')});
  });

  it('errors is email is not provided', async () => {
    await expect(user.post(endpoint)).to.eventually.be.rejected.and.eql({
      code: 400,
      error: 'BadRequest',
      message: t('invalidReqParams'),
    });
  });
});

