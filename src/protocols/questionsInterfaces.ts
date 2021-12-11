interface NewQuestion {
    question: string;
    student: string;
    _class: string;
    tags: string;
}

interface Question extends NewQuestion {
    answered: string;
    submitAt: Date;
}

export { NewQuestion, Question };
