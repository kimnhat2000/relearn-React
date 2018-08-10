import React from 'react';

function getRandom(items) {
    return items[Math.floor(Math.random() * items.length)];
}

class ClipboardCopier extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            copied: false
        }
    }

    componentDidMount() {
        const clipboard = new Clipboard('.btn-copy', {
            text: function () {
                return document.querySelector('#name').value;
            }
        });

        clipboard.on('success', (e) => {
            this.setState({
                copied: true
            })

            setTimeout(() => this.setState({ copied: false }), 1000);
        });
    }

    render() {
        const { value } = this.props;
        const { copied } = this.state;

        return (
            <div>
                <input type="hidden" id="name" value={value} />
                <button disabled={copied} className="btn btn-copy">{copied ? 'Copied!' : 'Copy to clipboard'}</button>
            </div>
        )
    }
}

const Button = ({ name, onClick, children }) => {
    return (
        <input className="btn btn-randomize-namepart" type="submit" name={name} onClick={onClick} value={children} />
    )
}

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastNamePrefix: '',
            lastNameSuffix: '',
        };
    }

    componentWillMount() {
        this._randomAll()
    }

    _randomAll() {
        Object.keys(this.state).forEach(name => {
            this.setState({
                [name]: getRandom(nameData[name])
            })
        })
    };

    handleGetNameClick = (e) => {
        this.setState({
            [e.target.name]: getRandom(nameData[e.target.name])
        })
    };

    render() {
        const { firstName, lastNamePrefix, lastNameSuffix } = this.state;
        return (
            <div className="container">
                <div className="name">
                    <div>
                        <span className="firstname">{firstName}</span>
                        <br />
                        {lastNamePrefix}{lastNameSuffix}
                    </div>
                </div>
                <ClipboardCopier value={firstName + ' ' + lastNamePrefix + lastNameSuffix} />
                <div className="m-y">
                    <button className="btn btn-random" onClick={this._randomAll.bind(this)}>BRING THE WRATH</button>
                </div>
                <small className="randomize-note">Randomize a value</small>
                <Button name="firstName" onClick={this.handleGetNameClick}>First name</Button>
                <Button name="lastNamePrefix" onClick={this.handleGetNameClick}>Last name prefix</Button>
                <Button name="lastNameSuffix" onClick={this.handleGetNameClick}>Last name suffix</Button>
            </div>
        )
    }
}

