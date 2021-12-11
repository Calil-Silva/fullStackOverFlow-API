interface NewQuestion {
    question: string;
    student: string;
    _class: string;
    tags: string;
}

interface UnansweredQuestion extends NewQuestion {
    answered: string;
    submitAt: Date;
    answeredAt?: Date;
    answeredBy?: string;
    answer?: string;
}

export { NewQuestion, UnansweredQuestion };
