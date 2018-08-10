export const shuffleArray = (a) => {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

export const nameData = () => {
    const nameData = [
        'Adrian',
        'Alex',
        'Ariel',
        'Arron',
        'Aubrey',
        'Avery',
        'Bailey',
        'Blaine',
        'Brett',
        'Brice',
        'Caden',
        'Carmen',
        'Cassidy',
        'Cecil',
        'Dakota',
        'Delaney'
    ]
    return nameData;
}
