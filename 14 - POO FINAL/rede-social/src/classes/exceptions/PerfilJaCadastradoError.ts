// src/classes/exceptions/PerfilJaCadastradoError.ts
export class PerfilJaCadastradoError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'PerfilJaCadastradoError';
    }
}

// src/classes/exceptions/PerfilNaoAutorizadoError.ts
export class PerfilNaoAutorizadoError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'PerfilNaoAutorizadoError';
    }
}

// src/classes/exceptions/PerfilInativoError.ts
export class PerfilInativoError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'PerfilInativoError';
    }
}

// src/classes/exceptions/InteracaoDuplicadaError.ts
export class InteracaoDuplicadaError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'InteracaoDuplicadaError';
    }
}

// src/classes/exceptions/AmizadeJaExistenteError.ts
export class AmizadeJaExistenteError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'AmizadeJaExistenteError';
    }
}

// src/classes/exceptions/ValorInvalidoException.ts
export class ValorInvalidoException extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'ValorInvalidoException';
    }
}
