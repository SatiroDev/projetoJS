export const errorGlobal = (err, req, res) => {
    console.error(`[ERRO] ${err.status || 500} - ${err.message}`)
    res.status(err.status || 500).json({
        error: true,
        message: err.message || 'Erro interno no servidor'
    })
}