const getRandomArbitrary = (min, max) =>
    parseInt(Math.random() * (max - min) + min, 10);

const defaultMessages = [
    'Normal day today. So this will be a normal post. 😴',
    'Same Shit Different Day #SSDD 😴',
    "I think I am going emo. 😴 Being emotionally dead inside and won't have to post any status about it seems like my cup of tea.",
    "I want attention so I'm writing this post for nothing. 😴",
    'Boreeeed 😴'
];

const GSRMessages = {
    relaxedMessages: [
        "I can finally relax after a long hard day at work.. 😌 Can't stand working with those annoying colleagues of mine.",
        'Listening to music is so relaxing. 😌',
        'Watching the sunset can be so relaxing, knowing that you just got through another day in life. 😌',
        'Relaxing on the couch after a long day is the best feeling ever. 😌',
        'Relaxing in the hot tub while listening to some music is the best way to end the day. 😌'
    ],
    uneasedMessages: [
        'I have an uneasy feeling about the results from my job interview. 😕',
        'Lol my cat has been watching me all day and I find it very disturbing. 😕',
        'Who wants to go for a drink? Could definitely use some small talk sometimes! 😕',
        "Have this uneasing feeling walking down this dark alley which smells of piss and hobos. Hope I don't step on a syringe and get AIDS. 😕"
    ],
    stressedMessages: [
        'Damn.... This project is stressing me out. Anyone want to get a beer with me? 😫',
        "Another f*cking stressful day at school. When I get home, I'm gonna order pizza and watch some Netflix, or play Skyrim again. 😫",
        'Gonna go to the gym to get rid of all this damn stress. Who wants to join? 😫'
    ]
};

const pulseMessages = {
    depressingMessages: [
        'I just got my test results back. Feeling depressed A.F right now 😢',
        "This weather is making me depressed. Can't wait for the summer. 😢",
        "What's life anyway.. 😢",
        "Who's in for some company? Feeling very alone right now.. 😢",
        'Seeing all these depressing posts from depressed people is making me feeling depressed. 😢'
    ],
    happyMessages: [
        'Work out, drink water, eat good! #healthylife #goals 😄',
        'Lol ate my 5th avocodo today but who cares! Living good! #milleniallife 😄',
        "I'm so in love right now 😍",
        'Having sex three times in one day makes you feel pretty exhausted LMFAO 😂'
    ],
    sportyMessages: [
        'Just got out of the gym, feeling buffed bro! 💪',
        'Sixth time going to the gym this week, I got my routines going #gymlife 💪',
        'Broteines BRO!!! #GYMLIFE 💪'
    ],
    highHeartBeatMessages: [
        "I've been drinking quote a lot lately..",
        "I just can't stop smoking cigarettes! Wish I could stop, cold turkey",
        'Whoa I can feel my heart beating, I should start living more healthy'
    ]
};

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
        default:
            return defaultMessages[
                getRandomArbitrary(0, defaultMessages.length)
            ];
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
        default:
            return defaultMessages[
                getRandomArbitrary(0, defaultMessages.length)
            ];
    }
};

module.exports = retrievePosts;
