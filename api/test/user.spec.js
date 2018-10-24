import chai from 'chai';
import utils from '../src/utils/utils';
import * as factory from './factory';
import FacadeUser from '../src/modules/user/Facade';
import User from '../src/modules/user/User';
import Schema from '../src/db/schema';

const schema = new Schema();

const expect = chai.expect;
const assert = chai.assert;

export const testUser = () => {
  describe('User', () => {
    before(async function wipe() {
      this.timeout(100000);
      await schema.wipe();
    });

    it('should return without error', async () => {
      const result = await FacadeUser.find(2);
      
      expect(result[0].id).to.equal(2);
      expect(result[0].id_occupation).to.equal(1);
      expect(result[0].name).to.equal('OPERATOR');
      expect(result[0].email).to.equal('operator@scm.com');
      expect(result[0].id_access_profile).to.equal(1);
      expect(result[0].id_area).to.equal(1);
      expect(result[0].blocked).to.equal(false);
    });

    it('should save without error', async () => {
      const result = await factory.createUser();

      expect(result.id_occupation).to.be.a('number');
      expect(result.name).to.be.a('string');
      expect(result.email).to.be.a('string');
      expect(result.password).to.be.a('string');
      expect(result.id_user_created).to.be.a('number');
      expect(result.id_access_profile).to.be.a('number');
      expect(result.id_area).to.be.a('number');
      expect(result.blocked).to.be.a('boolean');

      // test return valid date
      expect(utils.isTimeStampValid(result.moment_created)).to.equal(true);
      expect(utils.isTimeStampValid(result.moment_changed)).to.equal(true);
    });

    it('should change without error', async () => {
      const result = await factory.updateUser();

      expect(result.id_occupation).to.be.a('number');
      expect(result.name).to.be.a('string');
      expect(result.email).to.be.a('string');
      expect(result.password).to.be.a('string');
      expect(result.id_user_created).to.be.a('number');
      expect(result.id_access_profile).to.be.a('number');
      expect(result.id_area).to.be.a('number');
      expect(result.blocked).to.be.a('boolean');

      // test return valid date
      expect(utils.isTimeStampValid(result.moment_created)).to.equal(true);
      expect(utils.isTimeStampValid(result.moment_changed)).to.equal(true);
    });

    it('should delete without error', async () => {
      const user = await factory.createUser();
      const countBeforeDelete = await FacadeUser.count();
      await FacadeUser.delete(user.id);
      const countAfterDelete = await FacadeUser.count();
      const userDelete = await FacadeUser.getUser(user.id);
      
      assert.isEmpty(userDelete);
      expect(countBeforeDelete > countAfterDelete).to.equal(true);
    });

    it('[delete] - Id invalid', async () => {
      try {
        await FacadeUser.delete('abc');
      } catch (error) {
        expect(error.message).to.equal('user.error.idInvalid');
      }
    });

    it('[getUser] - Id invalid', async () => {
      try {
        await FacadeUser.getUser('abc');
      } catch (error) {
        expect(error.message).to.equal('user.error.idInvalid');
      }
    });

    it('[isBlocked] - Id invalid', async () => {
      try {
        await FacadeUser.isBlocked('abc');
      } catch (error) {
        expect(error.message).to.equal('user.error.idInvalid');
      }
    });

    it('[find] - Id invalid', async () => {
      try {
        await FacadeUser.find('abc');
      } catch (error) {
        expect(error.message).to.equal('user.error.idInvalid');
      }
    });

    it('[verifyMatriculation] - Matriculation Length Invalid', async () => {
      try {
        await FacadeUser.verifyMatriculation('12345678901');
      } catch (error) {
        expect(error.message).to.equal('user.error.matriculationLengthInvalid');
      }
    });

    it('[verifyMatriculation] - Matriculation Not Exist', async () => {
      try {
        await FacadeUser.verifyMatriculation('123');
      } catch (error) {
        expect(error.message).to.equal('user.error.matriculationNotExist');
      }
    });

    it('[insert] - Case matriculation already exist to create new user', async () => {
      try {
        const user = new User();
        user.id_occupation = 1;
        user.name = 'Teste Mocha 4';
        user.email = '4@email.com.br';
        user.password = '11111111111111111111111111111111';
        user.id_user_created = 1;
        user.id_access_profile = 1;
        user.id_area = 1;
        user.matriculation = '123';
        user.blocked = 'true';
        
        await FacadeUser.insert(user);
      } catch (err) {
        expect(err.message).to.equal('user.error.matriculationExist');
      }
    });

    it('[update] - Case matriculation already exist to update user', async () => {
      try {
        const user = await FacadeUser.find(2);

        user[0].matriculation = '123';
        await FacadeUser.update(user[0]);
      } catch (err) {
        expect(err.message).to.equal('user.error.matriculationExist');
      }
    });


    it('[verifyIdAndBloqued] - Id Empty', async () => {
      try {
        await FacadeUser.verifyIdAndBloqued();
      } catch (error) {
        expect(error.message).to.equal('user.error.idEmpty');
      }
    });

    it('[verifyIdAndBloqued] - Operator Invalid', async () => {
      try {
        await FacadeUser.verifyIdAndBloqued('abc');
      } catch (error) {
        expect(error.message).to.equal('user.error.operatorInvalid');
      }
    });

    it('[verifyIdAndBloqued] - Operator Not Exist', async () => {
      try {
        await FacadeUser.verifyIdAndBloqued(123456);
      } catch (error) {
        expect(error.message).to.equal('user.error.operatorNotExist');
      }
    });

    it('[verifyIdAndBloqued] - User Blocked', async () => {
      try {
        const user = await factory.createUser(true);

        await FacadeUser.verifyIdAndBloqued(user.id);
      } catch (error) {
        expect(error.message).to.equal('user.error.userBlocked');
      }
    });

    it('[getByMatriculationAndPassword] - Matriculation Required', async () => {
      try {
        await FacadeUser.getByMatriculationAndPassword();
      } catch (error) {
        expect(error.message).to.equal('user.error.matriculationRequired');
      }
    });

    it('[getByMatriculationAndPassword] - Password Required', async () => {
      try {
        await FacadeUser.getByMatriculationAndPassword('123');
      } catch (error) {
        expect(error.message).to.equal('user.error.passwordRequired');
      }
    });

    it('[getPasswordEncrypted] - Password Required', async () => {
      try {
        await FacadeUser.getPasswordEncrypted();
      } catch (error) {
        expect(error.message).to.equal('user.error.passwordRequired');
      }
    });

    /**
     * Insert
     */
    it('[Insert] - User Not Identified', async () => {
      try {
        const user = new User();

        await FacadeUser.insert(user);
      } catch (error) {
        expect(error.message).to.equal('user.error.userNotIdentified');
      }
    });

    it('[Insert] - Email Invalid', async () => {
      try {
        const user = new User();
        user.id_user_created = 1;
        user.email = 'testeemail';

        await FacadeUser.insert(user);
      } catch (error) {
        expect(error.message).to.equal('user.error.emailInvalid');
      }
    });

    it('[Insert] - Name Invalid', async () => {
      try {
        const user = new User();
        user.id_user_created = 1;
        user.email = 'teste@email.com';
        user.password = 'e10adc3949ba59abbe56e057f20f883e';
        user.matriculation = '25478';

        await FacadeUser.insert(user);
      } catch (error) {
        expect(error.message).to.equal('user.error.nameInvalid');
      }
    });

    it('[Insert] - Email Already Exists', async () => {
      try {
        const user = new User();
        user.id_user_created = 1;
        user.email = await factory.createUser().then(value => value.email);
        user.password = 'e10adc3949ba59abbe56e057f20f883e';
        user.name = 'Teste user';
        user.matriculation = '25478';
        
        await FacadeUser.insert(user);
      } catch (error) {
        expect(error.message).to.equal('user.error.emailAlreadyExists');
      }
    });

    it('[Insert] - Access Profile Required', async () => {
      try {
        const user = new User();
        user.id_user_created = 1;
        user.id_user_changed = 1;
        user.email = 't@t.com';
        user.password = 'e10adc3949ba59abbe56e057f20f883e';
        user.name = 'T';
        user.matriculation = '9797';

        await FacadeUser.insert(user);
      } catch (error) {
        expect(error.message).to.equal('user.error.accessProfileRequired');
      }
    });

    it('[Insert] - Access Profile is not number', async () => {
      try {
        const user = new User();
        user.id_user_created = 1;
        user.id_user_changed = 1;
        user.email = 't@t.com';
        user.password = 'e10adc3949ba59abbe56e057f20f883e';
        user.name = 'T';
        user.matriculation = '9797';
        user.id_access_profile = 'a';

        await FacadeUser.insert(user);
      } catch (error) {
        expect(error.message).to.equal('user.error.accessProfileNotNumber');
      }
    });
    /**
     * Update
     */
    it('[Update] - User Not Identified', async () => {
      try {
        const user = await FacadeUser.find(1);
        
        user[0].id = '';

        await FacadeUser.update(user[0]);
      } catch (error) {
        expect(error.message).to.equal('user.error.userNotIdentified');
      }
    });

    it('[Update] - Email Invalid', async () => {
      try {
        const user = await FacadeUser.find(1);
        
        user[0].email = 'testeemail';

        await FacadeUser.update(user[0]);
      } catch (error) {
        expect(error.message).to.equal('user.error.emailInvalid');
      }
    });

    it('[Update] - Name Invalid', async () => {
      try {
        const user = new User();
        user.id = 1;
        user.id_user_created = 1;
        user.id_user_changed = 1;
        user.email = 'teste@email.com';
        user.password = 'e10adc3949ba59abbe56e057f20f883e';
        user.matriculation = '8787';
        
        await FacadeUser.update(user);
      } catch (error) {
        expect(error.message).to.equal('user.error.nameInvalid');
      }
    });

    it('[Update] - Email Already Exists', async () => {
      try {
        const user = new User();
        user.id = 1;
        user.id_user_created = 1;
        user.id_user_changed = 1;
        user.email = await factory.createUser().then(value => value.email);
        user.password = 'e10adc3949ba59abbe56e057f20f883e';
        user.name = 'Teste user';
        user.matriculation = '9797';
        
        await FacadeUser.update(user);
      } catch (error) {
        expect(error.message).to.equal('user.error.emailAlreadyExists');
      }
    });

    it('[Update] - Access Profile Required', async () => {
      try {
        const user = new User();
        user.id = 1;
        user.id_user_created = 1;
        user.id_user_changed = 1;
        user.email = 'x@x.com';
        user.password = 'e10adc3949ba59abbe56e057f20f883e';
        user.name = 'Teste user';
        user.matriculation = '9797';
        
        await FacadeUser.update(user);
      } catch (error) {
        expect(error.message).to.equal('user.error.accessProfileRequired');
      }
    });

    it('[Update] - Access Profile is not number', async () => {
      try {
        const user = new User();
        user.id = 1;
        user.id_user_created = 1;
        user.id_user_changed = 1;
        user.email = 't@t.com';
        user.password = 'e10adc3949ba59abbe56e057f20f883e';
        user.name = 'T';
        user.matriculation = '9797';
        user.id_access_profile = 'a';

        await FacadeUser.update(user);
      } catch (error) {
        expect(error.message).to.equal('user.error.accessProfileNotNumber');
      }
    });
  });
};
