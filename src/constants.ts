export const ENGLISH_WORDS = [
  "the", "be", "to", "of", "and", "a", "in", "that", "have", "i", "it", "for", "not", "on", "with", "he", "as", "you", "do", "at",
  "this", "but", "his", "by", "from", "they", "we", "say", "her", "she", "or", "an", "will", "my", "one", "all", "would", "there", "their", "what",
  "so", "up", "out", "if", "about", "who", "get", "which", "go", "me", "when", "make", "can", "like", "time", "no", "just", "him", "know", "take",
  "people", "into", "year", "your", "good", "some", "could", "them", "see", "other", "than", "then", "now", "look", "only", "come", "its", "over", "think", "also",
  "back", "after", "use", "two", "how", "our", "work", "first", "well", "way", "even", "new", "want", "because", "any", "these", "give", "day", "most", "us"
];

export const RUSSIAN_WORDS = [
  "и", "в", "не", "на", "я", "быть", "он", "с", "что", "а", "по", "это", "она", "этот", "по", "но", "они", "мы", "весь", "же",
  "от", "сказать", "вы", "из", "у", "который", "мать", "человек", "о", "один", "еще", "бы", "такой", "только", "себя", "свое", "какой", "когда", "быть", "кто",
  "со", "даже", "другой", "вот", "до", "свой", "ни", "же", "при", "сам", "год", "через", "под", "где", "дело", "есть", "сам", "раз", "чтобы", "глаз",
  "жизнь", "первый", "день", "тут", "ничто", "потом", "очень", "совет", "хотеть", "лицо", "слово", "после", "работа", "надо", "хотя", "стать", "голос", "сидеть", "самый", "идти"
];

export const HARD_WORDS_EN = [
  "extraordinary", "unbelievable", "sophisticated", "comprehensive", "implementation", "architecture", "synchronization", "infrastructure", "phenomenon", "philosophy",
  "perspective", "consequences", "significant", "environment", "opportunity", "development", "experience", "knowledge", "communication", "relationship",
  "successful", "everything", "something", "sometimes", "somewhere", "beautiful", "different", "difficult", "important", "interesting",
  "necessary", "possible", "probably", "question", "remember", "sentence", "together", "understand", "yesterday", "tomorrow"
];

export const HARD_WORDS_RU = [
  "непосредственно", "соответственно", "преимущественно", "самостоятельно", "действительно", "обществознание", "предупреждение", "ответственность", "правительство", "государство",
  "человечество", "путешествие", "происшествие", "впечатление", "достижение", "образование", "направление", "соглашение", "обсуждение", "предложение",
  "возможность", "особенность", "способность", "вероятность", "активность", "реальность", "сложность", "важность", "ценность", "радость",
  "необходимость", "безопасность", "деятельность", "эффективность", "стабильность", "перспектива", "технология", "информация", "организация", "администрация"
];

export const TERMINAL_COMMANDS = {
  cmd: [
    "ipconfig", "dir", "cd Desktop", "mkdir test", "tasklist", "ping google.com", "cls", "systeminfo", "netstat -an", "type file.txt",
    "copy source.txt dest.txt", "move file.txt folder\\", "del old.log", "attrib +h secret.txt", "chkdsk c:", "format d:", "help dir", "shutdown /s /t 0", "ver", "whoami"
  ],
  powershell: [
    "Get-Process", "Get-Service", "Get-ChildItem", "Clear-Host", "Write-Host 'Hello'", "New-Item -ItemType Directory -Path './test'", "Remove-Item ./old.txt", "Stop-Service -Name 'Spooler'", "Start-Service -Name 'Spooler'", "Get-Help Get-Service",
    "Select-Object -Property Name, Id", "Where-Object { $_.Status -eq 'Running' }", "Invoke-WebRequest -Uri 'https://google.com'", "Export-Csv -Path './data.csv'", "Import-Module ActiveDirectory", "Get-ExecutionPolicy", "Set-ExecutionPolicy RemoteSigned", "Get-Content ./log.txt", "Test-Connection -ComputerName '8.8.8.8'", "Get-History"
  ],
  linux: [
    "ls -la", "pwd", "mkdir project", "chmod +x script.sh", "grep \"word\" file.txt", "sudo apt update", "top", "df -h", "free -m", "cat /etc/passwd",
    "ssh user@host", "scp file.txt user@host:/path", "find . -name \"*.py\"", "tar -czvf archive.tar.gz folder/", "unzip archive.zip", "curl -I https://google.com", "wget https://example.com/file.zip", "ps aux | grep node", "kill -9 1234", "history"
  ],
  macos: [
    "ls -G", "open .", "diskutil list", "brew install node", "brew update", "top -u", "networksetup -getcomputername", "say \"Hello world\"", "pbcopy < file.txt", "pbpaste > file.txt",
    "softwareupdate -l", "mdfind \"query\"", "tmutil status", "pmset -g", "system_profiler SPHardwareDataType", "defaults read com.apple.Finder", "killall Finder", "dscacheutil -flushcache", "man ls", "tail -f /var/log/system.log"
  ]
};

