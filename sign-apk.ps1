# Script para assinar APK para o app Domine o Violão
# Cria um keystore se não existir e assina o APK

$KeystorePath = ".\domineoviolao.keystore"
$KeystoreAlias = "domineoviolao"

# Verifica diferentes possibilidades de nome do arquivo APK
$ApkPaths = @(
    ".\TESTE APK\Domine o Violão-unsigned.apk",
    ".\TESTE APK\Domine o Violao-unsigned.apk",
    ".\TESTE APK\Domine o ViolÃ£o-unsigned.apk",
    ".\TESTE APK\Domine o Violão-unsigned.apk"
)

# Procura todos os arquivos APK na pasta TESTE APK
function Find-ApkFiles {
    if (Test-Path ".\TESTE APK") {
        $apkFiles = Get-ChildItem -Path ".\TESTE APK" -Filter "*.apk"
        return $apkFiles
    }
    return @()
}

# Função para encontrar o caminho do JDK
function Find-JDK {
    # Locais comuns do JDK em sistemas Windows
    $possiblePaths = @(
        "${env:ProgramFiles}\Java",
        "${env:ProgramFiles(x86)}\Java",
        "${env:ProgramFiles}\Eclipse Adoptium",
        "${env:ProgramFiles(x86)}\Eclipse Adoptium",
        "C:\Java",
        "C:\Program Files\Java",
        "C:\Program Files (x86)\Java",
        "C:\JDK",
        "C:\JDK 17"
    )
    
    foreach ($basePath in $possiblePaths) {
        if (Test-Path -Path $basePath) {
            # Procura por subpastas que contenham "jdk"
            $jdkFolders = Get-ChildItem -Path $basePath -Directory | Where-Object { $_.Name -like "*jdk*" }
            
            foreach ($folder in $jdkFolders) {
                $keytoolPath = Join-Path -Path $folder.FullName -ChildPath "bin\keytool.exe"
                if (Test-Path -Path $keytoolPath) {
                    return $folder.FullName
                }
            }
        }
    }
    
    # Verifica se o JDK está no caminho do sistema
    $keytoolCmd = Get-Command "keytool.exe" -ErrorAction SilentlyContinue
    if ($keytoolCmd) {
        $binPath = Split-Path -Path $keytoolCmd.Source -Parent
        return (Split-Path -Path $binPath -Parent)
    }
    
    return $null
}

# Encontrar JDK
$JdkPath = Find-JDK
if ($JdkPath -eq $null) {
    Write-Host "JDK não encontrado. Vamos usar um método alternativo para assinar o APK." -ForegroundColor Yellow
    
    # Opção alternativa: usar APKSigner online
    Write-Host @"
========================================================================
IMPORTANTE: JDK não encontrado no seu sistema.

Para assinar o APK, você tem duas opções:

1. Instale o JDK 17 (recomendado):
   - Baixe em: https://adoptium.net/
   - Instale e execute este script novamente

2. Use um serviço online para assinar o APK:
   - Acesse: https://www.apksigner.com/
   - Faça upload do arquivo APK da pasta "TESTE APK"
   - Siga as instruções do site para assinar
   - Baixe o APK assinado

3. Use o APK unsigned (temporariamente):
   - Copie o arquivo APK da pasta "TESTE APK" para a pasta raiz
   - Este APK só funcionará para testes, não para distribuição

========================================================================
"@
    
    # Lista os arquivos APK disponíveis
    $apkFiles = Find-ApkFiles
    if ($apkFiles.Count -gt 0) {
        Write-Host "APKs disponíveis na pasta TESTE APK:" -ForegroundColor Cyan
        for ($i = 0; $i -lt $apkFiles.Count; $i++) {
            Write-Host "[$i] $($apkFiles[$i].Name)" -ForegroundColor Cyan
        }
        
        $copyIndex = Read-Host "Digite o número do APK que deseja usar para testes (ou N para cancelar)"
        if ($copyIndex -ne "N" -and $copyIndex -ne "n") {
            try {
                $selectedIndex = [int]$copyIndex
                if ($selectedIndex -ge 0 -and $selectedIndex -lt $apkFiles.Count) {
                    $selectedApk = $apkFiles[$selectedIndex]
                    Copy-Item -Path $selectedApk.FullName -Destination ".\Domine o Violão.apk" -Force
                    Write-Host "APK copiado para: .\Domine o Violão.apk" -ForegroundColor Green
                    Write-Host "Este APK NÃO está assinado e só deve ser usado para testes!" -ForegroundColor Yellow
                }
                else {
                    Write-Host "Índice inválido." -ForegroundColor Red
                }
            }
            catch {
                Write-Host "Entrada inválida." -ForegroundColor Red
            }
        }
    }
    else {
        Write-Host "Nenhum arquivo APK encontrado na pasta TESTE APK." -ForegroundColor Red
    }
    
    exit 1
}

