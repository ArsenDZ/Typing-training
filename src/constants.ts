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
