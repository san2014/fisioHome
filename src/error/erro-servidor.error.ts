class ErroServidorError extends Error {

    constructor(message?: string) {
        
        super(message);

        Object.setPrototypeOf(this, ErroServidorError.prototype);

    }

    errorMessage() {

        if(!this.message){
            this.message = "Falha na comunicação com o servidor remoto...tente novamente mais tarde...";
        }        

        return this.message;
        
    }

}