# JDK encontrado, vamos usar
Write-Host "JDK encontrado em: $JdkPath" -ForegroundColor Green

# Definir caminhos das ferramentas
$KeytoolPath = Join-Path -Path $JdkPath -ChildPath "bin\keytool.exe"
$JarsignerPath = Join-Path -Path $JdkPath -ChildPath "bin\jarsigner.exe"

# Verifica se o keystore já existe
if (-not (Test-Path $KeystorePath)) {
    Write-Host "Criando novo keystore em $KeystorePath" -ForegroundColor Green
    
    # Prompt para as informações do keystore
    $KeystorePassword = Read-Host "Digite uma senha para o keystore"
    $Name = Read-Host "Digite seu nome (ex: João Silva)"
    $Organization = Read-Host "Digite sua organização (ex: Domineo Violão)"
    $City = Read-Host "Digite sua cidade"
    $State = Read-Host "Digite seu estado"
    $Country = Read-Host "Digite o código do país (ex: BR)"
    
    # Comando para criar o keystore
    $KeytoolParams = @(
        "-genkey", 
        "-v", 
        "-keystore", $KeystorePath, 
        "-alias", $KeystoreAlias, 
        "-keyalg", "RSA", 
        "-keysize", "2048", 
        "-validity", "10000",
        "-storepass", $KeystorePassword,
        "-keypass", $KeystorePassword,
        "-dname", "cn=$Name, ou=$Organization, l=$City, st=$State, c=$Country"
    )
    
    # Executa o comando keytool
    & $KeytoolPath $KeytoolParams
    
    if (-not $?) {
        Write-Host "Erro ao criar o keystore usando: $KeytoolPath" -ForegroundColor Red
        exit 1
    }
}
else {
    Write-Host "Keystore já existe em $KeystorePath" -ForegroundColor Yellow
    $KeystorePassword = Read-Host "Digite a senha do keystore existente"
}

# Procurar o APK
$UnsignedApkPath = $null
foreach ($path in $ApkPaths) {
    if (Test-Path -Path $path) {
        $UnsignedApkPath = $path
        break
    }
}

# Se não encontrou, procurar qualquer APK na pasta
if (-not $UnsignedApkPath) {
    $apkFiles = Find-ApkFiles
    if ($apkFiles.Count -gt 0) {
        Write-Host "APKs disponíveis na pasta TESTE APK:" -ForegroundColor Cyan
        for ($i = 0; $i -lt $apkFiles.Count; $i++) {
            Write-Host "[$i] $($apkFiles[$i].Name)" -ForegroundColor Cyan
        }
        
        $selectedIndex = 0
        if ($apkFiles.Count -gt 1) {
            $selectedIndex = Read-Host "Digite o número do APK que deseja assinar"
            try {
                $selectedIndex = [int]$selectedIndex
                if ($selectedIndex -lt 0 -or $selectedIndex -ge $apkFiles.Count) {
                    $selectedIndex = 0
                }
            }
            catch {
                $selectedIndex = 0
            }
        }
        
        $UnsignedApkPath = $apkFiles[$selectedIndex].FullName
        Write-Host "Usando APK: $UnsignedApkPath" -ForegroundColor Green
    }
    else {
        Write-Host "ERRO: Nenhum arquivo APK encontrado na pasta TESTE APK" -ForegroundColor Red
        exit 1
    }
}

# Define o nome do APK assinado
$fileName = [System.IO.Path]::GetFileNameWithoutExtension($UnsignedApkPath)
$SignedApkPath = ".\$fileName-assinado.apk"

# Assina o APK com jarsigner
Write-Host "Assinando APK com jarsigner..." -ForegroundColor Green
& $JarsignerPath -verbose -sigalg SHA256withRSA -digestalg SHA-256 -keystore $KeystorePath -storepass $KeystorePassword $UnsignedApkPath $KeystoreAlias

if (-not $?) {
    Write-Host "Erro ao assinar o APK com jarsigner: $JarsignerPath" -ForegroundColor Red
    exit 1
}

# Copia o APK assinado
Copy-Item -Path $UnsignedApkPath -Destination $SignedApkPath -Force

Write-Host @"
========================================================================
APK assinado com sucesso! 

O arquivo assinado está disponível em: $SignedApkPath

Próximos passos:
1. Instale o APK em seu dispositivo Android
2. Ou envie para a Google Play Store

Lembre-se de guardar o arquivo keystore ($KeystorePath) em local seguro,
você precisará dele para atualizações futuras do aplicativo.
========================================================================
"@ -ForegroundColor Green