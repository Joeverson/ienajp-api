import UserRepository from '../modules/user/Repository'

class Seeds {
  async run () {
    // adicionando usuarios default
    await UserRepository.create({
      name: 'Admin',
      email: 'admin@advansat.com',
      password: '123'
    })
  }
}

// importando informações para banco
const seeds = new Seeds()
seeds.run().then(result => {
  process.exit(0)
}).catch(err => {
  console.log(err)
  process.exit(0)
})
