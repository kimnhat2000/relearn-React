export const shuffleArray = (a) => {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

export const nameData = () => {
    const nameData = ['Adrian', 'Alex', 'Ariel', 'Arron', 'Aubrey', 'Avery', 'Bailey', 'Blaine', 'Brett', 'Brice', 'Caden', 'Carmen', 'Cassidy', 'Cecil',
                    'Dakota', 'Delaney', 'Devon', 'Donovan', 'Drew', 'Duncan', 'Dylan', 'Ellery', 'Emerson', 'Erin', 'Evan', 'Fabian', 'Florian', 'Francis',
                    'Glen', 'Hadley', 'Haiden', 'Harley', 'Hayden', 'Hunter', 'Ira', 'Jade', 'Jude', 'Justice', 'Kadin', 'Kelsey', 'Kendall', 'Kerry', 'Kiley', 'Lane',
                    'Lee', 'Leslie', 'London', 'Lonnie', 'Lucian', 'Mallory', 'Montana', 'Morgan', 'Nevada', 'Orion',
                    ]   
    return nameData;
}
