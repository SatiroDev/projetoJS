import bcrypt from 'bcrypt'

// função para criptografar a senha do usuário
export const senhaHash = async (senha) => {
    const passwordHash = await bcrypt.hash(senha, 10)
    return passwordHash
} 

// função para verificar se a senha nova é igual ou não a antiga
export const senhaHashCompare = async (senhaNova, senhaAntiga) => {
    const passwordCompare = await bcrypt.compare(senhaNova, senhaAntiga)
    return passwordCompare // retorna true ou false
}
