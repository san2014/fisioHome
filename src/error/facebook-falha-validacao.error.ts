class FacebookFalhaValidacaoError extends Error{

    constructor(message?: string) {
            
        super(message);

        Object.setPrototypeOf(this, FacebookFalhaValidacaoError.prototype);

    }

    errorMessage() {

        if(!this.message){
            this.message = "Google: Ocorreu uma falha ao validar conta GooglePlus!";
        }        

        return this.message;
        
    }

}