class UsuarioNaoEncontradoError extends Error {

    constructor(message?: string) {
        
        super(message);

        Object.setPrototypeOf(this, UsuarioNaoEncontradoError.prototype);

    }

    errorMessage() {
        
        if(!this.message){
            this.message = "Usuário não encontrado!";
        }

        return this.message;

    }
    
}