const nameData = {
    "firstName": [
        "nar",
        "An",
        "Alfr",
        "Alvi",
        "Ari",
        "Arinbjorn",
        "Arngeir",
        "Arngrim",
        "Arnfinn",
        "Asgeirr",
        "Askell",
        "Asvald",
        "Bard",
        "Baror",
        "Bersi",
        "Borkr",
        "Bjarni",
        "Bjorn",
        "Brand",
        "Brandr",
        "Cairn",
        "Canute",
        "Dar",
        "Einarr",
        "Eirik",
        "Egill",
        "Engli",
        "Eyvindr",
        "Erik",
        "Eyvind",
        "Finnr",
        "Floki",
        "Fromund",
        "Geirmundr",
        "Geirr",
        "Geri",
        "Gisli",
        "Gizzur",
        "Gjafvaldr",
        "Glumr",
        "Gorm",
        "Grmir",
        "Gunnarr",
        "Guomundr",
        "Hak",
        "Halbjorn",
        "Halfdan",
        "Hallvard",
        "Hamal",
        "Hamundr",
        "Harald",
        "Harek",
        "Hedinn",
        "Helgi",
        "Henrik",
        "Herbjorn",
        "Herjolfr",
        "Hildir",
        "Hogni",
        "Hrani",
        "Ivarr",
        "Hrolf",
        "Jimmy",
        "Jon",
        "Jorund",
        "Kalf",
        "Ketil",
        "Kheldar",
        "Klaengr",
        "Knut",
        "Kolbeinn",
        "Kolli",
        "Kollr",
        "Lambi",
        "Magnus",
        "Moldof",
        "Mursi",
        "Njall",
        "Oddr",
        "Olaf",
        "Orlyg",
        "Ormr",
        "Ornolf",
        "Osvald",
        "Ozurr",
        "Poror",
        "Prondir",
        "Ragi",
        "Ragnvald",
        "Refr",
        "Runolf",
        "Saemund",
        "Siegfried",
        "Sigmundr",
        "Sigurd",
        "Sigvat",
        "Skeggi",
        "Skomlr",
        "Slode",
        "Snorri",
        "Sokkolf",
        "Solvi",
        "Surt",
        "Sven",
        "Thangbrand",
        "Thjodoft",
        "Thorod",
        "Thorgest",
        "Thorvald",
        "Thrain",
        "Throst",
        "Torfi",
        "Torix",
        "Tryfing",
        "Ulf",
        "Valgaror",
        "Vali",
        "Vifil",
        "Vigfus",
        "Vika",
        "Waltheof"
    ],
    "lastNamePrefix": [
        "Aesir",
        "Axe",
        "Battle",
        "Bear",
        "Berg",
        "Biscuit",
        "Black",
        "Blade",
        "Blood",
        "Blue",
        "Boar",
        "Board",
        "Bone",
        "Cage",
        "Cave",
        "Chain",
        "Cloud",
        "Coffee",
        "Code",
        "Death",
        "Dragon",
        "Dwarf",
        "Eel",
        "Egg",
        "Elk",
        "Fire",
        "Fjord",
        "Flame",
        "Flour",
        "Forge",
        "Fork",
        "Fox",
        "Frost",
        "Furnace",
        "Cheese",
        "Giant",
        "Glacier",
        "Goat",
        "God",
        "Gold",
        "Granite",
        "Griffon",
        "Grim",
        "Haggis",
        "Hall",
        "Hamarr",
        "Helm",
        "Horn",
        "Horse",
        "House",
        "Huskarl",
        "Ice",
        "Iceberg",
        "Icicle",
        "Iron",
        "Jarl",
        "Kelp",
        "Kettle",
        "Kraken",
        "Lake",
        "Light",
        "Long",
        "Mace",
        "Mead",
        "Maelstrom",
        "Mail",
        "Mammoth",
        "Man",
        "Many",
        "Mountain",
        "Mutton",
        "Noun",
        "Oath",
        "One",
        "Owl",
        "Pain",
        "Peak",
        "Pine",
        "Pot",
        "Rabbit",
        "Rat",
        "Raven",
        "Red",
        "Refreshingbeverage",
        "Ring",
        "Rime",
        "Rock",
        "Root",
        "Rune",
        "Salmon",
        "Sap",
        "Sea",
        "Seven",
        "Shield",
        "Ship",
        "Silver",
        "Sky",
        "Slush",
        "Smoke",
        "Snow",
        "Spear",
        "Squid",
        "Steam",
        "Stone",
        "Storm",
        "Swine",
        "Sword",
        "Three",
        "Tongue",
        "Torch",
        "Troll",
        "Two",
        "Ulfsark",
        "Umlaut",
        "Unsightly",
        "Valkyrie",
        "Wave",
        "White",
        "Wolf",
        "Woman",
        "Worm",
        "Wyvern"
    ],
    "lastNameSuffix": [
        "admirer",
        "arm",
        "axe",
        "back",
        "bane",
        "baker",
        "basher",
        "beard",
        "bearer",
        "bender",
        "blade",
        "bleeder",
        "blender",
        "blood",
        "boiler",
        "bone",
        "boot",
        "borer",
        "born",
        "bow",
        "breaker",
        "breeder",
        "bringer",
        "brow",
        "builder",
        "chaser",
        "chiller",
        "collar",
        "counter",
        "curser",
        "dancer",
        "deck",
        "dottir",
        "doubter",
        "dreamer",
        "drinker",
        "drowner",
        "ear",
        "eater",
        "face",
        "fearer",
        "friend",
        "foot",
        "fury",
        "gorer",
        "grim",
        "grinder",
        "grower",
        "growth",
        "hacker",
        "hall",
        "hammer",
        "hand",
        "hands",
        "head",
        "hilt",
        "hugger",
        "hunter",
        "killer",
        "leg",
        "licker",
        "liker",
        "lost",
        "lover",
        "maker",
        "mender",
        "minder",
        "miner",
        "mocker",
        "monger",
        "neck",
        "puncher",
        "rage",
        "rhyme",
        "rider",
        "ringer",
        "roarer",
        "roller",
        "sailor",
        "screamer",
        "sequel",
        "server",
        "shield",
        "shoe",
        "singer",
        "skinner",
        "slinger",
        "slugger",
        "sniffer",
        "son",
        "smasher",
        "speaker",
        "stinker",
        "sucker",
        "sword",
        "tail",
        "tamer",
        "taster",
        "thigh",
        "tongue",
        "tosser",
        "tracker",
        "washer",
        "wielder",
        "wing",
        "wisher",
        "wrath"
    ]
}


ReactDOM.render(<App />, document.getElementById('app'))

