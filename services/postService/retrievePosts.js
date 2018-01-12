const getRandomArbitrary = (min, max) =>
    parseInt(Math.random() * (max - min) + min, 10);

const retrievePosts = (type, medior, username) => {
    switch (type) {
        case 'GSR':
            return switchGSRValue(medior, username);
            break;

        case 'Pulse':
            return switchPulseValue(medior, username);
            break;
    }
};

const switchGSRValue = (medior, username) => {
    const { relaxedMessages, uneasedMessages, stressedMessages } = GSRMessages;

    switch (true) {
        case medior > 650 && medior < 670:
            return relaxedMessages[
                getRandomArbitrary(0, relaxedMessages.length)
            ];
            break;
        case medior > 670 && medior < 700:
            return uneasedMessages[
                getRandomArbitrary(0, uneasedMessages.length)
            ];
            break;
        case medior > 700:
            return stressedMessages[
                getRandomArbitrary(0, stressedMessages.length)
            ];
            break;
    }
};

const switchPulseValue = (medior, username) => {
    const {
        depressingMessages,
        happyMessages,
        sportyMessages,
        highHeartBeatMessages
    } = pulseMessages;
    switch (true) {
        case medior > 40 && medior < 50:
            return depressingMessages[
                getRandomArbitrary(0, depressingMessages.length)
            ];
            break;

        case medior > 50 && 75:
            return happyMessages[getRandomArbitrary(0, happyMessages.length)];
            break;

        case medior > 75 && medior < 120:
            return sportyMessages[getRandomArbitrary(0, sportyMessages.length)];
            break;

        case medior > 120:
            return highHeartBeatMessages[
                getRandomArbitrary(0, highHeartBeatMessages.length)
            ];
            break;
    }
};

const GSRMessages = {
    relaxedMessages: [
        'Random relaxed quote 1',
        'Random relaxed quote 2',
        'Random relaxed quote 3'
    ],
    uneasedMessages: [
        'Random uneased quote 1',
        'Random uneased quote 2',
        'Random uneased quote 3'
    ],
    stressedMessages: [
        'Random stressed quote 1',
        'Random stressed quote 2',
        'Random stressed quote 3'
    ]
};

const pulseMessages = {
    depressingMessages: [
        'Random depressing quote 1',
        'Random depressing quote 2',
        'Random depressing quote 3'
    ],
    happyMessages: [
        'Random happy quote 1',
        'Random happy quote 2',
        'Random happy quote 3'
    ],
    sportyMessages: [
        'Random sporty quote 1',
        'Random sporty quote 2',
        'Random sporty quote 3'
    ],
    highHeartBeatMessages: [
        'Random heartbeat quote 1',
        'Random heartbeat quote 2',
        'Random heartbeat quote 3'
    ]
};