export const CODE_SNIPPETS = [
  "print(\"hello world\")",
  "name = input(\"Your name: \")",
  "console.log(\"Hello world\");",
  "let score = 10;",
  "if (x > 5) {",
  "return true;",
  "const user = { name: \"Arsen\" };",
  "<div class=\"container\">",
  "SELECT * FROM users;",
  "git status",
  "def main():",
  "import os, sys",
  "npm install lucide-react",
  "const [count, setCount] = useState(0);",
  "export default function App() {",
  "while (isActive) {",
  "try { run(); } catch (e) {",
  "const result = a ? b : c;",
  "const { id, name } = props;",
  "for (let i = 0; i < 10; i++) {",
  "docker-compose up -d",
  "pip install requests",
  "git commit -m \"Initial commit\"",
  "ls -la /var/www",
  "sudo systemctl restart nginx",
  "const theme = useContext(Theme);",
  "useEffect(() => { setup(); }, []);",
  "const sum = (a, b) => a + b;",
  "const list = [...items, newItem];",
  "const obj = { ...prev, key: val };",
  "<h1>Hello React</h1>",
  "flex items-center justify-center",
  "npm run dev",
  "git push origin main",
  "const data = await fetch(url);",
  "array.map(item => item.id);",
  "console.error(\"Something went wrong\");",
  "if __name__ == \"__main__\":",
  "async function getData() {",
  "const config = require(\"./config\");"
];

export const LEFT_HAND_WORDS = [
  "as", "at", "be", "get", "we", "after", "base", "case", "date", "face", "gate", "race", "safe", "test", "vast", "west", "area", "care", "dear", "east", "fact", "gave", "read", "very", "want", "water", "state", "street", "tree", "seed", "feed", "beef", "beer", "best", "better", "bread", "break", "card", "cat", "car", "craft", "create", "crew", "data", "dead", "debt", "deer", "desk", "dress", "draw", "drive", "ear", "eat", "egg", "ever", "extra", "fast", "fear", "feet", "few", "fire", "free", "fresh", "gear", "grass", "great", "green", "red", "rest", "save", "sea", "seat", "secret", "serve", "set", "star", "start", "stay", "step", "sweet", "table", "tax", "tea", "tear", "trade", "treat", "view", "war", "was", "waste", "wave", "wear", "weather", "week", "were", "wet", "what", "where", "white", "wife", "write", "stead", "fade", "cab", "deed", "debt", "dart", "darts", "fewer", "fever", "facet", "faces", "fact", "facts", "farce", "fears", "feast", "feeds", "feels", "ferret", "fests", "fetal", "fever", "fewer", "fiber", "field", "fiery", "fifth", "fifty", "fight", "files", "filed", "fills", "films", "final", "finds", "fined", "fines", "finis", "fired", "fires", "first", "fishy", "fixed", "fixes", "flair", "flake", "flaky", "flame", "flank", "flare", "flash", "flask", "flatly", "flats", "flaws", "fleas", "fleck", "fleet", "flesh", "flick", "flied", "flies", "fling", "flint", "flips", "flirt", "float", "flock", "flogs", "flood", "floor", "flops", "flora", "floss", "flour", "flows", "flown", "flubs", "flues", "fluff", "fluid", "fluke", "fluky", "flume", "flung", "flunk", "flush", "flute", "flyer", "foals", "foams", "foamy", "focal", "focus", "foggy", "foils", "foist", "folds", "folio", "folks", "folly", "fonts", "foods", "fools", "foots", "force", "fords", "forge", "forgo", "forks", "forms", "forte", "forth", "forts", "forty", "forum", "fouls", "found", "fount", "fours", "fovea", "fowls", "foxed", "foxes", "foyer", "frail", "frame", "franc", "frank", "fraud", "frays", "freak", "freed", "freer", "frees", "fresh", "frets", "friar", "fried", "fries", "frill", "frisk", "frizz", "frock", "frogs", "frond", "front", "frost", "froth", "frown", "froze", "fruit", "frump", "fryer", "fudge", "fuels", "fugal", "fugue", "fulls", "fully", "fumed", "fumes", "funds", "fungi", "fungo", "funks", "funky", "funny", "furls", "furry", "furze", "fused", "fuses", "fussy", "fusty", "futon", "fuzzy"
].filter(w => /^[qwertadsfgzxcvb]+$/i.test(w));

export const RIGHT_HAND_WORDS = [
  "hi", "in", "no", "on", "up", "him", "hop", "ion", "joy", "lip", "nil", "oil", "pin", "you", "only", "look", "now", "how", "our", "my", "poly", "monk", "hulk", "milk", "link", "pink", "junk", "hook", "hookup", "onion", "opinion", "union", "million", "minimum", "humph", "nylon", "nymph", "opium", "plump", "plum", "pump", "puppy", "pupil", "unholy", "unhook", "unpin", "uphill", "upon", "yummy", "jump", "hill", "mon", "hump", "look", "holy", "hook", "hull", "hymn", "join", "kill", "knoll", "kook", "limp", "lion", "loin", "look", "loom", "loon", "loop", "lump", "lung", "milk", "mill", "milo", "mink", "mono", "moon", "mull", "mump", "noon", "oily", "only", "onyx", "opium", "phon", "pill", "pimp", "pink", "pion", "plum", "poly", "pool", "poon", "poop", "pull", "pulp", "pump", "puny", "pupa", "upup", "yoyo", "yuko", "yulu"
].filter(w => /^[yuiophjklnm]+$/i.test(w));

export const LEFT_HAND_PATTERNS = [
  "asdf", "fdsa", "qwer", "rewq", "zxcv", "vcxz", "asdfg", "gfdsa", "qwert", "trewq", "zxcvb", "bvcxz",
  "aaaa", "ssss", "dddd", "ffff", "gggg", "qqqq", "wwww", "eeee", "rrrr", "tttt", "zzzz", "xxxx", "cccc", "vvvv", "bbbb",
  "asas", "dfdf", "qwqw", "erer", "zxzx", "cvcv"
];

export const RIGHT_HAND_PATTERNS = [
  "hjkl", "lkjh", "yuio", "oiuy", "nm", "mn", "yuiop", "poiuy", "hjkl", "lkjh",
  "yyyy", "uuuu", "iiii", "oooo", "pppp", "hhhh", "jjjj", "kkkk", "llll", "nnnn", "mmmm",
  "hjhj", "klkl", "yuyu", "ioio", "nmnm"
];
